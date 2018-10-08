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
    	
    }
     componentWillUnmount(){
        
    }
    render(){
        const {labelName,defaultTip,type,width,id,inputChange,deleteValue} = this.props 
        const {isPlay} = this.state;
        return(
            <React.Fragment>
                <div className='input'>
                    <label htmlFor={id} className='input-label' style={{marginLeft:'-12%'}}>{labelName?labelName+'：':''}</label>
                    <div style={{position:'relative',float:'left'}}><input type={type}

                        placeholder={'请输入'+(labelName||'')}
                        style = {{width:width || '255px', height:' 36px', borderWidth:' 0px',border:'1px solid '+this.state.borderColor,
                                borderRadius:'4px',
                                padding:'0 2px',
                                fontSize:'10px'
                                }}  
                        onBlur={()=>{
                                this.setState({
                                   borderColor:'#dedede',
                                   isPlay:'none'
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
                       {deleteValue=='delete'?(<i style={{
                            height:'14px',
                            width:'14px',
                            border:'1px solid #999',
                            borderRadius:'50%',
                            position: 'absolute',
                            top:'30%',
                            right:'5%',
                            display:isPlay
                        }} className='delete-I'>
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