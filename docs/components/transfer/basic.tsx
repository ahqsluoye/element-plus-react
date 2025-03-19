/* eslint-disable no-console */
import { ElTransfer } from '@parker/element-plus-react';
import React, { useMemo, useState } from 'react';

const App = () => {
    const mockData = useMemo(
        () =>
            new Array(20).fill(0).map((_, i) => {
                return {
                    key: i,
                    label: `content${i + 1}`,
                    description: `description of content${i + 1}`,
                };
            }),
        [],
    );

    const initialTargetKeys: (string | number)[] = useMemo(() => mockData.filter(item => +item.key > 10).map(item => item.key), [mockData]);
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([3, 18]);

    return (
        <ElTransfer
            data={mockData}
            titles={['Source', 'Target']}
            selectedKeys={selectedKeys}
            value={targetKeys}
            onChange={(nextTargetKeys, direction, newMoveKeys) => {
                setTargetKeys(nextTargetKeys);
                console.log(nextTargetKeys, direction, newMoveKeys);
            }}
            onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
            }}
        />
    );
};

export default App;
