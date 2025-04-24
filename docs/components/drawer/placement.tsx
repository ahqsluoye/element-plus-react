import { DrawerProps, ElButton, ElDrawer, ElSkeleton } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [placement, setPlacement] = useState<DrawerProps['direction']>('right');
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
            <ElDrawer visible={visible} direction={placement} close={onClose}>
                <ElDrawer.header>标题</ElDrawer.header>
                <ElDrawer.body>
                    <ElSkeleton.Paragraph rows={4}></ElSkeleton.Paragraph>
                </ElDrawer.body>
            </ElDrawer>
        </>
    );
};

export default App;
