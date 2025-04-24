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
            <ElDrawer visible={dialogB} close={handleCloseB} withHeader={false}>
                <ElDrawer.body>Hi there!</ElDrawer.body>
            </ElDrawer>
        </>
    );
};

export default App;
