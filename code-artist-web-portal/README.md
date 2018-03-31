1.本服务采用了react15版，react-router3版；  
2.webpack打包，node环境，antd(https://ant.design/docs/react/introduce-cn)组件,scss预处理器;  
3.package.json 前端起服务的必备文件，第一次直接通过npm i 或cnpm i安装全部依赖，没有package.json文件，安装依赖比较麻烦，对所需要的依赖必须一个一个的加载，这是必须文件;  
4.cnpm 需要通过淘宝镜像进行安装；  
4.运行命令 npm start 或 npm run dev  
5.打包命令 npm run build 或 webpack  

#scss基础语法(参考https://www.sass.hk/docs/)：
----------------------------------------------

注意点：样式结束必须加分号(;)


##（1）$的用法，定义单个样式变量；以方便调用；实例见app/css/communityLogin.scss第3，4行；


##（2） @extend的用法，调用类（class）选择器，供另外的类进行继承该类的样式；实例见app/css/communityLogin.scss第5和38行；



        通过@extend调用的类选择器的样式，只要其他这个类有关类的样式，都会被继承；
        实例，相关类：
        .error.intrusion {
          background-image: url("/image/hacked.png");
        }
        .seriousError {
          @extend .error;
          border-width: 3px;
        }
        编译为：
        .error.intrusion, .seriousError.intrusion {
               background-image: url("/image/hacked.png");
           }
           .seriousError{
                border-width: 3px;
           }
##（3）@import 的用法；


        在scss文件中可以引入其他样式文件（引入的样式文件的后缀可以省略）；
        实例:app/css/communityLogin.scss第1行;
        其他引入用法：  @import "http://localhost:8080/.../communityLogin";
                        @import url(./communityLogin);
        可以同时导入多（两个或两个以上）个文件：@import 'tab','job';
##（4）#的用法；


                调用变量，简化写法；实例：见app/css/communityLogin.scss第4行；
                $F:font;
                .fontAcess{
                    #{$F}-family: $fontFamily;
                    #{$F}-weight: bold;
                    #{$F}-style: normal;
                    #{$F}-size: 18px;
                    color: #333333;
                    text-align: center;
                    line-height: normal;
                }
##（5）@mixin和@include的用法

    针对复合样式属性进行采用border,background，font进行采用；以便代码更加方便复用；
    实例：见app/css/communityLogin.scss第15和32行；
    @mixin d-border($color) {//混合指令
      border: {
        color: $color;
        width: 1px;
        style: solid;
      }
    }
