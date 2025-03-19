import debounce from 'lodash/debounce';
import isNumber from 'lodash/isNumber';
import { useCallback, useEffect, useRef } from 'react';
import { TableProps, TableRefs } from '../typings';
import { parseHeight } from '../util';

export const useScroll = <T>(props: TableProps<T>, data: T[], refs: TableRefs, m: (...classes: any[]) => string) => {
    const { maxHeight } = props;

    const hiddenDivRef = useRef<HTMLDivElement | null>(null);

    const debounceRefreshHeight = debounce(
        useCallback(() => {
            if (!hiddenDivRef.current) {
                const hiddenDiv = document.createElement('div');
                hiddenDiv.className = m`hidden-div`;
                hiddenDiv.style.height = maxHeight as string;
                if (refs.tableWrapper.current?.parentNode) {
                    refs.tableWrapper.current.parentNode.appendChild(hiddenDiv);
                }

                hiddenDivRef.current = hiddenDiv;
            }
            if (refs.headerWrapper.current && refs.scrollBarRef.current?.wrapRef.current) {
                refs.scrollBarRef.current.wrapRef.current.style.maxHeight = hiddenDivRef.current.clientHeight - refs.headerWrapper.current?.clientHeight + 'px';
                refs.scrollBarRef.current?.update();
            }
        }, [refs.headerWrapper, refs.scrollBarRef, refs.tableWrapper, m, maxHeight]),
        200,
    );

    const setHeight = useCallback(
        (height: number | string) => {
            if (refs.tableWrapper.current) {
                if (typeof height === 'number') {
                    refs.tableWrapper.current.style.height = height + 'px';
                } else {
                    refs.tableWrapper.current.style.height = height;
                }
            }
            if (refs.innerWrpper.current) {
                if (typeof height === 'number') {
                    refs.innerWrpper.current.style.height = height + 'px';
                } else {
                    refs.innerWrpper.current.style.height = height;
                }
            }
            refs.scrollBarRef?.current?.update();
        },
        [refs.innerWrpper, refs.scrollBarRef, refs.tableWrapper],
    );

    /** 滚动到一组特定坐标 */
    const scrollTo = useCallback(
        // eslint-disable-next-line no-undef
        (options: number, yCoord?: number) => {
            const scrollbar = refs.scrollBarRef;
            if (scrollbar.current) {
                scrollbar.current.scrollTo(options, yCoord);
            }
        },
        [refs.scrollBarRef],
    );

    const setScrollPosition = useCallback(
        (position: 'Top' | 'Left', offset?: number) => {
            const scrollbar = refs.scrollBarRef;
            if (scrollbar.current && isNumber(offset) && ['Top', 'Left'].includes(position)) {
                scrollbar.current[`setScroll${position}`](offset);
            }
        },
        [refs.scrollBarRef],
    );

    /** 设置滚动条到顶部的距离 */
    const setScrollTop = useCallback((top?: number) => setScrollPosition('Top', top), [setScrollPosition]);

    /** 设置滚动条到左边的距离 */
    const setScrollLeft = useCallback((left?: number) => setScrollPosition('Left', left), [setScrollPosition]);

    useEffect(() => {
        if (refs.tableWrapper.current && refs.headerWrapper.current) {
            if (maxHeight) {
                const _maxHeight = parseHeight(maxHeight);
                if (typeof _maxHeight === 'number') {
                    if (refs.headerWrapper.current && refs.scrollBarRef.current?.wrapRef.current) {
                        refs.scrollBarRef.current.wrapRef.current.style.maxHeight = _maxHeight - refs.headerWrapper.current?.clientHeight + 'px';
                        refs.scrollBarRef.current?.update();
                    }
                } else {
                    window.addEventListener('resize', debounceRefreshHeight);
                    debounceRefreshHeight();
                    return () => window.removeEventListener('resize', debounceRefreshHeight);
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length, maxHeight]);

    return { setHeight, scrollTo, setScrollTop, setScrollLeft };
};
