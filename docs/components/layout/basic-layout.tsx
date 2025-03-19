import { ElCol, ElRow } from '@qsxy/element-plus-react';
import React from 'react';
import './style.scss';

const App = () => {
    return (
        <>
            <ElRow>
                <ElCol span={24}>
                    <div className="grid-content ep-bg-purple-dark" />
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol span={12}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={12}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol span={8}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={8}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={8}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
            </ElRow>
            <ElRow>
                <ElCol span={4}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={4}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={4}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={4}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={4}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={4}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
            </ElRow>
        </>
    );
};

export default App;
