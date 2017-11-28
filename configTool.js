/**
 * Created by EasyLiang on 2017/11/23.
 */
/*整理所有入口文件，格式为{key：path,key:path.....}*/
var glob=require("glob");
var path = require('path');
var fs = require("fs");
/*压缩文件夹*/
/*var fstream=require('fstream');
var tar=require('tar');
var zlib=require('zlib');*/
var archiver = require('archiver');
var zipper = require("zip-local");

this.deal=function(files,lib,libFiles){
    //var entryObject={componentAll:'./index.js',vendor:'jquery'};
    var entryObject={componentAll:'./index.js'};
    //this.zipFile('./dist/V0.1/lib/**');
    for(var i=0;i<=files.length;i++) {
        if (i < files.length) {
            //larui研发组件
            var key=files[i].substring(files[i].lastIndexOf('/')+1,files[i].indexOf('.js'));
            entryObject[key]=files[i].replace('src/','');
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
                            if(isMin<0 && isJs>0){  //没有压缩的js文件进行压缩
                                var key = pathName.substring(pathName.lastIndexOf('/lib/'),pathName.indexOf(".js"));
                                if(key.length>0){
                                    //console.log("key:" + key+",pathName:./"+pathName.replace('src/', ''));
                                    entryObject[key] = "./"+pathName.replace('src/', '');
                                }
                            }else{
                                //if(isPic>-1){ //非图片信息直接复制,文件夹是否存在

                                    //console.log("是否是图片："+isPic+pathName);
                                var reDir = pathName.substring(pathName.lastIndexOf('/lib/'),pathName.length);
                                var createPath=path.resolve(__dirname, 'dist/V0.1'+reDir);
                                var mkdir=createPath.substring(0,createPath.lastIndexOf('\\'));
                                var hasDir=fs.existsSync(mkdir);
                                console.log("文件夹是否存在："+hasDir+"???"+createPath+"创建路径：:"+mkdir);
                                if(!hasDir){
                                    makeDir(mkdir);
                                }
                                    /*if(createPath.indexOf("css")){ //css进行跟踪
                                        console.log("css文件路径："+createPath);
                                    }*/

                                   /* console.log("创建文件路径："+createPath);
                                    fs.writeFile(createPath,"111",function(err){
                                        if (err) {
                                            console.log("创建失败"+err);
                                            //throw err;
                                        }else{
                                            console.log("创建成功"+createPath);
                                        }
                                    });*/
                                    fs.createReadStream("./"+pathName).pipe(fs.createWriteStream(createPath)).on('error', function(error){
                                        console.log('writeStream error', error.message);
                                    });
                                //}
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

/*压缩指定路径下的一级文件夹为压缩文件，目前供下载使用*/
this.zipFile=function(folderPath){
    var zipSrcFiles = glob.sync(folderPath);
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
            }
        }else{
            /*对文件夹进行压缩*/
            var folderArr = folders.split(",");
            for(var n=1;n<folderArr.length-1;n++){
                var folderName=folderArr[n];
                console.log("folder:"+"./dist/V0.1/lib/"+folderName+"/**");
                zipper.sync.zip("./dist/V0.1/lib/"+folderName).compress().save("./dist/V0.1/zip/"+folderName+".zip");
            }

        }

    }

}

function makeDir(path){
    //var hasDir=fs.existsSync(path);
    //console.log("文件夹是否存在："+hasDir+"???"+createPath+"创建路径：:"+mkdir);
    var faDir=path.substring(0,path.lastIndexOf('\\'));
    var hasFaDir=fs.existsSync(faDir);
    if(!hasFaDir){
        makeDir(faDir);
    }else{
        console.log("父级文件夹存在，直接创建文件夹："+path+"");
        fs.mkdirSync(path);
    }
}