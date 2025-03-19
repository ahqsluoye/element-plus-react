import { ElButton } from '@parker/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElButton type="primary" loading>
                加载中
            </ElButton>
            <ElButton type="primary" loadingIcon="circle-notch" loading>
                加载中
            </ElButton>
            <ElButton
                type="primary"
                loading
                loadingSlot={
                    <div className="custom-loading">
                        <svg className="circular" viewBox="-10, -10, 50, 50">
                            <path className="path" d="M 30 15L 28 17M 25.61 25.61A 15 15, 0, 0, 1, 15 30A 15 15, 0, 1, 1, 27.99 7.5L 15 15" style={{ strokeWidth: 4, fill: 'rgba(0, 0, 0, 0)' }} />
                        </svg>
                    </div>
                }
            >
                加载中
            </ElButton>
        </>
    );
};

export default App;
