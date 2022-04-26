const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  configureWebpack: {
    entry: {
      entry: `src/popup/index.ts`
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js',
      chunkFilename: `[name].js`
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/popup')
      },
      extensions: ['*', '.js', '.ts', '.tsx', '.vue', '.json']
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: 'static/icons',
            to: './icons'
          },
          {
            from: path.resolve(`src/manifest.json`),
            to: `./manifest.json`
          }
        ]
      })
    ]
  }
}
