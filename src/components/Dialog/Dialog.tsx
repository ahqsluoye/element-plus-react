import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import omit from 'lodash/omit';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Transition from '../Transition/Transition';
import { PopupManager, addUnit, getScrollBarWidth, mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { namespace } from '../hooks/prefix';
import DialogBody from './DialogBody';
import { DialogContext } from './DialogContext';
import DialogFooter from './DialogFooter';
import DialogHeader from './DialogHeader';
import { DialogProps } from './typings';
import { useDraggable } from './useDraggable';

const Dialog = React.memo(
    forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                visible: false,
                modal: true,
                closeOnClickModal: true,
                width: '50%',
                overflow: false,
                lockScroll: true,
                showClose: true,
                classPrefix: 'dialog',
                transitionConfig: 'dialog-fade',
                openDelay: 0,
                closeDelay: 0,
            },
            props,
        );
        const {
            visible,
            modal,
            modalPenetrable,
            closeOnClickModal,
            width,
            overflow,
            title,
            footer,
            showClose,
            openDelay,
            closeDelay,
            border,
            children,
            center,
            alignCenter,
            draggable,
            fullscreen,
            headerClass,
            bodyClass,
            footerClass,
            top,
            onCloseDialog,
            beforeClose,
            lockScroll,
            zIndex,
            classPrefix,
            modalClass,
            transitionConfig,
        } = props;
        const { b, m, is } = useClassNames(classPrefix);

        // 模态框容器div
        const wrapperRef = useRef<HTMLDivElement>(null);
        // 模态框主题div
        const dialogRef = useRef<HTMLDivElement>(null);
        // 遮罩div
        // const backdropRef = useRef<HTMLDivElement>(null);
        const overlayRef = useRef<HTMLDivElement>(null);
        const headerRef = useRef<HTMLDivElement>(null);
        // const { overflow, mounted, haveFooter } = useContext(DialogContext);

        const contentRef = useRef<HTMLDivElement>(null);

        const nextZIndex = useMemo(() => zIndex || PopupManager.nextZIndex(), [zIndex]);

        useDraggable(dialogRef, headerRef, draggable, overflow);

        const doClose = useCallback(() => {
            if (beforeClose) {
                beforeClose?.((cancle: boolean) => {
                    if (cancle) {
                        return;
                    }
                    onCloseDialog?.();
                });
            } else {
                onCloseDialog?.();
            }
        }, [beforeClose, onCloseDialog]);

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
        }, [b, modal, beforeClose, doClose, ref, visible, closeOnClickModal]);

        useImperativeHandle(ref, () => wrapperRef.current);

        const transitionName = typeof transitionConfig === 'string' ? transitionConfig : transitionConfig.name;

        return (
            <DialogContext.Provider value={{ modal: modal, doClose, center, overflow }}>
                {createPortal(
                    <Transition
                        nodeRef={wrapperRef}
                        visible={visible}
                        transitionAppear
                        unmountOnExit={props.unmountOnExit || !draggable}
                        beforeEnter={() => {
                            props.beforeEnter?.();
                            addClass(wrapperRef.current, transitionName + '-enter-from');
                            addClass(wrapperRef.current, transitionName + '-enter-active');
                        }}
                        onEnter={() => {
                            props.onOpen?.();
                            props.onEnter?.();
                            if (draggable && dialogRef.current) {
                                // addStyle(modalRef.current, 'transform', `translate(${positionRef.current.left}px, ${positionRef.current.top}px)`);
                            }
                            if (lockScroll) {
                                addClass(document.body, b('popup-parent--hidden', false));
                                const scrollWidth = getScrollBarWidth(namespace);
                                document.body.style.width = `calc(100% - ${scrollWidth}px)`;
                            }
                        }}
                        afterEnter={() => {
                            props.afterEnter?.();
                            props.onOpened?.();
                            removeClass(wrapperRef.current, transitionName + '-enter-from');
                            // removeClass(wrapperRef.current, transitionName + '-enter-active');
                        }}
                        beforeLeave={() => {
                            addClass(wrapperRef.current, transitionName + '-leave-to');
                            addClass(wrapperRef.current, transitionName + '-leave-active');
                            props.beforeLeave?.();
                        }}
                        onLeave={() => {
                            props.onClose?.();
                            props.onLeave?.();
                            // removeClass(wrapperRef.current, transitionName + '-leave-to');
                        }}
                        afterLeave={() => {
                            props.afterLeave?.();
                            props.onClosed?.();
                            removeClass(wrapperRef.current, transitionName + '-leave-active');
                            removeClass(wrapperRef.current, transitionName + '-leave-to');
                            if (lockScroll) {
                                removeClass(document.body, b('popup-parent--hidden', false));
                                document.body.style.width = '';
                            }
                        }}
                        duration={200 + closeDelay}
                        showDuration={openDelay}
                        {...(typeof transitionConfig === 'string' ? {} : omit(transitionConfig, 'name'))}
                    >
                        <div
                            className={classNames(modal ? b('overlay', false) : '', modalClass || b('modal-dialog', false), is({ penetrable: modalPenetrable }))}
                            style={modal ? { zIndex: nextZIndex } : { zIndex: nextZIndex, position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                            ref={wrapperRef}
                        >
                            <div ref={overlayRef} className={b(`overlay-${classPrefix}`, false)} style={{ display: alignCenter ? 'flex' : 'block' }}>
                                <div
                                    className={classNames(b(), props.className, is({ draggable, 'align-center': alignCenter, fullscreen }), { [m`center`]: center })}
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
                                    <DialogBody ref={contentRef} classPrefix={classPrefix} className={bodyClass}>
                                        {children}
                                    </DialogBody>
                                    <DialogFooter classPrefix={classPrefix} className={footerClass}>
                                        {footer}
                                    </DialogFooter>
                                </div>
                            </div>
                        </div>
                    </Transition>,
                    document.body,
                )}
            </DialogContext.Provider>
        );
    }),
);

Dialog.displayName = 'ElDialog';

export default Dialog;
