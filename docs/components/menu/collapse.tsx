import { ElIcon, ElMenu, ElMenuItem, ElMenuItemGroup, ElRadio, ElRadioGroup, ElSubMenu } from '@qsxy/element-plus-react';
import React from 'react';
import './collacpse.scss';

const App = () => {
    const [isCollapse, setIsCollapse] = React.useState(true);
    return (
        <>
            <ElRadioGroup value={isCollapse} onChange={setIsCollapse} style={{ marginBottom: 20 }}>
                <ElRadio.Button value={false}>expand</ElRadio.Button>
                <ElRadio.Button value={true}>collapse</ElRadio.Button>
            </ElRadioGroup>

            <ElMenu collapse={isCollapse} collapseTransition className="el-menu-vertical-demo">
                <ElSubMenu
                    index="1"
                    title={
                        <>
                            <ElIcon name="location-dot" prefix="fal" />
                            <span>Navigator One</span>
                        </>
                    }
                >
                    <ElMenuItemGroup title="Group One">
                        <ElMenuItem index="1-1">item one</ElMenuItem>
                        <ElMenuItem index="1-2">item two</ElMenuItem>
                    </ElMenuItemGroup>
                    <ElMenuItemGroup title="Group Two">
                        <ElMenuItem index="1-3">item three</ElMenuItem>
                    </ElMenuItemGroup>
                    <ElSubMenu index="1-4" title={'item four'}>
                        <ElMenuItem index="1-4-1">item one</ElMenuItem>
                    </ElSubMenu>
                </ElSubMenu>
                <ElMenuItem index="2">
                    <ElIcon name="cube" prefix="fal" />
                    <span>Navigator Two</span>
                </ElMenuItem>
                <ElMenuItem index="3" disabled>
                    <ElIcon name="file-lines" prefix="fal" />
                    <span>Navigator Three</span>
                </ElMenuItem>
                <ElMenuItem index="4">
                    <ElIcon name="gear" prefix="fal" />
                    <span>Navigator Four</span>
                </ElMenuItem>
            </ElMenu>
        </>
    );
};

export default App;
