import { useMount } from 'ahooks';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Scrollbar } from '../Scrollbar';
import { useClassNames } from '../hooks';
import { SpinnerRef, TimeSpinnerProps, TimeType } from './typings';
import { getTimeLists } from './useTimePicker';

interface ListMap {
    hours: boolean[];
    minutes: boolean[];
    seconds: boolean[];
}

const TimeSpinnerPanel: React.ForwardRefExoticComponent<TimeSpinnerProps & React.RefAttributes<SpinnerRef>> = memo(
    forwardRef<SpinnerRef, TimeSpinnerProps>((props, ref) => {
        const { classPrefix = 'time', showSeconds = true, value: valueProp, onChange } = props;
        const { b, be, is } = useClassNames(classPrefix);

        const spinnerDate = useRef(valueProp);
        const isScrolling = useRef(false);

        // useEffect(() => {
        //     spinnerDate.current = valueProp;
        // }, [valueProp]);

        const listHoursRef = useRef<HTMLElement>(null);
        const listMinutesRef = useRef<HTMLElement>(null);
        const listSecondsRef = useRef<HTMLElement>(null);
        const listMapRef = useRef<ListMap>(null);

        const listRefsMap = useMemo(() => {
            return {
                hours: listHoursRef,
                minutes: listMinutesRef,
                seconds: listSecondsRef,
            };
        }, []);

        /** 时间列表类型 */
        const spinnerItems: TimeType[] = useMemo(() => {
            const arr: TimeType[] = ['hours', 'minutes', 'seconds'];
            return showSeconds ? arr : arr.slice(0, 2);
        }, [showSeconds]);

        /** 当前时间的时 */
        const hour = useMemo(() => {
            return valueProp?.hour();
        }, [valueProp]);

        /** 当前时间的分 */
        const minute = useMemo(() => {
            return valueProp?.minute();
        }, [valueProp]);

        /** 当前时间的秒 */
        const second = useMemo(() => {
            return valueProp?.second();
        }, [valueProp]);

        /** 当前时间 */
        const timePartsMap = useMemo(() => {
            return {
                hours: hour,
                minutes: minute,
                seconds: second,
            };
        }, [hour, minute, second]);

        /** 当前时间 */
        const getTimePartsMap = useCallback(() => {
            return {
                hours: spinnerDate.current.hour(),
                minutes: spinnerDate.current.minute(),
                seconds: spinnerDate.current.second(),
            };
        }, []);

        /** 获取时间列表中的具体数值，包括是否禁选状态 */
        const { getHoursList, getMinutesList, getSecondsList } = useMemo(() => {
            return getTimeLists(props.disabledHours, props.disabledMinutes, props.disabledSeconds);
        }, [props.disabledHours, props.disabledMinutes, props.disabledSeconds]);

        const hoursList = useMemo(() => {
            return getHoursList(props.role);
        }, [getHoursList, props.role]);

        const minutesList = useMemo(() => {
            return getMinutesList(hour, props.role);
        }, [getMinutesList, hour, props.role]);

        const secondsList = useMemo(() => {
            return getSecondsList(hour, minute, props.role);
        }, [getSecondsList, hour, minute, props.role]);

        const listMap = useMemo(() => {
            return (listMapRef.current = {
                hours: hoursList,
                minutes: minutesList,
                seconds: secondsList,
            });
        }, [hoursList, minutesList, secondsList]);

        // const getAmPmFlag = hour => {
        //     const shouldShowAmPm = !!props.amPmMode;
        //     if (!shouldShowAmPm) return '';
        //     const isCapital = props.amPmMode === 'A';
        //     // todo locale
        //     let content = hour < 12 ? ' am' : ' pm';
        //     if (isCapital) content = content.toUpperCase();
        //     return content;
        // };

        // const handleSelectRange = useCallback(
        //     type => {
        //         if (type === 'hours') {
        //             setSelectionRange?.(0, 2);
        //         } else if (type === 'minutes') {
        //             setSelectionRange?.(3, 5);
        //         } else if (type === 'seconds') {
        //             setSelectionRange?.(6, 8);
        //         }
        //     },
        //     [setSelectionRange],
        // );

        const typeItemHeight = useCallback(
            (type: TimeType) => {
                const el = listRefsMap[type].current;
                return el?.querySelector('li').offsetHeight;
            },
            [listRefsMap],
        );

        /** 调整列表时间数字位置 */
        const adjustSpinner = useCallback(
            (type: TimeType, value: number) => {
                const el = listRefsMap[type].current;
                if (el) {
                    el.querySelector('.el-scrollbar__wrap').scrollTop = Math.max(0, value * typeItemHeight(type));
                }
            },
            [listRefsMap, typeItemHeight],
        );

        /** 日期变化后提交 */
        const modifyDateField = useCallback(
            (type: TimeType, value: number) => {
                const list = listMapRef.current[type];
                const isDisabled = list[value];
                if (isDisabled) {
                    return;
                }

                switch (type) {
                    case 'hours':
                        onChange?.(spinnerDate.current.hour(value), { defaultTime: true });
                        break;
                    case 'minutes':
                        onChange?.(spinnerDate.current.minute(value), { defaultTime: true });
                        break;
                    case 'seconds':
                        onChange?.(spinnerDate.current.second(value), { defaultTime: true });
                        break;
                }
            },
            [spinnerDate, onChange],
        );

        /** 修正当前时间数字位置 */
        const adjustCurrentSpinner = useCallback(
            (type: TimeType) => {
                adjustSpinner(type, getTimePartsMap()[type]);
            },
            [adjustSpinner, getTimePartsMap],
        );

        const debouncedResetScroll = debounce(
            useCallback(
                (type: TimeType) => {
                    isScrolling.current = false;
                    adjustCurrentSpinner(type);
                },
                [adjustCurrentSpinner],
            ),
            200,
        );

        // NOTE: used by datetime / date-range panel
        //       renamed from adjustScrollTop
        //       should try to refactory it
        const adjustSpinners = useCallback(() => {
            adjustCurrentSpinner('hours');
            adjustCurrentSpinner('minutes');
            adjustCurrentSpinner('seconds');
        }, [adjustCurrentSpinner]);

        /** 时间数字点击回调 */
        const handleClick = useCallback(
            (type: TimeType, { value, disabled }: { value: number; disabled: boolean }) => {
                if (!disabled) {
                    modifyDateField(type, value);
                    // handleSelectRange(type);
                    adjustSpinner(type, value);
                }
            },
            [modifyDateField, adjustSpinner],
        );

        const scrollBarHeight = useCallback(
            (type: TimeType) => {
                return listRefsMap[type].current?.offsetHeight;
            },
            [listRefsMap],
        );

        /** 时间滚动事件 */
        const handleScroll = useCallback(
            (type: TimeType) => {
                isScrolling.current = true;
                const value = Math.min(
                    Math.round(
                        (listRefsMap[type].current?.querySelector('.el-scrollbar__wrap').scrollTop - (scrollBarHeight(type) * 0.5 - 10) / typeItemHeight(type) + 3) /
                            typeItemHeight(type),
                    ),
                    type === 'hours' ? 23 : 59,
                );
                modifyDateField(type, value);
                debouncedResetScroll(type);
                isScrolling.current = false;
            },
            [debouncedResetScroll, listRefsMap, modifyDateField, scrollBarHeight, typeItemHeight],
        );

        /** 绑定时间滚动事件 */
        const bindFuntion = useCallback(
            type => {
                if (listRefsMap[type].current) {
                    listRefsMap[type].current.querySelector('.el-scrollbar__wrap').onscroll = () => {
                        // TODO: scroll is emitted when set scrollTop programatically
                        // should find better solutions in the future!
                        handleScroll(type);
                    };
                }
            },
            [handleScroll, listRefsMap],
        );

        /** 绑定时间滚动事件 */
        const unbindFuntion = useCallback(
            type => {
                if (listRefsMap[type].current) {
                    listRefsMap[type].current.querySelector('.el-scrollbar__wrap').removeEventListener('scroll', () => {
                        handleScroll(type);
                    });
                }
            },
            [handleScroll, listRefsMap],
        );

        const bindScrollEvent = useCallback(() => {
            bindFuntion('hours');
            bindFuntion('minutes');
            bindFuntion('seconds');
        }, [bindFuntion]);

        const unbindScrollEvent = useCallback(() => {
            unbindFuntion('hours');
            unbindFuntion('minutes');
            unbindFuntion('seconds');
        }, [unbindFuntion]);

        useImperativeHandle(ref, () => ({
            adjustSpinners,
        }));

        /** 面板初始化时调整时间数字位置 */
        useMount(() => {
            bindScrollEvent();
            adjustSpinners();
            // setSelectionRange?.(0, 2);

            return unbindScrollEvent;
        });

        /** 滚动结束后修正时间数字位置 */
        useEffect(() => {
            spinnerDate.current = valueProp;
            if (isScrolling.current) {
                return;
            }
            // 仅当值有效时
            if (valueProp?.isValid()) {
                adjustSpinners();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [valueProp]);

        return (
            <div className={classNames(be('panel', 'content'), { 'has-seconds': props.showSeconds }, props.className)}>
                <div className={classNames(b`spinner`, { 'has-seconds': props.showSeconds })}>
                    {spinnerItems.map(item => {
                        return (
                            <Scrollbar
                                key={item}
                                maxHeight="inherit"
                                className={be('spinner', 'wrapper')}
                                viewClass={be('spinner', 'list')}
                                tag="ul"
                                ref={_ref => (listRefsMap[item].current = _ref?.ref?.current)}
                                noresize
                                onScroll={() => handleScroll(item)}
                                // onMouseEnter={() => handleSelectRange(item)}
                                // @ts-ignore
                                onMouseMove={() => adjustCurrentSpinner(item)}
                            >
                                {listMap[item].map((disabled, key) => {
                                    return (
                                        <li
                                            className={classNames(be('spinner', 'item'), is({ active: timePartsMap[item] === key, disabled }))}
                                            key={key}
                                            onClick={() => handleClick(item, { disabled, value: key })}
                                        >
                                            {`${key < 10 ? 0 : ''}${key}`}
                                        </li>
                                    );
                                })}
                            </Scrollbar>
                        );
                    })}
                </div>
            </div>
        );
    }),
);

TimeSpinnerPanel.displayName = 'TimeSpinnerPanel';

export default TimeSpinnerPanel;
