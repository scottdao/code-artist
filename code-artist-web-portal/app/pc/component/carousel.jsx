
import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import { Carousel } from 'antd';
class CarouselCom extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
            Index:1
        }
    }
    componentDidMount(){
    }
     componentWillUnmount(){
       
    }
    render(){
       let {imglist} = this.props;
       
       let {Index} = this.state;
       function onChange(a, b, c) {
          //console.log(a);
        }
        return(
            <React.Fragment>
                <Carousel autoplay afterChange={onChange}>
                {imglist && imglist.map(function(res,index){
                    return(
                            <div key={index}>
                                <img src={res} />
                            </div>
                        )
                })
            }
                </Carousel>
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
CarouselCom.contextTypes = {
    store:PropTypes.object
}
export default CarouselCom