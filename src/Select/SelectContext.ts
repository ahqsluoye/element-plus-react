import noop from 'lodash/noop';
import { createContext } from 'react';
import { ValueType } from './typings';

interface SelectContextProps {
    value: ValueType;
    hover: ValueType;
    setHover: (value: ValueType) => void;
    onChoose: (value: string | number, label: string, e: any) => void;
    multiple: boolean;
}

export const SelectContext = createContext<SelectContextProps>({
    value: '',
    hover: '',
    setHover: noop,
    onChoose: noop,
    multiple: false,
});
