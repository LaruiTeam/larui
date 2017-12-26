/*
 $.fn.larGalleryVideo - by weijy
 */
/*  
 options
 {
 	showNum: 3,
 	errorImage: '../../lar-ui/imgs/default.png',
 	video_items: [{
 		href:  'http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html',
 		src: 'http://192.168.5.200:81/temporary/picture/55/e8/e0e8202be9a74e0aad3791c916e38def.jpg',
 		extras: {
 			$dom: $('<div class="des">
 							  <div class="title">
 								 <a href="http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html" target="_blank">法学名家专区</a>
 							  </div>
 							  <div class="line"></div>
 							  <div class="eng">Famous law area</div>
 						   </div>'),
 			position: 'after'
 		}
 	},{
 		href:  'http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html',
 		src: 'http://192.168.5.200:81/temporary/picture/55/e8/e0e8202be9a74e0aad3791c916e38def.jpg',
 		extras: {
 			$dom: $('<div class="des">
 							  <div class="title">
 								 <a href="http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html" target="_blank">法学名家专区</a>
 							  </div>
 							  <div class="line"></div>
 							  <div class="eng">Famous law area</div>
 						   </div>'),
 			position: 'after'
 		}
 	},{
 		href:  'http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html',
 		src: 'http://192.168.5.200:81/temporary/picture/55/e8/e0e8202be9a74e0aad3791c916e38def.jpg',
 		extras: {
 			$dom: $('<div class="des">
 							  <div class="title">
 								 <a href="http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html" target="_blank">法学名家专区</a>
 							  </div>
 							  <div class="line"></div>
 							  <div class="eng">Famous law area</div>
 						   </div>'),
 			position: 'after'
 		}
 	},{
 		href:  'http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html',
 		src: 'http://192.168.5.200:81/temporary/picture/55/e8/e0e8202be9a74e0aad3791c916e38def.jpg',
 		extras: {
 			$dom: $('<div class="des">
 							  <div class="title">
 								 <a href="http://192.168.5.200:81/court-digital-library-search-new/page/judgeLawyer/jurist.html" target="_blank">法学名家专区</a>
 							  </div>
 							  <div class="line"></div>
 							  <div class="eng">Famous law area</div>
 						   </div>'),
 			position: 'after'
 		}
 	}]
 }
 * 
 * 
 */
/*
 methods
 {
 next()                          // 下一页
 prev()                          // 上一页
 play(index)                     // 指定一页
 }
 */
