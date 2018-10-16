import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import HeaderNav from 'PcComponent/headerNav';
import Bottom from 'PcComponent/bottom';
import Input from 'PcComponent/Input';
import Button from 'PcComponent/Button';
import 'PcCss/component.scss';

class Register extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
            registData:{},
            noteVer:'获取短信验证码',
            fontSize:'10px'
        }
    }
    componentDidMount(){
    	document.title='注册-codeArtist'
    }
     componentWillUnmount(){
        document.title = '';
        this.timer && clearInterval(this.timer)
    }
    render(){
        let {noteVer,fontSize} = this.state;
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
                                    console.log(e)
                                }} labelName='手机号' defaultValue='123456' deleteBtn='delete' defaultTip='一个手机号只能拥有一个账号'/>
                            </div>
                             <div style={{padding:'10px 0',position:"relative"}}>
                                <Input type='text' id='noteCode' width='120px' labelName='图形验证码' />
                                <Button width='120px' color='#333' backgroundColor='#fff'  style={{fontSize:'10px',position :'absolute',top:'16%',left:'24.5%',border:'1px solid #999'}} 
                                 clickEvent = {(e)=>{ 
                                   
                                  }}>图形</Button>
                            </div>
                            <div style={{padding:'10px 0',position:"relative"}}>
                                <Input type='text' id='noteCode' width='120px' labelName='短信验证码' />
                                <Button width='120px' fontSize={fontSize}  style={{fontSize:'10px',position :'absolute',top:'16%',left:'24.5%'}} 
                                 clickEvent = {(e)=>{ 
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
                                  }}>{noteVer}</Button>
                            </div>
                            <div  style={{padding:'10px 0'}}>
                                <Input type='text' id='userName' labelName='用户名' defaultTip='用户名仅限中文、英文，下划线'/>
                            </div> 
                            <div style={{padding:'10px 0'}}>
                                <Input type='password' id='pswd' labelName='设置密码' defaultTip='字母、数字和符号，最短6位字符，区分大小写'/>
                            </div>
                            <div style={{padding:'10px 0'}}>
                                <Input type='password' id='repswd' labelName='确认密码' defaultTip='密码两次输入必须一致'/>
                            </div>
                              <Button width='160px' style={{
                                marginTop:"20px",
                                marginLeft:'0px'
                              }}  disabled={false} clickEvent = {(e)=>{

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