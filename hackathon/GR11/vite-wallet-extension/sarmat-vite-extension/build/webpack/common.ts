import * as path from 'path'
import { resolve } from 'path'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as Webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/dist/plugin'

export function fromSrc(p: string) {
  return path.resolve(__dirname, '../../src', p)
}

export default {
  context: path.resolve(__dirname, '../../src'),
  mode: process.env.NODE_ENV,
  entry: {
    background: [fromSrc('/background/index.js')],
    popup: fromSrc('/popup/index.ts'),
    'content-script': fromSrc('/content/index.js'),
    'inject-script': fromSrc('/content/injectScript.js')
  },
  output: {
    path: resolve('./dist'),
    pathinfo: false,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css|scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.ts|.tsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader'
          }
        }
      },
      {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'images/[base]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: path.resolve(__dirname, '../../src/popup/index.html')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../../src/popup/assets'),
          to: './assets'
        },
        { from: path.resolve(__dirname, '../../static'), to: './' }
      ]
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../src/popup'),
      '~': path.resolve('../../src'),
      services: path.resolve('../../src/services')
    },
    extensions: ['.ts', '.js', '.vue'],
    plugins: [new TsconfigPathsPlugin()]
  }
} as Webpack.Configuration
