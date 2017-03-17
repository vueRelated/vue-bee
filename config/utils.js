const path = require('path')
const projectConfig = require('./project.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const debug = require('debug')('app:config:utils');

debug(`检查 projectConfig.env.NODE_ENV:${projectConfig.globals.NODE_ENV}`)
/**
 *
 * @param _path 后缀资源
 * @returns {string|*}
 */
exports.assetsPath = function (_path) {
 /* var assetsSubDirectory = projectConfig.globals.NODE_ENV === 'production'
    ? projectConfig.compiler_static_path
    : projectConfig.compiler_static_path*/

  return path.posix.join(projectConfig.compiler_static_path, _path)
}
/**
 *
 * @param options
 * @returns {{css: *, postcss: *, less: *, sass: *, scss: *, stylus: *, styl: *}}
 */
exports.cssLoaders = function (options) {
  options = options || {}
  //注册默认的 css-loader
  var cssLoader = {
    loader: 'css-loader',
    options: {
      //生产环境启用压缩
      minimize: projectConfig.globals.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  // 生成loader使用插件中提取文本字符串
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // 当该选项指定提取CSS
    // (which is the case during production build)
    // (这种情况在生产过程中建立)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 为独立的样式文件生成加载器(.vue以外的)
exports.styleLoaders = function (options) {
  var  output = []
    var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
      //通过key 匹配 注入
      var loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
