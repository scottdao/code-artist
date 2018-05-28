import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import RouterIndex from './pc/router/router'//pc端界面路由
import MobileRouter from './mobile/router/router'
//加载antd样式；

class Index extends Component{
    constructor(){
        super()
    }
     componentDidMount(){
        document.title = '登录';

    }
    render(){
         let clientFlag = sessionStorage.getItem('clientFlag')
        //console.log(clientFlag)
        const clientDom =  clientFlag==1?<MobileRouter />:(clientFlag==2?<RouterIndex />:'客户端出错');
        return(
            <React.Fragment>
                {clientDom}
            </React.Fragment>
            
        )
    }
}

ReactDOM.render(<Index/>,document.getElementById('root'));
