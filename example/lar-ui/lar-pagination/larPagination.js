/*
 $.fn.larPagination - by weijy 
 */

/*
 options
 {
 pageSize: 10,                       // pageSize
 sizeSelector: [5, 10 ,15 20],	//每页显示条数的选择器，可选参数
 key: {
 pageSize: "pageSize",           //
 pageNum: "pageNum",             //
 dataCount: "allDataCount",      // 总条数
 pageData: "curPageData"         // 当前页rows
 },
 remote: {
 url: "",
 data: "",
 type: "post",
 dataType: "json",
 success: null,
 error: null
 }
 }

 methods
 {
 goToPage(pageNum),                  // 跳转至指定页
 nextPage(),                         // 下一页
 prevPage()                          // 上一页
 getDataCount()                      // 获取总条数
 }
 */

(function(factory){
    if (typeof define == "function" && define.amd) {
        // amd
        define(['jquery'], factory);
    } else if (typeof exports == "object") {
        // commonjs
        //module.exports = factory(require('jquery'));
        factory(require('jquery'));
    } else {
        // global
        factory(jQuery);
    }

})(function($) {
    'user strict';

    var NAMESPACE = "css.pagination";

    function Pagination(element, options) {
        var _this = this;

        _this.options = options;                                        // options

        var vars = _this._vars      = {};                               // vars
        vars.$element               = $(element);
        vars.pageNum                = null;                             // 当前页
        vars.pageSize               = _this.options.pageSize;           // 每页条数
        vars.pageCount              = 0;                                // 总页数
        vars.pageData               = null;                             // 当前页数据
        vars.showNum				= _this.options.showNum;			//可显示页数
        
        //如果有每页选择条数的选择器
        if(options.sizeSelector === true || 
        		options.sizeSelector instanceof Array || (
        			options.sizeSelector  && options.sizeSelector.selector !== false)){
        	vars.sizeSelector  = _this.options.sizeSelector;		//选择每页显示条数的选择器	
        	vars.selectorList  = ['5' ,'10' ,'15' ,'20']; //选择页面条数的列表，默认
        	if (vars.sizeSelector instanceof Array && vars.sizeSelector.length > 0){
        		vars.selectorList = vars.sizeSelector;
        	}
        	if (vars.sizeSelector.items instanceof Array && vars.sizeSelector.items.length > 0){
        		vars.selectorList = vars.sizeSelector.items;
        	}
        	
        	//如果有pageSize，优先pageSize的值，否则取选择项的第二条
        	if(typeof vars.pageSize == "number"){
        		vars.selectorNum = vars.pageSize;
        	}else{
        		vars.selectorNum = parseInt(vars.selectorList[1]);//选择页面条数的值
        	}
        }
        Pagination.init.call(_this);
    }

    Pagination.DEFAULTS = {
        pageSize: 10,                       // pageSize
        showNum:10,
        key: {
            pageSize: "pageSize",           //
            pageNum: "curPage",             //
            dataCount: "allDataCount",      // 总条数
            pageData: "curPageData"         // 当前页rows
        },
        remote: {
            url: "",
            data: "",
            type: "post",
            dataType: "json",
            success: null,
            error: null
        }
    };

    //页面条数选择器模版
    Pagination.SIZE_SELECTOR_TEMPLATE = 
    	'<div class="pull-left lar-page-ele input-group-btn lar-page-selector-wrap mr-10">' +
	    	'<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
	    		'<span class="lar-page-selector-num">10条</span>' +
	    		'<span class="caret"></span>' +
	        '</button>' +
	        '<ul class="dropdown-menu dropdown-menu-right lar-page-selector-list" role="menu">' +
		       '<li><a>5条</a></li>' +
		       '<li><a>10条</a></li>' +
		       '<li><a>15条</a></li>' +
		       '<li><a>20条</a></li>' +
		    '</ul>' +
		'</div>';
    
    Pagination.TEMPLATE =
        '<div class="lar-page-wrap">' +
        '<div class="lar-page">' +
        '<span class="pull-left lar-page-ele lar-page-btn readonly mr-10"><i class="fa fa-angle-left"></i></span>' +
        '<a class="pull-left lar-page-ele lar-page-btn prev hidden mr-10" href="javascript:;"><i class="fa fa-angle-left" title="上一页"></i></a>' +
        '<div class="pull-left lar-page-list mr-10"></div>' +
        '<a class="pull-left lar-page-ele lar-page-btn next hidden mr-10" href="javascript:;"><i class="fa fa-angle-right" title="下一页"></i></a>' +
        '<span class="pull-left lar-page-ele lar-page-btn readonly mr-10"><i class="fa fa-angle-right"></i></span>' +
        '<span class="pull-left mr-20">共 <b class="lar-page-count">0</b> 页</span>' +
        '<span class="pull-left mr-20">到第 <input class="lar-page-ele lar-page-input" type="number" value="1" /> 页</span>' +
        '<a class="pull-left lar-page-ele active lar-page-submit mr-10" href="javascript:">确定</a>' +
        '<span class="lar-page-loading hidden"><i class="fa fa-spinner fa-pulse"></i></span>' +
        '</div>' +
        '</div>';

    Pagination.init = function() {
        var _this = this;

        Pagination.render.call(_this);
    };

    Pagination.render = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;

        $element.html(Pagination.TEMPLATE);

        vars.$pageList              = $element.find(".lar-page-list");
        vars.$btnReadonly           = $element.find(".lar-page-btn.readonly");
        vars.$btnPrev               = $element.find(".lar-page-btn.prev");
        vars.$btnNext               = $element.find(".lar-page-btn.next");
        vars.$pageCount             = $element.find(".lar-page-count");
        vars.$input                 = $element.find(".lar-page-input");
        vars.$submit                = $element.find(".lar-page-submit");
        vars.$loading               = $element.find(".lar-page-loading");
        vars.loading                = false;
        
      //如果需要选择条数
        if (vars.sizeSelector){
        	//在确认按钮前
        	$element.find(".lar-page-submit").before(Pagination.SIZE_SELECTOR_TEMPLATE);
        	vars.$selectorList 			   = $element.find(".lar-page-selector-list");//选择页面条数的ul
        	vars.$selectorNum 			   = $element.find(".lar-page-selector-num");//选择页面条数的值
        	
        	vars.$selectorNum.html(vars.selectorNum + "条"); //取数组第一个元素显示
        	vars.$selectorList.empty();//清空下拉列表的list
        	var listHtml = '';
        	var listLength = vars.selectorList.length;
        	// '<li><a>5条</a></li>'
        	var liArr = [];
        	for (var i = 0; i < listLength; i++){
        		var li = "<li><a>" + vars.selectorList[i] + "条</a></li>";
        		liArr.push(li);
        	}
        	listHtml = liArr.join("");
        	vars.$selectorList.html(listHtml);
        }

        Pagination.goToPage.call(_this, 1);

        Pagination.bindEvent.call(_this);
    };

    Pagination.bindEvent = function() {
        var _this = this,
            vars = _this._vars,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext,
            $pageList = vars.$pageList,
            $submit = vars.$submit,
            $input = vars.$input,
            $selectorList = vars.$selectorList; //选择页面条数的ul，如果有
        $btnPrev.on("click", function() {
            if (vars.loading) return;
            Pagination.prevPage.call(_this);
        });

        $btnNext.on("click", function() {
            if (vars.loading) return ;
            Pagination.nextPage.call(_this);
        });

        $submit.on("click", function() {
            var pageNum = $input.val();
            Pagination.goToPage.call(_this, parseInt(pageNum));
        });

        $pageList.on("click", ".lar-page-num", function() {
            if (vars.loading) return ;

            $pageList.children().removeClass("active");
            $(this).addClass("active");

            Pagination.goToPage.call(_this, parseInt($(this).html()));
        });
        /**
         * 超出最大或最小值部分，重置
         * target，当前焦点所在的页码输入input
         */
        function changeOverflow(target){
//        	var $_this = $(this);
        	var $_this = target;
        	var inputVal = parseInt($_this.val());
        	var $pageCount = $_this.parent().prev().find('.lar-page-count');
        	//最大页数
        	var pageCount = parseInt($pageCount.html());
        	if (pageCount === 0){
        		pageCount = 1;
        	}
        	//非数字，小于0置为1；超出最大页数置为最大页数
        	if (!inputVal || inputVal<=0){
        		inputVal = 1;
        	}else if (inputVal>pageCount){
        		inputVal = pageCount;
        	}
        	$_this.val(inputVal);
        }
        //新增，不能输入小于1的数字 $input.on('input',function(e){});
        //不能输入大于最大页的数字，超出则显示最大页数
        $input.on('change',function(e){
//        	var inputVal = $(this).val()>0?$(this).val():1;
        	var $_this = $(e.target);
			changeOverflow($_this);
        });
        //绑定回车跳转到输入的页码
        $input.bind('keypress',function(e){
    		if(event.keyCode === 13){
    			var $_this = $(e.target);
    			changeOverflow($_this);
    			$submit.click();
    		}
        });
        
        //如果页面条数选择器，则绑定事件
        if ($selectorList != undefined){
        	$selectorList.on("click", "li", function(e) {
            	var index = $(this).index();
            	var num = vars.selectorList[index];
            	vars.$selectorNum.html(num + "条");
            	vars.selectorNum = parseInt(num);
            	
            	//选中后直接响应跳转到第一页
            	Pagination.goToPage.call(_this, 1);
            });
        }
    };

    Pagination.renderPage = function() {
        var _this = this,
            vars = _this._vars,
            pageNum = vars.pageNum,
            pageSize = vars.pageSize,
            pageCount = vars.pageCount,
            showNum = vars.showNum,
            $pageList = vars.$pageList,
            $pageCount = vars.$pageCount,
            $btnPrev = vars.$btnPrev,
            $btnNext = vars.$btnNext,
            $btnReadonly = vars.$btnReadonly;

        // 总页数
        $pageCount.html(pageCount);

        // btn prev next
        if (pageCount == 0) {
            $btnReadonly.removeClass("hidden");
            $btnPrev.addClass("hidden");
            $btnNext.addClass("hidden");
        } else {
            $btnReadonly.addClass("hidden");
            pageNum == 1 ? $btnPrev.addClass("hidden") : $btnPrev.removeClass("hidden");
            pageNum == pageCount ? $btnNext.addClass("hidden") : $btnNext.removeClass("hidden");
        }

        // 页码
        var numArr = Pagination.getPageNumArr.call(_this, pageNum, pageCount,showNum);
        $pageList.empty();
        for (var i=0; i<numArr.length; i++) {
            var active = pageNum == numArr[i] ? " active " : "";
            var $pageNum = $('<a class="pull-left lar-page-ele lar-page-num' + active + '" title="'+ numArr[i] +
            								'" href="javascript:;">' + numArr[i] + '</a>').appendTo($pageList);
        }
    };

    Pagination.getPageNumArr = function(pageNum, pageCount,showNum) {
        //var showNum = 10;       // 可视页码个数
        var startNum = 1;       // 可视起始页码
        var endNum = 1;         // 可视终止页码
        var numArr = [];        // 可视页码集合

        if (pageCount <= showNum) {
            startNum = 1;
            endNum = pageCount;
        } else {
            var halfNum = Math.ceil(showNum / 2);
            var rightCount = parseInt(showNum / 2);
            var leftCount = (showNum % 2 == 0)? Math.floor(showNum / 2) - 1 : Math.floor(showNum / 2);
            if (pageNum <= halfNum) {
                startNum = 1;
                endNum = showNum;
            } else if (pageNum >= pageCount - halfNum) {
                startNum = pageCount - showNum + 1;
                endNum = pageCount;
            } else {
                startNum = pageNum - leftCount;
                endNum = pageNum + halfNum;
            }
        }
        for (var i=startNum; i<=endNum; i++) {
            numArr.push(i);
        }

        return numArr;
    };

    Pagination.loadData = function() {
        var _this = this,
            options = _this.options,
            key = options.key,
            remote = options.remote,
            vars = _this._vars,
            pageSize = vars.pageSize,
            pageNum = vars.pageNum;

        var deferred = $.Deferred();

        Pagination.loading.call(_this, true);
        //setTimeout(function() {
        var pageParam = {};
        pageParam[key.pageSize] = pageSize;
        pageParam[key.pageNum] = pageNum;
        $.ajax({
            url: remote.url,
            data: $.extend({}, remote.data, pageParam),
            type: remote.type,
            dataType: remote.dataType,
            success: function(data) {
                var pageData = [],
                    dataCount = 0;

                if ($.isArray(data)) {
                    dataCount = data.length;
                    pageData = data;
                } else if (typeof data == "object") {
                    dataCount = data[key["dataCount"]] || 0;
                    pageData = data[key["pageData"]] || [];
                } else {
                    console.log("page data error");
                }

                // 当前页数据
                vars.pageData = [].concat(pageData);
                // 总条数
                vars.dataCount = dataCount;
                // 计算总页数
                vars.pageCount = Math.ceil(dataCount / pageSize);

                typeof remote.success == "function" && remote.success(pageData, data);

                Pagination.loading.call(_this, false);

                deferred.resolve();
            },
            error: function() {
                typeof remote.error == "function" && remote.error();

                Pagination.loading.call(_this, false);

                deferred.reject();
            }
        });
        //}, 500);

        return deferred.promise();
    };

    Pagination.loading = function(loading) {
        var _this = this,
            vars = _this._vars,
            $loading = vars.$loading;

        loading ? $loading.removeClass("hidden") : $loading.addClass("hidden");
        vars.loading = loading;
    }

    Pagination.goToPage = Pagination.prototype.goToPage = function(pageNum) {
        var _this = this,
            vars = _this._vars,
            pageCount = vars.pageCount,
            pageSize = vars.pageSize,
            selectorNum = vars.selectorNum;

        var pageNum_current = vars.pageNum;
        // pageNum
        if (pageNum <=0) pageNum = 1;
        if (pageCount == 0) pageNum = 1;
        else if (pageNum > pageNum) pageNum = pageCount;

        
        if (pageNum == pageNum_current){
        	if (selectorNum == undefined){
        		return;
        	}else if (pageSize == selectorNum){
        		return ;
        	}
        }
        
        vars.pageNum = pageNum;
        
        if (selectorNum != undefined){
        	vars.pageSize = selectorNum; //将选择器选择的条数赋值给页面条数
        }
        
        $.when(Pagination.loadData.call(_this)).done(function() {
            Pagination.renderPage.call(_this);
        }).fail(function() {

        });
    };

    Pagination.nextPage = Pagination.prototype.nextPage = function() {
        var _this = this,
            vars = _this._vars,
            pageNum = vars.pageNum;

        Pagination.goToPage.call(_this, pageNum + 1);
    };

    Pagination.prevPage = Pagination.prototype.prevPage = function() {
        var _this = this,
            vars = _this._vars,
            pageNum = vars.pageNum;

        Pagination.goToPage.call(_this, pageNum - 1);
    };

    Pagination.prototype.getDataCount = function() {
        return this._vars.dataCount;
    };

    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == "object") {
                var options = $.extend(true, {}, Pagination.DEFAULTS, typeof option == "object" && option);
                $this.data(NAMESPACE, new Pagination(this, options));
            }

            if (typeof option == "string" && typeof obj[option] == "function") {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == "undefined" ? this : result;
    };

    $.fn.larPagination = Plugin;
});