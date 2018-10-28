var express = require('express');//引入

var app = express();
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});
app.get('/', function (req, res) {
   res.send('Hello World');
})
app.post('/login',urlencodedParser,function(req,res){
 	var response = {
       "first_name":req.body.first_name,
       "last_name":req.body.last_name
   };
   
   res.end(JSON.stringify(response));
 })
app.post('/regist',urlencodedParser,function(req,res){
	console.log(req.body)
	var response = {
       'code':200,
       'message':'提交成功'
   };
	res.end(JSON.stringify(response))
})
 var server = app.listen(8080,'127.0.0.1', function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("地址：", host, port)
 
})


