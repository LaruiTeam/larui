(function($) {
  "use strict"; // Start of use strict
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })
  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });
  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });
  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });

  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()
})(jQuery); // End of use strict

/*
 * 占位图
 * */
function placeholderImg(name,element,baseUrl){
  if(!name){
    name = 'errorImage';
  }
  //var img=event.srcElement || event.target;
  var img = element;
  //baseUrl="http://localhost:63342/util/";
  img.src= getServerPath() +'/images/errorImage.jpg';
  img.onerror=null;
}

function getServerPath(){
  var curWwwPath = window.document.location.href;
  //获取主机地址之后的目录，如： cis/website/meun.htm
  var pathName = window.document.location.pathname;
  var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080
  var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis
  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  var rootPath = localhostPaht + projectName;
  return rootPath;
}