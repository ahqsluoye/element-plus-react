import classNames from 'classnames';
import noop from 'lodash/noop';
import React, { Children, cloneElement, FC, forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import * as ReactIs from 'react-is';
import { partitionAnimationProps, partitionPopperPropsUtils, useClassNames, useControlled } from '../hooks';
import { Popper, PopperOptionRef } from '../Popper';
import { mergeDefaultProps } from '../Util';
import { TooltipContext } from './TooltipContext';
import { TooltipProps, TooltipRef } from './typings';

const Tooltip: FC<TooltipProps> = forwardRef<TooltipRef, TooltipProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            effect: 'dark',
            showArrow: true,
            showAfter: 0,
            hideAfter: 200,
            trigger: 'hover',
            unmountOnExit: true,
        },
        props,
    );
    const {
        classPrefix = 'tooltip',
        effect: theme,
        trigger,
        content,
        disabled,
        enterable,
        showAfter,
        hideAfter,
        onMouseEnter,
        onMouseLeave,
        onEnter,
        triggerRef,
        contentSlot,
        virtualTriggering,
        virtualRef,
        ...rest
    } = props;
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const { e, is } = useClassNames(classPrefix);
    const [visible, setVisible] = useControlled(props.visible, props.defaultVisible);
    let referenceElement = useRef<any>(null);
    const timeOut = useRef(0);
    const popperInstRef = useRef<PopperOptionRef>();

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
                event?.preventDefault();
                timeOut.current && clearTimeout(timeOut.current);
                timeOut.current = window.setTimeout(() => {
                    setVisible(false);
                    onMouseLeave?.(event);
                }, hideAfter);
            } else {
                setVisible(false);
                onMouseLeave?.(event);
            }
        },
        [enterable, hideAfter, onMouseLeave, setVisible],
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
        hide: handleMouseLeave,
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
                                setVisible(true);
                                onMouseEnter?.(event);
                                (child as React.ReactElement<any>)?.props?.onClick?.(event);
                            },
                        });
                    } else if (trigger === 'contextmenu') {
                        Object.assign(newProps, {
                            onContextMenu: (event: React.MouseEvent<any>) => {
                                event.preventDefault();
                                setVisible(true);
                                onMouseLeave?.(event);
                                (child as React.ReactElement<any>)?.props?.onContextMenu?.(event);
                            },
                        });
                    }
                }
                // @ts-ignore
                return cloneElement(child, newProps);
            })}
            <Popper
                visible={visible}
                referenceElement={() => (virtualTriggering ? { current: virtualRef } : referenceElement?.current?.ref ?? referenceElement)}
                popperInstRef={popperInstRef}
                onEnter={useCallback(() => {
                    if (popperInstRef?.current?.update) {
                        popperInstRef.current.update();
                    }
                    onEnter?.();
                }, [onEnter])}
                onDestroy={() => {
                    setVisible(false);
                    onMouseLeave?.();
                }}
                onMouseEnter={enterable && trigger === 'hover' ? handleMouseEnter : noop}
                onMouseLeave={enterable && trigger === 'hover' ? handleMouseLeave : noop}
                className={classNames(is(theme), props.popperClass, { [e`popper`]: classPrefix === 'tooltip' })}
                unmountOnExit={props.unmountOnExit}
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
                        },
                    }}
                >
                    {contentSlot ?? <span>{content}</span>}
                </TooltipContext.Provider>
            </Popper>
        </>
    );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
