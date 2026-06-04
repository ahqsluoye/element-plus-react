import { isFunction } from './base';
import { easeInOutCubic } from './easings';
import { cAF, rAF } from './raf';

let scrollBarWidth: number;
export const getScrollBarWidth = (namespace: string): number => {
    if (scrollBarWidth !== undefined) {
        return scrollBarWidth;
    }

    const outer = document.createElement('div');
    outer.className = `${namespace}-scrollbar__wrap`;
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    document.body.appendChild(outer);

    const widthNoScroll = outer.offsetWidth;
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const widthWithScroll = inner.offsetWidth;
    outer.parentNode?.removeChild(outer);
    scrollBarWidth = widthNoScroll - widthWithScroll;

    return scrollBarWidth;
};

/** 判断是否 window 对象 */
export const isWindow = (el: unknown): el is Window => el === window;

/** 获取滚动元素 */
export const getScrollElement = (target: HTMLElement, container: HTMLElement | Window): HTMLElement => {
    if (isWindow(container)) {
        return target.ownerDocument.documentElement;
    }
    return container as HTMLElement;
};

/** 获取 scrollTop */
export const getScrollTop = (container: HTMLElement | Window): number => {
    if (isWindow(container)) {
        return window.scrollY;
    }
    return (container as HTMLElement).scrollTop;
};

/** 动画滚动 */
export const animateScrollTo = (container: HTMLElement | Window, from: number, to: number, duration: number, callback?: () => void): (() => void) => {
    const startTime = Date.now();

    let handle: number | undefined;
    const scroll = () => {
        const timestamp = Date.now();
        const time = timestamp - startTime;
        const nextScrollTop = easeInOutCubic(time > duration ? duration : time, from, to, duration);

        if (isWindow(container)) {
            container.scrollTo(window.pageXOffset, nextScrollTop);
        } else {
            container.scrollTop = nextScrollTop;
        }
        if (time < duration) {
            handle = rAF(scroll);
        } else if (isFunction(callback)) {
            callback();
        }
    };

    scroll();

    return () => {
        handle && cAF(handle);
    };
};
