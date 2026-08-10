import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { isNotEmpty } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { cloneElement, memo, use, useCallback } from 'react';
import { BreadcrumbContext } from './Breadcrumb';
import { BreadcrumbItemProps } from './typings';

const BreadcrumbItem = memo((props: BreadcrumbItemProps) => {
    const { classPrefix = 'breadcrumb', to, onClick } = props;
    const { e, is } = useClassNames(classPrefix);
    const { separator, navigate } = use(BreadcrumbContext);

    /** 点击链接跳转 */
    const onClickLink = useCallback(() => {
        if (isNotEmpty(to)) {
            navigate?.(typeof to === 'string' ? to : (to?.path ?? '*'));
        }
        onClick?.(to);
    }, [navigate, onClick, to]);

    return (
        <div className={classNames(e`item`, props.className)} style={props.style} onClick={onClickLink}>
            <span className={classNames(e`inner`, { [is`link`]: isNotEmpty(to) })}>{props.children}</span>
            {typeof separator === 'string' ? (
                <span className={e`separator`}>{separator}</span>
            ) : (
                cloneElement(separator, { ...separator?.props, className: classNames(separator?.props?.className, e`separator`) })
            )}
        </div>
    );
});

BreadcrumbItem.displayName = 'ElBreadcrumbItem';

export default BreadcrumbItem;
