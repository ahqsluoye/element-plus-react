import { ElDateTimePicker } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElDateTimePicker style={{ width: 200, marginRight: 20 }} />
            <ElDateTimePicker
                format="YYYYMMDD HH:mm:ss"
                defaultValue="20220406 16:49:03"
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
    );
};

export default App;
