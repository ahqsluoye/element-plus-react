import { ElTimeLine, ElTimeLineItem } from '@qsxy/element-plus-react';
import React from 'react';

const activities = [
    {
        content: '活动按期开始',
        timestamp: '2018-04-15',
    },
    {
        content: '通过审核',
        timestamp: '2018-04-13',
    },
    {
        content: '创建成功',
        timestamp: '2018-04-11',
    },
];

const App = () => {
    return (
        <ElTimeLine>
            {activities.map((item, index) => {
                return (
                    <ElTimeLineItem key={index} timestamp={item.timestamp}>
                        {item.content}
                    </ElTimeLineItem>
                );
            })}
        </ElTimeLine>
    );
};

export default App;
