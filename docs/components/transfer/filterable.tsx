import { ElTransfer } from '@qsxy/element-plus-react';
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

    const mockData1 = useMemo(
        () =>
            new Array(20).fill(0).map((_, i) => {
                return {
                    val: i,
                    desc: `Option ${i}`,
                    disable: i % 4 === 0,
                };
            }),
        [],
    );

    const initialTargetKeys: (string | number)[] = useMemo(() => mockData.filter(item => +item.key > 10).map(item => item.key), [mockData]);
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
    const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([3, 18]);

    return (
        <ElTransfer
            fieldNames={{ key: 'val', title: 'desc', disabled: 'disable' }}
            data={mockData1}
            filterable
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
