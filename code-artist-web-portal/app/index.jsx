import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import RouterIndex from './router/router'

//加载antd样式；
//import 'antd/dist/antd.css'

class Index extends Component{
    constructor(){
        super()
    }
    render(){
        return(
             <div className='communityIndex'>
                <RouterIndex />
              </div>
            
        )
    }
}

ReactDOM.render(<Index/>,document.getElementById('root'));
