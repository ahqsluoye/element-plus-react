import noop from 'lodash/noop';
import React, { createContext } from 'react';

export interface TooltipContextProps {
    onMouseEnter?: (e?: React.MouseEvent<any>) => void;

    onMouseLeave?: (e?: React.MouseEvent<any>) => void;

    /** 触发下拉的行为 */
    trigger: 'hover' | 'click' | 'contextmenu';

    onClose: () => void;
}

export const TooltipContext = createContext<TooltipContextProps>({
    onMouseEnter: noop,
    onMouseLeave: noop,
    trigger: 'hover',
    onClose: noop,
});
