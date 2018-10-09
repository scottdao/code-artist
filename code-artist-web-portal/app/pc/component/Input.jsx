/*
*
*deleteBtn:表示一键清除功能，值：delete，默认无(选填)
*
*id:值，自定义（必填）
*
*className:选填；
*
*labelName：自定义，提示语；（选填）
*
*defaultTip：自定义，提示语；（选填）
*
*width：宽度，默认值255px;
*
*type:必填，text,number,phone等。
*
*defaultValue:选填；
*/
import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import del from 'pcImage/del-icon.png'
class Input extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
               borderColor:'#dedede',
               isPlay:'none'
        }
    }
    componentDidMount(){
    	let {id,defaultValue} = this.props 

        this.refs[id].value = defaultValue || '';
    }
    shouldComponentUpdate(nextProps, nextState){

        return true
    }
     componentWillUnmount(){
         this.timer && clearTimeout(this.timer)
   
    }
    render(){
        let {labelName,defaultTip,type,width,id,inputChange,deleteBtn,className} = this.props 
        const {isPlay} = this.state;
        id = id || ''
        return(
            <React.Fragment>
                <div className='input'>
                    <label htmlFor={id} className='input-label' style={{marginLeft:'-12%'}}>{labelName?labelName+'：':''}</label>
                    <div style={{position:'relative',float:'left'}}>
                    <input  type={type}
                            ref = {id}
                            name = {id}
                            className = {className||''}
                            placeholder={'请输入'+(labelName||'')}
                            style = {{width:width || '255px', height:' 36px', borderWidth:' 0px',border:'1px solid '+this.state.borderColor,
                                    borderRadius:'4px',
                                    padding:'0 2px',
                                    fontSize:'10px'
                                    }}  
                            onBlur={()=>{
                                    this.setState({
                                       borderColor:'#dedede'
                                    })
                            }}
                            onChange={(e)=>{
                                e = e || event;

                                inputChange && inputChange(e.target.value)

                                !inputChange && console.error('warning:'+id+`'s "inputChange" event is not defined!`);
                            }}
                            onFocus={()=>{
                                this.setState({
                                    borderColor:'rgba(102, 176, 234, 0.824)',
                                    isPlay:'block'
                                })
                            }}
                            id={id}

                    />
                       {deleteBtn=='delete'?(<i style={{
                            height:'14px',
                            width:'14px',
                            border:'1px solid #999',
                            borderRadius:'50%',
                            position: 'absolute',
                            top:'30%',
                            right:'5%',
                            display:isPlay,
                            cursor:'pointer'
                        }} className='delete-I'
                        onClick={()=>{
                            let $this = this;
                            this.refs[id].value = '';
                            inputChange('')
                            this.timer = setTimeout(()=>{
                                $this.setState({
                                        isPlay:'none'
                                })
                            },1000);
                           
                        }}
                        >
                            <img src = {del} style = {{width:'10px',height:'10px',marginTop:'1px',marginLeft:'1px',borderRadius:'50%'}}/>
                        </i>):""} 
                       
                    </div>
                     <span style={{fontSize:'12px',color:'#999',marginLeft:'10px',display: 'inline-block',height: '36px',lineHeight:'36px',verticalAlign:'middle'}}>{defaultTip}</span>
                </div>
            </React.Fragment>
        )
    }
}
import PropTypes from 'prop-types';
Input.contextTypes = {
    store:PropTypes.object
}
export default Input