import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import 'PcCss/headerNav.scss';
import Logo from 'pcImage/logo.png'
import tool from 'Components/tool'
class HeaderNav extends Component{
    constructor(props,context){
        super(props,context)
        this.state={
            activeIndex:tool.getLocalData({keyVal:'index'},0)||0
        }
    }
    componentDidMount(){
    	
    }
    render(){
        const navList = [{
            lName:'朋友圈',
            label:'0',//1,另一个浏览器开启；0，自己浏览器开启；
            url:'/index'
        },{
            lName:'问答',
            label:'1',
            url:'/question'
        },{
            lName:'微吧',
            label:'0',
            url:'/tiny'
        },{
            lName:'资讯',
            label:'1',
            url:'/information'
        },{
            lName:'广场',
            label:'0',
            url:'/square'
        },{
            lName:'区块链',
            label:'1',
            url:'/block'
        }]
        let activeIndex = this.state.activeIndex;
        let his = window.location.hash;
        return(
            <div className='header-nav'>
            {/* 未登录状态*/}
                <div className='lg-nav'>
                    <div className='nav-logo' onClick={()=>{
                        hashHistory.replace('/')
                    }}>
                        <img src = {Logo}/>
                    </div>
                    <ul className='nav-list' >
                        {
                            navList && navList.map(function(res,index){
                                var reg = new RegExp(res.url);
                                return(
                                      <React.Fragment key={index}>
                                            {res.label=='1'?(<li className={reg.test(his)?"navActive":''}><a href={`#${res.url}`} target='_blank'>{res.lName}</a></li>):(<li  className={reg.test(his)?'navActive':''}
                                            onClick={()=>{
                                                this.setState({
                                                    activeIndex:index
                                                })
                                                //localStorage.setItem('index',index+'' )
                                                //console.log(index)
                                                tool.setLocalData({keyName:'index',keyVal:index+''},0)
                                            }}
                                        ><Link to={`${res.url}`}>{res.lName}</Link> </li>)}
                                        
                                      </React.Fragment>
                                    )
                            }.bind(this))
                        }                
                    </ul>
                </div>
            </div>
        )
    }
}
import PropTypes from 'prop-types';
HeaderNav.contextTypes = {
    store:PropTypes.object
}
export default HeaderNav