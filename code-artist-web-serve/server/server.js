var http = require('http');
var httpProxy = require('http-proxy');
//console.log(httpProxy);
var url = require('url');
var fs = require('fs');
var querystring = require('querystring');
var svgCaptcha = require('svg-captcha');
var server = http.createServer();
server.on('error',function(err){
	console.log(err);
})
let proxy = httpProxy.createProxyServer({
    target: 'http://127.0.0.1:3000',
    secure: false,

})

console.log(httpProxy)
var operation = {};
var dirname  = ''
operation.fileSys = function(file){
	dirname = file;
}
// proxy.on('error', function (err, request, response) {
//     res.writeHead(500, {
//         'Content-Type': 'text/plain'
//     })
//     console.log(err)
//     res.end('Something went wrong.')
// })
function post_data(req,res,method){
	req.on('data',function(chunck){
						//console.log(chunck.toString());
						var d = querystring.parse(chunck.toString());
						console.log(d)
						var mes = '';
						switch(method){
							case 'regist':
							mes = '注册成功'
							break;
							case 'login':
							mes = '登录成功';
							break;
							case 'phoneNumber':
							mes = '手机号验证成功';
							break;
							case 'reVerPswd':
							mes = '密码设置成功';
							break;
							default:
							break;
						}
						
						domEle(200,res,JSON.stringify({code:200,message:mes,error:null}))
	})
}
function get_data(req,res,urlStr,sdata){
	
	domEle(200,res,JSON.stringify({code:200,message:sdata,err:null}))
	// req.send(sdata);
}
server.on('request',function(req,res){

	if(req.url !=='/favicon.ico'){
		var urlStr = url.parse(req.url);
		//console.log(urlStr.pathname );
		//console.log(urlStr.pathname==='/user/pswd')
		//console.log(urlStr);
		if(/\/api\/.*$/.test(urlStr.pathname)){
			  proxy.web(req, res);
        	  return;
		}
		switch (urlStr.pathname) {
			case '/':
				var fileH = fs.readFileSync(dirname+'/html/index.html','utf8');
				domEle(200,res,fileH)
			break;
			case '/checkVer/regist'://注册，post请求；
			//console.log(urlStr.pathname)
				post_data(req,res,'regist');
			break;
			case '/checkVer/login'://登录，post请求；
				post_data(req,res,'login');
			break;
			case '/checkVer/phoneNumber'://验证手机号，post请求；
				post_data(req,res,'phoneNumber');

			break;
			case '/user/pswd'://设置密码，post请求
			//console.log(1111)
				post_data(req,res,'reVerPswd');
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
			  'Access-Control-Allow-Origin': 'http://localhost:8080',
		      "Access-Control-Allow-Credentials":"true",
		      'Access-Control-Allow-Headers':'X-Requested-With',
		      "Access-Control-Allow-Methods":"PUT,POST,GET,DELETE,OPTIONS"
		})

	res.end(content);

}
server.listen(3000,'127.0.0.1',function(){
	console.log('....')
});

module.exports=operation