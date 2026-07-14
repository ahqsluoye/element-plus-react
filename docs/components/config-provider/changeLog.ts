import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-14',
        version: '2.0.1',
        entries: [
            {
                type: 'feature',
                description: '新增全局组件clearable配置，默认值为false',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '新增ElTextarea组件autosize配置，默认值为true',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
