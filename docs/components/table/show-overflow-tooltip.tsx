import { ElTable, ElTableColumn } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElTable
            data={[
                {
                    date: '2016-05-04',
                    name: 'Aleyna Kutzner',
                    address: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
                },
                {
                    date: '2016-05-03',
                    name: 'Helen Jacobi',
                    address: '760 A Street, South Frankfield, Illinois',
                },
                {
                    date: '2016-05-02',
                    name: 'Brandon Deckert',
                    address: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
                },
                {
                    date: '2016-05-01',
                    name: 'Margie Smith',
                    address: '23618 Windsor Drive, West Ricardoview, Idaho',
                },
            ]}
            style={{ width: '100%' }}
        >
            <ElTableColumn type="selection" width={55} />
            <ElTableColumn prop="date" label="Date" width={120} />
            <ElTableColumn prop="name" label="Name" width={120} />
            <ElTableColumn prop="address" label="use show-overflow-tooltip" width={240} showOverflowTooltip />
            <ElTableColumn prop="address" label="Address" />
        </ElTable>
    );
};

export default App;
