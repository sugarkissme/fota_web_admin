module.exports = {
      devServer: {// 环境配置
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
          '/api': {
            target: 'http://47.101.157.241:8090',
    //         target: 'http://localhost:8090',
            changeOrigin: true, //允许跨域
            pathRewrite: {       //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
             '^/api': ''
            }
          },
        }
    
      },
        //警告 webpack 的性能提示
        configureWebpack : {
            performance: {
                hints:'warning',
                //入口起点的最大体积 整数类型（以字节为单位）
                maxEntrypointSize: 50000000,
                //生成文件的最大体积 整数类型（以字节为单位 300k）
                maxAssetSize: 30000000,
                //只给出 js 文件的性能提示
                assetFilter: function(assetFilename) {
                    return assetFilename.endsWith('.js');
                }
            }
        }
    }