/*!
 * larui 组件规范  v0.1
 * Url: www.css.com.cn
 * Copyright (c) 
 * License: none
 * 
 * 后台返回参数要求
 * 图片标题 ：title
 * 图片描述: introduction
 * 图片地址： imgPath
 * 数据格式： 参见data.json
 * 
 *  参数
 *  @ dataUrl  string
 *  照片墙请求的action
 *  
 *  @galleryType   string
 *  照片墙渲染种类，有tall和square两种
 *  
 *  @titleType   string
 *  标题显示类型，default和mask两种
 *  
 *  @picSize   integer
 *  照片墙默认显示数目，和每次分页请求请求数目，默认为8
 *  
 *  @showTitle   boolean
 *  是否显示标题
 *  
 *  @ paramMap obj
 *  后台返回字段映射参数
 *	   imgPath    默认值 : 'imgPath',
 *	   title      默认值 : 'title',
 *	   id         默认值 : 'id',
 *     linkMap obj 
 *     给gallerywall的照片添加链接有两种方式：第一种就是在该属性下配置映射关系，并设置linkType属性，从而让不同图片根据链接类型跳转不同链接。
 *     var urlList = {
 *		    '501' 	: searchUrl + 'drama/drama.html',					// 戏剧
 *		    '502' 	: searchUrl + 'movie/movie.html',					// 电影
 *	    	'503' 	: searchUrl + 'music/music.html',					// 音乐
 *	   }
 *	   linkType string
 *      链接类型
 *	   'opusTypeDict'
 *
 *	@ link string 
 *  给gallerywall的照片添加链接有两种方式：第二种就是在改link属性下直接加跳转链接，这种方式，所有图片跳转唯一链接。
 *  
 *  使用方法：
 *  HTML:
 *  <div class="galleryWallContainer"></div>
 *
 *  JS: 
 *	$('.galleryWallContainer').galleryWall({
 *		dataUrl : baseUrl + '/sword/search/artist/museum/getArtistOpusPage',
 *		galleryType : 'tall',
 *		titleType : 'default',
 *		paramMap : {
 *			imgPath : 'attachmentPath',
 *			title : 'title',
 *			id : 'artistId'
 *		},
 *		param : {
 *			artistId : '9bb6842532054c5fa82351b6d2aafcb1'
 *		},
 *   	pageSize : 8
 *	});
 *		
 *  注意事项：
 *  1. 必须加 .galleryWallContainer
 */
