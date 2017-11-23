//维护公共报错变量
//CONST_ERROR = "系统报错！请联系管理员。";
//var DEFAULT_IMAGE = baseUrl + '/lar-ui/images/noImageAlert/errorImage.jpg';
this.baseUrl=getServerPath();
this.placeholderImg=placeholderImg;
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
	img.src= baseUrl+'src/component/images/errorImage.jpg';
	img.onerror=null;
}