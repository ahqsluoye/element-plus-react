import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-03',
        version: '2.0.0',
        entries: [
            {
                type: 'refactor',
                description: '拆分TextArea为独立组件并优化渲染性能',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
