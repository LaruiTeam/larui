/**
 * Created by skye on 2015/9/29.
 * 本插件是画廊效果插件
 *  本插件是 jQuery标准插件, 在选中select元素后直接调用, 如下
 *  $(select).oneSlide(options);//将页面元素替换为oneSlide组件, 个性化参数由options对象传入  
 *	
 *目前对外暴漏的参数有：
 * setContainerWidth //调用组件者可通过该参数设置动画区域宽度，可不设置。
 * setContainerHeight //调用组件者可通过该参数设置动画区域高度，可不设置。
 * dataList  //必填，图片对象数组，图片对象里可以有所需的各种图片属性，目前只用了路径属性（url），其他属性待扩展中，没有默认值，是必填项。使用eg:$(".testoneSlide").oneSlide({"dataList":'[{"url":"images/img5.jpg"},{"url":"images/img4.jpg"}]',pageSize:"2",containerWidth:600});
 * oneSlideMode	//oneSlide效果参数，参数值名称要在oneSlide的fn对象中有这个方法，或为组件初始化自带，或通过 $.fn.oneSlide.addBulidDom 添加。
 * arrowLeftImg //左箭头图片路径，有默认值是"images/arrowLeftImg.png"
 * arrowRightImg    //右箭头图片路径，有默认值是"images/arrowRightImg.png"
 * arrowWidth   //箭头宽度，有默认值，默认值是30px
 * arrowHeight  //箭头高度，有默认值，默认值是40px 
 * showTitle	//是否显示标题，true是显示，false是不显示
 * 
 * 组件私有参数，调用者不可轻易修改的参数有：
 * containerWidth  //私有参数，设置动画区域宽度。当调用插件者设置setContainerWidth参数时，当setContainerWidth宽度小于所在div宽度，则设置该参数值为用户设置的setContainerWidth值，否则为所在div宽度；当屏幕像素低于768的时候，不论是否设置宽度，动画区域默认撑满，即 使用了默认值。
 * containerHeight  //设置oneSlide区域高度，有默认参数，默认高度是图片的高度加上img和div的边框高度（border-width）
 * pageSize //展示在页面上的图片张数，当调用插件者设置setPageSize参数时，pageSize为setPageSize的值，否则取有默认值；当屏幕浏览器分辨率小于768时，默认只显示1张，否则默认值是3张。
 * 获取渲染后的dom对象用getDataDom方法，eg：var $dataDoms=$(".allCategory").data("plugin_oneSlide").getDataDom();
 */
import $ from 'jquery';
import  './../sass/css/lar-gallery.css';
var baseUrl="./../dist/V0.1/";

/*组件状态：重构中。。。。。。*/
(function($){
	function oneSlide (element,options) {
/*
        	this.serverPath=getServerPath();
*/
            //默认参数
            var setOptions={
            	setContainerWidth:"",
            	setContainerHeight:"",
                dataList:[],
                oneSlideMode:"maskEffect",                
                arrowLeftImg:baseUrl +"/images/arrows/arrowLeft.png",
                arrowRightImg:baseUrl+"/images/arrows/arrowRight.png",
                arrowWidth:"30",
                arrowHeight:"62",
                setPageSize:"",
                setMobilePageSize:"",
                showTitle:true,
                titleStyle:{color:'#FFF',fontSize:'18px',backgroundColor:"rgba(0,0,0,0.5)"},
                hideDotted:false
            };
            
            var _defaults={
            		containerWidth:"",
                    containerHeight:"",
            		pageSize:"3"
            };
            this.current = 0;
            this.element = element;
            this.$container=$(this.element);
            this.options = $.extend(true, {}, setOptions, _defaults,options);            
            var _this=this;
            this.imgTotalNum=this.options.dataList.length;
                        	
            oneSlide.bulidDom.call(_this);          
    }
	
	oneSlide.bulidDom=function(){
		var randomNum=Math.random()*10;
		var wrapper=$(' <div id="myCarousel" class="carousel slide oneSlide"> <ol class="carousel-indicators"></ol><div class="carousel-inner"></div><a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a><a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>').appendTo(this.$container);
		var dotHtml="";
		var picHtml="";
		  $.each( this.options.dataList, function( i , e ){
			  //e.hyperLink=e.hyperLink?e.hyperLink:"#";
			  dotHtml+='<li data-target="#myCarousel" data-slide-to="0"></li>';
			  if(e.hyperLink){
				  picHtml+='<div class="item"><a title="'+e.title+'" target="_blank" href="'+e.hyperLink+'"><img src="'+e.url+'" alt="First slide" onerror=\'placeholderImg(\"\",this);\'><div class="carousel-caption">'+e.title+'</div></a></div>';
			  }else{//不跳转
				  picHtml+='<div class="item"><a title="'+e.title+'"><img src="'+e.url+'" alt="First slide" onerror=\'placeholderImg(\"\",this);\'><div class="carousel-caption">'+e.title+'</div></a></div>';
			  }
          });
          
          this.$container.find("ol").append(dotHtml);
          this.$container.find(".carousel-inner").append(picHtml);
          this.$container.find("ol li:first").addClass("active");
          this.$container.find(".carousel-inner .item:first").addClass("active");
          this.$container.find(".oneSlide a.left").empty().append("<img src="+this.options.arrowLeftImg+">");
          this.$container.find(".oneSlide a.right").empty().append("<img src="+this.options.arrowRightImg+">");
//          titleStyle
          $(this.$container).find(".oneSlide .carousel-caption").css(this.options.titleStyle);

          //根据参数showTitle，决定是否显示标题
          if(!this.options.showTitle){
        	  $(this.$container).find(".oneSlide .carousel-caption").css({display:'none'});
          }
          
          if(this.options.hideDotted){
        	  $(this.$container).find(".oneSlide ol.carousel-indicators").hide();
          }
          
          $(this.$container).find(".oneSlide .carousel-inner .item  a").css({"display":"inline-block"});
          $(this.$container).find(".oneSlide .carousel-inner .item a img").css({"height":"100%","width":"100%"});
          //如果图片数量只有1个，则不现实左右按钮
          if(this.imgTotalNum === 1) {
        	  $(this.$container).find(".carousel-control").hide();
          }
	}
	
    $.fn.oneSlide=function(options){
        this.each(function() {
        	
            if (!$.data(this, "plugin_oneSlide")) {
            	$.data(this, "plugin_oneSlide" , null);
            }
            
            return $.data(this, "plugin_oneSlide" , new oneSlide(this, options));
        });
    }
})($)