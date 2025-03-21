import classNames from 'classnames';
import startsWith from 'lodash/startsWith';
import React, { forwardRef, memo } from 'react';
import { useClassNames } from '../hooks';
import { IconProps } from './typings';

const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<any>> = memo(
    forwardRef<any, IconProps>((props, ref) => {
        const { prefix = 'far', name, size, rotate, flip, spin, pulse, className, style, onClick, classPrefix = 'icon', ...other } = props;
        const { b } = useClassNames(classPrefix, 'el');
        const hasFa = startsWith(name, 'fa-');
        return (
            <i
                className={classNames(b(), prefix, hasFa ? name : `fa-${name}`, className, {
                    [`fa-${size}`]: size,
                    [`fa-rotate-${rotate}`]: rotate,
                    [`fa-flip-${flip}`]: flip,
                    'fa-spin': spin,
                    'fa-pulse': pulse,
                })}
                style={style}
                onClick={onClick}
                ref={ref}
                {...other}
            />
        );
    }),
);

Icon.displayName = 'ElIcon';

export default Icon;
