/**
 * Created by EasyLiang on 2017/11/23.
 */
/*��ȡָ���ļ����������ļ������ key:value(�ļ������ļ�·��)������*/
this.deal=function(files){
    var entryObject={componentAll:'./index.js'};
    console.log("files:"+files.length);
    for(var i=0;i<files.length;i++){
        //console.log(files[i].indexOf('lar-'));
        var key=files[i].substring(files[i].lastIndexOf('/')+1,files[i].indexOf('.js'));
        entryObject[key]=files[i].replace('src/','') ;
    }
    return entryObject;
}
