 const merge = require('webpack-merge');//代码合并插件
 const common = require('./webpack.common.js');//引入公共插件
//引入webpack
const webpack = require('webpack');
//引入打开浏览器插件；
const openBrowser = require('open-browser-webpack-plugin');
//引入html模板插件；
const htmlWebpackPlugin = require('html-webpack-plugin');

const webpackServer = {
	protocol:'http://',
	//host:'localhost',
	host:'192.168.0.111',
	port:'8080'
}
module.exports = merge(common, {
	cache:true,
	devtool: 'inline-source-map',//会导致打包后的文件体积庞大，适用于本地
	devServer: {
		host: webpackServer.host,
		port: webpackServer.port,
		historyApiFallback: true, //不跳转
	    inline: true,
	    hot: true,
		lazy: false,
		compress: true,
		quiet:false,
		noInfo:false,
		overlay: {
			warnings: true,
			errors: true
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		proxy: {//通过代理解决本地跨域
        '/api': {
            target: 'http://api.douban.com',
            changeOrigin: true,
            pathRewrite: {
                '^/api': '/' //这里理解成用‘/api’代替target里面的地址，组件中我们调接口时直接用/api代替
                    // 比如我要调用'http://0.0:300/user/add'，直接写‘/api/user/add’即可 代理后地址栏显示/
            }
           }
        },
	    contentBase:'./build'
},
plugins:[
		new openBrowser({
			url:webpackServer.protocol+webpackServer.host+':'+webpackServer.port
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
]
})