import dayjs from 'dayjs';
import React, { FC, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { Message } from '../Message';
import { useClassNames } from '../hooks';
import CalendarContext from './CalendarContext';

const Footer: FC = () => {
    const { e } = useClassNames('picker-panel');
    const { showToday, showNow, onChange, close, disabledDate } = useContext(CalendarContext);

    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    const onPickToday = useCallback(() => {
        const today = dayjs();
        if (disabledDate && disabledDate(today.toDate())) {
            Message.error(`“${showToday ? t('el.datepicker.today', { lng: locale }) : t('el.datepicker.now', { lng: locale })}”在禁选日期范围内!`);
            return;
        }
        onChange(dayjs());
        close?.();
    }, [close, disabledDate, locale, onChange, showToday, t]);

    return (
        <div className={e`footer`}>
            {showToday && (
                <Button type="primary" link className={e`today-btn`} onClick={onPickToday}>
                    {t('el.datepicker.today', { lng: locale })}
                </Button>
            )}
            {showNow && (
                <>
                    <Button type="primary" link className={e`link-btn`} onClick={onPickToday}>
                        {t('el.datepicker.now', { lng: locale })}
                    </Button>
                    <Button type="default" className={e`link-btn`} onClick={close}>
                        {t('el.datepicker.confirm', { lng: locale })}
                    </Button>
                </>
            )}
        </div>
    );
};

Footer.displayName = 'Calendar.Footer';

export default Footer;
