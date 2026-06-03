import classNames from 'classnames';
import React, { createContext, FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { useClassNames } from '../hooks';
import { StepItemState, StepsContextProps, StepsProps } from './typings';

import { mergeDefaultProps } from '../Util';

const Steps: FC<StepsProps> = memo(props => {
    props = mergeDefaultProps(
        {
            classPrefix: 'steps',
            space: '',
            active: 0,
            direction: 'horizontal',
            alignCenter: false,
            simple: false,
            finishStatus: 'finish',
            processStatus: 'process',
        },
        props,
    );
    const { classPrefix, space, active, direction, alignCenter, simple, finishStatus, processStatus, onChange, className, style, children } = props;

    const { b, m } = useClassNames(classPrefix);

    const [steps, setSteps] = useState<StepItemState[]>([]);
    const prevActiveRef = useRef<number>(active);
    const [stepsVersion, setStepsVersion] = useState(0);

    const addStep = useCallback((item: StepItemState) => {
        setSteps(prev => [...prev, item]);
        setStepsVersion(v => v + 1);
    }, []);

    const removeStep = useCallback(
        (item: StepItemState) => {
            const idx = steps.indexOf(item);
            if (idx >= 0) {
                setSteps(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
                setStepsVersion(v => v + 1);
            }
        },
        [steps],
    );

    useEffect(() => {
        steps.forEach((instance, idx) => {
            instance.setIndex(idx);
            instance.indexRef.current = idx;
            instance.updateStatus(active);
        });
    }, [steps]);

    useEffect(() => {
        if (onChange) {
            onChange(active, prevActiveRef.current);
        }
        prevActiveRef.current = active;
    }, [active, onChange]);

    const contextValue: StepsContextProps = {
        props: {
            space,
            active,
            direction,
            alignCenter,
            simple,
            finishStatus,
            processStatus,
            classPrefix: 'step',
        },
        steps,
        addStep,
        removeStep,
    };

    return (
        <StepsContext.Provider value={contextValue}>
            <div className={classNames(b(), m(simple ? 'simple' : direction), className)} style={style}>
                {children}
            </div>
        </StepsContext.Provider>
    );
});

Steps.displayName = 'ElSteps';

export default Steps;

export const StepsContext = createContext<StepsContextProps>({
    props: {
        space: '',
        active: 0,
        direction: 'horizontal',
    },
    steps: [],
    addStep: () => {},
    removeStep: () => {},
});
