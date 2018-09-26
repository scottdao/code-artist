import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Information extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
    	
    }
     componentWillUnmount(){
        
    }
    render(){
        return(
            <div>
                资讯
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Information.contextTypes = {
    store:PropTypes.object
}
export default Information