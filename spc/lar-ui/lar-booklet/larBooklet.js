/*
 $.fn.larBooklet  - by yuqiuyu
 * 
 * 传参说明：（参数都有默认值，可以不传）
   items : 必填项；书页的dom结构
   bookletWidth：	书宽度; 默认:500(不要加px)或'50%'(加引号)
   bookletHeight： 	书高度
   speed：	翻页的速度；默认：400
   showPageContent: 点击遮罩-显示详细信息(每个页面都是一张图片时使用该属性),默认 false
   pageNumShow：	是否显示页数;默认 false
   pageBtnPosition：书页面内按钮 值：'in'或'out'
   arrows: 默认箭头（首尾页 单侧箭头）默认'true'  
   doubleArrows : 双箭头 左右两侧一直存在  默认 'false';暂未开发双箭头其他功能
   manual： 卷页效果：卷页效果依赖jquery-ui 页面要引入才能使用 false
   hoverWidth： 卷页宽度；默认： 50
   bookletBtnIn:  内部按钮距书边的距离 默认 12
   bookletBtnOut: 外部按钮距书边的距离 默认 40
   pageContentPadding: 页面内容padding 例：'15px 30px 15px'
   
   暂不支持参数：
   bookletModalW:    遮罩内容的宽度; 例:'600px'(加px)或'50%'
   bookletModalH    遮罩内容的高度;
   
   使用方法:
   HTML - 找到需要放置内容的div或其他标签，并拿到该容器的标识名
   $('.showBooklet').larBooklet({			
		bookletWidth: 950,
		bookletHeight: 580,
		items : items
	});
 * 
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

    var NAMESPACE = 'css.booklet';

    function Booklet(element, options) {
        var _this = this;

        _this.options = options;// options

        var vars = _this._vars  = {};// vars
        vars.$element           = $(element);
        vars.items              = _this.options.items;  //数据项
        
        vars.bookletWidth		= _this.options.bookletWidth?_this.options.bookletWidth:500;
        vars.bookletHeight		= _this.options.bookletHeight?_this.options.bookletHeight:400;
        vars.speed				= _this.options.speed?_this.options.speed:400;//翻页速度
        vars.pageNumShow		= _this.options.pageNumShow?_this.options.pageNumShow:false,//显示页码数字
        vars.showPageContent    = _this.options.showPageContent?_this.options.showPageContent:false,//显示详细信息
        vars.bookletModalW      = _this.options.bookletModalW?_this.options.bookletModalW:'48%';
        vars.pageBtnPosition    = _this.options.pageBtnPosition?_this.options.pageBtnPosition:'out';//书页按钮 在内部或外部
        vars.arrows       		= _this.options.arrows;//默认 单侧箭头
        vars.doubleArrows       = _this.options.doubleArrows?_this.options.doubleArrows:'false';//双箭头
        vars.manual       		= _this.options.manual?_this.options.manual:false;//卷页效果
        vars.hoverWidth       	= _this.options.hoverWidth?_this.options.hoverWidth:50;//卷页宽度
        vars.bookletBtnIn       = _this.options.bookletBtnIn?_this.options.bookletBtnIn:12; //内部按钮距离
        vars.bookletBtnOut      = _this.options.bookletBtnOut?_this.options.bookletBtnOut:40; //外部按钮距离
        vars.pageContentPadding = _this.options.pageContentPadding?_this.options.pageContentPadding:'15px 30px 15px';//页面内容padding

        Booklet.init.call(_this);
    }
    
    Booklet.DEFAULTS = { };
    
    Booklet.TEMPLATE =
        '<div class="bookletOut clearfix">' +
            '<div class="bookletBackground">' +
                '<div class="booklet_btns">'+
                    '<a class="booklet_page_btn" id="bookletPrevBtn"></a>'+
                    '<a class="booklet_page_btn" id="bookletNextBtn"></a>'+
                '</div>'+
                '<div id="bookletContent">' +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="modal fade" id="bookletModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog showBooklet clearfix">' +
            '</div>' +
        '</div>' ;    	

    Booklet.init = function() {
        var _this = this;

        Booklet.render.call(_this);
    };

    Booklet.render = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;
        
        $element.html(Booklet.TEMPLATE);
        vars.$list = $element.find('#bookletContent');
        vars.$booklet_page_btn = $element.find('.booklet_page_btn');

        Booklet.renderData.call(_this);   
    };

    Booklet.renderData = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            items = vars.items,
            $list = vars.$list,
            showPageContent = vars.showPageContent;

        if (items){
            $list.empty();
            $.each(items, function( i, item ) {
                if (showPageContent===true) {
                    var $pageContent = $('<div class="pageContent" data-toggle="modal" data-target="#bookletModal" style="cursor:pointer"></div>');
                }else{
                    var $pageContent = $('<div class="pageContent"></div>');
                }
                if (item.extras){
                    $pageContent.append(item.extras.$dom);
                }
                $list.append($pageContent);
            });
        } 
        vars.$bookletPrevBtn = $element.find('#bookletPrevBtn');
        vars.$bookletNextBtn = $element.find('#bookletNextBtn');

        Booklet.bookletSettings.call(_this);
    }

    Booklet.bookletSettings = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            $list = vars.$list,
            bookletWidth = vars.bookletWidth,
            bookletHeight = vars.bookletHeight,
            speed = vars.speed,
            pageNumShow = vars.pageNumShow,
            pageBtnPosition = vars.pageBtnPosition,
            arrows = vars.arrows,
            doubleArrows = vars.doubleArrows,
            manual = vars.manual,
            hoverWidth = vars.hoverWidth,
            $booklet_page_btn = vars.$booklet_page_btn,
            $PrevBtn = vars.$bookletPrevBtn,
            $NextBtn = vars.$bookletNextBtn,
            bookletBtnIn = vars.bookletBtnIn,
            bookletBtnOut = vars.bookletBtnOut,
            pageContentPadding = vars.pageContentPadding;

        $('.booklet_btns').css({'width':bookletWidth,'height':bookletHeight});

        //箭头类型
        if (arrows === 'false') {
            arrows = false;
            if (doubleArrows === 'false') {
                $booklet_page_btn.css('display', 'none');
            }else{
                $booklet_page_btn.css('display', 'block');
            }
        }else{
            arrows = true; 
            $booklet_page_btn.css('display', 'none');
        }

        //组件booklet
        $list.booklet({
            width:  bookletWidth,//'80%'
            height: bookletHeight,
            speed: 600,
            pagePadding: 0,//'0 15px 15px'
            pageNumbers: pageNumShow,//显示页码数字
            next: $NextBtn,
            prev: $PrevBtn,
            // startingPage: 1,
             manual: manual,//页面翻卷效果
            // hovers: false,
            hoverWidth: hoverWidth,//卷页宽度
            arrows: arrows //添加箭头叠加在书边
        });

        $('.pageContent').css('padding', pageContentPadding);//'17px 50px 17px 74px'
        //书内部按钮
        var iBtnTop = (bookletHeight-30)/2;
        $('.bookletOut .booklet .b-arrow').css('top', iBtnTop);
        $booklet_page_btn.css('top', iBtnTop);

        if (pageBtnPosition === 'in') {
            $('.bookletOut .booklet .b-prev').css({'left':bookletBtnIn});
            $('.bookletOut .booklet .b-next').css({'right':bookletBtnIn});
            $('#bookletPrevBtn').css({'left':bookletBtnIn});
            $('#bookletNextBtn').css({'right':bookletBtnIn});
            
        }else if (pageBtnPosition === 'out') {
            $('.bookletOut .booklet .b-prev').css({'left':-bookletBtnOut});
            $('.bookletOut .booklet .b-next').css({'right':-bookletBtnOut});
            $('#bookletPrevBtn').css({'left':-bookletBtnOut});
            $('#bookletNextBtn').css({'right':-bookletBtnOut});
        }


        vars.$pageContent = $element.find('.pageContent');
        vars.$showBooklet = $element.find('.showBooklet');
        Booklet.showBookletBind.call(_this);
    }


    //showBooklet遮罩展示
    Booklet.showBookletBind = function(){
        var _this = this,
            vars = _this._vars,
            bookletModalW = vars.bookletModalW,
            bookletModalH = vars.bookletModalH,
            $pageContent = vars.$pageContent,
            $showBooklet = vars.$showBooklet;

        $showBooklet.css({'width': bookletModalW,});

        $pageContent.on('click', function() {
            $showBooklet.children().remove();
            var bookletMain = $(this).children('div').html();
            $showBooklet.append(bookletMain);
            var showH = $(window).height()-60;
            // var bookletImgW = $(this).find('img').width();
            $('.showBooklet').css({'width':'auto','padding':'20px 30px'});//'min-height':showH,'_height':showH,
        });
    }


    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, Booklet.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new Booklet(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.larBooklet = Plugin;

});