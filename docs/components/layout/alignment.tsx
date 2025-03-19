import { ElCol, ElRow } from '@qsxy/element-plus-react';
import React from 'react';

const App = () => {
    return (
        <>
            <ElRow className="row-bg">
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow className="row-bg" justify="center">
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow className="row-bg" justify="end">
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow className="row-bg" justify="space-between">
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow className="row-bg" justify="space-around">
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
            <ElRow className="row-bg" justify="space-evenly">
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple-light" />
                </ElCol>
                <ElCol span={6}>
                    <div className="grid-content ep-bg-purple" />
                </ElCol>
            </ElRow>
        </>
    );
};

export default App;
