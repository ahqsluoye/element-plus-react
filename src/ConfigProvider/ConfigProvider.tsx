import React from 'react';
import { mergeDefaultProps } from '../Util';
import ConfigProviderContext from './ConfigProviderContext';
import { ConfigProviderProps } from './typings';

const ConfigProvider = (props: ConfigProviderProps) => {
    props = mergeDefaultProps(
        {
            locale: 'zh-CN',
            size: 'default',
            button: {
                autoInsertSpace: true,
            },
        },
        props,
    );
    const { children, ...values } = props;

    return <ConfigProviderContext.Provider value={values}>{children}</ConfigProviderContext.Provider>;
};

export default ConfigProvider;

ConfigProvider.displayName = 'ElConfigProvider';
