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
                    disabled: i % 4 === 0,
                };
            }),
        [],
    );

    const initialTargetKeys: (string | number)[] = useMemo(() => mockData.filter(item => +item.key > 10).map(item => item.key), [mockData]);
    const [targetKeys, setTargetKeys] = useState(initialTargetKeys);

    return (
        <ElTransfer
            data={mockData}
            leftDefaultChecked={[3]}
            rightDefaultChecked={[18]}
            value={targetKeys}
            onChange={(nextTargetKeys, direction, newMoveKeys) => {
                setTargetKeys(nextTargetKeys);
                console.log(nextTargetKeys, direction, newMoveKeys);
            }}
            onLeftCheckChange={console.log}
            onRightCheckChange={console.log}
        />
    );
};

export default App;
