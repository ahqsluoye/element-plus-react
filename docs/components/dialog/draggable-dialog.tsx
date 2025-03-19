import { ElButton, ElDialog } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton
                onClick={() => {
                    setVisible(true);
                    setOverflow(false);
                }}
            >
                打开对话框
            </ElButton>
            <ElButton
                onClick={() => {
                    setVisible(true);
                    setOverflow(true);
                }}
            >
                打开一个可拖拽超出可视区范围的对话框
            </ElButton>

            <ElDialog draggable visible={visible} overflow={overflow} beforeClose={onClose} width={500}>
                <ElDialog.header>标题</ElDialog.header>
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
