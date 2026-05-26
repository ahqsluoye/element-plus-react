import { createContext } from 'react';
import { SliderContextValue } from './typings';

export const SliderContext = createContext<SliderContextValue | null>(null);
