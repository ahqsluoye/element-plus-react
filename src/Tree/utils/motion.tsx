import { addClass, removeClass } from 'dom-lib';
import { TransitionProps } from '../../Transition';
import { namespace } from '../../hooks/prefix';

export const beforeEnter = el => {
    el.style.height = '0';
    el.style.opacity = '0';
};

export const onEnter = (el: HTMLElement) => {
    addClass(el, `${namespace}-motion-collapse`);
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
        el.style.height = `${el.scrollHeight}px`;
        el.style.opacity = '1';
    } else {
        el.style.height = '';
    }
    el.style.overflow = 'hidden';
};

export const afterEnter = (el: HTMLElement) => {
    removeClass(el, `${namespace}-motion-collapse`);
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
};

export const beforeLeave = el => {
    addClass(el, `${namespace}-motion-collapse`);
    if (!el.dataset) {
        el.dataset = {};
    }
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
};

export const afterLeave = el => {
    removeClass(el, `${namespace}-motion-collapse`);
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.display = '';
};

const collapseMotion: TransitionProps = {
    name: `${namespace}-treenode-collapse`,
    beforeEnter,
    onEnter,
    afterEnter,
    beforeLeave,
    afterLeave,
    duration: 300,
};

const getTransitionName = (rootPrefixCls: string, motion: string, transitionName?: string) => {
    if (transitionName !== undefined) {
        return transitionName;
    }
    return `${rootPrefixCls}-${motion}`;
};
export { getTransitionName };
export default collapseMotion;
