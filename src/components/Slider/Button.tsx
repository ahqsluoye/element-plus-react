import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElTooltip from '@qsxy/element-plus-react/Tooltip/Tooltip';
import classNames from 'classnames';
import React, { memo, use, useImperativeHandle } from 'react';
import { useSliderButton } from './hooks/useSliderButton';
import { SliderContext } from './SliderContext';
import type { SliderButtonProps, SliderButtonRef } from './typings';

const SliderButton = memo(({ ref, ...props }: SliderButtonProps & { ref?: React.Ref<SliderButtonRef | null> }) => {
    const { value, vertical, tooltipClass, placement = 'top', id, onChange, ...ariaProps } = props;

    const ns = useClassNames('slider');
    const context = use(SliderContext);
    const disabled = context?.disabled ?? false;

    const {
        tooltipRef,
        initData,
        buttonRef,
        tooltipVisible,
        showTooltip,
        wrapperStyle,
        formatValue,
        hovering,
        dragging,
        handleMouseEnter,
        handleMouseLeave,
        onButtonDown,
        onKeyDown,
        setPosition,
    } = useSliderButton(value, props, onChange);

    useImperativeHandle(ref, () => ({
        onButtonDown,
        onKeyDown: (event: React.KeyboardEvent) => {
            onKeyDown(event);
        },
        setPosition: (newPosition: number) => {
            setPosition(newPosition);
        },
        hovering,
        dragging,
    }));

    return (
        <div
            ref={buttonRef}
            id={id}
            className={classNames(ns.e`button-wrapper`, {
                hover: hovering,
                dragging,
            })}
            style={wrapperStyle}
            tabIndex={disabled ? -1 : 0}
            role={ariaProps.role}
            aria-label={ariaProps['aria-label']}
            aria-labelledby={ariaProps['aria-labelledby']}
            aria-valuemin={ariaProps['aria-valuemin']}
            aria-valuemax={ariaProps['aria-valuemax']}
            aria-valuenow={ariaProps['aria-valuenow']}
            aria-valuetext={ariaProps['aria-valuetext']}
            aria-orientation={ariaProps['aria-orientation']}
            aria-disabled={ariaProps['aria-disabled']}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={onButtonDown}
            onTouchStart={onButtonDown}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
            onKeyDown={onKeyDown}
            onTouchStartCapture={onButtonDown}
        >
            <ElTooltip
                ref={tooltipRef}
                visible={tooltipVisible}
                placement={placement}
                fallbackPlacements={['top', 'bottom', 'right', 'left']}
                disabled={!showTooltip}
                popperClass={tooltipClass}
                content={<span>{String(formatValue)}</span>}
                trigger="hover"
            >
                <div
                    className={classNames(ns.e`button`, {
                        hover: hovering,
                        dragging,
                    })}
                />
            </ElTooltip>
        </div>
    );
});

SliderButton.displayName = 'ElSliderButton';

export default SliderButton;
