import { ElRadioButton, ElRadioGroup, ElTabPane, ElTabs } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [pos, setPos] = useState<'top' | 'right' | 'bottom' | 'left'>('top');

    return (
        <>
            <ElRadioGroup value={pos} onChange={(val: 'top' | 'right' | 'bottom' | 'left') => setPos(val)}>
                <ElRadioButton value="top">top</ElRadioButton>
                <ElRadioButton value="bottom">bottom</ElRadioButton>
                <ElRadioButton value="left">left</ElRadioButton>
                <ElRadioButton value="right">right</ElRadioButton>
            </ElRadioGroup>

            <ElTabs tabPosition={pos} style={{ height: 200, marginTop: 20 }} contentStyle={{ padding: 32, color: '#6b778c', fontSize: 32, fontWeight: 600 }}>
                <ElTabPane label="用户管理" name="user">
                    用户管理
                </ElTabPane>
                <ElTabPane label="配置管理" name="config">
                    配置管理
                </ElTabPane>
                <ElTabPane label="角色管理" name="role">
                    角色管理
                </ElTabPane>
                <ElTabPane label="定时任务补偿" name="task">
                    定时任务补偿
                </ElTabPane>
            </ElTabs>
        </>
    );
};

export default App;
