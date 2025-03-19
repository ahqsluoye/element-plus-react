import classNames from 'classnames';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from '../Transition';
import { PopupManager } from '../Util';
import { EVENT_CODE, TypeMap } from '../config/Constants';
import { useClassNames } from '../hooks';
import { NotificationProps, NotificationRef } from './typings';

const Notification = forwardRef<NotificationRef, NotificationProps>((props, ref) => {
    const { iconClass, message, position, showClose, type, title, classPrefix = 'notification', onClose, duration, onSuccess, afterLeave } = props;
    const { b, e } = useClassNames(classPrefix);
    const [visible, setVisible] = useState(false);
    const [offset, setOffset] = useState(props.offset);
    const offsetRef = useRef(props.offset);
    const timer = useRef(null);
    const notificationRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const verticalProperty = position.startsWith('top') ? 'top' : 'bottom';

    const handleClose = useCallback(() => {
        setVisible(false);
        onClose?.();
    }, [onClose]);

    useImperativeHandle(ref, () => ({
        get el() {
            return notificationRef;
        },
        get id() {
            return props.id;
        },
        get top() {
            return offsetRef.current;
        },
        close: handleClose,
        setOffset: val => {
            offsetRef.current = val;
            setOffset(val);
        },
    }));

    const startTimer = useCallback(() => {
        if (duration > 0) {
            timer.current = setTimeout(() => {
                if (visible) {
                    handleClose();
                }
            }, duration);
        }
    }, [duration, visible, handleClose]);

    const clearTimer = useCallback(() => {
        clearTimeout(timer.current);
        timer.current = null;
    }, []);

    const keydown = useCallback(
        ({ code }: KeyboardEvent) => {
            if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) {
                clearTimer();
            } else if (code === EVENT_CODE.esc) {
                if (visible) {
                    handleClose();
                }
            } else {
                startTimer();
            }
        },
        [clearTimer, handleClose, startTimer, visible],
    );

    useLayoutEffect(() => {
        setVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (visible) {
            startTimer();
            onSuccess?.(contentRef.current);
            document.addEventListener('keydown', keydown, false);
            return () => {
                document.removeEventListener('keydown', keydown, false);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    /** 前缀图标 */
    const typeClass = useMemo(() => {
        const _type = !iconClass && type;
        return _type && TypeMap[_type] ? b(`icon-${TypeMap[_type]}`, false) : '';
    }, [b, iconClass, type]);

    /** 关闭图标 */
    const closeIcon = useMemo(() => showClose && <div className={classNames(e`closeBtn`, b('icon-close', false))} onClick={handleClose} />, [showClose, e, b, handleClose]);

    return createPortal(
        <Transition name={b('notification-fade', false)} visible={visible} display="flex" afterLeave={afterLeave}>
            <div
                ref={notificationRef}
                className={classNames(b(), position.indexOf('right') > 1 ? 'right' : 'left')}
                style={{
                    [verticalProperty]: offset,
                    zIndex: PopupManager.nextZIndex(),
                }}
                // 鼠标悬浮停止自动关闭
                onMouseEnter={clearTimer}
                onMouseLeave={startTimer}
            >
                {(type || iconClass) && <i className={classNames(e`icon`, typeClass, iconClass)} />}
                <div className={classNames(e`group`, { 'is-with-icon': typeClass || iconClass })}>
                    <h2 className={e`title`}>{title}</h2>
                    <div className={e`content`} style={title ? null : { margin: 0 }} ref={contentRef}>
                        <p>{message}</p>
                    </div>
                    {closeIcon}
                </div>
            </div>
        </Transition>,
        document.body,
    );
});

Notification.defaultProps = {
    duration: 4500, // default 4500
    message: '',
    onClose: null,
    onClick: null,
    afterLeave: null,
    offset: 0, // defaults 0
    position: 'top-right', // default top-right
    showClose: true,
};

Notification.displayName = 'ElNotification';

export default Notification;
