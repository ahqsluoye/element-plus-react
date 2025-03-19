import { addClass, removeClass } from 'dom-lib';

export const beforeEnter = el => {
    el.style.height = '0';
    el.style.opacity = '0';
};

export const onEnter = (el: HTMLElement) => {
    addClass(el, 'collapse-transition');
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`;
    } else {
        el.style.height = '';
    }

    el.style.overflow = 'hidden';
    el.style.opacity = '1';
};

export const afterEnter = (el: HTMLElement) => {
    removeClass(el, 'collapse-transition');
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
};

export const beforeLeave = el => {
    addClass(el, 'collapse-transition');
    if (!el.dataset) {
        el.dataset = {};
    }
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
    el.style.margin = 0;
};

export const onLeave = el => {
    el.style.transitionProperty = 'height';
    el.style.height = 0;
};

export const afterLeave = el => {
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.display = '';
};
