import classNames from 'classnames';
import isObject from 'lodash/isObject';
import React, { FC, memo, useContext, useMemo } from 'react';
import { RowContext } from '../Row';
import { floatDivide } from '../Util';
import { useClassNames } from '../hooks';
import { ColProps, MediaLayout, MediaSize } from './typings';

const Col: FC<ColProps> = memo(props => {
    const { tag = 'div', span = 24, offset = 0, push = 0, pull = 0, classPrefix = 'col' } = props;
    const { wb, b, is } = useClassNames(classPrefix);

    const { gutter = 0 } = useContext(RowContext);

    const mediaClassName = useMemo(() => {
        const result: string[] = [];
        const keys: (keyof MediaSize)[] = ['xs', 'sm', 'md', 'lg', 'xl'];
        keys.forEach(size => {
            if (size in props) {
                if (typeof props[size] === 'number') {
                    result.push(b(`${size}-${props[size]}`));
                } else if (isObject(props[size])) {
                    for (const key in props[size] as MediaLayout) {
                        if (Object.prototype.hasOwnProperty.call(props[size], key)) {
                            // @ts-ignore
                            const value: number = props[size][key];
                            result.push(b(`${size}-${key}-${value}`));
                        }
                    }
                }
            }
        });
        return result;
    }, [b, props]);

    return React.createElement(
        tag,
        {
            className: classNames(
                wb(span),
                { [b(`offset-${offset}`)]: !!offset, [b(`push-${push}`)]: !!push, [b(`pull-${pull}`)]: !!pull },
                is({ gutter }),
                mediaClassName,
                props.className,
            ),
            style: {
                ...(gutter > 0 ? { paddingLeft: floatDivide(gutter, 2), paddingRight: floatDivide(gutter, 2) } : {}),
                ...props.style,
            },
        },
        props.children,
    );
});

export default Col;
