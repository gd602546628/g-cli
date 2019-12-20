const baseConfig = require('../webpackConfig/base')
const devConfig = require('../webpackConfig/dev')
const merge = require('webpack-merge');
const webpackDevMiddleware = require('webpack-dev-middleware')
const express = require('express')
const webpack = require('webpack')


function devServer(isRd) {
    const config = merge(baseConfig, devConfig)
    const compiler = webpack(config)
    const app = express()

    app.use(webpackDevMiddleware(compiler,{publicPath: config.output.publicPath}))
    app.listen(3000, function () {
        console.log('开发服务启动')
    })
}

module.exports = devServer