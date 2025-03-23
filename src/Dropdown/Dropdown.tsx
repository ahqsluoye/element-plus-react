import classNames from 'classnames';
import React, { FC, useCallback } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionPopperPropsUtils, useClassNames } from '../hooks';
import { DropdownContext } from './DropdownContext';
import { DropdownProps } from './typings';

const Dropdown: FC<DropdownProps> = props => {
    props = mergeDefaultProps(
        {
            hideOnClick: true,
            showArrow: true,
            showTimeout: 0,
            hideTimeout: 100,
            trigger: 'hover',
        },
        props,
    );
    const {
        menu,
        classPrefix = 'dropdown',
        showTimeout,
        hideTimeout,
        offset,
        trigger,
        hideOnClick,
        onClick,
        visiblechange,
        onEnter,
        onMouseEnter,
        onMouseLeave,
        disabled,
        ...rest
    } = props;
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [transitionProps] = partitionAnimationProps(rest);

    const { b, e } = useClassNames(classPrefix);

    /** 显示 */
    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<any>) => {
            onMouseEnter?.(event);
            visiblechange?.(true);
        },
        [onMouseEnter, visiblechange],
    );

    /** 隐藏 */
    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<any>) => {
            onMouseLeave?.(event);
            visiblechange?.(false);
        },
        [onMouseLeave, visiblechange],
    );

    return (
        <div className={classNames(b(), props.className)} style={props.style}>
            <Tooltip
                classPrefix={classPrefix}
                triggerRef={props.children}
                popperClass={e`popper`}
                disabled={disabled}
                enterable
                effect="light"
                offset={offset}
                showAfter={showTimeout}
                hideAfter={hideTimeout}
                trigger={trigger}
                onEnter={onEnter}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                contentSlot={<DropdownContext.Provider value={{ hideOnClick, onClick }}>{menu}</DropdownContext.Provider>}
                unmountOnExit
                {...popperProps}
                {...transitionProps}
            />
        </div>
    );
};

Dropdown.displayName = 'Dropdown';

export default Dropdown;
