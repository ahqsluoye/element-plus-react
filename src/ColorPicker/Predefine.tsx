/* eslint-disable indent */
import classNames from 'classnames';
import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { useClassNames } from '../hooks';
import Color from './color';
import { parseColors } from './util';

interface Props {
    color: Color;
    colors: string[];
    onChange: (color: Color) => void;
}

export interface PredefineRef {
    update: () => void;
}

const Predefine = forwardRef<PredefineRef, Props>((props, ref) => {
    const { color, colors, onChange } = props;
    const { b, e } = useClassNames('color-predefine');

    const [rgbaColors, setRgbColors] = useState(() => parseColors(colors, color));

    const handleSelect = useCallback(
        index => {
            color.fromString(colors[index]);
            onChange(color);
        },
        [color, colors, onChange],
    );

    const update = useCallback(() => {
        if (color) {
            setRgbColors(parseColors(colors, color));
        }
    }, [color, colors]);

    useImperativeHandle(ref, () => ({
        update,
    }));

    return (
        <div className={b()}>
            <div className={e`colors`}>
                {rgbaColors.map((item, index) => {
                    return (
                        <div
                            key={item.value}
                            className={classNames(e`color-selector`, { selected: item.selected, 'is-alpha': item._alpha < 100 })}
                            onClick={() => handleSelect(index)}
                        >
                            <div style={{ backgroundColor: item.value }} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

Predefine.displayName = 'Predefine';

export default Predefine;
