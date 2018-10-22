var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var svgCaptcha = require('svg-captcha');
var server = http.createServer();
server.on('error',function(err){
	console.log(err);
})
var operation = {};
var dirname  = ''
operation.fileSys = function(file){
	dirname = file;
}
function post_data(req,res){
	req.on('data',function(chunck){
						//console.log(chunck.toString());
						var d = querystring.parse(chunck.toString());
						console.log(d)
						domEle(200,res,JSON.stringify(d))
	})
}
function get_data(req,res,urlStr,sdata){
	
	domEle(200,res,JSON.stringify({code:200,message:sdata,err:null}))
	// req.send(sdata);
}
server.on('request',function(req,res){

	if(req.url !=='/favicon.ico'){
		var urlStr = url.parse(req.url);
		//console.log(urlStr);
		switch (urlStr.pathname) {
			case '/':
				var fileH = fs.readFileSync(dirname+'/html/index.html','utf8');
				domEle(200,res,fileH)
			break;
			case '/regist/checkVer'://注册，post请求；
			//console.log(urlStr.pathname)
				post_data(req,res);
			break;
			case '/login/checkVer'://登录，post请求；
				post_data(req,res);
			break;
			case '/graph/verifyCode'://获取图形验证码，get请求；
				var c = svgCaptcha.create();
				get_data(req,res,urlStr,{data:c.data});
			case '/message/verifyCode'://短信验证码，get请求；
				//console.log(urlStr);
				var data = querystring.parse(urlStr.query);
				console.log(data)
			    get_data(req,res,urlStr,{data:'345678'});
			default:
				var fileH = fs.readFileSync(dirname+'/html/404.html','utf8');
				domEle(404,res,fileH);
			break;
		}
		
	}
	
})

function domEle(code,res,content){
	res.writeHead(code,{//plain:纯文本；html:解析
			'Content-Type':'text/html;charset=utf-8',
			 'Access-Control-Allow-Origin': '*',
		      "Access-Control-Allow-Credentials":"true",
		      'Access-Control-Allow-Headers':'X-Requested-With',
		      "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
		})

	res.end(content);

}
server.listen(8080,'127.0.0.1',function(){
	console.log('服务开启啦');
})

module.exports=operation