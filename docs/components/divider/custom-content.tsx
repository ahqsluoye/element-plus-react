import { ElDivider, ElIcon } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <span>头上一片晴天，心中一个想念</span>
            <ElDivider contentPosition="left">少年包青天</ElDivider>
            <span>饿了别叫妈, 叫饿了么</span>
            <ElDivider contentPosition="center">
                <ElIcon name="star" />
            </ElDivider>
            <span>为了无法计算的价值</span>
            <ElDivider contentPosition="right">阿里云</ElDivider>
        </div>
    );
};

export default App;
