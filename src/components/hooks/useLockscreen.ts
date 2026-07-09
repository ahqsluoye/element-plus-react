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

export const useLockscreen = (trigger: boolean, options: UseLockScreenOptions = { shouldLock: true }) => {
    const popupNs = useClassNames('popup');
    const ns = options.ns || popupNs;
    const hiddenCls = ns.bm('parent', 'hidden');

    const lockScroll = () => {
        setTimeout(() => {
            if (!options.shouldLock) {
                return;
            }
            addClass(document.body, hiddenCls);
            const scrollWidth = getScrollBarWidth(namespace);
            document.body.style.width = `calc(100% - ${scrollWidth}px)`;
        }, 200);
    };

    const unlockScroll = () => {
        setTimeout(() => {
            if (!options.shouldLock) {
                return;
            }
            removeClass(document.body, hiddenCls);
            document.body.style.width = '';
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
