import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import 'PcCss/communityLogin.scss';
import $$ from 'jquery';

import { Modal, Input,Button,Checkbox} from 'antd';
import userIcon from 'pcImage/login/u20.png';
import pswdIcon from 'pcImage/login/u22.png';
class Login extends Component{
    constructor(props,context){
        super(props,context)
        console.log(context);
        this.state={
        }
    }
    componentDidMount(){
        document.title = '登录';
        //console.log(document.body.clientHeight)
        
      
    }
    componentWillUnmount(){
        document.title = ''
    }
    pageIndex(){//登录跳转接口
        // $$('.login-index').fadeOut(300,function(){
        //     hashHistory.push('/community/pageIndex');
        // });
    	 Modal.success({
            title: '这是一条通知信息',
            content: '一些附加信息一些附加信息一些附加信息',
            onOk() {
                //Http.log('成功',false);
                 hashHistory.push('/index');
            },
        });
    }
    onChange(e){
        //Http.log(e,false);
    }
    
    render(){
        const  imgUser = (<img src={userIcon}/>);
        const imgPswd = (<img src={pswdIcon}/>)
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
                    <Input  addonBefore={imgUser} placeholder="请输入帐号/手机/邮箱" />
                    <Input  addonBefore={imgPswd} placeholder="请输入密码" />
                    <Button type='primary' size="large" onClick={this.pageIndex.bind(this)}>
                     登录
                   </Button>
                   <p style={{marginTop:'4px'}}>
                   <Checkbox onChange={this.onChange.bind(this)}>用户自动登录</Checkbox>
                   <span className='forgetpswd'>忘记密码?</span>
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
                            <a href='javascript:;' className='last-go'>
                                <span>先看看</span>
                                <span className='right-arrow'></span>
                            </a>
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