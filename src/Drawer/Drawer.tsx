import classNames from 'classnames';
import { addClass, removeClass } from 'dom-lib';
import React, { RefObject, forwardRef, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '../Transition';
import { PopupManager } from '../Util';
import { useClassNames, useControlled } from '../hooks';
import DrawerBody from './DrawerBody';
import { DrawerContext } from './DrawerContext';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';
import { DrawerProps } from './typings';

function InternalComp(props: DrawerProps, ref: RefObject<HTMLDivElement>) {
    const { backdrop, size, placement, children, onClose, classPrefix = 'drawer' } = props;
    const { b, wb } = useClassNames(classPrefix);
    const [visible, setVisible, isControlled] = useControlled(props.visible, props.defaultVisible);

    // 模态框容器div
    const wrapperRef = useRef<HTMLDivElement>();
    // 模态框主题div
    const drawerRef = useRef<HTMLDivElement>();
    // 遮罩div
    const backdropRef = useRef<HTMLDivElement>();

    /**关闭对话框 */
    useEffect(() => {
        if (visible) {
            let mousedown: MouseEvent;
            const shadowRef = ref?.current ?? wrapperRef?.current;
            shadowRef?.addEventListener('mousedown', (e: MouseEvent) => (mousedown = e));
            shadowRef?.addEventListener('mouseup', (mouseup: MouseEvent) => {
                const mouseUpTarget = mouseup?.target as Node;
                const mouseDownTarget = mousedown?.target as Node;
                const isTargetExists = !mouseUpTarget || !mouseDownTarget;

                const isContainedByPopper = drawerRef?.current?.contains(mouseUpTarget) || drawerRef?.current?.contains(mouseDownTarget);
                if (isTargetExists || isContainedByPopper) {
                    return;
                }

                if (backdrop === true) {
                    setVisible(false);
                    onClose?.();
                } else if (backdrop === 'static') {
                    addClass(drawerRef.current, 'r-drawer-shake');
                    setTimeout(() => {
                        removeClass(drawerRef.current, 'r-drawer-shake');
                    }, 300);
                }
            });
        }
    }, [backdrop, onClose, ref, setVisible, visible]);

    return (
        <DrawerContext.Provider value={{ backdrop, setVisible, isControlled, onClose }}>
            {backdrop &&
                createPortal(
                    <Transition
                        visible={visible}
                        transitionAppear
                        unmountOnExit
                        duration={300}
                        onEnter={() => {
                            setTimeout(() => {
                                addClass(backdropRef.current, 'r-anim-in');
                            }, 10);
                        }}
                        beforeLeave={() => removeClass(backdropRef.current, 'r-anim-in')}
                    >
                        <div className={classNames(b`backdrop`, 'r-anim-fade')} style={{ zIndex: PopupManager.nextZIndex() }} ref={backdropRef} />
                    </Transition>,
                    document.body,
                )}

            {createPortal(
                <Transition
                    visible={visible}
                    transitionAppear
                    unmountOnExit
                    beforeEnter={props.beforeEnter}
                    onEnter={() => {
                        props.onOpen?.();
                        props.onEnter?.();
                    }}
                    beforeLeave={() => {
                        removeClass(drawerRef.current, 'r-anim-slide-in');
                        addClass(drawerRef.current, 'r-anim-slide-out');
                        props.beforeLeave?.();
                    }}
                    onLeave={props.onLeave}
                    afterLeave={props.afterLeave}
                    duration={300}
                >
                    <div className={classNames(b`wrapper`, props.className)} style={{ ...props.style, zIndex: PopupManager.nextZIndex() }} ref={ref || wrapperRef}>
                        <div className={classNames(wb(size, placement), 'r-anim-slide-in', `r-anim-${placement}`)} style={{ display: 'block' }} ref={drawerRef}>
                            <div className={b`dialog`}>
                                <div className={b`content`}>{children}</div>
                            </div>
                        </div>
                    </div>
                </Transition>,
                document.body,
            )}
        </DrawerContext.Provider>
    );
}

const Comp = forwardRef(InternalComp) as (props: DrawerProps & { ref?: RefObject<HTMLDivElement> | React.ForwardedRef<HTMLDivElement> }) => React.ReactElement;

type InternalType = typeof Comp;

interface CompInterface extends InternalType {
    displayName?: string;
    defaultProps?: Partial<DrawerProps>;
    Header: typeof DrawerHeader;
    Body: typeof DrawerBody;
    Footer: typeof DrawerFooter;
}

const Drawer = Comp as CompInterface;

Drawer.defaultProps = {
    placement: 'right',
    backdrop: true,
    size: 'small',
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;

Drawer.displayName = 'Drawer';

export default Drawer;
