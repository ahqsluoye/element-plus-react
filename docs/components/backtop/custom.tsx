import React from 'react';
import { ElBacktop } from '@qsxy/element-plus-react';

const App = () => {
    return (
        <>
            Scroll down to see the bottom-right button.
            <ElBacktop bottom={100}>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: 'var(--el-bg-color-overlay)',
                        boxShadow: 'var(--el-box-shadow-lighter)',
                        textAlign: 'center',
                        lineHeight: '40px',
                        color: '#1989fa',
                    }}
                >
                    UP
                </div>
            </ElBacktop>
        </>
    );
};

export default App;