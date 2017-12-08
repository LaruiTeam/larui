/**
 * Created by EasyLiang on 2017/11/23.
 */
/*整理所有入口文件，格式为{key：path,key:path.....}*/
//var debug = process.env.NODE_ENV !== "production";
var glob=require("glob");
var path = require('path');
var fs = require("fs");
var zipper = require("zip-local");
this.componentList=[];
this.libList=[];
this.libFilesList=[];
this.deal=function(files,lib,libFiles){
    //var entryObject={componentAll:'./index.js',vendor:'jquery'};
    var entryObject={componentAll:'./index.js'};
    for(var i=0;i<=files.length;i++) {
        if (i < files.length) {
            //larui研发组件
            var key=files[i].substring(files[i].lastIndexOf('/')+1,files[i].indexOf('.js'));
            if(key.indexOf("lar")>-1){
                entryObject[key]=files[i].replace('src/','');
                console.log("压缩"+key);
                //this.componentList.push({[key]:files[i].replace('src/','')});
            }

        } else {
            for (var j = 0; j <= lib.length; j++) {
                //第三方单独文件
                if (j < lib.length) {
                    var isMin=lib[j].indexOf("min");
                    //console.log("isSinglwMin:"+isMin);
                    if(isMin<0){
                        var key="/lib/"+lib[j].substring(lib[j].lastIndexOf('/')+1,lib[j].indexOf('.js'));
                        entryObject[key]=lib[j].replace('src/','') ;
                        //var a={};
                        //a[key]=lib[i].replace('src/','');
                        //this.libList.push(a);
                    }else if(isMin>0){
                        //console.log(lib[j]+"是压缩文件");
                        var filePath=lib[j];
                       fs.readFile(lib[j], 'utf-8', function(err, data) {
                            if (err) {
                                console.log("读取失败");
                            } else {
                                var key=filePath.substring(filePath.lastIndexOf('/')+1,filePath.length);
                                //console.log(filePath+":"+"读取成功"+key);
                                var fileDestPath="./dist/V0.1/lib/"+key
                                writeFile(fileDestPath,data)
                                return data;
                            }
                        });
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
                                    entryObject[key] = "./"+pathName.replace('src/', '');
                                }
                            }else{
                                var reDir = pathName.substring(pathName.lastIndexOf('/lib/'),pathName.length);
                                var createPath=path.resolve(__dirname, 'dist/V0.1'+reDir);
                                var mkdir=createPath.substring(0,createPath.lastIndexOf('\\'));
                                var hasDir=fs.existsSync(mkdir);
                                //console.log("文件夹是否存在："+hasDir+"???"+createPath+"创建路径：:"+mkdir);
                                if(!hasDir){
                                    makeDir(mkdir);
                                }
                                    /*if(createPath.indexOf("css")){ //css进行跟踪--暂时不做压缩处理
                                        console.log("css文件路径："+createPath);
                                    }*/
                                fs.createReadStream("./"+pathName).pipe(fs.createWriteStream(createPath)).on('error', function(error){
                                    console.log('writeStream error', error.message);
                                });
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
        } else {
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

//把指定路径下的一级文件夹压缩为压缩文件，目前供下载使用,部署（提交github）前用node运行本脚本即可，folderPath:./dist/V0.1/lib/**/
this.zipFile=function(folderPath){
    var zipSrcFiles = glob.sync(folderPath);
    var folders="";
    //console.log("共有文件："+zipSrcFiles.length);
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
            //console.log("共有文件："+folders);
            var hasZipFolder = glob.sync("./dist/V0.1/zip/");
            if(hasZipFolder=="" || hasZipFolder==" "){
                //console.log("开始创建zip目录了");
                fs.mkdirSync("./dist/V0.1/zip");
            }
            for(var n=1;n<folderArr.length-1;n++){
                console.log("folderArr:"+folderArr[n]);
                var folderName=folderArr[n];
                console.log("folder:"+"./dist/V0.1/lib/:"+folderName);
                zipper.sync.zip("./dist/V0.1/lib/"+folderName).compress().save("./dist/V0.1/zip/"+folderName+".zip");
            }
        }
    }
}

function makeDir(path){  //规范：path最后必须不是以\结尾
    var faDir=path.substring(0,path.lastIndexOf('\\'));
    var hasFaDir=fs.existsSync(faDir);
    if(!hasFaDir){
        makeDir(faDir);
    }else{
        console.log("父级文件夹存在，直接创建文件夹："+path+"");
        fs.mkdirSync(path);
    }
}
//this.zipFile("./dist/V0.1/lib/**/");

this.getComponents=function(){
    var comps = glob.sync('./src/component/lar-*/*.js');
    var lib = glob.sync('./src/lib/*.js');
    var libFiles = glob.sync('./src/lib/**/**');

    console.log(comps[0]+"iii");
    var str=leftMenu(comps);

  /*  fs.appendFile('./demo/src/pug/common/menu.pug',str,[{'flag':'}'}],function(err)
    {if (err)  console.log("error:"+str); });
    console.log("./demo/src/pug/common/menu.pug:"+str);*/
    console.log("str:"+str)
    fs.writeFile('./demo/src/pug/common/menu.pug', str, function (err) {
        console.log(str);
    });
}

this.getComponents();

function writeFile(fileDestPath,data){
    console.log(fileDestPath+"路径");
    if (!fs.existsSync(fileDestPath)) {
        fs.open(fileDestPath, "w", function (err, fd) {
        });
    }
    fs.writeFile(fileDestPath,data,'utf8',function(error){
        if(error){
            throw error;
        }else{
            console.log(fileDestPath+"文件已保存");
        }
    });
}

function leftMenu(comps){
    var componentList=[{}];
    console.log(comps.length+"个文件");
    var j=0;
    for(var i=0;i<=comps.length;i++){
        //console.log(comps[i]+"iii");
        if(i<comps.length){
            var key=comps[i].substring(comps[i].lastIndexOf('/')+1,comps[i].indexOf('.js'));
            if(key.indexOf('lar')>-1){
                componentList[j]=JSON.stringify(componentList[j]);
                var replaceUrl=componentList[j];
                replaceUrl=replaceUrl.replace('"baseUrl','baseUrl + "')
                componentList[j]=replaceUrl;
                j++;
            }
        }else{
            console.log("共有研发组件"+j+"个");
            var str='mixin leftMenu(baseUrl)\n'
                +'      - var componentMenus = ['+componentList.toString()+']\n'
                +'      div.componentMenus \n'
                +'          ul\n'
                +'              li.title \n'
                +'                  span 组件列表 \n'
                +'              each item in componentMenus \n'
                +'                  li \n'
                +'                      - var menuName=item.menuName\n'
                +'                      a(href=item.link) #{menuName} \n'
                +'      div.styleMenus \n'
                +'          ul \n'
                +'              li.title \n'
                +'                  span 样式 \n'
                +'              each item in componentMenus \n'
                +'                  li \n'
                +'                      - var menuName=item.menuName \n'
                +'                      a(href=item.link) #{menuName} \n'

            return str;
        }
     }
}