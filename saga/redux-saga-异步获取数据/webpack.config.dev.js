const config=require("./webpack.config.base");
config.devServer={
    open:true,
    publicPath:"/"
  } 

  module.exports=config;