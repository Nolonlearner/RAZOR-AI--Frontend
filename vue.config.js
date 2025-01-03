//vue.config.js 是 Vue CLI 项目的配置文件，用于对项目的默认配置进行自定义。
//自定义 Vue CLI 的默认配置，如配置代理、修改打包目录等。
const { defineConfig } = require('@vue/cli-service'); //引入defineConfig方法
module.exports = defineConfig({
  transpileDependencies: true, //是否使用 babel-loader 对 node_modules 中的依赖进行转译
  devServer: {
    // 开发服务器配置
    proxy: {
      '/api': {
        // 代理的路径规则
        target: 'http://47.99.66.142:5000', // 代理的目标服务器地址
        //target: 'http://localhost:5000', // 代理的目标服务器地址
        changeOrigin: true, // 是否改变请求头中的来源
        pathRewrite: {
          '^/api': '', // 重写路径，将/api开头的请求路径去掉/api部分
        },
      },
    },
  },
  outputDir: 'dist', // 自定义构建文件的输出目录
  assetsDir: 'static', // 指定静态资源文件的目录
  pages: {
    // 多页面配置
    index: {
      // 配置首页入口
      entry: 'src/main.js', // 入口文件
      template: 'public/index.html', // 模板文件
      filename: 'index.html', // 输出文件名
      title: 'RAZOR-AI', // 义网页标题
    },
  },
});
