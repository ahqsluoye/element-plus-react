import { VersionChangelog } from '@/theme/builtins/Meta';

export default [
    {
        date: '2026-07-06',
        version: '2.0.0',
        entries: [
            {
                type: 'refactor',
                description: '将Form.Item、Form.List等组件统一导出为ElFormItem、ElFormList',
                author: 'ahqsluoye',
            },
            {
                type: 'refactor',
                description: '重构Form组件的导出结构，将useForm, useWatch两个hooks从Form对象中拆分单独导出，转而直接从包@qsxy/element-plus-react中导出',
                author: 'ahqsluoye',
            },
        ],
    },
] as VersionChangelog[];
