/*!
 * Created by skye on 2015/9/29.
 * larui lar-gallery  v0.1
 * Url: www.css.com.cn
 * Copyright (c) 
 * License: none
 * 
 *  参数：
 * @ dataList  
 *   必填，图片对象数组，图片对象里可以有所需的各种图片属性，目前只用了路径属性（url），其他属性待扩展中，没有默认值，是必填项。使用eg:$(".testGallery").gallery({"dataList":'[{"url":"images/img5.jpg"},{"url":"images/img4.jpg"}]',pageSize:"2",containerWidth:600});
 * @hyperLink 跳转链接
 * 
 * @url 图片地址
 * 
 * @title 图片标题
 * 
 * @des简介
 * 
 * @ galleryMode	
 *   gallery效果参数，参数值名称要在Gallery的fn对象中有这个方法，或为组件初始化自带，或通过 $.fn.gallery.addBulidDom 添加。
 *   
 * @ setContainerWidth 
 *   调用组件者可通过该参数设置动画区域宽度，可不设置。
 *   
 * @ setContainerHeight 
 *   调用组件者可通过该参数设置动画区域高度，可不设置。
 *   
 * @ setArrowLeftImg 
 *   左箭头图片路径，有默认值是"images/arrowLeftImg.png"
 *   
 * @ setArrowRightImg    
 *   右箭头图片路径，有默认值是"images/arrowRightImg.png"
 *   
 * @setImgMode(目前只有wordRegionRight设置)
 * 设置图片显示的比例，如：1:1,2:3...
 * 
 * @ arrowWidth   
 *   箭头宽度，有默认值，默认值是30px
 *   
 * @ arrowHeight   
 *   箭头高度，有默认值，默认值是40px 
 *   
 * @ setPageSize(squareTitleBelow,bTitleMaskDes 的DOM结构有用)
 *   每屏显示图片张数
 *   
 * @ setMaskColor(bTitleMaskDes,bTitleMaskDesSquare的Dom结构有用)
 *   有遮罩层的动画，支持设置遮罩层颜色
 *   
 * @ setMaskBorder(bTitleMaskDes的Dom结构有用)
 *   有遮罩层的动画，支持设置遮罩层边框颜色  
 *   
 * @hideDetailButton(wordRegionRight的Dom结构有用)
 * 	 进入详情页的按钮
 * 
 * @setWordStyle(bTitleMaskDes,bTitleMaskDesSquare的Dom结构有用)
 * 设遮罩层字体样式
 * 参数格式用对象封装，如：{color:'#ffffff',fontSize:'18px'}
 * 
 * @setTitleStyle(bTitleMaskDes,bTitleMaskDesSquare的Dom结构有用)
 * 设置标题字体样式
 * 参数格式用对象封装，如：{color:'#ffffff',fontSize:'18px'}
 * 
 * @addImgFrame(squareTitleBelow 的dom结构有用)
 * 给图片所在容器添加边框，造成有相框和阴影的感觉
 * 
 * @hoverColor(squareTitleBelow的dom结构有用)
 * 鼠标放上去标题样式
 * 
 * @imgContainerWidth(wordRegionRight的dom结构有用)
 * 设置水平方向上图片所在容器的宽度
 * 
 * @desWordNum(只有遮罩有使用这个参数)
 * 使用方法:
 *  HTML - 找到需要放置分页内容的div或者section，并拿到该容器的唯一标示，eg:
 *	<section class="art_classfications">
 *	</section>
 *
 *  JS - 初始化
 *	$(".art_classfications").gallery({
			dataList: data.model.entity,
			galleryMode:"wordRegionBelowFour"
	    });
 *		
 * 注意事项：
 * 1. 本组件类似$.validator,可以通过$.fn.gallery.addBulidDom("方法名",function) 方法对gallery组件进行扩展
 * 2. 扩展的方法只对dom区扩展起作用，类似galleryDom中的几种情况
 */
