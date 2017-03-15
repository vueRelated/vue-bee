const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const project = require('./project.config')
const debug = require('debug')('app:config:webpack')

const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__
const __TEST__ = project.globals.__TEST__

debug('Creating configuration.')
const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve : {
      // modules       : [project.paths.client()],
    extensions: ['.js', '.vue', '.json'],
  },
  module : {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js')

webpackConfig.entry = {
  app : __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : [APP_ENTRY],
  vendor : project.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename   : `[name].${project.compiler_hash_type}.js`,
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path
}



// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  //注入项目全局参数
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    filename : 'index.html',
    inject   : 'body'
  })
]



// ------------------------------------
// Loaders
// ------------------------------------
/*
webpackConfig.module={
    rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
        { test: /\.vue$/, loader: 'vue-loader' }
    ]
}
*/

// ------------------------------------
// Style Loaders
// ------------------------------------

module.exports = webpackConfig;
