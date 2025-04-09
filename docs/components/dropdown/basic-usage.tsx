import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElTooltip } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElTooltip>
            <ElDropdown
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>黄金糕</ElDropdownItem>
                        <ElDropdownItem>狮子头</ElDropdownItem>
                        <ElDropdownItem>螺蛳粉</ElDropdownItem>
                        <ElDropdownItem disabled>双皮奶</ElDropdownItem>
                        <ElDropdownItem divided active>
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
        </ElTooltip>
    );
};

export default App;
