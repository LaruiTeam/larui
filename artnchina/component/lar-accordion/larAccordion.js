/*
 $.fn.larAccordion  - by yuqiuyu
 * 
 * 传参说明：
   postUrl : 请求url
   postParm : 请求服务参数
   parmName : 返回数据名称。 例：推荐配置 按code名返回 需要此字段

   imgPathName : 图片路径字段名
   wordDataName : 文字字段名,用于手风琴每块名称
   urlName : 跳转路径

   acdContentW : 右侧内容区宽度 默认：'700'
   acdContentH : 右侧内容区域高度 默认： '370'
   acdSpeed : 速度 350 (注意不要加引号)

 * 
 */
/*import $ from 'jquery';*/
/*window.$=$;*/
/*组件开始*/
(function(factory){
  if (typeof define == 'function' && define.amd) {
    // amd
    define(['jquery'], factory);
  } else if (typeof exports == 'object') {
    // commonjs
    //module.exports = factory(require('jquery'));
    factory(require('jquery'));
  } else {
    // global
    factory(jQuery);
  }

})();
/*组件结束*/