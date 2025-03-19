import { ElButton, ElDialog, ElIcon } from '@parker/element-plus-react';
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
                            <ElIcon name="close" />
                            Close
                        </ElButton>
                    </div>
                }
                close={() => setVisible(false)}
            >
                <ElDialog.body>
                    <span>This is a message</span>
                </ElDialog.body>
            </ElDialog>
        </>
    );
};

export default App;
