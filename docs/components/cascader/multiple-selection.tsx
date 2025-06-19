import { ElCascader } from '@qsxy/element-plus-react';
import React from 'react';
import { options1 } from './data';

const App = () => {
    return (
        <ElCascader
            filterable
            options={options1}
            props={{ multiple: true }}
            style={{ width: 500 }}
            clearable
            defaultValue={[
                ['guide', 'disciplines', 'consistency'],
                ['guide', 'disciplines', 'feedback'],
                ['guide', 'disciplines', 'efficiency'],
                ['component', 'navigation', 'side nav'],
                ['component', 'navigation', 'top nav'],
            ]}
            collapseTips={num => `鼠标悬浮查看更多（+${num}）`}
            onChange={(value, l, label) => {
                console.log(value, l, label);
            }}
        />
    );
};

export default App;
