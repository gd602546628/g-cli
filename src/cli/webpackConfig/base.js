const cwd = process.cwd()
const path = require('path')
const {getAppConfig} = require('../utils/index')
const appConfig = getAppConfig() || {}
const publicPath = appConfig.publicPath || '/'
const webpackBaseConfig = {
    entry: {
        app: path.resolve('src/index'),
        publicPath,
        path: path.resolve(cwd, 'dist'),
        filename: "[chunkhash].bundle.js",
        resolve: {
            alias: Object.assign({'@': path.resolve(cwd, 'src')}, appConfig.alias)
        },
        plugins:[],
    }
}