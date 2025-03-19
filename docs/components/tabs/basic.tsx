import { ElTabPane, ElTable, ElTableColumn, ElTabs, TableRef, TabsPaneContext } from '@qsxy/element-plus-react';
import { useCallback, useRef } from 'react';

interface Data {
    date: string;
    name: string;
    address: string;
}

const tableData: Data[] = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
];

const App = () => {
    const tableRef = useRef<TableRef<Data> | null>(null);

    const onTabShow = useCallback(() => tableRef.current?.doLayout(), []);
    // eslint-disable-next-line no-console
    const onTabClick = useCallback((context: TabsPaneContext) => console.log(context), []);

    return (
        <ElTabs defaultActiveName="role" onTabClick={onTabClick}>
            <ElTabPane title="用户管理" name="user" lazy onTabShow={onTabShow}>
                <ElTable ref={tableRef} data={tableData} style={{ width: '100%' }}>
                    <ElTableColumn prop="date" label="Date" width={180} />
                    <ElTableColumn prop="name" label="Name" width={180} />
                    <ElTableColumn prop="address" label="Address" align="center" />
                </ElTable>
            </ElTabPane>
            <ElTabPane title="配置管理" name="config" data={{ name: 'config' }} lazy>
                配置管理
            </ElTabPane>
            <ElTabPane title="角色管理" name="role" lazy>
                角色管理
            </ElTabPane>
            <ElTabPane title="定时任务补偿" name="task" lazy>
                定时任务补偿
            </ElTabPane>
        </ElTabs>
    );
};

export const html = `import { h } from 'preact';
    import { useCallback, useRef } from 'react';
    import { Table, TableColumn, TableRef, TabPane, Tabs, TabsPaneContext } from '@qsxy/element-plus-react';

    interface Data {
        date: string;
        name: string;
        address: string;
    }

    const tableData: Data[] = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ];

    const App = () => {
        const tableRef = useRef<TableRef<Data> | null>(null);

        const onTabShow = useCallback(() => tableRef.current?.doLayout(), []);
        const onTabClick = useCallback((context: TabsPaneContext) => console.log(context), []);

        return (
            <Tabs defaultActiveName="role" onTabClick={onTabClick}>
                <TabPane title="用户管理" name="user" lazy onTabShow={onTabShow}>
                    <Table ref={tableRef} data={tableData} style={{ width: '100%' }}>
                        <TableColumn prop="date" label="Date" width={180} />
                        <TableColumn prop="name" label="Name" width={180} />
                        <TableColumn prop="address" label="Address" align="center" />
                    </Table>
                </TabPane>
                <TabPane title="配置管理" name="config" data={{ name: 'config' }} lazy>
                    配置管理
                </TabPane>
                <TabPane title="角色管理" name="role" lazy>
                    角色管理
                </TabPane>
                <TabPane title="定时任务补偿" name="task" lazy>
                    定时任务补偿
                </TabPane>
            </Tabs>
        );
    };`;

export default App;
