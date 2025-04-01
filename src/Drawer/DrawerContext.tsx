import noop from 'lodash/noop';
import { createContext } from 'react';

interface DrawerContentProps {
    /** 当设置为 true，Drawer 打开时会显示背景，点击背景会关闭 Drawer，如果不想关闭 Drawer，可以设置为 'static' */
    backdrop: boolean | 'static';
    setVisible: (visible: boolean) => void;

    /** 隐藏时的回调函数 */
    onClose: () => void;

    /** 是否可控 */
    isControlled: boolean;
}

/**
 * @author	Parker
 * @CreateTime	2022/3/20下午3:10:40
 * @LastEditor	Parker
 * @ModifyTime	2022/5/3 22:55:13
 * @Description 模态框上下文
 */
export const DrawerContext = createContext<DrawerContentProps>({
    backdrop: true,
    setVisible: noop,
    onClose: noop,
    isControlled: false,
});
