// module.exports = {
//   printWidth: 800, // 单行宽度限制
//   tabWidth: 2, // tab 使用两个空格
//   useTabs: false, // 不使用制表符缩进，使用空格缩进
//   semi: false, // 代码需要分号结尾
//   singleQuote: true, // 单引号
//   bracketSpacing: true, // 对象左右两侧需要空格
//   jsxBracketSameLine: false, // html 关闭标签换行
//   arrowParens: 'avoid', // 单参数的箭头函数参数不需要括号
//   proseWrap: 'never', // 参考 https://prettier.io/docs/en/options.html#prose-wrap
//   trailingComma: 'none', // 参考 https://prettier.io/docs/en/options.html#trailing-commas
//   extends: [
//     // 继承 vue 的标准特性
//     'plugin:vue/essential',
//     'eslint:recommended',
//     // 避免与 prettier 冲突
//     'plugin:prettier/recommended'
//   ]
// }

module.exports = {
  // 最大长度80个字符
  printWidth: 800,
  // 行末分号
  semi: false,
  // 单引号
  singleQuote: true,
  // JSX双引号
  jsxSingleQuote: false,
  // 尽可能使用尾随逗号（包括函数参数）
  trailingComma: 'none',
  // 在对象文字中打印括号之间的空格。
  bracketSpacing: true,
  // > 标签放在最后一行的末尾，而不是单独放在下一行
  jsxBracketSameLine: false,
  // 箭头圆括号
  arrowParens: 'avoid',
  // 在文件顶部插入一个特殊的 @format 标记，指定文件格式需要被格式化。
  insertPragma: false,
  // 缩进
  tabWidth: 2,
  // 使用tab还是空格
  useTabs: false,
  // 行尾换行格式
  endOfLine: 'auto',
  HTMLWhitespaceSensitivity: 'ignore',
  extends: [
    // 继承 vue 的标准特性
    'plugin:vue/essential',
    'eslint:recommended',
    // 避免与 prettier 冲突
    'plugin:prettier/recommended'
  ]
}
