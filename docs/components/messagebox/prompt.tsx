import { ElButton, ElMessage, ElMessageBox } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() => {
                ElMessageBox.prompt('请输入邮箱', '提示', {
                    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    inputErrorMessage: '邮箱格式不正确',
                    beforeClose(action, done, ref) {
                        console.log(action, done, ref);
                        done();
                    },
                })
                    .then(({ value }) => {
                        ElMessage({
                            type: 'success',
                            message: `您的邮箱是:${value}`,
                        });
                    })
                    .catch(() => {
                        ElMessage({
                            type: 'info',
                            message: '取消输入',
                        });
                    });
            }}
        >
            点击打开 Message Box
        </ElButton>
    );
};

export default App;
