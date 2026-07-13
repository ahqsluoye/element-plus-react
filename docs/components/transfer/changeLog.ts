import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        version: '2.0.0',
        date: '2026-07-13',
        entries: [
            {
                type: 'refactor',
                description: '重构transfer组件类型定义与API，调整字段别名、选中逻辑与事件回调',
            },
        ],
    },
] as VersionChangelog[];
