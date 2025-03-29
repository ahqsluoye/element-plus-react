import { defineConfig } from 'dumi';
import { NAV, SIDEBAR } from './config';

export default defineConfig({
    outputPath: 'docs-dist',
    title: '一个 React UI 框架 | Element Plus',
    base: process.env.NODE_ENV === 'production' ? '/element-plus-react/' : '/',
    publicPath: process.env.NODE_ENV === 'production' ? '/element-plus-react/' : '/',
    themeConfig: {
        name: 'element-plus-react',
        nav: NAV,
        sidebar: SIDEBAR,
    },
    alias: {
        '@': process.cwd() + '/.dumi',
        '@qsxy/element-plus-react': process.cwd() + '/src',
    },
    chainWebpack(config) {
        config.module // 配置 file-loader
            .rule('otf')
            .test(/\.(woff|woff2|eot|ttf|otf)(\?v=\d+\.\d+\.\d+)?$/)
            .use('file-loader')
            .loader('file-loader')
            .options({
                publicPath: '../../../',
                name: 'fonts/[name].[ext]',
            });
    },
    // plugins: [
    //     // 绝对路径
    //     `${__dirname}/.dumi/theme/plugin1.ts`,
    // ],
    sassLoader: {},
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