import $ from 'jquery';
import larUi from './../util/util.js';
/*import  './../sass/css/lar-gallery.css';*/
import '../util/larui.css';
window.$=$;
//alert("larUi.baseUrl"+larUi.baseUrl);
var baseUrl=larUi.baseUrl;
//var baseUrl="/";
//window.$ = $;
//$(".art_classfications1").html("AAAAA");
var placeholderImg=larUi.placeholderImg;
	/*组件状态：v0.2*/
	(function ($) {
		function Gallery(element, options) {
			//默认参数
			var setOptions = {
				setContainerWidth: "",
				setContainerHeight: "",
				dataList: [],
				galleryMode: "maskEffect",
				setArrowLeftImg: "",
				setArrowRightImg: "",
				arrowWidth: "40",
				arrowHeight: "62",
				setPageSize: "",
				setMobilePageSize: "",
				setMaskColor: "",
				setMaskBorder: "",
				setWordStyle: {
					color: '#f0f0f0',
					fontSize: '14px',
					height: '126px',
					lineHeight: "21px",
					overflow: 'hidden'
				},
				setTitleStyle: {
					color: '#ffffff',
					fontSize: '18px',
					fontWeight: '400',
					height: "32px",
					lineHeight: '32px',
					textAlign: 'left',
					display: 'inline-block',
					width: '100%'
				},
				hideDetailButton: false,
				callBack: null,
				isNoSkip: false,
				addImgFrame: false,
				hoverColor: {color: "#ff9911", backgroundColor: "#ff9911"},
				imgContainerWidth: "",
				desWordNum: 74,
				setImgMode: ""

			};
			var _defaults = {
				containerWidth: "",
				containerHeight: "",
				pageSize: "3",
				pageSizeClass: "",
				arrowLeftImg: baseUrl+"src/component/images/arrowLeft.png",
				arrowRightImg:baseUrl+"src/component/images/arrowRight.png",
				isSlide: true,
				windowWidth: null
			};
			this.current = 0;
			this.element = element;
			this.$container = $(this.element);
			this.options = $.extend(true, {}, setOptions, _defaults, options);
			if (this.options.dataList.length < 1) {
				return;
			}
			var _this = this;
			this.imgTotalNum = this.options.dataList.length;
			_this.windowWidth = $(window).width();
			if (_this.windowWidth <= 768) {
				_this.options.pageSize = _this.options.setMobilePageSize ? _this.options.setMobilePageSize : 1;
			} else if (_this.windowWidth > 768) {
				_this.options.pageSize = _this.options.setPageSize ? _this.options.setPageSize : 3;
			}
			var parentContainer = $().width();

			this.options.containerWidth = this.options.setContainerWidth ? this.options.setContainerWidth : _defaults.containerWidth
			this.options.arrowLeftImg = this.options.setArrowLeftImg ? this.options.setArrowLeftImg : _defaults.arrowLeftImg
			this.options.arrowRightImg = this.options.setArrowRightImg ? this.options.setArrowRightImg : _defaults.arrowRightImg
			this.options.windowWidth = $(window).width();
			Gallery.init.call(_this);
		}

		/*组件：初始化方法*/
		Gallery.init = function () {

			/*dom构建，依据效果不同，执行不同的构建方法*/
			$.when(Gallery.basicBulid.call(this)).done(this[this.options.galleryMode]());

			/*dom结构构建完成后，等待页面上图片下载，图片下载完后，初始化页面上的事件*/
			$.when(this.waitImgLoad.call(this)).done(Gallery.bindEvents.call(this), Gallery.initCss.call(this));

			if (this.options.callBack) {
				this.options.callBack();
			}
		}

		/*构建组件公共dom区*/
		Gallery.basicBulid = function () {
			var dfd = $.Deferred();
			var _this = this;
			var wrapper = $('<div class="lar-galleryWrapper clearfix"><div class="inner"></div><div class="arrow arrow-left"><img class="img" src="' + _this.options.arrowLeftImg + '"></div> <div class="arrow arrow-right"><img class="img" src="' + _this.options.arrowRightImg + '"></div></div>').appendTo(this.$container);
			if (_this.options.galleryMode == 'artType') {
				_this.options.arrowWidth = 24;
			}
			var galleryContentWidth = $(this.$container).width() - (_this.options.arrowWidth * 2) - 10;
			$(this.$container).find(".inner").css({width: galleryContentWidth + 'px', margin: '0 auto'});
			$(this.$container).find(".arrow ").css({"width": _this.options.arrowWidth + "px"});
			this.initPageSizeClass(_this.options.setPageSize, _this.options.dataList.length);
			if (!_this.options.isPcSlide) {
				$(this.$container).find(".arrow ").addClass("onlyMobileSlide");
			}
			dfd.resolve();
			return dfd.promise;
		}

		/*组件事件初始化*/
		Gallery.bindEvents = function () {
			this.$arrowLeft = this.$container.find(" .arrow-left");
			this.$arrowRight = this.$container.find(" .arrow-right");
			this.$arrowRight.bind('click', {direction: 'right', myThis: this}, Gallery.movePic);
			this.$arrowLeft.bind('click', {direction: 'left', myThis: this}, Gallery.movePic);
		}

		/*處理圖片高度*/
		Gallery.initCss = function () {
			var _this = this;
			if (_this.options.galleryMode == "squareTitleBelow" || _this.options.galleryMode == "bTitleMaskDesSquare") {
				var imgHeight = $(this.$container).find(".galleryPic ").height() - _this.options.setTitleStyle.height.substring(0, 2);
				$(this.$container).find(".galleryPic .img").css({"height": imgHeight + "px"});
			} else if (_this.options.galleryMode == "wordRegionBelowFour" || _this.options.galleryMode == "bwordRegionArtType") {
				var wordHeight = _this.options.setWordStyle.height;
				var imgHeight = 0;
				;
				if (_this.options.galleryMode == "wordRegionBelowFour") {
					var imgHeight = $(this.$container).find(".galleryPic > div ").height() - _this.options.setTitleStyle.height.substring(0, 2) - wordHeight.substring(0, wordHeight.indexOf("px"));
				} else {
					var imgHeight = $(this.$container).find(".galleryPic").height() - _this.options.setTitleStyle.height.substring(0, 2) - wordHeight.substring(0, wordHeight.indexOf("px"));
				}
				_this.options.imgHeight = imgHeight;
				$(this.$container).find(".galleryPic .img").css({"height": imgHeight + "px"});
			}
		}

		/*运动*/
		Gallery.movePic = function (moveOptions) {
			var _this = this;
			var direction = moveOptions.data.direction;
			var mythis = moveOptions.data.myThis;
			var $slidePics = mythis.$container.find('.galleryPic');
			var $firstSlidePic = mythis.$container.find('.galleryPic:first-child');
			var $lastSlidePic = mythis.$container.find('.galleryPic:last-child');
			var current = _this.current;
			mythis.$inner = mythis.$container.find('.inner');

			if (!$slidePics.is(":animated")) {
				if (direction == 'right') {
					mythis.picWidth = $($slidePics[0]).outerWidth();
					$firstSlidePic.appendTo(mythis.$inner);
					$slidePics.css("left", mythis.picWidth + "px");
					$slidePics.each(function (i, e) {
						$(this).animate({
							left: "-=" + mythis.picWidth
						}, "slow");
					});
					mythis.current++;
				} else if (direction == 'left') {
					mythis.picWidth = $($slidePics[2]).outerWidth();
					$lastSlidePic.prependTo(mythis.$inner);
					$slidePics.css("left", mythis.picWidth * (-1) + "px");
					$slidePics.each(function (i, e) {
						$(this).animate({
							left: "+=" + mythis.picWidth
						}, "slow");
					});
					mythis.current--;
				}
			}
		}

		/*实例化对象可以访问的方法（即公共方法）和需要提前预加载的方法（Gallery.method在调用前必须声明，而Gallery.fn.method则不用）    */
		Gallery.fn = Gallery.prototype = {
			/*图片加载处理--等待图片加载完成，完成返回promise状态;加载过程中如果图片路径有问题，则加载默认图片*/
			waitImgLoad: function () {
				var dtd = $.Deferred();
				var _this = this;
				var imgLast = 0;
				_this.$imgs = this.$container.find(".inner img");
				_this.$imgs.each(function (i, e) {
					var img = new Image;
					img.src = $(this).attr('src');
					img.onload = function () {
						imgLast++;
						if (imgLast == _this.$imgs.length) {
							dtd.resolve();
						}
					};
					/*第i张图片路径有问题，采用默认图片路径*/
					img.onerror = function () {
						var defaultUrl = baseUrl+"src/component/images/errorImage.jpg";
						var curImg = _this.$container.find(" .inner .galleryPic img").eq(i);
						$(curImg).attr("src", defaultUrl);
						img.src = defaultUrl;
						img.onload = function () {
							imgLast++;
							if (imgLast == _this.$imgs.length) {
								dtd.resolve();
							}
						};
					}

				});
				return dtd.promise();
			},


			/*组件：构建组件所需DOM元素*/
			maskEffect: function () {
				var _this = this;
				var picHtml = "";
				$.each(this.options.dataList, function (i, e) {
					var wordRegion = e.title;
					picHtml += "<div class='galleryPic " + _this.options.pageSizeClass + "'><a target= _blank href='" + e.hyperLink + "' title='" + e.title + "'><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='title'><p>" + wordRegion + "</p></div></a></div>";
				});
				this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
				if (_this.options.setMaskColor != "") {
					$(_this.$container).find(".title").css({background: _this.options.setMaskColor});
				}
			},

			getEllipseDes: function (maxLength, text) {
				var _this = this;
				var adjustText = '';
				if (text && text.length > 0 && maxLength > 0) {
					adjustText = text.substr(0, Math.min(maxLength, text.length));
					if (text.length > maxLength) {
						adjustText += '...';
					}
				}
				return adjustText;
			},

			/*实例化对象可以通过该方法获取所有dom结构，方便二次操作页面本区域*/
			getDataDom: function () {
				return $(this.$container).find(".galleryPic a");
			}

		}

		/*設置每個galleryPic寬度所用的比例*/
		Gallery.fn.initPageSizeClass = function (setPageSize, dataLength) {
			var _this = this;
			setPageSize = (setPageSize == "") ? 3 : setPageSize;
			if (dataLength > 0) {
//			var pageSize=parseInt(setPageSize<dataLength?setPageSize:dataLength);			
				var pageSize = parseInt(setPageSize);
				_this.options.isPcSlide = setPageSize < dataLength ? true : false;

				switch (pageSize) {
					case 1:
						_this.options.pageSizeClass = "pageSizeOne";
						break;
					case 2:
						_this.options.pageSizeClass = "pageSizeTwo";
						break;
					case 3:
						_this.options.pageSizeClass = "pageSizeThree";
						break;
					case 4:
						_this.options.pageSizeClass = "pageSizeFour";
						break;
					case 5:
						_this.options.pageSizeClass = "pageSizeFive";
						break;
					case 12:
						_this.options.pageSizeClass = "pageSizeTwelve";
						break;
				}

			} else {
				_this.options.pageSizeClass = "noData";
				return;
			}

		}

		/*组件入口*/
		$.fn.gallery = function (options) {
			this.each(function () {
				return $.data(this, "plugin_gallery", new Gallery(this, options));
			});
		}

		/*扩展组件buliDom方法*/
		$.fn.gallery.addBulidDom = function (methodName, methodBody) {
			Gallery.fn[methodName] = methodBody;
		}

		/*=========================扩展组件各种dom结构方式--定义=============================*/

		/*扩展结构1：上下排版，每次展示3个对象*/
		var squareTitleBelow = function () {
			var _this = this;
			var picHtml = "";
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = e.url;
				}
				var wordRegion = "";
				picHtml += "<div class='galleryPic " + _this.options.pageSizeClass + "'> <a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\'/></div><div class='title'><p>" + e.title + "</p></div></a> </div>"; //width="+(picWidth-10)+"px;'

			});
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
			/*处理组织团体库需要加的边框和hover*/
			if (_this.options.addImgFrame) {
				$(this.$container).find(".galleryPic img").css({
					"border": "4px solid #ffffff",
					"box-shadow": "#666666 0px 4px 12px"
				});

				$(this.$container).find(".inner .galleryPic a").bind("mouseenter", function () {
					$(this).find(".title").css({"color": "#ff9911"});
					$(this).find("img").css({"border": "4px solid #ff9911"});
				}).bind("mouseleave", function () {
					$(this).find(".title").css(_this.options.setTitleStyle);
					$(this).find("img").css({"border": "4px solid #ffffff"});
				});

			}
		};


		/*扩展结构2：上下排版，每次展示12个对象*/
		var galleryArtType = function () {
			var _this = this;
			var picHtml = "";
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = e.url;
				}
				var wordRegion = e.title;
				var pageSizeNum = 'pageSizeTwelve';
				var urlString = e.url;
				//e.url=urlString.replace("/lar-center-search-web",baseUrl);
				var linkString = e.hyperLink;
				//e.hyperLink=linkString.replace("/lar-center-search-web",baseUrl);
				if (_this.options.setPageSize == 9) {
					pageSizeNum = 'pageSizeNine';
				}
				if (_this.options.isNoSkip) {
					picHtml += "<div class='galleryPic " + pageSizeNum + "'><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='title'><p>" + wordRegion + "</p></div></div>"; //width="+(picWidth-10)+"px;'
				} else {
					picHtml += "<div class='galleryPic " + pageSizeNum + "'> <a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='title'><p>" + wordRegion + "</p></div></a> </div>"; //width="+(picWidth-10)+"px;'
				}
			});

			if (_this.options.setArrowLeftImg) {
				this.$container.find(".arrow-right img").attr("src", this.options.arrowLeftImg);
			} else {
				this.$container.find(".arrow-left img").attr("src", baseUrl + "/lar-gallery/img/yellowArrowLeft.png");
			}
			if (_this.options.setArrowRightImg) {
				this.$container.find(".arrow-right img").attr("src", this.options.arrowRightImg);
			} else {
				this.$container.find(".arrow-right img").attr("src", baseUrl + "/lar-gallery/img/yellowArrowRight.png");
			}
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			_this.options.setTitleStyle.overflow = "visible";
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
		};

		/*扩展结构3：上下排版，每次展示4个对象*/
		var wordRegionBelowFour = function () {
			var _this = this;
			var picHtml = "";
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = e.url;
				}
				var wordRegion = e.des;

				picHtml += "<div class='galleryPic pageSizeFour'><div><a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='wordRegion'><p><span class='userName title'>" + e.title + "</span><br/><span class='desc'>" + wordRegion + "<span></p></div></a></div></div>"; //width="+(picWidth-10)+"px;'
			});
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
			$(this.$container).find(".desc").css(_this.options.setWordStyle);
		};


		/*扩展结构4：上、遮罩、下排版，每次展示4个对象---圆形*/
		var bTitleMaskDes = function () {
			var _this = this;
			var picHtml = "";
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = e.url;
				}
				var wordRegion = e.des ? e.des : "";
				wordRegion = _this.getEllipseDes(_this.options.desWordNum, wordRegion);
				if (_this.options.setPageSize == "") {
					_this.options.pageSizeClass = "pageSizeFour";
				}
				picHtml += "<div class='galleryPic " + _this.options.pageSizeClass + "'> <a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='title'>" + e.title + "</div><div class='desc'>" + wordRegion + "</div></a> </div>"; //width="+(picWidth-10)+"px;'
			});
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
			/*hover效果*/
			$(this.$container).find(".galleryPic").bind("mouseenter", function () {
				$(this).find(".title").css({color: _this.options.setMaskColor});
				$(this).find(".desc").css({opacity: "0.8"});
			}).bind("mouseleave", function () {
				$(this).find(".title").css(_this.options.setTitleStyle);
				$(this).find(".desc").css({opacity: "0"});
			});

			/*图片和遮罩处理成圆形*/
			var galleryWidth = $(this.$container).find(".galleryPic").width();
			var imgHeight = $(this.$container).find(".galleryPic ").height() - _this.options.setTitleStyle.height.substring(0, 2);
			imgHeight = imgHeight < galleryWidth ? imgHeight : galleryWidth;
			$(this.$container).find(".galleryPic .img").css({height: galleryWidth + "px"});
			_this.options.setWordStyle.height = galleryWidth;
			$(this.$container).find(".desc").css(_this.options.setWordStyle);

			$.when(_this.waitImgLoad.call(_this)).done(function () {
				$(_this.$container).find(" .lar-galleryWrapper .inner a").hover(function () {
					var parWidth = $(this).parent().width() + 10;
					$(this).find("img").css({"width": parWidth + "px"});
					$(this).find(".desc").css({
						"width": parWidth + "px",
						"background": _this.options.setMaskColor,
						"border": _this.options.setMaskBorder
					});
				}).on("mouseleave", function () {
					var parWidth = $(this).parent().width();
					$(this).find("img").css({"width": parWidth + "px"});
					$(this).find(".desc").css({"width": parWidth + "px"});
				});
			});
		};

		/*扩展结构4：上、遮罩、下排版，每次展示4个对象--方形,可设置pagesize参数*/
		var bTitleMaskDesSquare = function () {
			var _this = this;
			var picHtml = "";
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = e.url;
				}
				var wordRegion = e.des;
				wordRegion = _this.getEllipseDes(_this.options.desWordNum, wordRegion);
				if (_this.options.setPageSize == "") {
					_this.options.pageSizeClass = "pageSizeFour";
				}
				picHtml += "<div class='galleryPic " + _this.options.pageSizeClass + "'> <a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='title'>" + e.title + "</div><div class='desc'>" + wordRegion + "</div></a> </div>"; //width="+(picWidth-10)+"px;'
			});
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
			_this.options.setWordStyle.height = _this.options.imgHeight + "px";
			$(this.$container).find(".desc").css(_this.options.setWordStyle);

			$.when(_this.waitImgLoad.call(_this)).done(function () {
				$(_this.$container).find(" .lar-galleryWrapper .inner a").hover(function () {
					var parWidth = $(this).parent().width() + 10;
					$(this).find("img").css({"width": parWidth + "px"});
					$(this).find(".desc").css({
						"width": parWidth + "px",
						"background": _this.options.setMaskColor,
						"border": _this.options.setMaskBorder
					});
				}).on("mouseleave", function () {
					var parWidth = $(this).parent().width();
					$(this).find("img").css({"width": parWidth + "px"});
					$(this).find(".desc").css({"width": parWidth + "px"});
				});
			});
		};

		/*扩展结构5：上下排版，每次展示3个对象,添加艺术类别*/
		var bwordRegionArtType = function () {
			var _this = this;
			var picHtml = "";
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = e.url;
				}
				var wordRegion = e.des;

				picHtml += "<div class='galleryPic " + _this.options.pageSizeClass + "'> <a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='wordRegion'><p><span class='title'>" + e.title + "</span><br/><span class='desc'>" + wordRegion + "<span></p></div></a><div class='artType'>" + e.artType + "</div> </div>"; //width="+(picWidth-10)+"px;'
			});
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			$(this.$container).find(".wordRegion .title").css(_this.options.setTitleStyle);
			$(this.$container).find(".wordRegion .desc").css(_this.options.setWordStyle);
		};

		/*扩展结构6：2行2列的gallery*/
		var twoRowsGallery = function () {
			var _this = this;
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			var dataListLength = this.options.dataList.length;
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode);
			var picHtml = "";
			for (var i = 0; i < dataListLength; i++) {
				if (i % 2 == 1) {
					picHtml += '<div class="imgArea"><a target= _blank href="' + this.options.dataList[i].hyperLink + '" title="' + this.options.dataList[i].title + '"><img src="' + this.options.dataList[i].url + '" onerror=\'placeholderImg(\"\",this,baseUrl);\' /><span class="title">' + this.options.dataList[i].title + '</span></a></div>';
					this.$container.find(" .lar-galleryWrapper .inner").append("<div class='galleryPic' />");
					this.$container.find(" .lar-galleryWrapper ." + _this.options.galleryMode + " .galleryPic:last").append(picHtml);
					picHtml = "";
				} else {
					picHtml += '<div class="imgArea"><a target= _blank href="' + this.options.dataList[i].hyperLink + '" title="' + this.options.dataList[i].title + '"><img src="' + this.options.dataList[i].url + '" onerror=\'placeholderImg(\"\",this,baseUrl);\'/><span class="title">' + this.options.dataList[i].title + '</span></a></div>';
				}
			}
			_this.options.setTitleStyle.textAlign = "center";
			if (_this.windowWidth <= 768) {
				_this.options.setTitleStyle.fontSize = "14px";
				_this.options.setTitleStyle.width = "98%";
				_this.options.setTitleStyle.textOverflow = "ellipsis";
			}
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
			if (_this.windowWidth <= 768) {
				$(this.$container).find(".arrow ").hide();
			}

		};

		/*扩展结构7：左右排版，每屏展示1个对象，左边图片，右边标题+简介+超链接*/
		var wordRegionRight = function () {
			var _this = this;
			var picHtml = "";
			this.innerContainerWidth = $(_this.$container).width();
			_this.picWidth = Math.floor(this.innerContainerWidth / this.options.pageSize);
			$.each(this.options.dataList, function (i, e) {
				if (!e.hyperLink || e.hyperLink == "" || e.hyperLink == "undefined") {
					e.hyperLink = "#";
				}
				var wordRegion = e.des;
				picHtml += "<div class='galleryPic pageSizeOne'> <a href='" + e.hyperLink + "' target='_blank' title=" + e.title + "><div class='img'> <img src='" + e.url + "' onerror=\'placeholderImg(\"\",this,baseUrl);\' /></div><div class='wordRegion'><p><span class='title'>" + e.title + "</span><span class='bottomBorder'></span><br/><span class='desc'>" + wordRegion + "</span><div class='gotoDetail'><span class='tip'>进入详情</span><span class='gotoIcon'></span></div></p></div></a></div>"; //width="+(picWidth-10)+"px;'
			});
			this.$container.find(" .lar-galleryWrapper .inner").addClass(_this.options.galleryMode).append(picHtml);
			if (_this.options.hideDetailButton) {
				$(_this.$container).find(".gotoDetail").hide();
			}
			$(this.$container).find(".title").css(_this.options.setTitleStyle);
			$(this.$container).find(".wordRegion .desc").css(_this.options.setWordStyle);

			if (_this.options.imgContainerWidth != "" && _this.windowWidth > 768) {
				$(this.$container).find(".galleryPic .img").css({width: _this.options.imgContainerWidth});
				$(this.$container).find(".wordRegion").css({width: (100 % -_this.options.imgContainerWidth - 0.2)});
			} else if (_this.windowWidth < 768) {
				$(this.$container).find(".galleryPic .img").css({width: '100%', display: 'block'});
//        	$(this.$container).find(".galleryPic .img img").css({width:'100%',height:'100%',"marginTop":"0px","paddingTop":"0px"});
				$(this.$container).find(".wordRegion").css({width: '100%', display: 'block'});
				$(this.$container).find("br").remove();
			}

			//设置图片显示比例
			var imgHeight = "100%";
			var currImgWidth = $(this.$container).find(".galleryPic .img img").width();
			if (_this.options.setImgMode === "1:1") {
				imgHeight = currImgWidth;
			} else if (_this.options.setImgMode === "4:3") {
				imgHeight = currImgWidth * 3 / 4;
			} else if (_this.options.setImgMode === "3:4") {
				imgHeight = currImgWidth * 4 / 3;
			}
			if (imgHeight !== "100%") {
				imgHeight += "px";
			}
			$(this.$container).find(".galleryPic .img").css({height: imgHeight});

			//设置简介自适应高度
			var descHeight = "100%";
			var galleryH = $(this.$container).find(".galleryPic").height();
			var titleH = $(this.$container).find(".galleryPic .wordRegion .title").height();
			var gotoDetailH = $(this.$container).find(".galleryPic .wordRegion .gotoDetail").height();
			var lineHeight = $(this.$container).find(".wordRegion .desc").css("line-height").replace("px", "");
			if (_this.windowWidth > 768) {
				descHeight = (galleryH - titleH - gotoDetailH - 40);//40为空白高度
			} else {
				var imgH = $(this.$container).find(".galleryPic .img").height();
				descHeight = (galleryH - titleH - gotoDetailH - imgH);
			}
			if (_this.options.hideDetailButton) {
				descHeight += 40;
			}
			if (descHeight !== "100%") {
				var lines = Math.floor((descHeight / eval(lineHeight)));
				descHeight = (lines * eval(lineHeight)) + "px";
			}

			$(this.$container).find(".wordRegion .desc").css({height: descHeight});
		};


		/*=========================扩展组件各种dom结构方式--给组件绑定以上定义的扩展方式=============================*/

		$.fn.gallery.addBulidDom("squareTitleBelow", squareTitleBelow);

		$.fn.gallery.addBulidDom("artType", galleryArtType);

		$.fn.gallery.addBulidDom("wordRegionBelowFour", wordRegionBelowFour);

		$.fn.gallery.addBulidDom("bTitleMaskDes", bTitleMaskDes);

		$.fn.gallery.addBulidDom("bTitleMaskDesSquare", bTitleMaskDesSquare);

		$.fn.gallery.addBulidDom("bwordRegionArtType", bwordRegionArtType);

		$.fn.gallery.addBulidDom("twoRowsGallery", twoRowsGallery);

		$.fn.gallery.addBulidDom("wordRegionRight", wordRegionRight);

	})($,larUi);
//window.$ = $;
