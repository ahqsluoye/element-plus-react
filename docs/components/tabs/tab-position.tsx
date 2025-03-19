import { ElRadio, ElRadioGroup, ElTabPane, ElTabs } from '@qsxy/element-plus-react';
import { useState } from 'react';

const App = () => {
    const [pos, setPos] = useState<'top' | 'right' | 'bottom' | 'left'>('top');

    return (
        <>
            <ElRadioGroup value={pos} onChange={(val: 'top' | 'right' | 'bottom' | 'left') => setPos(val)}>
                <ElRadio.Button value="top">top</ElRadio.Button>
                <ElRadio.Button value="bottom">bottom</ElRadio.Button>
                <ElRadio.Button value="left">left</ElRadio.Button>
                <ElRadio.Button value="right">right</ElRadio.Button>
            </ElRadioGroup>

            <ElTabs tabPosition={pos} style={{ height: 200, marginTop: 20 }} contentStyle={{ padding: 32, color: '#6b778c', fontSize: 32, fontWeight: 600 }}>
                <ElTabPane title="用户管理" name="user">
                    用户管理
                </ElTabPane>
                <ElTabPane title="配置管理" name="config">
                    配置管理
                </ElTabPane>
                <ElTabPane title="角色管理" name="role">
                    角色管理
                </ElTabPane>
                <ElTabPane title="定时任务补偿" name="task">
                    定时任务补偿
                </ElTabPane>
            </ElTabs>
        </>
    );
};

export const html = `import { h, Fragment } from 'preact';
    import { useState } from 'react';
    import { Radio, RadioGroup, TabPane, Tabs } from '@qsxy/element-plus-react';

    const App = () => {
        const [pos, setPos] = useState<'top' | 'right' | 'bottom' | 'left'>('top');

        return (
            <>
                <RadioGroup value={pos} onChange={(val: 'top' | 'right' | 'bottom' | 'left') => setPos(val)}>
                    <Radio.Button value="top">top</Radio.Button>
                    <Radio.Button value="bottom">bottom</Radio.Button>
                    <Radio.Button value="left">left</Radio.Button>
                    <Radio.Button value="right">right</Radio.Button>
                </RadioGroup>

                <Tabs tabPosition={pos} style={{ height: 200, marginTop: 20 }} contentStyle={{ padding: 32, color: '#6b778c', fontSize: 32, fontWeight: 600 }}>
                    <TabPane title="用户管理" name="user">
                        用户管理
                    </TabPane>
                    <TabPane title="配置管理" name="config">
                        配置管理
                    </TabPane>
                    <TabPane title="角色管理" name="role">
                        角色管理
                    </TabPane>
                    <TabPane title="定时任务补偿" name="task">
                        定时任务补偿
                    </TabPane>
                </Tabs>
            </>
        );
    };`;

export default App;
