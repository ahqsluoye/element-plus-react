import { ElMenu, ElMenuItem, ElSubMenu } from '@qsxy/element-plus-react';
import React from 'react';
import './left-and-right.scss';

const App = () => {
    const handleSelect = (key: string, keyPath: string[], item) => {
        console.log(key, keyPath, item);
    };
    return (
        <ElMenu className="el-menu-demo-left-and-right" mode="horizontal" defaultActive="1" onSelect={handleSelect}>
            <ElMenuItem index="0">
                <img style={{ width: 100 }} src={require('@/theme/images/element-react-logo.svg').default} alt="Element logo" />
            </ElMenuItem>

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
        </ElMenu>
    );
};

export default App;
