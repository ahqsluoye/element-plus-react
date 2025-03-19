module.exports = {
    pluginSearchDirs: false,
    plugins: [require.resolve('prettier-plugin-organize-imports'), require.resolve('prettier-plugin-packagejson')],
    // 字符串使用单引号
    singleQuote: true,
    // 每行末尾自动添加分号
    semi: true,
    // 行末尾自动添加逗号
    trailingComma: 'all',
    // always 总是有括号
    arrowParens: 'avoid',
    // 换行长度，默认80
    printWidth: 180,
    // 在jsx中把'>' 不单独放一行
    jsxBracketSameLine: false,
    // tab缩进大小,默认为2
    tabWidth: 4,
    // 使用tab缩进，默认false
    useTabs: false,
    // proseWrap: 'never',
    overrides: [
        {
            files: '*.md',
            options: {
                proseWrap: 'preserve',
            },
        },
    ],
};
