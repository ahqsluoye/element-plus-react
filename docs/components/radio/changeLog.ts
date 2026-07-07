import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-03',
        version: '2.0.0',
        entries: [
            {
                type: 'refactor',
                description: '统一RadioButton组件命名和导出方式',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '新增通过options属性快速生成单选组的功能',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
