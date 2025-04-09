/* eslint-disable indent */
import classNames from 'classnames';
import React, { forwardRef, memo, useEffect, useMemo, useState } from 'react';
import Icon from '../Icon/Icon';
import { addUnit, isNotEmpty, isNumber, isString } from '../Util/base';
import { partitionHTMLProps, useClassNames } from '../hooks';
import { AvatarProps } from './typings';

const Avatar = memo(
    forwardRef<HTMLSpanElement, AvatarProps>((props, ref) => {
        const { icon, size = 'default', shape = 'circle', src, srcSet, alt, fit = 'cover', classPrefix = 'avatar', onError } = props;
        const [tooltipEvents] = partitionHTMLProps(props, { htmlProps: ['onMouseEnter', 'onMouseLeave', 'onClick', 'onContextMenu'] });
        const { b, m, cssVarBlock } = useClassNames(classPrefix);

        const [hasLoadError, setHasLoadError] = useState(false);

        const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            setHasLoadError(true);
            onError?.(e);
        };

        useEffect(() => {
            if (isNotEmpty(src)) {
                setHasLoadError(false);
            }
        }, [src]);

        const avatarClass = useMemo(() => {
            const classList = [b()];
            if (isString(size)) {
                classList.push(m(size));
            }
            if (icon) {
                classList.push(m('icon'));
            }
            if (shape) {
                classList.push(m(shape));
            }
            return classNames(classList, props.className);
        }, [b, icon, m, props.className, shape, size]);

        const sizeStyle = useMemo(() => {
            return isNumber(size)
                ? (cssVarBlock({
                      size: addUnit(size) || '',
                  }) as React.CSSProperties)
                : {};
        }, [cssVarBlock, size]);

        const children = useMemo(() => (icon ? <Icon name={icon} /> : props.children), [icon, props.children]);

        return (
            <span ref={ref} className={avatarClass} style={{ ...sizeStyle, ...props.style }} {...tooltipEvents}>
                {(src || srcSet) && !hasLoadError ? (
                    <img
                        src={src}
                        alt={alt}
                        srcSet={srcSet}
                        style={{
                            objectFit: fit,
                        }}
                        onError={handleError}
                    />
                ) : (
                    children
                )}
            </span>
        );
    }),
);

Avatar.displayName = 'ElAvatar';

export default Avatar;
