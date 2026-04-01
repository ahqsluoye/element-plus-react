import { createContext } from 'react';
import type { ValueType } from '../Checkbox/index';
import { TypeAttributes } from '../types/common';

export interface CheckboxGroupContextValue {
    inline?: boolean;
    name?: string;
    value?: ValueType[] | boolean;
    controlled?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    plaintext?: boolean;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    onChange?: (value: any, checked: boolean, event) => void;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue>({});
