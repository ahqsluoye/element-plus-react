import { ElTabPane, ElTabs } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElTabs type="border-card">
            <ElTabPane label="用户管理" name="user">
                用户管理
            </ElTabPane>
            <ElTabPane label="配置管理" name="config" disabled>
                配置管理
            </ElTabPane>
            <ElTabPane label="角色管理" name="role">
                角色管理
            </ElTabPane>
            <ElTabPane label="定时任务补偿" name="task">
                定时任务补偿
            </ElTabPane>
        </ElTabs>
    );
};

export default App;
