import React,{Component} from 'react';
import {Router,Route,IndexRedirect,hashHistory} from 'react-router';

//登录界面
import Login from 'PcJs/login/login';
//社区首页
import CommunityIndex from 'PcJs/community/pageIndex';

import {Provider,connect} from 'react-redux';
import configureStore  from 'Components/redux/store';
import PropTypes from 'prop-types';
const store = configureStore();
class RouterIndex extends Component{
    constructor(){
        super()
    }
    render(){
        return(
          <Provider store={store}>
          <Router history={hashHistory}  store={store}>
          	<Route path='/' component={Login} >
          	</Route>
            <Route path='/community/pageIndex' component={CommunityIndex}>
            </Route>
          </Router>
          </Provider >
        )
    }
}
RouterIndex.contextTypes = {
    store:PropTypes.object
}
export default RouterIndex