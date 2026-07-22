import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSpace size={20}>
            <ElDropdown
                splitButton
                type="primary"
                size="large"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem>Action 4</ElDropdownItem>
                        <ElDropdownItem>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
            >
                Large
            </ElDropdown>

            <ElDropdown
                splitButton
                type="primary"
                size="default"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem>Action 4</ElDropdownItem>
                        <ElDropdownItem>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
            >
                Default
            </ElDropdown>

            <ElDropdown
                splitButton
                type="primary"
                size="small"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>Action 1</ElDropdownItem>
                        <ElDropdownItem>Action 2</ElDropdownItem>
                        <ElDropdownItem>Action 3</ElDropdownItem>
                        <ElDropdownItem>Action 4</ElDropdownItem>
                        <ElDropdownItem>Action 5</ElDropdownItem>
                    </ElDropdownMenu>
                }
            >
                Small
            </ElDropdown>
        </ElSpace>
    );
};

export default App;
