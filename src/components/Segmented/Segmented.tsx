import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { useResizeObserver } from '@qsxy/element-plus-react/hooks/useResizeObserver';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import React, { memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Option, SegmentedComponentProps, SegmentedRef, defaultProps as defaultAliasProps } from './typings';

interface IndicatorState {
    isInit: boolean;
    width: number;
    height: number;
    translateX: number;
    translateY: number;
    focusVisible: boolean;
}

const Segmented = memo(({ ref, ...props }: SegmentedComponentProps & { ref?: React.Ref<SegmentedRef | null> }) => {
    const { direction = 'horizontal', size, disabled, options, block, id, name: nameProp, ariaLabel, onChange, className, style, children } = props;

    const ns = useClassNames('segmented');
    const segmentedSize = useSize(size);
    const _disabled = useDisabled(disabled);
    const segmentedRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState<IndicatorState>({
        isInit: false,
        width: 0,
        height: 0,
        translateX: 0,
        translateY: 0,
        focusVisible: false,
    });
    const [value, setValue] = useControlled<string | number | boolean>(props.value, props.defaultValue);

    const aliasProps = useMemo(() => ({ ...defaultAliasProps, ...props.props }), [props.props]);

    const getValue = useCallback(
        (item: Option) => {
            return isObject(item) ? (item as Record<string, any>)[aliasProps.value] : item;
        },
        [aliasProps.value],
    );

    const getLabel = useCallback(
        (item: Option) => {
            return isObject(item) ? (item as Record<string, any>)[aliasProps.label] : item;
        },
        [aliasProps.label],
    );

    const getDisabled = useCallback(
        (item: Option) => {
            return !!(_disabled || (isObject(item) ? (item as Record<string, any>)[aliasProps.disabled] : false));
        },
        [_disabled, aliasProps.disabled],
    );

    const getSelected = useCallback(
        (item: Option) => {
            return value === getValue(item);
        },
        [value, getValue],
    );

    const getOption = useCallback(
        (val: any) => {
            return options.find(item => getValue(item) === val);
        },
        [options, getValue],
    );

    const updateSelect = useCallback(() => {
        if (!segmentedRef.current) {
            return;
        }

        const selectedItem = segmentedRef.current.querySelector('.is-selected') as HTMLElement;
        const selectedItemInput = segmentedRef.current.querySelector('.is-selected input') as HTMLElement;

        if (!selectedItem || !selectedItemInput) {
            setIndicator(prev => ({
                ...prev,
                width: 0,
                height: 0,
                translateX: 0,
                translateY: 0,
                focusVisible: false,
            }));
            return;
        }

        setIndicator(prev => ({
            ...prev,
            isInit: true,
        }));

        let focusVisible = false;
        try {
            focusVisible = selectedItemInput.matches(':focus-visible');
        } catch {
            //
        }

        if (direction === 'vertical') {
            setIndicator(prev => ({
                ...prev,
                height: selectedItem.offsetHeight,
                translateY: selectedItem.offsetTop,
                focusVisible,
            }));
        } else {
            setIndicator(prev => ({
                ...prev,
                width: selectedItem.offsetWidth,
                translateX: selectedItem.offsetLeft,
            }));
        }
    }, [direction]);

    const handleChange = useCallback(
        (evt: React.ChangeEvent<HTMLInputElement>, item: Option) => {
            const newValue = getValue(item);
            setValue(newValue);
            onChange?.(newValue);
            (evt.target as HTMLInputElement).checked = value === newValue;
        },
        [getValue, setValue, onChange, value],
    );

    const selectedStyle = useMemo(() => {
        if (direction === 'vertical') {
            return {
                width: '100%',
                height: `${indicator.height}px`,
                transform: `translateY(${indicator.translateY}px)`,
                display: indicator.isInit ? 'block' : 'none',
            };
        }
        return {
            width: `${indicator.width}px`,
            height: '100%',
            transform: `translateX(${indicator.translateX}px)`,
            display: indicator.isInit ? 'block' : 'none',
        };
    }, [direction, indicator]);

    const segmentedCls = classNames(ns.b(), ns.m(segmentedSize), ns.is({ block }), className);

    const selectedCls = classNames(ns.e('item-selected'), ns.is({ disabled: getDisabled(getOption(value)) }), ns.is({ 'focus-visible': indicator.focusVisible }));

    const name = nameProp || id;
    const domId = id;

    useResizeObserver(segmentedRef, updateSelect);

    useEffect(() => {
        updateSelect();
    }, [options]);

    useEffect(() => {
        updateSelect();
    }, [value]);

    useImperativeHandle(ref, () => ({
        updateSelect,
    }));

    return (
        <div id={domId} ref={segmentedRef} className={segmentedCls} role="radiogroup" aria-label={ariaLabel || 'segmented'} style={style}>
            <div className={classNames(ns.e('group'), ns.m(direction))}>
                <div style={selectedStyle} className={selectedCls} />
                {options.map((item, index) => {
                    let label = getLabel(item);
                    if (children) {
                        if (children && typeof children === 'function') {
                            label = children(item);
                        } else {
                            label = children;
                        }
                    }
                    const isDisabled = getDisabled(item);
                    const isSelected = getSelected(item);
                    const itemCls = classNames(ns.e('item'), ns.is({ selected: isSelected, disabled: isDisabled }));

                    return (
                        <label key={index} className={itemCls}>
                            <input className={ns.e('item-input')} type="radio" name={name} disabled={isDisabled} checked={isSelected} onChange={e => handleChange(e, item)} />
                            <div className={ns.e('item-label')}>{label}</div>
                        </label>
                    );
                })}
            </div>
        </div>
    );
});

Segmented.displayName = 'ElSegmented';

export default Segmented;
