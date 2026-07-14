import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-03',
        version: '2.0.0',
        entries: [
            {
                type: 'refactor',
                description: '重构Dialog组件，简化子组件使用方式',
                author: 'ahqsluoye',
            },
            {
                type: 'refactor',
                description: '优化弹窗组件结构，移除冗余子组件用法',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '新增拖拽弹窗、自定义动画与遮罩样式优化',
                author: 'ahqsluoye',
            },
            {
                type: 'bugfix',
                description: '修复弹窗打开时页面抖动的问题',
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
            {
                type: 'refactor',
                description: '优化锁屏滚动锁定逻辑',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
