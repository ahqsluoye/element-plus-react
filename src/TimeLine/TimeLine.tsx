import classNames from 'classnames';
import React, { FC } from 'react';
import { useClassNames } from '../hooks';
import { TimeLineProps } from './typings';

const TimeLine: FC<TimeLineProps> = props => {
    const { classPrefix = 'timeline' } = props;
    const { b } = useClassNames(classPrefix);

    return (
        <ul className={classNames(b(), props.className)} style={props.style}>
            {props.children}
        </ul>
    );
};

TimeLine.displayName = 'ElTimeLine';

export default TimeLine;
