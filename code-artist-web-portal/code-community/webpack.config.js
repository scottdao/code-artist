//引入路径
const path = require('path');
//引入webpack
const webpack = require('webpack');
//引入打开浏览器插件；
const openBrowser = require('open-browser-webpack-plugin');
//引入html模板插件；
const htmlWebpackPlugin = require('html-webpack-plugin');
//清空文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//将css文件单独打包到css文件中；
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//压缩打包；
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackServer = {
	protocol:'http://',
	host:'localhost',
	port:'8080'
}
module.exports={
	//入口文件；
	entry:{
		vendor: ['react','react-dom','react-router'],
		app:['./src/index.jsx']
	},
	//出口文件；__dirname+'/build/project/'
	output:{
		//path:path.join(__dirname,'../','/build/project/'),//配置打包路径
		path:path.join(__dirname,'/build/project/'),
		publicPath:'./',//打包后HTML对所有资源链接
		filename:'js/[name].min.js',
		chunkFilename:'chuncks/chunkfile.min.js'
	},
	resolve:{
		extensions:['.js','.jsx','json']
	},
	module:{
		rules:[
			{
				test:/\.(css|scss)$/,
//				use:[
//					"style-loader",
//					"css-loader",
//					"sass-loader"
//				]
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'sass-loader'
                    ]
				})
			
			},
			{
				test:/\.(js|jsx)$/,
				use:"babel-loader"
			},
			{
				test:/\.json$/,
				use:"json-loader"
				
			},
			{
				test:/\.less$/,
//				use:[
//					"style-loader",
//					"css-loader",
//					"less-loader"
//				]
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'autoprefixer-loader',
                        'less-loader'
                    ]
				})	
			},
			{
				test:/\.(png|jpg|gif|jpeg|svg)$/i,
				use:"file-loader?limit=2048&name=img/[hash:8].[name].[ext]",
		    }
		]
	},
	devServer: {
		host: webpackServer.host,
		port: webpackServer.port,
		historyApiFallback: true, //不跳转
	    inline: true,
	    hot: true,
	    contentBase:'./build'
	},
    devtool: "source-map",
	plugins:[
		new CleanWebpackPlugin(['build']//匹配删除的文件
			,{
			   root:__dirname,//根目录
			   verbose:  true,//开启控制台输出信息
				dry:false//启用删除文件
			}),
		//启用UglifyJsPlugin插件进行加速压缩js代码；
	    new UglifyJsPlugin(),
    	//生产环境和开发环境对代码压缩的区别；
	    new webpack.DefinePlugin({
	            'process.env': {NODE_ENV: '"production"'}
	        }),
		new	ExtractTextPlugin({
		    filename: '[name].min.css',
		    allChunks: true,
		}),
		//html模板插件；
		new htmlWebpackPlugin({
			template:__dirname+'/src/index.html',
			favicon:'./favicon.ico'
		}),
		//自动开启浏览器；
		new openBrowser({
			url:webpackServer.protocol+webpackServer.host+':'+webpackServer.port
		}),
		//文件信息；
		new webpack.BannerPlugin('@Copyright by scott time:2018')
	]
}
