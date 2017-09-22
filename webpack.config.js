var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");



module.exports = {
    context: path.join(__dirname)+'/src',
    /*devtool: debug ? "inline-sourcemap" : null,*/
    //entry: "./demo/lar-gallery/galleryTemplate.js",
    //entry: "./index.js",
    entry: {index:"./index.js",galleryTemplate:"./demo/lar-gallery/galleryTemplate.js"},
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude:[/node_modules/
                    //path.resolve(__dirname, "node_modules"),
                    //path.resolve(__dirname, "src/demo"),
                ] ,
                //include:[/src/component/],
                loader: 'babel-loader',
               /* query: {
                    presets: ['react', 'es2015'],
                    plugins: ['react-html-attrs'], //添加组件的插件配置
                }*/
            },
            //下面是使用 ant-design 的配置文件
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    output: {
        path:path.join(__dirname, "src")+"/dist",
        //filename: "./src/bundle.js"
        filename: "[name].js",
        chunkFilename: "[name].bundle.js"
    },
   /* externals: {
        jquery: 'window.$'},*/
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        //new CommonsChunkPlugin({name:"common"})
    ],
};
