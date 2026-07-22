import { ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSpace size={20}>
            <ElDropdown
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem disabled>Action 4</ElDropdownItem>
                        <ElDropdownItem divided>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
            >
                <ElButton type="primary">
                    下拉菜单
                    <ElIcon name="angle-down" />
                </ElButton>
            </ElDropdown>

            <ElDropdown
                splitButton
                type="primary"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem disabled>Action 4</ElDropdownItem>
                        <ElDropdownItem divided>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
            >
                下拉菜单
            </ElDropdown>
        </ElSpace>
    );
};

export default App;
