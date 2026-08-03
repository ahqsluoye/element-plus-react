import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElTooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import { TooltipRef } from '@qsxy/element-plus-react/Tooltip/typings';
import { addUnit, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import { PopoverProps } from './typings';

const Popover = memo(
    forwardRef<TooltipRef, PopoverProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                placement: 'bottom',
                showArrow: true,
                showAfter: 0,
                hideAfter: 100,
                width: 200,
                trigger: 'click',
                persistent: true,
            },
            props,
        );
        const {
            title,
            classPrefix = 'popover',
            plain,
            width,
            showAfter,
            hideAfter,
            offset,
            trigger,
            content,
            onEnter,
            onMouseEnter,
            onMouseLeave,
            placement,
            disabled,
            persistent,
            ...rest
        } = props;
        const { b, e, m } = useClassNames(classPrefix);
        const [popperProps] = partitionPopperPropsUtils(rest);
        const [transitionProps] = partitionAnimationProps(rest);

        const tooltipRef = useRef<TooltipRef>(null);

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

        useImperativeHandle(ref, () => tooltipRef.current);

        return (
            <ElTooltip
                ref={tooltipRef}
                classPrefix={classPrefix}
                className={props.className}
                style={props.style}
                popperClass={classNames(b(), { [m`plain`]: plain }, props.popperClass)}
                popperStyle={{ width: addUnit(width), ...props.popperStyle }}
                triggerRef={props.children}
                enterable
                effect="light"
                placement={placement}
                offset={offset}
                showAfter={showAfter}
                hideAfter={hideAfter}
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
                disabled={disabled}
                persistent={persistent}
                {...popperProps}
                {...transitionProps}
            />
        );
    }),
);

Popover.displayName = 'ElPopover';

export default Popover;
