//检查 node 版本
// require('../config/check-versions')()

const projectConfig = require('../config/project.config')
//自动打开浏览器
const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('../config/webpack.dev.conf.js')
const debug = require('debug')('app:build:dev.sever');

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// 义HTTP代理API的后端
if(projectConfig.proxyTable){
  var proxyTable = projectConfig.proxyTable
  Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}

// handle fallback for HTML5 history API
// 处理历史后备HTML5 API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// webpack 服务 的输出
app.use(devMiddleware)

// enable hot-reload and state-preserving
// 热重载 和 状态保留
// compilation error display
// 编译错误显示
app.use(hotMiddleware)

// 代理服务器上的静态资源 映射
var staticPath = path.posix.join(projectConfig.compiler_public_path, projectConfig.compiler_assets_path)
app.use(staticPath, express.static(projectConfig.paths.static()))

var uri = 'http://localhost:' + projectConfig.server_port

devMiddleware.waitUntilValid(function () {
  debug('> Listening at ' + uri + '\n')
})

module.exports = app.listen(projectConfig.server_port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  //控制是否打开浏览器
  if (projectConfig.autoOpenBrowser) {
    opn(uri)
  }
});
