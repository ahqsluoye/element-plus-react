import ElButton from '@qsxy/element-plus-react/Button/Button';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import { Message } from '@qsxy/element-plus-react/Message';
import dayjs from 'dayjs';
import React, { FC, use, useCallback } from 'react';
import CalendarContext from './CalendarContext';

const Footer: FC = () => {
    const { e } = useClassNames('picker-panel');
    const { showToday, showNow, showConfirm, onChange, close, disabledDate } = use(CalendarContext);

    const { t } = useLocale();

    const onPickToday = useCallback(() => {
        const today = dayjs();
        if (disabledDate && disabledDate(today.toDate())) {
            Message.error(`“${showToday ? t('el.datepicker.today') : t('el.datepicker.now')}”在禁选日期范围内!`);
            return;
        }
        onChange(dayjs());
        close?.();
    }, [close, disabledDate, onChange, showToday, t]);

    return (
        <div className={e`footer`}>
            {showToday && (
                <ElButton type="primary" link className={e`today-btn`} onClick={onPickToday}>
                    {t('el.datepicker.today')}
                </ElButton>
            )}
            {showNow && (
                <>
                    <ElButton type="default" size="small" text className={e`link-btn`} onClick={onPickToday}>
                        {t('el.datepicker.now')}
                    </ElButton>
                    <ElButton type="default" size="small" className={e`link-btn`} onClick={close}>
                        {t('el.datepicker.confirm')}
                    </ElButton>
                </>
            )}
            {showConfirm && (
                <ElButton type="default" size="small" className={e`link-btn`} onClick={close}>
                    {t('el.datepicker.confirm')}
                </ElButton>
            )}
        </div>
    );
};

Footer.displayName = 'ElFooter';

export default Footer;
