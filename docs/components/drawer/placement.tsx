import { DrawerProps, ElButton, ElDrawer, ElSkeleton } from '@parker/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
    const [visible, setVisible] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton
                onClick={() => {
                    setPlacement('left');
                    setVisible(true);
                }}
            >
                Left
            </ElButton>
            <ElButton
                onClick={() => {
                    setPlacement('right');
                    setVisible(true);
                }}
            >
                Right
            </ElButton>
            <ElButton
                onClick={() => {
                    setPlacement('top');
                    setVisible(true);
                }}
            >
                Top
            </ElButton>
            <ElButton
                onClick={() => {
                    setPlacement('bottom');
                    setVisible(true);
                }}
            >
                Bottom
            </ElButton>
            <ElDrawer visible={visible} placement={placement} onClose={onClose}>
                <ElDrawer.Header>标题</ElDrawer.Header>
                <ElDrawer.Body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
                </ElDrawer.Body>
            </ElDrawer>
        </>
    );
};

export default App;
