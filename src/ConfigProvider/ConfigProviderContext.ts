import { createContext, useContext } from 'react';
import { ConfigProviderProps } from './typings';

const ConfigProviderContext = createContext<ConfigProviderProps>({
    // message: { max: Infinity },
    inputNumber: {
        controlsPositionRight: false,
    },
    locale: 'en',
    popper: {},
});

export const useConfigProvider = () => useContext(ConfigProviderContext);

export default ConfigProviderContext;
