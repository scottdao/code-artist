const path = require('path');
const webpack = require('webpack'); //webpack的安装命令：npm i --save webpack -g
const openBrowser = require("open-browser-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
//配置本地域名；
const webpackServer = {
    protocol: 'http://',
    //host:'172.20.0.20',  
    host: '192.168.0.116',
    port: '3000'
}
module.exports = {
    // devtool:"eval-source-map",
    // 入口文件
    entry: path.resolve("./src/index.jsx"),
    output: {
        path: __dirname + "build",
        filename: "[name].bundle.js"
    },
    devtool: 'inline-source-map',
    devServer: { //配置Ip服务
        host: webpackServer.host,
        inline: true,
        port: webpackServer.port,
        contentBase: './build',
        hot: true
    },
    // 自动补全后缀
    resolve: {
        extensions: ['.js', ".jsx"],
        // extensions: ['','.js', ".jsx"]
    },

    module: {
        rules: [{
                test: /\.json$/,
                use: "json-loader"
            },
            {
                test: /\.(js|jsx)$/,
                use: "babel-loader"
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: "file-loader?limit=2048" // 小于2M的图片，进行base64编码
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }

        ]
    },
    plugins: [
        //清除文件
        new CleanWebpackPlugin('build'),
        // 文件信息
        new webpack.BannerPlugin("@Copyright by scott time:2018/01/16"),

        // 自动打开浏览器
        new openBrowser({
            url: webpackServer.protocol + webpackServer.host + webpackServer.port
        }),

        // 配置模板插件
        new htmlWebpackPlugin({
            favicon: './favicon.ico',
            template: __dirname + "/src/index.html"
        })
    ]
}