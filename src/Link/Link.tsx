import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { Icon } from '../Icon';
import { useClassNames } from '../hooks';
import { LinkProps } from './typings';

const Link = forwardRef<any, LinkProps>((props: LinkProps, ref) => {
    const { type, underline, disabled, className, style, classPrefix = 'link', onClick, icon, ...rest } = props;
    const { b, m, is } = useClassNames(classPrefix);

    return (
        <a
            ref={ref}
            className={classNames(b(), m(type), is({ underline, disabled }), className)}
            style={style}
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

Link.displayName = 'Link';
Link.defaultProps = {
    type: 'default',
};

export default memo(Link);
