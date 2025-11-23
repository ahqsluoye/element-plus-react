import ensureArray from 'lodash/castArray';
import filter from 'lodash/filter';
import max from 'lodash/max';
import min from 'lodash/min';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { PopperOptionRef } from '../Popper/typings';
import { TooltipRef } from '../Tooltip/typings';
import { isEmpty, isNotEmpty, isUndefined, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useChildrenInstance, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { useComposition } from '../hooks/useComposition';
import { OptionData, OptionValue, SelectDropdownRef, SelectOptionGroupProps, SelectOptionProps, SelectProps, ValueType } from './typings';

const useSelect = (props: SelectProps) => {
    const { locale } = useConfigProvider();
    const { t } = useTranslation();

    props = mergeDefaultProps(
        {
            placeholder: t('el.select.placeholder', { lng: locale }),
            noDataText: t('el.select.noData', { lng: locale }),
            noMatchText: t('el.select.noMatch', { lng: locale }),
            loadingText: t('el.select.loading', { lng: locale }),
            showArrow: true,
            clearable: false,
            filterable: false,
            error: false,
            required: false,
            disabled: false,
            maxWidth: 500,
            collapseTagsTooltip: true,
            maxCollapseTags: 1,
            tagType: 'info',
            tagEffect: 'light',
            suffixIcon: 'angle-down',
            clearIcon: 'circle-xmark',
        },
        props,
    );

    const nsSelect = useClassNames('select');
    const { be, is } = nsSelect;
    // 选择框容器div
    const containerRef = useRef<HTMLDivElement>(null);
    // 下拉选项容器div
    const contentRef = useRef<HTMLDivElement>(null);
    const popperInstRef = useRef<PopperOptionRef>(null);
    const selectDropdownRef = useRef<SelectDropdownRef>(null);
    const tagTooltipRef = useRef<TooltipRef>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLInputElement>(null);
    const suffixWrapperRef = useRef<HTMLDivElement>(null);
    // 输入框是否初始化
    const initedRef = useRef(false);

    const {
        filterable,
        clearable,
        clearIcon,
        multiple,
        onChange,
        allowCreate,
        onEnter,
        afterLeave,
        onVisibleChange,
        onRemoveTag,
        onClear: onClearProp,
        labelFormat,
        remote,
        remoteShowSuffix,
        suffixIcon,
        ...rest
    } = props;
    const [htmlInputProps] = partitionHTMLProps(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const [popperProps] = partitionPopperPropsUtils(rest);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    // 单选框显示文本
    const [selected, setSelected] = useState<OptionData | OptionData[]>(null);

    const [visible, setVisible] = useState(false);
    const [popperStyle, setPopperStyle] = useState<React.CSSProperties>({});
    // 多选时input框高度
    const [inputValue, setInputValue] = useState('');
    const cachedOptions = useRef<Map<OptionValue, OptionData>>(new Map());

    /** 获取所有的option组件 */
    const getOptionInstance = useChildrenInstance<SelectOptionGroupProps | SelectOptionProps, SelectOptionProps>('ElOption', 'ElOptionGroup');

    const optionData = useMemo<OptionData[]>(() => {
        if (props.children) {
            const componentChildren: React.ReactElement<SelectOptionProps>[] = getOptionInstance(props.children);

            return componentChildren.map(node => {
                cachedOptions.current.set(node.props.value, {
                    value: node.props.value,
                    label: node.props.label ?? node.props.value,
                    data: node.props.data,
                });
                return {
                    label: node.props?.label ?? node.props.value,
                    value: node.props.value,
                    data: node.props.data,
                };
            });
        }
        return [];
    }, [getOptionInstance, props.children]);

    // 多选框值
    const multiValue = useMemo(() => {
        if (multiple) {
            if (value instanceof Array) {
                return value;
            } else if (typeof value === 'string') {
                return [value];
            }
        }
        return [];
    }, [multiple, value]);

    const multiOptionData = useMemo<OptionData[]>(() => {
        if (multiple) {
            return multiValue.map(item => [...optionData, ...Array.from(cachedOptions.current.values())].find(op => op.value === item)).filter(item => isNotEmpty(item));
        }
        return [];
    }, [multiValue, multiple, optionData]);

    const label = useMemo(() => {
        if (!multiple && selected && !Array.isArray(selected)) {
            return (selected.label ?? selected.value) + '';
        }
        return '';
    }, [multiple, selected]);

    // 占位符
    const placeholder = useMemo(() => {
        let _placeholder = '';
        if ((multiple && isNotEmpty(multiValue)) || isNotEmpty(inputValue)) {
            _placeholder = '';
        }
        if (!allowCreate && filterable && isEmpty(inputValue)) {
            _placeholder = t('el.select.search', { lng: locale });
        }
        if (!_placeholder) {
            _placeholder = props.placeholder;
        }
        return multiple || isEmpty(label) ? _placeholder : label;
    }, [allowCreate, filterable, inputValue, label, locale, multiValue, multiple, props.placeholder, t]);

    const shouldShowPlaceholder = useMemo(() => {
        if (multiple && !isUndefined(value)) {
            return ensureArray(value).length === 0 && !inputValue;
        }
        const _value = Array.isArray(value) ? value[0] : value;
        return filterable || isUndefined(_value) ? !inputValue : true;
    }, [inputValue, filterable, multiple, value]);

    const iconComponent = useMemo(() => (remote && filterable && !remoteShowSuffix ? null : suffixIcon), [filterable, remote, remoteShowSuffix, suffixIcon]);
    const iconReverse = useMemo(() => is({ reverse: !!(iconComponent && visible) }), [iconComponent, is, visible]);

    // const validateState = useMemo(() => formItem?.validateState || '');
    // const validateIcon = useMemo(() => validateState.value && (ValidateComponentsMap[validateState.value] as Component));

    // const multiLabel = useMemo(() => {
    //     if (multiple) {
    //         return multiValue.map(item => find(optionData, { value: item })?.label ?? item);
    //     }
    //     return [];
    // }, [multiValue, multiple, optionData]);

    const showClearBtn = useCallback(
        (show: boolean) => {
            if (show && clearable && !disabled && isNotEmpty(value)) {
                suffixWrapperRef.current?.classList.add(nsSelect.is('hidden-arrow'));
                suffixWrapperRef.current?.classList.remove(nsSelect.is('hidden-clear'));
            } else {
                suffixWrapperRef.current?.classList.remove(nsSelect.is('hidden-arrow'));
                suffixWrapperRef.current?.classList.add(nsSelect.is('hidden-clear'));
            }
        },
        [clearable, disabled, nsSelect, value],
    );

    const setInputHovering = useCallback(
        (hovering: boolean) => {
            if (!disabled) {
                if (wrapperRef.current) {
                    if (hovering) {
                        wrapperRef.current.classList.add(nsSelect.is('hovering'));
                        showClearBtn(true);
                    } else {
                        wrapperRef.current.classList.remove(nsSelect.is('hovering'));
                        if (wrapperRef.current.classList.contains(nsSelect.is('focused'))) {
                            showClearBtn(true);
                        } else {
                            showClearBtn(false);
                        }
                    }
                }
            }
        },
        [disabled, nsSelect, showClearBtn],
    );

    const setIsFocused = useCallback(
        (focused: boolean) => {
            if (wrapperRef.current) {
                if (focused) {
                    wrapperRef.current.classList.add(nsSelect.is('focused'));
                    showClearBtn(true);
                } else {
                    wrapperRef.current.classList.remove(nsSelect.is('focused'));
                    if (wrapperRef.current.classList.contains(nsSelect.is('hovering'))) {
                        showClearBtn(true);
                    } else {
                        showClearBtn(false);
                    }
                }
            }
        },
        [nsSelect, showClearBtn],
    );

    const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = useComposition({
        afterComposition: event => {
            setInputValue((event.target as HTMLInputElement).value);
        },
    });

    /** 动态计算下拉框宽度 */
    const handleEnter = useCallback(
        (node: any) => {
            if (visible && contentRef.current && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // const { width } = contentRef.current.getBoundingClientRect();
                const options = Array.from(contentRef.current.querySelectorAll<HTMLDivElement>(`.${be('dropdown', 'item')}>span`));
                const maxWidth = (options.length > 0 ? max(options.map((item: HTMLDivElement) => item?.offsetWidth ?? 0)) : 0) + 60;
                if (maxWidth && maxWidth < rect.width) {
                    setPopperStyle({
                        ...popperStyle,
                        width: rect.width,
                    });
                } else {
                    setPopperStyle({
                        ...popperStyle,
                        width: min([maxWidth, props.maxWidth]),
                    });
                }
                selectDropdownRef.current?.scrollToSelected();
                onEnter?.(node);
            }
        },
        [be, onEnter, popperStyle, props.maxWidth, visible],
    );

    /** 关闭下拉框后清空搜索项 */
    const handleAfterLeave = useCallback(
        (node?: any) => {
            selectDropdownRef.current?.clear();
            afterLeave?.(node);
        },
        [afterLeave],
    );

    /**
     * 展开/关闭下拉框
     * @param e
     * @returns
     */
    const toggleMenu = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event?.stopPropagation();
            if (disabled) {
                setVisible(false);
                return;
            }
            setVisible(!visible);
            setIsFocused(!visible);
        },
        [disabled, setIsFocused, visible],
    );

    /** 取消多选项 */
    const onCloseTag = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>, item: OptionData) => {
            event.stopPropagation();
            const res = multiValue.filter(val => val !== item.value);
            setValue(res);
            onChange?.(
                res,
                multiOptionData.filter(val => val.value !== item.value),
            );
            onRemoveTag?.(item);
            setTimeout(() => {
                if (tagTooltipRef.current) {
                    tagTooltipRef.current.updatePopper();
                }
            }, 50);
        },
        [multiOptionData, multiValue, onChange, onRemoveTag, setValue],
    );

    /** 重置值 */
    const onClear = useCallback(
        (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
            event.stopPropagation();
            event.preventDefault();
            setValue(multiple ? [] : '');
            setSelected(null);
            selectDropdownRef.current?.hover('');
            onChange?.(multiple ? [] : '');
            onClearProp?.();
            setInputValue('');
            showClearBtn(false);
            setVisible(false);
        },
        [multiple, onChange, onClearProp, setValue, showClearBtn],
    );

    /** 选中项回调 */
    const onChoose = useCallback(
        (val: string, data: OptionData, event?: any) => {
            event.preventDefault();
            if (isNotEmpty(val)) {
                let result: ValueType = val;
                let multiData: OptionData[] = [];
                if (multiple) {
                    if (multiValue.includes(val)) {
                        result = filter(multiValue, item => item !== val);
                        multiData = multiOptionData.filter(item => item.value !== val);
                    } else {
                        result = [...multiValue, val];
                        multiData = [...multiOptionData, data];
                    }
                    setSelected(multiData);
                } else {
                    setSelected(data);
                }
                if (allowCreate && isNotEmpty(inputValue)) {
                    setInputValue('');
                    cachedOptions.current.set(inputValue, {
                        value: inputValue,
                        label: inputValue,
                        data: { value: inputValue, label: inputValue },
                    });
                    setIsFocused(false);
                    inputRef.current?.blur();
                }
                setValue(result);
                onChange?.(result, multiple ? multiData : data);
                !multiple && toggleMenu(event);
            } else {
                setVisible(false);
            }
            if (!multiValue) {
                setInputValue('');
            }
        },
        [multiValue, multiple, allowCreate, inputValue, setValue, onChange, toggleMenu, multiOptionData, setIsFocused],
    );

    /** 监听加载状态，加载中时自动打开下拉 */
    // useEffect(() => {
    //     setVisible(props.loading);
    //     popperInstRef.current?.update();
    // }, [props.loading]);

    // 打开后搜索框自动获取焦点
    useEffect(() => {
        onVisibleChange?.(visible);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    /** 搜索时 */
    useEffect(() => {
        if (popperInstRef.current && popperInstRef.current.update) {
            popperInstRef.current?.update();
        }
    }, [popperStyle]);

    /** 多选框选择选项后，动态调整input框高度 */
    useEffect(() => {
        setTimeout(() => {
            if (popperInstRef.current && popperInstRef.current.update) {
                popperInstRef.current?.update();
            }
        }, 50);
    }, [multiValue]);

    /** 初次加载时反显选中文本 */
    useEffect(() => {
        if (initedRef.current) {
            return;
        }
        if (multiple && Array.isArray(value)) {
            setSelected(multiOptionData.filter(item => value.includes(item.value)));
            initedRef.current = true;
        } else {
            if (isNotEmpty(value)) {
                const data = optionData.find(item => item.value === value);
                setSelected(data);
                initedRef.current = true;
            } else {
                setSelected(null);
                initedRef.current = true;
            }
        }
    }, [value]);

    return {
        ...rest,
        nsSelect,
        containerRef,
        contentRef,
        wrapperRef,
        popperInstRef,
        selectDropdownRef,
        tagTooltipRef,
        inputRef,
        suffixWrapperRef,
        inputValue,
        setInputHovering,
        setInputValue,
        setIsFocused,
        filterable,
        clearable,
        clearIcon,
        multiple,
        onChange,
        allowCreate,
        onEnter,
        afterLeave,
        onVisibleChange,
        onRemoveTag,
        htmlInputProps,
        transitionProps,
        popperProps,
        value,
        setValue,
        disabled,
        size,
        optionData,
        multiValue,
        multiOptionData,
        selected,
        label,
        visible,
        setVisible,
        popperStyle,
        placeholder,
        shouldShowPlaceholder,
        handleEnter,
        handleAfterLeave,
        toggleMenu,
        onCloseTag,
        onClear,
        onChoose,
        labelFormat,
        iconComponent,
        iconReverse,
        isComposing,
        remote,
        handleCompositionStart,
        handleCompositionUpdate,
        handleCompositionEnd,
    };
};

export default useSelect;
