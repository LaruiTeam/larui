//维护公共报错变量
//CONST_ERROR = "系统报错！请联系管理员。";
//var DEFAULT_IMAGE = baseUrl + '/lar-ui/images/noImageAlert/errorImage.jpg';
var baseUrl=getServerPath()+"/src/";
module.exports = {
	baseUrl:baseUrl,
	placeholderImg:placeholderImg
}
//获取工程访问地址 返回结果形如:   http://localhost:8080/lar-region-search-web
function getServerPath(){
	var curWwwPath = window.document.location.href;
	//获取主机地址之后的目录，如： cis/website/meun.htm
	var pathName = window.document.location.pathname;
	var pos = curWwwPath.indexOf(pathName); //获取主机地址，如： http://localhost:8080
	var localhostPaht = curWwwPath.substring(0, pos); //获取带"/"的项目名，如：/cis
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	var rootPath = localhostPaht + projectName;
	//baseUrl=rootPath;
	//var rootPath = localhostPaht;
	return rootPath;
}
/*
* 占位图
* */
function placeholderImg(name,element){
	if(!name){
		name = 'errorImage';
	}
	//var img=event.srcElement || event.target;
	var img = element;
	//baseUrl="http://localhost:63342/larui/";
	img.src= '/images/noImageAlert/errorImage.jpg';
	img.onerror=null;
}

//import $ from 'jquery';
//alert("LARUI.JS");
/*
$.fn.serializeJson=function(){
    var serializeObj={};  
    var array=this.serializeArray();
    var str=this.serialize();  
    $(array).each(function(){  
        if(serializeObj[this.name]){  
            if($.isArray(serializeObj[this.name])){  
                serializeObj[this.name].push(this.value);  
            }else{  
                serializeObj[this.name]=[serializeObj[this.name],this.value];  
            }  
        }else{  
            serializeObj[this.name]=this.value;   
        }  
    });  
    return serializeObj;  
};  


//全文检索按钮跳转
function fullTextSearch(keyword){
	if(keyword===""){
		return;
	}
	var url = baseUrl + '/page/fullTextSearch/fulltextSearch.html?keyword=' + encodeURIComponent(keyword);
	window.open(url) ; //打开窗口
}
*/



