const path = require('path');
const webpack = require('webpack')


const HtmlWebpackPlugin = require('html-webpack-plugin');
const cwd = process.cwd();

// https://www.cnblogs.com/skylor/p/7008756.html 【webpack整理】
module.exports = {
  mode: 'development', // development || production or webpack --mode developmen
  entry: './public/index.js',
  context: cwd,
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
      '.ts','.js','.json' // 少写 extensions 会引起 webpack-dev-server 强制使用 iframe 模式，否则会报错
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      // inject: 'head'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  // devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
    }]
  },
  // 先全局安装  webpack-dev-server -g and --save-dev
  devServer: {
    contentBase: path.join(process.cwd(), "public"),
    open: true,
    host: '0.0.0.0',
    port: 9091,
    inline: true,
    hot: true,
    compress: false
  },
  watchOptions: {
    ignored: [path.resolve(__dirname, './dist/**/*.*'), 'node_modules']
  }
};