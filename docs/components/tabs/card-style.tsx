import { ElTabPane, ElTabs } from '@parker/element-plus-react';

const App = () => {
    return (
        <ElTabs type="card" closable>
            <ElTabPane title="用户管理" name="user">
                用户管理
            </ElTabPane>
            <ElTabPane title="配置管理" name="config" disabled>
                配置管理
            </ElTabPane>
            <ElTabPane title="角色管理" name="role">
                角色管理
            </ElTabPane>
            <ElTabPane title="定时任务补偿" name="task">
                定时任务补偿
            </ElTabPane>
        </ElTabs>
    );
};

export const html = `import { h } from 'preact';
    import { TabPane, Tabs } from '@parker/element-plus-react';

    const App = () => {
        return (
            <Tabs type="card" closable>
                <TabPane title="用户管理" name="user">
                    用户管理
                </TabPane>
                <TabPane title="配置管理" name="config" disabled>
                    配置管理
                </TabPane>
                <TabPane title="角色管理" name="role">
                    角色管理
                </TabPane>
                <TabPane title="定时任务补偿" name="task">
                    定时任务补偿
                </TabPane>
            </Tabs>
        );
    };`;

export default App;
