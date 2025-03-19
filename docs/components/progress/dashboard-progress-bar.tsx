import { ElButton, ElProgress } from '@qsxy/element-plus-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';

const App = () => {
    const [percentage1, setPercentage1] = useState(20);
    const [percentage2, setPercentage2] = useState(20);
    const percentage3 = useRef(percentage2);

    useEffect(() => {
        setInterval(() => {
            setPercentage2((percentage3.current = (percentage3.current % 100) + 10));
        }, 500);
    }, []);

    const customColors = [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 },
    ];

    const increase1 = useCallback(() => {
        setPercentage1(percentage1 + 10 > 100 ? 100 : percentage1 + 10);
    }, [percentage1]);

    const decrease1 = useCallback(() => {
        setPercentage1(percentage1 - 10 < 0 ? 0 : percentage1 - 10);
    }, [percentage1]);

    return (
        <div className="demo-progress">
            <ElProgress type="dashboard" percentage={percentage1} color={customColors} />
            <ElProgress type="dashboard" percentage={percentage2} color={customColors} />

            <div>
                <ElButton icon="minus" onClick={decrease1} />
                <ElButton icon="plus" onClick={increase1} />
            </div>
        </div>
    );
};

export default App;
