import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-03',
        version: '2.0.0',
        entries: [
            {
                type: 'refactor',
                description: '重构抽屉组件，优化API和使用方式',
                author: 'ahqsluoye',
            },
        ],
    },
    {
        date: '2026-07-14',
        version: '2.0.1',
        entries: [
            {
                type: 'bugfix',
                description: '修复点击弹窗组件里的选择器类组件后，弹窗自动关闭的问题',
                author: 'ahqsluoye',
            },
            {
                type: 'bugfix',
                description: '修复弹窗组件内的InputNumber组件增减按钮无法触发事件的问题',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
