import classNames from 'classnames';
import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef } from 'react';
import { useClassNames, useClickOutside } from '../hooks';
import TimeSpinnerPanel from './TimeSpinnerPanel';
import { SpinnerRef, TimePanelProps, TimePanelRef } from './typings';

const TimePickerPanel = memo(
    forwardRef<TimePanelRef, TimePanelProps>((props, ref) => {
        const { classPrefix = 'time', referenceElement, ...other } = props;
        const { b, be } = useClassNames(classPrefix);

        const containerRef = useRef<HTMLDivElement>(null);
        const spinnerRef = useRef<SpinnerRef>(null);

        const reference = useMemo(() => (referenceElement instanceof Function ? referenceElement() : referenceElement) ?? { current: null }, [referenceElement]);

        useImperativeHandle(ref, () => ({
            get ref() {
                return containerRef.current;
            },
            adjustSpinners: spinnerRef.current.adjustSpinners,
        }));

        useClickOutside(reference, {
            popperRef: containerRef.current,
            value: () => {
                // spinnerDate.current = null;
                props?.onDestroy?.();
            },
        });

        return (
            <div className={classNames(b`panel`, props.className)} style={props.style} ref={containerRef}>
                <TimeSpinnerPanel {...other} ref={spinnerRef} />
                <div className={be('panel', 'footer')}>
                    <button
                        className={classNames(be('panel', 'btn'), 'cancle')}
                        onClick={() => {
                            // spinnerDate.current = null;
                            props.onDestroy?.();
                        }}
                    >
                        取 消
                    </button>
                    <button className={classNames(be('panel', 'btn'), 'confirm')} onClick={() => props.onOk?.()}>
                        确 定
                    </button>
                </div>
            </div>
        );
    }),
);

export default TimePickerPanel;
