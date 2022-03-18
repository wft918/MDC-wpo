const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: "/",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set('@/', resolve('src'))
    // config
    //   .plugin('html')
    //   .tap(args => {
    //     args[0].title = '智能一体化管控平台'
    //     return args
    //   })
  },


  // easy-player  相关
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'node_modules/@easydarwin/easyplayer/dist/component/EasyPlayer.swf',
          to: './libs/EasyPlayer/'
        },
        {
          from: 'node_modules/@easydarwin/easyplayer/dist/component/crossdomain.xml',
          to: './libs/EasyPlayer/'
        },
        {
          from: 'node_modules/@easydarwin/easyplayer/dist/component/EasyPlayer-lib.min.js',
          to: './libs/EasyPlayer/'
        }
      ])
    ]
  },

  
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
        },
        javascriptEnabled: true,
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    port: 8888, // 端口号，如果端口号被占用，会自动提升1
    proxy: {  // 开发环境代理配置
      '/api': {  // 意思是当请求是以 api 开头的请求，都走代理
        target: process.env.VUE_APP_SERVER_URL,
        changeOrigin: true,   // 开启代理服务器，就会给你代理转发
        pathRewrite: {
          '^/api': '',  // 就是将请求地址中的 /api 前缀替换成空的
        }
      },
      '/elseapi': {
        target: process.env.VUE_APP_SERVER_ELSE_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/elseapi': '',
        }
      },
    }
  },
  lintOnSave: false, // 关闭格式检查
  productionSourceMap: false, // 打包时不会生成 .map 文件，加快打包速度
}