import qs from 'qs';
import publicData from './public';

import Toast from './toast';
/*
*request 请求 
*兼容性：IE不兼容,fetch请求；
*支持get post
*/
function Http(req,URL){
	
	this.request = req 
	this.URL = URL;
	this.commonData = publicData.data;
	this.assign = function(data,newData){
			for(var i in newData){
				data[i] = newData[i]
			}
			return data;
	};
	//私有属性；私有方法；
	var isToken = function(data,that){

		var token = '12345678';

		if(token !='undefined' && token != null ){that.assign(data,{access_token:token});}

		return data;
	};
	var isUrl = function(url,that){
		
		if(/(^https?:\/\/)|(^\d{3}.\d{1,3}.\d{1,3}.\d{1,3}:\d{0,4})/.test(url))return url;

		else url = that.URL + url;

		return url; 

	};
	this.combine = function(url,data){
		var that = this;
		return {
			url:isUrl(url,that),
			data:isToken(data,that)
		}
	};
	this.getData = function(data,type){
		if(type === 'getData'){
				var gData = '';
				for(var i in data){
						gData += i +'=' + data[i] + '&';
				}
				gData = gData.substring(0,gData.length-1);

			return gData;
		   }else{
			throw new Error('The method is private,you connot use it!')
		}
	};
	return this;
}
Http.prototype.post = function(url,data,callBack,failer){
	data = data ||{};
	url = url || '';
	data = this.assign(data,this.commonData);
	var combine = this.combine(url,data)
	//console.log(combine);
	fetch(combine.url,{
        			 method:'post',
        			 body:qs.stringify(combine.data),
                     // mode:'cors',
                     // cache: "force-cache",
        			 headers:{
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        			 }
       }).then((res)=>res.json()).then((req)=>{
        		//console.log(req)
        		if(req.code==publicData.successCode){
        			callBack && callBack(req)
        		}else{
        			failer && failer(req)
        		}
        	}).catch((err)=>{
        		console.log(err)

        	})
};
Http.prototype.get = function(url,data,callBack,failer){
	data = data ||{};
	url = url || '';
	data = this.assign(data,this.commonData);
	var isurl = this.combine(url,{}).url;
	data = this.getData(data,'getData');
	//console.log(data)
	if(!data)isurl = isurl;
	else isurl = isurl+'?'+data;
	//console.log(isurl);
	fetch(isurl,{
        			 method:'get'
    }).then((res)=>res.json()).then((req)=>{
    	//console.log(req)
		if(req.code == publicData.successCode){
			callBack && callBack(req)
		}else{
			failer && failer(req)
		}
   	}).catch((err)=>{
    	console.log(err)
    })
}	
Http.prototype.scoket = function(argument){
	
};
var http = new Http('request',publicData.api);
export default http;