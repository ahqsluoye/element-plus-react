import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElLink } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
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
            <ElLink type="primary">
                下拉菜单
                <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
            </ElLink>
        </ElDropdown>
    );
};

export default App;
