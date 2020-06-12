module.exports = {
      devServer: {// 环境配置
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
          '/*': {
    //         target: 'http://47.101.157.241:8090',
            target: 'http://192.168.108.85:8090',
    //         target: 'http://127.0.0.1:8090',
            changeOrigin: true, //允许跨域
            pathRewrite: {       //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
             '^/api': ''
             }
          },
        }
      },
    }