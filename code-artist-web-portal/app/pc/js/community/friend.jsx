import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import carImg  from 'pcImage/art-2.png';
import Carousel from 'PcComponent/carousel'
import TabNav from 'PcComponent/tabNav';
import logo from 'pcImage/user.jpg';
import imgList from'pcImage/img-list.jpg'
class Friend extends Component{
    constructor(){
        super()
        this.state={
            contentIndex:0
        }
    }
    componentDidMount(){
        document.title='朋友圈-codeArtist'
    	
    }
     componentWillUnmount(){
          document.title=''
    }
    render(){
        let imglist = [carImg,carImg,carImg];
        let {contentIndex} = this.state;
        let tabList = [1,2,3,4,5,6]
        //console.log(this.props.location.pathname);
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
                        <TabNav tabClick={(index)=>{
                            this.setState({
                                contentIndex:index
                            })
                        }} navList = {['全部','关注','频道','帖子','推荐']}>
                            {
                                tabList && tabList.map(function(res,index){
                                return (
                                         <div key={index}  className='tab-nav-list clearFix'>
                                            <dl>
                                                <dt style={{width:'60px',height:'60px'}}><img style={{width:'60px',height:'60px',borderRadius:"50%"}} src={logo} /></dt>
                                                <dd className='dd-con'>
                                                    <p><a href='javascript:void(0);'>scott</a></p>
                                                    <div className='dd-con-detail'>
                                                        <p>我是韦德是否额</p>
                                                        <ul className='dd-img-list clearFix'>
                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>

                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>

                                                            <li>
                                                                <a href='javascript:void(0);'>
                                                                    <img src={imgList} />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <p className='dd-detail-end'>
                                                            <span className='dd-end-left'>
                                                                <a href='javascript:void(0)'>2018年09月12日 23:48</a>
                                                                <em>来自安卓</em>
                                                            </span>
                                                            <span className='dd-detail-right'>
                                                                <a href='javascript:void(0);'>评论</a>
                                                                <em>|</em>
                                                                <a href='javascript:void(0);'>转发</a>
                                                                <em>|</em>
                                                                <a href='javascript:void(0);'>收藏</a>
                                                                <em>|</em>
                                                                <a href='javascript:void(0);'>点赞(0)</a>

                                                            </span>
                                                        </p>
                                                    </div>

                                                </dd>
                                            </dl>
                                         </div>
                                    )
                            })
                          
                            }
                             
                        </TabNav>
                    </div>
                    <div className='right-main'>
                        <div className='right-sign'>
                            <ul className='sign-total clearFix'>
                                <li className='sign-date'>
                                    <p>10.19</p>
                                    <p>周五</p>
                                </li>
                                <li>
                                    <div className='sign-play'>签到</div>
                                </li>
                                <li className='sign-day'>
                                     <p>DAYS</p>
                                     <p>0</p>
                                </li>
                            </ul>
                        </div>
                        <div className='right-notice'>
                            <div>可能感兴趣的人</div>
                        </div>
                        <div className='right-topic'></div>
                        <div className='right-recommend'></div>
                    </div>
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