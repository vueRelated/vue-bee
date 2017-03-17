var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./index')
const projectConfig = require('./project.config.js')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf.js')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

// var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: projectConfig.productionSourceMap,
      extract: true
    })
  },
  devtool: projectConfig.productionSourceMap ? '#source-map' : false,
  /*output: {
    path: projectConfig.paths.dist(),
    filename:utils.assetsPath(`js/[name].${projectConfig.compiler_hash_type}.js`) ,
    chunkFilename:utils.assetsPath(`js/[id].${projectConfig.compiler_hash_type}.js`)
  },*/
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    //   new webpack.DefinePlugin(projectConfig.globals),
      //https://webpack.js.org/guides/migrating/#uglifyjsplugin-sourcemap
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    // css 提取
    new ExtractTextPlugin({
      filename: utils.assetsPath(`css/[name].${projectConfig.compiler_hash_type}.css`)
    }),
      //https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
    // Compress extracted CSS. We are using this plugin so that possible duplicated CSS from different components can be depend.
    // 提取压缩CSS。我们使用这个插件,这样可能从不同的组件提取可以重复的CSS
    new OptimizeCSSPlugin(),


      /*生成dist指数.html使用正确的资产散列缓存。
      您可以通过编辑自定义输出/ index . html
      参见https://github.com/ampedandwired/html-webpack-plugin*/
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        // 所需的模块内部node_modules提取到供应商
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to prevent vendor hash from being updated whenever app bundle is updated
    // 提取webpack运行时和模块体现自己的文件为了防止供应商散列更新每当应用程序更新包
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // 复制自定义静态资产
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
