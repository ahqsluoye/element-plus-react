import { ElButton, ElDialog, ElSkeleton } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [dialogB, setDialogB] = useState(false);
    const [dialogC, setDialogC] = useState(false);

    const handleCloseB = useCallback(() => {
        setDialogB(false);
    }, []);

    const handleCloseC = useCallback(() => {
        setDialogC(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setDialogB(true)}>无背景的对话框</ElButton>
            <ElDialog modal={false} title="标题" visible={dialogB} beforeClose={handleCloseB}>
                <ElDialog.body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton type="primary">确定</ElButton>
                    <ElButton onClick={() => setDialogB(false)}>取消</ElButton>
                </ElDialog.footer>
            </ElDialog>

            <ElButton onClick={() => setDialogC(true)}>点击背景不能关闭的对话框</ElButton>
            <ElDialog closeOnClickModal={false} title="标题" visible={dialogC} beforeClose={handleCloseC}>
                <ElDialog.body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
                </ElDialog.body>
                <ElDialog.footer>
                    <ElButton type="primary">确定</ElButton>
                    <ElButton onClick={() => setDialogC(false)}>取消</ElButton>
                </ElDialog.footer>
            </ElDialog>
        </>
    );
};

export default App;
