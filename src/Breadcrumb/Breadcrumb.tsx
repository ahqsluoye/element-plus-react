import classNames from 'classnames';
import React, { createContext, FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { useClassNames } from '../hooks';
import { BreadcrumbContextProps, BreadcrumbProps } from './typings';

const Breadcrumb: FC<BreadcrumbProps> = memo(props => {
    const { classPrefix = 'breadcrumb', separator = '/' } = props;
    const { b } = useClassNames(classPrefix);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    return (
        <BreadcrumbContext.Provider value={{ separator }}>
            <div
                className={classNames(b(), props.className)}
                aria-label={t('el.breadcrumb.label', {
                    lng: locale,
                })}
                style={props.style}
            >
                {props.children}
            </div>
        </BreadcrumbContext.Provider>
    );
});

Breadcrumb.displayName = 'ElBreadcrumb';

export default Breadcrumb;

export const BreadcrumbContext = createContext<BreadcrumbContextProps>({
    separator: '/',
});
