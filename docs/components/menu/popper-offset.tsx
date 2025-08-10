import { ElMenu, ElMenuItem, ElSubMenu } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElMenu mode="horizontal" defaultActive="/guide/installation" popperOffset={16} ellipsis router style={{ maxWidth: 600 }}>
            <ElMenuItem index="/guide/installation">指南</ElMenuItem>
            <ElSubMenu index="components" title="Basic 基础组件">
                <ElMenuItem index="/components/button">Button 按钮</ElMenuItem>
                <ElMenuItem index="/components/icon">Icon 图标</ElMenuItem>
            </ElSubMenu>
            <ElMenuItem index="/components/breadcrumb">Breadcrumb 面包屑</ElMenuItem>
            <ElMenuItem index="/components/dropdown">Dropdown 下拉菜单</ElMenuItem>
            <ElMenuItem index="/components/tabs">Tabs 标签页</ElMenuItem>
        </ElMenu>
    );
};

export default App;
