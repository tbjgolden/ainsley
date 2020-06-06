import { spawnSync, SpawnSyncOptions } from 'child_process'

export type JSONPrimitive = string | number | boolean | null | undefined
export type JSONValue = JSONObject | JSONArray | JSONPrimitive
export type JSONArray = JSONValue[]

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JSONObject extends Record<string, JSONValue> {}

export type AsyncFn<I extends JSONValue[], O extends JSONValue> = (
  ...v: I
) => Promise<O>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const gen: (input: JSONValue[], fn: AsyncFn<any, any>) => string = (
  input,
  fn
) => `
const main = async () => {
    console.log(JSON.stringify(await (${fn})(...${JSON.stringify(input)})));
}
main().catch(e => console.error(e));
`

export const doSync: <I extends JSONArray, O extends JSONValue>(
  f: AsyncFn<I, O>,
  opts?: SpawnSyncOptions
) => (...ip: I) => O = (
  fn,
  { maxBuffer = 2e9, ...etc }: SpawnSyncOptions = {}
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
) => (...ip) => {
  const proc = spawnSync('node', ['-'], {
    input: gen(ip, fn),
    maxBuffer,
    ...etc
  })

  const stderr = proc.stderr.toString('utf-8').trim()
  if (stderr) console.error(stderr)
  if (proc.error) throw proc.error

  return JSON.parse(proc.stdout.toString('utf-8'))
}

export default doSync
