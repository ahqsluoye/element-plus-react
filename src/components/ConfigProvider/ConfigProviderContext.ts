import '@qsxy/element-plus-react/locale/i18n';
import { createContext, useContext } from 'react';
import { ConfigProviderContextProps } from './typings';

const ConfigProviderContext = createContext<ConfigProviderContextProps>({
    // message: { max: Infinity },
    inputNumber: {
        controlsPosition: '',
    },
    popper: {},

    textarea: {
        autosize: true,
    },
    locale: 'en',
    size: 'default',
    clearable: false,
    button: {
        autoInsertSpace: false,
        type: undefined,
        plain: false,
        round: false,
    },
    link: {
        type: 'default',
        underline: 'hover',
    },
    card: {
        shadow: undefined,
    },
    message: {
        showClose: undefined,
        duration: undefined,
        grouping: undefined,
        offset: undefined,
    },
});

export const useConfigProvider = () => useContext(ConfigProviderContext);

export default ConfigProviderContext;
