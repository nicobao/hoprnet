import type { Stream } from './types'
import { WEBRTC_TRAFFIC_PREFIX, REMAINING_TRAFFIC_PREFIX, WEBRTC_TIMEOUT } from './constants'
import defer from 'p-defer'
import type { Pushable } from 'it-pushable'
import BL from 'bl'

export default function myHandshake(
  webRTCsendBuffer: Pushable<Uint8Array> | undefined,
  webRTCrecvBuffer: Pushable<Uint8Array> | undefined,
  options?: { signal?: AbortSignal }
): {
  relayStream: Stream
  webRtcStream: Stream
} {
  const sourcePromise = defer<AsyncIterable<Uint8Array>>()

  let webRTCused = false

  let cache: Uint8Array
  let sinkPromise = defer<void>()
  let deferredSource: AsyncIterable<Uint8Array>

  const webRtcStream = {
    sink: (source: AsyncIterable<Uint8Array>) => {
      webRTCused = webRTCused || true

      return (async function* () {
        if (webRTCsendBuffer != null) {
          const timeout = setTimeout(() => {
            webRTCsendBuffer.end()
          }, WEBRTC_TIMEOUT)

          for await (const msg of webRTCsendBuffer) {
            if (msg == null) {
              continue
            }

            yield new BL([new Uint8Array([WEBRTC_TRAFFIC_PREFIX]) as Buffer, msg as Buffer])
          }

          clearTimeout(timeout)
        }

        const source = await sourcePromise.promise
        yield* source
      })()
    },
    source: async (source: AsyncIterable<Uint8Array>) => {
      webRTCused = webRTCused || true

      let doneWithWebRTC = false

      while (!doneWithWebRTC) {
        let result = await source[Symbol.asyncIterator]().next()

        if (result.done) {
          break
        }

        let msg = result.value.slice()
        if (msg[0] == WEBRTC_TRAFFIC_PREFIX) {
          webRTCrecvBuffer?.push(msg.slice(1))
        } else if (msg[0] == REMAINING_TRAFFIC_PREFIX) {
          doneWithWebRTC = true
          webRTCrecvBuffer?.end()

          cache = msg.slice(1)
          deferredSource = source
          sinkPromise.resolve()
        }
      }
    },
  }
  const relayStream = {
    sink: async (source: AsyncIterable<Uint8Array>) => {
      webRTCsendBuffer?.end()

      sourcePromise.resolve(
        (async function* () {
          for await (const msg of source) {
            if (msg == null) {
              continue
            }

            yield (new BL([new Uint8Array([REMAINING_TRAFFIC_PREFIX]) as Buffer, msg as Buffer]) as unknown) as Buffer
          }
        })()
      )
    },
    source: (async function* () {
      await sinkPromise.promise

      if (cache != null) {
        yield cache
      }

      for await (const msg of deferredSource) {
        let _msg = msg.slice()

        if (_msg.slice(0, 1)[0] == REMAINING_TRAFFIC_PREFIX) {
          yield _msg.slice(1)
        }
      }
    })(),
  }

  return {
    // @ts-ignore
    relayStream,
    // @ts-ignore
    webRtcStream,
  }
}
