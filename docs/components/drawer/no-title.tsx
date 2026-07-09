import { ElButton, ElDrawer } from '@qsxy/element-plus-react';
import React, { useCallback, useState } from 'react';

const App = () => {
    const [dialogB, setDialogB] = useState(false);

    const handleCloseB = useCallback(() => {
        setDialogB(false);
    }, []);

    return (
        <>
            <ElButton onClick={() => setDialogB(true)}>打开对话框</ElButton>
            <ElDrawer visible={dialogB} onCloseDrawer={handleCloseB} withHeader={false}>
                Hi there!
            </ElDrawer>
        </>
    );
};

export default App;
