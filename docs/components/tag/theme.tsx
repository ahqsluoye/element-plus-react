import { ElTag, TagProps } from '@qsxy/element-plus-react';
import React, { useMemo } from 'react';
import './theme.scss';

const App = () => {
    type Item = { type: TagProps['type']; label: string };

    const items = useMemo<Array<Item>>(
        () => [
            { type: 'primary', label: '标签一' },
            { type: 'success', label: '标签二' },
            { type: 'info', label: '标签三' },
            { type: 'danger', label: '标签四' },
            { type: 'warning', label: '标签五' },
        ],
        [],
    );

    return (
        <>
            <div className="tag-group my-2 flex flex-wrap gap-1 items-center">
                <span className="tag-group__title m-1 line-height-2">Dark</span>
                {items.map(item => (
                    <ElTag key={item.type} type={item.type} theme="dark" className="mx-1">
                        {item.label}
                    </ElTag>
                ))}
                {items.map(item => (
                    <ElTag key={item.label} type={item.type} theme="dark" closable className="mx-1">
                        {item.label}
                    </ElTag>
                ))}
            </div>

            <div className="tag-group my-2 flex flex-wrap gap-1 items-center">
                <span className="tag-group__title m-1 line-height-2">Light</span>
                {items.map(item => (
                    <ElTag key={item.type} type={item.type} theme="light" className="mx-1">
                        {item.label}
                    </ElTag>
                ))}
                {items.map(item => (
                    <ElTag key={item.label} type={item.type} theme="light" closable className="mx-1">
                        {item.label}
                    </ElTag>
                ))}
            </div>

            <div className="tag-group my-2 flex flex-wrap gap-1 items-center">
                <span className="tag-group__title m-1 line-height-2">Plain</span>
                {items.map(item => (
                    <ElTag key={item.type} type={item.type} theme="plain" className="mx-1">
                        {item.label}
                    </ElTag>
                ))}
                {items.map(item => (
                    <ElTag key={item.label} type={item.type} theme="plain" closable className="mx-1">
                        {item.label}
                    </ElTag>
                ))}
            </div>
        </>
    );
};

export default App;
