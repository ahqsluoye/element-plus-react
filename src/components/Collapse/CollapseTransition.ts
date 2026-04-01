import { addClass, removeClass } from 'dom-lib';
import { RefObject } from 'react';

export const beforeEnter = (node: RefObject<HTMLElement>) => {
    if (node.current) {
        const { current: el } = node;
        el.style.opacity = '0';
        el.style.height = '0';
    }
};

export const onEnter = (node: RefObject<HTMLElement>) => {
    if (node.current) {
        const { current: el } = node;
        addClass(el, 'collapse-transition');
        el.dataset.oldOverflow = el.style.overflow;
        if (el.scrollHeight !== 0) {
            el.style.height = `${el.scrollHeight}px`;
        } else {
            el.style.height = '';
        }

        el.style.overflow = 'hidden';
        el.style.opacity = '1';
    }
};

export const afterEnter = (node: RefObject<HTMLElement>) => {
    if (node.current) {
        const { current: el } = node;
        removeClass(el, 'collapse-transition');
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
    }
};

export const beforeLeave = (node: RefObject<any>) => {
    if (node.current) {
        const { current: el } = node;
        addClass(el, 'collapse-transition');
        if (!el.dataset) {
            el.dataset = {};
        }
        el.dataset.oldOverflow = el.style.overflow;

        el.style.height = `${el.scrollHeight}px`;
        el.style.overflow = 'hidden';
        el.style.margin = 0;
    }
};

export const onLeave = (node: RefObject<any>) => {
    if (node.current) {
        const { current: el } = node;
        el.style.transitionProperty = 'height';
        el.style.height = 0;
    }
};

export const afterLeave = (node: RefObject<HTMLElement>) => {
    if (node.current) {
        const { current: el } = node;
        el.style.height = '';
        el.style.overflow = el.dataset.oldOverflow;
        el.style.display = '';
    }
};
