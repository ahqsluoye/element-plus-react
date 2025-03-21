import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useClassNames } from '../hooks';

export interface PlaceholderGridProps {
    // number of rows
    rows?: number;

    /* height of rows */
    rowHeight?: number;

    /* margin of rows */
    rowMargin?: number;

    /* number of columns */
    columns?: number;

    /** Placeholder status */
    active?: boolean;

    /** The prefix of the component CSS class */
    classPrefix?: string;

    /** Additional classes */
    className?: string;

    /** Additional style */
    style?: React.CSSProperties;
}

const PlaceholderGrid = forwardRef<HTMLDivElement, PlaceholderGridProps>((props, ref) => {
    const { className, classPrefix = 'placeholder', rows = 5, columns = 5, rowHeight = 10, rowMargin = 20, active, ...rest } = props;

    const { b, wb } = useClassNames(classPrefix);
    const classes = classNames(className, wb('grid', { active }));
    const colItems = [];
    const firstRowItemWidth = Math.random() * 30 + 30;
    const itemWidth = firstRowItemWidth / 2;
    for (let i = 0; i < columns; i++) {
        const rowItems = [];
        for (let j = 0; j < rows; j++) {
            let widthPercent = Math.random() * 50 + 10; // when first column
            if (i > 0) {
                // when other columns
                widthPercent = j > 0 ? itemWidth : firstRowItemWidth;
            }
            rowItems.push(
                <p
                    key={j}
                    style={{
                        width: `${widthPercent}%`,
                        height: rowHeight,
                        marginTop: j > 0 ? rowMargin : null,
                    }}
                />,
            );
        }
        colItems.push(
            <div key={i} className={classNames(b`grid-col`)}>
                {rowItems}
            </div>,
        );
    }
    return (
        <div {...rest} ref={ref} className={classes}>
            {colItems}
        </div>
    );
});

PlaceholderGrid.displayName = 'PlaceholderGrid';

export default PlaceholderGrid;
