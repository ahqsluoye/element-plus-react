import { ElButton, ElIcon, ElTableV2, ElTag, ElTooltip, TableV2FixedDir } from '@qsxy/element-plus-react';
import dayjs from 'dayjs';
import React from 'react';
import './row-class.scss';

const App = () => {
    let id = 0;

    const dataGenerator = () => ({
        id: `random-id-${++id}`,
        name: 'Tom',
        date: '2020-10-1',
    });

    const columns = [
        {
            key: 'date',
            title: 'Date',
            dataKey: 'date',
            width: 150,
            fixed: TableV2FixedDir.LEFT,
            cellRenderer: ({ cellData: date }) => (
                <ElTooltip content={dayjs(date).format('YYYY/MM/DD')}>
                    {
                        <span className="flex items-center">
                            <ElIcon className="mr-3" name="timer"></ElIcon>
                            {dayjs(date).format('YYYY/MM/DD')}
                        </span>
                    }
                </ElTooltip>
            ),
        },
        {
            key: 'name',
            title: 'Name',
            dataKey: 'name',
            width: 150,
            align: 'center',
            cellRenderer: ({ cellData: name }) => <ElTag>{name}</ElTag>,
        },
        {
            key: 'operations',
            title: 'Operations',
            cellRenderer: () => (
                <>
                    <ElButton size="small">Edit</ElButton>
                    <ElButton size="small" type="danger">
                        Delete
                    </ElButton>
                </>
            ),
            width: 150,
            align: 'center',
            flexGrow: 1,
        },
    ];

    const data = Array.from({ length: 200 }).map(dataGenerator);

    const rowClass = ({ rowIndex }) => {
        if (rowIndex % 10 === 5) {
            return 'bg-red-100';
        } else if (rowIndex % 10 === 0) {
            return 'bg-blue-200';
        }
        return '';
    };
    return (
        <>
            <ElTableV2 columns={columns} data={data} rowClass={rowClass} height={400} width={700} />
        </>
    );
};

export default App;
