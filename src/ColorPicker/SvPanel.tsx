import { useMount } from 'ahooks';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useClassNames } from '../hooks';
import Color from './color';
import draggable from './draggable';
import { getClientXY } from './util';

interface Props {
    color: Color;
    onChange: (color: Color) => void;
}

export interface SvPanelRef {
    update: () => void;
}

/**
 * @author	Parker
 * @CreateTime	2022/5/14 16:16:37
 * @LastEditor	Parker
 * @ModifyTime	2022/11/20 11:54:52
 * @Description	Element Plus 颜色选择器组件魔改过来的，源代码见：https://github.com/element-plus/element-plus
 */
const SvPanel = forwardRef<SvPanelRef, Props>((props, ref) => {
    const { color, onChange } = props;
    const { b, e } = useClassNames('color-svpanel');

    const [cursorTop, setCursorTop] = useState(0);
    const [cursorLeft, setCursorLeft] = useState(0);
    const [background, setBackground] = useState('hsl(0, 100%, 50%)');

    const el = useRef<HTMLDivElement>(null);

    // methods
    const update = useCallback(() => {
        if (color) {
            const saturation = color.get('saturation');
            const value = color.get('value');

            const { clientWidth: width, clientHeight: height } = el.current;

            setCursorLeft((saturation * width) / 100);
            setCursorTop(((100 - value) * height) / 100);

            setBackground(`hsl(${color.get('hue')}, 100%, 50%)`);
        }
    }, [color]);

    const handleDrag = useCallback(
        event => {
            const rect = el.current?.getBoundingClientRect();
            const { clientX, clientY } = getClientXY(event);

            let left = clientX - rect.left;
            let top = clientY - rect.top;
            left = Math.max(0, left);
            left = Math.min(left, rect.width);

            top = Math.max(0, top);
            top = Math.min(top, rect.height);

            setCursorLeft(left);
            setCursorTop(top);
            color.set({
                saturation: (left / rect.width) * 100,
                value: 100 - (top / rect.height) * 100,
            });
            onChange(color);
        },
        [color, onChange],
    );

    useImperativeHandle(ref, () => ({
        update,
    }));

    useMount(() => {
        draggable(el.current, {
            drag: event => {
                handleDrag(event);
            },
            end: event => {
                handleDrag(event);
            },
        });
    });

    return (
        <div className={b()} style={{ backgroundColor: background }} ref={el}>
            <div className={e`white`} />
            <div className={e`black`} />
            <div className={e`cursor`} style={{ top: cursorTop, left: cursorLeft }}>
                <div />
            </div>
        </div>
    );
});

SvPanel.displayName = 'SvPanel';

export default SvPanel;
