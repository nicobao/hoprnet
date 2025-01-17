import RLP from 'rlp'
import { u8aToHex } from '@hoprnet/hopr-utils'
import { styleValue } from './index.js'

/**
 * Adds the current timestamp to the message in order to measure the latency.
 * @param msg the message
 */
export function encodeMessage(msg: string): Uint8Array {
  return RLP.encode([msg, Date.now()])
}

/**
 * Tries to decode the message and returns the message as well as
 * the measured latency.
 * @param encoded an encoded message
 */
export function decodeMessage(encoded: Uint8Array): {
  latency: number
  msg: string
} {
  let msg: Uint8Array, time: Uint8Array
  try {
    ;[msg, time] = RLP.decode(encoded) as [Uint8Array, Uint8Array]

    return {
      latency: Date.now() - Buffer.from(time).readUintBE(0, time.length),
      msg: new TextDecoder().decode(msg)
    }
  } catch (err) {
    styleValue(
      `Could not decode received message '${u8aToHex(encoded)}' Error was ${
        err instanceof Error ? err.message : 'Unknown error'
      }.`,
      'failure'
    )

    return {
      latency: NaN,
      msg: 'Error: Could not decode message'
    }
  }
}
