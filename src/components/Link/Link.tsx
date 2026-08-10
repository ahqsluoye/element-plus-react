import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { memo } from 'react';
import { LinkProps } from './typings';

const Link = ({ ref, ...props }: LinkProps & { ref?: React.Ref<any> }) => {
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
            {icon && <ElIcon name={icon} />}
            {props.children}
        </a>
    );
};

Link.displayName = 'ElLink';

export default memo(Link);
