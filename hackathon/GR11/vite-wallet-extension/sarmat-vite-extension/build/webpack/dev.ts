import * as path from 'path'
import merge from 'webpack-merge'
const ExtensionReloader = require('webpack-ext-reloader')
import * as Webpack from 'webpack'
import common from './common'

export default merge(common, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, '../../src/popup/index.ts')
  ],
  devServer: {
    host: 'localhost',
    hot: true,
    port: 8080
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new ExtensionReloader({
      reloadPage: true,
      entries: {
        contentScript: 'content-script',
        background: 'background',
        extensionPage: 'popup'
      }
    })
  ]
} as Webpack.Configuration)
