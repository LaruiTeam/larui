$.fn.larFancyZoom = function(options){

  var options   = options || {};
  var directory = options && options.directory ? options.directory : 'images';
  var zooming   = false;

  //如果当前DOM节点中没有#zoom，则在.main里append默认包含#zoom、#zoom_content的html
  if ($('#zoom').length == 0) {
    var html = '<div class="round_shade_box" id="zoom"> \
					<div class="round_shade_top"> \
						<span class="round_shade_topleft"> \</span> \
						<span class="round_shade_topright"> \</span> \
					</div> \
					<div class="round_shade_centerleft"> \
						<div class="round_shade_centerright"> \
							<div class="round_shade_center" id="zoom_content"> \</div> \
						</div> \
					</div> \
					<div class="round_shade_bottom"> \
						<span class="round_shade_bottomleft"> \</span> \
						<span class="round_shade_bottomright"> \</span> \
					</div> \
				</div>';

    $('.main').append(html);

    //在整个页面上绑定click事件，在click事件中判断如果点击的不是zoom的子元素则执行隐藏方法
    $('html').click(function(e){if($(e.target).parents('#zoom:visible').length == 0) hide();});
    //绑定esc键的keyup事件，如果存在#zoom:visible则执行隐藏方法
    $(document).keyup(function(event){
        if (event.keyCode == 27 && $('#zoom:visible').length > 0) hide();
    });

    //绑定关闭按钮的click事件，执行隐藏方法hide
    $('#zoom_close').click(hide);
  }

  var zoom          = $('#zoom');
  var zoom_close    = $('#zoom_close');
  var zoom_content  = $('#zoom_content');

  //this指向调用larFancyZoom的jquery对象
  this.each(function(i) {
    $($(this).attr('href')).hide();
    //点击当前对象执行show方法
    $(this).click(show);
  });
  //绑定关闭按钮的click事件，执行隐藏方法hide
  $('#zoom_close').click(hide);
  return this;

  function show(e) {
    //zooming一个标志性变量，true为show或hide的执行中状态，false为show或hide执行完成状态
    if (zooming) return false;
		zooming         = true;

		var content_div = $($(this).attr('href'));
  		var zoom_width  = options.width;
		var zoom_height = options.height;

        //计算浏览器长宽及偏移量
		var width       = window.innerWidth || (window.document.documentElement.clientWidth || window.document.body.clientWidth);
		var height      = window.innerHeight || (window.document.documentElement.clientHeight || window.document.body.clientHeight);
		var x           = window.pageXOffset || (window.document.documentElement.scrollLeft || window.document.body.scrollLeft);
		var y           = window.pageYOffset || (window.document.documentElement.scrollTop || window.document.body.scrollTop);
		var window_size = {'width':width, 'height':height, 'x':x, 'y':y}

        //计算show需要的宽高
		var width              = (zoom_width || content_div.width()) + 40;
		var height             = (zoom_height || content_div.height()) + 40;
		var d                  = window_size;

		// ensure that newTop is at least 0 so it doesn't hide close button
		var newTop             = Math.max((d.height/2) - (height/2) + y, 0);
		var newLeft            = (d.width/2) - (width/2);
		var curTop             = e.pageY;
		var curLeft            = e.pageX;

		zoom_close.attr('curTop', curTop);
		zoom_close.attr('curLeft', curLeft);
		zoom_close.attr('scaleImg', options.scaleImg ? 'true' : 'false');

    $('#zoom').hide().css({
			position	: 'absolute',
			top				: curTop + 'px',
			left			: curLeft + 'px',
			width     : '1px',
			height    : '1px'
		});
    $('#zoom').css('z-index','2');
    zoom_close.hide();

    if (options.closeOnClick) {
      $('#zoom').click(hide);
    }

	if (options.scaleImg) {
		zoom_content.html(content_div.html());
		$('#zoom_content img').css('width', '100%');
		} else {
		  zoom_content.html('');
	}
	$('#pictureContainer').css('opacity','0.1');
    $('#zoom').animate({
      top     : newTop + 'px',
      left    : newLeft + 'px',
      opacity : "show",
      width   : width,
      height  : height
    }, 200, null, function() {
      if (options.scaleImg != true) {
    		zoom_content.html(content_div.html());
  		}
			zoom_close.show();

			zooming = false;
    })
    return false;
  }

  function hide() {
    if (zooming) return false;
		zooming         = true;
	  $('#zoom').unbind('click');

		if (zoom_close.attr('scaleImg') != 'true') {
  		zoom_content.html('');
		}
		zoom_close.hide();
		$('#pictureContainer').css('opacity','');
		$('#zoom').animate({
		  top     : zoom_close.attr('curTop') + 'px',
		  left    : zoom_close.attr('curLeft') + 'px',
		  opacity : "hide",
		  width   : '1px',
		  height  : '1px'
		}, 500, null, function() {

		  if (zoom_close.attr('scaleImg') == 'true') {
				zoom_content.html('');
			}
				zooming = false;
		});

		return false;
	  }

}
