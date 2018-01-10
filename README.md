告知：本项目维护文联组件，不再维护高法组件

#### 工程结构 project structure
* src 为公用维护源码（最重要）  
    lar-XXX lARUI组件系列源码  
       lar-XXX.js 组件JS  
       lar-XXX.scss 组件样式  
    vendor 第三方组件库  
    pug 工程页面源码  
    scss 工程样式源码  
    js 工程JS源码  
    images 工程图片  
    css 工程CSS文件（编译后）  
    html 工程html文件（编译后）  

spc 为高法组件源码（参考）  
artnchina 为文联组件源码（参考）  
test 为单元测试文件（保留）  
demo 为旧的demo代码（待处理）  
dist 为旧的发布代码（待处理）  

#### 组件标准 component specification
维护中...

#### 技术规格 tech specification
######## 组件规范 ########
1. 组件命名为驼峰规范
举例：
文件夹:larBackTop
文件:larBackTop.html larBackTop.js
变量: this.larBackTop = element;
构造函数: LarBackTop（注意首字母大写）

2. 组件构造函数规范
开头字母大写
举例：
function LarGalleryWall(element, options) {  //注意开头字母大写
组件属性正常声明
this.GalleryWall = element;
jquery对象属性带$声明
this.$GalleryWall = $(element);

#### 组件介绍
1. 照片墙组件（larGalleryWall) @renkaiguang
   2018-01-09  80%
2. 返回顶部组件（larBackTop) FINISHED @weixuan
   2018-01-09  100%
3. 动态分页组件(larDynamicPage) FINISHED @huqiaosi
   2018-01-09  100%
4. 图片放大组件（larFancyZoom) @huqiaosi
5. gallery组件（larGallery) @huqiaosi
6. 加载组件 （larLoading) @huqiaosi
7. pdf组件（larPdf) @renkaiguang
8. 全文搜索组件（larSearch) @weixuan
9. 时间轴组件 (larTimeline) @huqiaosi
10. 附件上传组件（larUpload) @weixuan
11. 手风琴组件 （larAccordion) @huqiaosi
12. 书卷展示组件（larBooklet) @huqiaosi
13. 弹出框组件（larDialog) @weixuan
14. 书架展示组件（larShelfGallery) @huqiaosi
15. 组件相关PPT @weixuan
