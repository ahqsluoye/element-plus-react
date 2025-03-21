import dayjs from 'dayjs';
import React, { FC, useCallback, useContext } from 'react';
import { Button } from '../Button';
import { Message } from '../Message';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';

const Footer: FC = () => {
    const { e } = useClassNames('picker-panel');
    const { showToday, showNow, onChange, close, disabledDate } = useContext(CalendarContext);

    const onPickToday = useCallback(() => {
        const today = dayjs();
        if (disabledDate && disabledDate(today.toDate())) {
            Message.error(`“${showToday ? '今天' : '此刻'}”在禁选日期范围内!`);
            return;
        }
        onChange(dayjs());
        close?.();
    }, [close, disabledDate, onChange, showToday]);

    return (
        <div className={e`footer`}>
            {showToday && (
                <Button type="primary" link className={e`today-btn`} onClick={onPickToday}>
                    今 天
                </Button>
            )}
            {showNow && (
                <>
                    <Button type="primary" link className={e`link-btn`} onClick={onPickToday}>
                        此 刻
                    </Button>
                    <Button type="default" className={e`link-btn`} onClick={close}>
                        确 定
                    </Button>
                </>
            )}
        </div>
    );
};

Footer.displayName = 'ElCalendar.Footer';

export default Footer;
