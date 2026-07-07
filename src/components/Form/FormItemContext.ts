import { createContext } from 'react';
import { TypeAttributes } from '../types/common';
import { FormItemValidateState } from './FormItem';

interface Props {
    size?: TypeAttributes.Size;
    hasLabel?: boolean;
    labelPosition?: 'left' | 'right' | 'top';
    /** formitem 校验的状态 */
    validateState?: FormItemValidateState;
}

export const FormItemContext = createContext<Props>({
    size: null,
    hasLabel: false,
    labelPosition: 'right',
    validateState: null,
});
