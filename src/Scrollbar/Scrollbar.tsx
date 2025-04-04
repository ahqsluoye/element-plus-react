import classNames from 'classnames';
import isNumber from 'lodash/isNumber';
import isObject from 'lodash/isObject';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { mergeDefaultProps } from '../Util';
import { addResizeListener, removeResizeListener } from '../Util/resize-event';
import { partitionHTMLProps, useClassNames } from '../hooks';
import Thumb from './Thumb';
import { ScrollbarProps, ScrollbarRef, ScrollToOptions } from './typings';

const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            native: false,
            tag: 'div',
            always: false,
            minSize: 20,
            height: '100%',
            showHorizontal: true,
            showVertical: true,
        },
        props,
    );
    const { tag, className, style, wrapClass, wrapStyle, viewClass, viewStyle, native, height, maxHeight, minSize, always, onScroll, showHorizontal, showVertical, ...rest } =
        props;
    const { b, e, em } = useClassNames('scrollbar');
    const [htmlInputProps] = partitionHTMLProps(rest);
    const containerRef = useRef<HTMLDivElement>();
    const wrapRef = useRef<HTMLDivElement>();
    const resizeRef = useRef<any>();

    const [sizeWidth, setSizeWidth] = useState('0');
    const [sizeHeight, setSizeHeight] = useState('0');
    const [moveX, setMoveX] = useState(0);
    const [moveY, setMoveY] = useState(0);
    const [ratioX, setRatioX] = useState(1);
    const [ratioY, setRatioY] = useState(1);

    const GAP = 4; // top 2 + bottom 2 of bar instance

    const handleScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
            if (wrapRef.current) {
                const offsetHeight = wrapRef.current.offsetHeight - GAP;
                const offsetWidth = wrapRef.current.offsetWidth - GAP;

                setMoveX(((wrapRef.current.scrollLeft * 100) / offsetWidth) * ratioX);
                setMoveY(((wrapRef.current.scrollTop * 100) / offsetHeight) * ratioY);

                onScroll?.({
                    e: event,
                    scrollTop: wrapRef.current.scrollTop,
                    scrollLeft: wrapRef.current.scrollLeft,
                });
            }
        },
        [ratioX, ratioY, onScroll],
    );

    /** 滚动到一组特定坐标 */
    const scrollTo = useCallback((options: ScrollToOptions | number, yCoord?: number) => {
        if (wrapRef.current) {
            if (isObject(options)) {
                wrapRef.current.scrollTo(options);
            } else if (isNumber(options) && isNumber(yCoord)) {
                wrapRef.current.scrollTo(options, yCoord);
            }
        }
    }, []);

    const setScrollTop = useCallback((value: number) => {
        if (!value) {
            return;
        }
        wrapRef.current.scrollTop = value;
    }, []);

    const setScrollLeft = useCallback((value: number) => {
        if (!value) {
            return;
        }
        wrapRef.current.scrollLeft = value;
    }, []);

    const update = useCallback(() => {
        if (!wrapRef.current) {
            return;
        }

        const offsetHeight = wrapRef.current.offsetHeight - GAP;
        const offsetWidth = wrapRef.current.offsetWidth - GAP;

        const originalHeight = offsetHeight ** 2 / wrapRef.current.scrollHeight;
        const originalWidth = offsetWidth ** 2 / wrapRef.current.scrollWidth;
        const _height = Math.max(originalHeight, minSize);
        const width = Math.max(originalWidth, minSize);

        setRatioY(originalHeight / (offsetHeight - originalHeight) / (_height / (offsetHeight - _height)));
        setRatioX(originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width)));

        setSizeHeight(_height + GAP < offsetHeight ? _height + 'px' : '');
        setSizeWidth(width + GAP < offsetWidth ? width + 'px' : '');
    }, [minSize]);

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        scrollTo,
        setScrollLeft,
        setScrollTop,
        update,
        wrapRef,
        resizeRef,
    }));

    useEffect(() => {
        if (!props.native) {
            update();
        }
        if (!props.noresize) {
            addResizeListener(resizeRef.current, update);
            addEventListener('resize', update);
        }
        return () => {
            if (!props.noresize) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                removeResizeListener(resizeRef.current, update);
                removeEventListener('resize', update);
            }
        };
    }, [props.native, props.noresize, update]);

    return (
        <div ref={containerRef} className={classNames(b(), className)} style={{ ...style, height }}>
            <div
                ref={wrapRef}
                className={classNames(wrapClass, e`wrap`, { [em('wrap', 'hidden-default')]: !native })}
                style={{ ...wrapStyle, maxHeight }}
                onScroll={event => handleScroll(event)}
            >
                {React.createElement(
                    tag,
                    {
                        ref: resizeRef,
                        className: classNames(viewClass, e`view`),
                        style: viewStyle,
                        ...htmlInputProps,
                    },
                    props.children,
                )}
            </div>
            {!native ? (
                <>
                    {showHorizontal && <Thumb move={moveX} ratio={ratioX} size={sizeWidth} vertical={false} always={always} scrollbar={containerRef} wrapRef={wrapRef} />}
                    {showVertical && <Thumb move={moveY} ratio={ratioY} size={sizeHeight} vertical={true} always={always} scrollbar={containerRef} wrapRef={wrapRef} />}
                </>
            ) : null}
        </div>
    );
});

Scrollbar.displayName = 'ElScrollbar';

export default Scrollbar;
