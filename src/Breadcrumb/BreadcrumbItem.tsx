import classNames from 'classnames';
import React, { cloneElement, FC, memo, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClassNames } from '../hooks';
import { isNotEmpty } from '../Util';
import { BreadcrumbContext } from './Breadcrumb';
import { BreadcrumbItemProps } from './typings';

const BreadcrumbItem: FC<BreadcrumbItemProps> = memo(props => {
    const { classPrefix = 'breadcrumb', to, onClick } = props;
    const { e, is } = useClassNames(classPrefix);
    const { separator } = useContext(BreadcrumbContext);
    const navigate = useNavigate();

    /** 点击链接跳转 */
    const onClickLink = useCallback(() => {
        if (isNotEmpty(to)) {
            navigate(typeof to === 'string' ? to : to?.path ?? '*');
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
