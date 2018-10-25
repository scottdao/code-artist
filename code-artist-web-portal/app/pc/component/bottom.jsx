import React,{Component} from 'react';
import {hashHistory,Link} from 'react-router';
import QR from 'pcImage/qrcode.jpg';
class Bttom extends Component{
    constructor(){
        super()
    }
    componentDidMount(){
    	 var map = new AMap.Map('container',{
                resizeEnable: true,
                zoom: 10,  //设置地图显示的缩放级别
                center: [116.318138, 40.064308],//设置地图中心点坐标
                //layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
                //mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
                viewMode: '2D',  //设置地图模式
                lang:'zh_cn',  //设置地图语言类型
         });
         // 创建点标记
        var m1 = new AMap.Marker({
          position: [116.318138, 40.064308],
          icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_r.png"
        });
        map.add(m1);
        // 同时引入工具条插件，比例尺插件和鹰眼插件
        AMap.plugin([
            'AMap.ToolBar',
            'AMap.Scale',
            'AMap.OverView',
            'AMap.MapType',
            'AMap.Geolocation',
        ], function(){
            // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
            map.addControl(new AMap.ToolBar());
        });
    
         
    }
     componentWillUnmount(){
        
    }
    render(){
        return(
            <div className='footer '>
               <div className='foot-artist clearFix'>
                    <div className='footer-word'>
                        <p>codearist是智士软件旗下开源社交软件系统，适合企业及二次开发者基于系统进行快速二次开发，高效低成本实现各软件系统建设，商业使用请授权，公益及个人可申请免费网页端源码使用，须保留ThinkSNS标示，遵循开源授权协议，侵权必究。商业授权，网站／APP定制开发服务可致电官方商务部：17311245680。</p>
                        <p>Powered by <a href='javascript:;'>codearist</a> ©2017 ZhishiSoft All Rights Reserved.京ICP备10044357号-5</p>
                    </div>
                    <div className='footer-link'>
                        <ul>
                            <li><a href='javascript:;'>
                                关于我们
                            </a></li>
                            <li><a href='javascript:;'>
                                codearist官网
                            </a></li>
                            <li><a href='javascript:;'>
                                codearist官网
                            </a></li>
                            <li><a href='javascript:;'>
                                联系我们
                            </a></li>
                        </ul>

                    </div>
                    <div className='footer-about' style={{position:'relative'}}>
                        {
                        // 
                        // <a href='javascript:;' style={{fontSize:'12px',width:'78px',height:'28px',border:'1px solid #d1d2e0',padding:'2px 5px',borderRadius:"3px"}}>加关注</a>
                        //  <img src={QR} style = {{width:'90px',height:"90px",position:'absolute',top:'0',right:'-90px',border:"1px solid #333",padding:'5px'}}/>
                        }

                        <div id="container">

                        </div> 
                           
                        <p style={{fontSize:'10px',textAlign:"left",marginTop:"7%",width:"250px"}}>北京市昌平区回龙观镇蓝天嘉园52051</p>
                    </div>
               </div>
            </div>
        )
    }
}
import PropTypes from 'prop-types';
Bttom.contextTypes = {
    store:PropTypes.object
}
export default Bttom