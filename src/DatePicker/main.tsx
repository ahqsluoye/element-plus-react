import React from 'react';
import DatePicker from './DatePicker';
import DateRangePicker from './DateRangePicker';
import { AllDatePickerProps, DatePickerProps, DatePickerRangeProps } from './typings';

const Index = (props: AllDatePickerProps) => {
    const { type = 'date' } = props;
    if (['year', 'years', 'month', 'months', 'date', 'dates', 'week'].includes(type)) {
        return <DatePicker {...(props as unknown as DatePickerProps)} />;
    } else if (['daterange', 'monthrange', 'yearrange'].includes(type)) {
        return <DateRangePicker {...(props as unknown as DatePickerRangeProps)} />;
    }
};

export default Index;
