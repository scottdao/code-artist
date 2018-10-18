
import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';

class TabNav extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
             
        }
    }
    componentDidMount(){
    	
    }
    shouldComponentUpdate(nextProps, nextState){

        return true
    }
     componentWillUnmount(){
       
    }
    render(){
       	var navList = ['全部','关注','频道','帖子','推荐']
        return(
            <React.Fragment>
            <div style={{margin:'20px 0px'}}>
               <ul className='tab-nav clearFix' style={{width:'700px'}}>
               {
               	navList && navList.map(function(res,index){
               		return(
               				<li>{res}</li>
               			)
               	})
               }
               		
               
           

               </ul>
              </div>
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
TabNav.contextTypes = {
    store:PropTypes.object
}
export default TabNav