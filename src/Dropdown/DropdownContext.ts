import noop from 'lodash/noop';
import { createContext } from 'react';

interface DropdownContextProps {
    /** 是否在点击菜单项后隐藏菜单 */
    hideOnClick: boolean;

    // onMouseEnter: (e: Event) => void;
    // onMouseLeave: (e: Event) => void;

    /** 点击菜单项触发的事件回调 */
    onClick: (command: string | number | object) => void;
}

export const DropdownContext = createContext<DropdownContextProps>({
    hideOnClick: true,
    // onMouseEnter: noop,
    // onMouseLeave: noop,
    onClick: noop,
});
