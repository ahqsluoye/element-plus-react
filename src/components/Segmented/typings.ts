import { ReactElement } from 'react';
import { BaseProps, FormControlBaseProps, NativeProps } from '../types/common';

export type Option = Record<string, any> | string | number | boolean;

export interface SegmentedProps {
    label?: string;
    value?: string;
    disabled?: string;
}

export const defaultProps: Required<SegmentedProps> = {
    label: 'label',
    value: 'value',
    disabled: 'disabled',
};

export interface SegmentedComponentProps<T extends Option = Option>
    extends BaseProps<ReactElement | ReactElement[] | ((data: T) => ReactElement | ReactElement[])>,
        NativeProps,
        FormControlBaseProps<string | number | boolean> {
    direction?: 'vertical' | 'horizontal';
    options?: T[];
    props?: SegmentedProps;
    block?: boolean;
    validateEvent?: boolean;
    id?: string;
    name?: string;
    ariaLabel?: string;
    onChange?: (val: string | number | boolean) => void;
}
