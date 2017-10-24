/**
 * Created by 梁书仪 on 2017/10/19.
 */
/**
 * 用途：获取url中的参数
 * author:YaoGuanhong(copy from stackoverflow)
 * getParamFromUrl( name,url )函数:提取url中某个参数的值
 * 第二个参数url可以没有(如果url没有或者为空，取得的是本页面的url)
 * name为url中的变量名 url为请求的url
 *
 * 举例
 * *******************************************************************************************
 * 请求的url为
 * http://localhost:8081/lar-center-search-web/page/periodical/periodical.html?thisPPPara=31415926
 *
 * var result =
 * getParamFromUrl('thisPPPara','http://localhost:8081/lar-center-search-web/page/periodical/periodical.html?thisPPPara=31415926')
 *
 * result的结果为'31415926'
 * *******************************************************************************************
 */
function getParamFromUrl( name, url ) {
    if (!url) {
        url = location.href;
    }
    name = name.replace(/[\[]/,'\\\[').replace(/[\]]/,'\\\]');
    var regexS = '[\\?&]'+name+'=([^&#]*)';
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results === null ? null : results[1];
}

/**
 * 作者：sucj
 * 功能: 遍历对象obj,将其中值为null或undefined的属性值重新赋值为：暂无数据
 * */
function setNullInObj(obj,tipWord){
    if(obj && obj.constructor === Array){
        for(var i=0;i<obj.length;i++){
            obj[i] = setNullInObj(obj[i]);
        }
    }else if(obj && obj.constructor === Object){
        for(var p in obj){
            obj[p] = setNullInObj(obj[p]);
        }
    }else if(!obj || obj=='null' ){
        //obj = '';
        obj=tipWord;
    }
    return obj;
}