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
    output: {
        path: projectConfig.paths.dist(),
        filename: utils.assetsPath(`js/[name].${projectConfig.compiler_hash_type}.js`),
        chunkFilename: utils.assetsPath(`js/[name].${projectConfig.compiler_hash_type}.js`)
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
                //为何有 jsx 初衷是为了兼容 vue react 多种环境下的打包模式,当然你可以显示的去掉,放在这里也并不影响vue
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [projectConfig.paths.src()]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(projectConfig.globals)
    ]
};
