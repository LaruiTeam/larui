/**
 * 注：容器的高度由外层dom元素的高度决定  ****需要指定高度****
 * 
 * 调用方式： $(".mixPhotoWallTest").mixPhotoWall({isBigPicLeft:true,dataInfo:[{url:'url0'},{url:'url1'},{url:'url2'},{url:'url3'},{url:'url4'}],gap:10});
 * 参数封装在一个对象中传递给组件
 * dataInfo 数组对象，图片的相关信息[{url,title, ......}],[url...]
 * isBigPicLeft 是必填项,表示 大图在左侧(true默认)或右侧(false)
 * showTitle 是否显示title,默认不显示
 * gap 图片的间距
 */
import $ from 'jquery';
window.$=$;
(function($){
    function MixPhotoWall(element,options){
    	this.options = $.extend(true,{},this.defaults,options); //必须有
		this.element = element;
		this.$container = $(element); 
		
        this.init();
    }

    MixPhotoWall.prototype={
    	constructor:MixPhotoWall,
    	defaults:{
    		isBigPicLeft:true,
    		showTitle:false,
    		gap:10
    	},
        init:function(){
        	this.build();
            this.addCss();
            this.bindEvent();
        },
        build:function(){
        	
        	this.$container.empty();
        	this.$container.append("<div class='mixPhoteWallWrapper'></div>");
        	this.$container.find(".mixPhoteWallWrapper").append("<div></div>");
        	this.$container.find(".mixPhoteWallWrapper").append("<div></div>");
        	if(this.options.isBigPicLeft){//大图在左侧
        		this.$container.find(".mixPhoteWallWrapper div").eq(0).addClass('bigArea');
        		this.$container.find(".mixPhoteWallWrapper div").eq(1).addClass('smallArea');
        	}else{
        		this.$container.find(".mixPhoteWallWrapper div").eq(0).addClass('smallArea')
        		this.$container.find(".mixPhoteWallWrapper div").eq(1).addClass('bigArea');
        	}
        	if(this.options.isBigPicLeft){//大图在左侧
        		this.$container.find(".bigArea").append("<div class='mixPhotoWallImageContainer'><img src="+ this.options.dataInfo[0].url +"></div>");
        		for(var i=0;i<4;i++){
        			this.$container.find(".smallArea").append("<div class='mixPhotoWallImageContainer'><img src="+ this.options.dataInfo[i+1].url +"></div>");
        		}
        	}else{
        		this.$container.find(".bigArea").append("<div class='mixPhotoWallImageContainer'><img src="+ this.options.dataInfo[4].url +"></div>");
        		for(var i=0;i<4;i++){
        			this.$container.find(".smallArea").append("<div class='mixPhotoWallImageContainer'><img src="+ this.options.dataInfo[i].url +"></div>");
        		}
        	}
        	if(this.options.showTitle){
        		var _this = this;
            	var $mixPhotoWallImageContainer = this.$container.find('.mixPhotoWallImageContainer');
            	$.each($mixPhotoWallImageContainer,function(index,mixPhotoWallImageContainer){
            		$(this).append('<div class="mixPhoteWallTextBg"><div class="mixPhoteWallText">'+ _this.options.dataInfo[index].title +'</div></div>')
            	});
        	}
        },
        addCss:function(){
        	if(this.options.gap >= 0){
        		this.$container.find(".mixPhotoWallImageContainer").css("padding",this.options.gap);
        		this.$container.find(".mixPhoteWallText").css("margin",this.options.gap);
        	}
        },
        bindEvent:function(){
        	
        }
    }

    $.fn.mixPhotoWall=function(options){
    	return this.each(function() {
            return $.data(this, "plugin_mixPhotoWall" , new MixPhotoWall(this, options));
        });
    }

})(jQuery)
