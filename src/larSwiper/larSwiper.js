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
        swiper = new Swiper(this.options.selector, this.options);
    };


    function CssSwiper_Plugin(options) {

        if(!options || typeof(options) !== 'object') return false;
        var resultArr = [];
        $(this).each(function() {
            var $this = $(this);
            var _options = $.extend(true, {}, CssSwiper.DEFAULTS, options);
            // var swiperObj = new CssSwiper(this, _options);
            var swiperObj = new Swiper(_options.selector, _options);
            resultArr.push(swiperObj);
        });
        return resultArr;

    };

    $.fn.larSwiper = CssSwiper_Plugin;
});
