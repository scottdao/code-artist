
import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Carousel extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
         
        }
    }
    componentDidMount(){
    	
    }
     componentWillUnmount(){
       
    }
    render(){
       let {carImg} = this.props;
       
        return(
            <React.Fragment>
                <ul style = {{position:'relative'}}>
	                <li style={{position :'absolute'}}>
	                    <a href='javascript:;'>
	                        <img style={{width:'700px'}} src={carImg} />
	                    </a>
	                </li>
	                 <li style={{position :'absolute'}}>
	                    <a href='javascript:;'>
	                        <img style={{width:'700px'}} src={carImg} />
	                    </a>
	                </li>
	                
              </ul>   
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
Carousel.contextTypes = {
    store:PropTypes.object
}
export default Carousel