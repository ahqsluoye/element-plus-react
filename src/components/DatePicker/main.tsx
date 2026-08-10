import ElDateTimePicker from '@qsxy/element-plus-react/DateTimePicker/DateTimePicker';
import { DateTimePickerProps } from '@qsxy/element-plus-react/DateTimePicker/typings';
import React from 'react';
import ElDatePicker from './DatePicker';
import ElDateRangePicker from './DateRangePicker';
import { AllDatePickerProps, DatePickerProps, DatePickerRangeProps, DatePickerRef } from './typings';

const Index = ({ ref, ...props }: AllDatePickerProps & { ref?: React.Ref<DatePickerRef | null> }) => {
    const { type = 'date' } = props;
    if (['year', 'years', 'month', 'months', 'date', 'dates', 'week', 'quarter'].includes(type)) {
        return <ElDatePicker ref={ref} {...(props as unknown as DatePickerProps)} />;
    } else if (['daterange', 'monthrange', 'yearrange'].includes(type)) {
        return <ElDateRangePicker ref={ref} {...(props as unknown as DatePickerRangeProps)} />;
    } else if (['datetime'].includes(type)) {
        return <ElDateTimePicker ref={ref} {...(props as unknown as DateTimePickerProps)} />;
    }
};

export default Index;
