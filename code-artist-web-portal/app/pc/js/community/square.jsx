import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Square extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
    	 document.title = '广场-codeArtist';
    }
     componentWillUnmount(){
         document.title = '';
    }
    render(){
        return(
            <div>
                广场
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Square.contextTypes = {
    store:PropTypes.object
}
export default Square