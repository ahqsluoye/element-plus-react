import { ElIcon, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <ElSpace size={20}>
            <ElIcon prefix="fas" name="camera" size="xs" />
            <ElIcon prefix="fas" name="camera" size="small" />
            <ElIcon prefix="fas" name="camera" size="large" />
            <ElIcon prefix="fas" name="camera" size="2x" />
            <ElIcon prefix="fas" name="camera" size="3x" />
            <ElIcon prefix="fas" name="camera" size="5x" />
            <ElIcon prefix="fas" name="camera" size="7x" />
            <ElIcon prefix="fas" name="camera" size="10x" />
            <ElIcon prefix="fas" name="camera" size="12em" />
        </ElSpace>
    );
};

export default App;
