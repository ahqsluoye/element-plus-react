import { DatePickerProps } from '@qsxy/element-plus-react/DatePicker/typings';
import { InputRef } from '@qsxy/element-plus-react/Input/typings';
import { RefObject } from 'react';

export type DateTimePickerRef = {
    input?: RefObject<InputRef>;
    focus: () => void;
    blur: () => void;
    handleOpen: () => void;
    handleClose: () => void;
};

export type DateTimePickerProps = Omit<DatePickerProps, 'type' | 'name'> & {
    name?: string;
    onClear?: (event?: any) => void;
    /** 选择日期后的默认时间值。 如未指定则默认时间值为 `00:00:00` */
    defaultTime?: Date;
};
