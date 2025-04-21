import { IThemeConfig } from 'dumi/dist/client/theme-api/types';

export const NAV: IThemeConfig['nav'] = {
    'zh-CN': [
        { title: '指南', link: '/guide', activePath: '/guide' },
        {
            title: '组件',
            link: '/components/button',
            activePath: '/components/button',
        },
    ],
    'en-US': [
        { title: 'guide', link: '/en/guide' },
        {
            title: 'components',
            link: '/en/components/button',
            activePath: '/components/button',
        },
    ],
};

export const SIDEBAR: IThemeConfig['sidebar'] = {
    '/components': [
        {
            title: 'Basic 基础组件',
            children: [
                { link: '/components/button', title: 'Button 按钮' },
                { link: '/components/icon', title: 'Icon 图标' },
                { link: '/components/icon-list', title: 'IconList 图标列表' },
                { link: '/components/layout', title: 'Layout 布局' },
                { link: '/components/link', title: 'Link 链接' },
                { link: '/components/scrollbar', title: 'Scrollbar 滚动条' },
            ],
        },
        {
            title: 'Form 表单组件',
            children: [
                { link: '/components/cascader', title: 'Cascader 级联选择器' },
                { link: '/components/checkbox', title: 'Checkbox 多选框' },
                { link: '/components/color-picker', title: 'ColorPicker 颜色选择器' },
                { link: '/components/date-picker', title: 'DatePicker 日期选择框' },
                { link: '/components/date-time-picker', title: 'DateTimePicker 日期时间选择器' },
                { link: '/components/form', title: 'Form 表单' },
                { link: '/components/input', title: 'Input 输入框' },
                { link: '/components/input-number', title: 'InputNumber 数字输入框' },
                { link: '/components/radio', title: 'Radio 单选框' },
                { link: '/components/select', title: 'Select 选择器' },
                { link: '/components/switch', title: 'Switch 开关' },
                { link: '/components/time-picker', title: 'TimePicker 时间选择器' },
                { link: '/components/transfer', title: 'Transfer 穿梭框' },
                { link: '/components/upload', title: 'Upload 上传' },
            ],
        },
        {
            title: 'Data 数据展示',
            children: [
                { link: '/components/avatar', title: 'Avatar 头像' },
                { link: '/components/badge', title: 'Badge 徽章' },
                { link: '/components/card', title: 'Card 卡片' },
                { link: '/components/carousel', title: 'Carousel 走马灯' },
                { link: '/components/collapse', title: 'Collapse 折叠面板' },
                { link: '/components/descriptions', title: 'Descriptions 描述列表' },
                { link: '/components/pagination', title: 'Pagination 分页' },
                { link: '/components/progress', title: 'Progress 进度条' },
                { link: '/components/skeleton', title: 'Skeleton 骨架屏' },
                { link: '/components/table', title: 'Table 表格' },
                { link: '/components/tag', title: 'Tag 标签' },
                { link: '/components/time-line', title: 'Timeline 时间线' },
                { link: '/components/tree', title: 'Tree 树形控件' },
                { link: '/components/trees-elect', title: 'TreeSelect 树形选择' },
            ],
        },
        {
            title: 'Navigation 导航',
            children: [
                { link: '/components/breadcrumb', title: 'Breadcrumb 面包屑' },
                { link: '/components/dropdown', title: 'Dropdown 下拉菜单' },
                { link: '/components/tabs', title: 'Tabs 标签页' },
            ],
        },
        {
            title: 'Feedback 反馈组件',
            children: [
                { link: '/components/dialog', title: 'Dialog 对话框' },
                { link: '/components/drawer', title: 'Drawer 抽屉' },
                { link: '/components/loading', title: 'Loading 加载' },
                { link: '/components/message', title: 'Message 消息提示' },
                { link: '/components/messagebox', title: 'MessageBox 消息弹框' },
                { link: '/components/notification', title: 'Notification 通知' },
                { link: '/components/popconfirm', title: 'Popconfirm 弹出确认框' },
                { link: '/components/popover', title: 'Popover 弹出框' },
                { link: '/components/tooltip', title: 'Tooltip 文字提示' },
            ],
        },
        {
            title: 'Others 其他',
            children: [{ link: '/components/divider', title: 'Divider 分割线' }],
        },
    ],
};
