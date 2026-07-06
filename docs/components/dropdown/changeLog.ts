import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-06-30',
        version: '2.0.0',
        entries: [
            {
                type: 'bugfix',
                description: '修复下拉菜单点击切换和链接下划线问题',
                author: 'ahqsluoye',
            },
            {
                type: 'feature',
                description: '新增拖拽弹窗、自定义动画与遮罩样式优化',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
