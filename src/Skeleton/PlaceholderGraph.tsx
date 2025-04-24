import classNames from 'classnames';
import React, { forwardRef } from 'react';
import { useClassNames } from '../hooks';

export interface SkeletonGraphProps {
    // height of rows
    height?: number;
    /* width of rows */
    width?: number;
    /** Placeholder status */
    animated?: boolean;
    /** The prefix of the component CSS class */
    classPrefix?: string;
    /** Additional classes */
    className?: string;
    /** Additional style */
    style?: React.CSSProperties;
}

const SkeletonGraph = forwardRef<HTMLDivElement, SkeletonGraphProps>((props, ref) => {
    const { className, width, height = 200, style, animated: active, classPrefix = 'skeleton', ...rest } = props;
    const { wb } = useClassNames(classPrefix);

    const classes = classNames(className, wb('graph', { active }));
    const styles = { width: width || '100%', height, ...style };
    return <div {...rest} ref={ref} className={classes} style={styles} />;
});

SkeletonGraph.displayName = 'ElSkeletonGraph';

export default SkeletonGraph;
