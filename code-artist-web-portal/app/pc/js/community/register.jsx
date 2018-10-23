import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import HeaderNav from 'PcComponent/headerNav';
import Bottom from 'PcComponent/bottom';
import Input from 'PcComponent/Input';
import Button from 'PcComponent/Button';
import 'PcCss/component.scss';
import tool from 'Components/tool'
class Register extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
            registData:{

            },
            noteVer:'获取短信验证码',
            fontSize:'10px',
            graphVerCode:'',
            phoneTip:'',
            phoneTipColor:'',
            graphVerText:'',
            graphTip:'',
            graphTipColor:'',
            messageTip:"",
            messageTipColor:'',
            userNameTip:'',
            userNameTipColor:"",
            repswdTip:'',
            repswdTipColor:'',
            pswdTip:'',
            pswdTipColor:"",
        }
    }
    getGraph(){
         let that = this;
        tool.get('/graph/verifyCode',{},function(res){
            //console.log(res.message);
            that.setState({
                graphVerCode:res.message.data,
                graphVerText:res.message.text
            })
        })
    }
    componentDidMount(){
    	document.title='注册-codeArtist'
       this.getGraph && this.getGraph();
       //this.input.focus();
       document.getElementById('phone').focus();
    }
     componentWillUnmount(){
        document.title = '';
        this.timer && clearInterval(this.timer);

    }
    phoneNumberVer(e,$this){
       return tool.chekRegular({
            name:'phoneVer',
            tipName:'手机号',
            tipWord:'手机号格式不正确',
            value:e,
            emptyFunc:function(data){
                 $this.setState({
                    phoneTip:data,
                    phoneTipColor:'red'
                 })
            },
            regularFunc:function(data){
                //console.log(data)
                $this.setState({
                    phoneTip:data,
                    phoneTipColor:'red'
                 })
            },
            regSuccess:function(data){
                $this.state.registData.phone = e
                $this.setState({
                    phoneTip:data+'格式正确',
                    phoneTipColor:'green',
                    registData:$this.state.registData
                 }) 
            }
        })
    }
    graphCodeVer(e,$this,graphVerText){
        this.state.registData.graphCode = e
        this.setState({
            graphTip:/^[0-9A-Za-z]{4}$/.test(e)?'验证码验证成功':'验证码不正确',
            graphTipColor:/^[0-9A-Za-z]{4}$/.test(e)?'green':'red',
            graphCode:this.state.registData.graphCode
        })
    }
    countProperty(obj){
        for(var i in obj){
            if(!obj[i])return false;
        }
        return true;
    }
    userRegist(registData){
       var f =  this.countProperty(registData);
       if(f){
            tool.post('/checkVer/regist',registData,function(res){
                hashHistory.push('/')
            })
       }
    }
    render(){
        let {
            noteVer,
            fontSize,
            graphVerCode,
            phoneTip,
            phoneTipColor,
            graphVerText,
            graphTipColor,
            graphTip,
            messageTip,
            registData,
            messageTipColor,
            userNameTip,
            userNameTipColor,
            pswdTip,
            pswdTipColor,
            repswdTip,
            repswdTipColor
        } = this.state;
        //let {hashHistory} = this.props;
         const $this = this
        
        return(
            <React.Fragment>
                 <div className='resgist-main'>
                    <div className='main-head'>
                        <ul className='clearFix'>
                            <li>手机注册</li>
                        </ul>
                    </div>
                    <div className='form-content'>
                     
                            <div style={{padding:'10px 0'}}>
                                <Input type='phone' id='phone' inputChange={(e)=>{
                                    this.phoneNumberVer && this.phoneNumberVer(e,$this);

                                }} inputBlur={(e)=>{
                                        this.phoneNumberVer && this.phoneNumberVer(e,$this);
                                }}  labelName='手机号' colorValTip={phoneTipColor} deleteBtn='delete' defaultTip={phoneTip?phoneTip:'一个手机号只能拥有一个账号'}/>
                            </div>
                             <div style={{padding:'10px 0',position:"relative"}}>
                                <Input type='text' id='GraphNoteCode' inputChange={(e)=>{
                                    console.log(e)
                                    this.graphCodeVer&&this.graphCodeVer(e,$this,graphVerText)
                                }} inputBlur={(e)=>{
                                        this.graphCodeVer&&this.graphCodeVer(e,$this,graphVerText)
                                }} width='120px' labelName='图形验证码' />
                                <Button width='120px' color='#333' backgroundColor='#fff'  style={{fontSize:'10px',position :'absolute',top:'-10%',left:'23.5%'}} 
                                 clickEvent = {(e)=>{ 
                                   this.getGraph && this.getGraph()
                                  }}><span dangerouslySetInnerHTML={{__html:graphVerCode}} /></Button>
                                  <span style={{color:graphTipColor,position:'absolute',top:'36%',left:'40%'}}>{graphTip}</span>
                            </div>
                            <div style={{padding:'10px 0',position:"relative"}}>
                                <Input type='text' id='messageNoteCode' inputChange={(e)=>{
                                    //console.log(e);
                                    registData.messageCode = e
                                    this.setState({
                                        registData:registData,
                                        messageTip:/^\d{6}$/.test(e)?'验证码验证成功':'有误',
                                        messageTipColor:/^\d{6}$/.test(e)?'green':'red'
                                    })
                                   
                                }} inputBlur={(e)=>{
                                    //console.log(registData)
                                     this.setState({
                                        //messageCode:e,
                                        messageTip:/^\d{6}$/.test(e)?'验证码验证成功':'有误',
                                        messageTipColor:/^\d{6}$/.test(e)?'green':'red'
                                    })
                                }} width='120px' labelName='短信验证码' />
                                <Button width='120px' fontSize={fontSize}  style={{fontSize:'10px',position :'absolute',top:'16%',left:'24.5%'}} 
                                 clickEvent = {(e)=>{ 
                                    //获取验证码；
                                    //console.log(registData.phone)
                                    if(tool._regularCheck().phoneVer(registData.phone)){
                                        tool.get('/message/verifyCode',{phone:registData.phone},function(res){
                                            // $this.setState({
                                            //     messageCode:res.message.data
                                            // })
                                         })
                                            this.setState({
                                                fontSize:'18px',
                                                noteVer:60 +'s'
                                            })
                                            var t = 60;
                                            this.timer = setInterval(()=>{
                                                t--;
                                                t = t<10?('0'+t):t;
                                                let st = t + 's'
                                                let fontSize = ''
                                                let nt = t.toString().substring(0,1);
                                                let nt2 = t.toString().substring(1,2);
                                                nt<=0?(nt2<=0?(clearInterval(this.timer),st = '重新获取验证码',fontSize='10px'):''):'';
                                                $this.setState({
                                                    noteVer:st,
                                                    fontSize:fontSize
                                                })
                                            },1000);
                                    }else{
                                        alert('手机号为空！')
                                    }
                                  }}>{noteVer}</Button>
                                  <span style={{color:messageTipColor,position:'absolute',top:'36%',left:'40%'}}>{messageTip}</span>
                            </div>
                            <div  style={{padding:'10px 0'}}>
                                <Input type='text' id='userName' inputChange={(e)=>{
                                    //console.log(e)
                                     var flag = /[\u4E00-\u9FA5]|[0-9A-Za-z_]{4,}/.test(e)
                                      registData.userName = e
                                       // console.log(12)
                                        this.setState({
                                            userNameTip:flag?'用户名设置成功':'用户名不正确',
                                            userNameTipColor:flag?'green':"red",
                                            registData:registData
                                        })
                                    
                                }} inputBlur={(e)=>{
                                     var flag = /[\u4E00-\u9FA5]|[0-9A-Za-z_]{4,}/.test(e)
                                      registData.userName = e
                                       // console.log(12)
                                        this.setState({
                                            userNameTip:flag?'用户名设置成功':'用户名不正确',
                                            userNameTipColor:flag?'green':"red",
                                            registData:registData
                                        })

                                }} labelName='用户名' colorValTip={userNameTipColor} defaultTip={userNameTip?userNameTip:'用户名仅限中文、英文，数字，下划线，不得少于6位'}/>
                            </div> 
                            <div style={{padding:'10px 0'}}>
                                <Input type='password' id='pswd' inputChange={(e)=>{
                                    //console.log(e)
                                    registData.pswd = e
                                    var pswdFlag = /^[a-zA-Z0-9_.,@#$%^&*;:]{6,}$/.test(e);
                                    this.setState({
                                        pswdTip:pswdFlag?'密码设置正确':'设置不正确',
                                        pswdTipColor:pswdFlag?'green':'red',
                                        registData:registData
                                    })
                                }} inputBlur={(e)=>{
                                     registData.pswd = e
                                    var pswdFlag = /^[a-zA-Z0-9_.,@#$%^&*;:]{6,}$/.test(e);
                                    this.setState({
                                        pswdTip:pswdFlag?'密码设置正确':'设置不正确',
                                        pswdTipColor:pswdFlag?'green':'red',
                                        registData:registData
                                    })

                                }} labelName='设置密码' colorValTip={pswdTipColor} defaultTip={pswdTip?pswdTip:'字母、数字和符号，最短6位字符，区分大小写'}/>
                            </div>
                            <div style={{padding:'10px 0'}}>
                                <Input type='password' id='repswd' inputChange={(e)=>{
                                   registData.repswd = e
                                    this.setState({
                                        repswdTip:registData.pswd&&registData.pswd == e?'密码通过':'不一致',
                                        repswdTipColor:registData.pswd&&registData.pswd == e?'green':'red',
                                        registData:registData
                                    })
                                }}  inputBlur={(e)=>{
                                    registData.repswd = e
                                    this.setState({
                                        repswdTip:registData.pswd&&registData.pswd == e?'密码通过':'不一致',
                                        repswdTipColor:registData.pswd&&registData.pswd == e?'green':'red',
                                        registData:registData
                                    })

                                }} labelName='确认密码' colorValTip={repswdTipColor} defaultTip={repswdTip?repswdTip:'密码两次输入必须一致'}/>
                            </div>
                              <Button width='160px' style={{
                                marginTop:"20px",
                                marginLeft:'0px'
                              }}  disabled={false} clickEvent = {(e)=>{
                                    this.userRegist && this.userRegist(registData)
                                    //console.log(registData)
                              }}>下一步</Button>
                      
                    </div>
                 </div>
                
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
Register.contextTypes = {
    store:PropTypes.object
}
export default Register