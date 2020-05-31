import { baseConfig } from './configs/examples'
import { generate } from './generate'
import { execSync } from 'child_process'
import path from 'path'
import zlib from 'zlib'

describe('compiler', () => {
  test('compiles ainsley as expected', () => {
    const input = JSON.stringify(baseConfig)
    const output = generate(baseConfig)

    const compiler = JSON.parse(
      execSync(
        `node --experimental-modules ${path.join(
          __dirname,
          '../scripts/perf/analyze.js'
        )}`
      ).toString()
    )

    const bytes = {
      compiler: {
        raw: compiler['ac.js'].bytes.raw,
        gzip: compiler['ac.js'].bytes.gzip,
        brotli: compiler['ac.js'].bytes.brotli
      },
      input: {
        raw: Buffer.from(input).byteLength,
        gzip: zlib.gzipSync(input).byteLength,
        brotli: zlib.brotliCompressSync(input).byteLength
      },
      output: {
        raw: Buffer.from(output).byteLength,
        gzip: zlib.gzipSync(output).byteLength,
        brotli: zlib.brotliCompressSync(output).byteLength
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
