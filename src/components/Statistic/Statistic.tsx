import classNames from 'classnames';
import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { isFunction, isNumber, mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import { StatisticProps, StatisticRef } from './typings';

const Statistic = memo(
    forwardRef<StatisticRef, StatisticProps>((props, ref) => {
        props = mergeDefaultProps({ value: 0, decimalSeparator: '.', groupSeparator: ',', precision: 0 }, props);
        const { title, prefix, suffix, value, formatter, precision, decimalSeparator, groupSeparator, valueStyle, className, style, ...rest } = props;

        const { b, e } = useClassNames('statistic');
        const containerRef = useRef<HTMLDivElement>(null);

        const displayValue = useMemo(() => {
            if (isFunction(formatter)) {
                return formatter(value);
            }

            // Handle non-numeric values
            if (!isNumber(value) || Number.isNaN(value)) {
                return value;
            }

            // Format numeric value
            let [integer, decimal = ''] = String(value).split('.');

            // Handle decimal precision
            decimal = decimal.padEnd(precision, '0').slice(0, precision > 0 ? precision : 0);

            // Add group separators
            integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);

            // Join with decimal separator if needed
            return [integer, decimal].join(decimal ? decimalSeparator : '');
        }, [value, formatter, precision, decimalSeparator, groupSeparator]);

        React.useImperativeHandle(ref, () => ({
            ref: containerRef,
            displayValue,
        }));

        return (
            <div ref={containerRef} className={classNames(b(), className)} style={style} {...rest}>
                {title && <div className={e`head`}>{title}</div>}

                <div className={e`content`}>
                    {prefix && <div className={e`prefix`}>{<span>{prefix}</span>}</div>}

                    <span className={e`number`} style={valueStyle}>
                        {displayValue}
                    </span>

                    {suffix && <div className={e`suffix`}>{<span>{suffix}</span>}</div>}
                </div>
            </div>
        );
    }),
);

Statistic.displayName = 'ElStatistic';

export default Statistic;
