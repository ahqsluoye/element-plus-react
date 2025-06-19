import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import React, { ComponentType, RefObject, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import Transition from '../Transition/Transition';
import { PopupManager, addUnit } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import { ComponentChildren } from '../types/common';
import DialogBody from './DialogBody';
import { DialogContext } from './DialogContext';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';
import { DialogProps } from './typings';
import { useDraggable } from './useDraggable';

function InternalElDialog(props: DialogProps, ref: RefObject<HTMLDivElement>) {
    const {
        modal = true,
        closeOnClickModal = true,
        width = '50%',
        overflow = false,
        title,
        showClose,
        border,
        children,
        center,
        alignCenter,
        draggable,
        fullscreen,
        headerClass,
        top,
        close,
        beforeClose,
        lockScroll = true,
        zIndex,
        classPrefix = 'dialog',
    } = props;
    const { b, m, is } = useClassNames(classPrefix);
    const [visible, setVisible, isControlled] = useControlled(props.visible, props.defaultVisible);

    /** 是否有标题 */
    const haveTitle = useRef(false);

    /** 是否有按钮组 */
    const haveFooter = useRef(false);
    // 模态框容器div
    const wrapperRef = useRef<HTMLDivElement>(null);
    // 模态框主题div
    const dialogRef = useRef<HTMLDivElement>(null);
    // 遮罩div
    // const backdropRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useDraggable(dialogRef, headerRef, draggable, overflow);

    /** 获取子组件 */
    const getInstancesFromChildren = useCallback((_children: ComponentChildren) => {
        const componentChildren = _children instanceof Array ? _children : [_children];
        componentChildren.forEach((node: React.ReactElement<any>) => {
            let nodeType = node?.type;
            nodeType = (nodeType as ComponentType)?.displayName || nodeType;
            if (nodeType === 'ElDialogHeader') {
                haveTitle.current = true;
            } else if (nodeType === 'ElDialogFooter') {
                haveFooter.current = true;
            } else if (nodeType === 'Fragment') {
                getInstancesFromChildren(node);
            }
        });
    }, []);

    const doClose = useCallback(() => {
        if (beforeClose) {
            beforeClose?.((value: boolean) => {
                if (value) {
                    return;
                }
                setVisible(false);
                close?.();
            });
        } else {
            setVisible(false);
            close?.();
        }
    }, [beforeClose, close, setVisible]);

    // const keydown = useCallback(
    //     ({ code }: KeyboardEvent) => {
    //         if (code === EVENT_CODE.esc) {
    //             // press esc to close the message
    //             if (visible) {
    //                 doClose();
    //             }
    //         }
    //     },
    //     [doClose, visible],
    // );

    /**关闭对话框 */
    useEffect(() => {
        if (visible) {
            let mousedown: MouseEvent;
            const shadowRef = wrapperRef?.current;
            shadowRef?.addEventListener('mousedown', (e: MouseEvent) => (mousedown = e));
            shadowRef?.addEventListener('mouseup', (mouseup: MouseEvent) => {
                const mouseUpTarget = mouseup?.target as Node;
                const mouseDownTarget = mousedown?.target as Node;
                const isTargetExists = !mouseUpTarget || !mouseDownTarget;

                const isContainedByPopper = dialogRef?.current?.contains(mouseUpTarget) || dialogRef?.current?.contains(mouseDownTarget);
                if (isTargetExists || isContainedByPopper) {
                    return;
                }

                if (closeOnClickModal) {
                    doClose();
                } else {
                    addClass(dialogRef.current, b('dialog-shake', false));
                    setTimeout(() => {
                        removeClass(dialogRef.current, b('dialog-shake', false));
                    }, 300);
                }
            });
        }
    }, [b, modal, beforeClose, doClose, ref, setVisible, visible, closeOnClickModal]);

    // useEffect(() => {
    //     document.addEventListener('keydown', keydown, false);
    //     console.log(PopupManager.zIndex);
    //     return () => {
    //         console.log(PopupManager.zIndex);
    //         document.removeEventListener('keydown', keydown, false);
    //     };
    // }, [keydown]);

    useEffect(() => {
        getInstancesFromChildren(children);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useImperativeHandle(ref, () => wrapperRef.current);

    return (
        <DialogContext.Provider value={{ modal: modal, setVisible, isControlled, doClose, center, overflow, haveTitle: haveTitle.current, haveFooter: haveFooter.current }}>
            {/* {backdrop &&
                createPortal(
                    <Transition
                        visible={visible}
                        transitionAppear
                        unmountOnExit
                        duration={300}
                        onEnter={() => {
                            setTimeout(() => {
                                addClass(backdropRef.current, b('anim-in', false));
                            }, 10);
                        }}
                        beforeLeave={() => removeClass(backdropRef.current, b('anim-in', false))}
                    >
                        <div className={classNames(b`backdrop`, b('anim-fade', false))} style={{ zIndex: PopupManager.nextZIndex() }} ref={backdropRef} />
                    </Transition>,
                    document.body,
                )} */}

            {createPortal(
                <Transition
                    nodeRef={wrapperRef}
                    visible={visible}
                    transitionAppear
                    unmountOnExit={props.unmountOnExit || !draggable}
                    beforeEnter={() => {
                        props.beforeEnter?.();
                        addClass(overlayRef.current, b('anim-bounce-in', false));
                    }}
                    onEnter={() => {
                        props.onOpen?.();
                        props.onEnter?.();
                        if (draggable && dialogRef.current) {
                            // addStyle(modalRef.current, 'transform', `translate(${positionRef.current.left}px, ${positionRef.current.top}px)`);
                        }
                        if (lockScroll) {
                            addClass(document.body, b('popup-parent--hidden', false));
                        }
                    }}
                    afterEnter={() => {
                        props.afterEnter?.();
                        props.onOpened?.();
                        // addStyle(dialogRef.current, 'display', 'block');
                        removeClass(overlayRef.current, b('anim-bounce-in', false));
                    }}
                    beforeLeave={() => {
                        addClass(overlayRef.current, b('anim-bounce-out', false));
                        props.beforeLeave?.();
                    }}
                    onLeave={() => {
                        props.onClose?.();
                        props.onLeave?.();
                    }}
                    afterLeave={() => {
                        props.afterLeave?.();
                        props.onClosed?.();
                        if (lockScroll) {
                            removeClass(document.body, b('popup-parent--hidden', false));
                        }
                        removeClass(overlayRef.current, b('anim-bounce-out', false));
                    }}
                    duration={300}
                >
                    <div className={classNames(b('overlay', false), props.className)} style={{ zIndex: zIndex || PopupManager.nextZIndex() }} ref={wrapperRef}>
                        <div ref={overlayRef} className={b(`overlay-${classPrefix}`, false)} style={{ display: alignCenter ? 'flex' : 'block' }}>
                            <div
                                className={classNames(b(), is({ draggable, 'align-center': alignCenter, fullscreen }), { [m`center`]: center })}
                                style={{
                                    ...props.style,
                                    // @ts-ignore
                                    ['--el-dialog-width']: fullscreen || classPrefix !== 'dialog' ? '' : addUnit(width),
                                    ['--el-dialog-margin-top']: addUnit(top),
                                }}
                                ref={dialogRef}
                            >
                                <DialogHeader ref={headerRef} classPrefix={classPrefix} showClose={showClose} border={border} headerClass={headerClass}>
                                    {title}
                                </DialogHeader>
                                {children}
                                {/* {React.Children.map(children, child => {
                                    if (React.isValidElement(child)) {
                                        let nodeType = child?.type;
                                        nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                                        if (nodeType === 'ElDialogHeader') {
                                            // @ts-ignore
                                            return React.cloneElement(child, { ref: headerRef });
                                        }
                                        return child;
                                    }
                                    return child;
                                })} */}
                            </div>
                        </div>
                    </div>
                </Transition>,
                document.body,
            )}
        </DialogContext.Provider>
    );
}

const Comp = memo(forwardRef(InternalElDialog)) as (props: DialogProps & { ref?: RefObject<HTMLDivElement> | React.ForwardedRef<HTMLDivElement> }) => React.ReactElement;

type InternalType = typeof Comp;

interface CompInterface extends InternalType {
    displayName?: string;
    body: typeof DialogBody;
    footer: typeof DialogFooter;
}

const Dialog = Comp as CompInterface;

Dialog.body = DialogBody;
Dialog.footer = DialogFooter;

Dialog.displayName = 'ElDialog';

export default Dialog;
