import { ElButton, ElDrawer, ElSkeleton, ModalProps } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [size, setSize] = useState<ModalProps['size']>('xs');

    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton
                onClick={() => {
                    setSize('xs');
                    setVisible(true);
                }}
                autoInsertSpace={false}
            >
                xs
            </ElButton>
            <ElButton
                onClick={() => {
                    setSize('small');
                    setVisible(true);
                }}
                autoInsertSpace={false}
            >
                small
            </ElButton>
            <ElButton
                onClick={() => {
                    setSize('md');
                    setVisible(true);
                }}
                autoInsertSpace={false}
            >
                md
            </ElButton>
            <ElButton
                onClick={() => {
                    setSize('large');
                    setVisible(true);
                }}
                autoInsertSpace={false}
            >
                large
            </ElButton>
            <ElButton
                onClick={() => {
                    setSize('full');
                    setVisible(true);
                }}
            >
                full
            </ElButton>
            <ElDrawer size={size} visible={visible} onClose={onClose}>
                <ElDrawer.Header>标题</ElDrawer.Header>
                <ElDrawer.Body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
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
