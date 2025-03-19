import ResizeObserver from 'rc-resize-observer';
import React, { forwardRef, Ref } from 'react';
import { ComponentChildren } from '../types/common';
// import ResizeObserver from 'resize-observer-polyfill';
import classNames from 'classnames';

interface FillerProps {
    prefixCls?: string;

    /** Virtual filler height. Should be `count * itemMinHeight` */
    height: number;

    /** Set offset of visible items. Should be the top of start item position */
    offset?: number;

    children: ComponentChildren;

    onInnerResize?: () => void;
}

/**
 * Fill component to provided the scroll content real height.
 */
const Filler = forwardRef(({ height, offset, children, prefixCls, onInnerResize }: FillerProps, ref: Ref<HTMLDivElement>) => {
    let outerStyle: React.CSSProperties = {};

    let innerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
    };

    if (offset !== undefined) {
        outerStyle = { height, position: 'relative', overflow: 'hidden' };

        innerStyle = {
            ...innerStyle,
            transform: `translateY(${offset}px)`,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
        };
    }

    return (
        <div style={outerStyle}>
            <ResizeObserver
                onResize={({ offsetHeight }) => {
                    if (offsetHeight && onInnerResize) {
                        onInnerResize();
                    }
                }}
            >
                <div
                    style={innerStyle}
                    className={classNames({
                        [`${prefixCls}-holder-inner`]: prefixCls,
                    })}
                    ref={ref}
                >
                    {children}
                </div>
            </ResizeObserver>
        </div>
    );
});

Filler.displayName = 'Filler';

export default Filler;
