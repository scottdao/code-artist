import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import HeaderNav from 'PcComponent/headerNav';
import Bottom from 'PcComponent/bottom';
import Input from 'PcComponent/Input';
import 'PcCss/component.scss';

class Register extends Component{
    constructor(props,context){
        super(props,context)
    }
    componentDidMount(){
    	document.title='注册'
    }
     componentWillUnmount(){
        document.title = ''
    }
    render(){

        return(
            <React.Fragment>
                 <div className='resgist-main'>
                    <div className='main-head'>
                        <ul className='clearFix'>
                            <li>手机注册</li>
                        </ul>
                    </div>
                    <div className='form-content'>
                        <form>
                            <div style={{padding:'5px 0'}}>
                                <Input type='phone' id='phone' inputChange={(e)=>{
                                    console.log(e)
                                }} labelName='手机号' deleteValue='delete' defaultTip='一个手机号只能拥有一个账号'/>
                            </div>
                            <div style={{padding:'5px 0'}}>
                                <Input type='text' id='noteCode' width='120px' labelName='短信验证码' />
                            </div>
                            <div  style={{padding:'5px 0'}}>
                                <Input type='text' id='userName' labelName='用户名' defaultTip='用户名仅限中文、英文，下划线'/>
                            </div> 
                            <div style={{padding:'5px 0'}}>
                                <Input type='password' id='pswd' labelName='设置密码' defaultTip='字母和数字，最短6位字符，区分大小写'/>
                            </div>
                            <div style={{padding:'5px 0'}}>
                                <Input type='password' id='repswd' labelName='确认密码' defaultTip='密码两次输入必须一致'/>
                            </div>
                        </form>
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