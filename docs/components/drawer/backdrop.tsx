import { ElButton, ElDrawer, ElSkeleton } from '@qsxy/element-plus-react';
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
            <ElDrawer backdrop={false} visible={dialogB} onClose={handleCloseB}>
                <ElDrawer.Header>标题</ElDrawer.Header>
                <ElDrawer.Body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
                </ElDrawer.Body>
                <ElDrawer.Footer>
                    <ElButton type="primary">确定</ElButton>
                    <ElButton onClick={handleCloseB}>取消</ElButton>
                </ElDrawer.Footer>
            </ElDrawer>

            <ElButton onClick={() => setDialogC(true)}>点击背景不能关闭的对话框</ElButton>
            <ElDrawer backdrop={'static'} visible={dialogC} onClose={handleCloseC}>
                <ElDrawer.Header>标题</ElDrawer.Header>
                <ElDrawer.Body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
                </ElDrawer.Body>
                <ElDrawer.Footer>
                    <ElButton type="primary">确定</ElButton>
                    <ElButton onClick={handleCloseC}>取消</ElButton>
                </ElDrawer.Footer>
            </ElDrawer>
        </>
    );
};

export default App;