import $ from 'jquery';
window.$=$;
(function($){	
	/**
	 * 定义类构造类     
	 */
	function GalleryWall(element, options) {  //注意开头字母大写
		/**
		 * 将传入的参数覆盖到默认参数之上
		 */
		this.options = $.extend(true,{},this.defaults,options); //必须有
		this.GalleryWall = element;
		this.$GalleryWall = $(element); 
		this.$arrow = $(element).next();
		this.pageNumber = this.options.pageNumber;
		this.$galleryPics;
		this.picHeight;
		this.picWidth;
		this.afterLoad = this.options.afterLoad;
		this.executed = false;
		/**
		 * 调用初始化方法
		 */
		this.init();	
	}
	
	/**
	 * 类JqueryPluginConstructorName
	 * 公共的属性和方法
	 */
	GalleryWall.prototype = { //开头字母小写
			
			constructor:GalleryWall, //必须有
			/**
			 * 默认参数
			 */
			defaults : {  //必须有
				dataUrl : "data.json",
				galleryType : "tall",//tall , square
				titleType : "mask", // default , mask 
				pageSize :"8",
				pageNumber : 1,
				showTitle : true,
				defaultPicType : '',
				selfAdaption : false,
				paramMap : {
					imgPath : 'imgPath',
					title : 'title',
					id : 'id',
				},
				link : ''
			},
			/**
			 * 公共的初始化构造方法
			 */
			init:function(){
				this.buildDom();
				this.loadingImg();
				this.bindArrowEvent();
			},
			
			buildDom : function(){
				this.$GalleryWall.empty();
				this.$GalleryWall.next('div').remove();
				this.$GalleryWall.after('<div style="margin-bottom: 30px; margin-top: 0px;" class="btn_dropDown"><button class="icon btn_arrow"></button></div>');
			},
			/**
			 * 加载初始图片
			 */
			loadingImg :function(){
				var _this = this;
				var postParam = $.extend( _this.options.param , { pageSize : _this.options.pageSize , curPage : _this.pageNumber++ } );
				_this.initImageSize();
				$.post( this.options.dataUrl , postParam ,function( data ){
					if(_this.pageNumber == 2) {
						_this.buildDom();
						_this.bindArrowEvent();
					}
					if(data.model.allDataCount/_this.options.pageSize <= postParam.curPage) {
						_this.$GalleryWall.next('.btn_dropDown').hide();
					}
					var newAddImgsHTML = '';
					$.each( data.model.curPageData , function( i , e ){
						newAddImgsHTML += '<div class="gWImgContainer">' +
							                      _this.setPicLink( _this.options.paramMap.linkType , e , _this.options.paramMap.id ) ;
//						if(_this.options.selfAdaption) {
//							newAddImgsHTML += '<div style="width: 95%; height: 95%; margin:0 auto; overflow: hidden;">' + 
//											  		'<img onload="imgSizeHanle(this);" style="margin-left:0px; margin-right:0px;" class="' + _this.pageNumber + '^' + i + '" src="' + e[_this.options.paramMap.imgPath] + '" onerror="placeholderImg(\''+_this.options.defaultPicType+'\');">' +
//											  '</div>';
//						} else {
//							newAddImgsHTML += '<img style="width: ' + _this.picWidth + 'px; height: ' + _this.picHeight + 'px;" class="' + _this.pageNumber + '^' + i + '" src="' + e[_this.options.paramMap.imgPath] + '" onerror="placeholderImg('+_this.options.defaultPicType+');">';
//						}
						
						if(_this.options.selfAdaption) {
						newAddImgsHTML += '<div style="width: 95%; height: 95%; margin:0 auto; overflow: hidden;">' + 
										  		'<img style="margin-left:0px; margin-right:0px; width: 100%; height: 100%; " title="' + e[_this.options.paramMap.title] + '" class="' + _this.pageNumber + '^' + i + '" src="' +URL_FILE_SERVER+ e[_this.options.paramMap.imgPath] + '" onerror="placeholderImg(\''+_this.options.defaultPicType+'\',this);">' +
										  '</div>';
						} else {
							newAddImgsHTML += '<img style="width: ' + _this.picWidth + 'px; height: ' + _this.picHeight + 'px;" title="' + e[_this.options.paramMap.title] + '" class="' + _this.pageNumber + '^' + i + '" src="' +URL_FILE_SERVER+ e[_this.options.paramMap.imgPath] + '" onerror="placeholderImg(\''+_this.options.defaultPicType+'\',this);">';
						}
						//newAddImgsHTML += '<img style="width: ' + _this.picWidth + 'px; height: ' + _this.picHeight + 'px;" class="' + _this.pageNumber + '^' + i + '" src="' + e[_this.options.paramMap.imgPath] + '" onerror="placeholderImg(\''+_this.options.defaultPicType+'\');">';
						
						newAddImgsHTML += _this.setPicLinkAfter( _this.options.paramMap.linkType , e , _this.options.paramMap.id ) + '</div>';
					});
					var $newAddImgs = $( newAddImgsHTML );
					_this.$GalleryWall.append( $newAddImgs );
					_this.renderTitle( $newAddImgs , data.model.curPageData );
					
					//页面加载后执行的回调
					if( _this.executed === false ){
						if (typeof _this.afterLoad === "function") {
							_this.afterLoad.apply( this, [data] );
							_this.executed = true;
						}
					}
				}, 'json');
				
			},
			
			/**
			 * 绑定加载事件
			 */
			bindArrowEvent :function(){
				var _this = this;
				_this.$arrow = _this.$GalleryWall.next();
				_this.$arrow.unbind('click').bind('click', function(){
					_this.loadingImg();
				});
			},
			
			renderTitle : function( $newAddImgs , picInfoA ){
				if( this.options.titleType == 'mask'){
					this.renderMaskTitle( $newAddImgs , picInfoA );
				}else if( this.options.titleType == 'default' ){
					this.renderDefaultTitle( $newAddImgs , picInfoA );
				}
			},
			
			renderMaskTitle : function( $newAddImgs , picInfoA ){
				var _this = this;
				$newAddImgs.each(function( i , e ){
					$(this).find("a").append( "<p class='gwTitle gwMaskTitle'>" + picInfoA[i][_this.options.paramMap.title] + "</p>" );
					$(this).hover( function(){
						$('<a href="' + $(this).find('a').attr('href') + ' " target="' + $(this).find('a').attr('target') + '"><div class="picMask"><h4>' + picInfoA[i][_this.options.paramMap.title] + '</h4><p>' + picInfoA[i][_this.options.paramMap.audioAuthor] + '</p></div></a>').hide().appendTo($(this)).fadeIn(500);
					} , function(){
						$(this).find('.picMask').remove();
					});
				});
			},
			
			renderDefaultTitle : function( $newAddImgs , picInfoA ){
				var _this = this;
				$newAddImgs.each(function( i , e ){
					$(this).children("a,div").append( "<p class='gwTitle' title='" + picInfoA[i][_this.options.paramMap.title] + "'>" + picInfoA[i][_this.options.paramMap.title] + "</p>" );
				});
			},
			
			initImageSize : function(){
				var _this = this;
				if( _this.options.galleryType == "square"){
					_this.picWidth = 220;
					_this.picHeight = 220;
				}else if( _this.options.galleryType == "tall" ){
					_this.picWidth = 180;
					_this.picHeight = 220;
				}
			},
			
			setPicLink : function( typeProperty , data , idProperty ){
				var _this = this;
				//如果有link设置，则覆盖paramMap内的映射link
				if( this.options.link ){
					return '<a target="_blank" href="' + _this.options.link + '?id=' + data[idProperty] + '">';
				}
				else{
					var linkType = data[typeProperty];
					//如果ID不为空，按照后台相应数据类型跳转
					if( data[idProperty] && data[typeProperty] ){
						return '<a target="_blank" href="' + _this.options.paramMap.linkMap[linkType] + '?id=' + data[idProperty] + '">';
					}
					//如果后台数据ID为空，不跳转
					else{
						return '<div>';
					}
				}
			},
			setPicLinkAfter : function( typeProperty , data , idProperty ){
				var _this = this;
				if( this.options.link ){
					return '</a>';
				}
				else{
					if( data[idProperty] && data[typeProperty] ){
						return '</a>';
					}
					else{
						return '</div>';
					}
				}
			},
			
			setPicSrc : function( path ){
					 return DEFAULT_IMAGE; 
			 }
	}
	
    /*组件绑定到$.fn对象上*/
    $.fn.galleryWall=function(options){ //j小写
        return this.each(function() { //return必须要写，保证jquery级联
            return $.data(this, "galleryWall" , new GalleryWall(this, options));
        });
    }
	
}(jQuery));
