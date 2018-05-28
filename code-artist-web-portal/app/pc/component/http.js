import qs from 'qs'

function Http(){
	this.url = 'http://api.wawa.kinlink.cn';
    this.log = function(val,flag){
        if (flag == true) {
            console.log(val)
        }
    }
}
Http.prototype.post = function(url,data,callBack){
		let $this = this;
		fetch($this.url+url,{
        			 method:'post',
        			 body:qs.stringify(data),
        			 headers:{
        			 	'content-type':'application/x-www-form-urlencoded'
        			 }
        	}).then((res)=>res.json()).then((req)=>{
          		callBack(req)
        	}).catch((err)=>{
        		this.log(err,true);
        	})
}
Http.prototype.get = function(url,data){
	let $this = this;
	fetch($this.url+url,{
        			 method:'get',
        			 body:qs.stringify(data)
        	}).then((res)=>res.json()).then((req)=>{
          		callBack(req)
        	}).catch((err)=>{
        		this.log(err,true);
        	})
}
 var http = new Http();
 

export default http;