import { ElButton, ElDialog } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './draggable-dialog.scss';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [dialogOverflowVisible, setDialogOverflowVisible] = useState(false);
    const [customDraggingVisible, setCustomDraggingVisible] = useState(false);

    return (
        <>
            <ElButton
                onClick={() => {
                    setVisible(true);
                }}
            >
                打开对话框
            </ElButton>

            <ElButton
                onClick={() => {
                    setDialogOverflowVisible(true);
                }}
            >
                打开一个可拖拽超出可视区范围的对话框
            </ElButton>

            <ElButton
                onClick={() => {
                    setCustomDraggingVisible(true);
                }}
            >
                打开一个可自定义拖拽样式的对话框
            </ElButton>

            <ElDialog draggable title="标题" visible={visible} close={() => setVisible(false)} width={500}>
                <ElDialog.body>
                    <span>It's a draggable Dialog</span>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton onClick={() => setVisible(false)}>取消</ElButton>
                    <ElButton type="primary" onClick={() => setVisible(false)}>
                        确定
                    </ElButton>
                </ElDialog.footer>
            </ElDialog>

            <ElDialog draggable title="标题" visible={dialogOverflowVisible} overflow close={() => setDialogOverflowVisible(false)} width={500}>
                <ElDialog.body>
                    <span>It's a overflow draggable Dialog</span>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton onClick={() => setDialogOverflowVisible(false)}>取消</ElButton>
                    <ElButton type="primary" onClick={() => setDialogOverflowVisible(false)}>
                        确定
                    </ElButton>
                </ElDialog.footer>
            </ElDialog>

            <ElDialog draggable title="标题" visible={customDraggingVisible} className="custom-dragging-style" overflow close={() => setCustomDraggingVisible(false)} width={500}>
                <ElDialog.body>
                    <span>This dialog has custom dragging styles. Try dragging it to see the effects!</span>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton onClick={() => setCustomDraggingVisible(false)}>取消</ElButton>
                    <ElButton type="primary" onClick={() => setCustomDraggingVisible(false)}>
                        确定
                    </ElButton>
                </ElDialog.footer>
            </ElDialog>
        </>
    );
};

export default App;
