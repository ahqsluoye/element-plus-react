import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import React, { Children } from 'react';
import type { AutoResizerProps } from '../auto-resizer';
import { useAutoResize } from '../composables/use-auto-resize';

const AutoResizer: React.FC<AutoResizerProps> = ({ children, disableWidth, disableHeight, onResize }) => {
    const ns = useClassNames('auto-resizer');
    const { height, width, sizer } = useAutoResize({
        disableWidth,
        disableHeight,
        onResize,
    });

    return (
        <div
            ref={sizer}
            className={ns.b()}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {Children.map(children, child => React.cloneElement(child, { height, width }))}
        </div>
    );
};

export default AutoResizer;
