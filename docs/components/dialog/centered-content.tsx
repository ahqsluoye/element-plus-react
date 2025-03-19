import { ElButton, ElDialog } from '@parker/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)} autoInsertSpace={false}>
                打开对话框
            </ElButton>
            <ElDialog visible={visible} close={onClose} center width={500}>
                <ElDialog.header>标题</ElDialog.header>
                <ElDialog.body>需要注意的是，内容默认情况下不会居中对齐。</ElDialog.body>
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
