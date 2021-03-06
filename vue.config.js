const CompressionPlugin = require('compression-webpack-plugin')
module.exports= {
    devServer:{
        open:true,
        port:80,
    },
    publicPath: './',
    productionSourceMap:false,
    configureWebpack:config =>{
        if(process.env.NODE_ENV === 'production'){
            return{
                plugins:[
                    new CompressionPlugin({
                        test:/\.js$|\.html$|\.css/,  //匹配文件名
                        threshold:10240,  //对超过10K的数据压缩
                        deleteOriginalAssets:false ,//是否删除源文件
                    })
                ]
            }
        }
    }
}