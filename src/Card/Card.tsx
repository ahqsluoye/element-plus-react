import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useClassNames } from '../hooks';
import { CardProps } from './typings';

const Card = memo(
    forwardRef<HTMLDivElement, CardProps>((props, ref) => {
        const { header, footer, bodyStyle, shadow = 'always', classPrefix = 'card' } = props;
        const { b, e, is } = useClassNames(classPrefix);
        return (
            <div ref={ref} className={classNames(b(), is({ [`${shadow}-shadow`]: ['always', 'hover'].includes(shadow) }), props.className)} style={props.style}>
                {header && <div className={e`header`}>{header}</div>}

                <div className={e`body`} style={bodyStyle}>
                    {props.children}
                </div>

                {footer && <div className={e`footer`}>{footer}</div>}
            </div>
        );
    }),
);

Card.displayName = 'ElCard';

export default Card;
