//加载nodejs内置模块path,使用path模块获取当前配置文件所在目录
const path=require('path');
//加载html-webpack-plugin模块
const HtmlWebpackPlugin=require("html-webpack-plugin");
const CopyWebpackPlugin=require("copy-webpack-plugin");
//commonjs es5
//module代表当前模块
//exports模块对外输出的接口
const webpack=require('webpack');


module.exports={
    //entry:入口文件配置项，指定模块加载的入口模块    
    entry:'./src/js/index.js',
    //output:打包配置项
    output:{
        //path 打包目录
        path:path.resolve(__dirname,'dist'),
        //打包生成的文件
        filename:'js/bundle.js'
    },
    //plugins 插件配置项
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
        new webpack.ProvidePlugin({
            React:'react',
            ReactDOM:'react-dom'
          }),
        //   new CopyWebpackPlugin([{
        //     from: __dirname + '/src/js/mock',
        //     to:__dirname+"/dist/mock"
        //     }])
            

        // ,
        // new CleanWebpackPlugin(['dist'])
      ],
      module:{
		loaders:[{
            test:/\.css$/,
            loader:'style-loader!css-loader'
        },{
            test: /\.jsx?$/,//表示要编译的文件的类型，这里要编译的是js文件
            loader: 'babel-loader',//装载的哪些模块
            exclude: /node_modules/,//标识不编译node_modules文件夹下面的内容
            // query: {//具体的编译的类型，
            //     compact: false,//表示不压缩
            //     presets: ['es2015','react']//我们需要编译的是react
            // }
        }
        // ,
        // {
		// 	test:/\.(jpg|png|gif)$/,
		// 	loader:'file-loader'
	    // }
         , {
            test:/\.(jpg|png|gif)$/,
            loader:'url-loader',
            options:{
              limit:10000,//限制小于10000字节,进行url编码,大于10000字节的图片，同file-loader
              name:'img/[name]_[hash].[ext]'
            }
          },
          {
            test:/\.(eot|svg|ttf|woff|woff2)$/,
            loader:'file-loader',
            options:{
                name:'fonts/[name]_[hash].[ext]'
               }
       
       }

      

    
       ]
    },
    resolve:{
        extensions:['.jsx','.less','.js','.css']
    }
    // ,
    // devServer:{
    //   open:true,
    //   publicPath:"/"
    // } 
}