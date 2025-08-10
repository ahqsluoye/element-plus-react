import { ElCol, ElIcon, ElMenu, ElMenuItem, ElMenuItemGroup, ElRow, ElSubMenu } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const handleOpen = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
    };
    const handleClose = (key: string, keyPath: string[]) => {
        console.log(key, keyPath);
    };

    return (
        <ElRow className="tac">
            <ElCol span={12}>
                <h5 className="mb-2">Default colors</h5>
                <ElMenu defaultActive="2" onOpen={handleOpen} onClose={handleClose} style={{ width: 200, minHeight: 400 }}>
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
                        <ElIcon name="grid-2" prefix="fas" />
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
            </ElCol>

            <ElCol span={12}>
                <h5 className="mb-2">Default colors</h5>
                <ElMenu
                    defaultActive="2"
                    onOpen={handleOpen}
                    onClose={handleClose}
                    style={{
                        width: 200,
                        minHeight: 400,
                        '--el-menu-text-color': '#fff',
                        '--el-menu-hover-text-color': '#fff',
                        '--el-menu-bg-color': '#545c64',
                        '--el-menu-hover-bg-color': 'rgb(67, 74, 80)',
                        '--el-menu-active-color': '#ffd04b',
                    }}
                >
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
                        <ElIcon name="grid-2" prefix="fas" />
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
            </ElCol>
        </ElRow>
    );
};

export default App;
