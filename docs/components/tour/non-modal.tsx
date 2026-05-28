import { ElButton, ElDivider, ElSpace, ElTour, ElTourStep } from '@qsxy/element-plus-react';
import React, { useRef, useState } from 'react';

import { ButtonRef } from '@qsxy/element-plus-react/Button/typings';

export default function NonModalTour() {
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
            <ElTour visible={open} onChange={(_, visible) => setOpen(visible)} mask={false} type="primary">
                <ElTourStep target={() => ref1.current?.ref.current} title="Upload File">
                    <img style={{ width: 240 }} src="https://element-plus.org/images/element-plus-logo.svg" alt="tour.png" />
                    <div>Put you files here.</div>
                </ElTourStep>
                <ElTourStep target={() => ref2.current?.ref.current} title="Save" description="Save your changes" />
                <ElTourStep target={() => ref3.current?.ref.current} title="Other Actions" description="Click to see other" />
            </ElTour>
        </>
    );
}
