import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cell } from './typings';

export type CalendarPanelType = 'year' | 'month' | 'date' | 'week' | 'quarter';

export interface UseKeyboardNavigationProps {
    /** 面板类型，决定方向键的偏移粒度 */
    type: CalendarPanelType;
    /** 当前面板锚点日期，用于在页面切换后重新定位焦点 */
    currentDate: Dayjs;
    /** 当前已选中日期，无选中时可传入 null */
    selectedDate?: Dayjs;
    /** 禁用日期判断 */
    disabledDate?: (date: Date) => boolean;
    /** 面板中的所有单元格 */
    rows: Cell[];
    /** 将单元格转换为对应日期对象 */
    getCellDate: (cell: Cell) => Dayjs;
    /** 方向键导航回调（选中但不关闭面板） */
    onNavigate: (date: Dayjs) => void;
    /** 回车确认回调（与点击该日期元素效果一致） */
    onConfirm: (date: Dayjs) => void;
}

// 不同面板类型下，方向键对应的日期偏移（[单位, 步长]）
const NAVIGATION_STEPS: Record<CalendarPanelType, Record<'up' | 'down' | 'left' | 'right', [ManipulateType, number]>> = {
    date: { up: ['day', -7], down: ['day', 7], left: ['day', -1], right: ['day', 1] },
    week: { up: ['day', -7], down: ['day', 7], left: ['day', -7], right: ['day', 7] },
    month: { up: ['month', -4], down: ['month', 4], left: ['month', -1], right: ['month', 1] },
    year: { up: ['year', -4], down: ['year', 4], left: ['year', -1], right: ['year', 1] },
    quarter: { up: ['month', -12], down: ['month', 12], left: ['month', -3], right: ['month', 3] },
};

const DIRECTION_KEYS: Record<string, 'up' | 'down' | 'left' | 'right'> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
};

const isValidDate = (date?: Dayjs): date is Dayjs => {
    return !!date && dayjs.isDayjs(date) && date?.isValid();
};

const useKeyboardNavigation = ({ type, currentDate, selectedDate, disabledDate, rows, getCellDate, onNavigate, onConfirm }: UseKeyboardNavigationProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // 初始焦点：优先当前选中日期，否则定位到第一个可用（available）的当前月单元格
    const [focusDate, setFocusDate] = useState<Dayjs>(null);

    // 外部选中值变化时（例如鼠标点击选中），同步焦点
    useEffect(() => {
        if (!isValidDate(selectedDate)) {
            return;
        }
        setFocusDate(prev => (prev?.valueOf() === selectedDate?.valueOf() ? prev : selectedDate));
    }, [selectedDate]);

    // 焦点日期或面板页面变化后，将键盘焦点定位到对应单元格
    useEffect(() => {
        const fn = (ev: KeyboardEvent) => {
            // ev.preventDefault();
            // ev.stopPropagation();
            if (ev.key !== 'ArrowUp' && ev.key !== 'ArrowDown' && ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') {
                return;
            }
            // console.log(ev);

            if (isValidDate(selectedDate)) {
                setFocusDate(selectedDate);
                return;
            }
            const firstAvailable = rows.find(cell => cell.type === 'current' && !cell.disabled);
            setFocusDate(firstAvailable ? getCellDate(firstAvailable) : currentDate);
        };

        document.addEventListener('keydown', fn);

        return () => {
            document.removeEventListener('keydown', fn);
        };

        // contentRef.current?.querySelector<HTMLElement>('.focused')?.focus();
        // contentRef.current?.focus();
    }, []);

    const handleKeydown = useCallback(
        (event: React.KeyboardEvent) => {
            // 回车键：触发与鼠标点击一致的选中逻辑
            if (event.key === 'Enter') {
                event.preventDefault();
                onConfirm(focusDate);
                return;
            }

            const direction = DIRECTION_KEYS[event.key];
            if (!direction) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const [unit, step] = NAVIGATION_STEPS[type][direction];
            const nextDate = focusDate.add(step, unit);

            // 禁用日期不可通过键盘选中
            if (disabledDate?.(nextDate.toDate())) {
                return;
            }

            setFocusDate(nextDate);
            onNavigate(nextDate);
        },
        [type, focusDate, disabledDate, onNavigate, onConfirm],
    );

    return { contentRef, focusDate, handleKeydown };
};

export default useKeyboardNavigation;
