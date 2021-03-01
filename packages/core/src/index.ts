import LibP2P from 'libp2p'
import type { Connection } from 'libp2p'

const MPLEX = require('libp2p-mplex')
const KadDHT = require('libp2p-kad-dht')
import { NOISE } from 'libp2p-noise'

const { HoprConnect } = require('@hoprnet/hopr-connect')

import { Packet } from './messages/packet'
import {
  PACKET_SIZE,
  MAX_HOPS,
  VERSION,
  CHECK_TIMEOUT,
  TICKET_AMOUNT,
  TICKET_WIN_PROB,
  PATH_RANDOMNESS,
  MIN_NATIVE_BALANCE,
  FULL_VERSION
} from './constants'

import NetworkPeers from './network/network-peers'
import Heartbeat from './network/heartbeat'
import { findPath } from './path'

import { addPubKey, getAcknowledgedTickets, submitAcknowledgedTicket } from './utils'
import { u8aToHex, pubKeyToPeerId } from '@hoprnet/hopr-utils'
import { existsSync, mkdirSync } from 'fs'
import getIdentity from './identity'

import levelup, { LevelUp } from 'levelup'
import leveldown from 'leveldown'
import Multiaddr from 'multiaddr'
import chalk from 'chalk'

import PeerId from 'peer-id'
import type HoprCoreConnector from '@hoprnet/hopr-core-connector-interface'
import type { HoprCoreConnectorStatic, Types, Channel, RoutingChannel } from '@hoprnet/hopr-core-connector-interface'
import HoprCoreEthereum from '@hoprnet/hopr-core-ethereum'
import BN from 'bn.js'

import { Interactions } from './interactions'
import * as DbKeys from './dbKeys'
import EventEmitter from 'events'
import path from 'path'
import { ChannelStrategy, PassiveStrategy, PromiscuousStrategy } from './channel-strategy'

import Debug from 'debug'
import { Address } from 'libp2p/src/peer-store'

const log = Debug(`hopr-core`)
const verbose = Debug('hopr-core:verbose')

interface NetOptions {
  ip: string
  port: number
}

export type ChannelStrategyNames = 'passive' | 'promiscuous'

export type HoprOptions = {
  debug: boolean
  network: string
  provider: string
  ticketAmount?: number
  ticketWinProb?: number
  db?: LevelUp
  dbPath?: string
  createDbIfNotExist?: boolean
  peerId?: PeerId
  password?: string
  id?: number // TODO - kill this opaque accessor of db files...
  bootstrapNode?: boolean
  connector?: HoprCoreConnectorStatic
  bootstrapServers?: Multiaddr[]
  output?: (encoded: Uint8Array) => void
  strategy?: ChannelStrategyNames
  hosts?: {
    ip4?: NetOptions
    ip6?: NetOptions
  }
}

const defaultDBPath = (id: string | number, isBootstrap: boolean): string => {
  let folder: string
  if (isBootstrap) {
    folder = `bootstrap`
  } else if (id) {
    folder = `node_${id}`
  } else {
    folder = `node`
  }
  return path.join(process.cwd(), 'db', VERSION, folder)
}

class Hopr<Chain extends HoprCoreConnector> extends EventEmitter {
  // TODO make these actually private - Do not rely on any of these properties!
  public _interactions: Interactions<Chain>
  // Allows us to construct HOPR with falsy options
  public _debug: boolean
  public _dbKeys = DbKeys

  public output: (arr: Uint8Array) => void
  public isBootstrapNode: boolean
  public bootstrapServers: Multiaddr[]
  public initializedWithOptions: HoprOptions
  public ticketAmount: number = TICKET_AMOUNT
  public ticketWinProb: number = TICKET_WIN_PROB

  private running: boolean
  private checkTimeout: NodeJS.Timeout
  private strategy: ChannelStrategy
  private networkPeers: NetworkPeers
  private heartbeat: Heartbeat

