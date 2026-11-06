import { ElCard, ElDatePickerPanel, ElDivider } from '@qsxy/element-plus-react';
import { useSize } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import './border.scss';

const App = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const size = useSize(containerRef);
    console.log(size);
    const isNarrow = useMemo(() => size?.width < 768, [size?.width]);

    return (
        <div ref={containerRef} className={classNames('date-picker--example', { 'is-narrow': isNarrow })}>
            <div className="text-center">No border:</div>
            <ElDivider />
            <div className="date-picker--flex-container">
                <div style={{ padding: '20px' }}>
                    <ElDatePickerPanel v-model="value" border={false} />
                </div>
                <ElDivider className="divider" direction={isNarrow ? 'horizontal' : 'vertical'} />
                <ElCard>
                    <ElDatePickerPanel v-model="value" border={false} />
                </ElCard>
            </div>
        </div>
    );
};

export default App;
