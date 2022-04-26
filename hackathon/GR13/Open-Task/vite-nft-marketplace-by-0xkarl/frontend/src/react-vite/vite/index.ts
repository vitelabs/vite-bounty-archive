import * as a from './vitejs';
import * as b from './vitejs-ws';

console.log(a);
console.log(b);
console.log(process)
// @ts-ignore
export const WS_RPC = process.$vite_WS.WS_RPC;
// @ts-ignore
export const vite = process.$vite_vitejs;
