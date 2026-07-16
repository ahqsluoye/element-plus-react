import { ValueType } from '@qsxy/element-plus-react/Radio/typings';
import { BaseProps, FormControlBaseProps, NativeProps, TypeAttributes } from '@qsxy/element-plus-react/types/common';
import React from 'react';

export interface RadioContextProps {
    name?: string;
    value?: ValueType;
    controlled?: boolean;
    disabled?: boolean;
    /** 尺寸 */
    size?: TypeAttributes.Size;
    readOnly?: boolean;
    plaintext?: boolean;
    onChange?: (value: ValueType, event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface RadioGroupProps extends FormControlBaseProps, BaseProps, NativeProps {
    appearance?: 'default' | 'picker';
    name?: string;
    /** 选项的数据源， value 的 key 和 label 和  disabled可以通过 props自定义. */
    options?: Array<{ [key: string]: any }>;
    /** options 的配置 */
    props?: { value?: string; label?: string; disabled?: string };
}
