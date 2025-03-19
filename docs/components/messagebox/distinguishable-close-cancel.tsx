import { ElButton, ElMessage, ElMessageBox, MessageBoxAction } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() =>
                ElMessageBox.confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '保存',
                    cancelButtonText: '放弃修改',
                })
                    .then(() => {
                        ElMessage({
                            type: 'info',
                            message: '保存修改',
                        });
                    })
                    .catch((action: MessageBoxAction) => {
                        ElMessage({
                            type: 'info',
                            message: action === 'cancel' ? '放弃保存并离开页面' : '停留在当前页面',
                        });
                    })
            }
        >
            点击打开 Message Box
        </ElButton>
    );
};

export default App;
