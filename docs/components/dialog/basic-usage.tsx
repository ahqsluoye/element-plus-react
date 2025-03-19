import { ElButton, ElDialog, ElMessageBox } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const beforeClose = useCallback(done => {
        ElMessageBox.confirm('Are you sure to close this dialog?')
            .then(() => {
                done();
            })
            .catch(() => {
                // catch error
            });
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDialog visible={visible} title="标题" width={500} close={() => setVisible(false)} beforeClose={beforeClose}>
                <ElDialog.body>
                    <span>This is a message</span>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton onClick={() => setVisible(false)}>取消</ElButton>
                    <ElButton type="primary" onClick={() => setVisible(false)}>
                        确定
                    </ElButton>
                </ElDialog.footer>
            </ElDialog>
        </>
    );
};

export default App;
