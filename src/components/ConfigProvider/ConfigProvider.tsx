import React from 'react';
import { mergeDefaultProps } from '../Util';
import ConfigProviderContext from './ConfigProviderContext';
import { ConfigProviderProps } from './typings';

const ConfigProvider = (props: ConfigProviderProps) => {
    props = mergeDefaultProps(
        {
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
        },
        props,
    );
    const { children, locale, ...values } = props;

    return <ConfigProviderContext.Provider value={{ ...values, locale: locale === 'zh-cn' ? 'zh-CN' : locale }}>{children}</ConfigProviderContext.Provider>;
};

export default ConfigProvider;

ConfigProvider.displayName = 'ElConfigProvider';
