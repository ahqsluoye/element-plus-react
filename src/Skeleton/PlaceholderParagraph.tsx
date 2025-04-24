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
    variant?: 'circle' | 'rect' | 'image';
    /** Placeholder status */
    animated?: boolean;
    /** The prefix of the component CSS class */
    classPrefix?: string;
    /** Additional classes */
    className?: string;
    /** Additional style */
    style?: React.CSSProperties;
}

const PlaceholderParagraph = forwardRef<HTMLDivElement, PlaceholderParagraphProps>((props, ref) => {
    const { className, rows = 2, rowHeight = 16, rowMargin = 16, variant: graph, animated: active, classPrefix = 'skeleton', ...rest } = props;

    const { b, wb } = useClassNames(classPrefix);

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
    const graphClasses = b('paragraph-graph', `paragraph-graph-${graph}`);

    return (
        <div {...rest} ref={ref} className={classes}>
            {graph && (
                <div className={graphClasses}>
                    {graph === 'image' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                            <path
                                fill="currentColor"
                                d="M96 896a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h832a32 32 0 0 1 32 32v704a32 32 0 0 1-32 32zm315.52-228.48-68.928-68.928a32 32 0 0 0-45.248 0L128 768.064h778.688l-242.112-290.56a32 32 0 0 0-49.216 0L458.752 665.408a32 32 0 0 1-47.232 2.112M256 384a96 96 0 1 0 192.064-.064A96 96 0 0 0 256 384"
                            ></path>
                        </svg>
                    ) : null}
                    <span className={b`paragraph-graph-inner`} />
                </div>
            )}
            <div className={b`paragraph-rows`}>{rowElements}</div>
        </div>
    );
});

PlaceholderParagraph.displayName = 'PlaceholderParagraph';

export default PlaceholderParagraph;
