import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Bttom extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
    	
    }
     componentWillUnmount(){
        
    }
    render(){
        return(
            <div className='footer'>
               我是脚部
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Bttom.contextTypes = {
    store:PropTypes.object
}
export default Bttom