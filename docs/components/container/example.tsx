import {
    ElAside,
    ElContainer,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElHeader,
    ElIcon,
    ElMain,
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElScrollbar,
    ElSubMenu,
    ElTable,
    ElTableColumn,
} from '@qsxy/element-plus-react';
import React from 'react';
import './common-layout.scss';

const App = () => {
    const tableData: any[] = Array.from({ length: 20 }).fill({
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    });

    return (
        <ElContainer className="layout-container-demo" style={{ height: 500 }}>
            <ElAside width="200px">
                <ElScrollbar>
                    <ElMenu defaultOpeneds={['1', '3']}>
                        <ElSubMenu
                            index="1"
                            title={
                                <>
                                    <ElIcon name="envelope" prefix="far" />
                                    <span>Navigator One</span>
                                </>
                            }
                        >
                            <ElMenuItemGroup title="Group 1">
                                <ElMenuItem index="1-1">Option 1</ElMenuItem>
                                <ElMenuItem index="1-2">Option 2</ElMenuItem>
                            </ElMenuItemGroup>
                            <ElMenuItemGroup title="Group 2">
                                <ElMenuItem index="1-3">Option 3</ElMenuItem>
                            </ElMenuItemGroup>
                            <ElSubMenu index="1-4" title={'Option4'}>
                                <ElMenuItem index="1-4-1">Option 4-1</ElMenuItem>
                            </ElSubMenu>
                        </ElSubMenu>

                        <ElSubMenu
                            index="2"
                            title={
                                <>
                                    <ElIcon name="grid-2" prefix="fas" />
                                    <span>Navigator Two</span>
                                </>
                            }
                        >
                            <ElMenuItemGroup title="Group 1">
                                <ElMenuItem index="2-1">Option 1</ElMenuItem>
                                <ElMenuItem index="2-2">Option 2</ElMenuItem>
                            </ElMenuItemGroup>
                            <ElMenuItemGroup title="Group 2">
                                <ElMenuItem index="2-3">Option 3</ElMenuItem>
                            </ElMenuItemGroup>
                            <ElSubMenu index="2-4" title={'Option4'}>
                                <ElMenuItem index="2-4-1">Option 4-1</ElMenuItem>
                            </ElSubMenu>
                        </ElSubMenu>

                        <ElSubMenu
                            index="3"
                            title={
                                <>
                                    <ElIcon name="gear" prefix="fal" />
                                    <span>Navigator Three</span>
                                </>
                            }
                        >
                            <ElMenuItemGroup title="Group 1">
                                <ElMenuItem index="3-1">Option 1</ElMenuItem>
                                <ElMenuItem index="3-2">Option 2</ElMenuItem>
                            </ElMenuItemGroup>
                            <ElMenuItemGroup title="Group 2">
                                <ElMenuItem index="3-3">Option 3</ElMenuItem>
                            </ElMenuItemGroup>
                            <ElSubMenu index="3-4" title={'Option4'}>
                                <ElMenuItem index="3-4-1">Option 4-1</ElMenuItem>
                            </ElSubMenu>
                        </ElSubMenu>
                    </ElMenu>
                </ElScrollbar>
            </ElAside>

            <ElContainer>
                <ElHeader style={{ textAlign: 'right', fontSize: 12 }}>
                    <div className="toolbar">
                        <ElDropdown
                            menu={
                                <ElDropdownMenu>
                                    <ElDropdownItem>View</ElDropdownItem>
                                    <ElDropdownItem>Add</ElDropdownItem>
                                    <ElDropdownItem>Delete</ElDropdownItem>
                                </ElDropdownMenu>
                            }
                        >
                            <ElIcon name="gear" style={{ marginRight: 8, marginTop: 1 }} />
                        </ElDropdown>
                        <span>Tom</span>
                    </div>
                </ElHeader>

                <ElMain>
                    <ElScrollbar>
                        <ElTable data={tableData}>
                            <ElTableColumn prop="date" label="Date" width={140} />
                            <ElTableColumn prop="name" label="Name" width={120} />
                            <ElTableColumn prop="address" label="Address" />
                        </ElTable>
                    </ElScrollbar>
                </ElMain>
            </ElContainer>
        </ElContainer>
    );
};

export default App;
