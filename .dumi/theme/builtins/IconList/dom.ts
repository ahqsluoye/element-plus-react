import { includes } from 'lodash';
import { R_FAB_ICONS } from './config.icons';

export const closest = function (
    el: HTMLElement & {
        mozMatchesSelector?: any;
        msMatchesSelector?: any;
    },
    selector,
) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            break;
        }
        el = el.parentElement;
    }
    return el;
};

/**
 * 获取滚动条宽度的方法
 */
export const getScrollBarWidth = elem => {
    let width = 0;
    if (elem) {
        width = elem.offsetWidth - elem.clientWidth;
    } else {
        elem = document.createElement('div');
        elem.style.width = '100px';
        elem.style.height = '100px';
        elem.style.overflowY = 'scroll';

        document.body.appendChild(elem);
        width = elem.offsetWidth - elem.clientWidth;
        document.body.removeChild(elem);
    }
    return width;
};

export function getIconPrefix(name) {
    return includes(R_FAB_ICONS, name) ? 'fab' : 'far';
}

export function isFabIcon(name) {
    return includes(R_FAB_ICONS, name);
}

// 元素相对于body的offsetTop
export function getOffsetTopByBody(el) {
    let offsetTop = 0;
    while (el && el.tagName !== 'BODY') {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
    }
    return offsetTop;
}
