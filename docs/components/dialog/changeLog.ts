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
                type: 'fix',
                description: '修复弹窗打开时页面抖动的问题',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
