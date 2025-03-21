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

/**
 * @author	Parker
 * @CreateTime	2022/5/14 19:24:19
 * @LastEditor	Parker
 * @ModifyTime	2025/2/22 19:59:12
 * @Description	Element Plus 颜色选择器组件魔改过来的，源代码见：https://github.com/element-plus/element-plus
 */
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
