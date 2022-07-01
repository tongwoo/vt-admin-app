const moment = require("moment");

module.exports = {
    //发布路径
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    //发布生成的应用文件夹名称
    outputDir: 'app',
    //发布生成的资源文件夹名称
    assetsDir: 'assets',
    //Webpack设置
    configureWebpack: {
        //开发工具的SourceMap生成选项
        devtool: process.env.VUE_APP_SOURCE_MAP_TYPE
    },
    //Webpack设置
    chainWebpack: (config) => {
        //不对图片进行转base64处理
        config.module.rule('images').use('url-loader').tap((options) => {
            options.limit = false;
            options.encoding = false;
            return options;
        });
        //在index.html中嵌入打包时间
        config.plugin('html').tap((options) => {
            options[0].publishTime = moment().format('YYYY-MM-DD HH:mm:ss');
            return options;
        });
    },
    //开发配置
    devServer: {
        port: 50000,
        open: true,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            //接口路径和映射地址，不要修改此处，酌情修改 .env.development 文件
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_BASE_API_TARGET,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
}
