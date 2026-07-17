import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import ElPopper from '@qsxy/element-plus-react/Popper/Popper';
import { PopperOptionRef } from '@qsxy/element-plus-react/Popper/typings';
import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { Children, cloneElement, forwardRef, memo, useCallback, useImperativeHandle, useRef } from 'react';
import * as ReactIs from 'react-is';
import { TooltipContext } from './TooltipContext';
import { TooltipProps, TooltipRef } from './typings';

const Tooltip = memo(
    forwardRef<TooltipRef, TooltipProps>((props, ref) => {
        const {
            classPrefix = 'tooltip',
            effect = 'dark',
            trigger = 'hover',
            content,
            disabled,
            enterable = true,
            hideOnClick = false,
            showAfter = 0,
            hideAfter = 100,
            onMouseEnter,
            onMouseLeave,
            onEnter,
            triggerRef,
            contentSlot,
            virtualTriggering,
            virtualRef,
            unmountOnExit = true,
            disableTransition,
            ...rest
        } = props;
        const [popperProps] = partitionPopperPropsUtils(rest);
        const [transitionProps] = partitionAnimationProps(rest);
        const { e } = useClassNames(classPrefix);
        const [visible, setVisible] = useControlled(props.visible, props.defaultVisible);
        let referenceElement = useRef<any>(null);
        const timeOut = useRef(0);
        const popperInstRef = useRef<PopperOptionRef>(null);
        const entering = useRef(false); // 是否正在进入

        /** 显示 */
        const handleMouseEnter = useCallback(
            (event?: React.MouseEvent<any>) => {
                if (enterable) {
                    event?.preventDefault();
                    timeOut.current && clearTimeout(timeOut.current);
                    timeOut.current = window.setTimeout(() => {
                        setVisible(true);
                        onMouseEnter?.(event);
                    }, showAfter);
                } else {
                    setVisible(true);
                    onMouseEnter?.(event);
                }
            },
            [enterable, showAfter, setVisible, onMouseEnter],
        );

        /** 隐藏 */
        const handleMouseLeave = useCallback(
            (event?: React.MouseEvent<any>) => {
                if (enterable) {
                    if (entering.current && !hideOnClick) {
                        return;
                    }
                    event?.preventDefault();
                    timeOut.current && clearTimeout(timeOut.current);
                    timeOut.current = window.setTimeout(() => {
                        setVisible(false);
                        onMouseLeave?.(event);
                        entering.current = false;
                    }, hideAfter);
                } else {
                    setVisible(false);
                    onMouseLeave?.(event);
                    entering.current = false;
                }
            },
            [enterable, hideAfter, hideOnClick, onMouseLeave, setVisible],
        );

        const filterChildren = Children.toArray(triggerRef ?? props.children).filter(
            child => React.isValidElement(child) || typeof child === 'string' || typeof child === 'number' || !ReactIs.isPortal(child),
        );

        useImperativeHandle(ref, () => ({
            popperRef: popperInstRef,
            updatePopper: () => {
                if (popperInstRef?.current?.update) {
                    popperInstRef.current.update();
                }
            },
            onOpen: handleMouseEnter,
            onClose: handleMouseLeave,
            hide: () => {
                setVisible(false);
                setTimeout(() => {
                    entering.current = false;
                }, hideAfter);
            },
        }));

        return (
            <>
                {/* <React.ReactNode, React.ReactElement> */}
                {Children.map(filterChildren, child => {
                    if (typeof child === 'string' || typeof child === 'number') {
                        child = <span>{child}</span>;
                    }
                    // @ts-ignore
                    const _props = child?.props ?? {};
                    const newProps = {
                        ..._props,
                        // @ts-ignore
                        ref: (referenceElement = child.ref ?? referenceElement),
                        className: classNames(_props?.className, props.className, e('tooltip', 'trigger')),
                        // @ts-ignore
                        style: { ...child?.props?.style, ...props.style },
                    };
                    // 禁用
                    if (disabled) {
                        Object.assign(newProps, {
                            onMouseEnter: noop,
                            onMouseLeave: noop,
                        });
                    } else {
                        if (trigger === 'hover') {
                            Object.assign(newProps, {
                                onMouseEnter: handleMouseEnter,
                                onMouseLeave: handleMouseLeave,
                            });
                        } else if (trigger === 'click') {
                            Object.assign(newProps, {
                                onClick: (event: React.MouseEvent<any>) => {
                                    setVisible(!visible);
                                    onMouseEnter?.(event);
                                    (child as React.ReactElement<any>)?.props?.onClick?.(event);
                                },
                            });
                        } else if (trigger === 'contextmenu') {
                            Object.assign(newProps, {
                                onContextMenu: (event: React.MouseEvent<any>) => {
                                    event.preventDefault();
                                    setVisible(!visible);
                                    onMouseLeave?.(event);
                                    (child as React.ReactElement<any>)?.props?.onContextMenu?.(event);
                                },
                            });
                        }
                    }
                    // @ts-ignore
                    return cloneElement(child, newProps);
                })}
                <ElPopper
                    visible={visible}
                    referenceElement={() => (virtualTriggering ? { current: virtualRef } : referenceElement?.current?.ref ?? referenceElement)}
                    popperInstRef={popperInstRef}
                    disableTransition={disableTransition}
                    onEnter={useCallback(() => {
                        if (popperInstRef?.current?.update) {
                            popperInstRef.current.update();
                        }
                        onEnter?.();
                    }, [onEnter])}
                    onDestroy={() => {
                        handleMouseLeave();
                    }}
                    onMouseEnter={() => {
                        if (enterable && trigger === 'hover') {
                            entering.current = true;
                            handleMouseEnter();
                        }
                    }}
                    onMouseLeave={() => {
                        if (enterable && trigger === 'hover') {
                            entering.current = false;
                            handleMouseLeave();
                        }
                    }}
                    className={classNames(props.popperClass, { [e`popper`]: classPrefix === 'tooltip' })}
                    effect={effect}
                    unmountOnExit={unmountOnExit}
                    {...popperProps}
                    {...transitionProps}
                >
                    <TooltipContext.Provider
                        value={{
                            onMouseEnter: handleMouseEnter,
                            onMouseLeave: handleMouseLeave,
                            trigger,
                            onClose: () => {
                                setVisible(false);
                                entering.current = false;
                            },
                        }}
                    >
                        {contentSlot ?? <span>{content}</span>}
                    </TooltipContext.Provider>
                </ElPopper>
            </>
        );
    }),
);

Tooltip.displayName = 'ElTooltip';

export default Tooltip;
