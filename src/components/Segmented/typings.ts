import { BaseProps, FormControlBaseProps, NativeProps } from '@qsxy/element-plus-react/types/common';
import { ReactElement } from 'react';

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

export type SegmentedRef = {
    updateSelect: () => void;
};

export interface SegmentedComponentProps<T extends Option = Option>
    extends
        BaseProps<ReactElement | ReactElement[] | ((data: T) => ReactElement | ReactElement[])>,
        NativeProps<
            | '--el-segmented-color'
            | '--el-segmented-bg-color'
            | '--el-segmented-padding'
            | '--el-segmented-item-selected-color'
            | '--el-segmented-item-selected-bg-color'
            | '--el-segmented-item-selected-disabled-bg-color'
            | '--el-segmented-item-hover-color'
            | '--el-segmented-item-hover-bg-color'
            | '--el-segmented-item-active-bg-color'
            | '--el-segmented-item-disabled-color'
        >,
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
