/*
 * @Date: 2019-09-06 10:20:12
 * @LastEditTime: 2019-09-06 16:07:56
 * @descript: 描述头文件
 * @Author: Wisam
 */
const HtmlWebpackPlugin=require("html-webpack-plugin")
const webpack=require("webpack")
const MiniCssExtactPlugin=require("mini-css-extract-plugin")
module.exports={
    //需要打包的输入文件
    entry:{
        index1:"./src/index.js"
    },
    //打包的输出文件
    output:{
        filename:"[name].js",//[name].js代表输出文件的名字,这里是index1.js
        path:__dirname+"/dist"//__dirname 代表当前的绝对路径  (这里不能用相对路径,只能用绝对路径)
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:['style-loader', MiniCssExtactPlugin.loader,"css-loader"]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                                limit:8192
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtactPlugin.loader,"css-loader","sass-loader"
                ]
            },
            {
                test:/\.ts$/,
                use:["ts-loader"]
            },
        ]
    },
    plugins:[
        
        //生成html入口文件的插件
        new HtmlWebpackPlugin({
            title: 'My App',//标题的名字
            filename: './index.html',//打包后生成的html名字
            template:"./src/temp.html",//模板,可省略
        }),
        //全局的自定义变量的插件
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("5fa3b9"),
           "process.env.NODE_ENV":JSON.stringify("999999999999"),
       }),
       
       //将css文件分开打包
       new MiniCssExtactPlugin({
        filename:"[name].css",
        chunkFilename:"[id].css"
       }),
        
    ]
}