  /**
   * @constructor
   *
   * @param _options
   * @param provider
   */
  private constructor(options: HoprOptions, public _libp2p: LibP2P, public db: LevelUp, public paymentChannels: Chain) {
    super()

    this._libp2p.connectionManager.on('peer:connect', (conn: Connection) => {
      this.emit('hopr:peer:connection', conn.remotePeer)
      this.networkPeers.register(conn.remotePeer)
    })

    this.setChannelStrategy(options.strategy || 'promiscuous')
    this.initializedWithOptions = options
    this.output = (arr: Uint8Array) => {
      this.emit('hopr:message', arr)
      if (options.output) {
        log('DEPRECATED: options.output is replaced with a hopr:message event')
        options.output(arr)
      }
    }
    this.bootstrapServers = options.bootstrapServers || []
    this.isBootstrapNode = options.bootstrapNode || false
    this._interactions = new Interactions(this, (peer: PeerId) => this.networkPeers.register(peer))

    if (process.env.GCLOUD) {
      try {
        var name = 'hopr_node_' + this.getId().toB58String().slice(-5).toLowerCase()
        if (this.isBootstrapNode) {
          name = 'hopr_bootstrap_' + this.getId().toB58String().slice(-5).toLowerCase()
        }
        require('@google-cloud/profiler')
          .start({
            projectId: 'hoprassociation',
            serviceContext: {
              service: name,
              version: FULL_VERSION
            }
          })
          .catch((e: any) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    }

    if (process.env.GCLOUD) {
      try {
        var name = 'hopr_node_' + this.getId().toB58String().slice(-5).toLowerCase()
        if (this.isBootstrapNode) {
          name = 'hopr_bootstrap_' + this.getId().toB58String().slice(-5).toLowerCase()
        }
        require('@google-cloud/profiler')
          .start({
            projectId: 'hoprassociation',
            serviceContext: {
              service: name,
              version: FULL_VERSION
            }
          })
          .catch((e: any) => console.log(e))
      } catch (e) {
        console.log(e)
      }
    }

    this.networkPeers = new NetworkPeers(
      Array.from(this._libp2p.peerStore.peers.values()).map((x) => x.id),
      [this.getId()].concat(this.bootstrapServers.map((bs) => PeerId.createFromB58String(bs.getPeerId())))
    )

    this.heartbeat = new Heartbeat(
      this.networkPeers,
      this._interactions.heartbeat,
      this._libp2p.hangUp.bind(this._libp2p)
    )

    if (options.ticketAmount) this.ticketAmount = options.ticketAmount
    if (options.ticketWinProb) this.ticketWinProb = options.ticketWinProb

    verbose('# STARTED NODE')
    verbose('ID', this.getId().toB58String())
    verbose('Protocol version', VERSION)
    this._debug = options.debug
  }

  /**
   * Creates a new node
   * This is necessary as some of the constructor for the node needs to be
   * asynchronous..
   *
   * @param options the parameters
   */
  public static async create<CoreConnector extends HoprCoreConnector>(
    options: HoprOptions
  ): Promise<Hopr<CoreConnector>> {
    const Connector = options.connector ?? HoprCoreEthereum
    const db = Hopr.openDatabase(options)

    const { id, addresses } = await getIdentity({
      ...options,
      db
    })

    if (
      !options.debug &&
      !options.bootstrapNode &&
      (options.bootstrapServers == null || options.bootstrapServers.length == 0)
    ) {
      throw Error(`Cannot start node without a bootstrap server`)
    }

    let connector = (await Connector.create(db, id.privKey.marshal(), {
      provider: options.provider,
      debug: options.debug
    })) as CoreConnector

    verbose('Created connector, now creating node')

    const libp2p = await LibP2P.create({
      peerId: id,
      addresses: { listen: addresses.map((x) => x.toString()) },
      // libp2p modules
      modules: {
        transport: [HoprConnect as any], // TODO re https://github.com/hoprnet/hopr-connect/issues/78
        streamMuxer: [MPLEX],
        connEncryption: [NOISE],
        // @ts-ignore //TODO 'Libp2pModules' does not contain types for DHT as ov v0.30 see js-libp2p/659
        dht: KadDHT
      },
      config: {
        transport: {
          HoprConnect: {
            bootstrapServers: options.bootstrapServers,
            __noDirectConnections: true,
            __noWebRTCUpgrade: false
          }
        },
        peerDiscovery: {
          autoDial: false
        },
        dht: {
          enabled: true
        },
        //@ts-ignore - bug in libp2p options
        relay: {
          enabled: false
        }
      },
      dialer: {
        // Temporary fix, see https://github.com/hoprnet/hopr-connect/issues/77
        addressSorter: (a) => a,
        concurrency: options.bootstrapNode ? 1000 : 100
      }
    })

    return await new Hopr<CoreConnector>(options, libp2p, db, connector).start()
  }

  private async tickChannelStrategy(newChannels: RoutingChannel[]) {
    verbose('new payment channels, auto opening tick', this.running)
    if (!this.running) {
      return
    }
    for (const channel of newChannels) {
      this.networkPeers.register(channel[0]) // Listen to nodes with outgoing stake
    }
    const currentChannels = await this.getOpenChannels()
    for (const channel of currentChannels) {
      this.networkPeers.register(channel[1]) // Make sure current channels are 'interesting'
    }
    const balance = await this.getBalance()
    const [nextChannels, closeChannels] = await this.strategy.tick(
      balance,
      newChannels,
      currentChannels,
      this.networkPeers,
      this.paymentChannels.indexer
    )
    verbose(`strategy wants to close ${closeChannels.length} channels`)
    for (let toClose of closeChannels) {
      verbose(`closing ${toClose}`)
      await this.closeChannel(toClose)
      verbose(`closed channel to ${toClose.toB58String()}`)
      this.emit('hopr:channel:closed', toClose)
    }
    verbose(`strategy wants to open`, nextChannels.length, 'new channels')
    for (let channelToOpen of nextChannels) {
      this.networkPeers.register(channelToOpen[0])
      try {
        // Opening channels can fail if we can't establish a connection.
        const hash = await this.openChannel(...channelToOpen)
        verbose('- opened', channelToOpen, hash)
        this.emit('hopr:channel:opened', channelToOpen)
      } catch (e) {
        log('error when trying to open strategy channels', e)
      }
    }
  }

  private async getOpenChannels(): Promise<RoutingChannel[]> {
    let channels: RoutingChannel[] = []
    await this.paymentChannels.channel.getAll(
      async (channel: Channel) => {
        const pubKey = await channel.offChainCounterparty
        const peerId = await pubKeyToPeerId(pubKey)
        channels.push([this.getId(), peerId, await channel.balance]) // TODO partyA?
      },
      async (promises: Promise<void>[]) => {
        await Promise.all(promises)
      }
    )
    return channels
  }

  /**
   * Returns the version of hopr-core.
   */
  public getVersion() {
    return FULL_VERSION
  }
  /**
   * This method starts the node and registers all necessary handlers. It will
   * also open the database and creates one if it doesn't exists.
   *
   * @param options
   */
  public async start(): Promise<Hopr<Chain>> {
    await Promise.all([this._libp2p.start().then(() => this.heartbeat.start()), this.paymentChannels.start()])

    log(`Available under the following addresses:`)

    this._libp2p.multiaddrs.forEach((ma: Multiaddr) => log(ma.toString()))
    this.running = true
    this.periodicCheck()
    return this
  }

  /**
   * Shuts down the node and saves keys and peerBook in the database
   */
  public async stop(): Promise<void> {
    if (!this.running) {
      return Promise.resolve()
    }
    clearTimeout(this.checkTimeout)
    this.running = false
    await Promise.all([this.heartbeat.stop(), this.paymentChannels.stop()])

    await Promise.all([this.db?.close().then(() => log(`Database closed.`)), this._libp2p.stop()])

    // Give the operating system some extra time to close the sockets
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  public isRunning(): boolean {
    return this.running
  }

  public getId(): PeerId {
    return this._libp2p.peerId // Not a documented API, but in the sourceu
  }

  /**
   * Lists the addresses which the given node announces to other nodes
   * @param peer peer to query for, default self
   */
  public async getAnnouncedAddresses(peer: PeerId = this.getId()): Promise<Multiaddr[]> {
    if (peer.equals(this.getId())) {
      return this._libp2p.multiaddrs
    }

    return (await this._libp2p.peerRouting.findPeer(peer))?.multiaddrs || []
  }

  /**
   * List the addresses on which the node is listening
   */
  public getListeningAddresses(): Multiaddr[] {
    return this._libp2p.addressManager.getListenAddrs()
  }

  /**
   * Gets the observed addresses of a given peer.
   * @param peer peer to query for
   */
  public getObservedAddresses(peer: PeerId): Address[] {
    return this._libp2p.peerStore.get(peer)?.addresses ?? []
  }

  /**
   * Sends a message.
   *
   * @notice THIS METHOD WILL SPEND YOUR ETHER.
   * @notice This method will fail if there are not enough funds to open
   * the required payment channels. Please make sure that there are enough
   * funds controlled by the given key pair.
   *
   * @param msg message to send
   * @param destination PeerId of the destination
   * @param intermediateNodes optional set path manually
   * the acknowledgement of the first hop
   */
  public async sendMessage(
    msg: Uint8Array,
    destination: PeerId,
    getIntermediateNodesManually?: () => Promise<PeerId[]>
  ): Promise<void> {
    const promises: Promise<void>[] = []

    for (let n = 0; n < msg.length / PACKET_SIZE; n++) {
      promises.push(
        new Promise<void>(async (resolve, reject) => {
          let intermediatePath: PeerId[]
          if (getIntermediateNodesManually != undefined) {
            verbose('manually creating intermediatePath')
            intermediatePath = await getIntermediateNodesManually()
          } else {
            try {
              intermediatePath = await this.getIntermediateNodes(destination)
            } catch (e) {
              reject(e)
              return
            }
            if (!intermediatePath || !intermediatePath.length) {
              reject(new Error('bad path'))
            }
          }

          const path: PeerId[] = [].concat(intermediatePath, [destination])

          let packet: Packet<Chain>
          try {
            packet = await Packet.create(
              this,
              this._libp2p,
              msg.slice(n * PACKET_SIZE, Math.min(msg.length, (n + 1) * PACKET_SIZE)),
              await Promise.all(path.map(addPubKey))
            )
          } catch (err) {
            return reject(err)
          }

          const unAcknowledgedDBKey = this._dbKeys.UnAcknowledgedTickets(packet.challenge.hash)

          await this.db.put(Buffer.from(unAcknowledgedDBKey), Buffer.from(''))

          this._interactions.packet.acknowledgment.once(u8aToHex(unAcknowledgedDBKey), () => {
            resolve()
          })

          try {
            await this._interactions.packet.forward.interact(path[0], packet)
          } catch (err) {
            return reject(err)
          }
        })
      )
    }

    try {
      await Promise.all(promises)
    } catch (err) {
      log(`Could not send message. Error was: ${chalk.red(err.message)}`)
      throw err
    }
  }

  /**
   * Ping a node.
   * @dev returns latency >= 0 or -1 if unreachable
   *
   * @param destination PeerId of the node
   * @returns latency
   */
  public async ping(destination: PeerId): Promise<{ info: string; latency: number }> {
    if (!PeerId.isPeerId(destination)) {
      throw Error(`Expecting a non-empty destination.`)
    }
    let info = ''
    let latency = await this._interactions.heartbeat.interact(destination)
    return { latency, info }
  }

  public getConnectedPeers(): PeerId[] {
    return this.networkPeers.all()
  }

  public connectionReport(): string {
    return this.networkPeers.debugLog()
  }

  private async checkBalances() {
    const balance = await this.getBalance()
    let unfunded = false
    if (balance.lten(0)) {
      const address = await this.paymentChannels.hexAccountAddress()
      log('unfunded node', address)
      this.emit('hopr:warning:unfunded', address)
      unfunded = true
    }
    const nativeBalance = await this.getNativeBalance()
    if (nativeBalance.lte(MIN_NATIVE_BALANCE)) {
      const address = await this.paymentChannels.hexAccountAddress()
      log('unfunded node', address)
      this.emit('hopr:warning:unfundedNative', address)
      unfunded = true
    }
    if (!unfunded) {
      // Technically we only have to do this the first time, but there are no
      // side effects to doing this on each tick.
      this.paymentChannels.initOnchainValues() // No-op if called many times.
    }
  }

  private async periodicCheck() {
    log('periodic check', this.running)
    if (!this.running) {
      return
    }
    try {
      await this.checkBalances()
      await this.tickChannelStrategy([])
    } catch (e) {
      log('error in periodic check', e)
    }
    this.checkTimeout = setTimeout(() => this.periodicCheck(), CHECK_TIMEOUT)
  }

  public setChannelStrategy(strategy: ChannelStrategyNames) {
    if (strategy == 'passive') {
      this.strategy = new PassiveStrategy()
      return
    }
    if (strategy == 'promiscuous') {
      this.strategy = new PromiscuousStrategy()
      return
    }
    throw new Error('Unknown strategy')
  }

  public getChannelStrategy(): string {
    return this.strategy.name
  }

  public async getBalance(): Promise<Types.Balance> {
    return await this.paymentChannels.account.getBalance(true)
  }

  public async getNativeBalance(): Promise<Types.NativeBalance> {
    return await this.paymentChannels.account.getNativeBalance(true)
  }

  public smartContractInfo(): string {
    return this.paymentChannels.smartContractInfo()
  }

  /**
   * Open a payment channel
   *
   * @param counterParty the counter party's peerId
   * @param amountToFund the amount to fund in HOPR(wei)
   */
  public async openChannel(
    counterParty: PeerId,
    amountToFund: BN
  ): Promise<{
    channelId: Types.Hash
  }> {
    const { utils, types, account } = this.paymentChannels
    const self = this.getId()

    const channelId = await utils.getId(
      await utils.pubKeyToAccountId(self.pubKey.marshal()),
      await utils.pubKeyToAccountId(counterParty.pubKey.marshal())
    )

    const myAvailableTokens = await account.getBalance(true)

    // validate 'amountToFund'
    if (amountToFund.lten(0)) {
      throw Error(`Invalid 'amountToFund' provided: ${amountToFund.toString(10)}`)
    } else if (amountToFund.gt(myAvailableTokens)) {
      throw Error(`You don't have enough tokens: ${amountToFund.toString(10)}<${myAvailableTokens.toString(10)}`)
    }

    const amPartyA = utils.isPartyA(
      await utils.pubKeyToAccountId(self.pubKey.marshal()),
      await utils.pubKeyToAccountId(counterParty.pubKey.marshal())
    )

    const channelBalance = types.ChannelBalance.create(
      undefined,
      amPartyA
        ? {
            balance: amountToFund,
            balance_a: amountToFund
          }
        : {
            balance: amountToFund,
            balance_a: new BN(0)
          }
    )

    await this.paymentChannels.channel.create(
      counterParty.pubKey.marshal(),
      async () => this._interactions.payments.onChainKey.interact(counterParty),
      channelBalance,
      (balance: Types.ChannelBalance): Promise<Types.SignedChannel> =>
        this._interactions.payments.open.interact(counterParty, balance)
    )

    return {
      channelId
    }
  }

  public async closeChannel(peerId: PeerId): Promise<{ receipt: string; status: string }> {
    const channel = await this.paymentChannels.channel.create(
      peerId.pubKey.marshal(),
      async (counterparty: Uint8Array) =>
        this._interactions.payments.onChainKey.interact(await pubKeyToPeerId(counterparty))
    )

    const status = await channel.status

    if (!(status === 'OPEN' || status === 'PENDING')) {
      throw new Error('To close a channel, it must be open or pending for closure')
    }

    const receipt = await channel.initiateSettlement()
    return { receipt, status }
  }

  public async getAcknowledgedTickets() {
    return getAcknowledgedTickets(this)
  }

  public async submitAcknowledgedTicket(ackTicket: Types.AcknowledgedTicket, index: Uint8Array) {
    return submitAcknowledgedTicket(this, ackTicket, index)
  }

  /**
   * Takes a destination and samples randomly intermediate nodes
   * that will relay that message before it reaches its destination.
   *
   * @param destination instance of peerInfo that contains the peerId of the destination
   */
  private async getIntermediateNodes(destination: PeerId): Promise<PeerId[]> {
    return await findPath(
      this.getId(),
      destination,
      MAX_HOPS - 1,
      this.networkPeers,
      this.paymentChannels.indexer,
      PATH_RANDOMNESS
    )
  }

  private static openDatabase(options: HoprOptions): LevelUp {
    if (options.db) {
      return options.db
    }

    let dbPath: string
    if (options.dbPath) {
      dbPath = options.dbPath
    } else {
      dbPath = defaultDBPath(options.id, options.bootstrapNode)
    }

    dbPath = path.resolve(dbPath)

    verbose('using db at ', dbPath)
    if (!existsSync(dbPath)) {
      verbose('db does not exist, creating?:', options.createDbIfNotExist)
      if (options.createDbIfNotExist) {
        mkdirSync(dbPath, { recursive: true })
      } else {
        throw new Error('Database does not exist: ' + dbPath)
      }
    }

    return levelup(leveldown(dbPath))
  }
}

export { Hopr as default, LibP2P }
export * from './constants'
