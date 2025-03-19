import { ElButton, ElMessage, ElMessageBox } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() =>
                ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    type: 'warning',
                })
                    .then(() => {
                        ElMessage({
                            type: 'success',
                            message: '删除成功!',
                        });
                    })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '已取消删除',
                        });
                    })
            }
            style={{ marginRight: 20 }}
        >
            点击打开 Message Box
        </ElButton>
    );
};

export default App;
