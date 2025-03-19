import { ElButton, ElDialog } from '@parker/element-plus-react';
import React, { useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDialog visible={visible} title="外部对话框" width={800} close={() => setVisible(false)}>
                <ElDialog.body>
                    <span>我是外部对话框</span>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton onClick={() => setVisible(false)}>取消</ElButton>
                    <ElButton type="primary" onClick={() => setVisible1(true)}>
                        打开嵌套对话框
                    </ElButton>
                </ElDialog.footer>
            </ElDialog>

            <ElDialog visible={visible1} width={500} close={() => setVisible1(false)}>
                <ElDialog.header>内部对话框</ElDialog.header>
                <ElDialog.body>
                    <span>我是内部对话框</span>
                </ElDialog.body>
            </ElDialog>
        </>
    );
};

export default App;
