import classNames from 'classnames';
import { addClass, off, on, removeClass } from 'dom-lib';
import React, { FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import { Transition } from '../Transition';
import { useClassNames } from '../hooks';
import { BarProps } from './typings';
import { BAR_MAP, renderThumbStyle } from './util';

const Thumb: FC<BarProps> = props => {
    const { always, vertical, scrollbar, wrapRef, size, move } = props;
    const { b, e, is } = useClassNames('scrollbar');
    const instanceRef = useRef<HTMLDivElement>();
    const thumbRef = useRef<HTMLDivElement>();
    const bar = useMemo(() => BAR_MAP[vertical ? 'vertical' : 'horizontal'], [vertical]);
    const barStore = useRef({});
    const cursorDown = useRef(null);
    const cursorLeave = useRef(null);
    const [visible, setVisible] = useState(false);
    let onselectstartStore = null;

    const offsetRatio = useRef(0);

    const getOffsetRatio = () => {
        offsetRatio.current = instanceRef.current[bar.offset] ** 2 / wrapRef.current[bar.scrollSize] / props.ratio / thumbRef.current[bar.offset];
    };

    const onEnter = () => {
        // offsetRatioX = original width of thumb / current width of thumb / ratioX
        // offsetRatioY = original height of thumb / current height of thumb / ratioY
        // instance height = wrap height - GAP
        if (visible) {
            getOffsetRatio();
        }
    };

    const clickThumbHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // prevent click event of middle and right button
        event.stopPropagation();
        if (event.ctrlKey || [1, 2].includes(event.button)) {
            return;
        }
        window.getSelection().removeAllRanges();
        startDrag(event);
        Object.assign(barStore.current, {
            [bar.axis]: event.currentTarget[bar.offset] - (event[bar.client] - (event.currentTarget as HTMLElement).getBoundingClientRect()[bar.direction]),
        });
    };

    const clickTrackHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const offset = Math.abs((event.target as HTMLElement).getBoundingClientRect()[bar.direction] - event[bar.client]);
        const thumbHalf = thumbRef.current[bar.offset] / 2;
        if (always) {
            getOffsetRatio();
        }
        const thumbPositionPercentage = ((offset - thumbHalf) * 100 * offsetRatio.current) / instanceRef.current[bar.offset];

        wrapRef.current[bar.scroll] = (thumbPositionPercentage * wrapRef.current[bar.scrollSize]) / 100;
    };

    const startDrag = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        cursorDown.current = true;
        addClass(thumbRef.current, is('hover'));
        on(document, 'mousemove', mouseMoveDocumentHandler);
        on(document, 'mouseup', mouseUpDocumentHandler);
        onselectstartStore = document.onselectstart;
        document.onselectstart = () => false;
    };

    const mouseMoveDocumentHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (cursorDown.current === false) {
            return;
        }
        const prevPage = barStore.current[bar.axis];

        if (!prevPage) {
            return;
        }
        if (instanceRef.current && thumbRef.current && wrapRef.current) {
            const offset = instanceRef.current ? (instanceRef.current.getBoundingClientRect()[bar.direction] - event[bar.client]) * -1 : 0;
            const thumbClickPosition = thumbRef.current[bar.offset] - prevPage;
            if (always) {
                getOffsetRatio();
            }
            const thumbPositionPercentage = ((offset - thumbClickPosition) * 100 * offsetRatio.current) / instanceRef.current[bar.offset];
            wrapRef.current[bar.scroll] = (thumbPositionPercentage * wrapRef.current[bar.scrollSize]) / 100;
        }
    };

    const mouseUpDocumentHandler = () => {
        cursorDown.current = false;
        removeClass(thumbRef.current, is('hover'));
        Object.assign(barStore.current, {
            [bar.axis]: 0,
        });
        off(document, 'mousemove', mouseMoveDocumentHandler);
        off(document, 'mouseup', mouseUpDocumentHandler);
        document.onselectstart = onselectstartStore;
        if (cursorLeave.current) {
            setVisible(false);
        }
    };

    const thumbStyle = useMemo(() => {
        return renderThumbStyle({
            size,
            move,
            bar,
        });
    }, [size, move, bar]);

    const mouseMoveScrollbarHandler = () => {
        if (!always) {
            cursorLeave.current = false;
            setVisible(!!props.size);
        }
    };

    const mouseLeaveScrollbarHandler = () => {
        if (!always) {
            cursorLeave.current = true;
            setVisible(cursorDown.current);
        }
    };

    useEffect(() => {
        if (scrollbar.current) {
            on(scrollbar.current, 'mousemove', mouseMoveScrollbarHandler);
            on(scrollbar.current, 'mouseleave', mouseLeaveScrollbarHandler);
        }

        return () => {
            off(document, 'mouseup', mouseUpDocumentHandler);
            if (scrollbar.current) {
                off(scrollbar.current, 'mousemove', mouseMoveScrollbarHandler);
                // eslint-disable-next-line react-hooks/exhaustive-deps
                off(scrollbar.current, 'mouseleave', mouseLeaveScrollbarHandler);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Transition nodeRef={instanceRef} name={b`fade`} visible={always || visible} transitionAppear afterEnter={onEnter}>
            <div ref={instanceRef} className={classNames(e`bar`, is(bar.key, { always }))} onMouseDown={clickTrackHandler}>
                <div ref={thumbRef} className={classNames(e`thumb`)} style={thumbStyle} onMouseDown={clickThumbHandler} />
            </div>
        </Transition>
    );
};

export default memo(Thumb);
