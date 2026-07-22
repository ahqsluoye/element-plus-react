import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElDropdown
            hideOnClick={false}
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
            <span className="el-dropdown-link">
                下拉菜单
                <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
            </span>
        </ElDropdown>
    );
};

export default App;
