import classNames from 'classnames';
import React, { FC, useCallback } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionPopperPropsUtils, useClassNames } from '../hooks';
import { PopoverProps } from './typings';

const Popover: FC<PopoverProps> = props => {
    props = mergeDefaultProps(
        {
            placement: 'bottom',
            showArrow: true,
            showTimeout: 0,
            hideTimeout: 300,
            width: 200,
            trigger: 'click',
        },
        props,
    );
    const { title, classPrefix = 'popover', plain, width, showTimeout, hideTimeout, offset, trigger, content, onEnter, onMouseEnter, onMouseLeave, placement, ...rest } = props;
    const { b, e, m } = useClassNames(classPrefix);
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [transitionProps] = partitionAnimationProps(rest);

    /** 显示 */
    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<any>) => {
            onMouseEnter?.(event);
        },
        [onMouseEnter],
    );

    /** 隐藏 */
    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<any>) => {
            onMouseLeave?.(event);
        },
        [onMouseLeave],
    );

    return (
        <Tooltip
            classPrefix={classPrefix}
            popperClass={classNames(b(), { [m`plain`]: plain })}
            popperStyle={{ width }}
            triggerRef={<>{props.children}</>}
            enterable
            effect="light"
            placement={placement}
            offset={offset}
            showAfter={showTimeout}
            hideAfter={hideTimeout}
            trigger={trigger}
            onEnter={onEnter}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            contentSlot={
                <>
                    {title && <div className={e`title`}>{title}</div>}
                    {content}
                </>
            }
            {...popperProps}
            {...transitionProps}
        />
    );
};

Popover.displayName = 'Popover';

export default Popover;
