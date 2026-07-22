import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSpace justify="space-around" style={{ width: '100%' }}>
            <div>
                <span className="demonstration">hover 激活</span>
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
                    <span className="el-dropdown-link">
                        下拉菜单
                        <ElIcon name="angle-down" style={{ paddingLeft: 5 }} />
                    </span>
                </ElDropdown>
            </div>
            <div>
                <span className="demonstration">click 激活</span>
                <ElDropdown
                    trigger="click"
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
            </div>
            <div>
                <span className="demonstration">鼠标右键激活</span>
                <ElDropdown
                    trigger="contextmenu"
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
            </div>
        </ElSpace>
    );
};

export default App;
