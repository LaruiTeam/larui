/*
 $.fn.larBooklet  - by yuqiuyu
 * 
 * 传参说明：（参数都有默认值，可以不传）
   bookletWidth：	书宽度; 默认:500(不要加px)或'50%'(加引号)
   bookletHeight
   speed：	翻页的速度；默认：400
   showPageContent: 点击遮罩-显示详细信息,默认 false
   pageNumShow：	是否显示页数;默认 false
   bookletModalW: 	遮罩内容的宽度; 例:'600px'(加px)或'50%'
   bookletModalH
   pageInnerBtn：书页面内按钮;默认 true
   arrows:外侧按钮
   manual： 卷页效果： false
   hoverWidth： 卷页宽度；默认： 50
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
        vars.bookletModalW      = _this.options.bookletModalW?_this.options.bookletModalW:'40%';
        vars.bookletModalH      = _this.options.bookletModalH?_this.options.bookletModalH:'90%';
        vars.pageInnerBtn       = _this.options.pageInnerBtn?_this.options.pageInnerBtn:false;//书页面内按钮
        vars.arrows       		= _this.options.arrows?_this.options.arrows:true;//外侧按钮manual
        vars.manual       		= _this.options.arrows?_this.options.manual:false;//卷页效果
        vars.hoverWidth       	= _this.options.hoverWidth?_this.options.hoverWidth:50;//卷页宽度

        Booklet.init.call(_this);
    }
    
    Booklet.DEFAULTS = { };
    
    Booklet.TEMPLATE =
        '<div class="bookletOut clearfix">' +
            '<div class="bookletBackground">' +
                '<a class="booklet_page_btn" id="bookletPrevBtn"></a>'+
                '<a class="booklet_page_btn" id="bookletNextBtn"></a>'+
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
            pageInnerBtn = vars.pageInnerBtn,
            arrows = vars.arrows,
            manual = vars.manual,
            hoverWidth = vars.hoverWidth,
            $booklet_page_btn = vars.$booklet_page_btn,
            $PrevBtn = vars.$bookletPrevBtn,
            $NextBtn = vars.$bookletNextBtn;


        //书内部按钮
        var iBtnTop = bookletHeight/2;        
        $booklet_page_btn.css('top', iBtnTop);
        if (pageInnerBtn === true) {
            $booklet_page_btn.css('display', 'block');
            $('.pageContent').css('padding', '17px 50px 17px 74px');
            
        }else{
            $booklet_page_btn.css('display', 'none');
            $PrevBtn = 'none'
        }

        //组件booklet
        $list.booklet({
            width:  bookletWidth,//'80%'
            height: bookletHeight,
            speed: 600,
            pagePadding: 15,
            pageNumbers: pageNumShow,//显示页码数字
            next: $NextBtn,
            prev: $PrevBtn,
            // startingPage: 1,
             manual: manual,//页面翻卷效果
            // hovers: false,
            hoverWidth: hoverWidth,//卷页宽度
            arrows: arrows //添加箭头叠加在书边
        });

        var iBtnTop = (bookletHeight-30)/2;
        $('.bookletOut .booklet .b-arrow div').css('top', iBtnTop);
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

        $showBooklet.css({
            'width': bookletModalW,
            'height': bookletModalH
        });

        $pageContent.on('click', function() {
            $showBooklet.children().remove();
            var bookletMain = $(this).html();
            $showBooklet.append(bookletMain);
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