import merge from 'webpack-merge'
import common from './common'
const ZipPlugin = require('zip-webpack-plugin')

export default merge(common, {
  mode: 'production',
  plugins: [
    new ZipPlugin({
      path: '../',
      filename: 'vite-extension.zip'
    })
  ]
})
