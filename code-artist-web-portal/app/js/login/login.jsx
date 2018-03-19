import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import { Button } from 'antd';
import '../../css/communityLogin.scss';
import $$ from 'jquery';
//console.log($$);

class Login extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        document.title = '登录';
        //console.log(document.body.clientHeight)
      
    }
    pageIndex(){//登录跳转接口
        $$('.login-index').fadeOut(300,function(){
            hashHistory.push('/community/pageIndex');
        });
    	
    }
    render(){

        return(
            <div className='login-index' style={{height:document.body.clientHeight+'px'}}>
            	  <Button type='primary' onClick={this.pageIndex.bind(this)}>
            		登录界面
            	   </Button>
                <div className="login-index-lw">
                    <p className='lw-first'>鸿鹄之志须要</p>
                    <big>就算孤独也得坚持</big>
                    <p className='lw-second'> Code Artist 团队一直在坚持</p>
                    <small>————Code Artist 团队寄语</small>
                </div>
                <div className="login-index-sh">
                    <h2>欢迎来到码匠社区</h2>
                </div>
            </div>
        )
    }
}
export default Login