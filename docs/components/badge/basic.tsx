import { ElBadge, ElButton, ElDropdown, ElDropdownItem, ElDropdownMenu, ElIcon } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElBadge value={12} style={{ marginRight: 40 }}>
                <ElButton>消息</ElButton>
            </ElBadge>
            <ElBadge value={3} style={{ marginRight: 40 }}>
                <ElButton>回复</ElButton>
            </ElBadge>
            <ElBadge value={12} type="primary" style={{ marginRight: 40 }}>
                <ElButton>消息</ElButton>
            </ElBadge>
            <ElBadge value={3} type="warning" style={{ marginRight: 40 }}>
                <ElButton>回复</ElButton>
            </ElBadge>
            <ElDropdown
                trigger="click"
                menu={
                    <ElDropdownMenu>
                        <ElDropdownItem>
                            <span>comments</span>
                            <ElBadge value={12}></ElBadge>
                        </ElDropdownItem>
                        <ElDropdownItem>
                            <span>replies</span>
                            <ElBadge value={3}></ElBadge>
                        </ElDropdownItem>
                    </ElDropdownMenu>
                }
                style={{ marginTop: '0.5rem' }}
            >
                点击我
                <ElIcon prefix="fas" name="caret-down" />
            </ElDropdown>
        </>
    );
};

export default App;
