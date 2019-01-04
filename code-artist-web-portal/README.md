### [demo](http://demo.thinksns.com/ts4)

1.本服务采用了 react15 版，react-router3 版；  
2.webpack 打包，node 环境，antd(https://ant.design/docs/react/introduce-cn)组件,scss 预处理器;  
3.package.json 前端起服务的必备文件，第一次直接通过 npm i 或 cnpm i 安装全部依赖，没有 package.json 文件，安装依赖比较麻烦，对所需要的依赖必须一个一个的加载，这是必须文件;  
4.cnpm 需要通过淘宝镜像进行安装；  
4.运行命令 npm start 或 npm run dev  
5.打包命令 npm run build 或 webpack

# scss 基础语法(参考https://www.sass.hk/docs/)：

---

注意点：样式结束必须加分号(;)

## （1）\$的用法，定义单个样式变量；以方便调用；实例见 app/css/communityLogin.scss 第 3，4 行；

## （2） @extend 的用法，调用类（class）选择器，供另外的类进行继承该类的样式；实例见 app/css/communityLogin.scss 第 5 和 38 行；

        通过@extend调用的类选择器的样式，只要其他这个类有关类的样式，都会被继承；
        实例，相关类：

```
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
```

## （3）@import 的用法；

        在scss文件中可以引入其他样式文件（引入的样式文件的后缀可以省略）；
        实例:app/css/communityLogin.scss第1行;
        其他引入用法：  @import "http://localhost:8080/.../communityLogin";
                        @import url(./communityLogin);
        可以同时导入多（两个或两个以上）个文件：@import 'tab','job';

## （4）#的用法；

调用变量，简化写法；实例：见 app/css/communityLogin.scss 第 4 行；

```
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
```

## （5）@mixin 和@include 的用法

    针对复合样式属性进行采用border,background，font进行采用；以便代码更加方便复用；
    实例：见app/css/communityLogin.scss第15和32行；

```
@mixin d-border($color) {//混合指令
border: {
color: $color;
width: 1px;
style: solid;
}
}
```

---

# 相关技术：

## 1.hashHistory.replace(),不产生历史记录；

```
 <BraftEditor
  controls={controls}
  style={{
    border: '1px #d9d9d9 solid',
    borderRadius: '4px',
    height: '240px',
    overflowY: 'scroll',
    overflowX: 'hidden',
  }}
  value={
    editionData
      ? BraftEditor.createEditorState(
          `<div>${editionData && editionData.editionContent}</div>`,
        )
      : ''
  }
  onChange={() => {}}
  onSave={() => {}}
  imageControls={[
    'float-left', // 设置图片左浮动
    'float-right', // 设置图片右浮动
    'align-left', // 设置图片居左
    'align-center', // 设置图片居中
    'align-right', // 设置图片居右
    'link', // 设置图片超链接
    'size', // 设置图片尺寸
    'remove', // 删除图片
  ]}
/>
```
