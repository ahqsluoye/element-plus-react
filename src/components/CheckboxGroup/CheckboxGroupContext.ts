import type { ValueType } from '@qsxy/element-plus-react/Checkbox/typings';
import { TypeAttributes } from '@qsxy/element-plus-react/types/common';
import { createContext } from 'react';

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
