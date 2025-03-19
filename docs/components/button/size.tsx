import { ElButton } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <div className="mb-4">
                <ElButton size="large">大型按钮</ElButton>
                <ElButton size="default">默认按钮</ElButton>
                <ElButton size="small">小型按钮</ElButton>
                <ElButton size="large" icon="magnifying-glass">
                    搜索
                </ElButton>
                <ElButton icon="magnifying-glass">搜索</ElButton>
                <ElButton size="small" icon="magnifying-glass">
                    搜索
                </ElButton>
            </div>
            <div className="mb-4">
                <ElButton size="large" round>
                    大型按钮
                </ElButton>
                <ElButton size="default" round>
                    默认按钮
                </ElButton>
                <ElButton size="small" round>
                    小型按钮
                </ElButton>
                <ElButton size="large" icon="magnifying-glass" round>
                    搜索
                </ElButton>
                <ElButton icon="magnifying-glass" round>
                    搜索
                </ElButton>
                <ElButton size="small" icon="magnifying-glass" round>
                    搜索
                </ElButton>
            </div>
            <div className="mb-4">
                <ElButton icon="magnifying-glass" size="large" circle />
                <ElButton icon="magnifying-glass" size="default" circle />
                <ElButton icon="magnifying-glass" size="small" circle />
            </div>
        </>
    );
};

export default App;
