import noop from 'lodash/noop';
import { createContext } from 'react';

interface DrawerContentProps {
    /** 隐藏时的回调函数 */
    doClose: () => void;
}

export const DrawerContext = createContext<DrawerContentProps>({
    doClose: noop,
});
