/*
*
*style,自定义样式，
*
*disabled:禁用，默认false
*
*color:颜色
*
*background:背景颜色;
*clickEvent : 'function' 事件
*/
import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
class Button extends Component{
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
        let {children,width,disabled,color,backgroundColor,style,clickEvent,fontSize} = this.props;
        color = disabled?'#999':color;
        backgroundColor = disabled?'#f1f2f3':backgroundColor;
        style = style || {};
        fontSize = fontSize || ''
        return(
            <React.Fragment>
                <div className='btn-component' style={style}>
                    <button 
                    style={{fontSize:fontSize,width:width||'255px',cursor:disabled?'not-allowed':'pointer',color:color,backgroundColor:backgroundColor}} disabled = {disabled} 
                    onClick={(e)=>{e = e || event;clickEvent && clickEvent(e.target)}}
                    >{children}</button>
                </div>
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
Button.contextTypes = {
    store:PropTypes.object
}
export default Button