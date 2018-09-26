import React,{Component} from 'react';
import {Router,Route,IndexRedirect,hashHistory,IndexRoute } from 'react-router';

//登录界面
import Login from 'PcJs/login/login';
//社区首页
import CommunityIndex from 'PcJs/community/pageIndex';
import Friend from 'PcJs/community/friend'
import Question from 'PcJs/community/question'
import Tiny from 'PcJs/community/tiny';
import Information from 'PcJs/community/information'
import Square from 'PcJs/community/square'

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
            <Route path='/index' component={CommunityIndex}>
                <IndexRoute component={Friend}/>
                <Route path='/question' component={Question} />
                <Route path='/tiny' component={Tiny} />
                <Route path='/information' component={Information} />
                <Route path='/square' component={Square} />
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