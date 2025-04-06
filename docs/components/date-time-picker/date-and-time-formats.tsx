import { ElDatePicker } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './style.scss';

const App = () => {
    const [value1, setValue1] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    return (
        <>
            <div className="demo-date-picker">
                <div className="block">
                    <span className="demonstration">默认为Date对象</span>
                    <div className="demonstration">Value: {value1?.toString()}</div>
                    <ElDatePicker type="datetime" format="YYYY/MM/DD HH:mm:ss" onChange={v => setValue1(v)} style={{ width: 200 }} />
                </div>

                <div className="block">
                    <span className="demonstration">使用 valueFormat</span>
                    <div className="demonstration">Value：{value2}</div>
                    <ElDatePicker type="datetime" format="YYYY/MM/DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" onChange={v => setValue2(v)} style={{ width: 200 }} />
                </div>

                <div className="block">
                    <span className="demonstration">时间戳</span>
                    <div className="demonstration">Value：{value3}</div>
                    <ElDatePicker type="datetime" format="YYYY/MM/DD HH:mm:ss" valueFormat="x" onChange={v => setValue3(v)} style={{ width: 200 }} />
                </div>
            </div>
        </>
    );
};

export default App;
