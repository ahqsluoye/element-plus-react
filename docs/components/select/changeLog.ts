import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-07',
        version: '2.0.0',
        entries: [
            {
                type: 'feature',
                description: '新增通过props和options属性自定义选项配置的功能',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '为Select组件添加表单校验状态图标支持',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
