import classNames from 'classnames';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Badge from '../Badge/Badge';
import Transition from '../Transition/Transition';
import { PopupManager, mergeDefaultProps } from '../Util';
import { EVENT_CODE, TypeMap } from '../config/Constants';
import { useClassNames } from '../hooks';
import { MessageProps, MessageRef } from './typings';
// import { ConfigProvider } from '../ConfigProvider';

const Message = forwardRef<MessageRef, MessageProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            duration: 3000,
            message: '',
            showClose: true,
            type: 'info',
            offset: 20,
        },
        props,
    );
    const { classPrefix = 'message', center, iconClass, showClose: closable, type, onClose, duration, message, immediate, userOnClose, afterLeave } = props;
    const { b, e, m, is } = useClassNames(classPrefix);
    // const { message: messageConfig } = useContext(ConfigProvider);

    const [visible, setVisible] = useState(false);
    const [offset, setOffset] = useState(props.offset);
    const offsetRef = useRef(props.offset);
    const [repeatNum, setReapetNum] = useState(1);
    const repeatNumRef = useRef(1);
    // eslint-disable-next-line no-undef
    const timer = useRef<NodeJS.Timeout | null>(null);
    const messageRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        setVisible(false);
        onClose?.(messageRef);
    }, [onClose]);

    useImperativeHandle(ref, () => ({
        get el() {
            return messageRef;
        },
        get id() {
            return props.id;
        },
        get top() {
            return offsetRef.current;
        },
        get message() {
            return props.message;
        },
        close: handleClose,
        setOffset: val => {
            offsetRef.current = val;
            setOffset(val);
        },
        setReapetNum: updateReapetNum,
    }));

    const startTimer = useCallback(() => {
        if (duration > 0) {
            timer.current = setTimeout(() => {
                // if (visible) {
                handleClose();
                // }
            }, duration);
        }
    }, [duration, handleClose]);

    const clearTimer = useCallback(() => {
        clearTimeout(timer.current);
        timer.current = null;
    }, []);

    const updateReapetNum = useCallback(() => {
        clearTimer();
        startTimer();
        repeatNumRef.current = repeatNumRef.current + 1;
        // console.log(repeatNumRef.current);
        setReapetNum(repeatNumRef.current);
        setVisible(true);
    }, [clearTimer, startTimer]);

    const keydown = useCallback(
        ({ code }: KeyboardEvent) => {
            if (code === EVENT_CODE.esc) {
                // press esc to close the message
                if (visible) {
                    handleClose();
                }
            } else {
                startTimer(); // resume timer
            }
        },
        [handleClose, startTimer, visible],
    );

    useEffect(() => {
        if (immediate) {
            userOnClose?.call(this);
        }
        setVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (visible) {
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
    const closeIcon = useMemo(() => closable && <div className={classNames(e`closeBtn`, b('icon-close', false))} onClick={handleClose} />, [closable, e, b, handleClose]);

    return createPortal(
        <Transition nodeRef={messageRef} name={b('message-fade', false)} visible={visible} display="flex" unmountOnExit afterEnter={startTimer} afterLeave={afterLeave}>
            <div
                ref={messageRef}
                className={classNames(b(), { [m(type)]: type && !iconClass }, is({ center, closable }), props.className)}
                style={{
                    ...props?.style,
                    top: offset,
                    zIndex: PopupManager.nextZIndex(),
                }}
                // 鼠标悬浮停止自动关闭
                onMouseEnter={clearTimer}
                onMouseLeave={startTimer}
            >
                {repeatNum > 1 && <Badge value={repeatNum} type={type || 'info'} className={e`badge`} />}
                {(type || iconClass) && <i className={classNames(e`icon`, typeClass, iconClass)} />}
                <p className={e`content`}>{message}</p>
                {closeIcon}
            </div>
        </Transition>,
        document.body,
    );
});

export default memo(Message);
