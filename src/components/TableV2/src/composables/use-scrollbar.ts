import React, { useCallback, useEffect, useRef, useState } from 'react';

import type { Alignment as ScrollStrategy } from '@qsxy/element-plus-react/VirtualList';
import type { TableV2Props } from '../table';
import type { TableGridInstance } from '../table-grid';

export type ScrollPos = { scrollLeft: number; scrollTop: number };
type GridInstanceRef = React.RefObject<TableGridInstance | null>;

type UseScrollbarProps = {
    mainTableRef: GridInstanceRef;
    leftTableRef: GridInstanceRef;
    rightTableRef: GridInstanceRef;

    onMaybeEndReached: (scrollPos: ScrollPos) => void;
};

export type { ScrollStrategy };

export const useScrollbar = (props: TableV2Props, { mainTableRef, leftTableRef, rightTableRef, onMaybeEndReached }: UseScrollbarProps) => {
    const [scrollPos, setScrollPos] = useState<ScrollPos>({ scrollLeft: 0, scrollTop: 0 });

    const doScroll = useCallback(
        (params: ScrollPos) => {
            const { scrollTop } = params;

            mainTableRef.current?.scrollTo?.(params);
            leftTableRef.current?.scrollToTop?.(scrollTop);
            rightTableRef.current?.scrollToTop?.(scrollTop);
        },
        [mainTableRef, leftTableRef, rightTableRef],
    );

    // methods
    const scrollTo = useCallback(
        (params: ScrollPos) => {
            setScrollPos(params);
            doScroll(params);
        },
        [doScroll],
    );

    const scrollToTop = useCallback(
        (scrollTop: number) => {
            setScrollPos(prev => ({ ...prev, scrollTop }));
            doScroll({ ...scrollPos, scrollTop });
        },
        [doScroll, scrollPos],
    );

    const scrollToLeft = useCallback(
        (scrollLeft: number) => {
            setScrollPos(prev => ({ ...prev, scrollLeft }));
            mainTableRef.current?.scrollTo?.({ scrollLeft, scrollTop: scrollPos.scrollTop });
        },
        [scrollPos.scrollTop, mainTableRef],
    );

    const onScroll = useCallback(
        (params: ScrollPos) => {
            scrollTo(params);
            props.onScroll?.(params);
        },
        [props, scrollTo],
    );

    const onVerticalScroll = useCallback(
        ({ scrollTop }: ScrollPos) => {
            const { scrollTop: currentScrollTop } = scrollPos;
            if (scrollTop !== currentScrollTop) {
                scrollToTop(scrollTop);
            }
        },
        [scrollPos, scrollToTop],
    );

    const scrollToRow = useCallback(
        (row: number, strategy: ScrollStrategy = 'auto') => {
            mainTableRef.current?.scrollToRow?.(row, strategy);
        },
        [mainTableRef],
    );

    // When scrollTop changes, maybe reaching the bottom
    // Equivalent to watch(() => scrollPos.scrollTop, ...)
    const prevScrollTopRef = useRef<number>(0);

    useEffect(() => {
        const cur = scrollPos.scrollTop;
        const prev = prevScrollTopRef.current;

        if (cur > prev) {
            onMaybeEndReached(scrollPos);
        }

        prevScrollTopRef.current = cur;
    }, [scrollPos.scrollTop]);

    return {
        scrollPos,

        scrollTo,
        scrollToLeft,
        scrollToTop,
        scrollToRow,
        onScroll,
        onVerticalScroll,
    };
};
