import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { Icon } from '../Icon';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { globalKey } from '../hooks/prefix';
import { PropgressProps } from './typings';

const Progress: FC<PropgressProps> = (props: PropgressProps) => {
    props = mergeDefaultProps(
        {
            type: 'line',
            strokeWidth: 6,
            duration: 3,
            width: 126,
            showText: true,
            strokeLinecap: 'round',
        },
        props,
    );
    const { classPrefix = 'progress', percentage, type, strokeWidth, textInside, status, indeterminate, duration, color, width, showText, strokeLinecap, format } = props;
    const { b, m, e, be, bem, is } = useClassNames(classPrefix);

    const backgroundColor = useMemo(() => {
        if (typeof color === 'function') {
            return color(percentage);
        } else if (typeof color === 'string') {
            return color;
        } else if (color instanceof Array) {
            const span = 100 / color.length;
            const seriesColors = color.map((seriesColor, index) => {
                if (typeof seriesColor === 'string') {
                    return {
                        color: seriesColor,
                        percentage: (index + 1) * span,
                    };
                }
                return seriesColor;
            });
            const colors = seriesColors.sort((x, y) => x.percentage - y.percentage);

            for (const item of colors) {
                if (item.percentage > percentage) {
                    return item.color;
                }
            }
            return colors[colors.length - 1]?.color;
        }
        return null;
    }, [color, percentage]);

    const text = useMemo(() => {
        if (!textInside) {
            if (status === 'success' && percentage === 100) {
                return props.children ?? <Icon name="circle-check" prefix="far" />;
            }
            if (status === 'warning') {
                return props.children ?? <Icon name="circle-exclamation" prefix="fas" />;
            }
            if (status === 'exception') {
                return props.children ?? <Icon name="circle-xmark" prefix="fas" />;
            }
        }
        if (format) {
            return props.children ?? <span>{format(percentage)}</span>;
        }
        return props.children ?? <span>{percentage}%</span>;
    }, [format, percentage, props.children, status, textInside]);

    const bar = useMemo(
        () => (
            <div className={b`bar`}>
                <div className={be('bar', 'outer')} style={{ height: strokeWidth }}>
                    <div
                        className={classNames(be('bar', 'inner'), { [bem('bar', 'inner', 'indeterminate')]: indeterminate })}
                        style={{ width: `${percentage}%`, animationDuration: `${duration}s`, backgroundColor }}
                    >
                        {showText && textInside && <div className={be('bar', 'innerText')}>{props.children ?? <span>{text}</span>}</div>}
                    </div>
                </div>
            </div>
        ),
        [b, props.children, be, strokeWidth, bem, indeterminate, percentage, duration, backgroundColor, showText, textInside, text],
    );

    const relativeStrokeWidth = useMemo(() => ((strokeWidth / width) * 100).toFixed(1), [strokeWidth, width]);

    const radius = useMemo(() => {
        if (type === 'circle' || type === 'dashboard') {
            return Number.parseInt(`${50 - Number.parseFloat(relativeStrokeWidth) / 2}`, 10);
        } else {
            return 0;
        }
    }, [relativeStrokeWidth, type]);

    const trackPath = useMemo(() => {
        const r = radius;
        const isDashboard = type === 'dashboard';
        return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
          `;
    }, [radius, type]);

    const perimeter = useMemo(() => 2 * Math.PI * radius, [radius]);

    const rate = useMemo(() => (props.type === 'dashboard' ? 0.75 : 1), [props.type]);

    const strokeDashoffset = useMemo(() => {
        const offset = (-1 * perimeter * (1 - rate)) / 2;
        return `${offset}px`;
    }, [perimeter, rate]);

    const trailPathStyle = useMemo(
        (): React.CSSProperties => ({
            strokeDasharray: `${perimeter * rate}px, ${perimeter}px`,
            strokeDashoffset: strokeDashoffset,
        }),
        [perimeter, rate, strokeDashoffset],
    );

    const circlePathStyle = useMemo(
        (): React.CSSProperties => ({
            strokeDasharray: `${perimeter * rate * (props.percentage / 100)}px, ${perimeter}px`,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
        }),
        [perimeter, props.percentage, rate, strokeDashoffset],
    );

    const stroke = useMemo(() => {
        let ret: string;
        if (props.color) {
            ret = backgroundColor;
        } else {
            switch (props.status) {
                case 'success':
                    ret = '#13ce66';
                    break;
                case 'exception':
                    ret = '#ff4949';
                    break;
                case 'warning':
                    ret = '#e6a23c';
                    break;
                default:
                    ret = '#20a0ff';
            }
        }
        return ret;
    }, [backgroundColor, props.color, props.status]);

    const circle = useMemo(
        () => (
            <div className={b`circle`} style={{ width, height: width }}>
                <svg viewBox="0 0 100 100">
                    <path
                        className={be('circle', 'track')}
                        d={trackPath}
                        stroke={`var(--${globalKey}-fill-color-light, #e5e9f2)`}
                        strokeWidth={relativeStrokeWidth}
                        fill="none"
                        style={trailPathStyle}
                    />
                    <path
                        className={be('circle', 'path')}
                        d={trackPath}
                        stroke={stroke}
                        fill="none"
                        strokeLinecap={strokeLinecap}
                        strokeWidth={percentage ? relativeStrokeWidth : 0}
                        style={circlePathStyle}
                    />
                </svg>
            </div>
        ),
        [b, width, be, trackPath, relativeStrokeWidth, trailPathStyle, stroke, strokeLinecap, percentage, circlePathStyle],
    );

    return (
        <div className={classNames(b(), m(type), is(status), props.className)} style={props.style}>
            {type === 'line' && bar}
            {(type === 'circle' || type === 'dashboard') && circle}

            {/* 文本不在内部时 */}
            {showText && !textInside && <div className={e`text`}>{text}</div>}
        </div>
    );
};

Progress.displayName = 'Progress';

export default Progress;
