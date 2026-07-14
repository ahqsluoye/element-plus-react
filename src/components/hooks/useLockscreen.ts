import { getStyle, hasClass } from 'dom-lib';
import addClass from 'dom-lib/esm/addClass';
import removeClass from 'dom-lib/esm/removeClass';
import { useEffect } from 'react';
import { getScrollBarWidth } from '../Util/scroll';
import { namespace } from './prefix';
import useClassNames, { UseNamespaceReturn } from './useClassNames';

export type UseLockScreenOptions = {
    ns?: UseNamespaceReturn;
    shouldLock: boolean;
};
let countRef = 0;

let scrollBarWidth = 0;
let withoutHiddenClass = false;
let bodyPaddingRight = '0';
let computedBodyPaddingRight = 0;

export const useLockScreen = (trigger: boolean, options: UseLockScreenOptions = { shouldLock: true }) => {
    const popupNs = useClassNames('popup');
    const ns = options.ns || popupNs;
    const hiddenCls = ns.bm('parent', 'hidden');

    const lockScroll = () => {
        if (!options.shouldLock) {
            return;
        }
        withoutHiddenClass = !hasClass(document.body, 'el-popup-parent--hidden');
        if (withoutHiddenClass) {
            bodyPaddingRight = document.body.style.paddingRight;
            computedBodyPaddingRight = Number.parseInt(getStyle(document.body, 'paddingRight') as string, 10);
        }
        scrollBarWidth = getScrollBarWidth(namespace);
        const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
        const bodyOverflowY = getStyle(document.body, 'overflowY');
        if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === 'scroll') && withoutHiddenClass) {
            document.body.style.paddingRight = `${computedBodyPaddingRight + scrollBarWidth}px`;
        }
        addClass(document.body, hiddenCls);
    };

    const unlockScroll = () => {
        setTimeout(() => {
            if (!options.shouldLock) {
                return;
            }
            removeClass(document.body, hiddenCls);
            document.body.style.paddingRight = bodyPaddingRight;
        }, 200);
    };

    useEffect(() => {
        if (trigger) {
            countRef = countRef + 1;
            lockScroll();
        } else {
            if (countRef > 0) {
                countRef = countRef - 1;
            }
            if (countRef === 0) {
                unlockScroll();
            }
        }
    }, [trigger]);
};
