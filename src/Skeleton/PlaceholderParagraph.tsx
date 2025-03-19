import classNames from 'classnames';
import React, { forwardRef, useMemo } from 'react';
import { useClassNames } from '../hooks';

export interface PlaceholderParagraphProps {
    // number of rows
    rows?: number;

    /* height of rows */
    rowHeight?: number;

    /* margin of rows */
    rowMargin?: number;

    /* show graph */
    graph?: boolean | 'circle' | 'square' | 'image';

    /** Placeholder status */
    active?: boolean;

    /** The prefix of the component CSS class */
    classPrefix?: string;

    /** Additional classes */
    className?: string;

    /** Additional style */
    style?: React.CSSProperties;
}

const PlaceholderParagraph = forwardRef<HTMLDivElement, PlaceholderParagraphProps>((props, ref) => {
    const { className, rows = 2, rowHeight = 16, rowMargin = 16, graph, active, classPrefix = 'placeholder', ...rest } = props;

    const { b, wb } = useClassNames(classPrefix);
    const graphShape = graph === true ? 'square' : graph;

    const rowElements = useMemo(() => {
        const rowArr = [];

        for (let i = 0; i < rows; i++) {
            const styles = {
                width: `${Math.random() * 75 + 25}%`,
                height: rowHeight,
                marginTop: i > 0 ? rowMargin : Number(rowMargin) / 2,
            };
            rowArr.push(<p key={i} style={styles} />);
        }
        return rowArr;
    }, [rowHeight, rowMargin, rows]);

    const classes = classNames(className, wb('paragraph', { active }));
    const graphClasses = b('paragraph-graph', `paragraph-graph-${graphShape}`);

    return (
        <div {...rest} ref={ref} className={classes}>
            {graphShape && (
                <div className={graphClasses}>
                    <span className={b`paragraph-graph-inner`} />
                </div>
            )}
            <div className={b`paragraph-rows`}>{rowElements}</div>
        </div>
    );
});

PlaceholderParagraph.defaultProps = {
    rowHeight: 16,
    rowMargin: 16,
};
PlaceholderParagraph.displayName = 'PlaceholderParagraph';

export default PlaceholderParagraph;
