import React from 'react';
import ElTimePicker from './TimePicker';
import ElTimePickerRange from './TimePickerRange';
import { AllTimePickerProps, TimePickerProps, TimePickerRangeProps, TimePickerRef } from './typings';

const Index = ({ ref, ...props }: AllTimePickerProps & { ref?: React.Ref<TimePickerRef | null> }) => {
    const { isRange } = props;
    if (isRange) {
        return <ElTimePickerRange ref={ref} {...(props as unknown as TimePickerRangeProps)} />;
    } else {
        return <ElTimePicker ref={ref} {...(props as unknown as TimePickerProps)} />;
    }
};

export default Index;
