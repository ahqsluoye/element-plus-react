import { useMount } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useClassNames } from '../hooks';
import Color from './color';
import draggable from './draggable';
import { getClientXY } from './util';

interface Props {
    color: Color;
    vertical?: boolean;
    onChange: (color: Color) => void;
}

export interface HueSliderRef {
    update: () => void;
}

/**
 * @author	Parker
 * @CreateTime	2022/5/14 16:16:37
 * @LastEditor	Parker
 * @ModifyTime	2022/11/20 11:55:00
 * @Description	Element Plus 颜色选择器组件魔改过来的，源代码见：https://github.com/element-plus/element-plus
 */
const HueSlider = forwardRef<HueSliderRef, Props>((props, ref) => {
    const { color, vertical, onChange } = props;
    const { b, e, is } = useClassNames('color-hue-slider');

    const el = useRef<HTMLDivElement>(null);
    const thumb = useRef<HTMLDivElement>(null);
    const bar = useRef<HTMLDivElement>(null);

    const [thumbLeft, setThumbLeft] = useState(0);
    const [thumbTop, setThumbTop] = useState(0);

    const getThumbLeft = useCallback(() => {
        if (vertical) {
            return 0;
        }
        const hue = color.get('hue');

        if (!el.current) {
            return 0;
        }
        return Math.round((hue * (el.current.offsetWidth - thumb.current.offsetWidth / 2)) / 360);
    }, [color, vertical]);

    const getThumbTop = useCallback(() => {
        if (!vertical) {
            return 0;
        }
        const hue = color.get('hue');

        if (!el) {
            return 0;
        }
        return Math.round((hue * (el.current.offsetHeight - thumb.current.offsetHeight / 2)) / 360);
    }, [color, vertical]);

    const update = useCallback(() => {
        if (color) {
            setThumbLeft(getThumbLeft());
            setThumbTop(getThumbTop());
        }
    }, [color, getThumbLeft, getThumbTop]);

    const handleDrag = useCallback(
        event => {
            const rect = el.current.getBoundingClientRect();
            const { clientX, clientY } = getClientXY(event);
            let hue;

            if (!vertical) {
                let left = clientX - rect.left;
                left = Math.min(left, rect.width - thumb.current.offsetWidth / 2);
                left = Math.max(thumb.current.offsetWidth / 2, left);

                hue = Math.round(((left - thumb.current.offsetWidth / 2) / (rect.width - thumb.current.offsetWidth)) * 360);
            } else {
                let top = clientY - rect.top;

                top = Math.min(top, rect.height - thumb.current.offsetHeight / 2);
                top = Math.max(thumb.current.offsetHeight / 2, top);
                hue = Math.round(((top - thumb.current.offsetHeight / 2) / (rect.height - thumb.current.offsetHeight)) * 360);
            }
            color.set('hue', hue);
            update();
            onChange(color);
        },
        [color, onChange, update, vertical],
    );

    useImperativeHandle(ref, () => ({
        update,
    }));

    useMount(() => {
        const dragConfig = {
            drag: event => {
                handleDrag(event);
            },
            end: event => {
                handleDrag(event);
            },
        };

        draggable(bar.current, dragConfig);
        draggable(thumb.current, dragConfig);
    });

    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const target = event.target;

            if (target !== thumb.current) {
                handleDrag(event);
            }
        },
        [handleDrag],
    );

    return (
        <div className={classNames(b(), is({ vertical }))} ref={el}>
            <div className={e`bar`} ref={bar} onClick={handleClick} />
            <div className={e`thumb`} ref={thumb} style={{ left: thumbLeft, top: thumbTop }} />
        </div>
    );
});

HueSlider.displayName = 'HueSlider';

export default HueSlider;
