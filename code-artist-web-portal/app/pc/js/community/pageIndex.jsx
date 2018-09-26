import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import HeaderNav from 'PcComponent/headerNav';
import Bottom from 'PcComponent/bottom';
class PageIndex extends Component{
    constructor(props,context){
        super(props,context)
    }
    componentDidMount(){
    	document.title='朋友圈'
    }
     componentWillUnmount(){
        document.title = ''
    }
    render(){

        return(
            <React.Fragment>
                <div style={{height:'60px',width:'100%'}}>
                 <HeaderNav></HeaderNav>
                </div>
                {this.props.children}
                <Bottom></Bottom>
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
PageIndex.contextTypes = {
    store:PropTypes.object
}
export default PageIndex