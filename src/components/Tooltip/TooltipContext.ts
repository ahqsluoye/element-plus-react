import noop from 'lodash/noop';
import React, { createContext } from 'react';

export interface TooltipContextProps {
    onMouseEnter?: (e?: React.MouseEvent<any>) => void;

    onMouseLeave?: (e?: React.MouseEvent<any>) => void;

    /** 触发下拉的行为 */
    trigger: 'hover' | 'click' | 'contextmenu';

    onClose: () => void;

    /** 当嵌套子 Tooltip 的 Popper 内容被鼠标进入/离开时，
     *  用于向父级 Tooltip 传播 entering 状态，
     *  防止父级 Tooltip 因 mouseLeave 而误隐藏 */
    onPopperEntering?: (entering: boolean) => void;
}

export const TooltipContext = createContext<TooltipContextProps>({
    onMouseEnter: noop,
    onMouseLeave: noop,
    trigger: 'hover',
    onClose: noop,
    onPopperEntering: noop,
});
