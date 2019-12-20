const path = require('path')
const cwd = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackDevConfig={
    mode:'development',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(cwd, 'dist'),
        filename: "[name].bundle.js",
        publicPath: '/'
    },
    plugins:[new HtmlWebpackPlugin({
      fileName:'public/index.html'
    })]
}

module.exports = webpackDevConfig