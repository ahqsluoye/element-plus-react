import { ElIcon, ElInput } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <div>
            <ElInput placeholder="请输入关键词" prefix={<ElIcon prefix="fal" name="search" />} />
            <ElInput placeholder="日期" suffix={<ElIcon prefix="fal" name="calendar-days" />} />
        </div>
    );
};

export default App;
