const path = require('path');

const webpack = require('webpack')
// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = {
  mode: 'development', // development || production or webpack --mode developmen
  entry: './src/index.ts',
  output: {
    filename: 'ddd.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'window', // window|var|umd|amd|commonjs|jsonp
    library: {
      root: ["DDD"],
      amd: "ddd-amd",
      commonjs: "ddd-common"
    },
    umdNamedDefine: true,
  },
  resolve: {
    extensions: [
      '.ts'
    ]
  },
  plugins: [],
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  // 先全局安装  webpack-dev-server -g and --save-dev
  devServer: {
    contentBase: path.join(__dirname, "test"),
    compress: false,
    open: true,
    port: 9090
  },
  watchOptions: {
    ignored: [path.resolve(__dirname, './dist/**/*.*'), 'node_modules']
  }
};