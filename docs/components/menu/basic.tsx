import { ElMenu, ElMenuItem, ElSubMenu } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const handleSelect = (key: string, keyPath: string[], item) => {
        console.log(key, keyPath, item);
    };

    return (
        <>
            <ElMenu className="el-menu-demo" mode="horizontal" defaultActive="1" onSelect={handleSelect}>
                <ElMenuItem index="1">Processing Center</ElMenuItem>
                <ElSubMenu index="2" title="Workspace">
                    <ElMenuItem index="2-1">item one</ElMenuItem>
                    <ElMenuItem index="2-2">item two</ElMenuItem>
                    <ElMenuItem index="2-3">item three</ElMenuItem>
                    <ElSubMenu index="2-4" title="item four">
                        <ElMenuItem index="2-4-1">item one</ElMenuItem>
                        <ElMenuItem index="2-4-2">item two</ElMenuItem>
                        <ElMenuItem index="2-4-3">item three</ElMenuItem>
                    </ElSubMenu>
                </ElSubMenu>
                <ElMenuItem index="3" disabled>
                    Info
                </ElMenuItem>
                <ElMenuItem index="4">Orders</ElMenuItem>
            </ElMenu>

            <div style={{ height: '1.5rem' }} />

            <ElMenu
                className="el-menu-demo"
                mode="horizontal"
                defaultActive="1"
                onSelect={handleSelect}
                style={{ '--el-menu-bg-color': '#545c64', '--el-menu-text-color': '#fff', '--el-menu-hover-text-color': '#fff', '--el-menu-active-color': '#ffd04b' }}
            >
                <ElMenuItem index="1">Processing Center</ElMenuItem>
                <ElSubMenu index="2" title="Workspace">
                    <ElMenuItem index="2-1">item one</ElMenuItem>
                    <ElMenuItem index="2-2">item two</ElMenuItem>
                    <ElMenuItem index="2-3">item three</ElMenuItem>
                    <ElSubMenu index="2-4" title="item four">
                        <ElMenuItem index="2-4-1">item one</ElMenuItem>
                        <ElMenuItem index="2-4-2">item two</ElMenuItem>
                        <ElMenuItem index="2-4-3">item three</ElMenuItem>
                    </ElSubMenu>
                </ElSubMenu>
                <ElMenuItem index="3" disabled>
                    Info
                </ElMenuItem>
                <ElMenuItem index="4">Orders</ElMenuItem>
            </ElMenu>
        </>
    );
};

export default App;
