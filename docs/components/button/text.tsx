import { ElButton, TypeAttributes } from '@parker/element-plus-react';
import React from 'react';

const buttons: {
    type: TypeAttributes.Appearance;
    text: string;
}[] = [
    { type: 'default', text: '朴素按钮' },
    { type: 'primary', text: '主要按钮' },
    { type: 'success', text: '成功按钮' },
    { type: 'info', text: '信息按钮' },
    { type: 'warning', text: '警告按钮' },
    { type: 'danger', text: '危险按钮' },
];

const App = () => {
    return (
        <>
            <p>基础文字按钮</p>
            {buttons.map(item => (
                <ElButton text key={item.text} type={item.type}>
                    {item.text}
                </ElButton>
            ))}

            <p>显示文字按钮背景颜色</p>
            {buttons.map(item => (
                <ElButton text bg key={item.text} type={item.type}>
                    {item.text}
                </ElButton>
            ))}

            <p>禁用状态文字按钮</p>
            {buttons.map(item => (
                <ElButton text disabled key={item.text} type={item.type}>
                    {item.text}
                </ElButton>
            ))}
        </>
    );
};

export default App;
