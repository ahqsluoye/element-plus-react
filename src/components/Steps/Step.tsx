import classNames from 'classnames';
import React, { FC, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useClassNames } from '../hooks';
import Icon from '../Icon/Icon';
import { isNumber, mergeDefaultProps } from '../Util';
import { StepsContext } from './Steps';
import { StepItemState, StepProps, StepsContextProps } from './typings';

const getUid = (() => {
    let uid = 0;
    return () => {
        return ++uid;
    };
})();

const Step: FC<StepProps> = memo(props => {
    props = mergeDefaultProps(
        {
            classPrefix: 'step',
            title: '',
            description: '',
            icon: null,
            status: '',
        },
        props,
    );
    const { classPrefix, title, description, icon, status, className, style: styleProp, children } = props;

    const { b, e, is } = useClassNames(classPrefix);

    const parent = useContext(StepsContext) as StepsContextProps;
    const uidRef = useRef(getUid());

    const [index, setIndexState] = useState(-1);
    const [internalStatus, setInternalStatus] = useState('');
    const [lineStyle, setLineStyle] = useState<React.CSSProperties>({});

    const stepDiffRef = useRef(0);
    const beforeActiveRef = useRef(0);

    const indexRef = useRef(index);
    indexRef.current = index;

    const currentStatus = useMemo(() => {
        return status || internalStatus;
    }, [status, internalStatus]);

    const isCenter = useMemo(() => {
        return parent.props.alignCenter;
    }, [parent.props.alignCenter]);

    const isVertical = useMemo(() => {
        return parent.props.direction === 'vertical';
    }, [parent.props.direction]);

    const isSimple = useMemo(() => {
        return parent.props.simple;
    }, [parent.props.simple]);

    const stepsCount = useMemo(() => {
        return parent.steps.length;
    }, [parent.steps]);

    const isLast = useMemo(() => {
        return parent.steps[stepsCount - 1]?.uid === uidRef.current;
    }, [parent.steps, stepsCount]);

    const space = useMemo(() => {
        return isSimple ? '' : parent.props.space;
    }, [isSimple, parent.props.space]);

    const containerKls = useMemo(() => {
        return classNames(
            b(),
            is(isSimple ? 'simple' : parent.props.direction),
            is({
                flex: isLast && !space && !isCenter,
                center: isCenter && !isVertical && !isSimple,
            }),
        );
    }, [b, is, isSimple, parent.props.direction, isLast, space, isCenter, isVertical]);

    const containerStyle = useMemo(() => {
        const sty: React.CSSProperties = {
            flexBasis: (() => {
                if (isNumber(space)) {
                    return `${space}px`;
                }
                if (space) {
                    return space;
                }
                return `${100 / (stepsCount - (isCenter ? 0 : 1))}%`;
            })(),
        };
        if (isVertical) {
            return sty;
        }
        if (isLast) {
            sty.maxWidth = `${100 / stepsCount}%`;
        }
        return sty;
    }, [space, stepsCount, isCenter, isVertical, isLast]);

    const setIndex = useCallback((val: number) => {
        setIndexState(val);
    }, []);

    const calcProgress = useCallback(
        (stat: string) => {
            const isWait = stat === 'wait';
            const stepDiff = stepDiffRef.current;
            const beforeActive = beforeActiveRef.current;
            const idx = indexRef.current;
            const { active, direction, processStatus } = parent.props;

            let delayTimer: number;
            if (Math.abs(stepDiff) === 1) {
                delayTimer = 0;
            } else if (stepDiff > 0) {
                delayTimer = (idx + 1 - beforeActive) * 150;
            } else {
                delayTimer = -(idx + 1 - active) * 150;
            }

            const sty: React.CSSProperties = {
                transitionDelay: `${delayTimer}ms`,
            };
            const step = stat === processStatus || isWait ? 0 : 100;

            sty.borderWidth = step && !isSimple ? '1px' : 0;
            if (direction === 'vertical') {
                sty.height = `${step}%`;
            } else {
                sty.width = `${step}%`;
            }
            setLineStyle(sty);
        },
        [isSimple, parent.props],
    );

    const updateStatus = useCallback(
        (activeIndex: number) => {
            const { finishStatus, processStatus } = parent.props;
            let newStatus: string;
            const idx = indexRef.current;
            const prevStep = parent.steps[idx - 1];
            const prevInternalStatus = prevStep ? prevStep.internalStatus : 'wait';

            if (activeIndex > idx) {
                newStatus = finishStatus;
            } else if (activeIndex === idx && prevInternalStatus !== 'error') {
                newStatus = processStatus;
            } else {
                newStatus = 'wait';
            }
            setInternalStatus(newStatus);

            if (prevStep) {
                prevStep.calcProgress(newStatus);
            }
        },
        [parent.props, parent.steps],
    );

    const stepItemStateRef = useRef<StepItemState>({
        uid: uidRef.current,
        currentStatus,
        internalStatus,
        indexRef,
        setIndex,
        calcProgress,
        updateStatus,
    });

    stepItemStateRef.current = {
        uid: uidRef.current,
        currentStatus,
        internalStatus,
        indexRef,
        setIndex,
        calcProgress,
        updateStatus,
    };

    useEffect(() => {
        parent.addStep(stepItemStateRef.current);
        return () => {
            parent.removeStep(stepItemStateRef.current);
        };
    }, []);

    useEffect(() => {
        const activeIdx = parent.props.active ?? 0;
        const oldActive = beforeActiveRef.current;
        beforeActiveRef.current = activeIdx;
        stepDiffRef.current = activeIdx - oldActive;
        updateStatus(activeIdx);
    }, [parent.props.active, parent.props.processStatus, parent.props.finishStatus]);

    const renderIcon = () => {
        if (icon) {
            return <Icon className={e`icon-inner`} name={icon} />;
        }
        if (currentStatus === 'success') {
            return <Icon className={classNames(e`icon-inner`, is`status`)} name="check" />;
        }
        if (currentStatus === 'error') {
            return <Icon className={classNames(e`icon-inner`, is`status`)} name="close" />;
        }
        if (!isSimple) {
            return <span className={e`icon-inner`}>{index + 1}</span>;
        }
        return null;
    };

    return (
        <div style={{ ...containerStyle, ...styleProp }} className={classNames(containerKls, className)}>
            <div className={classNames(e`head`, is(currentStatus))}>
                {!isSimple && (
                    <div className={e`line`}>
                        <i className={e`line-inner`} style={lineStyle} />
                    </div>
                )}
                <div className={classNames(e`icon`, is(icon ? 'icon' : 'text'))}>{renderIcon()}</div>
            </div>
            <div className={e`main`}>
                <div className={classNames(e`title`, is(currentStatus))}>{title}</div>
                {isSimple ? <div className={e`arrow`} /> : <div className={classNames(e`description`, is(currentStatus))}>{description}</div>}
            </div>
        </div>
    );
});

Step.displayName = 'ElStep';

export default Step;
