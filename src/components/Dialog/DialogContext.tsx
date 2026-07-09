import noop from 'lodash/noop';
import { createContext } from 'react';

interface DialogContentProps {
    /** 当设置为 true，Dialog 打开时会显示背景，点击背景会关闭 Dialog，如果不想关闭 Dialog，可以设置为 'static' */
    modal: boolean;
    /** 隐藏时的回调函数 */
    doClose: () => void;
    /** 是否让 Dialog 的 header 和 footer 部分居中排列 */
    center: boolean;
    /** body 内容过长时自动设置高度 */
    overflow: boolean;
    /** 是否加载成功 */
    mounted?: boolean;
}

export const DialogContext = createContext<DialogContentProps>({
    modal: true,
    doClose: noop,
    center: false,
    overflow: false,
    mounted: false,
});
