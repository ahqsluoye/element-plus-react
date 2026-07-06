import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-06',
        version: '2.0.0',
        entries: [
            {
                type: 'feature',
                description: '为表单项添加帮助图标功能并优化样式',
                author: 'ahqsluoye',
            },
            {
                type: 'refactor',
                description: '实现自动计算标签宽度功能，优化表单样式与文档',
                author: 'ahqsluoye',
            },
            {
                type: 'refactor',
                description: '统一表单组件命名为El前缀并重构导出结构',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
