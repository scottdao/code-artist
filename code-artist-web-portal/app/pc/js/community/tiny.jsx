import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Tiny extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
    	 document.title = '微吧-codeArtist';
    }
     componentWillUnmount(){
         document.title = '';
    }
    render(){
        return(
            <div>
                微吧
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Tiny.contextTypes = {
    store:PropTypes.object
}
export default Tiny