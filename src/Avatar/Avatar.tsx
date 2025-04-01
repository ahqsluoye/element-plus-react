/* eslint-disable indent */
import classNames from 'classnames';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import ElIcon from '../Icon/Icon';
import { addUnit, isNotEmpty, isNumber, isString } from '../Util/base';
import { useClassNames } from '../hooks';
import { AvatarProps } from './typings';

const Avatar: FC<AvatarProps> = memo((props: AvatarProps) => {
    const { icon, size = 'default', shape = 'circle', src, srcSet, alt, fit = 'cover', classPrefix = 'avatar', onError } = props;
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

    const children = useMemo(() => (icon ? <ElIcon name={icon}></ElIcon> : props.children), [icon, props.children]);

    return (
        <span className={avatarClass} style={{ ...sizeStyle, ...props.style }}>
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
});

Avatar.displayName = 'ElAvatar';

export default Avatar;
