import { DrawerProps, ElButton, ElDrawer, ElSkeleton } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [placement, setPlacement] = useState<DrawerProps['direction']>('rtl');
    const [visible, setVisible] = useState(false);
    const onClose = useCallback(() => {
        setVisible(false);
    }, []);

    return (
        <>
            <ElButton
                onClick={() => {
                    setPlacement('ltr');
                    setVisible(true);
                }}
            >
                Left
            </ElButton>
            <ElButton
                onClick={() => {
                    setPlacement('rtl');
                    setVisible(true);
                }}
            >
                Right
            </ElButton>
            <ElButton
                onClick={() => {
                    setPlacement('ttb');
                    setVisible(true);
                }}
            >
                Top
            </ElButton>
            <ElButton
                onClick={() => {
                    setPlacement('btt');
                    setVisible(true);
                }}
            >
                Bottom
            </ElButton>
            <ElDrawer title="标题" visible={visible} direction={placement} onCloseDrawer={onClose}>
                <ElSkeleton rows={4}></ElSkeleton>
            </ElDrawer>
        </>
    );
};

export default App;
