import { useMemo, useRef, useState } from 'react';
import { useResizeObserver } from './useResizeObserver';

export function useCalcInputWidth() {
    const calculatorRef = useRef<HTMLElement>();
    const [calculatorWidth, setCalculatorWidth] = useState(0);

    const inputStyle = useMemo(
        () => ({
            minWidth: `${Math.max(calculatorWidth, 11)}px`,
        }),
        [calculatorWidth],
    );

    const resetCalculatorWidth = () => {
        setCalculatorWidth(calculatorRef.current?.getBoundingClientRect().width ?? 0);
    };

    useResizeObserver(calculatorRef, resetCalculatorWidth);

    return {
        calculatorRef,
        calculatorWidth,
        inputStyle,
    };
}
