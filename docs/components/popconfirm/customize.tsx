import { ElButton, ElPopconfirm } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElPopconfirm confirmButtonText="好的" cancelButtonText="不用了" icon="circle-exclamation" iconColor="red" title="这是一段内容确定删除吗？">
            <ElButton>删除</ElButton>
        </ElPopconfirm>
    );
};

export default App;
