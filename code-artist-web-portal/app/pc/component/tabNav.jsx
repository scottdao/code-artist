
import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';

class TabNav extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
             activeIndex:0
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
       	//var navList = ['全部','关注','频道','帖子','推荐'];
       	let {activeIndex} = this.state;
       	let {tabClick,children,navList} = this.props;
       	//console.log(children);
       	
        return(
            <React.Fragment>
            <div style={{margin:'20px 0px'}}>
               <ul className='tab-nav clearFix' >
               {
               	navList && navList.map(function(res,index){
               		return(
               				<li key={index} className={activeIndex==index?'active':""} onClick={()=>{
               					tabClick(index)
               					this.setState({
               						activeIndex:index
               					})
               					
               				}}>{res}</li>
               			)
               	}.bind(this))
               }
               </ul>
               <div className='tabList'>
                 {children}
               </div>
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