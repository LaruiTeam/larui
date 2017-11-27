var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var glob=require("glob");
var comps = glob.sync('./src/component/lar-*/*.js');
var lib = glob.sync('./src/lib/*.js');
var libFiles = glob.sync('./src/lib/**/**');
var tool = require('./configTool');
module.exports = {
    context: path.join(__dirname)+'/src',
    entry: tool.deal(comps,lib,libFiles),
    /*devtool: debug ? "inline-sourcemap" : null,*/
    //entry: "./index.js",
    //entry: {componentAll:"./index.js",gallery:"./component/lar-gallery/gallery.js",openAndClose:"./component/lar-openAndClose/openAndClose.js"},
    module: {
        loaders: [
            {
                test: /\.js?$/,
                include:[path.resolve(__dirname, "component")],
                loader: 'babel-loader',
               /* query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }*/
            },
            //下面是使用 ant-design 的配置文件
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            //使用pug-html-loader
           /* {
                test:/\.pug$/,
                exclude: ['/node_modules/'],
                loader: 'pug-html-loader',
                query: {
                    data: {name:'test'},
                    pretty: true
                }
            },*/
        ]
    },
    output: {
        path:path.resolve(__dirname, 'dist/V0.1'),
        filename:"[name].min.js",
        chunkFilename: "[name].bundle.js"
    },
   externals: {
        jquery: 'window.$'
   },
    plugins: [
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.OccurenceOrderPlugin(),
        //new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        //new CommonsChunkPlugin({names:['vendor','vendor.js']}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],
};
