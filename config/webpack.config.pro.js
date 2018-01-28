const path=require("path")
const webpack=require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')  
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports={
    entry:{
        app:path.join(process.cwd(),"src/index.js"),
        vendor: ['react', 'react-dom']
    },
    output:{
        path:path.join(process.cwd(),"dist/"),
        filename:"js/"+"[name]-[hash:6].js",
        publicPath:""
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.(sass|scss)$/,
                loader:ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader","sass-loader"]
                }),

            },
            {
                test:/\.js$/,
                loader:"babel-loader",
                exclude: /node_modules/ 
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader:"url-loader?limit=1024&name=img/[name].[ext]?[hash:6]"
            }

        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    devtool: false,

    resolve: { 
        extensions: ['*', '.js', '.jsx', '.json']
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',         
            template: process.cwd()+'/src/index.html'      
        }),
        new ExtractTextPlugin("css/[name].css"),
        new CleanWebpackPlugin(path.join(process.cwd(),"/dist/")),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "js/"+"[name].js"
        })
    ]

}