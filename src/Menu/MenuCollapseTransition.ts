import { addClass, hasClass, removeClass } from 'dom-lib';
import { namespace } from '../hooks/prefix';

export const beforeEnter = el => {
    el.style.opacity = '0.2';
};

export const onEnter = (el: HTMLElement) => {
    addClass(el, `${namespace}-opacity-transition`);
    el.style.opacity = '1';
    if (hasClass(el, `${namespace}-menu--collapse`)) {
        removeClass(el, `${namespace}-menu--collapse`);
    } else {
        addClass(el, `${namespace}-menu--collapse`);
    }
};

export const afterEnter = (el: HTMLElement) => {
    removeClass(el, `${namespace}-opacity-transition`);
    el.style.opacity = '';
    el.style.width = '';
};

export const beforeLeave = el => {
    if (!el.dataset) {
        (el as any).dataset = {};
    }

    if (hasClass(el, `${namespace}-menu--collapse`)) {
        removeClass(el, `${namespace}-menu--collapse`);
        el.dataset.oldOverflow = el.style.overflow;
        el.dataset.scrollWidth = el.clientWidth.toString();
        addClass(el, `${namespace}-menu--collapse`);
    } else {
        addClass(el, `${namespace}-menu--collapse`);
        el.dataset.oldOverflow = el.style.overflow;
        el.dataset.scrollWidth = el.clientWidth.toString();
        removeClass(el, `${namespace}-menu--collapse`);
    }

    el.style.width = `${el.scrollWidth}px`;
    el.style.overflow = 'hidden';
};

export const onLeave = el => {
    addClass(el, 'horizontal-collapse-transition');
    el.style.width = `${el.dataset.scrollWidth}px`;
};

export const afterLeave = el => {
    removeClass(el, 'horizontal-collapse-transition');
};
