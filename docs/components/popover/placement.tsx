import { ElButton, ElPopover } from '@qsxy/element-plus-react';
import classNames from 'classnames';
import React from 'react';
import './style.scss';

const placement = [
    ['top-start', 'top', 'top-end'],
    ['left-start', 'right-start'],
    ['left', 'right'],
    ['left-end', 'right-end'],
    ['bottom-start', 'bottom', 'bottom-end'],
] as const;

const App = () => {
    return (
        <div className="popover-base-box">
            {placement.map((row, index) => (
                <div className={classNames('row', { center: index === 0 || index === 4 })} key={index}>
                    {row.map(item => (
                        <ElPopover key={item} className="box-item" placement={item} title="标题" trigger="hover" content={`${item} prompts info`} hideTimeout={0}>
                            <ElButton>{item}</ElButton>
                        </ElPopover>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default App;
