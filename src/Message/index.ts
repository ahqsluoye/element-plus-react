import { isValidElement, RefObject } from 'react';
import { isEmpty } from '../Util';
import Main from './Main';
import { MessageHandle, MessageMethod, MessageParams, MessageProps, MessageQueue } from './typings';

export const instances: MessageQueue = [];
let seed = 1;

export const Message: MessageMethod = function (opts: MessageParams = {} as MessageParams): MessageHandle {
    if (typeof opts === 'string' || isValidElement(opts)) {
        opts = {
            message: opts,
        };
    }

    if (isEmpty(opts)) {
        opts = {
            message: '',
        };
    }
    let options: MessageProps = opts as MessageProps;

    let verticalOffset = typeof opts !== 'string' && !isValidElement(opts) ? (opts as MessageProps)?.offset || 20 : 20;
    instances.forEach(inst => {
        verticalOffset += (inst.current.el.current?.offsetHeight || 52) + 16;
    });
    verticalOffset += 16;

    const id = 'message_' + seed++;
    let userOnClose = options.onClose;
    if (options.immediate) {
        // 已经立即触发了，此处置空避免重复触发
        userOnClose = null;
        options.userOnClose = options.onClose;
    }

    options = {
        ...options,
        onClose: () => {
            close(id, userOnClose);
        },
        offset: verticalOffset,
        id,
    };

    if (options.grouping && instances.length) {
        const instance = instances.find(inst => inst.current.message === options.message);
        if (instance.current) {
            instance.current.setReapetNum();
            // instance.props.type = normalized.type;
            return {
                close: instance.current.close,
                el: instance.current.el,
            };
        }
    }

    const { ref } = new Main(options);
    instances.push(ref);

    return {
        close: ref.current?.close,
        el: ref.current?.el,
    };
} as any;

export function close(id: string, userOnClose?: (el?: RefObject<HTMLElement>) => void): void {
    const idx = instances.findIndex(inst => {
        return id === inst.current.id;
    });
    if (idx === -1) {
        return;
    }

    const inst = instances[idx];
    const { el } = inst.current;
    if (!el) {
        return;
    }

    userOnClose?.(el);

    const removedHeight = el.current?.offsetHeight;
    instances.splice(idx, 1);

    // adjust other instances vertical offset
    const len = instances.length;
    if (len < 1) {
        return;
    }
    for (let i = idx; i < len; i++) {
        const pos = instances[i].current.top - removedHeight - 16;
        instances[i].current.setOffset(pos);
    }
}

export function closeAll(): void {
    for (let i = instances.length - 1; i >= 0; i--) {
        const instance = instances[i].current;
        instance.close();
    }
}

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string' || isValidElement(options)) {
            options = {
                message: options,
                type,
            };
        } else {
            options.type = type;
        }
        return Message(options);
    };
});

Object.assign(Message, {
    closeAll: closeAll,
});

// export default Message;
export type { MessageDispatcher, MessageMethod, MessageProps, MessageType } from './typings';
