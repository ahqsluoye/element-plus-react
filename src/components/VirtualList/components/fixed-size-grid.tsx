import React from 'react';
import createGrid from '../builders/build-grid';
import { AUTO_ALIGNMENT, CENTERED_ALIGNMENT, END_ALIGNMENT, SMART_ALIGNMENT, START_ALIGNMENT } from '../defaults';

const SCOPE = 'ElFixedSizeGrid';

const FixedSizeGrid = createGrid({
    name: 'ElFixedSizeGrid',
    getColumnPosition: ({ columnWidth }, index) => [columnWidth as number, index * (columnWidth as number)],

    getRowPosition: ({ rowHeight }, index) => [rowHeight as number, index * (rowHeight as number)],

    getEstimatedTotalHeight: ({ totalRow, rowHeight }) => (rowHeight as number) * totalRow,

    getEstimatedTotalWidth: ({ totalColumn, columnWidth }) => (columnWidth as number) * totalColumn,

    getColumnOffset: ({ totalColumn, columnWidth, width }, columnIndex, alignment, scrollLeft, _, scrollBarWidth) => {
        width = Number(width);
        const lastColumnOffset = Math.max(0, totalColumn * (columnWidth as number) - width);
        const maxOffset = Math.min(lastColumnOffset, columnIndex * (columnWidth as number));
        const minOffset = Math.max(0, columnIndex * (columnWidth as number) - width + scrollBarWidth + (columnWidth as number));

        let finalAlignment = alignment;
        if (alignment === 'smart') {
            if (scrollLeft >= minOffset - width && scrollLeft <= maxOffset + width) {
                finalAlignment = AUTO_ALIGNMENT;
            } else {
                finalAlignment = CENTERED_ALIGNMENT;
            }
        }

        switch (finalAlignment) {
            case START_ALIGNMENT:
                return maxOffset;
            case END_ALIGNMENT:
                return minOffset;
            case CENTERED_ALIGNMENT: {
                const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
                if (middleOffset < Math.ceil(width / 2)) {
                    return 0;
                } else if (middleOffset > lastColumnOffset + Math.floor(width / 2)) {
                    return lastColumnOffset;
                } else {
                    return middleOffset;
                }
            }
            case AUTO_ALIGNMENT:
            default:
                if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
                    return scrollLeft;
                } else if (minOffset > maxOffset) {
                    return minOffset;
                } else if (scrollLeft < minOffset) {
                    return minOffset;
                } else {
                    return maxOffset;
                }
        }
    },

    getRowOffset: ({ rowHeight, height, totalRow }, rowIndex, align, scrollTop, _, scrollBarWidth): number => {
        height = Number(height);
        const lastRowOffset = Math.max(0, totalRow * (rowHeight as number) - height);
        const maxOffset = Math.min(lastRowOffset, rowIndex * (rowHeight as number));
        const minOffset = Math.max(0, rowIndex * (rowHeight as number) - height + scrollBarWidth + (rowHeight as number));

        let finalAlign = align;
        if (align === SMART_ALIGNMENT) {
            if (scrollTop >= minOffset - height && scrollTop <= maxOffset + height) {
                finalAlign = AUTO_ALIGNMENT;
            } else {
                finalAlign = CENTERED_ALIGNMENT;
            }
        }

        switch (finalAlign) {
            case START_ALIGNMENT:
                return maxOffset;
            case END_ALIGNMENT:
                return minOffset;
            case CENTERED_ALIGNMENT: {
                const middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);
                if (middleOffset < Math.ceil(height / 2)) {
                    return 0;
                } else if (middleOffset > lastRowOffset + Math.floor(height / 2)) {
                    return lastRowOffset;
                } else {
                    return middleOffset;
                }
            }
            case AUTO_ALIGNMENT:
            default:
                if (scrollTop >= minOffset && scrollTop <= maxOffset) {
                    return scrollTop;
                } else if (minOffset > maxOffset) {
                    return minOffset;
                } else if (scrollTop < minOffset) {
                    return minOffset;
                } else {
                    return maxOffset;
                }
        }
    },

    getColumnStartIndexForOffset: ({ columnWidth, totalColumn }, scrollLeft) => Math.max(0, Math.min(totalColumn - 1, Math.floor(scrollLeft / (columnWidth as number)))),

    getColumnStopIndexForStartIndex: ({ columnWidth, totalColumn, width }, startIndex: number, scrollLeft: number): number => {
        const left = startIndex * (columnWidth as number);
        const visibleColumnsCount = Math.ceil(((width as number) + scrollLeft - left) / (columnWidth as number));
        return Math.max(0, Math.min(totalColumn - 1, startIndex + visibleColumnsCount - 1));
    },

    getRowStartIndexForOffset: ({ rowHeight, totalRow }, scrollTop: number): number => Math.max(0, Math.min(totalRow - 1, Math.floor(scrollTop / (rowHeight as number)))),

    getRowStopIndexForStartIndex: ({ rowHeight, totalRow, height }, startIndex: number, scrollTop: number): number => {
        const top = startIndex * (rowHeight as number);
        const numVisibleRows = Math.ceil(((height as number) + scrollTop - top) / (rowHeight as number));
        return Math.max(
            0,
            Math.min(
                totalRow - 1,
                startIndex + numVisibleRows - 1, // -1 is because stop index is inclusive
            ),
        );
    },
    /**
     * Fixed size grid does not need this cache
     * Using any to bypass it, TODO: Using type inference to fix this.
     */
    initCache: () => undefined as any,

    clearCache: true,

    validateProps: ({ columnWidth, rowHeight }) => {
        if (typeof columnWidth !== 'number') {
            throw new Error(`[${SCOPE}] "columnWidth" must be passed as number, instead ${typeof columnWidth} was given.`);
        }

        if (typeof rowHeight !== 'number') {
            throw new Error(`[${SCOPE}] "rowHeight" must be passed as number, instead ${typeof rowHeight} was given.`);
        }
    },
});

export type FixedSizeGridInstance = React.ElementRef<typeof FixedSizeGrid> & unknown;
export default FixedSizeGrid;
