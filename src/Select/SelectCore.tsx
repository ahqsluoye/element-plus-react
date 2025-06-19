import classNames from 'classnames';
import filter from 'lodash/filter';
import find from 'lodash/find';
import max from 'lodash/max';
import min from 'lodash/min';
import omit from 'lodash/omit';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import { InputRef } from '../Input/typings';
import Popper from '../Popper/Popper';
import { PopperOptionRef } from '../Popper/typings';
import { Tag } from '../Tag';
import Tooltip from '../Tooltip/Tooltip';
import { TooltipRef } from '../Tooltip/typings';
import { isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useChildrenInstance, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import SelectDropdown from './SelectDropdown';
import { SelectDropdownRef, SelectOptionGroupProps, SelectOptionProps, SelectProps, SelectRef, ValueType } from './typings';

const SelectCore = forwardRef<SelectRef, SelectProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            placeholder: '请选择',
            noDataText: '无数据',
            noMatchText: '没有找到匹配的结果',
            loadingText: (
                <span>
                    <Icon prefix="fas" name="spinner" spin /> 加载中...
                </span>
            ),
            showArrow: true,
            clearable: true,
            filterable: false,
            error: false,
            required: false,
            disabled: false,
            maxWidth: 500,
            collapseTagsTooltip: true,
            maxCollapseTags: 1,
            tagType: 'info',
            tagEffect: 'light',
        },
        props,
    );
    const { b, e, be, m, is } = useClassNames('select');
    // 选择框容器div
    const containerRef = useRef<HTMLDivElement>(null);
    // 下拉选项容器div
    const contentRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLInputElement>(null);
    const createInputRef = useRef<HTMLInputElement>(null);
    const popperInstRef = useRef<PopperOptionRef>(null);
    const selectDropdownRef = useRef<SelectDropdownRef>(null);
    const inputInstance = useRef<InputRef>(null);
    const searchInstance = useRef<InputRef>(null);
    const tagTooltipRef = useRef<TooltipRef>(null);

    const {
        filterable,
        clearable,
        error,
        warning,
        multiple,
        collapseTags = false,
        maxCollapseTags,
        collapseTagsTooltip,
        tagType,
        tagEffect,
        showArrow,
        collapseTips,
        filterMethod,
        onChange,
        allowCreate,
        onEnter,
        afterLeave,
        prepend,
        append,
        onLoadSuccess,
        onVisibleChange,
        onRemoveTag,
        onClear: onClearProp,
        ...rest
    } = props;
    const [htmlInputProps] = partitionHTMLProps(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const [popperProps] = partitionPopperPropsUtils(rest);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [createItem, setCreateItem] = useState<string>('');
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

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
    // 单选框显示文本
    const [label, setLabel] = useState('');

    const [visible, setVisible] = useState(false);
    const [popperStyle, setPopperStyle] = useState<React.CSSProperties>({});
    // 多选时input框高度
    const [inputHeight, setInputHeight] = useState(32);
    // 占位符
    const placeholder = useMemo(() => {
        return (multiple && isNotEmpty(multiValue)) || isNotEmpty(createItem) ? '' : props.placeholder;
    }, [createItem, multiValue, multiple, props.placeholder]);

    /** 获取所有的option组件 */
    const getOptionInstance = useChildrenInstance<SelectOptionGroupProps | SelectOptionProps, SelectOptionProps>('ElOption', 'ElOptionGroup');

    const optionData = useMemo(() => {
        if (props.children) {
            const componentChildren: React.ReactElement<SelectOptionProps>[] = getOptionInstance(props.children);

            return componentChildren.map(node => {
                return {
                    label: node.props?.label ?? node.props.value,
                    value: node.props.value,
                };
            });
        }
        return [];
    }, [getOptionInstance, props.children]);

    const multiLabel = useMemo(() => {
        if (multiple) {
            return multiValue.map(item => find(optionData, { value: item })?.label ?? item);
        }
        return [];
    }, [multiValue, multiple, optionData]);

    /** 动态计算下拉框宽度 */
    const handleEnter = useCallback(
        (node: any) => {
            if (visible && contentRef.current && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                // const { width } = contentRef.current.getBoundingClientRect();
                const options = Array.from(contentRef.current.querySelectorAll<HTMLDivElement>(`.${be('dropdown', 'item')}>span`));
                const maxWidth = (options.length > 0 ? max(options.map((item: HTMLDivElement) => item?.offsetWidth ?? 0)) : 0) + 35;
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
                selectDropdownRef.current?.onEnter();
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
    const onClick = useCallback(
        (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event?.stopPropagation();
            if (disabled) {
                setVisible(false);
                return;
            }
            setVisible(!visible);
        },
        [disabled, visible],
    );

    /** 取消多选项 */
    const onCloseTag = useCallback(
        (item: string | number) => {
            const res = filter(multiValue, item1 => item1 !== item);
            setValue(res);
            onChange?.(res, multiLabel);
            onRemoveTag?.(item);
            setTimeout(() => {
                if (tagTooltipRef.current) {
                    tagTooltipRef.current.updatePopper();
                }
            }, 50);
        },
        [multiLabel, multiValue, onChange, onRemoveTag, setValue],
    );

    /** 重置值 */
    const onClear = useCallback(() => {
        setValue(multiple ? [] : '');
        setLabel('');
        selectDropdownRef.current?.hover('');
        onChange?.(multiple ? [] : '', multiple ? [] : '');
        setCreateItem('');
        onClearProp?.();
    }, [multiple, onChange, onClearProp, setValue]);

    /** 选中项回调 */
    const onChoose = useCallback(
        (val: string, text: string, event: any) => {
            event.preventDefault();
            if (isNotEmpty(val)) {
                let result: ValueType = val;
                if (multiple) {
                    if (multiValue.includes(val)) {
                        result = filter(multiValue, item => item !== val);
                    } else {
                        result = [...multiValue, val];
                    }
                } else {
                    // 当选中项不是创建项时，清空创建项
                    if (val !== createItem) {
                        setCreateItem('');
                    }
                }
                setValue(result);
                setLabel(multiple ? '' : text);
                onChange?.(result, multiple ? (result as (string | number)[]).map(item => find(optionData, { value: item })?.label ?? item) : text);
                !multiple && onClick(event);
            } else {
                setVisible(false);
            }
        },
        [multiple, setValue, onChange, multiValue, onClick, createItem, optionData],
    );

    /** 监听加载状态，加载中时自动打开下拉 */
    // useEffect(() => {
    //     setVisible(props.loading);
    //     popperInstRef.current?.update();
    // }, [props.loading]);

    // 打开后搜索框自动获取焦点
    useEffect(() => {
        if (visible && filterable && !allowCreate) {
            searchInstance.current?.focus();
        }
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
            if (wrapperRef.current) {
                const height = wrapperRef.current?.clientHeight + 4;
                setInputHeight(height <= 32 ? 32 : height);
            }
            if (popperInstRef.current && popperInstRef.current.update) {
                popperInstRef.current?.update();
            }
        }, 50);
    }, [multiValue]);

    /** 初次加载时反显选中文本 */
    useEffect(() => {
        const labels = (value instanceof Array ? value : [value])
            .map(item => {
                return find(optionData, { value: item })?.label;
            })
            .filter(item => !!item);
        if (labels.length > 0) {
            setLabel(multiple ? '' : labels.join(','));
        } else {
            if (isNotEmpty(value)) {
                setLabel(value instanceof Array ? value.join(',') : value + '');
            } else {
                setLabel('');
            }
        }
        onLoadSuccess?.(value, labels);
    }, [multiple, onLoadSuccess, optionData, value]);

    useImperativeHandle(ref, () => ({
        popperInstRef,
        selectedLabel: label,
        setLabel,
        inputInstance,
        searchInstance,
        getValue: () => value,
        setValue,
        onClear,
        clear: onClear,
        setVisible,
    }));

    return (
        <div className={classNames(b(), e`default`, is({ disabled }), m({ [size]: size }), props.className)} style={append || prepend ? {} : props.style} ref={containerRef}>
            <div className={e`trigger`}>
                {multiple && (
                    <div
                        className={e`tags`}
                        onMouseEnter={() => inputInstance.current?.showClear(multiple ? multiValue.join(',') : createItem || label)}
                        onMouseLeave={() => inputInstance.current?.hideClear()}
                    >
                        <div className={classNames(b`tags-wrapper`, 'has-prefix')} onClick={onClick} ref={wrapperRef}>
                            {(collapseTags ? multiLabel.slice(0, maxCollapseTags) : multiLabel).map((item, i) => {
                                return (
                                    <Tag
                                        type={tagType}
                                        key={multiValue[i]}
                                        closable={!disabled}
                                        effect={tagEffect}
                                        onClick={onClick}
                                        onClose={() => onCloseTag(multiValue[i])}
                                        disableTransitions
                                    >
                                        {item}
                                    </Tag>
                                );
                            })}
                            {collapseTags && multiValue?.length > maxCollapseTags && (
                                <Tooltip
                                    ref={tagTooltipRef}
                                    popperClass={e`tooltip`}
                                    placement="top"
                                    disabled={!collapseTagsTooltip}
                                    content={
                                        <>
                                            {multiLabel.slice(maxCollapseTags, multiLabel.length).map((item, i) => (
                                                <Tag
                                                    key={item}
                                                    type={tagType}
                                                    disableTransitions
                                                    closable={!disabled}
                                                    effect={tagEffect}
                                                    onClick={onClick}
                                                    onClose={() => onCloseTag(multiValue[i + maxCollapseTags])}
                                                >
                                                    {item}
                                                </Tag>
                                            ))}
                                        </>
                                    }
                                    effect="light"
                                    enterable
                                >
                                    <Tag type={tagType} onClick={onClick} disableTransitions effect={tagEffect}>
                                        {collapseTips ? collapseTips(multiLabel.length - maxCollapseTags, multiLabel.length) : `+ ${multiLabel.length - maxCollapseTags}`}
                                    </Tag>
                                </Tooltip>
                            )}
                        </div>
                        {/* 创建新的选项 */}
                        {allowCreate && (
                            <input
                                type="text"
                                className={e`input`}
                                style={{ marginLeft: 5, flexGrow: 1, width: '0.111111%', maxWidth: 170 }}
                                ref={createInputRef}
                                onClick={() => setVisible(!visible)}
                                onInput={(event: any) => {
                                    setVisible(true);
                                    setCreateItem(event.target.value);
                                    if (popperInstRef.current && popperInstRef.current.update) {
                                        popperInstRef.current?.update();
                                    }
                                }}
                                onKeyDown={event => {
                                    if (event.key === 'Enter') {
                                        onChoose(createItem, createItem, event);
                                        setCreateItem('');
                                        if (createInputRef.current) {
                                            createInputRef.current.value = '';
                                        }
                                    }
                                }}
                                onBlur={() => {
                                    setTimeout(() => {
                                        setCreateItem('');
                                        if (createInputRef.current) {
                                            createInputRef.current.value = '';
                                        }
                                    }, 200);
                                }}
                            />
                        )}
                    </div>
                )}
                <Input
                    ref={inputInstance}
                    value={multiple ? multiValue.join(',') : createItem || label}
                    hiddenValue={multiple}
                    placeholder={placeholder}
                    readOnly={!allowCreate}
                    clearable={clearable && !disabled}
                    disabled={disabled}
                    onClick={onClick}
                    onClear={onClear}
                    plain={props.plain}
                    className={classNames(is({ active: visible }))}
                    size={size}
                    onChange={val => {
                        setVisible(true);
                        setCreateItem(val + '');
                    }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            onChoose(createItem, createItem, event);
                        }
                    }}
                    onBlur={() => {
                        setTimeout(() => {
                            setCreateItem('');
                        }, 200);
                    }}
                    error={error}
                    warning={warning}
                    innerStyle={multiple ? { height: inputHeight } : {}}
                    suffix={<Icon prefix="fal" name="angle-down" rotate={visible ? 180 : null} onClick={onClick} />}
                    {...omit(htmlInputProps, [
                        'value',
                        'defaultValue',
                        'onInput',
                        'size',
                        'prefix',
                        'onChange',
                        'style',
                        'placeholder',
                        'readOnly',
                        'onKeyDown',
                        'disabled',
                        'className',
                        'type',
                        'name',
                        'minLength',
                        'maxLength',
                    ])}
                />
            </div>

            <Popper
                referenceElement={containerRef}
                visible={visible}
                popperInstRef={popperInstRef}
                popperStyle={popperStyle}
                onDestroy={() => setVisible(false)}
                onEnter={handleEnter}
                afterLeave={handleAfterLeave}
                placement={'bottom-start'}
                transitionAppear
                unmountOnExit
                showArrow={showArrow}
                {...transitionProps}
                {...popperProps}
            >
                <SelectDropdown
                    ref={selectDropdownRef}
                    value={value}
                    searchInstance={searchInstance}
                    createItem={createItem}
                    setCreateItem={setCreateItem}
                    onChoose={onChoose}
                    contentRef={contentRef}
                    createInputRef={createInputRef}
                    popperInstRef={popperInstRef}
                    {...props}
                >
                    {props.children}
                </SelectDropdown>
            </Popper>
        </div>
    );
});

SelectCore.displayName = 'SelectCore';

export default SelectCore;
