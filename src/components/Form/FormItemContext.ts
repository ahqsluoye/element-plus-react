import { createContext } from 'react';
import { TypeAttributes } from '../types/common';

interface Props {
    size?: TypeAttributes.Size;
    hasLabel?: boolean;
    labelPosition?: 'left' | 'right' | 'top';
}

export const FormItemContext = createContext<Props>({
    size: null,
    hasLabel: false,
    labelPosition: 'right',
});
