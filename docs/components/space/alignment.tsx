import { ElButton, ElCard, ElSpace } from '@qsxy/element-plus-react';
import React from 'react';
import './alignment.scss';

const App = () => {
    return (
        <>
            <div className="alignment-container">
                <ElSpace>
                    string
                    <ElButton> button </ElButton>
                    <ElCard header={<div>header</div>}>body</ElCard>
                </ElSpace>
            </div>
            <div className="alignment-container">
                <ElSpace alignment="flex-start">
                    string
                    <ElButton> button </ElButton>
                    <ElCard header={<div>header</div>}>body</ElCard>
                </ElSpace>
            </div>
            <div className="alignment-container">
                <ElSpace alignment="flex-end">
                    string
                    <ElButton> button </ElButton>
                    <ElCard header={<div>header</div>}>body</ElCard>
                </ElSpace>
            </div>
        </>
    );
};

export default App;
