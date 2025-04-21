import { ElButton, ElTooltip } from '@qsxy/element-plus-react';
import React, { useEffect, useMemo, useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    } as DOMRect);

    const triggerRef = useMemo(
        () => ({
            getBoundingClientRect: () => position,
        }),
        [position],
    );

    const mousemoveHandler = ({ clientX, clientY }: MouseEvent) => {
        setPosition(
            DOMRect.fromRect({
                x: clientX,
                y: clientY,
            }),
        );
    };

    useEffect(() => {
        document.addEventListener('mousemove', mousemoveHandler);

        return () => {
            document.removeEventListener('mousemove', mousemoveHandler);
        };
    }, []);

    return (
        <ElTooltip visible={visible} content="Bottom center" placement="bottom" effect="light" trigger="click" virtualTriggering virtualRef={triggerRef}>
            <ElButton onClick={() => setVisible(!visible)}>Top center</ElButton>
        </ElTooltip>
    );
};

export default App;
