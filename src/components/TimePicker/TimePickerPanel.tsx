import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useClickOutside from '@qsxy/element-plus-react/hooks/useClickOutside';
import { useLocale } from '@qsxy/element-plus-react/hooks/useLocale';
import classNames from 'classnames';
import React, { memo, useImperativeHandle, useMemo, useRef } from 'react';
import TimeSpinnerPanel from './TimeSpinnerPanel';
import { SpinnerRef, TimePanelProps, TimePanelRef } from './typings';

const TimePickerPanel = memo(({ ref, ...props }: TimePanelProps & { ref?: React.Ref<TimePanelRef | null> }) => {
    const { classPrefix = 'time', referenceElement, ...other } = props;
    const { b, be } = useClassNames(classPrefix);

    const { t } = useLocale();

    const containerRef = useRef<HTMLDivElement>(null);
    const spinnerRef = useRef<SpinnerRef>(null);

    const reference = useMemo(() => (referenceElement instanceof Function ? referenceElement() : referenceElement) ?? { current: null }, [referenceElement]);

    useImperativeHandle(ref, () => ({
        get ref() {
            return containerRef.current;
        },
        adjustSpinners: spinnerRef.current.adjustSpinners,
    }));

    useClickOutside(
        reference,
        () => {
            // spinnerDate.current = null;
            props?.onDestroy?.();
        },
        {
            enabled: true,
            shouldIgnore: event => {
                if (event instanceof MouseEvent && containerRef.current) {
                    const elements = event.composedPath();
                    return event.button !== 0 || containerRef.current === event.target || elements.includes(containerRef.current);
                }
                return false;
            },
        },
    );

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
                    {t('el.datepicker.cancel')}
                </button>
                <button className={classNames(be('panel', 'btn'), 'confirm')} onClick={() => props.onOk?.()}>
                    {t('el.datepicker.confirm')}
                </button>
            </div>
        </div>
    );
});

export default TimePickerPanel;
