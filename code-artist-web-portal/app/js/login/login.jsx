import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import { Button } from 'antd';
class Login extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        //document.title = '登录'
    }
    pageIndex(){//登录跳转接口
    	hashHistory.push('/community/pageIndex');
    }
    render(){
        return(
            <div>
            	<Button type='primary' onClick={this.pageIndex.bind(this)}>
            		登录界面
            	</Button>
            </div>
        )
    }
}
export default Login