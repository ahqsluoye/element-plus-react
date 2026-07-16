import isNumber from 'lodash/isNumber';
import { CSSProperties, useMemo } from 'react';
import { enforceUnit, sum } from '../utils';

import { addUnit } from '@qsxy/element-plus-react/Util/base';
import type { TableV2Props } from '../table';
import type { UseColumnsReturn } from './use-columns';

type UseStyleProps = {
    columnsTotalWidth: UseColumnsReturn['columnsTotalWidth'];
    fixedColumnsOnLeft: UseColumnsReturn['fixedColumnsOnLeft'];
    fixedColumnsOnRight: UseColumnsReturn['fixedColumnsOnRight'];
    rowsHeight: number;
};

export const useStyles = (props: TableV2Props, { columnsTotalWidth, rowsHeight, fixedColumnsOnLeft, fixedColumnsOnRight }: UseStyleProps) => {
    const bodyWidth = useMemo(() => {
        const { fixed, width, vScrollbarSize } = props;
        const ret = width - vScrollbarSize;
        return fixed ? Math.max(Math.round(columnsTotalWidth), ret) : ret;
    }, [columnsTotalWidth, props.fixed, props.vScrollbarSize, props.width]);

    const headerHeight = useMemo(() => sum(props.headerHeight), [props.headerHeight]);

    const fixedRowsHeight = useMemo(() => {
        return (props.fixedData?.length || 0) * props.rowHeight;
    }, [props.fixedData, props.rowHeight]);

    const mainTableHeight = useMemo(() => {
        const { height = 0, maxHeight = 0, footerHeight, hScrollbarSize } = props;

        if (maxHeight > 0) {
            const total = headerHeight + fixedRowsHeight + rowsHeight + hScrollbarSize;

            return Math.min(total, maxHeight - footerHeight);
        }

        return height - footerHeight;
    }, [headerHeight, fixedRowsHeight, props.footerHeight, props.hScrollbarSize, props.height, props.maxHeight, rowsHeight]);

    const fixedTableHeight = useMemo(() => {
        const { maxHeight } = props;
        const tableHeight = mainTableHeight;
        if (isNumber(maxHeight) && maxHeight > 0) {
            return tableHeight;
        }

        const totalHeight = rowsHeight + headerHeight + fixedRowsHeight;

        return Math.min(tableHeight, totalHeight);
    }, [headerHeight, fixedRowsHeight, mainTableHeight, props.maxHeight, rowsHeight]);

    const mapColumn = (column: TableV2Props['columns'][number]) => column.width;

    const leftTableWidth = useMemo(() => sum(fixedColumnsOnLeft.map(mapColumn)), [fixedColumnsOnLeft]);

    const rightTableWidth = useMemo(() => sum(fixedColumnsOnRight.map(mapColumn)), [fixedColumnsOnRight]);

    const windowHeight = useMemo(() => {
        return mainTableHeight - headerHeight - fixedRowsHeight;
    }, [mainTableHeight, headerHeight, fixedRowsHeight]);

    const rootStyle = useMemo<CSSProperties>(() => {
        const { height, width } = props;
        return enforceUnit({
            height,
            width,
        });
    }, [props.height, props.width]);

    const footerHeight = useMemo(() => enforceUnit({ height: props.footerHeight }), [props.footerHeight]);

    const emptyStyle = useMemo<CSSProperties>(
        () => ({
            top: addUnit(headerHeight),
            bottom: addUnit(props.footerHeight),
            width: addUnit(props.width),
        }),
        [headerHeight, props.footerHeight, props.width],
    );

    return {
        bodyWidth,
        fixedTableHeight,
        mainTableHeight,
        leftTableWidth,
        rightTableWidth,
        windowHeight,
        footerHeight,
        emptyStyle,
        rootStyle,
        headerHeight,
    };
};

export type UseStyleReturn = ReturnType<typeof useStyles>;
