import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import RouterIndex from './router/router'


//加载全局样式
import './css/reset.scss'

class Index extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <RouterIndex/>
            </div>
        )
    }
}

ReactDOM.render(<Index/>,document.getElementById('root'));
