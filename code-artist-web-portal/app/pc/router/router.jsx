import React,{Component} from 'react';
import {Router,Route,IndexRedirect,hashHistory} from 'react-router';

//登录界面
import Login from 'PcJs/login/login';
//社区首页
import CommunityIndex from 'PcJs/community/pageIndex';

class RouterIndex extends Component{
    constructor(){
        super()
    }
    render(){
        return(
          <Router history={hashHistory} >
          	<Route path='/' component={Login} >
          	</Route>
            <Route path='/community/pageIndex' component={CommunityIndex}>
            </Route>
          </Router>
        )
    }
}
export default RouterIndex