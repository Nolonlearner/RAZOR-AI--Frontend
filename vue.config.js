//vue.config.js 是 Vue CLI 项目的配置文件，用于对项目的默认配置进行自定义。
//自定义 Vue CLI 的默认配置，如配置代理、修改打包目录等。
const { defineConfig } = require('@vue/cli-service');//引入defineConfig方法
module.exports = defineConfig({
  transpileDependencies: true,//是否使用 babel-loader 对 node_modules 中的依赖进行转译
  devServer: {// 开发服务器配置
    proxy: {
      '/api': {// 代理的路径规则
        target: 'http://localhost:3000', // 代理的目标服务器地址
        changeOrigin: true, // 是否改变请求头中的来源
        pathRewrite: {
          '^/api': '', // 重写路径，将/api开头的请求路径去掉/api部分
        },
      },
    },
  },
  outputDir: 'dist', // 自定义构建文件的输出目录
  assetsDir: 'static', // 指定静态资源文件的目录
  pages: {// 多页面配置
    index: {// 配置首页入口
      entry: 'src/main.js', // 入口文件
      template: 'public/index.html', // 模板文件
      filename: 'index.html', // 输出文件名
      title: 'ROZAR-AI', // 义网页标题
    },
  },
});

/**
 * module.exports = {
  devServer: {
    proxy: 'http://localhost:5000'  // 根据后端服务地址调整
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    // 其他 Webpack 配置
  }
}
devServer.proxy:

这是用于配置开发服务器代理的选项。
当你在开发环境中进行 API 请求时，这些请求将被代理到指定的后端服务器地址（例如 http://localhost:5000）。
这对于解决跨域问题和开发环境中的后端 API 测试非常有用。
lintOnSave:

这个选项用于配置是否在每次保存文件时进行代码检查（lint）。
当环境变量 NODE_ENV 不等于 production 时（即在开发环境中），会启用代码检查。这可以帮助在开发过程中及时发现并修复代码中的问题。
configureWebpack:

这里你可以自定义 Webpack 的配置。
你可以在这个选项中添加或覆盖默认的 Webpack 配置，例如添加新的插件、定义别名、配置加载器等。
 */
