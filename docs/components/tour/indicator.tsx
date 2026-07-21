import type { ButtonRef } from '@qsxy/element-plus-react';
import { ElButton, ElDivider, ElSpace, ElTour, ElTourStep } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';

export default function IndicatorTour() {
    const [open, setOpen] = useState(false);
    const ref1 = useRef<ButtonRef>(null);
    const ref2 = useRef<ButtonRef>(null);
    const ref3 = useRef<ButtonRef>(null);

    return (
        <>
            <ElButton type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </ElButton>
            <ElDivider />
            <ElSpace>
                <ElButton ref={ref1}>Upload</ElButton>
                <ElButton ref={ref2} type="primary">
                    Save
                </ElButton>
                <ElButton ref={ref3} icon={'ellipsis'} />
            </ElSpace>
            <ElTour
                visible={open}
                onChange={(_, visible) => setOpen(visible)}
                indicators={({ current, total }) => (
                    <span>
                        {current + 1} / {total}
                    </span>
                )}
            >
                <ElTourStep target={() => ref1.current?.ref.current} title="Step 1" description="First step" />
                <ElTourStep target={() => ref2.current?.ref.current} title="Step 2" description="Second step" />
                <ElTourStep target={() => ref3.current?.ref.current} title="Step 3" description="Third step" />
            </ElTour>
        </>
    );
}
