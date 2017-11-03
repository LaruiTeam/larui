/*
 $.fn.larTimeAxis  - by yuqiuyu
 * 
 * 传参说明：
    postUrl : 必传项;请求 url路径全路径。 例： baseUrl + '/sword/search/ChannelService/getResultDataByIds'
    postParm : 必传项;请求service服务所传参数。 例：{'ids':'Macao_ZTlfh'}
    parmName : 返回数据名称。 例： 新推荐配置 按code名返回 需要此字段

    dataWord : 文字字段 字段名
    dataimgPath : 图片路径 字段名
    dataimgUrl : 图片跳转路径 字段名
    dataimgWord : 图片遮罩层文字 字段名
    

    selfimgPath: 单个图片路径。 例: 'Macao/images/structure.png'

    leftType : 左侧(或右侧)区域 放置的内容;默认: word。 文字/图片(4张)/图片(1张),注意selfimgPath值/轮播图 -> word/images/image/carousel
    rightType : 同leftType
    wordsImgMask : 控制2部分内容遮罩;图片红色遮罩显示文字;轮播图 黑色遮罩。 默认: 'false'
    


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

    var NAMESPACE = 'css.ImageText';
    var imagesPath = '../../page/';

    function ImageText(element, options) {
        var _this = this;

        _this.options = options;// options

        var vars                = _this._vars  = {};// vars
        vars.$element           = $(element);
        // vars.items          = _this.options.items;  //数据项
        vars.postUrl            = _this.options.postUrl;//请求 url路径
        vars.postParm           = _this.options.postParm;//请求服务参数
        vars.parmName           = _this.options.parmName?_this.options.parmName:'';

        vars.dataWord           = _this.options.dataWord;//获取文字 字段名
        vars.dataimgPath        = _this.options.dataimgPath;//图片路径 字段名
        vars.dataimgUrl         = _this.options.dataimgUrl;//图片跳转路径 字段名
        vars.dataimgWord        = _this.options.dataimgWord;//图片遮罩层文字 字段名
        vars.selfimgPath        = _this.options.selfimgPath?_this.options.selfimgPath:'';//单个图片路径

        vars.wordDom            = _this.options.wordDom?_this.options.wordDom:'';//带标签的文字内容 class="wordsCount"

        vars.leftType           = _this.options.leftType?_this.options.leftType:'word';//左侧内容 word/image/carousel
        vars.rightType          = _this.options.rightType?_this.options.rightType:'images';//左侧内容 image
        vars.imageNum           = _this.options.imageNum?_this.options.imageNum:'4';//图片个数 1或4
        vars.wordsImgMask       = _this.options.wordsImgMask?_this.options.wordsImgMask:'false';//图片遮罩显示文字

        vars.leftWidth          = _this.options.leftWidth?_this.options.leftWidth:'50%';
        vars.rightWidth         = _this.options.rightWidth?_this.options.rightWidth:'50%';
        vars.wordLineH          = _this.options.wordLineH?_this.options.wordLineH:'30px';//文字段落行高
        vars.carouselImgW       = _this.options.carouselImgW?_this.options.carouselImgW:'430px';//轮播图宽度
        vars.carouselImgH       = _this.options.carouselImgH?_this.options.carouselImgH:'360px';
        vars.carouselSpeed      = _this.options.carouselSpeed?_this.options.carouselSpeed:'2000';
        vars.carouselMask       = _this.options.carouselMask?_this.options.carouselMask:'true';//轮播底部遮罩标题
        vars.casBtnPreUrl       = _this.options.casBtnPreUrl?_this.options.casBtnPreUrl:'';
        vars.casBtnNextUrl      = _this.options.casBtnNextUrl?_this.options.casBtnNextUrl:'';
        vars.casBtnPreHover     = _this.options.casBtnPreHover?_this.options.casBtnPreHover:'';
        vars.casBtnNextHover    = _this.options.casBtnNextHover?_this.options.casBtnNextHover:'';
        vars.casBtnW            = _this.options.casBtnW?_this.options.casBtnW:'';
        vars.casBtnH            = _this.options.casBtnH?_this.options.casBtnH:'';


        ImageText.init.call(_this);
    }
    
    ImageText.DEFAULTS = { };
    
    // ImageText.TEMPLATE = ;      

    ImageText.init = function() {
        var _this = this,
            vars = _this._vars;
        ImageText.wordsImg.call(_this);
        // ImageText.render.call(_this);
    };

    //main function
    ImageText.wordsImg = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            leftWidth = vars.leftWidth,
            rightWidth = vars.rightWidth,
            templet = '';
        templet += '<div class="wordsImgs clearfix">'
        templet +=     '<div class="WI_leftMain wiSame">';
        templet +=     '</div>';
        templet +=     '<div class="WI_rightMain wiSame">';
        templet +=     '</div>';
        templet += '</div>';

        $element.html(templet);

        vars.$WILeftMain = $element.find('.WI_leftMain');
        vars.$WIRightMain = $element.find('.WI_rightMain');

        vars.$WILeftMain.css({'width':leftWidth});
        vars.$WIRightMain.css({'width':rightWidth});

        ImageText.commonDate.call(_this);
    }

    ImageText.commonDate = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            postUrl = vars.postUrl,
            postParm = vars.postParm,
            parmName = vars.parmName,
            leftType = vars.leftType,
            rightType = vars.rightType,
            $WILeftMain = vars.$WILeftMain,
            $WIRightMain = vars.$WIRightMain;

        // $.post(postUrl,{postParm}).done(function(data) {
        $.post(postUrl,postParm).done(function(data) {
            var data = data.model;
            if (data) {
                if (parmName !== '') {
                    data = data[parmName];
                }

                // ImageText.wordbuild.call(_this,data);
                if (leftType == 'word') {
                    ImageText.wordbuild.call(_this,data,$WILeftMain);
                }else if(leftType == 'images') {
                    var imgNum = '4';
                    ImageText.imagebuild.call(_this,data,$WILeftMain,imgNum);
                }else if(leftType == 'image') {
                    var imgNum = '1';
                    ImageText.imagebuild.call(_this,data,$WILeftMain,imgNum);
                }else if(leftType == 'carousel'){
                    ImageText.carouselbuild.call(_this,data,$WILeftMain);
                }

                if (rightType == 'word') {
                    ImageText.wordbuild.call(_this,data,$WIRightMain);
                }else if(rightType == 'images') {
                    var imgNum = '4';
                    ImageText.imagebuild.call(_this,data,$WIRightMain,imgNum);
                }else if(rightType == 'image') {
                    var imgNum = '1';
                    ImageText.imagebuild.call(_this,data,$WIRightMain,imgNum);
                }else if(rightType == 'carousel'){
                    ImageText.carouselbuild.call(_this,data,$WIRightMain);
                }
            }
        })
    }

    ImageText.wordbuild = function(widata,$buildDom) {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            dataWord = vars.dataWord,
            wordDom = vars.wordDom,
            wordLineH = vars.wordLineH,
            wordlist = '';
        if (wordDom == '') {
            for(var i=0;i<widata.length;i++){
                if ( widata[i][dataWord] !== '' ) {
                    wordlist += '<p style="line-height:'+wordLineH+'" class="wordsCount">';
                    wordlist +=     widata[i][dataWord];
                    wordlist += '</p>';
                }
            }
        }else{
            wordlist = wordDom;
        }

        $buildDom.append(wordlist);
        // $('.wordsCount').css({'line-height':wordLineH+'px'});
    }

    ImageText.imagebuild = function(widata,$buildDom,imgNum) {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            dataimgPath = vars.dataimgPath,
            dataimgUrl = vars.dataimgUrl,
            dataimgWord = vars.dataimgWord,
            wordsImgMask = vars.wordsImgMask,
            selfimgPath = vars.selfimgPath,
            imglist = '';
        if (imgNum == '4') {
            for(var i=0;i<widata.length;i++){
                if(i>3){break;}
                var url = widata[i][dataimgUrl] === null?'': widata[i][dataimgUrl];
                if(widata[i][dataimgPath] !== null){
                    var path = URL_FILE_SERVER + widata[i][dataimgPath];
                    imglist += '<div class="WI_imglist" data-url="'+ url +'" data-mask="'+ wordsImgMask +'">';
                    if (wordsImgMask == 'true') {
	                    imglist +=     '<div class="WI_imgAnimate">';
	                    imglist +=         '<p>'+ widata[i][dataimgWord] +'</p>';
	                    imglist +=     '</div>';
                    }
                    imglist +=     '<img class="imageFour" src='+ path +' />';
                    imglist += '</div>';
                }
            } 
        }else if(imgNum == '1'){
            if (selfimgPath != '') {
                var path = imagesPath + selfimgPath;
                imglist += '<img class="oneImage" src='+ path +' />';
            }else{
                if (widata[0][dataimgPath] !== null) {
                    var path = URL_FILE_SERVER + widata[0][dataimgPath];
                    imglist += '<img class="oneImage" src='+ path +' />';
                }
            }
        }
        $buildDom.append(imglist);
        //4张图片遮罩
        // var wordsImgDataMask = $(".WI_imglist").attr('data-mask');
        $(".WI_imglist").hover(function() {
            var wordsImgDataMask = $(this).attr('data-mask');
            if (wordsImgDataMask == 'true') {
                $(this).find('.WI_imgAnimate').show();
                $(this).find('img').css({'transform': 'scale(1.2)','transition': 'transform 0.5s'});
            }
        }, function() {
            $(this).find('.WI_imgAnimate').hide();
            $(this).find('img').css({'transform': 'scale(1)','transition': 'transform 0.5s'});
        });

    }

    ImageText.carouselbuild = function(widata,$buildDom) {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            dataimgPath = vars.dataimgPath,
            dataimgUrl = vars.dataimgUrl,
            dataimgWord = vars.dataimgWord,
            carouselMask = vars.carouselMask,
            carouselImgW = vars.carouselImgW,
            carouselImgH = vars.carouselImgH,
            carouselSpeed = vars.carouselSpeed,
            casBtnPreUrl = vars.casBtnPreUrl,
            casBtnNextUrl = vars.casBtnNextUrl,
            casBtnPreHover = vars.casBtnPreHover,
            casBtnNextHover = vars.casBtnNextHover,
            casBtnW =vars.casBtnW,
            casBtnH = vars.casBtnH,
            htmls = '<div class="carouselContent"><div class="carousel slide" id="myCarousel" data-ride="carousel">',
            titHtmls = '<ol class="carousel-indicators">',
            contentHtmls = '<div class="carousel-inner" role="listbox">';

        $.each(widata,function(index,item){
            var path = item[dataimgPath]===null?'':URL_FILE_SERVER+ item[dataimgPath];
            var url = item[dataimgUrl]===null?'':item[dataimgUrl];
            var title = item[dataimgWord]===null?'':item[dataimgWord];
            var className = '';
            if(index===0){
                className = 'active';
            }
            if (path !== '') {
            	titHtmls +='<li class="'+className+'" data-target="#myCarousel"  data-slide-to="'+index+'"></li>';
            	contentHtmls += '<div class="item '+className+'">';
            	contentHtmls +=     '<div class="imgCoverTitle">';
            	if(item.title !== null){
            		contentHtmls +=     '<p>'+ title +'</p>';
            	}
            	contentHtmls +=     '</div>';
                contentHtmls += '<img class="carouselImg" src="'+path+'" data-url="'+ url +'">';
            	contentHtmls += '</div>';
            }
        });
        titHtmls+='</ol>';
        contentHtmls +='</div>';
        var bothHtmls =' <a class="carousel-control btnLeft" href="#myCarousel"  data-slide="prev"></a>'+
            '<a class="carousel-control btnRight" href="#myCarousel"  data-slide="next"></a>';
        htmls += titHtmls+contentHtmls+'</div>'+bothHtmls+'</div>';
        
        $buildDom.append(htmls);

        $('.carouselContent').css({'width':carouselImgW,'height':carouselImgH});
        $('.carousel-inner .item img').css({'width':carouselImgW,'height':carouselImgH});
        $('#myCarousel').carousel({
            interval : carouselSpeed
        });
        if(casBtnW !== '' && casBtnH !== ''){
        	var cImgH = $('.carouselContent').height();
            var btnH = casBtnH.substr(0,casBtnH.length-2)
            var btntop = (cImgH-btnH)/2;
        	$('.carousel-control').css({'width':casBtnW,'height':casBtnH,'top':btntop});
        }

        $('.btnLeft').css({'background-image':'url('+ imagesPath+casBtnPreUrl +')'});
        $('.btnRight').css({'background-image':'url('+ imagesPath+casBtnNextUrl +')'});
        $('.btnLeft').hover(function() {
            $('.btnLeft').css({'background-image':'url('+ imagesPath+casBtnPreHover +')'});
        }, function() {
            $('.btnLeft').css({'background-image':'url('+ imagesPath+casBtnPreUrl +')'});
        });
        $('.btnRight').hover(function() {
            $('.btnRight').css({'background-image':'url('+ imagesPath+casBtnNextHover +')'});
        }, function() {
            $('.btnRight').css({'background-image':'url('+ imagesPath+casBtnNextUrl +')'});
        });

        
        if (carouselMask == 'true') {
            $('#myCarousel .carousel-indicators').css('bottom', '45px');
            $('.imgCoverTitle').show();
        }
        
    }


    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, ImageText.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new ImageText(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.larImageText = Plugin;

});