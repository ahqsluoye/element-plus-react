import { createContext, MutableRefObject } from 'react';
import { TypeAttributes } from '../types/common';
import { FormItemValidateState } from './typings';

interface Props {
    size?: TypeAttributes.Size;
    hasLabel?: boolean;
    labelPosition?: 'left' | 'right' | 'top';
    /** formitem 校验的状态 */
    validateState?: FormItemValidateState;
    /** formitem 校验的状态 */
    computedWidth?: number;
    setComputedWidth?: (width: number) => void;
    oldWidthRef: MutableRefObject<number>;
}

export const FormItemContext = createContext<Props>({
    size: null,
    hasLabel: false,
    labelPosition: 'right',
    validateState: null,
    computedWidth: 0,
    setComputedWidth: undefined,
    oldWidthRef: { current: 0 },
});
