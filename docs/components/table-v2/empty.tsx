import { ElEmpty, ElTableV2 } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
        Array.from({ length }).map((_, columnIndex) => ({
            ...props,
            key: `${prefix}${columnIndex}`,
            dataKey: `${prefix}${columnIndex}`,
            title: `Column ${columnIndex}`,
            width: 150,
        }));

    const columns = generateColumns(10);

    return (
        <ElTableV2
            columns={columns}
            data={[]}
            width={700}
            height={400}
            rowHeight={40}
            footerHeight={50}
            empty={
                <div className="flex items-center justify-center h-100%">
                    <ElEmpty />
                </div>
            }
        />
    );
};

export default App;
