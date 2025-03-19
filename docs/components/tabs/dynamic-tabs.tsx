import { ElTabPane, ElTabs, TabPaneName } from '@qsxy/element-plus-react';
import cloneDeep from 'lodash/cloneDeep';
import { useState } from 'react';

let tabIndex = 2;
const App = () => {
    const [editableTabsValue, setEditableTabsValue] = useState('2');
    const [editableTabs, setEditableTabs] = useState([
        {
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content',
        },
        {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content',
        },
    ]);

    const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
        if (action === 'add') {
            const newTabName = `${++tabIndex}`;
            setEditableTabs(prev => [
                ...prev,
                {
                    title: `Tab${tabIndex}`,
                    name: newTabName,
                    content: 'New Tab content',
                },
            ]);
            setEditableTabsValue(newTabName);
        } else if (action === 'remove') {
            const tabs = cloneDeep(editableTabs);
            let activeName = editableTabsValue;
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        const nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });
            }

            setEditableTabsValue(activeName);
            setEditableTabs(tabs.filter(tab => tab.name !== targetName));
        }
    };

    return (
        <ElTabs
            type="card"
            activeName={editableTabsValue}
            onTabClick={tab => setEditableTabsValue(tab.paneName as string)}
            editable
            onTabAdd={() => handleTabsEdit(undefined, 'add')}
            onTabRemove={name => handleTabsEdit(name, 'remove')}
        >
            {editableTabs.map(item => (
                <ElTabPane key={item.name} title={item.title} name={item.name}>
                    {item.content}
                </ElTabPane>
            ))}
        </ElTabs>
    );
};

export const html = `import { h } from 'preact';
    import { TabPane, TabPaneName, Tabs } from '@qsxy/element-plus-react';
    import { useState } from 'react';
    import cloneDeep from 'lodash/cloneDeep';

    let tabIndex = 2;
    const App = () => {
        const [editableTabsValue, setEditableTabsValue] = useState('2');
        const [editableTabs, setEditableTabs] = useState([
            {
                title: 'Tab 1',
                name: '1',
                content: 'Tab 1 content',
            },
            {
                title: 'Tab 2',
                name: '2',
                content: 'Tab 2 content',
            },
        ]);

        const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
            if (action === 'add') {
                const newTabName = \`${++tabIndex}\`;
                setEditableTabs(prev => [
                    ...prev,
                    {
                        title: \`Tab${tabIndex}\`,
                        name: newTabName,
                        content: 'New Tab content',
                    },
                ]);
                setEditableTabsValue(newTabName);
            } else if (action === 'remove') {
                const tabs = cloneDeep(editableTabs);
                let activeName = editableTabsValue;
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            const nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }

                setEditableTabsValue(activeName);
                setEditableTabs(tabs.filter(tab => tab.name !== targetName));
            }
        };

        return (
            <Tabs
                type="card"
                activeName={editableTabsValue}
                onTabClick={tab => setEditableTabsValue(tab.paneName as string)}
                editable
                onTabAdd={() => handleTabsEdit(undefined, 'add')}
                onTabRemove={name => handleTabsEdit(name, 'remove')}
            >
                {editableTabs.map(item => (
                    <TabPane key={item.name} title={item.title} name={item.name}>
                        {item.content}
                    </TabPane>
                ))}
            </Tabs>
        );
    };`;

export default App;
