const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const vendor =  [
    'react',
    'react-dom',
    'react-router',
    'jquery',
	'antd'
module.exports = {
    output: {
        path: 'build',
        filename: '[name].js',
        library: '[name]',
        libraryTarget:'umd',
        umdNameDefine:true
    },
    module:{
    	noParse:/node_modules\/(jquery\.js)/
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
    	new webpack.ProvidePlugin({
    		$:"jquery",
    		jquery:"jquery",
    		"window.jquery":"jquery",
    		
    	}),
    	new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.optimize.UglifyJsPlugin({
    		compress:{
    			warnings:false,
    			drop_debugger:true,
    			drop_console:true
    		}
    	}),
   // 分离CSS和JS文件
    new ExtractTextPlugin('[name].[chunkhash:8].css'),
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[chunkhash:8].js'
    }),
    new webpack.DllPlugin({
        path: 'manifest.json',
        name: '[name]',
        context: __dirname,
    })
    ]
}