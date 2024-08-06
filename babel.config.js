module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
};
/**
 * module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}
  presets:

presets 是一组预定义的 Babel 插件的集合，用于简化配置。
@vue/cli-plugin-babel/preset 是一个 Vue CLI 提供的 Babel 预设，包含了一些适用于 Vue 项目的常用转换插件。
plugins:

你可以单独添加 Babel 插件，以扩展 Babel 的功能。
@babel/plugin-transform-runtime 插件用于优化编译后的代码。它可以减少冗余的辅助代码（helper functions），通过引用 Babel 的运行时（runtime）库，从而减小输出文件的大小并提高性能。
 */
