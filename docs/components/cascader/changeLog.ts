import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-06',
        version: '2.0.0',
        entries: [
            {
                type: 'feature',
                description: 'add maxCollapseTagsTooltipHeight prop and optimize related logic',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '新增级联面板组件，优化级联选择器代码',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: 'add nodeFormatter prop to support custom node content',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: 'add suggestionItemFormatter prop to customize dropdown suggestion items',
                author: 'ahqsluoye',
            },
            {
                type: 'refactor',
                description: '重构类型命名与API参数调整',
                author: 'ahqsluoye',
            },
            {
                type: 'bugfix',
                description: '实现级联选择器任意层级选择功能',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '新增多选折叠标签、清空按钮与样式变量优化',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
