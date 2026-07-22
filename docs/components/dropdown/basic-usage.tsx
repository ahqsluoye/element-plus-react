import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElDropdown
            menu={
                <ElDropdownMenu>
                    <ElDropdownItem>Action 1</ElDropdownItem>
                    <ElDropdownItem>Action 2</ElDropdownItem>
                    <ElDropdownItem>Action 3</ElDropdownItem>
                    <ElDropdownItem disabled>Action 4</ElDropdownItem>
                    <ElDropdownItem divided active>
                        Action 5
                    </ElDropdownItem>
                </ElDropdownMenu>
            }
        >
            <ElLink type="primary" underline="never">
                下拉菜单
                <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
            </ElLink>
        </ElDropdown>
    );
};

export default App;
