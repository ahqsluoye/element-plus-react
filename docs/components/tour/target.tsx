import { ButtonRef, ElButton, ElDivider, ElSpace, ElTour, ElTourStep } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';

export default function TargetTour() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<ButtonRef>(null);

    return (
        <>
            <ElButton type="primary" onClick={() => setOpen(true)}>
                Begin Tour
            </ElButton>
            <ElDivider />
            <ElSpace>
                <ElButton id="btn1">Upload</ElButton>
                <ElButton id="btn2" type="primary">
                    Save
                </ElButton>
                <ElButton ref={btnRef} icon={'ellipsis'} />
            </ElSpace>
            <ElTour visible={open} onChange={(_, visible) => setOpen(visible)}>
                <ElTourStep target="#btn1" title="CSS Selector" description="Using CSS selector as target." />
                <ElTourStep target={() => document.querySelector('#btn2')} title="Function" description="Using function as target." />
                <ElTourStep target={() => btnRef.current?.ref.current} title="Icon" description="Using icon as target." />
            </ElTour>
        </>
    );
}
