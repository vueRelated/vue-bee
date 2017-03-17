const utils = require('./utils')
const projectConfig = require('./project.config.js')
const isProduction = projectConfig.globals.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? projectConfig.productionSourceMap
      : projectConfig.cssSourceMap,
    extract: isProduction
  })
}
