import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import React, { createContext, FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BreadcrumbContextProps, BreadcrumbProps } from './typings';

const Breadcrumb: FC<BreadcrumbProps> = memo(props => {
    const { classPrefix = 'breadcrumb', separator = '/', navigate } = props;
    const { b } = useClassNames(classPrefix);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    return (
        <BreadcrumbContext value={{ separator, navigate }}>
            <div
                className={classNames(b(), props.className)}
                aria-label={t('el.breadcrumb.label', {
                    lng: locale,
                })}
                style={props.style}
            >
                {props.children}
            </div>
        </BreadcrumbContext>
    );
});

Breadcrumb.displayName = 'ElBreadcrumb';

export default Breadcrumb;

export const BreadcrumbContext = createContext<BreadcrumbContextProps>({
    separator: '/',
    navigate: undefined,
});
