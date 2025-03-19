import { ElButton, ElMessage, ElMessageBox } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElButton
            onClick={() =>
                ElMessageBox({
                    title: '消息',
                    message: React.createElement('p', null, [
                        React.createElement('span', null, '内容可以是 '),
                        React.createElement('i', { style: 'color: teal' }, 'React.ReactElement'),
                    ]),
                    showCancelButton: true,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    beforeClose: (action, done, instance) => {
                        if (action === 'confirm') {
                            instance.current.setConfirmButtonLoading(true);
                            instance.current.setConfirmButtonText('执行中...');
                            setTimeout(() => {
                                done();
                                setTimeout(() => {
                                    instance.current.setConfirmButtonLoading(false);
                                }, 300);
                            }, 3000);
                        } else {
                            done();
                        }
                    },
                }).then(action => {
                    ElMessage({
                        type: 'info',
                        message: `action: ${action}`,
                    });
                })
            }
        >
            点击打开 Message Box
        </ElButton>
    );
};

export default App;
