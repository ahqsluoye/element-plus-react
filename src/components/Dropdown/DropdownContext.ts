import noop from 'lodash/noop';
import { createContext } from 'react';
import { DropdownProps } from './typings';

interface DropdownContextProps {
    /** 是否在点击菜单项后隐藏菜单 */
    hideOnClick: boolean;
    /** 点击菜单项触发的事件回调 */
    onCommand: (command: string | number | object) => void;
    /** 菜单最大高度 */
    maxHeight?: number | string;
    /** 菜菜单尺寸，在 split-button 为 true 的情况下也对触发按钮生效。 */
    size?: DropdownProps['size'];
}

export const DropdownContext = createContext<DropdownContextProps>({
    hideOnClick: true,
    // onMouseEnter: noop,
    // onMouseLeave: noop,
    onCommand: noop,
});
