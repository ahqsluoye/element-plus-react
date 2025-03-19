import classNames from 'classnames';
import React, { cloneElement, FC, useMemo } from 'react';
import { useClassNames } from '../hooks';
import { Icon } from '../Icon';
import { isNotEmpty } from '../Util';
import { TimeLineItemProps } from './typings';

const TimeLineItem: FC<TimeLineItemProps> = props => {
    const { classPrefix = 'timeline-item', timestamp, hideTimestamp, center, placement, type, color, size, icon, hollow } = props;
    const { b, e, em, is } = useClassNames(classPrefix);

    const nodeIcon = useMemo(() => {
        if (isNotEmpty(props.icon)) {
            return typeof icon === 'string' ? (
                <Icon name={icon} className={e`icon`} />
            ) : (
                cloneElement(icon, icon?.props && 'className' in icon.props ? { ...icon.props.className, className: e`icon` } : { className: e`icon` })
            );
        }
        return null;
    }, [e, icon, props.icon]);

    return (
        <li className={classNames(b(), { [e`center`]: center })}>
            <div className={e`tail`} />
            <div className={classNames(e`node`, em('node', size), { [em('node', type)]: type }, is({ hollow }), props.className)} style={{ background: color, ...props.style }}>
                {nodeIcon}
            </div>
            <div className={e`wrapper`}>
                {placement === 'top' && !hideTimestamp && <div className={classNames(e`timestamp`, is(placement))}>{timestamp}</div>}
                <div className={e`content`}>{props.children}</div>
                {placement === 'bottom' && !hideTimestamp && <div className={classNames(e`timestamp`, is(placement))}>{timestamp}</div>}
            </div>
        </li>
    );
};

TimeLineItem.defaultProps = {
    size: 'normal',
    placement: 'bottom',
};

export default TimeLineItem;
