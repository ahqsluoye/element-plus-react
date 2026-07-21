import type { CountdownRef } from '@qsxy/element-plus-react';
import { ElButton, ElCol, ElCountdown, ElIcon, ElRow } from '@qsxy/element-plus-react';
import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';

const App = () => {
    const [value, setValue] = useState(Date.now() + 1000 * 60 * 60 * 7);
    const [value1, setValue1] = useState(Date.now() + 1000 * 60 * 60 * 24 * 2);
    const [value2, setValue2] = useState(dayjs().add(1, 'month').startOf('month'));

    const countdownRef = useRef<CountdownRef>(null);

    function reset() {
        setValue1(Date.now() + 1000 * 60 * 60 * 24 * 2);
    }
    return (
        <>
            <ElRow gutter={16}>
                <ElCol xs={24} sm={12} md={8} className="text-center mb-4">
                    <ElCountdown title="Start to grab" value={value} ref={countdownRef} />
                </ElCol>
                <ElCol xs={24} sm={12} md={8} className="text-center mb-4">
                    <ElCountdown title="Remaining VIP time" format="HH:mm:ss" value={value1} />
                    <ElButton className="countdown-footer" type="primary" onClick={reset}>
                        Reset
                    </ElButton>
                </ElCol>
                <ElCol xs={24} sm={12} md={8} className="text-center mb-4">
                    <ElCountdown
                        format="DD [days] HH:mm:ss"
                        value={value2}
                        title={
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <ElIcon style={{ marginRight: 4 }} name="calendar" />
                                Still to go until next month
                            </div>
                        }
                    ></ElCountdown>
                    <div className="countdown-footer">{value2.format('YYYY-MM-DD')}</div>
                </ElCol>
            </ElRow>
        </>
    );
};

export default App;
