import { ElTimePicker } from '@qsxy/element-plus-react';
import React, { useCallback } from 'react';

const App = () => {
    const makeRange = useCallback((start: number, end: number) => {
        const result: number[] = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }, []);

    const disabledHours = useCallback(() => {
        return makeRange(0, 16).concat(makeRange(19, 23));
    }, [makeRange]);

    const disabledMinutes = useCallback(
        (hour: number) => {
            if (hour === 17) {
                return makeRange(0, 29);
            }
            if (hour === 18) {
                return makeRange(31, 59);
            }
        },
        [makeRange],
    );

    const disabledSeconds = useCallback(
        (hour: number, minute: number) => {
            if (hour === 18 && minute === 30) {
                return makeRange(1, 59);
            }
        },
        [makeRange],
    );
    return <ElTimePicker disabledHours={disabledHours} disabledMinutes={disabledMinutes} disabledSeconds={disabledSeconds} style={{ width: 200 }} />;
};

export default App;
