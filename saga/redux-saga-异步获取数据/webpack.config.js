const CleanWebpackPlugin=require('clean-webpack-plugin');
const config=require("./webpack.config.base");
config.plugins.push( new CleanWebpackPlugin(['dist']));
module.exports=config;