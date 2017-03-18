const utils = require('./utils')
const webpack = require('webpack')

const merge = require('webpack-merge')
const projectConfig = require('./project.config.js')
const baseWebpackConfig = require('./webpack.base.conf.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const debug = require('debug')('app:config:webpack.dev.conf');


debug("entry 添加热重载");
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  //根路径 ./build/dev-client
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
});
debug("base dev 合并");

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: projectConfig.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
      new webpack.DefinePlugin(projectConfig.globals),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    // 热模块更换插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
      //编译输出 HTML
    new HtmlWebpackPlugin({
      filename: 'index.html',
        template: projectConfig.paths.src('index.html'),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
