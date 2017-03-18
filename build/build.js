require('./../config/check-versions')()


var rm = require('rimraf')
var webpack = require('webpack')
var projectConfig = require('../config/project.config')
var webpackConfig = require('../config/webpack.prod.conf.js')


const debug = require('debug')('app:build:build');
debug('开始构建')
console.log(webpackConfig)
console.log('--------------------------')


rm(projectConfig.paths.dist(projectConfig.compiler_static_path), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
      debug('构建停止')
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

      debug("建立完备.")
  })
});
