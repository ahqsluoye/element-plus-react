import { ElDatePicker } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './style.scss';

const App = () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    return (
        <>
            <div className="demo-date-picker">
                <div className="block">
                    <span className="demonstration">默认为Date对象</span>
                    <div className="demonstration">Value: {value1.toString()}</div>
                    <ElDatePicker format="YYYY/MM/DD" onChange={v => setValue1(v)} style={{ width: 200 }} />
                </div>

                <div className="block">
                    <span className="demonstration">使用 valueFormat</span>
                    <div className="demonstration">Value：{value2}</div>
                    <ElDatePicker format="YYYY/MM/DD" valueFormat="YYYY-MM-DD" onChange={v => setValue2(v)} style={{ width: 200 }} />
                </div>

                <div className="block">
                    <span className="demonstration">时间戳</span>
                    <div className="demonstration">Value：{value3}</div>
                    <ElDatePicker format="YYYY/MM/DD" valueFormat="x" onChange={v => setValue3(v)} style={{ width: 200 }} />
                </div>
            </div>
        </>
    );
};

export default App;
