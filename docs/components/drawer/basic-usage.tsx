import { ElButton, ElDrawer, ElMessageBox, ElRadio, ElRadioGroup } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [direction, setDirection] = useState<'right' | 'top' | 'bottom' | 'left'>('right');

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    const onClose1 = useCallback(() => {
        setVisible1(false);
    }, []);

    const handleClose = (done: () => void) => {
        ElMessageBox.confirm('Are you sure you want to close this?')
            .then(() => {
                done();
            })
            .catch(() => {
                // catch error
            });
    };

    function confirmClick() {
        ElMessageBox.confirm('Are you sure you want to close this?')
            .then(() => {
                onClose1();
            })
            .catch(() => {
                // catch error
            });
    }

    return (
        <>
            <ElRadioGroup value={direction} onChange={setDirection}>
                <ElRadio value="left">left to right</ElRadio>
                <ElRadio value="right">right to left</ElRadio>
                <ElRadio value="top">top to bottom</ElRadio>
                <ElRadio value="bottom">bottom to top</ElRadio>
            </ElRadioGroup>

            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElButton onClick={() => setVisible1(true)}>带footer</ElButton>

            <ElDrawer visible={visible} close={onClose} beforeClose={handleClose} direction={direction} title="标题">
                <ElDrawer.body>Hi, there!</ElDrawer.body>
            </ElDrawer>

            <ElDrawer visible={visible1} close={onClose1} direction={direction} title="标题">
                <ElDrawer.body>Hi, there!</ElDrawer.body>
                <ElDrawer.footer>
                    <ElButton onClick={onClose1}>取消</ElButton>
                    <ElButton type="primary" onClick={confirmClick}>
                        确定
                    </ElButton>
                </ElDrawer.footer>
            </ElDrawer>
        </>
    );
};

export default App;
