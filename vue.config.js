const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
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
