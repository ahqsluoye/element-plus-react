import { IThemeConfig } from 'dumi/dist/client/theme-api/types';

export const NAV: IThemeConfig['nav'] = {
    'zh-CN': [
        { title: '指南', link: '/guide/installation' },
        {
            title: '组件',
            link: '/components/overview',
        },
    ],
    'en-US': [
        { title: 'Guide', link: '/en-US/guide/installation' },
        {
            title: 'Component',
            link: '/en-US/components/overview',
        },
    ],
};

export const SIDEBAR: IThemeConfig['sidebar'] = {
    '/guide': [
        {
            title: '基础',
            children: [
                { link: '/guide/installation', title: '安装' },
                { link: '/guide/quickstart', title: '快速开始' },
            ],
        },
        {
            title: '进阶',
            children: [
                { link: '/guide/i18n', title: '国际化' },
                { link: '/guide/theming', title: '主题' },
            ],
        },
    ],
    '/en-US/guide': [
        {
            title: 'Basic',
            children: [
                { link: '/en-US/guide/installation', title: 'Installation' },
                { link: '/en-US/guide/quickstart', title: 'Quick Start' },
            ],
        },
        {
            title: 'Advanced',
            children: [
                { link: '/en-US/guide/i18n', title: 'il8n' },
                { link: '/en-US/guide/theming', title: 'Theming' },
            ],
        },
    ],
    '/components': [
        {
            title: 'Overview 组件总览',
            children: [{ link: '/components/overview', title: 'Overview 组件总览' }],
        },
        {
            title: 'Basic 基础组件',
            children: [
                { link: '/components/button', title: 'Button 按钮' },
                { link: '/components/container', title: 'Container 布局容器' },
                { link: '/components/icon', title: 'Icon 图标' },
                { link: '/components/icon-list', title: 'IconList 图标列表' },
                { link: '/components/layout', title: 'Layout 布局' },
                { link: '/components/link', title: 'Link 链接' },
                { link: '/components/text', title: 'Text 文本' },
                { link: '/components/scrollbar', title: 'Scrollbar 滚动条' },
                { link: '/components/space', title: 'Space 间距' },
            ],
        },
        {
            title: '配置组件',
            children: [{ link: '/components/config-provider', title: 'Config Provider 全局配置' }],
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
                { link: '/components/slider', title: 'Slider 滑动条' },
                { link: '/components/switch', title: 'Switch 开关' },
                { link: '/components/time-picker', title: 'TimePicker 时间选择器' },
                { link: '/components/transfer', title: 'Transfer 穿梭框' },
                { link: '/components/tree-select', title: 'TreeSelect 树形选择' },
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
                { link: '/components/table-v2', title: 'Virtualized Table 虚拟化表格', version: '2.0.0' },
                { link: '/components/tag', title: 'Tag 标签' },
                { link: '/components/time-line', title: 'Timeline 时间线' },
                { link: '/components/tour', title: 'Tour 漫游式引导', version: '2.0.0' },
                { link: '/components/tree', title: 'Tree 树形控件' },
                { link: '/components/statistic', title: 'Statistic 统计组件' },
                { link: '/components/segmented', title: 'Segmented 分段组件', version: '2.0.0' },
            ],
        },
        {
            title: 'Navigation 导航',
            children: [
                { link: '/components/affix', title: 'Affix 固钉', version: '2.0.0' },
                { link: '/components/anchor', title: 'Anchor 锚点', version: '2.0.0' },
                { link: '/components/backtop', title: 'BackTop 回到顶部', version: '2.0.0' },
                { link: '/components/breadcrumb', title: 'Breadcrumb 面包屑' },
                { link: '/components/dropdown', title: 'Dropdown 下拉菜单' },
                { link: '/components/menu', title: 'Menu 菜单' },
                { link: '/components/page-header', title: 'PageHeader 页头', version: '2.0.0' },
                { link: '/components/steps', title: 'Steps 步骤条', version: '2.0.0' },
                { link: '/components/tabs', title: 'Tabs 标签页' },
            ],
        },
        {
            title: 'Feedback 反馈组件',
            children: [
                { link: '/components/alert', title: 'Alert 提示' },
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
            children: [
                { link: '/components/divider', title: 'Divider 分割线' },
                { link: '/components/watermark', title: 'Watermark 水印', version: '2.0.0' },
            ],
        },
    ],
    '/en-US/components': [
        {
            title: 'Overview',
            children: [{ link: '/en-US/components/overview', title: 'Overview' }],
        },
        {
            title: 'Basic',
            children: [
                { link: '/en-US/components/button', title: 'Button' },
                { link: '/en-US/components/container', title: 'Container' },
                { link: '/en-US/components/icon', title: 'Icon' },
                { link: '/en-US/components/icon-list', title: 'IconList' },
                { link: '/en-US/components/layout', title: 'Layout' },
                { link: '/en-US/components/link', title: 'Link' },
                { link: '/en-US/components/text', title: 'Text' },
                { link: '/en-US/components/scrollbar', title: 'Scrollbar' },
                { link: '/en-US/components/space', title: 'Space' },
            ],
        },
        {
            title: 'Config Provide',
            children: [{ link: '/en-US/components/config-provider', title: 'Config Provider' }],
        },
        {
            title: 'Form',
            children: [
                { link: '/en-US/components/cascader', title: 'Cascader' },
                { link: '/en-US/components/checkbox', title: 'Checkbox' },
                { link: '/en-US/components/color-picker', title: 'ColorPicker' },
                { link: '/en-US/components/date-picker', title: 'DatePicker' },
                { link: '/en-US/components/date-time-picker', title: 'DateTimePicker' },
                { link: '/en-US/components/form', title: 'Form' },
                { link: '/en-US/components/input', title: 'Input' },
                { link: '/en-US/components/input-number', title: 'InputNumber' },
                { link: '/en-US/components/radio', title: 'Radio' },
                { link: '/en-US/components/select', title: 'Select' },
                { link: '/en-US/components/slider', title: 'Slider' },
                { link: '/en-US/components/switch', title: 'Switch' },
                { link: '/en-US/components/time-picker', title: 'TimePicker' },
                { link: '/en-US/components/transfer', title: 'Transfer' },
                { link: '/en-US/components/tree-select', title: 'TreeSelect' },
                { link: '/en-US/components/upload', title: 'Upload' },
            ],
        },
        {
            title: 'Data',
            children: [
                { link: '/en-US/components/avatar', title: 'Avatar' },
                { link: '/en-US/components/badge', title: 'Badge' },
                { link: '/en-US/components/card', title: 'Card' },
                { link: '/en-US/components/carousel', title: 'Carousel' },
                { link: '/en-US/components/collapse', title: 'Collapse' },
                { link: '/en-US/components/descriptions', title: 'Descriptions' },
                { link: '/en-US/components/pagination', title: 'Pagination' },
                { link: '/en-US/components/progress', title: 'Progress' },
                { link: '/en-US/components/skeleton', title: 'Skeleton' },
                { link: '/en-US/components/table', title: 'Table' },
                { link: '/en-US/components/table-v2', title: 'Virtualized Table', version: '2.0.0' },
                { link: '/en-US/components/tag', title: 'Tag' },
                { link: '/en-US/components/time-line', title: 'Timeline' },
                { link: '/en-US/components/tour', title: 'Tour', version: '2.0.0' },
                { link: '/en-US/components/tree', title: 'Tree' },
                { link: '/en-US/components/statistic', title: 'Statistic' },
                { link: '/en-US/components/segmented', title: 'Segmented', version: '2.0.0' },
            ],
        },
        {
            title: 'Navigation',
            children: [
                { link: '/en-US/components/affix', title: 'Affix', version: '2.0.0' },
                { link: '/en-US/components/anchor', title: 'Anchor', version: '2.0.0' },
                { link: '/en-US/components/backtop', title: 'BackTop', version: '2.0.0' },
                { link: '/en-US/components/breadcrumb', title: 'Breadcrumb' },
                { link: '/en-US/components/dropdown', title: 'Dropdown' },
                { link: '/en-US/components/menu', title: 'Menu' },
                { link: '/en-US/components/page-header', title: 'PageHeader', version: '2.0.0' },
                { link: '/en-US/components/steps', title: 'Steps', version: '2.0.0' },
                { link: '/en-US/components/tabs', title: 'Tabs' },
            ],
        },
        {
            title: 'Feedback',
            children: [
                { link: '/en-US/components/alert', title: 'Alert' },
                { link: '/en-US/components/dialog', title: 'Dialog' },
                { link: '/en-US/components/drawer', title: 'Drawer' },
                { link: '/en-US/components/loading', title: 'Loading' },
                { link: '/en-US/components/message', title: 'Message' },
                { link: '/en-US/components/messagebox', title: 'MessageBox' },
                { link: '/en-US/components/notification', title: 'Notification' },
                { link: '/en-US/components/popconfirm', title: 'Popconfirm' },
                { link: '/en-US/components/popover', title: 'Popover' },
                { link: '/en-US/components/tooltip', title: 'Tooltip' },
            ],
        },
        {
            title: 'Others',
            children: [
                { link: '/en-US/components/divider', title: 'Divider' },
                { link: '/en-US/components/watermark', title: 'Watermark', version: '2.0.0' },
            ],
        },
    ],
};
