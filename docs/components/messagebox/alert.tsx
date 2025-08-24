import { ElButton, ElMessage, ElMessageBox } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() => {
                ElMessageBox.alert('这是一段内容', '标题名称', {
                    callback: action => {
                        ElMessage({
                            type: 'info',
                            message: `action: ${action}`,
                        });
                    },
                });
            }}
        >
            点击打开 Message Box
        </ElButton>
    );
};

export default App;
