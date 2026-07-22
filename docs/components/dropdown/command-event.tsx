import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElMessage } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElDropdown
            onCommand={(command: string | number | object) => {
                ElMessage(`click on item ${command}`);
            }}
            menu={
                <ElDropdownMenu>
                    <ElDropdownItem command="a">Action 1</ElDropdownItem>
                    <ElDropdownItem command="b">Action 2</ElDropdownItem>
                    <ElDropdownItem command="c">Action 3</ElDropdownItem>
                    <ElDropdownItem command="d" disabled>
                        Action 4
                    </ElDropdownItem>
                    <ElDropdownItem command="e" divided>
                        Action 5
                    </ElDropdownItem>
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
