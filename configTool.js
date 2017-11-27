/**
 * Created by EasyLiang on 2017/11/23.
 */
/*整理所有入口文件，格式为{key：path,key:path.....}*/
var glob=require("glob");
var path = require('path');
var fs = require("fs");
/*压缩文件夹*/
var fstream=require('fstream');
var tar=require('tar');
var zlib=require('zlib');

this.deal=function(files,lib,libFiles){
    //var entryObject={componentAll:'./index.js',vendor:'jquery'};
    var entryObject={componentAll:'./index.js'};
    //console.log("files:"+files.length);
    for(var i=0;i<=files.length;i++) {
        if (i < files.length) {
            //larui研发组件
            var key=files[i].substring(files[i].lastIndexOf('/')+1,files[i].indexOf('.js'));
            entryObject[key]=files[i].replace('src/','') ;
        } else {
            for (var j = 0; j <= lib.length; j++) {//第三方单独文件
                if (j < lib.length) {
                    var isMin=lib[j].indexOf("min");
                    //console.log("isSinglwMin:"+isMin);
                    if(isMin<0){
                        var key="/lib/"+lib[j].substring(lib[j].lastIndexOf('/')+1,lib[j].indexOf('.js'));
                        entryObject[key]=lib[j].replace('src/','') ;
                        //console.log("key:" + key+",pathName:"+lib[j].replace('src/',''));
                    }

                } else {//第三方组件文件夹
                    travel('./src/lib/', function (pathName) {
                        pathName = pathName.replace(/\\/g, "/");
                        var regex = new RegExp('/', 'g');
                        var count = pathName.match(regex).length;
                        if (count > 2) { //文件夹
                            var isMin=pathName.indexOf("min");
                            var isJs=pathName.indexOf(".js");
                            var isPic=pathName.indexOf(".png" || ".jpg");
                            //console.log("isMin:"+isMin);
                            if(isMin<0 && isJs>0){
                                var key = pathName.substring(pathName.lastIndexOf('/lib/'),pathName.indexOf(".js"));
                                if(key.length>0){
                                    //console.log("key:" + key+",pathName:./"+pathName.replace('src/', ''));
                                    entryObject[key] = "./"+pathName.replace('src/', '');
                                }
                            }else{
                                if(!isPic){
                                    var reDir = pathName.substring(pathName.lastIndexOf('/lib/'),pathName.length);
                                    var createPath=path.resolve(__dirname, 'dist/V0.1'+reDir);
                                    console.log("创建文件路径："+createPath);
                                    fs.writeFile(createPath,"111",function(err){
                                        if (err) {
                                            console.log("创建失败"+err);
                                            //throw err;
                                        }else{
                                            console.log("创建成功"+createPath);
                                        }
                                    });
                                    fs.createReadStream("./"+pathName).pipe(fs.createWriteStream(createPath));
                                }
                            }

                        }
                    });

                }
            }
        }
    }
    return entryObject;
}
/*遍历文件夹下的所有文件*/
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
            //fs.createReadStream("./src/lib/"+file).pipe(fs.createWriteStream("./dist/V0.1/lib"));
        } else {
            //string(pathname);
            callback(pathname);
        }
    });
}

/*获取第n次出现的位置*/
function find(str,cha,num){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}

this.zipFile=function(){
    /*压缩文件夹供下载使用*/
    var zipSrcFiles = glob.sync('./dist/V0.1/lib/**');
    var folders="";
    console.log("共有文件："+zipSrcFiles.length);
    for(var i=0;i<=zipSrcFiles.length;i++){
        if(i<zipSrcFiles.length){
            /*获取所有文件夹*/
            var start=find(zipSrcFiles[i], '/',3)+1;
            var end=find(zipSrcFiles[i], '/',4);
            if(end>-1){
                var folder=zipSrcFiles[i].substring(start,end);
                var isExt=folders.indexOf(folder);
                if(isExt<1){
                    folders+=folder+",";
                }
                //console.log("文件名:"+folder+"----folders:"+folders+"---"+start+","+end);

            }
        }else{
            /*对文件夹进行压缩*/
            console.log("folders:"+folders);
            var folderArr = folders.split(",");
            console.log("folderArr:"+folderArr[9]);
            /*for(var i=1;i<folderArr.length-1;i++){
                var folderName=folderArr[i];
                fstream.Reader({'path':"./dist/V0.1/lib/"+folderName,'type':'Directory'})
                    .pipe(tar.Pack())
                    .pipe(zlib.Gzip())
                    .pipe(fstream.Writer({'path':'./dist/V0.1/zip/'+folderName+'.tar.gz'}));
            }*/


        }

    }

}
this.zipFile();