/* 项目配置 */
const path = require('path')
const ip = require('ip')
const debug = require('debug')('app:config:project')

debug('开始创建默认配置.')

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


// ========================================================
// Default Configuration
// ========================================================
debug(`查看 env:${process.env.NODE_ENV}`)
const config = {
    //是否自动打开浏览器
    autoOpenBrowser:false,
    bundleAnalyzerReport:false,

  env : process.env.NODE_ENV || 'development',
  timestamp:new Date().getTime(),
  // ----------------------------------
  // 项目结构
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_src : 'src',
  dir_dist   : 'dist',
  dir_public : 'public',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // 服务器配置
  // ----------------------------------
  server_host : ip.address(), // 使用字符串“localhost”,以防止暴露在本地网络
  server_port : process.env.PORT || 8888,

    // ----------------------------------
    // 代理地址
    // ----------------------------------
    http_agent : 'http://localhost:8082',
    http_prefix : '/AdminApi',
    proxyTable:{},
  // ----------------------------------
  // 编译结构
  // ----------------------------------
  compiler_babel : {
    cacheDirectory : true,
    plugins        : ['transform-runtime'],
    presets        : ['es2015', 'stage-2']
  },
  compiler_devtool         : 'source-map',
  compiler_hash_type       : new Date().Format("yyyy.MM.dd_hh.mm.ss.S"),
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_public_path     : '/',
  compiler_static_path     : 'static',
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true
  },
  compiler_vendors : [
    'vue',
    'vuex',
    'vue-router'
  ]
};

// ------------------------------------
// 环境
// ------------------------------------

config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || ''),
    //当前ip地址端口
   '__SERVER_HOST__': JSON.stringify(`http://localhost:${config.server_port}`)
};


// ------------------------------------
// 验证 依赖
// ------------------------------------
const pkg = require('../package.json')

config.compiler_vendors = config.compiler_vendors
  .filter((dep) => {
    if (pkg.dependencies[dep]) return true;

    debug(
        ` 配置在 compiler_vendors 里的依赖包 "${dep}" 未包含在 package.json dependencies 里  ,`
    )
  });

// ------------------------------------
// 实用工具
// ------------------------------------
function base () {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base   : base,
  src : base.bind(null, config.dir_src),
  public : base.bind(null, config.dir_public),
  dist   : base.bind(null, config.dir_dist)
};

// ========================================================
// 环境配置
// ========================================================
debug(`当前 NODE_ENV "${config.env}".`)
const environments = require('./environments.config')
const overrides = environments[config.env]
if (overrides) {
  debug('发现覆盖,申请默认配置.')
  Object.assign(config, overrides(config))
} else {
  debug('没有发现环境覆盖,将使用默认值.')
}

module.exports = config
