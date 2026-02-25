import { ElButton, ElMessageBox } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() => {
                ElMessageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'HTML String', {
                    dangerouslyUseHTMLString: true,
                });
            }}
        >
            点击打开 Message Box
        </ElButton>
    );
};

export default App;
