import { ElButton, ElTooltip } from '@qsxy/element-plus-react';
import React, { useState } from 'react';
import './singleton.scss';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [virtualRef, setVirtualRef] = useState(null);

    return (
        <div>
            {Array.from({ length: 3 }).map((_, i) => (
                <ElButton key={i} onClick={() => setVisible(!visible)} onMouseOver={e => setVirtualRef(e.currentTarget)}>
                    Click to open tooltip
                </ElButton>
            ))}
            <ElTooltip
                visible={visible}
                onMouseLeave={() => setVisible(false)}
                content=" Some content "
                placement="bottom"
                trigger="click"
                virtualTriggering
                virtualRef={virtualRef}
                popperClass="singleton-tooltip"
            />
        </div>
    );
};

export default App;