/*
speed 轮播速度
direction 轮播方向;值：left,right,stop(不轮播)
*/
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

})(function($) {
    'user strict';

    var NAMESPACE = 'css.gallery_video';

    function GalleryVideo(element, options) {
        var _this = this;

        _this.options = options;                                        // options

        var vars = _this._vars      = {};                               // vars
        vars.$element               = $(element);
        vars.current                = 0;                                // 当前索引
        vars.animate                = false;                            // 是否正在动画中
        vars.video_items					= _this.options.video_items;	//数据项
        vars.video_itemsLength			= _this.options.video_items.length;//数据总个数
        vars.showNum				= _this.options.showNum?_this.options.showNum:3;		// 显示个数
        vars.speed					= _this.options.speed?_this.options.speed:3000;//自动轮播速度
        vars.direction				= _this.options.direction?_this.options.direction:'left';//自动轮播方向

        GalleryVideo.init.call(_this);
    }

    GalleryVideo.DEFAULTS = { };

    GalleryVideo.TEMPLATE =
        '<div class="css-gallery">' +
            '<div class="css-css-gallery-wrap">' +
                '<ul class="css-gallery-video-list">' +
                    '<li class="css-gallery-item">' +
                        '<a href="#">' +
                            '<img src="" />' +
                        '</a>' +
                    '<p class="cont">'+
                    '</p></li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                        '<p class="cont">'+
                    '</p></li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                        '<p class="cont">'+
                    '</p></li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                        '<p class="cont">'+
                    '</p></li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                        '<p class="cont">'+
                    '</p></li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                        '<p class="cont">'+
                    '</p></li>' +
                '</ul>' +
            '</div>' +
            '<span class="css-gallery-btn prev" data-type="prev"></span>' +
            '<span class="css-gallery-btn next" data-type="next"></span>' +
        '</div>';

    GalleryVideo.init = function() {
        var _this = this;

        GalleryVideo.render.call(_this);
    };

    GalleryVideo.render = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;
        
        $element.html(GalleryVideo.TEMPLATE);

        vars.$list = $element.find('.css-gallery-video-list');
        vars.$btns = $element.find('.css-gallery-btn');
        vars.$btnPrev = $element.find('.css-gallery-btn.prev');
        vars.$btnNext = $element.find('.css-gallery-btn.next');
        
        GalleryVideo.renderData.call(_this);

        GalleryVideo.btnReset.call(_this);
        GalleryVideo.bindEvent.call(_this);
        
        //自动轮播
        var t;
        GalleryVideo.setTimer = function(){
        	if(vars.direction === 'left'){
            	t = setInterval(function(){GalleryVideo.next.call(_this)},vars.speed);//向左轮播
            }else if(vars.direction === 'right'){
            	t = setInterval(function(){GalleryVideo.prev.call(_this)},vars.speed);//向右轮播
            }else if(vars.direction === 'stop'){}
        }
        
//        if(vars.direction === 'left'){
//        	var t = setInterval(function(){GalleryVideo.next.call(_this)},vars.speed);//向左轮播
//        }else if(vars.direction === 'right'){
//        	var t = setInterval(function(){GalleryVideo.prev.call(_this)},vars.speed);//向右轮播
//        }else if(vars.direction === 'stop'){}
        
//        var t = setInterval(function(){GalleryVideo.prev.call(_this)},vars.speed);
        
        GalleryVideo.setTimer.call();
        $('.css-gallery-video-list li a').on('mouseover',function(){
        	clearTimeout(t);
        });
        $('.css-gallery-video-list li a').on('mouseout',function(){
        	GalleryVideo.setTimer.call();
        });
    };
    
    GalleryVideo.renderData = function(){
    	var _this = this,
	        vars = _this._vars,
	        video_items = vars.video_items,
	        showNum = vars.showNum,
	        errorImage = vars.errorImage,
            $element = vars.$element,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext,
	        $list = vars.$list,
	        extraDom_h = 0;
    	
    	if (!errorImage){
    		errorImage = '../../lar-ui/imgs/default.jpg';
    	}
    	
    	if (video_items){
    		$list.empty();
    		$.each(video_items, function( i, item ) {
//    			console.log(item.href);
    			var href = item.href?'<a  id="a_i" href="'+ baseUrl + '/page/video/video.html?brsType=0&video=' + item.href + '" target="_blank">':'<a id="a_i" >';
    			var a_href = item.href?'<a style="border:none;background-color:none;" href="'+ baseUrl + '/page/video/video.html?brsType=0&video=' + item.href + '" target="_blank">':'<a style="border:none;background-color:none;">';
    			var src = item.src?item.src:'#';
    			//var des = item.description?item.description:'';
        		var $li = $('<li class="css-gallery-item listItem"><div class="videoBg">'+a_href+'</a></div>' + href +
        						
				              	'<img src="' + src + '" onerror="this.src=\'' + errorImage + '\'" />' +
				              '</a>' +
				             /*'<div class="p_cont">'+des+	'</div>'*/+
				             '</li>');
        		
        		if (item.extras){
        			if (!item.extras.position || item.extras.position === 'after'){
        				$li.append(item.extras.$video_dom);
        			}else if (item.extras.position === 'before'){
        				$li.prepend(item.extras.$video_dom);
        			}
        		}
        		$list.append($li);
        		if (item.extras){
        			extraDom_h = parseInt(item.extras.$video_dom.height());
        		}
    		});
    		$btnPrev.css('margin-top', -extraDom_h);
    		$btnNext.css('margin-top', -extraDom_h);
    	}
        vars.$video_items = $element.find('.css-gallery-item');
        
        if (showNum){
        	var percent = 100/showNum;
        	vars.$video_items.css('width', percent + '%');
        }
        
        $('.css-gallery-video-list li').clone(true).appendTo($('.css-gallery-video-list'));
    }

    GalleryVideo.bindEvent = function() {
        var _this = this,
            vars = _this._vars,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext;

        $btnPrev.on('click', function() {
            GalleryVideo.prev.call(_this);
        });

        $btnNext.on('click', function() {
            GalleryVideo.next.call(_this);
        });

//        $(window).on('resize', function(){
//            GalleryVideo.resize.call(_this);
//        });
    };

    GalleryVideo.resize = function() {
        var _this = this,
            vars = _this._vars,
            $video_items = vars.$video_items,
            current = vars.current;

        GalleryVideo.play.call(_this, current);
    }

    GalleryVideo.btnReset = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            $list = vars.$list,
            $video_items = vars.$video_items,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext,
            current = vars.current;
        
            //if(vars.video_itemsLength > vars.showNum){
            	$btnPrev.show();
                $btnNext.show();
            //}else{
            //	$btnPrev.hide();
             //   $btnNext.hide();
            //}
//        var l = parseInt($list.css('left'));
//        l >= 0 ? $btnPrev.hide() : $btnPrev.show();
      
        var length = $video_items.length;
        var width = $($video_items[0]).outerWidth();
        var width_wrap = $element.innerWidth();
        //  var n = Math.ceil(width_wrap / width);
        var n = Math.round(width_wrap / width);
//        if ((current+1) * n < length) {
//            $btnNext.show();
//        } else $btnNext.hide();
    }

    GalleryVideo.prototype.next = GalleryVideo.next = function() {
        var _this = this,
            vars = _this._vars,
            current = vars.current;

        GalleryVideo.play.call(_this, current + 1);
    }

    GalleryVideo.prototype.prev = GalleryVideo.prev = function() {
        var _this = this,
            vars = _this._vars,
            current = vars.current;

        GalleryVideo.play.call(_this, current - 1);
    }
    GalleryVideo.prototype.play = GalleryVideo.play = function(index) {
        var _this = this,
                     vars = _this._vars,
                     $element = vars.$element,
                     $video_items = vars.$video_items,
                     $list = vars.$list,
                     $showNum = vars.showNum;
        if (vars.animate) return ;
        	vars.animate = true;
        var left = 0;
        var width_wrap = $element.innerWidth()/$showNum;
        left = -index * width_wrap;

        if(index === vars.video_itemsLength){
        	$list.animate({left : left + 'px'}, function(){
	            vars.current = 0;
	            GalleryVideo.btnReset.call(_this);
	            vars.animate = false;
	            $('.css-gallery-video-list').css({left:'0px'});
	        });
        }else if(index === -1){
        	copyLeft = -vars.video_itemsLength * width_wrap;
        	left = copyLeft+width_wrap;
        	$('.css-gallery-video-list').css({left : copyLeft + 'px'});
        	$list.animate({left : left + 'px'}, function(){
                vars.current = vars.video_itemsLength-1;
                GalleryVideo.btnReset.call(_this);
                vars.animate = false;
            });
        }else{
	        $list.animate({left : left + 'px'}, function(){
	             vars.current = index;
	             GalleryVideo.btnReset.call(_this);
	             vars.animate = false;
	        });
        }
     };

    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, GalleryVideo.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new GalleryVideo(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.larGalleryVideo = Plugin;
});