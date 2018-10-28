import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';

import Bottom from 'PcComponent/bottom';
import Input from 'PcComponent/Input';
import Button from 'PcComponent/Button';
import 'PcCss/component.scss';
import tool from 'Components/tool'
class ForgetPawd extends Component{
    constructor(){
        super()
        this.state={
            noteVer:'获取短信验证码',
            fontSize:'10px',
            graphVerCode:'',
            forgetPswdData:{},
            forgetPhoneTipColor:"",
            forgetPhoneTip:'',
            forgetPswdGraphCode:'',
            forgetPswdGraphCodeColor:'',
            forgetPswdMessageColor:'',
            forgetPswdMessageCode:"",
            reSetPswdFlag:false,
            isDisabled:true,
            pswdTip:'',
            pswdTipColor:'',
            repswdTip:'',
            repswdTipColor:''
        }
    }
     getGraph(){
         let that = this;
        tool.get('/graph/verifyCode',function(res){
            console.log(res.message);
            that.setState({
                graphVerCode:res.message.data
            })
        })
    }
    componentDidMount(){
    	this.getGraph && this.getGraph()
    }
     componentWillUnmount(){
         this.timer && clearInterval(this.timer)
    }
    findValue(data){
      //console.log(Object.keys(data).length)
      if(Object.keys(data).length!==0){
         for(var i in data){
          console.log(data[i])
          if(!data[i])return false
        }
      }else {
        return false
      }
     
      return true;
    }
    verCheckPhone(forgetPswdData){

      var f = this.findValue(forgetPswdData);
      //console.log(f)
      const $this = this;
      f && tool.post('/checkVer/phoneNumber',forgetPswdData,function(res){
           console.log(res);clearInterval($this.timer);
           $this.setState({
              reSetPswdFlag:true
           })
      })
    }
    setNewPswd(forgetPswdData){
        tool.post('/user/reVerPswd',{
          phone:forgetPswdData.phone,
          pswd:forgetPswdData.pswd,
          repswd:forgetPswdData.repswd
        },function(res){
          console.log(rse)
          hashHistory.push('/')
        })
    }
    render(){
          let {noteVer,fontSize,graphVerCode,forgetPswdData,forgetPhoneTip,forgetPhoneTipColor,
               forgetPswdGraphCode,
              forgetPswdGraphCodeColor,
              forgetPswdMessageColor,
              forgetPswdMessageCode,
              reSetPswdFlag,
              isDisabled,
               pswdTip,
              pswdTipColor,
              repswdTip,
              repswdTipColor
              } = this.state;
         const $this = this
        return(
                 <React.Fragment>
                  <div className='resgist-main' style = {{display:!reSetPswdFlag?'block':'none'}}>
                    <div className='main-head'>
                        <ul className='clearFix'>
                            <li>手机密码</li>
                        </ul>
                    </div>
                    <div className='form-content'>
                      
                            <div style={{padding:'10px 0'}}>
                                <Input type='phone' id='phone' inputChange={(e)=>{
                                    //console.log(e)
                                   var pf =  /^1[345678]\d{9}$/.test(e.replace(/\s+/g,''))
                                    
                                      forgetPswdData.phone = e
                                      this.setState({
                                        forgetPswdData:forgetPswdData,
                                        forgetPhoneTip:pf?'通过':'手机号不正确',
                                        forgetPhoneTipColor:pf?'green':'red',
                                        //isDisabled:pf?false:true
                                      })
                                   
                                }} inputBlur={(e)=>{
                                   var pf =  /^1[345678]\d{9}$/.test(e.replace(/\s+/g,''))
                                    
                                      forgetPswdData.phone = e
                                      this.setState({
                                        forgetPswdData:forgetPswdData,
                                        forgetPhoneTip:pf?'通过':'手机号不正确',
                                        forgetPhoneTipColor:pf?'green':'red',
                                         //isDisabled:pf?false:true
                                      })
                                   
                                }} labelName='手机号' colorValTip={forgetPhoneTipColor}  deleteBtn='delete' defaultTip={forgetPhoneTip?forgetPhoneTip:'一个手机号只能拥有一个账号'}
                                />
                            </div>
                             <div style={{padding:'10px 0',position:"relative"}}>
                                <Input type='text' id='imgCode' width='120px' inputChange={(e)=>{
                                      forgetPswdData.graphVerCode = e
                                      this.setState({
                                        forgetPswdData:forgetPswdData,
                                        forgetPswdGraphCode:e?'':'请输入图形码',
                                        forgetPswdGraphCodeColor:e?'':'red',
                                        //isDisabled:e?false:true
                                      })
                                   
                                }} inputBlur={(e)=>{
                                    forgetPswdData.graphVerCode = e
                                      this.setState({
                                        forgetPswdData:forgetPswdData,
                                        forgetPswdGraphCode:e?'':'请输入图形码',
                                        forgetPswdGraphCodeColor:e?'':'red',
                                        //isDisabled:e?false:true
                                      })
                                }} labelName='图形验证码' />
                                <Button width='120px' color='#333' backgroundColor='#fff'  style={{fontSize:'10px',position :'absolute',top:'-10%',left:'23.5%'}} 
                                 clickEvent = {(e)=>{ 
                                   this.getGraph && this.getGraph()
                                  }}><span dangerouslySetInnerHTML={{__html:graphVerCode}} /></Button>
                                   <span style={{color:forgetPswdGraphCodeColor,position:'absolute',top:'36%',left:'40%'}}>{forgetPswdGraphCode}</span>
                            </div>
                            <div style={{padding:'10px 0',position:"relative"}}>
                                <Input type='text' inputChange={(e)=>{
                                  forgetPswdData.messageCode = e;
                                  this.setState({
                                    forgetPswdData:forgetPswdData,
                                    forgetPswdMessageColor:e?'':'red',
                                    forgetPswdMessageCode:e?'':'请输入短信验证码',
                                    isDisabled:e?false:true
                                  })
                                }} inputBlur={(e)=>{
                                   forgetPswdData.messageCode = e;
                                  this.setState({
                                    forgetPswdData:forgetPswdData,
                                    forgetPswdMessageColor:e?'':'red',
                                    forgetPswdMessageCode:e?'':'请输入短信验证码',
                                    isDisabled:e?false:true
                                  })
                                }} id='noteCode' width='120px' labelName='短信验证码' />
                                <Button width='120px' fontSize={fontSize}  style={{fontSize:'10px',position :'absolute',top:'16%',left:'24.5%'}} 
                                 clickEvent = {(e)=>{ 
                                  if(forgetPswdData.phone){
                                    if(forgetPswdData.graphVerCode){
                                      tool.get('/message/verifyCode',{phone:forgetPswdData.phone},function(res){
                                              console.log(res)
                                             $this.setState({
                                                  fontSize:'18px',
                                                  noteVer:60 +'s'
                                              })
                                              var t = 60;
                                              $this.timer = setInterval(()=>{
                                                  t--;
                                                  t = t<10?('0'+t):t;
                                                  let st = t + 's'
                                                  let fontSize = ''
                                                  let nt = t.toString().substring(0,1);
                                                  let nt2 = t.toString().substring(1,2);
                                                  nt<=0?(nt2<=0?(clearInterval($this.timer),st = '重新获取验证码',fontSize='10px'):''):'';
                                                  $this.setState({
                                                      noteVer:st,
                                                      fontSize:fontSize
                                                  })
                                              },1000);
                                      })
                                 
                                  }else {
                                    alert('图形验证码为空！')
                                  }
                                  }else {
                                    alert('手机号为空！')
                                  }
                                    
                                  }}>{noteVer}</Button>
                                   <span style={{color:forgetPswdMessageColor,position:'absolute',top:'36%',left:'40%'}}>{forgetPswdMessageCode}</span>

                            </div>
                         <Button width='160px' style={{
                                marginTop:"20px",
                                marginLeft:'0px'
                              }}  disabled={isDisabled} clickEvent = {(e)=>{
                                  
                                  this.verCheckPhone && this.verCheckPhone(forgetPswdData)
                              }}>下一步</Button>
                    </div>
                  </div>

                 {/*设置密码*/}
                 <div className='set-pswd' style={{display:reSetPswdFlag?'block':'none'}}>
                    <div className='pswd-main'>
                        <div className='main-content'>
                            <h3>重置密码</h3>
                             <div style={{padding:'10px 0'}}>
                                <Input type='password' inputChange={(e)=>{
                                    var pdf = /^[a-zA-Z0-9_.,@#$%^&*;:]{6,}$/.test(e);
                                    forgetPswdData.pswd = e
                                    this.setState({
                                      pswdTip:pdf?'通过':'密码不通过',
                                      pswdTipColor:pdf?'green':'red',
                                      forgetPswdData:forgetPswdData
                                    })
                                }} inputBlur={(e)=>{
                                    forgetPswdData.pswd = e
                                     var pdf = /^[a-zA-Z0-9_.,@#$%^&*;:]{6,}$/.test(e);
                                    this.setState({
                                      pswdTip:pdf?'通过':'密码不通过',
                                      pswdTipColor:pdf?'green':'red',
                                      forgetPswdData:forgetPswdData
                                    })
                                }} id='newpswd'  colorValTip={pswdTipColor} labelName='新密码' defaultTip={pswdTip?pswdTip:'字母、数字和符号，最短6位字符，区分大小写'}/>
                            </div>
                             <div style={{padding:'10px 0'}}>
                                <Input type='password' inputChange={(e)=>{
                                    //var pdf = /^[a-zA-Z0-9_.,@#$%^&*;:]{6,}$/.test(val);
                                    forgetPswdData.repswd = e
                                    this.setState({
                                      repswdTip:e&&e==forgetPswdData.pswd?'通过':'不一致',
                                      repswdTipColor:e&&e==forgetPswdData.pswd?'green':'red',
                                      forgetPswdData:forgetPswdData
                                    })
                                }} inputBlur={(e)=>{
                                     //var pdf = /^[a-zA-Z0-9_.,@#$%^&*;:]{6,}$/.test(val);
                                     forgetPswdData.repswd = e
                                    this.setState({
                                      repswdTip:e&&e==forgetPswdData.pswd?'通过':'不一致',
                                      repswdTipColor:e&&e==forgetPswdData.pswd?'green':'red',
                                      forgetPswdData:forgetPswdData
                                    })
                                }} id='repswd' colorValTip={repswdTipColor} labelName='确认密码' defaultTip={repswdTip?repswdTip:'密码两次输入必须一致'}/>
                            </div>
                              <Button width='100px' style={{
                                marginTop:"20px",
                                marginLeft:'0px'
                              }}  disabled={false} clickEvent = {(e)=>{
                                if(forgetPswdData.pswd){
                                  if(forgetPswdData.repswd){
                                    this.setNewPswd && this.setNewPswd(forgetPswdData)
                                  }
                                }
                                
                              }}>确认</Button>
                        </div>
                    </div>
                 </div>
                 </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
ForgetPawd.contextTypes = {
    store:PropTypes.object
}
export default ForgetPawd