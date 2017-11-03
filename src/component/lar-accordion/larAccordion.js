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
import $ from 'jquery';
window.$=$;
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

    var NAMESPACE = 'css.accordion';

    function Accordion(element, options) {
        var _this = this;

        _this.options = options;// options

        var vars = _this._vars		= {};// vars
        vars.$element				= $(element);
        vars.items					= _this.options.items;  //数据项
        vars.postUrl				= _this.options.postUrl; 
        vars.postParm				= _this.options.postParm;
        vars.parmName				= _this.options.parmName?_this.options.parmName:'';

        vars.imgPathName			= _this.options.imgPathName?_this.options.imgPathName:'';
        vars.wordDataName			= _this.options.wordDataName?_this.options.wordDataName:'';
        vars.urlName				= _this.options.urlName?_this.options.urlName:'';

        vars.acdContentW            = _this.options.accordionWidth?_this.options.acdContentW:'900';
        vars.acdContentH            = _this.options.accordionHeight?_this.options.acdContentH:'370';
        vars.acdSpeed               = _this.options.acdSpeed?_this.options.acdSpeed:350;


        Accordion.init.call(_this);
    }
    
    Accordion.DEFAULTS = { };
    
    Accordion.TEMPLATE = 
    	'<div class="accordion">'+
    		'<ul id="accordionMain"></ul>'+
    	'</div>';      

    Accordion.init = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;
        vars.$accordionMain = $element.find('#accordionMain');
        Accordion.render.call(_this);
        
    };

    Accordion.render = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            items = vars.items,
            $accordionMain = vars.$accordionMain;

        $element.html(Accordion.TEMPLATE);
        if (items) {
        	$accordionMain.empty();
        	$.each(items, function( i, item ) {
        		var $list = $('<li class="accordionList"></li>');
                if (item.extras){
                    $list.append(item.extras.$dom);
                }
                $accordionMain.append($list);
            });
        }else{
        	Accordion.buildData.call(_this);
        }

    };

    Accordion.buildData = function() {
        var _this = this,
            vars = _this._vars,
            $accordionMain = vars.$accordionMain,
            postUrl = vars.postUrl,
            postParm = vars.postParm,
            parmName = vars.parmName,
            imgPathName = vars.imgPathName,
            wordDataName = vars.wordDataName,
			urlName = vars.urlName,
            acdWidth = vars.acdContentW,
            acdHeight = vars.acdContentH,
            acdSpeed = vars.acdSpeed,
            htmls = '';
        // var postUrl = baseUrl + '/sword/dictService/findSubCodesByPcodeAndType';
        // $.post(postUrl,{postParm}).done(function(data) {
        $.post(postUrl,postParm).done(function(data) {
            var data = data.model;
            if (data) {
            	if (parmName !== '') {
                    data = data[parmName];
                }
                for (var i = 0; i < data.length; i++) {
                	var path = URL_FILE_SERVER + data[i][imgPathName];
                	htmls += '<li  class="accordionList">';
                    htmls +=    '<div class="accdTit">';
                    htmls +=        '<p class="accordionP">'+ data[i][wordDataName] +'</p>';
                    htmls +=    '</div>';
                	//htmls += 	'<div style="background-image:url('+ path +')" class="accdContent"></div>';
                    htmls +=    '<div class="accdContent">';
                    htmls +=        '<img src="'+ path +'" />';
                    htmls +=    '</div>';

                	htmls += '</li>';
                }

            }
            $('#accordionMain').append(htmls);
            var acdConW = parseInt(acdWidth)+data.length*50;
            $('.accordion').css({'width': acdConW+'px','height': acdHeight+'px'});
            // $('.accordionList').css({'width': acdWidth+'px','height': acdHeight+'px'});
            var contentW = acdWidth-50;
            $('.accordionList:first-child .accdContent').css({'width':contentW+'px','height':acdHeight+'px'});
            $('.accordionList .accdContent img').css({'width':contentW+'px','height':acdHeight+'px'});
           
			$(".accordion #accordionMain li .accdTit").hover(function(){//accdTit
				//$(this).stop(true).animate({width:"700px"},500).siblings().stop(true).animate({width:"100px"},500);
                $(this).css({'background':'#cc3535'});
                $(this).parent().siblings().children('.accdTit').css({'background':'#353535'});
				$(this).next('.accdContent').stop(true).animate({width:contentW+'px'},acdSpeed);
				$(this).parent().siblings().children('.accdContent').stop(true).animate({width:'0px'},acdSpeed);
			});
            
        });

    }

    

    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, Accordion.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new Accordion(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.larAccordion = Plugin;

});