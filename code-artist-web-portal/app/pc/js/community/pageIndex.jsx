import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import HeaderNav from 'PcComponent/headerNav';
import Bottom from 'PcComponent/bottom';
import 'PcCss/index.scss';
import 'PcCss/mainBody.scss';
class PageIndex extends Component{
    constructor(props,context){
        super(props,context)
    }
    componentDidMount(){
    	//document.title=''
    }
     componentWillUnmount(){
        //document.title = ''
    }
    render(){

        return(
            <React.Fragment>
                <div style={{height:'60px',width:'100%'}}>
                 <HeaderNav></HeaderNav>
                </div>
                <div className='index-body'>
                {this.props.children}
                </div>
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