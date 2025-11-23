import noop from 'lodash/noop';
import { createContext } from 'react';
import { OptionData, OptionValue, ValueType } from './typings';

export interface SelectContextProps {
    value: ValueType;
    hover: ValueType;
    setHover: (value: ValueType) => void;
    onChoose: (value: OptionValue, data: OptionData, e: any) => void;
    multiple: boolean;
}

export const SelectContext = createContext<SelectContextProps>({
    value: '',
    hover: '',
    setHover: noop,
    onChoose: noop,
    multiple: false,
});
