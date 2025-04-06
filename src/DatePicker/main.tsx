import React, { forwardRef } from 'react';
import { DateTimePicker, DateTimePickerProps } from '../DateTimePicker';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import { AllDatePickerProps, DatePickerProps, DatePickerRangeProps, DatePickerRef } from './typings';

const Index = forwardRef<DatePickerRef, AllDatePickerProps>((props, ref) => {
    const { type = 'date' } = props;
    if (['year', 'years', 'month', 'months', 'date', 'dates', 'week'].includes(type)) {
        return <DatePicker ref={ref} {...(props as unknown as DatePickerProps)} />;
    } else if (['daterange', 'monthrange', 'yearrange'].includes(type)) {
        return <DateRangePicker ref={ref} {...(props as unknown as DatePickerRangeProps)} />;
    } else if (['datetime'].includes(type)) {
        return <DateTimePicker ref={ref} {...(props as unknown as DateTimePickerProps)} />;
    }
});

export default Index;
