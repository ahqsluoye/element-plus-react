import { ButtonRef, ElButton, ElTour, ElTourStep } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';

export default function PlacementTour() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<ButtonRef>(null);

    return (
        <>
            <ElButton ref={btnRef} type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </ElButton>
            <ElTour visible={open} onChange={(_, visible) => setOpen(visible)}>
                <ElTourStep title="Center" description="Displayed in the center of screen." />
                <ElTourStep title="Right" description="On the right of target." placement="right" target={() => btnRef.current?.ref.current} />
                <ElTourStep title="Top" description="On the top of target." placement="top" target={() => btnRef.current?.ref.current} />
            </ElTour>
        </>
    );
}
