import { ElButton, ElTooltip } from '@qsxy/element-plus-react';
import React from 'react';
import './basic.scss';

const App = () => {
    return (
        <div className="tooltip-base-box">
            <div className="row center">
                <ElTooltip className="item" effect="dark" content="Top Left 提示文字" placement="top-start">
                    <ElButton>上左</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Top Center 提示文字" placement="top">
                    <ElButton>上边</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Top Right 提示文字" placement="top-end">
                    <ElButton>上右</ElButton>
                </ElTooltip>
            </div>

            <div className="row">
                <ElTooltip className="item" effect="dark" content="Left Top 提示文字" placement="left-start">
                    <ElButton>左上</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Right Top 提示文字" placement="right-start">
                    <ElButton>右上</ElButton>
                </ElTooltip>
            </div>

            <div className="row">
                <ElTooltip className="item" effect="dark" content="Left Center 提示文字" placement="left">
                    <ElButton>左边</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Right Center 提示文字" placement="right">
                    <ElButton>右边</ElButton>
                </ElTooltip>
            </div>

            <div className="row">
                <ElTooltip className="item" effect="dark" content="Left Bottom 提示文字" placement="left-end">
                    <ElButton>左下</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Right Bottom 提示文字" placement="right-end">
                    <ElButton>右下</ElButton>
                </ElTooltip>
            </div>

            <div className="row center">
                <ElTooltip className="item" effect="dark" content="Bottom Left 提示文字" placement="bottom-start">
                    <ElButton>下左</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                    <ElButton>下边</ElButton>
                </ElTooltip>
                <ElTooltip className="item" effect="dark" content="Bottom Right 提示文字" placement="bottom-end">
                    <ElButton>下右</ElButton>
                </ElTooltip>
            </div>
        </div>
    );
};

export default App;
