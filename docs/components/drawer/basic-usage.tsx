import { ElButton, ElDrawer, ElMessageBox, ElRadio, ElRadioGroup } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [direction, setDirection] = useState<'rtl' | 'ltr' | 'ttb' | 'btt'>('rtl');

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
                <ElRadio value="rtl">left to right</ElRadio>
                <ElRadio value="ltr">right to left</ElRadio>
                <ElRadio value="ttb">top to bottom</ElRadio>
                <ElRadio value="btt">bottom to top</ElRadio>
            </ElRadioGroup>

            <ElButton type="primary" onClick={() => setVisible(true)}>
                打开对话框
            </ElButton>
            <ElButton type="primary" onClick={() => setVisible1(true)}>
                带footer
            </ElButton>

            <ElDrawer visible={visible} onCloseDrawer={onClose} beforeClose={handleClose} direction={direction} title="标题">
                Hi, there!
            </ElDrawer>

            <ElDrawer
                visible={visible1}
                onCloseDrawer={onClose1}
                direction={direction}
                title="标题"
                footer={
                    <>
                        <ElButton onClick={onClose1}>取消</ElButton>
                        <ElButton type="primary" onClick={confirmClick}>
                            确定
                        </ElButton>
                    </>
                }
            >
                Hi, there!
            </ElDrawer>
        </>
    );
};

export default App;
