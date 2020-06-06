/// <reference types="node" />
import { SpawnSyncOptions } from 'child_process';
export declare type JSONPrimitive = string | number | boolean | null | undefined;
export declare type JSONValue = JSONObject | JSONArray | JSONPrimitive;
export declare type JSONArray = JSONValue[];
export interface JSONObject extends Record<string, JSONValue> {
}
export declare type AsyncFn<I extends JSONValue[], O extends JSONValue> = (...v: I) => Promise<O>;
export declare const doSync: <I extends JSONArray, O extends JSONValue>(f: AsyncFn<I, O>, opts?: SpawnSyncOptions) => (...ip: I) => O;
export default doSync;
