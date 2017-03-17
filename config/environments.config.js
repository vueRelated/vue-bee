/*在这里,您可以定义配置覆盖基于执行环境。
 提供一个默认的关键的  NODE_ENV你想匹配的目标,和 基本配置将覆盖之前的出口.*/
module.exports = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development : (config) => ({
    compiler_public_path : `http://${config.server_host}:${config.server_port}/`,
      /*
      * css-loader
      */
    cssSourceMap:false
  }),

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production : (config) => ({
    compiler_public_path     : '/',
    compiler_fail_on_warning : false,
    compiler_hash_type       : 'chunkhash',
    compiler_devtool         : null,
    compiler_stats           : {
      chunks       : true,
      chunkModules : true,
      colors       : true
    },
    /*
     * css-loader
     */
      productionSourceMap:false
  })
}
