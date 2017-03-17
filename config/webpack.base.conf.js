const path = require('path')
const utils = require('./utils')
const projectConfig = require('./project.config.js')
const vueLoaderConfig = require('./vue-loader.conf.js')
const debug = require('debug')('app:config:webpack.base.conf');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: projectConfig.paths.src('main.js')
  },
  /*output: {
    path:projectConfig.paths.dist(),
    filename: `[name].${projectConfig.compiler_hash_type}.js`,
    publicPath: projectConfig.compiler_public_path
  },*/
  output: {
      path: projectConfig.paths.dist(),
      filename:utils.assetsPath(`js/[name].${projectConfig.compiler_hash_type}.js`) ,
      chunkFilename:utils.assetsPath(`js/[id].${projectConfig.compiler_hash_type}.js`)
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': projectConfig.paths.src(),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [projectConfig.paths.src()]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: projectConfig.paths.static('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: projectConfig.paths.static('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
    plugins: [
        new webpack.DefinePlugin(projectConfig.globals)
    ]
};
