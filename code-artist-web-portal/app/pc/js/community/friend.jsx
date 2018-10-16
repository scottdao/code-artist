import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Friend extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        document.title='朋友圈-codeArtist'
    	
    }
     componentWillUnmount(){
          document.title=''
    }
    render(){
        return(
            <div>
                朋友圈
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Friend.contextTypes = {
    store:PropTypes.object
}
export default Friend