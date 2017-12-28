/*
 $.fn.larGallery - by weijy
 */
/*  
 options
 {
 	showNum: 3,
 	errorImage: '../../lar-ui/imgs/default.png',
 	items: [{
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

    var NAMESPACE = 'css.gallery';

    function Gallery(element, options) {
        var _this = this;

        _this.options = options;                                        // options

        var vars = _this._vars      = {};                               // vars
        vars.$element               = $(element);
        vars.current                = 0;                                // 当前索引
        vars.animate                = false;                            // 是否正在动画中
        vars.items					= _this.options.items;	//数据项
        vars.itemsLength			= _this.options.items.length;//数据总个数
        vars.showNum				= _this.options.showNum?_this.options.showNum:3;		// 显示个数
        vars.speed					= _this.options.speed?_this.options.speed:3000;//自动轮播速度
        vars.direction				= _this.options.direction?_this.options.direction:'left';//自动轮播方向

        Gallery.init.call(_this);
    }

    Gallery.DEFAULTS = { };

    Gallery.TEMPLATE =
        '<div class="css-gallery">' +
            '<div class="css-gallery-list-wrap">' +
                '<ul class="css-gallery-list">' +
                    '<li class="css-gallery-item">' +
                        '<a href="#">' +
                            '<img src="" />' +
                        '</a>' +
                    '</li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                    '</li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                    '</li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                    '</li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                    '</li><li class="css-gallery-item">' +
                        '<a href="#">' +
                        '<img src="" />' +
                        '</a>' +
                    '</li>' +
                '</ul>' +
            '</div>' +
            '<span class="css-gallery-btn prev" data-type="prev"></span>' +
            '<span class="css-gallery-btn next" data-type="next"></span>' +
        '</div>';

    Gallery.init = function() {
        var _this = this;

        Gallery.render.call(_this);
    };

    Gallery.render = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;
        
        $element.html(Gallery.TEMPLATE);

        vars.$list = $element.find('.css-gallery-list');
        vars.$btns = $element.find('.css-gallery-btn');
        vars.$btnPrev = $element.find('.css-gallery-btn.prev');
        vars.$btnNext = $element.find('.css-gallery-btn.next');
        
        Gallery.renderData.call(_this);

        Gallery.btnReset.call(_this);
        Gallery.bindEvent.call(_this);
        
        //自动轮播
        var t;
        Gallery.setTimer = function(){
        	if(vars.direction === 'left'){
            	t = setInterval(function(){Gallery.next.call(_this)},vars.speed);//向左轮播
            }else if(vars.direction === 'right'){
            	t = setInterval(function(){Gallery.prev.call(_this)},vars.speed);//向右轮播
            }else if(vars.direction === 'stop'){}
        }
        
//        if(vars.direction === 'left'){
//        	var t = setInterval(function(){Gallery.next.call(_this)},vars.speed);//向左轮播
//        }else if(vars.direction === 'right'){
//        	var t = setInterval(function(){Gallery.prev.call(_this)},vars.speed);//向右轮播
//        }else if(vars.direction === 'stop'){}
        
//        var t = setInterval(function(){Gallery.prev.call(_this)},vars.speed);
        
        Gallery.setTimer.call();
        $('.css-gallery-list li a').on('mouseover',function(){
        	clearTimeout(t);
        });
        $('.css-gallery-list li a').on('mouseout',function(){
        	Gallery.setTimer.call();
        });
    };
    
    Gallery.renderData = function(){
    	var _this = this,
	        vars = _this._vars,
	        items = vars.items,
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
    	
    	if (items){
    		$list.empty();
    		$.each(items, function( i, item ) {
    			var href = item.href?'<a href="' + item.href + '" target="_blank">':'<a>';
    			var src = item.src?item.src:'#';
        		var $li = $('<li class="css-gallery-item">' + href +
				              	'<img src="' + src + '" onerror="this.src=\'' + errorImage + '\'" />' +
				              '</a>' +
				          	'</li>');
        		
        		if (item.extras){
        			if (!item.extras.position || item.extras.position === 'after'){
        				$li.append(item.extras.$dom);
        			}else if (item.extras.position === 'before'){
        				$li.prepend(item.extras.$dom);
        			}
        		}
        		$list.append($li);
        		if (item.extras){
        			extraDom_h = parseInt(item.extras.$dom.height());
        		}
    		});
    		$btnPrev.css('margin-top', -extraDom_h);
    		$btnNext.css('margin-top', -extraDom_h);
    	}
        vars.$items = $element.find('.css-gallery-item');
        
        if (showNum){
        	var percent = 100/showNum;
        	vars.$items.css('width', percent + '%');
        }
        
        $('.css-gallery-list li').clone(true).appendTo($('.css-gallery-list'));
    }

    Gallery.bindEvent = function() {
        var _this = this,
            vars = _this._vars,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext;

        $btnPrev.on('click', function() {
            Gallery.prev.call(_this);
        });

        $btnNext.on('click', function() {
            Gallery.next.call(_this);
        });

//        $(window).on('resize', function(){
//            Gallery.resize.call(_this);
//        });
    };

    Gallery.resize = function() {
        var _this = this,
            vars = _this._vars,
            $items = vars.$items,
            current = vars.current;

        Gallery.play.call(_this, current);
    }

    Gallery.btnReset = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            $list = vars.$list,
            $items = vars.$items,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext,
            current = vars.current;
        
            if(vars.itemsLength > vars.showNum){
            	$btnPrev.show();
                $btnNext.show();
            }else{
            	$btnPrev.hide();
                $btnNext.hide();
            }
//        var l = parseInt($list.css('left'));
//        l >= 0 ? $btnPrev.hide() : $btnPrev.show();
      
        var length = $items.length;
        var width = $($items[0]).outerWidth();
        var width_wrap = $element.innerWidth();
        //  var n = Math.ceil(width_wrap / width);
        var n = Math.round(width_wrap / width);
//        if ((current+1) * n < length) {
//            $btnNext.show();
//        } else $btnNext.hide();
    }

    Gallery.prototype.next = Gallery.next = function() {
        var _this = this,
            vars = _this._vars,
            current = vars.current;

        Gallery.play.call(_this, current + 1);
    }

    Gallery.prototype.prev = Gallery.prev = function() {
        var _this = this,
            vars = _this._vars,
            current = vars.current;

        Gallery.play.call(_this, current - 1);
    }
    Gallery.prototype.play = Gallery.play = function(index) {
        var _this = this,
                     vars = _this._vars,
                     $element = vars.$element,
                     $items = vars.$items,
                     $list = vars.$list,
                     $showNum = vars.showNum;
        if (vars.animate) return ;
        	vars.animate = true;
        var left = 0;
        var width_wrap = $element.innerWidth()/$showNum;
        left = -index * width_wrap;

        if(index === vars.itemsLength){
        	$list.animate({left : left + 'px'}, function(){
	            vars.current = 0;
	            Gallery.btnReset.call(_this);
	            vars.animate = false;
	            $('.css-gallery-list').css({left:'0px'});
	        });
        }else if(index === -1){
        	copyLeft = -vars.itemsLength * width_wrap;
        	left = copyLeft+width_wrap;
        	$('.css-gallery-list').css({left : copyLeft + 'px'});
        	$list.animate({left : left + 'px'}, function(){
                vars.current = vars.itemsLength-1;
                Gallery.btnReset.call(_this);
                vars.animate = false;
            });
        }else{
	        $list.animate({left : left + 'px'}, function(){
	             vars.current = index;
	             Gallery.btnReset.call(_this);
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
                var options = $.extend(true, {}, Gallery.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new Gallery(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.larGallery = Plugin;
});