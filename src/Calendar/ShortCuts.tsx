import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { isNotEmpty } from '../Util';
import { ClassValue } from '../hooks/useClassNames';
import { ChangeParams } from './CalendarContext';
import { Shortcuts } from './typings';

interface Props {
    /** 快捷方式 */
    shortcuts: Shortcuts[];
    /** 单选框提交数据方法 */
    onChange?: (value: Dayjs, params?: ChangeParams) => void;
    e: (...classes: ClassValue[]) => string;
}
const ShortCuts = ({ shortcuts, onChange, e }: Props) => {
    return (
        isNotEmpty(shortcuts) && (
            <div className={e`sidebar`}>
                {shortcuts.map((item, i) => (
                    <button key={i} className={e`shortcut`} onClick={() => onChange?.(dayjs(item.value instanceof Function ? item.value() : item.value))}>
                        {item.text}
                    </button>
                ))}
            </div>
        )
    );
};

export default ShortCuts;
