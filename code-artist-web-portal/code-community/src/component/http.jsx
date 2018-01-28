/*
 *ajax请求使用方式：
 * http.newAjax({
 * 		url:'',//路径
 * 		method:'',//post/get
 * 		data:{},//数据
 * 		dataType:'',//默认text，支持json/jsonp/XML/text
 * 		contentType:'',//post请求，请求头字段设置
 * 		Authorization:'',//授权码,必须在contentType字段为json时，才能进行授权，
 * 		//x-www-form-urlencoded字段不能设置授权字段，会报错；
 * 		async:true,//true（异步）false(同步)
 *      success:function(){},//成功回调函数
 * 		error:function(){}//错误回调函数,一般是http码状态错误
 * })
 * 
 * */
 
function Http() {
	//数据拼接；
	this.jointData = function(jiont) {
		let jiontString = ''
		for(let i in jiont) {
			jiontString += i + "=" + jiont[i] + "&"
		}
		return jiontString.substr(0, jiontString.length - 1);
	}
	//请求成功移除script；
	this.removeScript = function(id){
		var  Bscript = document.getElementById(id);
	    document.body!=null&&Bscript!=null?document.body.removeChild(Bscript):'';
	}
	//状态监听函数；
	this.statusFunc = function(setAjax,option){
		//监听ajax状态码；
				
				if(setAjax.readyState == 4) {
					//监听http状态码
					
					if(setAjax.status >= 200 && setAjax.status < 300 || setAjax.status == 304) {
						
	      				let data = option.dataType == 'json' ? JSON.parse(setAjax.responseText) : option.dataType == 'XML' ? setAjax.responseXML : setAjax.responseText;
						option.success(data);
					}else{
						//debugger
						let err = setAjax.responseText ? JSON.parse(setAjax.responseText) : setAjax.responseText;
						option.error(err);
					}
				}
	}
}
//ajax请求封装
Http.prototype.scottAjax = function(option) {
	let defaultOption = {
		url: '',
		method: 'post',
		data: {},
		dataType: 'text',
		contentType: 'application/json;charset=UTF-8',
		success:function(){},
		error:function(){},
		Authorization:'Authorization',
	    async:true
	}
	option = option || defaultOption;
	option.method = option.method || defaultOption.method;
	option.url = option.url || defaultOption.url;
	option.contentType = option.contentType ||defaultOption.contentType;
    option.Authorization = option.Authorization || defaultOption.Authorization;
    option.async = option.async===false?option.async:(option.async==true?option.async:defaultOption.async)
	option.dataType = option.dataType || defaultOption.dataType;
	//console.log(option.async)
	if(option.dataType == 'jsonp') {
		const random = Math.random() * 100;  
        const number = parseInt(random); 
        const successRandom = "successrandom_" + number; //指定回调函数  
        window[successRandom] = option.success;
		const Ascript = document.createElement('script');
		const srcUrl = option.url+'?callback='+successRandom;
		//拼接data数据；
	    Ascript.src = option.data?(JSON.stringify(option.data) == '{}' ? srcUrl : (srcUrl + '&'+ this.jointData(option.data))):srcUrl 
		Ascript.type = 'text/javascript';
		document.body.appendChild(Ascript);
		//数据每次请求成功后移除script；
		Ascript.id=number;
		this.removeScript(Ascript.id);
	} else {
		
		let setAjax;
		let newData = null;
			//第一步创建ajax对象
			if(window.XMLHttpRequest) {
				setAjax = new XMLHttpRequest();
				//setAjax.withCredentials = true;
			} else {
				setAjax = new ActiveXObject("Microsoft.XMLHTTP");
			}
			if(/^get$/i.test(option.method)) {
				const newUrl = option.data ? (JSON.stringify(option.data) == '{}' ? option.url : option.url + '?' + this.jointData(option.data)) : option.url
				//调取方法，open方法；
				setAjax.open(option.method, newUrl,option.async);
			} else if(/^post$/i.test(option.method)) {
				//debugger
				setAjax.open(option.method, option.url,option.async);
				
				let contentType = option.contentType ? option.contentType : defaultOption.contentType;
				setAjax.setRequestHeader("Content-type", contentType);
				//通过Content-type字段拼接设置数据；
				if(contentType == ('application/json;charset=UTF-8')) {
					setAjax.setRequestHeader('Authorization', option.Authorization);
					newData = JSON.stringify(option.data)
                } else if(contentType == 'application/x-www-form-urlencoded;charset=UTF-8') {
					newData = option.data ? (JSON.stringify(option.data) == '{}' ? null : this.jointData(option.data)) : null
				}
		}
		//send方法；
		newData = newData===undefined?null:newData
		//debugger
		setAjax.send(newData);
		//监听状态请求；
		if(option.async){
			let that = this;
			setAjax.onreadystatechange = function() {
				
				that.statusFunc(setAjax,option)
			}
		}else{
			this.statusFunc(setAjax,option)
		}
	}
}
Http.prototype.newFetch = function() {

}
let http = new Http();

export default http