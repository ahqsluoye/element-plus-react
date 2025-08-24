import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import Icon from '../Icon/Icon';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { LinkProps } from './typings';

const Link = forwardRef<any, LinkProps>((props: LinkProps, ref) => {
    const { link = {} } = useConfigProvider();
    props = mergeDefaultProps({ type: link?.type ?? 'default', underline: link?.underline ?? 'hover', target: '_self' }, props);

    const { type, underline, disabled, className, style, classPrefix = 'link', onClick, icon, target, ...rest } = props;
    const { b, m, is } = useClassNames(classPrefix);

    return (
        <a
            ref={ref}
            className={classNames(b(), m(type), is({ underline: underline === 'always', 'hover-underline': underline === 'hover', disabled }), className)}
            style={style}
            target={target}
            onClick={event => {
                if (disabled) {
                    return;
                }
                onClick?.call(this, event);
            }}
            {...rest}
        >
            {icon && <Icon name={icon} />}
            {props.children}
        </a>
    );
});

Link.displayName = 'ElLink';

export default memo(Link);
