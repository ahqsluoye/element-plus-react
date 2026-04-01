import { createContext } from 'react';
import { TypeAttributes } from '../types/common';

interface Props {
    size?: TypeAttributes.Size;
}

export const FormItemContext = createContext<Props>({
    size: null,
});
