import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import { useComposeRef } from 'rc-util';
import React, { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Transition from '../Transition/Transition';
import { PopupManager, addUnit, getScrollBarWidth, mergeDefaultProps } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import { namespace } from '../hooks/prefix';
import DrawerBody from './DrawerBody';
import { DrawerContext } from './DrawerContext';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';
import { DrawerProps } from './typings';

const Drawer = memo(
    forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
        props = mergeDefaultProps(
            {
                direction: 'right',
                modal: true,
                closeOnClickModal: true,
                withHeader: true,
                lockScroll: true,
                size: '30%',
            },
            props,
        );
        const {
            modal,
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
            close,
            beforeClose,
            showClose,
            border,
            classPrefix = 'drawer',
            lockScroll,
        } = props;
        const { b, wb } = useClassNames(classPrefix);
        const [visible, setVisible] = useControlled(props.visible, props.defaultVisible);

        const sizeStyle = useMemo(() => {
            if (['left', 'right'].includes(direction)) {
                return { '--el-drawer-width': addUnit(size) };
            } else if (['top', 'bottom'].includes(direction)) {
                return { '--el-drawer-height': addUnit(size) };
            }
        }, [direction, size]);

        // 模态框容器div
        const wrapperRef = useRef<HTMLDivElement>(null);
        // 模态框主题div
        const drawerRef = useRef<HTMLDivElement>(null);
        // 遮罩div
        const backdropRef = useRef<HTMLDivElement>(null);

        const composedRef = useComposeRef(ref, wrapperRef);

        const [zIndex, setZIndex] = useState({ modal: 1, drawer: 1 });

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

        /**关闭对话框 */
        useEffect(() => {
            if (visible) {
                setZIndex({
                    modal: PopupManager.nextZIndex(),
                    drawer: PopupManager.nextZIndex(),
                });
                let mousedown: MouseEvent;
                const shadowRef = wrapperRef?.current;
                shadowRef?.addEventListener('mousedown', (e: MouseEvent) => (mousedown = e));
                shadowRef?.addEventListener('mouseup', (mouseup: MouseEvent) => {
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
                });
            }
        }, [b, closeOnClickModal, modal, close, ref, setVisible, visible, doClose]);

        return (
            <DrawerContext.Provider value={{ doClose }}>
                {modal &&
                    createPortal(
                        <Transition
                            nodeRef={backdropRef}
                            visible={visible}
                            transitionAppear
                            unmountOnExit
                            duration={300}
                            showDuration={0}
                            onEnter={() => {
                                setTimeout(() => {
                                    addClass(backdropRef.current, `${namespace}-anim-in`);
                                }, 10);
                            }}
                            beforeLeave={() => removeClass(backdropRef.current, `${namespace}-anim-in`)}
                        >
                            <div className={classNames(b`backdrop`, `${namespace}-anim-fade`)} style={{ zIndex: zIndex.modal }} ref={backdropRef} />
                        </Transition>,
                        document.body,
                    )}

                {createPortal(
                    <Transition
                        nodeRef={wrapperRef}
                        visible={visible}
                        showDuration={0}
                        transitionAppear
                        unmountOnExit
                        beforeEnter={props.beforeEnter}
                        onEnter={() => {
                            props.onOpen?.();
                            props.onEnter?.();
                            if (lockScroll) {
                                addClass(document.body, b('popup-parent--hidden', false));
                                const scrollWidth = getScrollBarWidth(namespace);
                                document.body.style.width = `calc(100% - ${scrollWidth}px)`;
                            }
                        }}
                        afterEnter={() => {
                            props.afterEnter?.();
                            props.onOpened?.();
                        }}
                        beforeLeave={() => {
                            removeClass(drawerRef.current, `${namespace}-anim-slide-in`);
                            addClass(drawerRef.current, `${namespace}-anim-slide-out`);
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
                                document.body.style.width = '';
                            }
                        }}
                        duration={300}
                    >
                        <div className={classNames(b`wrapper`, props.className)} style={{ ...props.style, zIndex: zIndex.drawer }} ref={composedRef}>
                            <div
                                className={classNames(wb(direction), `${namespace}-anim-slide-in`, `${namespace}-anim-${direction}`)}
                                style={{ display: 'block', ...sizeStyle }}
                                ref={drawerRef}
                            >
                                <div className={b`dialog`}>
                                    <div className={b`content`}>
                                        {withHeader ? (
                                            <DrawerHeader className={headerClass} showClose={showClose} border={border}>
                                                {title}
                                            </DrawerHeader>
                                        ) : null}
                                        <DrawerBody className={bodyClass}>{children}</DrawerBody>
                                        {footer && <DrawerFooter className={footerClass}>{footer}</DrawerFooter>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>,
                    document.body,
                )}
            </DrawerContext.Provider>
        );
    }),
);

Drawer.displayName = 'ElDrawer';

export default Drawer;
