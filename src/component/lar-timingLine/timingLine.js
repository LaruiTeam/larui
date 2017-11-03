/*!
 * larui 组件规范  v0.1
 * Url: www.css.com.cn
 * Copyright (c) 
 * License: none
 * 
 * 参数：
 * @ dataUrl  String
 *   渲染时间轴的action路径
 * @ renderType  String
 *   目前支持两种样式，类型 normal和round ， 默认normal
 * @ pageSize Int
 *   每页显示条数， 默认6条
 * @ showPic boolean  
 *   是否显示图片DOM
 * @ titleColor String
 *   标题颜色
 * @ contentColor String
 *   内容颜色
 * @ borderColor String
 *   边框颜色
 * @ yearBgColor String
 *   年份背景颜色
 * @ yearFontColor String
 *   年份字体颜色 
 * @ paramMap obj
 *   后台返回字段映射参数
 *	   imgPath    默认值 : 'imgPath',
 *	   title      默认值 : 'title',
 *	   id         默认值 : 'id',
 *	   year       默认值 : 'year',
 *	   host       默认值 : 'host',
 *	   address    默认值 : 'address',
 *	   remark     默认值 : 'remark',
 *	   link       默认值 : 'link'
 * @ afterLoad(e) function
 *   提供请求回调，每次请求dataUrl时，提供回调，其中的e为请求返回内容
 * 使用方法：
 *	$('.lar-timeline2-container').timeline({
 *		dataUrl : 'http://localhost:8080/lar-search-web/lar-ui/lar-timeline/data.json',
 *		renderType : 'normal'  //或者 "round"
 *	});
 * @ fixImgUrl string
 *   时间轴通用图片路径，覆盖任何图片。通常用在统一的ICON上，比如奖项。	
 * 
 * 注意事项：
 * 1. 本组件目前支持两种样式，一种是带年代带圆圈背景的时间轴，一种是普通时间轴
 * 
 */
