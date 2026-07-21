import type { TypeAttributes } from '@qsxy/element-plus-react';
import { ElDatePicker, ElRadioButton, ElRadioGroup } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './style.scss';

const App = () => {
    const shortcuts = [
        {
            text: '今天',
            value: new Date(),
        },
        {
            text: '昨天',
            value: () => {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                return date;
            },
        },
        {
            text: '9999-12-31',
            value: new Date('9999-12-31'),
        },
    ];

    const [size, setSize] = useState('default');

    return (
        <>
            <div>
                <ElRadioGroup value={size} onChange={(value: string) => setSize(value)}>
                    <ElRadioButton value="large">large</ElRadioButton>
                    <ElRadioButton value="default">default</ElRadioButton>
                    <ElRadioButton value="small">small</ElRadioButton>
                </ElRadioGroup>
            </div>

            <div className="demo-date-picker">
                <div className="block">
                    <span className="demonstration">默认选择器</span>
                    <ElDatePicker size={size as TypeAttributes.Size} style={{ width: 200 }} />
                </div>
                <div className="block">
                    <span className="demonstration">带快捷方式的选择器</span>
                    <ElDatePicker
                        shortcuts={shortcuts}
                        size={size as TypeAttributes.Size}
                        disabledDate={(time: Date) => {
                            return time.getTime() > Date.now();
                        }}
                        style={{ width: 200 }}
                    />
                </div>
            </div>
        </>
    );
};

export default App;
