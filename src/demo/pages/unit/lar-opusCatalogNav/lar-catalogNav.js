/*!
 * larui 组件规范  v0.1
 * Url: www.css.com.cn
 * Copyright (c) 
 * License: none
 * 
 * 参数：
 * @ data  json
 *   从百科的目录json数据
 *   
 * 使用方法：从百科服务拿到目录json，然后渲染到页面上
 *  $.post( "data.json" , function(data){
 *      $('body').catalogNav({
 *      data : data
 *  });
 *      
 * 注意事项：
 * 
 */

(function($){   
    /**
     * 定义类构造类     
     */
    function CatalogNav(element, options) {  //注意开头字母大写
        /**
         * 将传入的参数覆盖到默认参数之上
         */
        this.options = $.extend(true,{},this.defaults,options); // 必须有
        this.$catalogNav = null; // jQuery级别对象
        /**
         * 调用初始化方法
         */
        this.init();    
    }
    
    /**
     * 类JqueryPluginConstructorName
     * 公共的属性和方法
     */
    CatalogNav.prototype = { //开头字母大写
            
            constructor: CatalogNav, // 必须有
            /**
             * 默认参数
             */
            defaults : {  //必须有
                data : {}, //必填
                url : '', //必填
                opusTitle : '',//必填
                titleId : '', //必填
                contentId : '' //必填
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
                $('#category').append('<section class="lar-opusCatalogNav-container"></section>');
                this.$catalogNav = $('.lar-opusCatalogNav-container');
                this.$catalogNav.append( _this._buildCatalog( this.options.data ) );
            },
            
            /**
             * 组件内部方法，不能对外暴露的，一定要加_
             */
            addEvent :function(){
                var _this = this;
                //写任何逻辑
                //一级节点点击事件
                $( '.lar-opusCatalogNav-title' ).bind('click',function(){
                	if($(this).nextAll().length === 0) {
                		//只有一级节点，直接发请求章节内容
                		$( '.lar-opusCatalogNav-article  span' ).css('color','#333');
                    	$(this).find('span').css('color','#009e96');
                    	$( '#'+_this.options.opusTitle ).text($(this).find('span').text());
                    	$( '#'+_this.options.titleId ).empty();
                		 $.post( _this.options.url,{ articleId: $(this).find('span').attr('id') } , function(data){
                			 	$( '#'+_this.options.contentId ).empty();
                		        $( '#'+_this.options.contentId ).append(data.model.entity.articleContent);
                		    }, 'json');
                	}else{
                		//有两级节点时，点击第一级节点展开/隐藏
                		$(this).nextAll().slideToggle();
                	}
                });
                //二级节点点击事件,直接发请求章节内容
                $( '.lar-opusCatalogNav-article p' ).bind('click',function(){
                	$( '.lar-opusCatalogNav-article  span' ).css('color','#333');
                	$(this).find('span').css('color','#009e96');
                	var opusTitle = $(this).parent().find("h4.lar-opusCatalogNav-title span").text();
                	if(opusTitle) {
                		$( '#'+_this.options.opusTitle ).text(opusTitle);
                	}
                	$( '#'+_this.options.titleId ).text($(this).find('span').text());
                	$.post( _this.options.url,{ articleId: $(this).find('span').attr('id') } , function(data){
                		$( '#'+_this.options.contentId ).empty();
        		        $( '#'+_this.options.contentId ).append(data.model.entity.articleContent);
        		    }, 'json');
                });
            },
            
            _buildContainer : function(){
                var _this = this;
            },
            
            //创建一级目录
            _buildCatalog : function( data ){
                var _this = this;
                var catalogsHTML = "";
                
                _this.$catalogNav.append('<div class="lar-opusCatalogNav-roundIcon lar-catelogNav-iconTop"></div>');
                
                $.each( data , function( i , e ){
                    catalogsHTML += _this._buildSingleCatalog( e );
                });
                
                this.$catalogNav.append( catalogsHTML );
                
                _this.$catalogNav.append('<div class="lar-opusCatalogNav-roundIcon lar-catelogNav-iconBottom"></div>');
            },
            
            //创建二级目录
            _buildSingleCatalog : function ( data ){
                var $article = $('<article class="lar-opusCatalogNav-article"><h4 class="lar-opusCatalogNav-title"><span id="' + data.articleId + '">' + data.articleTitle + '</span></h4></article>');
                $.each( data.articles , function( i , e ){
                    $article = $article.append( '<p><span id="' + e.articleId + '">' + e.articleTitle + '</span></p>' );
                });
                
                var catalogHTML = '<div class="lar-opusCatalogNav-block">' + 
                                        '<div class="lar-opusCatalogNav-img lar-opusCatalogNav-icon"></div>' + 
                                        '<div class="lar-opusCatalogNav-content">' +  $article.wrap('<p/>').parent().html() +
                                        '</div>' + 
                                   '</div>';
                
                return catalogHTML;
            }
    }
    
    /*组件绑定到$.fn对象上*/
    $.fn.catalogNav=function(options){ //j小写
        return this.each(function() { //return必须要写，保证jquery级联
            return $.data(this, "catalogNav" , new CatalogNav(this, options));
        });
    }
    
}(jQuery));
