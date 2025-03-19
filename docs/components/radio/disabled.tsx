import { ElRadio } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <div>
            <ElRadio disabled checked>
                选中且禁用
            </ElRadio>
            <ElRadio disabled>备选项</ElRadio>
        </div>
    );
};

export default App;
