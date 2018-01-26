/*
 $.fn.larTimeAxis  - by yuqiuyu
 * 
 * 注意：该组件需要通过推荐配置、字典表 对应服务取得数据
 * 传参说明：  
   yeardictCode:  字典表(年份)父级的dictCode
   yearsId: 字典表第一个年份的dictCode
   yearRightType:  右侧数据显示类型 （值：1,2  不加引号）
   yearslistH: 左侧年份间距
   
 使用方法:
   HTML - 找到需要放置内容的div或其他标签，并拿到该容器的标识名
   $('.showTimeAxis').larTimeAxis({
		yeardictCode: 'ZTjchg',
		yearsId: 'year2017',
		yearRightType: 1
	})

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

    var NAMESPACE = 'css.TimeAxis';

    function TimeAxis(element, options) {
        var _this = this;

        _this.options = options;// options

        var vars            = _this._vars  = {};// vars
        vars.$element       = $(element);
        // vars.items              = _this.options.items;  //数据项
        vars.yeardictCode   = _this.options.yeardictCode;//字典年份父级dictCode
        vars.yearsId        = _this.options.yearsId;//第一个年份dictCode
        vars.yearRightType  = _this.options.yearRightType?_this.options.yearRightType:1;//右侧数据展示方式
        vars.yearslistH		= _this.options.yearslistH?_this.options.yearslistH:'4';//年份间距

        TimeAxis.init.call(_this);
    }
    
    TimeAxis.DEFAULTS = { };
    
    // TimeAxis.TEMPLATE = ;

    TimeAxis.init = function() {
        var _this = this,
            vars = _this._vars;
        TimeAxis.timeline.call(_this);
        // TimeAxis.render.call(_this);
    };

    //============  时间轴
    TimeAxis.timeline = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element,
            yearRightType = vars.yearRightType,
            templet = '';

        templet += '<div class="Spc_timeline clearfix">'
        templet +=		'<div class="Spc_yearsLeft Spc_yearsSame">';//左侧时间
        templet +=			'<div class="Spc_yearsMain">';
        templet +=				'<div class="Spc_yearsMainCont">';
        templet +=					'<div class="Spc_yearsmove">';
        templet +=						'<div class="Spc_backLine"></div>';
        templet +=						'<ul class="Spc_yearsList">';
        templet +=						'</ul>';
        templet +=					'</div>';
        templet +=				'</div>';
        templet +=          	'<div class="Spc_btnYear Spc_btnBack"></div>';
        templet +=          	'<div class="Spc_btnYear Spc_btnMore"></div>';
        templet +=			'</div>';
        templet += 		'</div>';
        templet += 		'<div class="Spc_yearsRight Spc_yearsSame">';//右侧数据
        templet += 		'</div>';
        templet += '</div>';

        $element.html(templet);

        vars.$btnBack = $element.find('.Spc_btnBack');
        vars.$btnMore = $element.find('.Spc_btnMore');
        vars.$SpcYearsmove = $element.find('.Spc_yearsmove');

        TimeAxis.timelineDataLeft.call(_this);
        if (yearRightType == 1) {
        	TimeAxis.timelineDataRight.call(_this);
        }else if (yearRightType == 2) {
        	$('.Spc_yearsLeft').css({'width':'17%'});
        	$('.Spc_yearsRight').css({'width':'83%'});
        	TimeAxis.DataRightSec.call(_this);
        }
    };

    TimeAxis.timelineDataLeft = function() {
        var _this = this,
            vars = _this._vars,
            $btnBack = vars.$btnBack,
            $btnMore = vars.$btnMore,
            yearRightType = vars.yearRightType,
            yeardictCode = vars.yeardictCode,
            yearslistH = vars.yearslistH;
        // var postUrl = baseUrl + '/sword/dictService/findSubCodesByPcodeAndType';
        // $.post(postUrl,{dictCode:yeardictCode,dictType:'D_SEARCH_PLATE'}).done(function(data) {
            var data = {
                "model" : [{
                "dictCode" : "year2017",
                "dictName" : "2017"
            },{
                "dictCode" : "year2016",
                "dictName" : "2016"
            },{
                "dictCode" : "year2015",
                "dictName" : "2015"
            },{
                "dictCode" : "year2014",
                "dictName" : "2014"
            },{
                "dictCode" : "year2013",
                "dictName" : "2013"
            }]
            }
            var yearLists = data.model;
            var yersli = '';
            for (var i = 0; i < yearLists.length; i++) {
                yersli += '<li class="clearfix yearli" data-id='+ yearLists[i].dictCode +'>';
                yersli +=       '<span class="Spc_iconYears"></span>';
                yersli +=       '<span class="Spc_years">'+ yearLists[i].dictName +'</span>';
                yersli += '</li>';
            }
            $('.Spc_yearsList').append(yersli);

            //年份间距
            $('.Spc_yearsLeft .yearli').css({'padding':yearslistH+'px 0'});
            //年份左侧竖线
            var liHeight = $('.Spc_yearsMain .Spc_yearsList').height();
            var Lineheight = liHeight+10;
            $('.Spc_yearsMain .Spc_backLine').css('height', Lineheight+'px');
            //年份按钮
            var ul = $('.Spc_yearsList').height();
            var box = $('.Spc_yearsMain').height();
            if(ul > box){
                $('.Spc_btnMore').show();
            }

            $('.Spc_yearsList .yearli').click(function(event) {
                var idName = $(this).attr('data-id');
                //切换右侧数据
                if (yearRightType == 1) {
                	TimeAxis.timelineDataRight.call(_this,idName);
                }else if (yearRightType == 2) {
                	TimeAxis.DataRightSec.call(_this,idName);
                }
                
                $(this).find('.Spc_iconYears').css({'background': 'url(../../lar-ui/imgs/lar_local/iconEllipse.png) no-repeat'});
                $(this).siblings().find('.Spc_iconYears').css({'background': 'none'});

                $(this).find('.Spc_years').css({'color': '#cc3535','font-size':'18px'});
                $(this).siblings().find('.Spc_years').css({'color': '#48446b','font-size':'14px'});
            });
            
        // });
        $btnBack.on('click', function() {
        	TimeAxis.back.call(_this);
        });
        $btnMore.on('click', function() {
        	TimeAxis.more.call(_this);
        });

    }

    TimeAxis.back = function() {
        var _this = this,
            vars = _this._vars,
            $btnBack = vars.$btnBack,
            $btnMore = vars.$btnMore,
            $SpcYearsmove = vars.$SpcYearsmove;
        $SpcYearsmove.animate({'top':0},1200);
        $btnBack.hide();
        setTimeout(function () {
            $btnMore.show();
        }, 1200);
    }
    TimeAxis.more = function() {
        var _this = this,
            vars = _this._vars,
            $btnBack = vars.$btnBack,
            $btnMore = vars.$btnMore,
            $SpcYearsmove = vars.$SpcYearsmove;
        var yearListsH = $('.Spc_yearsMainCont').height();
        $SpcYearsmove.animate({'top':-yearListsH},1200);
        $btnMore.css({'display':'none'});
        setTimeout(function () {
            $btnBack.css({'display':'block'});
        }, 1200);
    }

    TimeAxis.timelineDataRight = function(idName) {
        var _this = this,
            vars = _this._vars,
            yearsId = vars.yearsId;
        if (idName) {
            yearsId = idName;
        }
        $('.Spc_yearsRight').empty();
        // var postUrl = baseUrl + '/sword/search/ChannelService/getResultDataByIds';
        var postUrl = 'data1.json';
        $.post(postUrl,{ids:yearsId}).done(function(data) {
            var listData = data.model,html = '';
            listData = listData[yearsId];
            if(listData && listData.length>0){
                var bigImg = listData[0].path===null?'':URL_FILE_SERVER+listData[0].path;
                html += '<div class="Spc_yearsData" id='+yearsId+'>';
                html +=     '<div class="Spc_imgChange">';
                if(listData[0].path!==null){
                    html +=         '<img src='+ URL_FILE_SERVER+listData[0].path +' id="Spc_showPic" alt="暂无图片" />';
                }else{
                    html +=         '<p>暂无图片</p>';
                }
                html +=     '</div>';
                html +=     '<div class="Spc_RightCount">';
                html +=         '<ul class="Spc_dataList">';
                for (var i = 0; i < listData.length; i++) {
                    if(i>5){break;}
                    var description = listData[i].description === null?'':listData[i].description;
                    var url = listData[i].url === null?'':listData[i].url;
                    html +=         '<li title='+ description +' data-url='+ url +'>'+description+'</li>';
                }
                html +=         '</ul>';
                html +=         '<div class="Spc_imglist">';
                for (var i = 0; i < listData.length; i++) {
                    if(listData[i].path === null){break;}
                    var imgList = listData[i].path===null?'':URL_FILE_SERVER+listData[i].path;
                    var url = listData[i].url===null?'':listData[i].url;
                    html +=         '<div class="Spc_SmImg">';
                    html +=             '<div class="Spc_imgBorder" data-url='+ url +'></div>';
                    html +=             '<img src='+ imgList +' />';
                    html +=         '</div>';
                }
                html +=         '</div>';
                html +=     '</div>';
                html += '</div>';
            }else{
                html += '<div class="Spc_yearsData" id='+yearsId+'>暂无数据';
                html += '</div>';
            }
            $('.Spc_yearsRight').append(html);
            $('.Spc_imglist .Spc_SmImg').hover(function() {
                $(this).find('.Spc_imgBorder').css({'border':'3px solid #cc3535'});
                $(this).siblings().find('.Spc_imgBorder').css({'border':'0'});
                var showSrc = $(this).find('img').attr('src');
                $('.Spc_imgChange #Spc_showPic').attr('src', showSrc);
            });
        })
    }

    TimeAxis.DataRightSec = function(idName) {
        var _this = this,
            vars = _this._vars,
            yearsId = vars.yearsId;
        
        if (idName) {
            yearsId = idName;
        }
        $('.Spc_yearsRight').empty();
        // var postUrl = baseUrl + '/sword/search/ChannelService/getResultDataByIds';
        var postUrl = 'data2.json';
        $.post(postUrl,{ids:yearsId}).done(function(data) {
            var listData = data.model,html = '';
            listData = listData[yearsId];
            if(listData && listData.length>0){
                var bigImg = listData[0].path===null?'':URL_FILE_SERVER+listData[0].path;
                html += '<div class="Spc_yearsDataSec clearfix">';
                html +=     '<div class="col-md-7 col-sm-7 col-lg-7 Spc_imgChangeSec">';
                if(listData[0].path!==null){
                    html +=         '<img src='+ URL_FILE_SERVER+listData[0].path +' id="showPic" alt="暂无图片" />';
                }else{
                    html +=         '<p>暂无图片</p>';
                }
                    html +=     '</div>';
                html +=     '<div class="col-md-5 col-sm-5 col-lg-5 Spc_RightCountSec clearfix">';
                var title = listData[0].title === null?'':listData[0].title;
                var description = listData[0].description === null?'暂无数据':listData[0].description;
                var url = listData[0].url === null?'':listData[0].url;
                html +=         '<div class="Spc_ListTitle">'+ title +'</div>';
                html +=         '<p class="Spc_ListP" title='+ description +' data-url='+ url +'>'+ description +'</p>';
                html +=     '</div>';
                html += '</div>';
            }else{
                html += '<div class="Spc_yearsDataSec" id='+listData.year+'>暂无数据';
                html += '</div>';
            }
            $('.Spc_yearsRight').append(html);
        })
    }

    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, TimeAxis.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new TimeAxis(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.larTimeAxis = Plugin;

});