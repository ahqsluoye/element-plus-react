import { ElButton, ElMessage, ElMessageBox } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton
                onClick={() =>
                    ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                        draggable: true,
                    })
                        .then(() => {
                            ElMessage({
                                type: 'success',
                                message: 'Delete completed',
                            });
                        })
                        .catch(() => {
                            ElMessage({
                                type: 'info',
                                message: 'Delete canceled',
                            });
                        })
                }
                style={{ marginRight: 20 }}
            >
                点击打开可移动的 Message Box
            </ElButton>

            <ElButton
                onClick={() =>
                    ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                        type: 'warning',
                        draggable: true,
                        overflow: true,
                    })
                        .then(() => {
                            ElMessage({
                                type: 'success',
                                message: 'Delete completed',
                            });
                        })
                        .catch(() => {
                            ElMessage({
                                type: 'info',
                                message: 'Delete canceled',
                            });
                        })
                }
                style={{ marginRight: 20 }}
            >
                点击打开可移出视图外的 Message Box
            </ElButton>
        </>
    );
};

export default App;
