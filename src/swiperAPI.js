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

})(function($){
    //excute
    var $dom = $('.swiper-container');

    var functionObj = {};

    var swiper;

    functionObj.defaultFunc = function(){
        //空对象时options也不能为空，否则会报错
        swiper = $dom.larSwiper({});
    };

    functionObj.navigation = function(){
        $dom.append('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = $dom.larSwiper({
            selector : '.swiper-container',
            navigation : {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        });
        $('.swiper-button-next').click(function(e){
            swiper.slideNext(false);
        });
        $('.swiper-button-prev').click(function(e){
            swiper.slidePrev(false);
        });
    };

    functionObj.pagination = function(){};

    functionObj.bullets = function(){};

    functionObj.progress = function(){};

    functionObj.fraction = function(){};

    functionObj.custom = function(){};

    functionObj.scrollbar = function(){};

    functionObj.vertical = function(){};

    functionObj.space = function(){};

    functionObj.multiple = function(){};

    functionObj.carousel = function(){};

    functionObj.centered = function(){};

    functionObj.centerAuto = function(){};

    functionObj.scrollCtn = function(){};

    functionObj.multiRow = function(){};

    functionObj.nested = function(){};

    functionObj.cursor = function(){};

    functionObj.loop = function(){};

    functionObj.loopGroup = function(){};

    functionObj.fade = function(){};

    functionObj.cube = function(){};

    functionObj.coverflow = function(){};

    functionObj.flip = function(){};

    functionObj.keyboard = function(){};

    functionObj.mousewheel = function(){};

    functionObj.autoplay = function(){};

    functionObj.twoway = function(){};

    functionObj.hash = function(){};

    functionObj.parallax = function(){};

    functionObj.lazyLoading = function(){};

    functionObj.responsive = function(){};

    functionObj.authoHeight = function(){};

    functionObj.zoom = function(){};

    functionObj.virtual = function(){};

    functionObj.drawer = function(){};

    var refreshDom = function(){
        $dom.off();
        $dom.empty();
        $dom.append('<div class="swiper-wrapper">' +
                        '<div class="swiper-slide">Slide 1</div>' +
                        '<div class="swiper-slide">Slide 2</div>' +
                        '<div class="swiper-slide">Slide 3</div>' +
                        '<div class="swiper-slide">Slide 4</div>' +
                        '<div class="swiper-slide">Slide 5</div>' +
                        '<div class="swiper-slide">Slide 6</div>' +
                        '<div class="swiper-slide">Slide 7</div>' +
                        '<div class="swiper-slide">Slide 8</div>' +
                        '<div class="swiper-slide">Slide 9</div>' +
                        '<div class="swiper-slide">Slide 10</div>' +
                    '</div>');
    }

    //bind button event
    $('button').click(function(e){
        refreshDom();
        var id = $(this).attr('id');
        functionObj[id]();
    });
});
