import { generate } from './generate'
import { config } from 'ainsley-config-starter'

import { execSync } from 'child_process'
import path from 'path'
import zlib from 'zlib'

describe('compiler', () => {
  test('compiles ainsley as expected', async () => {
    const gzip = (input: string): Promise<number> =>
      new Promise<number>((resolve, reject) => {
        zlib.gzip(
          input,
          {
            chunkSize: 32 * 1024,
            level: 8
          },
          (error, buffer) => {
            if (error) {
              reject(error)
            } else {
              resolve(buffer.byteLength)
            }
          }
        )
      })

    const brotli = (input: string): Promise<number> =>
      new Promise<number>((resolve, reject) => {
        zlib.brotliCompress(
          input,
          {
            chunkSize: 32 * 1024,
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 9
            }
          },

          (error, buffer) => {
            if (error) {
              reject(error)
            } else {
              resolve(buffer.byteLength)
            }
          }
        )
      })

    const input = JSON.stringify(config)
    const output = generate(config)

    const compiler = JSON.parse(
      execSync(
        `node --experimental-modules ${path.join(
          __dirname,
          '../scripts/perf/analyze.js'
        )}`
      ).toString()
    )

    const [
      inputGzipBytes,
      inputBrotliBytes,
      outputGzipBytes,
      outputBrotliBytes
    ] = await Promise.all([
      gzip(input),
      brotli(input),
      gzip(output),
      brotli(output)
    ])

    const bytes = {
      compiler: {
        raw: compiler['ac.js'].bytes.raw,
        gzip: compiler['ac.js'].bytes.gzip,
        brotli: compiler['ac.js'].bytes.brotli
      },
      input: {
        raw: Buffer.from(input).byteLength,
        gzip: inputGzipBytes,
        brotli: inputBrotliBytes
      },
      output: {
        raw: Buffer.from(output).byteLength,
        gzip: outputGzipBytes,
        brotli: outputBrotliBytes
      }
    }

    console.log(bytes)

    expect(bytes.compiler.raw + bytes.input.raw).toBeLessThan(bytes.output.raw)
    expect(bytes.compiler.gzip + bytes.input.gzip).toBeLessThan(
      bytes.output.gzip
    )
    expect(bytes.compiler.brotli + bytes.input.brotli).toBeLessThan(
      bytes.output.brotli
    )
  })
})
