import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import carImg  from 'pcImage/art-2.png';
import Carousel from 'PcComponent/carousel'
import TabNav from 'PcComponent/tabNav'
class Friend extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
        document.title='朋友圈-codeArtist'
    	
    }
     componentWillUnmount(){
          document.title=''
    }
    render(){
        let imglist = [carImg,carImg,carImg]
        return(
            <div className='firend-total'>
               <div className='friend-noLogin clearFix'>
                    <p className='isLogin-word'>欢迎来到codeArtist赶紧注册与朋友们分享快乐点滴吧！</p>
                    
                    <p className='isLogin-fastLogin'>已有账号?<Link to='/'>立即登录</Link></p>
                    <div className='isLogin-regist' onClick={()=>{hashHistory.push('/register')}}>立即注册</div>
                </div>
                <div className='noLogin-bg'></div>
                <div className='main-content clearFix'>
                    <div className='left-main'>
                        <div className='main-share'>
                            <ul className="diy-share-cont clearFix" id="medz-share-box" >
                                <li > 
                                    <a href="javascript:void(0);" className="sharing"> 
                                        <i className="i-sharing"></i>
                                        <span>分享</span>
                                    </a>
                                    <p>快速分享文字、图片、视频</p>
                                </li>
                                <li > 
                                    <a href="javascript:void(0);" className="circle"> 
                                       <i className="i-circle"></i>
                                       <span>微吧</span>
                                    </a>
                                    <p>在自己关注的微吧分享内容</p>
                                </li>
                                <li > 
                                  <a href="javascript:void(0);" className="article"> 
                                     <i className="i-article"></i>
                                     <span>频道</span> 
                                  </a>
                                  <p>在频道里发布感兴趣的内容</p>
                                </li>
                            </ul>
                        </div>
                        <div className='main-car'>
                            <Carousel imglist = {imglist} />
                        </div>
                        <TabNav >
                            
                        </TabNav>
                        {/*<div className='main-nav'>

                        </div>
                        <div className='main-list'></div>*/}
                    </div>
                    <div className='right-main'>我是</div>
                </div>
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Friend.contextTypes = {
    store:PropTypes.object
}
export default Friend