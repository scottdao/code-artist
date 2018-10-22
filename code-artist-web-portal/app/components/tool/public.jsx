var data = {
	/*version:'',
	os:'web',
	os_ver:'0.0.1'*/
}

var api = {
			  //prod:'http://screen.kinlink.cn/api/',
			 // prod:'https://pcw-api.iqiyi.com/subscribe/subscription/',
			 prod:'http://127.0.0.1:8080',
			  test:'',
			  dev:'',
			  douban:''
		}

var statusCode = {
	success:200,
	testsuccess:'A00000'
}

export default  {
		data,
		api:api.prod,
		successCode:statusCode.success,
		testCode: statusCode.testsuccess
};