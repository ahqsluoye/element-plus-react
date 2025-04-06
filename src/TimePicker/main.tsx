import React, { forwardRef } from 'react';
import TimePicker from './TimePicker';
import TimePickerRange from './TimePickerRange';
import { AllTimePickerProps, TimePickerProps, TimePickerRangeProps, TimePickerRef } from './typings';

const Index = forwardRef<TimePickerRef, AllTimePickerProps>((props, ref) => {
    const { isRange } = props;
    if (isRange) {
        return <TimePickerRange ref={ref} {...(props as unknown as TimePickerRangeProps)} />;
    } else {
        return <TimePicker ref={ref} {...(props as unknown as TimePickerProps)} />;
    }
});

export default Index;
