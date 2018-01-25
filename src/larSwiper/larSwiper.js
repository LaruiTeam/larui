/*
 $.fn.larCssSwiper - by huqs
 封装了http://idangero.us/CssSwiper/demos/的CssSwiper组件
 */
(function(factory){
    if (typeof define == 'function' && define.amd) {
        // amd
        define(['jquery'], factory);
    } else if (typeof exports == 'object') {
        factory(require('jquery'));
    } else {
        // global
        factory(jQuery);
    }

})(function($) {
    'user strict';

    var NAMESPACE = 'css-CssSwiper';

    function CssSwiper(element, options) {
        var _this = this;

        _this.options = options;

        this.init();
    }

    CssSwiper.DEFAULTS = {
        selector : '.swiper-container'
    };

    CssSwiper.TEMPLATE = '';
    CssSwiper.prototype.init = function() {
        var swiper = new Swiper(this.options.selector, this.options);
    };


    function CssSwiper_Plugin(options) {

        if(!options || typeof(options) !== 'object') return false;
        this.each(function() {
            var $this = $(this);
            var _options = $.extend(true, {}, CssSwiper.DEFAULTS, options);
            new CssSwiper(this, _options);
        });

    };

    $.fn.larSwiper = function(options){
        CssSwiper_Plugin(options);
    }
});
