import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';

class PageIndex extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
    	document.title='社区首页'
    }
    render(){
        return(
            <div className='community-index'>社区首页</div>
        )
    }
}
export default PageIndex