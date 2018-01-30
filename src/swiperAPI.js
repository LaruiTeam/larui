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

    var functionObj = {};

    var swiper;

    functionObj.defaultFunc = function(){
        //空对象时options也不能为空，否则会报错
        swiper = ($('.swiper-container').larSwiper({}))[0];
    };

    //有左右箭头
    functionObj.navigation = function(){
        $('.swiper-container').append('<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            selector : '.swiper-container',
            navigation : {
                nextEl: '.swiper-button-next', //下一个按钮 类
                prevEl: '.swiper-button-prev'  //前一个按钮 类
            }
        }))[0];
    };

    functionObj.pagination = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            pagination : {
                el: '.swiper-pagination'
            }
        }))[0];
    };

    //当slide很多时，使用bullets重点突出当前slide
    functionObj.bullets = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            pagination : {
                el: '.swiper-pagination',
                dynamicBullets: true
            }
        }))[0];
    };

    //进度条
    functionObj.progress = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            pagination : {
                el: '.swiper-pagination',
                type: 'progressbar'
            },
            navigation: {
                nextEl : '.swiper-button-next',
                prevEl : '.swiper-button-prev'
            }
        }))[0];
    };

    //数字
    functionObj.fraction = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            pagination : {
                el: '.swiper-pagination',
                type: 'fraction'
            },
            navigation: {
                nextEl : '.swiper-button-next',
                prevEl : '.swiper-button-prev'
            }
        }))[0];
    };

    //自定义
    functionObj.custom = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            pagination : {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet : function(index, className){//自定义
                    return '<span style="padding-top:5px;" class="' + className + '">' + (index +1) + '</span>';
                }
            }
        }))[0];
    };

    //滚动条
    functionObj.scrollbar = function(){
        $('.swiper-container').append('<div class="swiper-scrollbar"></div>');
        swiper = ($('.swiper-container').larSwiper({
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: true  //scroll bar hide after user interaction
            }
        }))[0];
    };

    //垂直方向
    functionObj.vertical = function(){
        //还存在问题，需要修改
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            direction: 'vertical',
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //在slide中间加space
    functionObj.space = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            spaceBetween: 30,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //show multiple slides at the same time
    functionObj.multiple = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 3,
            spaceBetween: 30,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //slide宽度不一时
    functionObj.carousel = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        $('.swiper-slide').css('width','80%');
        $('.swiper-slide:nth-child(2n)').css('width','60%');
        $('.swiper-slide:nth-child(3n)').css('width','40%');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 'auto',
            spaceBetween: 30,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //当前active slide处于中间位置而非默认的left
    functionObj.centered = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //active居中，且slide宽度不一
    functionObj.centerAuto = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        $('.swiper-slide').css('width','80%');
        $('.swiper-slide:nth-child(2n)').css('width','60%');
        $('.swiper-slide:nth-child(3n)').css('width','40%');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 'auto',
            spaceBetween: 30,
            centeredSlides: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //可将slides滑动至任意位置
    functionObj.free = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 3,
            spaceBetween: 30,
            freeMode: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //  有问题
    functionObj.scrollCtn = function(){
        $('.swiper-container').append('<div class="swiper-scrollbar"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 'auto',
            direction: 'vertical',
            freeMode: true,
            pagination : {
                el: '.swiper-scrollbar',
                clickable: true
            },
            mousewheel: true
        }))[0];
    };

    //显示多行多列slide
    functionObj.multiRow = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 30,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //nested网状结果，可以左右滑动与上下滑动组合在一起。目前还存在bullet不能active的问题
    functionObj.nested = function(){
        $('.swiper-container').addClass('swiper-container-h');
        $('.swiper-container').empty();
        $('.swiper-container').append('<div class="swiper-wrapper">' +
                                        '<div class="swiper-slide">Horizontal Slide 1</div>' +
                                        '<div class="swiper-slide">' +
                                            '<div class="swiper-container swiper-container-v">' +
                                                '<div class="swiper-wrapper">' +
                                                    '<div class="swiper-slide">Vertical Slide 1</div>' +
                                                    '<div class="swiper-slide">Vertical Slide 2</div>' +
                                                    '<div class="swiper-slide">Vertical Slide 3</div>' +
                                                    '<div class="swiper-slide">Vertical Slide 4</div>' +
                                                    '<div class="swiper-slide">Vertical Slide 5</div>' +
                                                '</div>' +
                                                '<div class="swiper-pagination swiper-pagination-v"></div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="swiper-slide">Horizontal Slide 3</div>' +
                                        '<div class="swiper-slide">Horizontal Slide 4</div>' +
                                    '</div>' +
                                    '<div class="swiper-pagination swiper-pagination-h"></div>');
        var swiperH = $('.swiper-container').larSwiper({
            selector: '.swiper-container-h',
            spaceBetween: 50,
            pagination: {
                el: '.swiper-pagination-h',
                clickable: true
            }
        });
        var swiperV = $('.swiper-container').larSwiper({
            direction: 'vertical',
            selector: '.swiper-container-v',
            spaceBetween: 50,
            pagination: {
                el: '.swiper-pagination-v',
                clickable: true
            }
        });
    };

    functionObj.cursor = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 4,
            centeredSlides: true,
            spaceBetween: 30,
            grabCursor: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //slide循环显示
    functionObj.loop = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl:'.swiper-button-prev'
            }
        }))[0];
    };

    //一组一组的轮播，不足一组的用空白slide填充
    functionObj.loopGroup = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
            loop: true,
            loopFillGroupWithBlank: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl:'.swiper-button-prev'
            }
        }))[0];
    };

    //渐变
    functionObj.fade = function(){
        $('.swiper-container').append('<div class="swiper-pagination swiper-pagination-white"></div><div class="swiper-button-next swiper-button-white"></div><div class="swiper-button-prev swiper-button-white"></div>');
        swiper = ($('.swiper-container').larSwiper({
            spaceBetween: 30,
            effect: 'fade',
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl:'.swiper-button-prev'
            }
        }))[0];
    };

    //3d立体
    functionObj.cube = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            effect: 'cube',
            grabCursor: true,
            cubeEffect: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            pagination : {
                el: '.swiper-pagination'
            }
        }))[0];
    };

    //coverflow
    functionObj.coverflow = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        $('.swiper-wrapper').empty();
        $('.swiper-wrapper').append('<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/1)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/2)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/3)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/4)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/5)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/6)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/7)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/8)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/9)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/10)"></div>');
        $('.swiper-slide').css('width','80%');
        $('.swiper-slide:nth-child(2n)').css('width','60%');
        $('.swiper-slide:nth-child(3n)').css('width','40%');
        swiper = ($('.swiper-container').larSwiper({
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            },
            pagination : {
                el: '.swiper-pagination'
            }
        }))[0];
    };

    functionObj.flip = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-prev"></div><div class="swiper-button-next"></div>');
        $('.swiper-wrapper').empty();
        $('.swiper-wrapper').append('<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/1)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/2)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/3)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/4)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/5)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/6)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/7)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/8)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/9)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/10)"></div>');
        swiper = ($('.swiper-container').larSwiper({
            effect: 'flip',
            grabCursor: true,
            pagination : {
                el: '.swiper-pagination'
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }))[0];
    };

    functionObj.keyboard = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            pagination : {
                el: '.swiper-pagination'
            },
            navigation: {
                nextEl : '.swiper-button-next',
                prevEl : '.swiper-button-prev'
            }
        }))[0];
    };

    //vertical都有问题，待修改
    functionObj.mousewheel = function(){
        $('.swiper-container').addClass('swiper-container-vertical swiper-container-wp8-vertical');
        $('.swiper-container').append('<div class="swiper-pagination"></div>');
        swiper = ($('.swiper-container').larSwiper({
            direction: 'vertical',
            slidesPerView: 1,
            spaceBetween: 30,
            mousewheel: true,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            }
        }))[0];
    };

    //自动播放
    functionObj.autoplay = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        swiper = ($('.swiper-container').larSwiper({
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }))[0];
    };

    functionObj.dynamic = function(){
        $('.swiper-container').append('<div class="swiper-pagination"></div><div class="swiper-button-next"></div><div class="swiper-button-prev"></div>');
        $('#swiper-ss').append('<p class="append-buttons">' +
                                    '<a href="#" class="prepend-2-slides">Prepend 2 Slides</a>' +
                                    '<a href="#" class="prepend-slide">Prepend Slide</a>' +
                                    '<a href="#" class="append-slide">Append Slide</a>' +
                                    '<a href="#" class="append-2-slides">Append 2 Slides</a>' +
                                '</p>');
        var appendNumber = 10;
        var prependNumber = 1;
        swiper = ($('.swiper-container').larSwiper({
            slidesPerView: 3,
            centeredSlides: true,
            spaceBetween: 30,
            pagination : {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }))[0];
        document.querySelector('.prepend-2-slides').addEventListener('click', function (e) {
            e.preventDefault();
            swiper.prependSlide([
                '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>',
                '<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>'
       ]);
   });
      document.querySelector('.prepend-slide').addEventListener('click', function (e) {
          e.preventDefault();
          swiper.prependSlide('<div class="swiper-slide">Slide ' + (--prependNumber) + '</div>');
      });
      document.querySelector('.append-slide').addEventListener('click', function (e) {
          e.preventDefault();
          swiper.appendSlide('<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>');
      });
      document.querySelector('.append-2-slides').addEventListener('click', function (e) {
          e.preventDefault();
          swiper.appendSlide([
              '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>',
              '<div class="swiper-slide">Slide ' + (++appendNumber) + '</div>'
          ]);
      });
    };

    functionObj.twoway = function(){
        $('.swiper-container').addClass('gallery-top');
        $('.swiper-wrapper').empty();
        $('.swiper-wrapper').append('<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/1)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/2)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/3)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/4)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/5)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/6)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/7)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/8)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/9)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/10)"></div>');
        $('.swiper-container').append('<div class="swiper-button-next swiper-button-white"></div><div class="swiper-button-prev swiper-button-white"></div>');
        $('#swiper-ss').append('<div class="swiper-container gallery-thumbs"><div class="swiper-wrapper">' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/1)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/2)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/3)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/4)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/5)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/6)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/7)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/8)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/9)"></div>' +
                                    '<div class="swiper-slide" style="background-image:url(http://lorempixel.com/600/600/nature/10)"></div>' +
                               '</div></div>')
        var galleryTop = ($('.gallery-top').larSwiper({
            selector: '.gallery-top',
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }))[0];
        var galleryThumbs = ($('.gallery-thumbs').larSwiper({
            selector: '.gallery-thumbs',
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true
        }))[0];
        $('.gallery-thumbs').css('padding-top','5px');
        galleryTop.controller.control = galleryThumbs;
        galleryThumbs.controller.control = galleryTop;
    };

    functionObj.hash = function(){};

    functionObj.parallax = function(){};

    functionObj.lazyLoading = function(){};

    functionObj.responsive = function(){};

    functionObj.authoHeight = function(){};

    functionObj.zoom = function(){};

    functionObj.virtual = function(){};

    functionObj.drawer = function(){};

    var refreshDom = function(){
        $('#swiper-ss').off();
        $('#swiper-ss').empty();
        $('#swiper-ss').append('<div class="swiper-container"><div class="swiper-wrapper">' +
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
                    '</div></div>');
    }

    //bind button event
    $('button').click(function(e){
        refreshDom();
        var id = $(this).attr('id');
        functionObj[id]();
    });
});
