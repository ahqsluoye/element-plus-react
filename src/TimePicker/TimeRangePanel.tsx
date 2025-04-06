import classNames from 'classnames';
import { Dayjs } from 'dayjs';
import head from 'lodash/head';
import last from 'lodash/last';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { useClassNames } from '../hooks';
import TimeSpinnerPanel from './TimeSpinnerPanel';
import { TimeRangePanelProps, TimeRangePanelRef } from './typings';
import { makeRange } from './util';

const TimeRangePanel = memo(
    forwardRef<TimeRangePanelRef, TimeRangePanelProps>((props, ref) => {
        const { value, startPlaceholder, endPlaceholder, onChange, setStartSelectionRange, setEndSelectionRange, ...other } = props;
        const { b, e } = useClassNames('time-range-picker');
        const { be } = useClassNames('time');

        const containerRef = useRef<HTMLDivElement>(null);
        // const spinnerRef = useRef<SpinnerRef>(null);

        const spinnerDate = useRef(value);
        useEffect(() => {
            spinnerDate.current = value;
        }, [value]);

        const handleChange = useCallback(
            (time: Dayjs, type: 'start' | 'end') => {
                if (spinnerDate.current instanceof Array && spinnerDate.current.length === 2) {
                    const [start, end] = spinnerDate.current;
                    spinnerDate.current = [type === 'start' ? time : start, type === 'end' ? time : end];
                    onChange([type === 'start' ? time : start, type === 'end' ? time : end]);
                }
            },
            [onChange],
        );

        const disabledStartHours = useCallback(() => {
            if (value instanceof Array && value.length === 2) {
                const [, end] = value;
                const compareHour = end.hour();
                return makeRange(compareHour + 1, 23);
            }
            return [];
        }, [value]);

        const disabledStartMinutes = useCallback(() => {
            if (value instanceof Array && value.length === 2) {
                const [start, end] = value;
                const hour = start.hour();
                const compareHour = end.hour();
                if (hour !== compareHour) {
                    return [];
                }
                const compareMinute = end.minute();
                return makeRange(compareMinute + 1, 59);
            }
            return [];
        }, [value]);

        const disabledStartSeconds = useCallback(() => {
            if (value instanceof Array && value.length === 2) {
                const [start, end] = value;
                const hour = start.hour();
                const minute = start.minute();
                const compareHour = end.hour();
                const compareMinute = end.minute();
                if (hour !== compareHour || minute !== compareMinute) {
                    return [];
                }
                const compareSecond = end.second();
                return makeRange(compareSecond + 1, 59);
            }
            return [];
        }, [value]);

        const disabledEndHours = useCallback(() => {
            if (value instanceof Array && value.length === 2) {
                const [start] = value;
                const compareHour = start.hour();
                return makeRange(0, compareHour - 1);
            }
        }, [value]);

        const disabledEndMinutes = useCallback(() => {
            if (value instanceof Array && value.length === 2) {
                const [start, end] = value;
                const hour = end.hour();
                const compareHour = start.hour();
                if (hour !== compareHour) {
                    return [];
                }
                const compareMinute = start.minute();
                return makeRange(0, compareMinute - 1);
            }
        }, [value]);

        const disabledEndSeconds = useCallback(() => {
            if (value instanceof Array && value.length === 2) {
                const [start, end] = value;
                const hour = end.hour();
                const minute = end.minute();
                const compareHour = start.hour();
                const compareMinute = start.minute();
                if (hour !== compareHour || minute !== compareMinute) {
                    return [];
                }
                const compareSecond = start.second();
                return makeRange(0, compareSecond - 1);
            }
        }, [value]);

        useImperativeHandle(ref, () => ({
            get ref() {
                return containerRef.current;
            },
        }));

        return (
            <div className={classNames(b(), b('picker-panel', false))} ref={containerRef}>
                <div className={e`content`}>
                    <div className={e`cell`}>
                        <div className={e`header`}>{startPlaceholder}</div>
                        <TimeSpinnerPanel
                            value={value instanceof Array ? head(value) : null}
                            onChange={time => handleChange(time, 'start')}
                            className={e`body`}
                            {...other}
                            setSelectionRange={setStartSelectionRange}
                            disabledHours={disabledStartHours}
                            disabledMinutes={disabledStartMinutes}
                            disabledSeconds={disabledStartSeconds}
                            showSeconds={other.showSeconds}
                            isRange
                        />
                    </div>
                    <div className={e`cell`}>
                        <div className={e`header`}>{endPlaceholder}</div>
                        <TimeSpinnerPanel
                            value={value instanceof Array ? last(value) : null}
                            onChange={time => handleChange(time, 'end')}
                            className={e`body`}
                            {...other}
                            setSelectionRange={setEndSelectionRange}
                            disabledHours={disabledEndHours}
                            disabledMinutes={disabledEndMinutes}
                            disabledSeconds={disabledEndSeconds}
                            isRange
                        />
                    </div>
                </div>
                <div className={be('panel', 'footer')}>
                    <button
                        className={classNames(be('panel', 'btn'), 'cancle')}
                        onClick={() => {
                            spinnerDate.current = null;
                            props.onDestroy?.();
                        }}
                    >
                        取 消
                    </button>
                    <button className={classNames(be('panel', 'btn'), 'confirm')} onClick={() => props.onOk?.()}>
                        确 定
                    </button>
                </div>
            </div>
        );
    }),
);

export default TimeRangePanel;
