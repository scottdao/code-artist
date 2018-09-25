import React,{Component} from 'react';
import {Router,Route,IndexRedirect,hashHistory} from 'react-router';

import {Provider,connect} from 'react-redux';
import configureStore  from 'Components/redux/store';
import PropTypes from 'prop-types';
const store = configureStore();
class mobileRouterIndex extends Component{
    constructor(){
        super()
    }
    render(){
        return(
          <div>我是移动端</div>
        )
    }
}
mobileRouterIndex.contextTypes = {
    store:PropTypes.object
}
export default mobileRouterIndex