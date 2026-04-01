import { createContext } from 'react';
import { ButtonGroupProps } from './typings';

type ButtonGroupContextProps = Pick<ButtonGroupProps, 'disabled' | 'size' | 'type' | 'bgColor' | 'borderColor'>;

export const ButtonGroupContext = createContext<ButtonGroupContextProps>({});
