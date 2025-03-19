import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElMessage } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElDropdown
            onClick={(command: string | number | object) => {
                ElMessage(`click on item ${command}`);
            }}
            menu={
                <ElDropdownMenu>
                    <ElDropdownItem command="a">黄金糕</ElDropdownItem>
                    <ElDropdownItem command="b">狮子头</ElDropdownItem>
                    <ElDropdownItem command="c">螺蛳粉</ElDropdownItem>
                    <ElDropdownItem command="d" disabled>
                        双皮奶
                    </ElDropdownItem>
                    <ElDropdownItem command="e" divided>
                        蚵仔煎
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
