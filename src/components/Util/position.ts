import { isClient } from './raf';

export const isInContainer = (el?: Element, container?: Element | Window): boolean => {
    if (!isClient || !el || !container) {
        return false;
    }

    const elRect = el.getBoundingClientRect();

    let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>;
    if (container instanceof Element) {
        containerRect = container.getBoundingClientRect();
    } else {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0,
        };
    }
    return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
};

/** 获取元素到容器顶部的偏移距离 */
export const getOffsetTop = (el: HTMLElement) => {
    let offset = 0;
    let parent = el;

    while (parent) {
        offset += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement;
    }

    return offset;
};

/** 获取目标元素到滚动容器顶部的距离 */
export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
    return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};

export const getClientXY = (event: MouseEvent | TouchEvent) => {
    let clientX: number;
    let clientY: number;
    if (event.type === 'touchend') {
        clientY = (event as TouchEvent).changedTouches[0].clientY;
        clientX = (event as TouchEvent).changedTouches[0].clientX;
    } else if (event.type.startsWith('touch')) {
        clientY = (event as TouchEvent).touches[0].clientY;
        clientX = (event as TouchEvent).touches[0].clientX;
    } else {
        clientY = (event as MouseEvent).clientY;
        clientX = (event as MouseEvent).clientX;
    }
    return {
        clientX,
        clientY,
    };
};
