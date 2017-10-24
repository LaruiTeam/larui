/*!
 * larui lar-timeline  v0.1
 * Url: www.css.com.cn
 * Copyright (c) 
 * License: none
 * 
 * 参数：
 * @ 参数1  参数类型
 *   参数描述
 * @ 参数2  参数类型
 *   参数描述
 * @ 参数3  参数类型
 *   参数描述
 *   
 *  使用方法：
 *  HTML:
 *	<section class="lar-timeline2-container">
 *	</section>
 *
 *  JS
 *	$('.lar-timeline2-container').timeline({
 *		dataUrl : 'http://localhost:8080/lar-search-web/lar-ui/lar-timeline/data.json',
 *		renderType : 'normal'  //或者 "round"
 *	});
 *		
 *  注意事项：
 *  1. 本组件目前支持两种样式，一种是带年代带圆圈背景的时间轴，一种是普通时间轴
 *  2. ....
 *  3. ....
 */
import $ from 'jquery';
import larUi from './../../util.js';
(function($){
	/**
	 * 
	 */
	function LarBackTop(element , options) {
		/**
		 * 将传入的参数覆盖到默认参数之上
		 */
		this.options = $.extend(true,{},this.defaults,options); // 必须有
		this.larBackTop = element; // DOM级别对象
		this.$larBackTop = $(element); // jQuery级别对象
	    this.animOut;
	    this.animSpeed; 
	    this.scrollEvent; 
	    this.scrollTarget; 
	    this.$self;
		/**
		 * 调用初始化方法
		 */
		this.init();
	}
	
	/**
	 * 类JqueryPluginConstructorName
	 * 公共的属性和方法
	 */
	LarBackTop.prototype = { //开头字母大写
		/**
		 * 默认参数
		 */
		defaults : {  //必须有
	        scrollId: 'scrollUp',      // 元素ID
	        scrollSpeed: 1000,            // 返回顶部时间
	        easingType: 'linear',        // 返回顶部效果 
	        scrollTrigger: false,        // 设置触发滚动的元素. 可以是html字符串也可以是jquery对象
	        scrollTarget: false         // 自定义滚动至的目标元素. 可以是元素或者数字
		},
		/**
		 * 公共的初始化构造方法
		 */
		init:function(){
			var scrollTarget;
			var _this = this;
			//回滚目标定位
	        if (_this.options.scrollTarget) {
	            if (typeof _this.options.scrollTarget === 'number') {
	                scrollTarget = _this.options.scrollTarget;
	            } else if (typeof o.scrollTarget === 'string') {
	                scrollTarget = Math.floor($(_this.options.scrollTarget).offset().top);
	            }
	        } else {
	            scrollTarget = 0;
	        }

	        //返回顶部
	        _this.$larBackTop.click(function (e) {
	            e.preventDefault();
	            
	            //执行滚动效果
	            $('html, body').animate({
	                scrollTop: scrollTarget
	            }, _this.options.scrollSpeed, _this.options.easingType);
	        });
		}
	}
	
    /*组件绑定到$.fn对象上*/
    $.fn.larBackTop=function(options){ //j小写
        return this.each(function() { //return必须要写，保证jquery级联
            return $.data(this, "larBackTop" , new LarBackTop(this, options));
        });
    }
	
}( $))