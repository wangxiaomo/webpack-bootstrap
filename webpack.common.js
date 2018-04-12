const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let srcDir = path.join(__dirname, 'src'),
  buildDir = path.join(__dirname, 'dist'),
  htmlMinify = process.env.NODE_ENV === 'production'

module.exports = {
  context: srcDir,
  entry: './app.js',
  output: {
    path: buildDir,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          },
          'extract-loader',
          {
            loader: 'html-loader',
            options: {
              minimize: htmlMinify
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([buildDir])
  ],
}
