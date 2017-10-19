/**
 * Created by ������ on 2017/10/19.
 */
/**
 * ��;����ȡurl�еĲ���
 * author:YaoGuanhong(copy from stackoverflow)
 * getParamFromUrl( name,url )����:��ȡurl��ĳ��������ֵ
 * �ڶ�������url����û��(���urlû�л���Ϊ�գ�ȡ�õ��Ǳ�ҳ���url)
 * nameΪurl�еı����� urlΪ�����url
 *
 * ����
 * *******************************************************************************************
 * �����urlΪ
 * http://localhost:8081/lar-center-search-web/page/periodical/periodical.html?thisPPPara=31415926
 *
 * var result =
 * getParamFromUrl('thisPPPara','http://localhost:8081/lar-center-search-web/page/periodical/periodical.html?thisPPPara=31415926')
 *
 * result�Ľ��Ϊ'31415926'
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
 * ���ߣ�sucj
 * ����: ��������obj,������ֵΪnull��undefined������ֵ���¸�ֵΪ����������
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