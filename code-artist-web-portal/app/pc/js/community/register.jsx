import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import HeaderNav from 'PcComponent/headerNav';
import Bottom from 'PcComponent/bottom';
class PageIndex extends Component{
    constructor(props,context){
        super(props,context)
    }
    componentDidMount(){
    	document.title='注册'
    }
     componentWillUnmount(){
        document.title = ''
    }
    render(){

        return(
            <React.Fragment>
                 <div className='resgist-main'>
                    <div className='main-head'>
                        <ul>
                            <li>手机注册</li>
                        </ul>
                    </div>
                 </div>
                
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
PageIndex.contextTypes = {
    store:PropTypes.object
}
export default PageIndex