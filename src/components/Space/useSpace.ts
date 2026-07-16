import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import isArray from 'lodash/isArray';
import isNumber from 'lodash/isNumber';
import React, { useMemo } from 'react';
import { SpaceProps } from './typings';

const SIZE_MAP = {
    small: 8,
    default: 12,
    large: 16,
} as const;

export const useSpace = (
    props: SpaceProps,
): {
    classes: string;
    containerStyle: React.CSSProperties;
    itemStyle: React.CSSProperties;
} => {
    const ns = useClassNames('space');

    const { direction, alignment, justify, wrap, fill, fillRatio, size } = props;

    const [horizontalSize, setHorizontalSize] = React.useState(0);
    const [verticalSize, setVerticalSize] = React.useState(0);

    // Container styles
    const containerStyle = useMemo<React.CSSProperties>(() => {
        const wrapKls: React.CSSProperties = wrap || fill ? { flexWrap: 'wrap' } : {};
        const alignmentKls: React.CSSProperties = {
            alignItems: alignment,
            justifyContent: justify,
        };
        const gap: React.CSSProperties = {
            rowGap: `${verticalSize}px`,
            columnGap: `${horizontalSize}px`,
        };

        return {
            ...wrapKls,
            ...alignmentKls,
            ...gap,
        };
    }, [wrap, fill, alignment, justify, verticalSize, horizontalSize]);

    // Item styles
    const itemStyle = useMemo(() => {
        return fill
            ? {
                  flexGrow: 1,
                  minWidth: `${fillRatio}%`,
              }
            : {};
    }, [fill, fillRatio]);

    // Classes
    const classes = useMemo(() => {
        return classNames(ns.b(), ns.m(props.direction), props.className);
    }, [ns, props.direction, props.className]);

    React.useEffect(() => {
        // when the specified size have been given
        if (isArray(size)) {
            const [h = 0, v = 0] = size;
            setHorizontalSize(h);
            setVerticalSize(v);
        } else {
            let val: number;
            if (isNumber(size)) {
                val = size;
            } else {
                val = SIZE_MAP[size || 'small'] || SIZE_MAP.small;
            }

            if ((wrap || fill) && direction === 'horizontal') {
                setHorizontalSize(val);
                setVerticalSize(val);
            } else {
                if (direction === 'horizontal') {
                    setHorizontalSize(val);
                    setVerticalSize(0);
                } else {
                    setVerticalSize(val);
                    setHorizontalSize(0);
                }
            }
        }
    }, [direction, fill, props, size, wrap]);

    return {
        classes,
        containerStyle,
        itemStyle,
    };
};
