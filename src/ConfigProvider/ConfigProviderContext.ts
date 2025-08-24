import { createContext, useContext } from 'react';
import { ConfigProviderContextProps } from './typings';

const ConfigProviderContext = createContext<ConfigProviderContextProps>({
    // message: { max: Infinity },
    inputNumber: {
        controlsPositionRight: false,
    },
    locale: 'en',
    popper: {},
});

export const useConfigProvider = () => useContext(ConfigProviderContext);

export default ConfigProviderContext;
