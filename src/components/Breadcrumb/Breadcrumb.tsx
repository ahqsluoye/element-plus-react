import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import classNames from 'classnames';
import React, { createContext, FC, memo } from 'react';
import { BreadcrumbContextProps, BreadcrumbProps } from './typings';

const Breadcrumb: FC<BreadcrumbProps> = memo(props => {
    const { classPrefix = 'breadcrumb', separator = '/', navigate } = props;
    const { b } = useClassNames(classPrefix);

    const { t } = useLocale();

    return (
        <BreadcrumbContext value={{ separator, navigate }}>
            <div className={classNames(b(), props.className)} aria-label={t('el.breadcrumb.label')} style={props.style}>
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
