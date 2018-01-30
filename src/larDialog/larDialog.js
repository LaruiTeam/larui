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

    var NAMESPACE = 'css.dialog';

    function Dialog(element, options) {
        var _this = this;

        _this.config = options;
        var vars = _this._vars      = {};                // vars
        vars.$element               = $(element);
        Dialog.init.call(_this);

    }
    Dialog.DEFAULTS = {
        id:'dialog_'+getUniqueId(),		//id,缓存key
        //url:'',								//远程模板地址
        //cache:false,                        //是否缓存，默认为false
        title:'Dialog',						//title
        drag:false,							//是否可以拖动
        width:'300',						//宽度
        height:'100',						//高度
        dialogSize:'',                      //modal-lg或modal-sm
        body:'',							//直接设置内容
        defaultClose:true,					//是否显示“关闭”按钮，默认显示
        buttons:[],							//按钮
        afterLoad : null,					//模板加载完成回调
        afterOpen : null,					//窗口弹出完成回调
        beforeOpen: null,                   //窗口弹出前完成回调
        afterClose : null,					//窗口关闭完成回调
        beforeClose: null,                  //窗口关闭前完成回调
        onDestroy: null,                    //窗口销毁时回调
        callback : null
    };
    Dialog.init = function() {
        var _this = this;
        Dialog.render.call(_this);
    };
    Dialog.renderHtml = function(config){
        var dialogHTML = [];
        dialogHTML.push('<div class="modal fade lar-modal "'+(config.zIndex?' style="z-index:'+config.zIndex+'"':'')+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" id="'+ config.id +'">');
        var width = config.width?("width:"+parseFloat(config.width) + "px"):"";
        dialogHTML.push('<div class="modal-dialog '+(config.dialogSize||"")+'" style="'+width+'">');
        dialogHTML.push('<div class="modal-content">');
        var dragCss = config.drag ? 'style="cursor:move;"' : '';
        dialogHTML.push('<div class="modal-header" '+dragCss+'>');
        dialogHTML.push('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>');
        dialogHTML.push('<h4 class="modal-title">'+ (config.title||"") +'</h4>');
        dialogHTML.push('</div>');
        var height = config.height?("height:"+parseFloat(config.height)+"px"):"";
        dialogHTML.push('<div class="modal-body" style="overflow-y:auto;overflow-x:hidden;'+height+'"></div>');
        dialogHTML.push('<div class="modal-footer"></div>');
        dialogHTML.push('</div></div></div>');
        //生成dialog元素
        var $dialog = $(dialogHTML.join(""));
        //将dialog添加到DOM页面
        $("body").append($dialog);
        return $dialog ;
    }
    function getUniqueId() {
        var date = new Date();
        return date.getFullYear() + date.getMonth() + date.getDate() + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
    }

    function loadDom(config, callback) {
        var dom;
        var getDom = function() {
            var deferred = $.Deferred();

            //如果设置body，直接返回
            if (config.body) {
                dom = config.body;
                deferred.resolve();
            }
            return deferred.promise();
        }

        //监听
        $.when(getDom()).done(function(){
            typeof callback == "function" && callback.call(null, dom);
        }).fail(function(){
            console.log("加载dom失败，请确认body或id或url属性是否设置正确");
        })
    }
    Dialog.render = function(){
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;
        var config = _this.config;
        var $dialog = Dialog.renderHtml(config);
        this.$dialog = $dialog;
        _this.$dialog = $dialog;
        /*拖拽实现*/
        if(config.drag){
            var DRAG = {};
            this.$dialog.mousemove(function(e){
                if(DRAG.widget!=null){
                    DRAG.widget.style.left = (e.pageX - DRAG.widget.eLeft) +"px";
                    DRAG.widget.style.top = (e.pageY - DRAG.widget.eTop) +"px";
                }
            }).mouseup(function(e){
                DRAG = {}
            });

            this.$dialog.find("div[class='modal-header']").mousedown(function(e){
                DRAG.widget = this.parentNode;
                DRAG.widget.eLeft   = e.pageX - DRAG.widget.offsetLeft;
                DRAG.widget.eTop    = e.pageY - DRAG.widget.offsetTop;
            });
        }
        //保存this
        _this = this;
        //获取dom内容
        loadDom(config, function(html){
            //设置dom
            _this.setBody(html);
            //dom加载完成事件
            typeof config.afterLoad == "function" && config.afterLoad.call(null);
            //兼容callbac设置
            typeof config.callback == "function" && config.callback.call(null);
        });
        //生成底部buttons
        this.setFoot(config.buttons||[], config.defaultClose);
        // 监听显示事件
        this.$dialog.on('shown.bs.modal', function (e) {
            typeof config.afterOpen == "function" && config.afterOpen(_this.$dialog);
        });
        // 监听显示前事件
        this.$dialog.on('show.bs.modal', function (e) {
            typeof config.beforeOpen == "function" && config.beforeOpen(_this.$dialog);
        });
        //监听关闭事件
        this.$dialog.on('hidden.bs.modal', function (e) {
            // 不缓存
            if (!config.cache) {
                // onDestroy
                typeof config.onDestroy == "function" && config.onDestroy(_this.$dialog);
                // remove dom
                $(_this.$dialog).remove();
            }
            typeof config.afterClose == "function" && config.afterClose(_this.$dialog);
        });
        //监听关闭前事件
        this.$dialog.on('hide.bs.modal', function(e){
            typeof config.beforeClose == "function" && config.beforeClose(_this.$dialog);
        });
        //this.$dialog.modal(config.modal);
    };


    //模块通用方法(扩展)
    Dialog.fn = Dialog.prototype = {
        //对象方法扩展API
        extend : function(object){
            if (typeof object === 'object' && object.constructor === Object){
                $.extend(Dialog.fn,object);
            }
        },
        $getDialog : function(){
            return this.$dialog;
        },
        show : function(){
            this.$dialog.modal('show');
        },
        hide : function(){
            this.$dialog.modal('hide');
        }
    };

    //对象原型方法
    Dialog.fn.extend({
        setTitle : function(title){
            if (!this.$title) {
                this.$title =  this.$dialog.find("h4[class='modal-title']");
            }
            this.$title.empty().append(title);
        },
        setBody : function(html){
            if (!this.$body) {
                this.$body = this.$dialog.find("div[class='modal-body']");
            }
            this.$body.html(html);
            // 绑定（兼容代码）
            Dialog.binding.call(this);
        },
        setFoot : function(buttons, defaultClose){
            var dialog = this;
            if (!this.$foot) {
                this.$foot = this.$dialog.find("div[class='modal-footer']");
            }
            var close = typeof(defaultClose)=="undefined" ? true: defaultClose;
            this.$foot.empty();
            if(buttons && buttons.length){
                for(var i= 0,b;b=buttons[i++];){
                    this.$foot.append(
                        $('<a role="button" '+ (b.id?' id="'+ b.id +'"':'')+' class="btn btnRedBox" '+ (b.close?'data-dismiss="modal"':'')+'>'+ b.name +'</a>')
                            .bind("click",(function(){
                                var callback = b.callback;
                                return function () {
                                    callback && callback(dialog);
                                }
                            })())
                    );
                }
            }
            this.$foot.append(close?'<a role="button" class="btn btnRedBox" data-dismiss="modal">关闭</button>':"");
        }
    });
    /**
     * 兼容angular的数据绑定
     */
    Dialog.binding = function() {
        var _this = this,
            config = _this.config;

        if(config.$compile && config.$scope){
            var $content = _this.$dialog.find("div[class='modal-body']");
            var link = config.$compile($content);
            link(config.$scope);
            config.$scope.$digest();
        }
    }
    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);
            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, Dialog.DEFAULTS, typeof option == 'object' && option);
                result = new Dialog(this, options);
                $this.data(NAMESPACE, result);

            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    }
    $.fn.larDialog = Plugin;
});
