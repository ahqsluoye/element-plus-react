import { defineConfig, IDumiUserConfig } from 'dumi';
import { NAV, SIDEBAR } from './config';

export default defineConfig<IDumiUserConfig>({
    outputPath: 'docs-dist',
    title: '一个 React UI 框架 | Element Plus React',
    base: process.env.NODE_ENV === 'production' ? '/element-plus-react/' : '/',
    publicPath: process.env.NODE_ENV === 'production' ? '/element-plus-react/' : '/',
    themeConfig: {
        name: 'element-plus-react',
        nav: NAV,
        sidebar: SIDEBAR,
        editLink: true,
    },
    locales: [
        { id: 'zh-CN', name: '中文' },
        { id: 'en-US', name: 'English' },
    ],

    alias: {
        '@': process.cwd() + '/.dumi',
        '@qsxy/element-plus-react': process.cwd() + '/src/components/',
        '@theme-chalk': process.cwd() + '/src/theme-chalk/',
    },
    analytics: {
        // 百度统计的 key
        baidu: 'eb09046bc8b443d9d9079a1ef0115dd1',
    },
    // 文档标题 id 重写插件（编译期 rehype + 运行时 DOM 双阶段生效）
    headingIdRewriter: {
        // 是否启用插件
        enabled: true,
        // id 生成格式：github(保持 dumi 原生 slug) | kebab | snake | camel | pascal | lower | upper
        format: 'kebab',
        // 统一前缀 / 后缀
        prefix: '',
        suffix: '',
        // 自定义生成规则（最终覆盖，返回空值时回退默认规则；请勿依赖外部闭包变量）
        // transform: (id, { level, text, oldId, index }) => `doc-${level}-${id}`,
        // 固定映射：原始 id（或标题文本） -> 指定 id，优先级最高
        // map: { '快速开始': 'quick-start' },
        // 全局固定 id 值（多标题重复时自动追加 -2、-3 后缀）
        // fixedId: '',
        // 处理的标题级别
        levels: [1, 2, 3, 4, 5, 6],
        // 是否在编译期重写 markdown 源（保持 TOC/SSG 一致）；关闭后仅运行期重写 DOM
        rewriteSource: true,
        // 运行期是否同步锚点链接与 URL hash
        rewriteAnchors: true,
        // 运行期作用域容器与自定义标题选择器
        container: 'body',
        selector: '',
        // 调试日志
        debug: false,
    },
    reactCompiler: {
        target: '19',
    },
    chainWebpack(con) {
        // config.module // 配置 file-loader
        //     .rule('otf')
        //     .test(/\.(woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/)
        //     .use('file-loader')
        //     .loader('file-loader')
        //     .options({
        //         publicPath: '../../../',
        //         name: 'fonts/[name].[ext]',
        //     });
        con.module
            .rule('scss')
            .test(/\.(css|scss|sass)$/i)
            .use('sass-loader')
            .loader('sass-loader');
    },
    // plugins: [
    //     // 绝对路径
    //     `${__dirname}/.dumi/theme/plugin1.ts`,
    // ],
    sassLoader: {
        // implementation: require('dart-sass'),
    },
    // extraBabelPresets: [
    //     [
    //         '@babel/env',
    //         {
    //             loose: true,
    //             modules: false,
    //         },
    //     ],
    //     '@babel/preset-react',
    // ],
    extraBabelPlugins: [
        // [
        //     '@babel/plugin-proposal-decorators',
        //     {
        //         legacy: true,
        //     },
        // ],
        // [
        //     '@babel/plugin-proposal-class-properties',
        //     {
        //         loose: true,
        //     },
        // ],
        '@babel/plugin-transform-runtime',
        [
            'prismjs',
            {
                // languages: 'all',
                languages: ['bash', 'powershell', 'tsx', 'scss'],
                // plugins: ['line-numbers'],
                // theme: 'twilight',
                css: true,
            },
        ],
    ],
});
