//引入路径
const path = require('path');
//引入webpack
const webpack = require('webpack');
//引入html模板插件；
const htmlWebpackPlugin = require('html-webpack-plugin');
//清空文件
const CleanWebpackPlugin = require('clean-webpack-plugin');
//将css文件单独打包到css文件中；
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//happypack多进程加速打包；
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
//加入happyThreadPool插件包；
function createHappyThread(id,loaders){
	return new HappyPack({
      id: id,
      threadPool: happyThreadPool,
      loaders: loaders,
      //cache:true
    })
}

module.exports={
	//入口文件；
	entry:{
		app:['babel-polyfill','whatwg-fetch','./app/index.jsx']
	},
	//出口文件；__dirname+'/build/project/'
	output:{
		path:path.join(__dirname,'/build/project/'),//配置打包路径
		//publicPath:'/',//打包后HTML对所有资源链接
		filename:'js/[name].min.js',
		chunkFilename:'chuncks/chunkfile.min.js'
	},
	resolve:{
		extensions:['.js','.jsx','.json','vue'],
		alias: {
		  MobileComponent: path.resolve(__dirname, 'app/mobile/component'),//代替模块路径
		  MobileCss:path.resolve(__dirname,'app/mobile/css'),
		  MobileImage:path.resolve(__dirname,'app/mobile/image'),
		  MobileJs:path.resolve(__dirname,'app/mobile/js'),
		  MobileRouter:path.resolve(__dirname,'app/mobile/router'),
		  PcComponent:path.resolve(__dirname, 'app/pc/component'),
		  Components:path.resolve(__dirname,'app/components'),
		  PcCss:path.resolve(__dirname, 'app/pc/css'),
		  pcImage:path.resolve(__dirname,'app/pc/image'),
		  PcJs:path.resolve(__dirname,'app/pc/js'),
		  PcRouter:path.resolve(__dirname,'app/pc/router')
		}
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
				test:/\.(png|jpg|gif|jpeg|svg)$/i,
				use:'file-loader?limit=2048&name=img/[hash:8].[name].[ext]'
			}
		]
	},
	plugins:[
		createHappyThread('jsx',[{
					loader:"babel-loader",
					 options: {
                    	cacheDirectory: true
               		 }
				}]),
		createHappyThread('sass',[{loader:'css-loader',options: {
                    minimize: true
                }},{loader:'postcss-loader',options: {
					sourceMap: true,
					config: {
						path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
					}} },{loader:'fast-sass-loader',options: { sourceMap: true }}]),
		createHappyThread('json',['json-loader']),
		new CleanWebpackPlugin(['build']//匹配删除的文件
			,{
			   root:__dirname,//根目录
			   verbose:  true,//开启控制台输出信息
				dry:false//启用删除文件
			}),
		new	ExtractTextPlugin({
		    filename: '[name].min.css',
		    allChunks: true
		}),
		 new webpack.ProvidePlugin({
			$$:"jquery",
			jquery:"jquery",
			"window.jquery":"jquery",
		}),
		//html模板插件；
		new htmlWebpackPlugin({
			template:__dirname+'/app/index.tmpl.html',
			favicon:'./logo.ico'
		}),
		 new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin({

		})
	]
}
