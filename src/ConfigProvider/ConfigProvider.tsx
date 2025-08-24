import React, { useEffect } from 'react';
import { isEmpty, mergeDefaultProps } from '../Util';
import ConfigProviderContext from './ConfigProviderContext';
import { ConfigProviderProps } from './typings';

const ConfigProvider = (props: ConfigProviderProps) => {
    props = mergeDefaultProps(
        {
            locale: 'en',
            size: 'default',
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

    useEffect(() => {
        // const configs = localStorage.getItem('__el__config__provider__');
        // let msgConfig = null;
        // if (isEmpty(configs) || JSON.parse(configs).length === 0) {
        //     msgConfig = [props.message];
        //     localStorage.setItem('__el__config__provider__', JSON.stringify([props.message]));
        // } else {
        //     msgConfig = [...JSON.parse(configs), props.message];
        //     localStorage.setItem('__el__config__provider__', JSON.stringify(msgConfig));
        // }

        const msgConfig = localStorage.getItem('__el__message__config__provider__');
        if (isEmpty(msgConfig) || Object.keys(JSON.parse(msgConfig)).length === 0) {
            localStorage.setItem('__el__message__config__provider__', JSON.stringify(props.message));
        } else {
            localStorage.setItem('__el__message__config__provider__', JSON.stringify(mergeDefaultProps(JSON.parse(msgConfig), props.message)));
        }

        // return () => {
        //     localStorage.removeItem('__el__message_config__provider');
        // };
    });

    return <ConfigProviderContext.Provider value={{ ...values, locale: locale === 'zh-cn' ? 'zh-CN' : locale }}>{children}</ConfigProviderContext.Provider>;
};

export default ConfigProvider;

ConfigProvider.displayName = 'ElConfigProvider';
