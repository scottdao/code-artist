var http = require('http');
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var server = http.createServer();
server.on('error',function(err){
	console.log(err);
})
var operation = {};
var dirname  = ''
operation.fileSys = function(file){
	dirname = file;
}

server.on('request',function(req,res){
	if(req.url !=='/favicon.ico'){
		var urlStr = url.parse(req.url);
		switch (urlStr.pathname) {
			case '/':
				var fileH = fs.readFileSync(dirname+'/html/index.html','utf8');
				domEle(200,res,fileH)
			break;
			case '/login/verCheck'://表单验证，get请求；
				var data = querystring.parse(urlStr.query);
				console.log(data);
				domEle(200,res,JSON.stringify(data))
			break;
			case '/regist/verCheck'://表单验证，post请求；
					req.on('data',function(chunck){
						//console.log(chunck.toString());
						var d = querystring.parse(chunck.toString());
						domEle(200,res,JSON.stringify(d))
					})
					
			break;
			default:
				var fileH = fs.readFileSync(dirname+'/html/404.html','utf8');
				domEle(404,res,fileH)
			break;
		}
		
	}
	
})

function domEle(code,res,content){
	res.writeHead(code,{//plain:纯文本；html:解析
			'Content-Type':'text/html;charset=utf-8'
		})
		res.end(content);
}
server.listen(8080,'127.0.0.1',function(){
	console.log('服务开启啦');
})

module.exports=operation