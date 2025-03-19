import { ElButton, ElDrawer, ElSkeleton } from '@parker/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDrawer visible={visible} onClose={onClose}>
                <ElDrawer.Header>标题</ElDrawer.Header>
                <ElDrawer.Body>
                    <ElSkeleton.Paragraph rows={30} active></ElSkeleton.Paragraph>
                </ElDrawer.Body>
                <ElDrawer.Footer>
                    <ElButton type="primary">确定</ElButton>
                    <ElButton onClick={onClose}>取消</ElButton>
                </ElDrawer.Footer>
            </ElDrawer>
        </>
    );
};

export default App;
