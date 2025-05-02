import { ElTimeLine, ElTimeLineItem, IconMore } from '@qsxy/element-plus-react';
import React from 'react';

interface Activities {
    content?: string;
    timestamp?: string;
    color?: string;
    size?: 'normal' | 'large';
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    icon?: React.ReactElement;
    hollow?: boolean;
}

const activities: Activities[] = [
    {
        content: '支持使用图标',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: <IconMore />,
    },
    {
        content: '支持自定义颜色',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
    },
    {
        content: '支持自定义尺寸',
        timestamp: '2018-04-03 20:46',
        size: 'large',
    },
    {
        content: '支持空心点',
        timestamp: '2018-04-03 20:46',
        type: 'danger',
        hollow: true,
    },
    {
        content: '默认样式的节点',
        timestamp: '2018-04-03 20:46',
    },
];

const App = () => {
    return (
        <ElTimeLine>
            {activities.map((item, index) => {
                return (
                    <ElTimeLineItem key={index} icon={item.icon} type={item.type} color={item.color} size={item.size} hollow={item.hollow} timestamp={item.timestamp}>
                        {item.content}
                    </ElTimeLineItem>
                );
            })}
        </ElTimeLine>
    );
};

export default App;
