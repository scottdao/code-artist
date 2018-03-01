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
//采用并行压缩打包；
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
//happypack多进程加速打包；
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

const webpackServer = {
	protocol:'http://',
	host:'localhost',
	//host:'192.168.0.108',
	port:'8080'
}
//加入happyThreadPool插件包；
function createHappyThread(id,loaders){
	return new HappyPack({
      id: id,
      threadPool: happyThreadPool,
      loaders: loaders
    })
}
module.exports={
	//入口文件；
	entry:{
		app:['./app/index.jsx']
	},
	//出口文件；__dirname+'/build/project/'
	output:{
		path:path.join(__dirname,'/build/project/'),//配置打包路径
		//publicPath:'/',//打包后HTML对所有资源链接
		filename:'js/[name].min.js',
		chunkFilename:'chuncks/chunkfile.min.js'
	},
	resolve:{
		extensions:['.js','.jsx','.json']
	},
	module:{
		rules:[
			{
				test:/\.(css|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'happypack/loader?id=sass'
                    
				})
			
			},
			{
				test:/\.(js|jsx)$/,
				use:'happypack/loader?id=jsx'
				
			},
			{
				test:/\.json$/,
				use:'happypack/loader?id=json'
				
			},
			{
				test:/\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use:'happypack/loader?id=styles'
                    
				})	
			},
			{
				test:/\.(png|jpg|gif|jpeg|svg)$/i,
				use:'happypack/loader?id=file'
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
		createHappyThread('jsx',[{
					loader:"babel-loader",
					 options: {
                    	cacheDirectory: true
               		 }
				}]),
		createHappyThread('sass',['css-loader','autoprefixer-loader','fast-sass-loader']),
		createHappyThread('json',['json-loader']),
		createHappyThread('less',['css-loader','autoprefixer-loader','less-loader']),
		createHappyThread('file',['file-loader?limit=2048&name=img/[hash:8].[name].[ext]']),
		new CleanWebpackPlugin(['build']//匹配删除的文件
			,{
			   root:__dirname,//根目录
			   verbose:  true,//开启控制台输出信息
				dry:false//启用删除文件
			}),
		//启用ParallelUglifyPlugin插件并行进行加速压缩js代码；
	    new ParallelUglifyPlugin({
	    	   cacheDir: '.cache/',
	    	   sourceMap:true,
	           uglifyJS:{
	             output: {
	               comments: false
	             },
	             compress: {
	               warnings: false
	             }
	           }
	      }),
	  
    	//生产环境和开发环境对代码压缩的区别；
	    new webpack.DefinePlugin({
	            'process.env': {
	            	NODE_ENV: JSON.stringify("production")
	            }
	        }),
	    new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
        //分离js与css样式插件；
		new	ExtractTextPlugin({
		    filename: '[name].min.css',
		    allChunks: true,
		}),
		//html模板插件；
		new htmlWebpackPlugin({
			template:__dirname+'/app/index.html',
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
