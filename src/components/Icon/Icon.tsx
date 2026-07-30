import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { addUnit } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import startsWith from 'lodash/startsWith';
import React, { forwardRef, memo, useMemo } from 'react';
import { IconProps } from './typings';

const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<any>> = memo(
    forwardRef<any, IconProps>((props, ref) => {
        const { prefix = 'far', name, size, rotate, flip, spin, pulse, className, style, onClick, classPrefix = 'icon', ...other } = props;
        const { b } = useClassNames(classPrefix, 'el');
        const hasFa = startsWith(name, 'fa-');
        const defaultSize = useMemo(() => typeof size === 'string' && ['xs', 'small', 'large', '1x', '2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x', '10x'].includes(size), [size]);
        return (
            <i
                className={classNames(b(), prefix, hasFa ? name : `fa-${name}`, className, {
                    [`fa-${size}`]: defaultSize ? size : undefined,
                    [`fa-rotate-${rotate}`]: rotate,
                    [`fa-flip-${flip}`]: flip,
                    'fa-spin': spin,
                    'fa-pulse': pulse,
                })}
                style={!defaultSize ? { ...style, fontSize: addUnit(size) } : style}
                onClick={onClick}
                ref={ref}
                {...other}
            />
        );
    }),
);

Icon.displayName = 'ElIcon';

export default Icon;
