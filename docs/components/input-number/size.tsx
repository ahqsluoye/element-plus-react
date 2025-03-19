import { ElCol, ElInputNumber, ElRow } from '@qsxy/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [value, setValue] = useState(1);

    return (
        <ElRow>
            <ElCol span={8}>
                <ElInputNumber
                    min={1}
                    max={10}
                    value={value}
                    size="large"
                    onChange={(val: number) => {
                        setValue(val);
                    }}
                    style={{ width: 200 }}
                />
            </ElCol>
            <ElCol span={8}>
                <ElInputNumber
                    min={1}
                    max={10}
                    value={value}
                    onChange={(val: number) => {
                        setValue(val);
                    }}
                    style={{ width: 200 }}
                />
            </ElCol>
            <ElCol span={8}>
                <ElInputNumber
                    min={1}
                    max={10}
                    value={value}
                    size="small"
                    onChange={(val: number) => {
                        setValue(val);
                    }}
                    style={{ width: 200 }}
                />
            </ElCol>
        </ElRow>
    );
};

export default App;