import $ from 'jquery';
window.$=$;
(function($){	
	/**
	 * 定义类构造类     
	 */
	function Timeline(element, options) {  //注意开头字母大写
		/**
		 * 将传入的参数覆盖到默认参数之上
		 */
		this.options = $.extend(true,{},this.defaults,options); // 必须有
		this.timeline = element; // DOM级别对象
		this.$timeline = $(element); // jQuery级别对象
		this.currentYear = null;
		this.currentPage = 1;
		this.pageSize = this.options.pageSize;
		this.afterLoad = this.options.afterLoad;
		this.executed = false;
		this.fixImgUrl = this.options.fixImgUrl;
		/**
		 * 调用初始化方法
		 */
		this.init();	
	}
	
	/**
	 * 类JqueryPluginConstructorName
	 * 公共的属性和方法
	 */
	Timeline.prototype = { //开头字母大写
			
			constructor: Timeline, // 必须有
			/**
			 * 默认参数
			 */
			defaults : {  //必须有
				dataUrl : 'data.json',
				pageSize : 5,
				renderType : "normal", // 目前支持两种样式，类型 normal和round
				showPic : false,
				titleColor : '#000',
				contentColor : '#000',
				borderColor: '#c2c4c4',
	            yearBgColor : '#ffc000',
	            yearFontColor : '#fff',
				paramMap : {
					imgPath : 'imgPath',
					title : 'title',
					id : 'id',
					year: 'year'
				},
				fixImgUrl : null
			},
			/**
			 * 公共的初始化构造方法
			 */
			init:function(){
				this.buildDom();
				this.addEvent();
			},
			
			/**
			 * 任何组件方法,对外暴露的，方便日后扩展的
			 */
			buildDom :function(){
				var _this = this;
				_this._buildBody();
		    	_this.$timeline.after('<div class="btn_dropDown"><button class="icon btn_arrow"></button></div>');
				//写任何逻辑
			},
			
			/**
			 * 组件内部方法，不能对外暴露的，一定要加_
			 */
			addEvent :function(){
				var _this = this;
				_this.$timeline.next('.btn_dropDown').find('.btn_arrow').bind('click', function(){
					_this.currentPage++;
					_this._buildBody();
				});
				//写任何逻辑
			},
			
			_buildBody : function(){
				var _this = this;
				_this.$timeline.css("border-left" , "4px solid " + _this.options.borderColor );
				switch( _this.options.renderType ){
				case "normal":
					_this._buildBodyNormal();
					break;
				case "round":
					_this._buildBodyRound();
					break;
				}
			},
			
			_buildBodyRound : function(){
				var _this = this;
				var postParam = $.extend( _this.options.param , { pageSize :  _this.pageSize , curPage : _this.currentPage } );
				$.post( _this.options.dataUrl , postParam , function( data ){
					//如果分页有数据，显示
					var pageNum = Math.ceil(data.model.allDataCount/_this.pageSize);
					if( data.model.curPageData.length > 0 ){
				    	$.each ( data.model.curPageData , function( i , e ){
				    		if( e[_this.options.paramMap.year] !== _this.currentYear ){
				    			_this._renderYear( e[_this.options.paramMap.year] );
				    			_this.currentYear = e[_this.options.paramMap.year];
				    		}
				    		_this._renderRowInfo( e );
				    	});
				    	//如果请求数据小于pageSize,说明数据已经请求完成，箭头需隐藏
				    	// 修改为判断页数，如果当前页数大于或等于总页数，说明已经加载完了（实际应该不会大于的）
				    	if( _this.currentPage >= pageNum ){
				    		_this._isLastPage(data.model.curPageData.length);
				    	}
					}
					//如果数据全部请求完，隐藏箭头
					else{
						_this._isLastPage(0);
					}
					//页面加载后执行的回调
					if( _this.executed === false ){
						if (typeof _this.afterLoad === "function") {
							_this.afterLoad.apply( this, [data] );
							_this.executed = true;
						}
					}
					
				} , 'json');
			},
			
			_buildBodyNormal : function(){
				var _this = this;
				var postParam = $.extend( _this.options.param , { pageSize :  _this.pageSize , curPage : _this.currentPage } );
				$.post( _this.options.dataUrl , postParam , function( data ){
					//如果分页有数据，显示
					var pageNum = Math.ceil(data.model.allDataCount/_this.pageSize);
					if( data.model.curPageData.length > 0 ){
				    	$.each ( data.model.curPageData , function( i , e ){
				    		_this._renderRowInfo( e );
				    	});
				    	//如果请求数据小于pageSize,说明数据已经请求完成，箭头需隐藏
				    	// 修改为判断页数，如果当前页数大于或等于总页数，说明已经加载完了（实际应该不会大于的）
				    	if( _this.currentPage >= pageNum ){
				    		_this._isLastPage(data.model.curPageData.length);
				    	}
				    //如果数据全部请求完，隐藏箭头
					}else{
						_this._isLastPage(0);
					}
					//页面加载后执行的回调
					if( _this.executed === false ){
						if (typeof _this.afterLoad === "function") {
							_this.afterLoad.apply( this, [data] );
							_this.executed = true;
						}
					}
					
				} , 'json');
			},
			
	    	_renderYear : function( year ){
	    		var _this = this;
	    		var yearHTML = '<div class="lar-timeline2-block">' + 
											'<div style="background: ' + _this.options.yearBgColor + '; color : ' + _this.options.yearFontColor + '" class="lar-timeline2-year lar-timeline-round">' + (year || '')+ '</div>' + 
											'</div>';
	    		
	    		_this.$timeline.append(yearHTML);
	            return false;
	        },
	        
	    	_renderRowInfo : function( awardOBJ ){
	    		var _this = this;
	    		
				switch(_this.options.renderType){
					case "normal":
						var singleAwardInfoHTML = '<div class="lar-timeline2-block">' +
						'<div class="lar-timeline2-year lar-timeline-normal">' + awardOBJ[_this.options.paramMap.year] + '</div>' +
					   	'<div style="background : ' + _this.options.borderColor + '" class="lar-timeline2-img lar-timeline2-icon"></div>' +
							'<div style="border: 1px solid ' + _this.options.borderColor + '" class="lar-timeline2-content">' + 
							'<div style="border-right : 10px solid ' + _this.options.borderColor + '" class="lar-timeline2-arrow"></div>' +
								_this._getFigureHTML( awardOBJ[_this.options.paramMap.imgPath] ) +
				                '<article class="lar-timeline2-article">' +
				                    '<h3 class="lar-timeline2-title">' + _this._setTitleLink( awardOBJ[_this.options.paramMap.id] , awardOBJ[_this.options.paramMap.title] ) + '</h3>' +
				                    _this._getBodyHTML( awardOBJ ) +
				                    '</p>' +
				                '</article>' +
				            '</div> ' +
				        '</div> ' ;
						break;
					case "round":
			    		var singleAwardInfoHTML = '<div class="lar-timeline2-block">' +
					   	'<div style="background : ' + _this.options.borderColor + '" class="lar-timeline2-img lar-timeline2-icon"></div>' +
							'<div style="border: 1px solid ' + _this.options.borderColor + '" class="lar-timeline2-content">' + 
							'<div style="border-right : 10px solid ' + _this.options.borderColor + '" class="lar-timeline2-arrow"></div>' + 
								_this._getFigureHTML( awardOBJ[_this.options.paramMap.imgPath] ) +
				                '<article class="lar-timeline2-article">' +
				                    '<h3 class="lar-timeline2-title">' + _this._setTitleLink( awardOBJ[_this.options.paramMap.id] , awardOBJ[_this.options.paramMap.title]) + '</h3>' +
				                    _this._getBodyHTML( awardOBJ ) +
				                '</article>' +
				            '</div> ' +
				        '</div> ' ;
						break;
				}

	    		_this.$timeline.append(singleAwardInfoHTML);
	    		return false;
	    	},
	    	
	    	_getFigureHTML : function( imgPath ){
	    		var path = '';
	    		if( this.options.showPic ){
	    			//如果有通用图片，则覆盖所有图片
	    			if( this.options.fixImgUrl ){
	    				path = this.options.fixImgUrl;
	    			}
	    			//没有通用图片，则默认显示数据图片
	    			else{
	    				path = URL_FILE_SERVER + imgPath;
	    			}
	                return '<figure class="lar-timeline2-figure">' +
	                	       '<img onerror="placeholderImg(\'\',this)" src="' + path + '"></img>' +
	                	   '</figure>';
	    		}else{
	    			return '';
	    		}
	    	},
	    	
	    	_getBodyHTML : function( awardOBJ ){
	    		var _this = this;
	    		var bodyHTML = '';
			    if( _this.options.paramMap.hasOwnProperty('host')  && awardOBJ[_this.options.paramMap.host] != null) {
			    	bodyHTML += '<p style="color: ' + _this.options.contentColor + '"><strong>主办单位</strong>: ' + awardOBJ[_this.options.paramMap.host] + '</p>';
			    }
			    if( _this.options.paramMap.hasOwnProperty('address') && awardOBJ[_this.options.paramMap.address] != null) {
			    	
			    	bodyHTML += '<p style="color: ' + _this.options.contentColor + '"><strong>地点</strong>: ' + awardOBJ[_this.options.paramMap.address] + '</p>'; 
			    }
			    if( _this.options.paramMap.hasOwnProperty('remark') && awardOBJ[_this.options.paramMap.remark] != null) {
			    	bodyHTML += '<p style="color: ' + _this.options.contentColor + '"><strong></strong> ' + awardOBJ[_this.options.paramMap.remark]+ '</p>'; 
			    }
			    return bodyHTML;
	    	},
	    	
	    	_isLastPage : function(curDataLength){
	    		var _this = this;
	    		if(curDataLength === 0 && _this.currentPage == 1) {	// 如果是第一页，并且请求的数据是空，就不显示已到底部的提示了
	    			_this.$timeline.next('.btn_dropDown').empty();
	    		} else {
	    			_this.$timeline.next('.btn_dropDown').empty().append('已到底部');
	    		}
	    		
	    	},
	    	
	    	_setTitleLink : function( id , title ){
	    		var _this = this;
	    		if( _this.options.link ){
	    			return '<a target="_blank" style="color: ' + _this.options.titleColor + '" href="' + _this.options.link + '?id=' + id + '">' + title + '</a>';
	    		}else{
	    			return '<span style="color: ' + _this.options.titleColor + '">' + title + '</span>';
	    		}
	    		
	    	}
	}
	
    /*组件绑定到$.fn对象上*/
    $.fn.timeline=function(options){ //j小写
        return this.each(function() { //return必须要写，保证jquery级联
            return $.data(this, "timeline" , new Timeline(this, options));
        });
    }
	
}(jQuery));
