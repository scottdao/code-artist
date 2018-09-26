import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Questions extends Component{
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
                问答
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Questions.contextTypes = {
    store:PropTypes.object
}
export default Questions