const cwd = process.cwd()
const path = require('path')
const {getAppConfig} = require('../utils/index')
const appConfig = getAppConfig() || {}
const publicPath = appConfig.publicPath || '/'
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = {
    entry: {
        app: path.resolve('src/index'),
    },
    output: {
        path: path.resolve(cwd, 'dist'),
        filename: "[name].bundle.js",
    },
    resolve: {
        alias: Object.assign({'@': path.resolve(cwd, 'src')}, appConfig.alias)
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['css-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
                use:  ['url-loader']
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [new CleanWebpackPlugin()],
}

module.exports = webpackBaseConfig