import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { partitionPopperPropsUtils } from '@qsxy/element-plus-react/hooks/popperPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import ElPopper from '@qsxy/element-plus-react/Popper/Popper';
import { PopperOptionRef } from '@qsxy/element-plus-react/Popper/typings';
import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { Children, cloneElement, ComponentType, isValidElement, memo, useCallback, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import * as ReactIs from 'react-is';
import { TooltipContext } from './TooltipContext';
import { TooltipProps } from './typings';

const Tooltip = memo((props: TooltipProps) => {
    const {
        ref,
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
        persistent,
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

    // const [tooltipRef, setTooltipRef] = useState<any>(null);
    // 消费父级 Tooltip 的 context，用于向父级传播 Popper entering 状态
    const parentContext = useContext(TooltipContext);

    /** 当鼠标进入/离开本 Tooltip 的 Popper 内容时，
     *  同时向父级 Tooltip 传播 entering 状态，
     *  防止父级因 mouseLeave 而误隐藏 */
    const handlePopperEntering = useCallback(
        (val: boolean) => {
            entering.current = val;
            parentContext.onPopperEntering?.(val);
        },
        [parentContext],
    );

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

    // const tooltipRef = useMemo(() => {
    //     let _ref = referenceElement;
    //     Children.forEach(filterChildren, child => {
    //         if (typeof child === 'string' || typeof child === 'number' || typeof child === 'bigint') {
    //             child = <span>{child}</span>;
    //         }
    //         if (isValidElement(child)) {
    //             let nodeType = child?.type;
    //             nodeType = (nodeType as ComponentType)?.displayName || nodeType;
    //             const _props: Record<string, any> = child?.props ?? {};
    //             if (nodeType === 'ElTooltip') {
    //                 if ((child as React.ReactElement<any>).props?.ref?.children?.props?.ref) {
    //                     _ref = (child as React.ReactElement<any>).props.children.props.ref;
    //                 } else {
    //                     _ref = referenceElement;
    //                 }
    //             } else {
    //                 if (_props.ref) {
    //                     _ref = _props.ref;
    //                 } else {
    //                     _ref = parentContext.tooltipRef ?? referenceElement;
    //                 }
    //             }
    //         }
    //     });
    //     console.log(_ref);
    //     return _ref;
    // }, [filterChildren, parentContext.tooltipRef]);

    const contextValue = useMemo(
        () => ({
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
            trigger,
            onClose: () => {
                setVisible(false);
                entering.current = false;
            },
            onPopperEntering: handlePopperEntering,
        }),
        [handleMouseEnter, handleMouseLeave, trigger, handlePopperEntering, setVisible],
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
                if (typeof child === 'string' || typeof child === 'number' || typeof child === 'bigint') {
                    child = <span>{child}</span>;
                }
                if (isValidElement(child)) {
                    let nodeType = child?.type;
                    nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                    const _props: Record<string, any> = child?.props ?? {};
                    if (nodeType === 'ElTooltip') {
                        // 判断 child 是否为 React 组件（非 DOM 原生元素）
                        // 当 child 为组件时，ref 和事件处理器无法直接附加到 DOM 节点，
                        // 需要通过包裹 span 来确保 Popper 定位和事件响应正常工作
                        const isComponent = typeof child.type !== 'string';

                        if (isComponent) {
                            // 为 React 组件子元素创建包裹层，承载 ref 和事件
                            const wrapperProps: Record<string, any> = {
                                ref: (referenceElement = (child as React.ReactElement<any>).props?.ref ?? referenceElement),
                                className: classNames(props.className, e('tooltip', 'trigger')),
                                style: props.style,
                            };

                            // 禁用
                            if (disabled) {
                                Object.assign(wrapperProps, {
                                    onMouseEnter: noop,
                                    onMouseLeave: noop,
                                });
                            } else {
                                if (trigger === 'hover') {
                                    Object.assign(wrapperProps, {
                                        onMouseEnter: handleMouseEnter,
                                        onMouseLeave: handleMouseLeave,
                                    });
                                } else if (trigger === 'click') {
                                    Object.assign(wrapperProps, {
                                        onClick: (event: React.MouseEvent<any>) => {
                                            setVisible(!visible);
                                            if (visible) {
                                                onMouseLeave?.(event);
                                            } else {
                                                onMouseEnter?.(event);
                                            }
                                            (child as React.ReactElement<any>)?.props?.onClick?.(event);
                                        },
                                    });
                                } else if (trigger === 'contextmenu') {
                                    Object.assign(wrapperProps, {
                                        onContextMenu: (event: React.MouseEvent<any>) => {
                                            event.preventDefault();
                                            setVisible(!visible);
                                            if (visible) {
                                                onMouseLeave?.(event);
                                            } else {
                                                onMouseEnter?.(event);
                                            }
                                            (child as React.ReactElement<any>)?.props?.onContextMenu?.(event);
                                        },
                                    });
                                }
                            }

                            return <span {...wrapperProps}>{child}</span>;
                        }
                    }

                    // DOM 原生元素：直接 cloneElement 即可
                    const newProps = {
                        ..._props,
                        // @ts-ignore
                        ref: (referenceElement = child.ref ?? _props.ref ?? referenceElement),
                        className: classNames(_props?.className, props.className, e('tooltip', 'trigger')),
                        style: { ..._props?.style, ...props.style },
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
                                    if (visible) {
                                        onMouseLeave?.(event);
                                    } else {
                                        onMouseEnter?.(event);
                                    }
                                    (child as React.ReactElement<any>)?.props?.onClick?.(event);
                                },
                            });
                        } else if (trigger === 'contextmenu') {
                            Object.assign(newProps, {
                                onContextMenu: (event: React.MouseEvent<any>) => {
                                    event.preventDefault();
                                    setVisible(!visible);
                                    if (visible) {
                                        onMouseLeave?.(event);
                                    } else {
                                        onMouseEnter?.(event);
                                    }
                                    (child as React.ReactElement<any>)?.props?.onContextMenu?.(event);
                                },
                            });
                        }
                    }
                    return cloneElement(child, newProps);
                }
            })}
            <ElPopper
                visible={visible}
                referenceElement={() => (virtualTriggering ? { current: virtualRef } : (referenceElement?.current?.ref ?? referenceElement))}
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
                        handlePopperEntering(true);
                        handleMouseEnter();
                    }
                }}
                onMouseLeave={() => {
                    if (enterable && trigger === 'hover') {
                        handlePopperEntering(false);
                        handleMouseLeave();
                    }
                }}
                className={classNames(props.popperClass, { [e`popper`]: classPrefix === 'tooltip' })}
                effect={effect}
                unmountOnExit={!persistent}
                showDuration={0}
                trigger={trigger}
                {...popperProps}
                {...transitionProps}
            >
                <TooltipContext.Provider value={contextValue}>{contentSlot ?? <span>{content}</span>}</TooltipContext.Provider>
            </ElPopper>
        </>
    );
});

Tooltip.displayName = 'ElTooltip';

export default Tooltip;
