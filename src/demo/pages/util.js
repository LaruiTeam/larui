/**
 * Created by liangshuyi on 2017/9/28.
 */

this.baseUrl=getServerPath();
this.placeholderImg=placeholderImg;
function getServerPath(){
    var curWwwPath = window.document.location.href;
    //��ȡ������ַ֮���Ŀ¼���磺 cis/website/meun.htm
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName); //��ȡ������ַ���磺 http://localhost:8080
    var srcPath = curWwwPath.indexOf('src'); //��ȡsrcλ�ã��磺 http://localhost:8080
    //alert("srcǰ������ַ���·��"+pos+","+srcPath);
    //var localhostPaht = curWwwPath.substring(0, pos); //��ȡ��"/"����Ŀ�����磺/cis
    var localhostPaht = curWwwPath.substring(0, pos); //��ȡ��"/"����Ŀ�����磺/cis
    var relativePath = curWwwPath.substring(pos,srcPath); //��ȡ��"/"����Ŀ�����磺/cis
    //var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    var rootPath = localhostPaht + relativePath;
    return rootPath;
}
/*
 * ռλͼ
 * */
function placeholderImg(name,element,baseUrl){
    if(!name){
        name = 'errorImage';
    }
    //var img=event.srcElement || event.target;
    var img = element;
    //baseUrl="http://localhost:63342/util/";
    alert("ѹ����baseUrl���ԣ�"+baseUrl);
    img.src= baseUrl+'src/component/images/errorImage.jpg';
    img.onerror=null;
}