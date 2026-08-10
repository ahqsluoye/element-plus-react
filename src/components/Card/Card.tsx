import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { memo } from 'react';
import { CardProps } from './typings';

const Card = memo(({ ref, ...props }: CardProps & { ref?: React.Ref<HTMLDivElement | null> }) => {
    const { card = {} } = useConfigProvider();
    props = mergeDefaultProps({ shadow: card?.shadow ?? 'always' }, props);

    const { header, footer, bodyClass, bodyStyle, shadow, classPrefix = 'card', className, style, ...rest } = props;

    const { b, e, is } = useClassNames(classPrefix);
    return (
        <div ref={ref} className={classNames(b(), is({ [`${shadow}-shadow`]: ['always', 'hover'].includes(shadow) }), className)} style={style} {...rest}>
            {header && <div className={e`header`}>{header}</div>}

            <div className={classNames(e`body`, bodyClass)} style={bodyStyle}>
                {props.children}
            </div>

            {footer && <div className={e`footer`}>{footer}</div>}
        </div>
    );
});

Card.displayName = 'ElCard';

export default Card;
