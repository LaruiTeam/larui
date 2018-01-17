/*
 $.fn.spcFulltextSearch - by weijy
 */
/*
 methods
 {
 next()                          // 下一页
 prev()                          // 上一页
 play(index)                     // 指定一页
 }
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

    var NAMESPACE = 'css.fulltextSearch';


    function FulltextSearch(element, options) {
        var _this = this;

        _this.options = options;                                        // options

        var vars = _this._vars      = {};                               // vars
        vars.$element               = $(element);
        vars.conditions				= _this.options.conditions;			//拼接的条件

        FulltextSearch.init.call(_this);
    }
    
    FulltextSearch.URL = 'https://cn.bing.com/?FORM=Z9FD1';

    FulltextSearch.DEFAULTS = { };

    FulltextSearch.TEMPLATE =
    	'<section class="container">' +
		    '<div class="fulltextSearch input-group">' + 
		      '<input class="form-control css-searchText" type="text" placeholder="书名、标题、作者、出版社、摘要">' +
		      '<span class="input-group-btn css-searchBtn" id="btnSearch">'+
		          '<button class="btn btn-default glyphicon glyphicon-search" type="button">Go!</button>'+
		      '</span>' +
		    '</div>' +
	   '</section>' ;

    FulltextSearch.init = function() {
        var _this = this;

        FulltextSearch.render.call(_this);
    };

    FulltextSearch.render = function() {
        var _this = this,
            vars = _this._vars,
            $element = vars.$element;
        
        $element.html(FulltextSearch.TEMPLATE);

        vars.$searchText = $element.find('.css-searchText');
        vars.$searchBtn = $element.find('.css-searchBtn');

        FulltextSearch.bindEvent.call(_this);
    };

    FulltextSearch.bindEvent = function() {
        var _this = this,
            vars = _this._vars,
            $searchText = vars.$searchText,
            $searchBtn = vars.$searchBtn;
        
        $searchText.bind('keypress', function(e) {
        	if(e.keyCode === 13){
        		FulltextSearch.search.call(_this);
			}
        });

        $searchBtn.on('click', function() {
        	FulltextSearch.search.call(_this);
        });
        
    };

    FulltextSearch.search = function() {
        var _this = this,
            vars = _this._vars,
            $searchText = vars.$searchText,
        	conditions	= vars.conditions;	
        var conditionStr = '';
        
        var keyword = $searchText.val();
		var trimKeyword = $.trim(keyword);
		if(trimKeyword === ''){
			return;
		}else{
			conditionStr = '?keywords='+trimKeyword;
	        if (conditions){
	        	$.each(conditions, function( key, val ) {
	        		conditionStr += '&' + key + '=' + val;
	    		});
	        }
			var currentPage = window.location.href;
			if (currentPage.indexOf('fullTextSearch.html') === -1){
				//不是全文检索页面
				window.open(FulltextSearch.URL+ conditionStr, '_blank');
			}else{
				window.open(FulltextSearch.URL+ conditionStr, '_self');
			}
		}
    }

    function Plugin(option) {
        var _arguments = arguments;
        var result;

        this.each(function() {
            var $this = $(this);

            var obj = $this.data(NAMESPACE);

            if (!obj || typeof option == 'object') {
                var options = $.extend(true, {}, FulltextSearch.DEFAULTS, typeof option == 'object' && option);
                $this.data(NAMESPACE, new FulltextSearch(this, options));
            }

            if (typeof option == 'string' && typeof obj[option] == 'function') {
                if (_arguments && _arguments.length > 0) _arguments = Array.prototype.slice.call(_arguments, 1);
                result = obj[option].apply(obj, _arguments);
            }
        });

        return typeof result == 'undefined' ? this : result;
    };

    $.fn.spcFulltextSearch = Plugin;
});