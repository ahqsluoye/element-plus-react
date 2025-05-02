import Notifications from './Main';
import type { INotification, NotificationProps, NotificationQueue, NotificationRef, Position } from './typings';

// This should be a queue but considering there were `non-autoclosable` notifications.
const notifications: Record<Position, NotificationQueue> = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': [],
};

// the gap size between each notification
const GAP_SIZE = 16;
let seed = 1;

export const Notification: INotification = function (options: NotificationProps) {
    const position = options.position || 'top-right';

    let verticalOffset = options.offset || 0;
    notifications[position].forEach(inst => {
        verticalOffset += (inst.current.el.current.offsetHeight || 84) + GAP_SIZE;
    });
    verticalOffset += GAP_SIZE;

    const id = 'notification_' + seed++;
    const userOnClose = options.onClose;

    options = {
        ...options,
        onClose: () => {
            close(id, position, userOnClose);
        },
        offset: verticalOffset,
        id,
    };
    const { ref } = new Notifications(options);
    notifications[position].push(ref);

    return {
        close: ref.current?.close,
        el: ref.current?.el,
    };
} as any;

(['success', 'warning', 'info', 'error'] as const).forEach(type => {
    Object.assign(Notification, {
        [type]: (options: NotificationProps | string = {}) => {
            if (typeof options === 'string') {
                options = {
                    message: options,
                };
            }
            options.type = type;
            return Notification(options);
        },
    });
});

Object.assign(Notification, {
    closeAll: closeAll,
});

/**
 *
 * @param id
 * @param position
 * @param userOnClose
 * @returns
 */
export function close(id: string, position: Position, userOnClose?: (vm: NotificationRef) => void): void {
    const orientedNotifications = notifications[position];
    const idx = orientedNotifications.findIndex(inst => {
        return id === inst.current.id;
    });

    if (idx === -1) {
        return;
    }

    const inst = orientedNotifications[idx];
    const { el } = inst.current;
    if (!el) {
        return;
    }
    userOnClose?.(inst.current);

    const removedHeight = el.current?.offsetHeight;
    orientedNotifications.splice(idx, 1);
    const len = orientedNotifications.length;
    if (len < 1) {
        return;
    }
    for (let i = idx; i < len; i++) {
        const verticalPos = position.split('-')[0];
        const pos = parseInt(orientedNotifications[i].current.el.current?.style[verticalPos], 10) - removedHeight - GAP_SIZE;
        orientedNotifications[i].current.setOffset(pos);
    }
}

export function closeAll(): void {
    for (const key in notifications) {
        const orientedNotifications = notifications[key as Position];
        for (let i = orientedNotifications.length - 1; i >= 0; i--) {
            orientedNotifications[i].current.close();
        }
    }
}

export type { INotification, INotificationHandle, NotificationProps as INotificationOptions } from './typings';
