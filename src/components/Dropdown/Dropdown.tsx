import ElButton from '@qsxy/element-plus-react/Button/Button';
import ElButtonGroup from '@qsxy/element-plus-react/Button/ButtonGroup';
import ElScrollbar from '@qsxy/element-plus-react/Scrollbar/Scrollbar';
import ElTooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import type { TooltipRef } from '@qsxy/element-plus-react/Tooltip/typings';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import classNames from 'classnames';
import React, { forwardRef, isValidElement, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import { DropdownContext } from './DropdownContext';
import type { DropdownProps, DropdownRef } from './typings';

const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            hideOnClick: true,
            showArrow: true,
            showTimeout: 0,
            hideTimeout: 100,
            trigger: 'hover',
            effect: 'light',
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
        onVisibleChange,
        onEnter,
        onMouseEnter,
        onMouseLeave,
        virtualTriggering,
        virtualRef,
        effect,
        maxHeight,
        splitButton,
        type,
        buttonProps,
        onCommand,
        ...rest
    } = props;
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onContextMenu'] });

    const { b, e, is } = useClassNames(classPrefix);
    const containerRef = useRef(null);
    const tooltipRef = useRef<TooltipRef>(null);

    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    /** 显示 */
    const handleMouseEnter = useCallback(
        (event?: React.MouseEvent<any>) => {
            onMouseEnter?.(event);
            onVisibleChange?.(true);
        },
        [onMouseEnter, onVisibleChange],
    );

    /** 隐藏 */
    const handleMouseLeave = useCallback(
        (event?: React.MouseEvent<any>) => {
            onMouseLeave?.(event);
            onVisibleChange?.(false);
        },
        [onMouseLeave, onVisibleChange],
    );

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        handleOpen: () => tooltipRef.current?.onOpen(),
        handleClose: () => tooltipRef.current?.onClose(),
    }));

    const triggerRef = useMemo(() => {
        if (isValidElement(props.children)) {
            return props.children;
        }
        return <span>{props.children}</span>;
    }, [props.children]);

    return (
        <div ref={containerRef} className={classNames(b(), props.className)} style={props.style} {...tooltipEvents}>
            {splitButton ? (
                <ElButtonGroup size={size}>
                    <ElButton {...buttonProps} type={type} size={size} disabled={disabled} onClick={onClick}>
                        {triggerRef}
                    </ElButton>
                    <ElTooltip
                        ref={tooltipRef}
                        classPrefix={classPrefix}
                        triggerRef={<ElButton {...buttonProps} className={e`caret-button`} type={type} size={size} disabled={disabled} icon="angle-down" />}
                        virtualRef={virtualRef}
                        virtualTriggering={virtualTriggering}
                        popperClass={classNames(e`popper`, is`pure`)}
                        disabled={disabled}
                        enterable
                        hideOnClick={hideOnClick}
                        effect={effect}
                        offset={offset}
                        showAfter={showTimeout}
                        hideAfter={hideTimeout}
                        trigger={trigger}
                        onEnter={onEnter}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        contentSlot={<DropdownContext.Provider value={{ hideOnClick, onCommand: onClick, maxHeight, size }}>{menu}</DropdownContext.Provider>}
                        unmountOnExit
                        {...popperProps}
                        {...transitionProps}
                    />
                </ElButtonGroup>
            ) : (
                <ElTooltip
                    ref={tooltipRef}
                    classPrefix={classPrefix}
                    triggerRef={triggerRef}
                    virtualRef={virtualRef}
                    virtualTriggering={virtualTriggering}
                    popperClass={classNames(e`popper`, is`pure`)}
                    disabled={disabled}
                    enterable
                    hideOnClick={hideOnClick}
                    effect={effect}
                    offset={offset}
                    showAfter={showTimeout}
                    hideAfter={hideTimeout}
                    trigger={trigger}
                    onEnter={onEnter}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    contentSlot={
                        <DropdownContext.Provider value={{ hideOnClick, onCommand }}>
                            {maxHeight ? <ElScrollbar maxHeight={maxHeight}>{menu}</ElScrollbar> : menu}
                        </DropdownContext.Provider>
                    }
                    unmountOnExit
                    {...popperProps}
                    {...transitionProps}
                />
            )}
        </div>
    );
});

Dropdown.displayName = 'ElDropdown';

export default Dropdown;
