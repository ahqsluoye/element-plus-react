import { ElDatePicker } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div className="demo-datetime-picker">
            <div className="block">
                <span className="demonstration">默认选择器</span>
                <ElDatePicker type="datetime" style={{ width: 200, marginRight: 20 }} />
            </div>
            <div className="block">
                <span className="demonstration">带快捷方式的选择器</span>
                <ElDatePicker
                    type="datetime"
                    format="YYYYMMDD HH:mm:ss"
                    style={{ width: 200, marginRight: 20 }}
                    shortcuts={[
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
                    ]}
                />
            </div>
            <div className="block">
                <span className="demonstration">带默认时间的选择器</span>
                <ElDatePicker type="datetime" format="YYYY-MM-DD HH:mm:ss" defaultTime={new Date(2000, 1, 1, 12, 0, 0)} style={{ width: 200, marginRight: 20 }} />
            </div>
        </div>
    );
};

export default App;
