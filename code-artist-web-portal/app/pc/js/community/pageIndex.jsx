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
import PropTypes from 'prop-types';
PageIndex.contextTypes = {
    store:PropTypes.object
}
export default PageIndex