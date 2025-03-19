import { DatePickerProps } from '../DatePicker';
import { InputRef } from '../Input';
import { PopperOptionRef } from '../Popper';

export type DateTimePickerRef = {
    inputInstance?: InputRef;
    popperInstRef: PopperOptionRef;

    /** 是否追加到body下 */
    appendToBody?: boolean;
    getValue: () => string;
    setValue: (value: string) => void;
    // onClear: (event?: any) => void;
    setVisible: (value: boolean) => void;
};

export type DateTimePickerProps = Omit<DatePickerProps, 'type' | 'value' | 'defaultValue' | 'onChange' | 'name'> & {
    name?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onClear?: (event?: any) => void;
};
