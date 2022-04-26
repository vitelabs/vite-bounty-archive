/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vite/vitejs-http'

declare module '@vite/vitejs-ws'

declare module 'uuid'

declare const chrome: any
