import { ElButton, ElProgress } from '@parker/element-plus-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import './style.scss';

const App = () => {
    const [percentage, setPercentage] = useState(20);
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

    const customColorMethod = useCallback((per: number) => {
        if (per < 30) {
            return '#909399';
        }
        if (per < 70) {
            return '#e6a23c';
        }
        return '#67c23a';
    }, []);

    const increase = useCallback(() => {
        setPercentage(percentage + 10 > 100 ? 100 : percentage + 10);
    }, [percentage]);

    const decrease = useCallback(() => {
        setPercentage(percentage - 10 < 0 ? 0 : percentage - 10);
    }, [percentage]);

    return (
        <div className="demo-progress">
            <ElProgress percentage={percentage} color={'#409eff'} />
            <ElProgress percentage={percentage} color={customColorMethod} />
            <ElProgress percentage={percentage} color={customColors} />
            <ElProgress percentage={percentage} color={customColors} />
            <div>
                <ElButton icon="minus" onClick={decrease} />
                <ElButton icon="plus" onClick={increase} />
            </div>
        </div>
    );
};

export default App;
