var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    context: path.join(__dirname)+'/src',
    /*devtool: debug ? "inline-sourcemap" : null,*/
    //entry: "./demo/lar-gallery/gallery.js",
    //entry: "./index.js",
    entry: {larui:"./index.js",gallery:"./component/lar-gallery/gallery.js"},
    module: {
        loaders: [
            {
                test: /\.js?$/,
                /*exclude:[/node_modules/
                    //path.resolve(__dirname, "node_modules"),
                    path.resolve(__dirname, "src/demo"),
                ] ,*/
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
        path:path.resolve(__dirname, 'dist'),
        filename:"[name].js",
        //filename: "util.js",
        //filename: "util.[hash:8].js",
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
