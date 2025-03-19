import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ float: 'left', flex: '0 0 33.3333333333%' }}>
                <span className="demonstration">hover 激活</span>
                <ElDropdown
                    menu={
                        <ElDropdownMenu>
                            <ElDropdownItem>黄金糕</ElDropdownItem>
                            <ElDropdownItem>狮子头</ElDropdownItem>
                            <ElDropdownItem>螺蛳粉</ElDropdownItem>
                            <ElDropdownItem disabled>双皮奶</ElDropdownItem>
                            <ElDropdownItem divided>蚵仔煎</ElDropdownItem>
                        </ElDropdownMenu>
                    }
                >
                    <span className="el-dropdown-link">
                        下拉菜单
                        <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
                    </span>
                </ElDropdown>
            </div>
            <div style={{ float: 'left', flex: '0 0 33.3333333333%' }}>
                <span className="demonstration">click 激活</span>
                <ElDropdown
                    trigger="click"
                    menu={
                        <ElDropdownMenu>
                            <ElDropdownItem>黄金糕</ElDropdownItem>
                            <ElDropdownItem>狮子头</ElDropdownItem>
                            <ElDropdownItem>螺蛳粉</ElDropdownItem>
                            <ElDropdownItem disabled>双皮奶</ElDropdownItem>
                            <ElDropdownItem divided>蚵仔煎</ElDropdownItem>
                        </ElDropdownMenu>
                    }
                >
                    <span className="el-dropdown-link">
                        下拉菜单
                        <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
                    </span>
                </ElDropdown>
            </div>
            <div style={{ float: 'left', flex: '0 0 33.3333333333%' }}>
                <span className="demonstration">鼠标右键激活</span>
                <ElDropdown
                    trigger="contextmenu"
                    menu={
                        <ElDropdownMenu>
                            <ElDropdownItem>黄金糕</ElDropdownItem>
                            <ElDropdownItem>狮子头</ElDropdownItem>
                            <ElDropdownItem>螺蛳粉</ElDropdownItem>
                            <ElDropdownItem disabled>双皮奶</ElDropdownItem>
                            <ElDropdownItem divided>蚵仔煎</ElDropdownItem>
                        </ElDropdownMenu>
                    }
                >
                    <span className="el-dropdown-link">
                        下拉菜单
                        <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
                    </span>
                </ElDropdown>
            </div>
        </div>
    );
};

export default App;
