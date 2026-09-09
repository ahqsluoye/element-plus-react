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
