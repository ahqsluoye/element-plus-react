import ElTransition from '@qsxy/element-plus-react/Transition/Transition';
import { addUnit, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLockScreen } from '@qsxy/element-plus-react/hooks/useLockscreen';
import { useZIndex } from '@qsxy/element-plus-react/hooks/useZIndex';
import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import { useComposeRef } from 'rc-util';
import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import DrawerBody from './DrawerBody';
import { DrawerContext } from './DrawerContext';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';
import { DrawerProps } from './typings';

const Drawer = memo(
    forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                direction: 'rtl',
                modal: true,
                closeOnClickModal: true,
                withHeader: true,
                lockScroll: true,
                size: '30%',
                destroyOnClose: false,
            },
            props,
        );
        const {
            visible,
            modal,
            modalPenetrable,
            modalClass,
            closeOnClickModal,
            title,
            footer,
            headerClass,
            bodyClass,
            footerClass,
            withHeader,
            size,
            direction,
            children,
            onCloseDrawer,
            beforeClose,
            showClose,
            border,
            classPrefix = 'drawer',
            lockScroll,
            zIndex,
            destroyOnClose,
        } = props;
        const { b, is } = useClassNames(classPrefix);

        useLockScreen(visible, { shouldLock: lockScroll });

        const sizeStyle = useMemo(() => {
            if (['ltr', 'rtl'].includes(direction)) {
                return { width: addUnit(size) };
            } else if (['ttb', 'btt'].includes(direction)) {
                return { height: addUnit(size) };
            }
        }, [direction, size]);

        // 模态框容器div
        const wrapperRef = useRef<HTMLDivElement>(null);
        // 模态框主题div
        const drawerRef = useRef<HTMLDivElement>(null);
        const composedRef = useComposeRef(ref, wrapperRef);
        const initRef = useRef(false);

        const nextZIndex = useZIndex(visible, zIndex);

        const doClose = useCallback(() => {
            if (beforeClose) {
                beforeClose?.((cancle: boolean) => {
                    if (cancle) {
                        return;
                    }
                    onCloseDrawer?.();
                });
            } else {
                onCloseDrawer?.();
            }
        }, [beforeClose, onCloseDrawer]);

        /**关闭对话框 */
        useEffect(() => {
            if (visible) {
                let mousedown: MouseEvent;
                const onMousedown = (e: MouseEvent) => {
                    mousedown = e;
                };
                const onMouseup = (mouseup: MouseEvent) => {
                    const mouseUpTarget = mouseup?.target as Node;
                    const mouseDownTarget = mousedown?.target as Node;
                    const isTargetExists = !mouseUpTarget || !mouseDownTarget;

                    const isContainedByPopper = drawerRef?.current?.contains(mouseUpTarget) || drawerRef?.current?.contains(mouseDownTarget);
                    if (isTargetExists || isContainedByPopper) {
                        return;
                    }

                    if (closeOnClickModal) {
                        doClose();
                    } else {
                        addClass(drawerRef.current, `${namespace}-drawer-shake`);
                        setTimeout(() => {
                            removeClass(drawerRef.current, `${namespace}-drawer-shake`);
                        }, 300);
                    }
                };
                if (wrapperRef.current) {
                    const shadowRef = wrapperRef.current;
                    shadowRef.removeEventListener('mousedown', onMousedown);
                    shadowRef.removeEventListener('mouseup', onMouseup);
                    if (visible) {
                        if ((!initRef.current && !destroyOnClose) || destroyOnClose) {
                            initRef.current = true;
                            shadowRef.addEventListener('mousedown', onMousedown);
                            shadowRef.addEventListener('mouseup', onMouseup);
                        }
                    }
                }
            }
        }, [visible]);

        return (
            <DrawerContext.Provider value={{ doClose }}>
                {createPortal(
                    <ElTransition
                        nodeRef={wrapperRef}
                        visible={visible}
                        showDuration={0}
                        transitionAppear
                        unmountOnExit={destroyOnClose}
                        beforeEnter={() => {
                            props.beforeEnter?.();
                            addClass(wrapperRef.current, b`fade-enter-from`);
                            addClass(wrapperRef.current, b`fade-enter-active`);
                        }}
                        onEnter={() => {
                            props.onOpen?.();
                            props.onEnter?.();
                        }}
                        afterEnter={() => {
                            props.afterEnter?.();
                            props.onOpened?.();
                            removeClass(wrapperRef.current, b`fade-enter-from`);
                        }}
                        beforeLeave={() => {
                            addClass(wrapperRef.current, b`fade-leave-to`);
                            addClass(wrapperRef.current, b`fade-leave-active`);
                            props.beforeLeave?.();
                        }}
                        onLeave={() => {
                            props.onClose?.();
                            props.onLeave?.();
                        }}
                        afterLeave={() => {
                            props.afterLeave?.();
                            props.onClosed?.();
                            removeClass(wrapperRef.current, b`fade-leave-active`);
                            removeClass(wrapperRef.current, b`fade-leave-to`);
                        }}
                        duration={300}
                    >
                        <div
                            className={classNames(modal ? b('overlay', false) : '', modalClass || b('modal-drawer', false), is('drawer', { penetrable: modalPenetrable }))}
                            style={modal ? { zIndex: nextZIndex } : { zIndex: nextZIndex, position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' }}
                            ref={composedRef}
                        >
                            <div className={classNames(b(), direction, { open: visible }, props.className)} style={{ ...sizeStyle, ...props.style }} role="dialog" ref={drawerRef}>
                                {withHeader ? (
                                    <DrawerHeader className={headerClass} showClose={showClose} border={border}>
                                        {title}
                                    </DrawerHeader>
                                ) : null}
                                <DrawerBody className={bodyClass}>{children}</DrawerBody>
                                {footer && <DrawerFooter className={footerClass}>{footer}</DrawerFooter>}
                            </div>
                        </div>
                    </ElTransition>,
                    document.body,
                )}
            </DrawerContext.Provider>
        );
    }),
);

Drawer.displayName = 'ElDrawer';

export default Drawer;
