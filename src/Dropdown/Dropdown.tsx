import classNames from 'classnames';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useClassNames } from '../hooks';
import { DropdownContext } from './DropdownContext';
import { DropdownProps, DropdownRef } from './typings';

const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
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
        onVisiblechange,
        onEnter,
        onMouseEnter,
        onMouseLeave,
        disabled,
        ...rest
    } = props;
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });

    const { b, e } = useClassNames(classPrefix);
    const containerRef = useRef(null);

    /** 显示 */
    const handleMouseEnter = useCallback(
        (event: React.MouseEvent<any>) => {
            onMouseEnter?.(event);
            onVisiblechange?.(true);
        },
        [onMouseEnter, onVisiblechange],
    );

    /** 隐藏 */
    const handleMouseLeave = useCallback(
        (event: React.MouseEvent<any>) => {
            onMouseLeave?.(event);
            onVisiblechange?.(false);
        },
        [onMouseLeave, onVisiblechange],
    );

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        handleOpen: onMouseEnter,
        handleClose: onMouseLeave,
    }));

    return (
        <div ref={containerRef} className={classNames(b(), props.className)} style={props.style} {...tooltipEvents}>
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
});

Dropdown.displayName = 'ElDropdown';

export default Dropdown;
