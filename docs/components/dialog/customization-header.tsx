import { ElButton, ElDialog, ElIcon } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './customization-header.scss';

const App = () => {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <ElButton onClick={() => setVisible(true)}>打开对话框</ElButton>
            <ElDialog
                visible={visible}
                width={500}
                showClose={false}
                title={
                    <div className="my-header">
                        <h4>This is a custom header!</h4>
                        <ElButton type="danger" onClick={() => setVisible(false)}>
                            <ElIcon name="onCloseDialog" />
                            Close
                        </ElButton>
                    </div>
                }
                onCloseDialog={() => setVisible(false)}
            >
                <span>This is a message</span>
            </ElDialog>
        </>
    );
};

export default App;
