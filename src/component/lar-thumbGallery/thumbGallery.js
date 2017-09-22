/*!
 * larui 组件规范  v0.1
 * Url: www.css.com.cn
 * Copyright (c) 
 * License: none
 * 
 * 参数：
 * @ galleryType  string
 *   'horizon','vertical'
 * @ 参数2  参数类型
 *   参数描述
 * @ 参数3  参数类型
 *   参数描述
 *   
 * 必读：
 * 本组件需引入lar-scroll滚动条组件，请务必在html头部引入
 * <link rel="stylesheet" href="../lar-scrollbar/lar-scrollbar.css"></link>
 * <script src="../lar-scrollbar/lar-scrollbar.js"></script>
 * 具体相对路径根据页面来定
 * 后台返回参数要求
 * 
 * 
 * 使用方法：
 * $('.thumbGalleryContainer').thumbGallery({   //注意是.thumbGalleryContainer
 *	 dataInfo : json.model.curPageData
 * });
 *		
 *
 */

(function($){	
	/**
	 * 定义类构造类     
	 */
	function ThumbGallery(element, options) {  //注意开头字母大写
		/**
		 * 将传入的参数覆盖到默认参数之上
		 */
		this.options = $.extend(true,{},this.defaults,options); //必须有
		this.ThumbGallery = element;
		this.$ThumbGallery = $(element); 
		this.$arrow = $(element).next();
		this.$galleryPics;
		this.thumbPadding = 3;
		this.thumbHeight = 100;
		this.thumbGalleryHeight = 500;
		this.getTotalPicNo = function(){
			return $('.thumbGallerySideBar img').length;
		};
		this.galleryType = this.options.galleryType;
		/**
		 * 调用初始化方法
		 */
		this.init();	
	}
	
	/**
	 * 类JqueryPluginConstructorName
	 * 公共的属性和方法
	 */
	ThumbGallery.prototype = { //开头字母小写
			
			constructor:ThumbGallery, //必须有
			/**
			 * 默认参数
			 */
			defaults : {  //必须有
				dataInfo : [],
				galleryType : 'horizon',
				paramMap : {
					imgPath : 'imgPath',
				}
			},
			/**
			 * 公共的初始化构造方法
			 */
			init:function(){
				this.buildDom( this.options.dataInfo );
				this.autoShowPic();
				this._bindShowPicEvent();
			},
			
			buildDom : function( data ){
				var _this = this;
				//构建图片集
				this.$ThumbGallery.addClass( this.options.galleryType );
				var $thumbGalleryMainArea = $('<div class="thumbGalleryMainArea"></div>');
				var $thumbGallerySideBar = $('<div class="thumbGallerySideBar"></div>');
				//初始化第一张大图
				$thumbGalleryMainArea.append('<a target="_blank" href="' + _this.options.paramMap.link + '?id=' + data[0][_this.options.paramMap.id] + '"><img src="' + URL_FILE_SERVER + data[0][_this.options.paramMap.imgPath] + '"/></a>');
				if(_this.options.paramMap.title) {
					var $thumbGalleryTitle = $('<div class="carousel-caption"></div>');
					$thumbGalleryMainArea.find('a').append($thumbGalleryTitle);
					$thumbGalleryTitle.text(data[0][_this.options.paramMap.title] || '');
					if($thumbGalleryTitle.text() === '') {
						$thumbGalleryTitle.hide();
					} else {
						$thumbGalleryTitle.show();
					}
				}
				//渲染小图				
				$.each( data , function( i , e ){
					if(_this.options.paramMap.title) {
						$thumbGallerySideBar.append( '<img name="' + data[i][_this.options.paramMap.id] + '" data-title="' + (data[i][_this.options.paramMap.title] || '') + '" src="' + URL_FILE_SERVER + data[i][_this.options.paramMap.imgPath] + '"/>' );
						//$thumbGallerySideBar.append( '<img name="' + data[i][_this.options.paramMap.id] + '" data-title="我哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦噢噢噢噢噢噢噢噢哦哦哦哦哦哦" src="' + URL_FILE_SERVER + data[i][_this.options.paramMap.imgPath] + '"/>' );
					} else {
						$thumbGallerySideBar.append( '<img name="' + data[i][_this.options.paramMap.id] + '" src="' + URL_FILE_SERVER + data[i][_this.options.paramMap.imgPath] + '"/>' );
					}
				});
				if(data.length > 0) {
					$thumbGallerySideBar.find('img').eq(0).addClass('selected current');
				}
				//
				$('.thumbGalleryContainer').append( $thumbGalleryMainArea );
				$('.thumbGalleryContainer').append( $thumbGallerySideBar );
				//构建滚动条
				$('.thumbGallerySideBar').perfectScrollbar();
			},
			
			autoShowPic : function(){
				var _this = this;
				if(_this.options.dataInfo.length>1){
					_this.Timer = setTimeout(function(){ //setInterval
						_this._goNextPic();
					} , 5000);	
				}
				/*setInterval(function(){
					_this._goNextPic();
				} , 5000);*/
			},
			
			_bindShowPicEvent : function(){
				var _this = this;
				$('.thumbGallerySideBar img').bind( 'click' , function(){
					_this._showPic( $(this) );
				});
			},

			_scrollTo : function( index ){
				var distance = this.thumbHeight + 2 * this.thumbPadding;
				$('.thumbGallerySideBar').animate({
					scrollTop : distance * index 
				} , 1000 );
			},

			_showPic : function( $Pic ){
				var _this = this;
				$('.thumbGalleryMainArea a').attr( 'href' , _this.options.paramMap.link  + '?id=' + $Pic.attr('name') );
				if(_this.options.paramMap.title) {
					$('.thumbGalleryMainArea a .carousel-caption').text($Pic.attr('data-title'));
					$('.thumbGalleryMainArea a .carousel-caption').attr('title',$Pic.attr('data-title'));
					if($('.thumbGalleryMainArea a .carousel-caption').text() === '') {
						$('.thumbGalleryMainArea a .carousel-caption').hide();
					} else {
						$('.thumbGalleryMainArea a .carousel-caption').show();
					}
				}
				
				$('.thumbGalleryMainArea img').hide().attr( 'src' , $Pic.attr('src') ).fadeIn( 500 );
				$('.thumbGallerySideBar img').removeClass('selected').addClass('current');
				$Pic.addClass('selected').addClass('current');
				_this._scrollTo( $Pic.index() );
				if(_this.Timer) {
					clearTimeout(_this.Timer);
					_this.autoShowPic();
				}
			},
			
			_getCurrentPic : function(){
				return $('.thumbGallerySideBar').find('img.selected');
			},
			
			_getFisrtPic : function(){
				return $('.thumbGallerySideBar').find('img').eq(0);
			},
			
			_goNextPic : function(){
				var _this = this;
				if( _this._isLastImg( _this._getCurrentPic() ) ){
					_this._showPic( _this._getFisrtPic() )
				}else{
					_this._showPic( _this._getCurrentPic().next() );
				}
			},
			
			_isLastImg : function( $currentPic ){
				if ($currentPic.index() == this.getTotalPicNo() - 1  ){
					return true;
				}else{
					return false;
				}
			}
	}
	
    /*组件绑定到$.fn对象上*/
    $.fn.thumbGallery=function(options){ //j小写
        return this.each(function() { //return必须要写，保证jquery级联
            return $.data(this, "ThumbGallery" , new ThumbGallery(this, options));
        });
    }
	
}(jQuery));
