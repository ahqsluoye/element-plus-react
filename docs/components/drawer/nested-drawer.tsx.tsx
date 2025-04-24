import { ElButton, ElDrawer } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const onClose1 = useCallback(() => {
        setVisible1(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)} autoInsertSpace={false}>
                打开对话框
            </ElButton>
            <ElDrawer size="50%" visible={visible} close={onClose} title={"I'm outer Drawer"}>
                <ElDrawer.body>
                    <ElButton onClick={() => setVisible1(true)}>点击我</ElButton>
                </ElDrawer.body>

                <ElDrawer visible={visible1} close={onClose1} title={"I'm inner Drawer"}>
                    <ElDrawer.body>
                        <p>_(:зゝ∠)_</p>
                    </ElDrawer.body>
                </ElDrawer>
            </ElDrawer>
        </>
    );
};

export default App;
