import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import 'PcCss/communityLogin.scss';
import $$ from 'jquery';

import { Modal,Icon,message, Input,Button,Checkbox} from 'antd';
//console.log(Modal)
import userIcon from 'pcImage/login/u20.png';
import pswdIcon from 'pcImage/login/u22.png';
import modal from 'PcComponent/modal.jsx'
import tool from 'Components/tool'
class Login extends Component{
    constructor(props,context){
        super(props,context)
        //console.log(context);
        this.state={
            pswdVal:'',
            userName:''
        }
    }
    componentDidMount(){
        document.title = '登录-codeArtist';
        //console.log(document.body.clientHeight)
        
      
    }
    componentWillUnmount(){
        document.title = ''
    }
    pageIndex(){//登录跳转接口
       
    	 /*Modal.success({
            title: '这是一条通知信息',
            content: '一些附加信息一些附加信息一些附加信息',
            onOk() {
                //Http.log('成功',false);
                 hashHistory.push('/index');
            },
        });*/
     var userNameV =  tool.chekRegular({
            name:'userNameVer',
            tipName:'用户名',
            tipWord:'用户名必须下划线，英文字母，数字，长度不少于6',
            value:this.state.userName,
            emptyFunc:function(data){
                 message.warning(data);
            },
            regularFunc:function(data){
                 message.warning(data);
            }
        })
    var pswd =  userNameV && tool.chekRegular({
            name:'pswdVer',
            tipName:'密码',
            tipWord:'密码必须下划线，英文字母，数字，长度8-20位',
            value:this.state.pswdVal,
            emptyFunc:function(data){
                 message.warning(data);
            },
            regularFunc:function(data){
                 message.warning(data);
            }
        })
   
        pswd && hashHistory.replace('/index');
    }
    onChange(e){
        //Http.log(e,false);
    }
    emitEmpty(){
        this.userNameInput.focus();
        this.setState({
            userName:''
        })
    }
    render(){
        const  imgUser = (<img src={userIcon}/>);
        const imgPswd = (<img src={pswdIcon}/>);
        let {pswdVal,userName} = this.state;
        return(
            <div className='login-index' style={{height:document.body.clientHeight+'px'}}>
            	 
                <div className="login-index-lw">
                    <p className='lw-first'>鸿鹄之志须要</p>
                    <big>就算孤独也得坚持</big>
                    <p className='lw-second'> Code Artist 团队一直在坚持</p>
                    <small>————Code Artist 团队寄语</small>
                </div>
                <div className="login-index-sh">
                    <h2>欢迎来到码匠社区</h2>
                    <Input  addonBefore={imgUser } onChange={(e)=>{
                        this.setState({
                            userName:e.target.value
                        })

                    }}   value={userName} placeholder="请输入帐号/手机/邮箱" suffix={userName?<Icon type="close-circle" onClick={this.emitEmpty.bind(this)} />:''}  
                    ref={node => this.userNameInput = node}
                    />
                    <Input  addonBefore={imgPswd} onChange={(e)=>{
                        this.pswdInput.focus();
                        this.setState({
                            pswdVal:e.target.value
                        })
                    }} value={pswdVal}  type='password' placeholder="请输入密码" suffix={pswdVal?<Icon type="close-circle" onClick={()=>{
                        this.setState({
                            pswdVal:''
                        })
                    }} />:''} ref={node => this.pswdInput = node}/>
                    <Button type='primary' size="large" onClick={this.pageIndex.bind(this)}>
                     登录
                   </Button>
                   <p style={{marginTop:'4px'}}>
                   <Checkbox onChange={this.onChange.bind(this)}>用户自动登录</Checkbox>
                   <span className='forgetpswd' onClick={()=>{hashHistory.push('/forgetPswd')}}>忘记密码?</span>
                   </p>
                   <div className='thirdParty'>
                        <div className='qq-party'></div>
                        <div className='wb-party'></div>
                        <div className='wx-party'></div>
                   </div>
                   <div className='chanceGo'>
                        <h3>亲，还没有账号？</h3>
                        <div className='go-btn'>
                            <Link to='/register' >
                                <span className='left-arrow'></span>
                                <span>去注册</span>
                            </Link>
                            <Link to='/square' className='last-go'>
                                <span>先看看</span>
                                <span className='right-arrow'></span>
                            </Link>
                        </div>
                   </div>
                </div>

            </div>
        )
    }
}
import PropTypes from 'prop-types';
Login.contextTypes = {
    store:PropTypes.object
}
export default Login