import classNames from 'classnames';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import max from 'lodash/max';
import omit from 'lodash/omit';
import trim from 'lodash/trim';
import React, { FC, RefObject, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { Divider } from '../Divider';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import { InputRef } from '../Input/typings';
import Popper from '../Popper/Popper';
import { PopperOptionRef } from '../Popper/typings';
import Tag from '../Tag/Tag';
import Tooltip from '../Tooltip/Tooltip';
import { isEmpty, isNotEmpty, mergeDefaultProps } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { CascaderContext } from './CascaderContext';
import CascaderDropdown from './CascaderDropdown';
import CascaderMenu, { CascaderMenuRef } from './CascaderMenu';
import { toArray } from './Utils';
import { CascaderProps, CascaderRef, OptionNode } from './typings';
import { useCascader } from './useCascader';

const Cascader: FC<CascaderProps> = memo(
    forwardRef((props: CascaderProps, ref?: RefObject<CascaderRef>) => {
        const { locale } = useConfigProvider();
        const { t } = useTranslation();

        props = mergeDefaultProps(
            {
                separator: '/',
                showAllLevels: true,
                props: {
                    expandTrigger: 'click',
                    emitPath: true,
                    valueKey: 'value',
                    labelKey: 'label',
                    childrenKey: 'children',
                    disabledKey: 'disabled',
                    leafKey: 'leaf',
                },
                shouldSelect: () => true,
                placeholder: t('el.cascader.placeholder', { lng: locale }) || '请选择',
                collapseTags: true,
                collapseTagsTooltip: true,
                maxCollapseTags: 1,
            },
            props,
        );
        const {
            classPrefix = 'cascader',
            options,
            separator,
            filterable,
            clearable,
            showAllLevels,
            collapseTags,
            maxCollapseTags,
            collapseTagsTooltip,
            collapseTips,
            filterMethod,
            onChange,
            onEnter,
            afterEnter,
            afterLeave,
            props: menuProps,
            shouldSelect,
            labelFormatter,
            error,
            warning,
            ...rest
        } = props;
        const { multiple, valueKey = 'value', labelKey = 'label', childrenKey = 'children', lazy, lazyLoad } = menuProps;
        const { e, b, m, is } = useClassNames(classPrefix);
        const disabled = useDisabled(props.disabled);
        const size = useSize(props.size);
        const [htmlInputProps] = partitionHTMLProps(rest);
        const [transitionProps] = partitionAnimationProps(rest);
        const [popperProps] = partitionPopperPropsUtils(rest);

        // 选择框容器div
        const containerRef = useRef<HTMLDivElement>(null);
        const popperInstRef = useRef<PopperOptionRef>(null);
        const inputRef = useRef<InputRef>(null);
        const searchInstance = useRef<InputRef>(null);
        const menuRefs = useRef<Record<number, CascaderMenuRef>>({});
        const wrapperRef = useRef<HTMLInputElement>(null);
        // 停止懒加载
        const stopLazyRef = useRef(false);
        const lastValueRef = useRef(props.value === undefined ? undefined : toArray(props.value, separator));

        const [controlledValue, setControlledValue, isControlled] = useControlled<string[] | string[][]>(
            props.value === undefined ? undefined : toArray(props.value, separator),
            toArray(props.defaultValue, separator) ?? [],
        );
        const [unControlledValue, setUnControlledValue] = useState(() => controlledValue);

        useEffect(() => {
            if (!isEqual(controlledValue, unControlledValue)) {
                setUnControlledValue(controlledValue);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [controlledValue]);

        const value = useMemo(() => (isControlled ? unControlledValue : controlledValue), [controlledValue, isControlled, unControlledValue]);
        const setValue = useMemo(() => (isControlled ? setUnControlledValue : setControlledValue), [isControlled, setControlledValue]);
        const {
            allLevel,
            storeOptionData,
            getSelectedValue,
            getValueOfLevel,
            getSelectedNode,
            setSelectedNode,
            getSelectedLabel,
            setCheckedNode,
            getCheckedLabel,
            getCheckedValue,
            getCheckedNodes,
            getOptions,
            clearSelected,
            setNodeLeaf,
            getDataType,
            setSelectedValue,
            handleSearch,
            resetNodes,
        } = useCascader(options, props, value);
        const [level, setLevel] = useState(max([value.length - 1, 0]));
        const [loading, setLoading] = useState<string>(null);
        const [forceUpdate, setForceUpdate] = useState<boolean>(false);
        const [filterList, setFilterList] = useState<OptionNode[][]>([]);

        useEffect(() => {
            if (multiple && value.length > 0) {
                setLevel(max([value[0].length - 1, 0]));
            } else {
                setLevel(max([value.length - 1, 0]));
            }
        }, [multiple, value, value.length]);

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
        const [label, setLabel] = useControlled(props.lable, '');
        // 搜索关键词
        const [searchText, setSearchText] = useState('');
        const [visible, setVisible] = useState(false);
        // const [popperStyle, setPopperStyle] = useState<React.CSSProperties>({});
        // 多选时input框高度
        const [inputHeight, setInputHeight] = useState(32);
        // 占位符
        const placeholder = useMemo(() => {
            return multiple && isNotEmpty(multiValue) ? '' : props.placeholder;
        }, [multiValue, multiple, props.placeholder]);

        // 打开后搜索框自动获取焦点
        useEffect(() => {
            if (visible && filterable) {
                searchInstance.current.focus();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [visible]);

        const multiLabel = useCallback(() => {
            if (multiple) {
                return getCheckedLabel()?.map(item => item.join(separator));
            }
            return [];
        }, [getCheckedLabel, multiple, separator]);

        const checkedNodes = useCallback(() => {
            if (multiple) {
                return getCheckedNodes() ?? [];
            }
            return [];
        }, [getCheckedNodes, multiple]);

        /** 关闭下拉框后清空搜索项 */
        const handleAfterLeave = useCallback(() => {
            setSearchText('');
            afterLeave?.();
        }, [afterLeave]);

        /**
         * 展开/关闭下拉框
         * @param e
         * @returns
         */
        const onClick = useCallback(
            (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
            (item: OptionNode[]) => {
                const node = last(item);
                setCheckedNode(node.__level, node, false);
                const _value = getCheckedValue() ?? [];
                // setValue(_value);
                onChange?.(_value, node.__level, multiLabel(), getSelectedNode());
                // console.log(_value, node.__level, multiLabel());
                setValue(_value);
                // onChange?.(_value);
            },
            [getCheckedValue, getSelectedNode, multiLabel, onChange, setCheckedNode, setValue],
        );

        /** 重置值 */
        const onClear = useCallback(() => {
            lastValueRef.current = [];
            setValue([]);
            setLabel('');
            setLevel(0);
            clearSelected();
            onChange?.([], allLevel, '', null);
        }, [allLevel, clearSelected, onChange, setLabel, setValue]);

        /** 清除搜索关键词 */
        const onClearSearch = useCallback(event => {
            event?.stopPropagation();
            setSearchText('');
        }, []);

        /** 搜索 */
        const onSearch = useCallback(
            (val: string) => {
                const keywords = trim(val);
                if (keywords === searchText) {
                    return;
                } else if (isEmpty(keywords)) {
                    setSearchText('');
                }

                setSearchText(keywords);
            },
            [searchText],
        );

        const onSelect = useCallback(
            (_level: number, node: OptionNode) => {
                // 懒加载且非叶子节点且没有子节点时进入
                if (lazy && lazyLoad && node.__leaf !== true && !node[childrenKey]) {
                    setSelectedNode(_level, node);
                    new Promise((resolve, reject) => {
                        setLoading(node.__id);
                        lazyLoad({ ...node, level: _level + 1 }, resolve, reject);
                    })
                        .then(({ nodes }: { nodes: object[] }) => {
                            storeOptionData(nodes, _level + 1, node, {});
                            setLoading(null);
                            if (shouldSelect(node, _level)) {
                                setLevel(_level + 1);
                                // if (nodes?.length === 0) {
                                //     setLevel(_level);
                                //     const _label = getSelectedLabel(labelFormatter?.bind(this, _level));
                                //     lastValueRef.current = getSelectedValue();
                                //     setValue(lastValueRef.current);
                                //     setLabel(_label);
                                //     onChange?.(getSelectedValue(), _level, _label);
                                //     setVisible(false);
                                // }
                                // setValue(getSelectedValue());
                                // onChange?.(getSelectedValue(), _level);
                            }
                        })
                        .catch(() => {
                            // 叶子节点，结束懒加载
                            setNodeLeaf(node, true);
                            setLoading(null);
                            if (shouldSelect(node, _level)) {
                                storeOptionData([], _level + 1, node, {});
                                const _label = getSelectedLabel(labelFormatter?.bind(this, _level));
                                lastValueRef.current = getSelectedValue();
                                setValue(lastValueRef.current);
                                setLabel(_label);
                                onChange?.(getSelectedValue(), _level, getSelectedLabel(), getSelectedNode());
                                setVisible(false);
                            }
                        });
                } else {
                    if (shouldSelect(node, _level)) {
                        setForceUpdate(!forceUpdate);
                        if (node.__leaf) {
                            // 最后一级
                            if (menuProps?.multiple) {
                                return;
                            }
                            setSelectedNode(_level, node);
                            const _label = getSelectedLabel(labelFormatter?.bind(this, _level));
                            setLabel(_label);
                            setVisible(false);
                            lastValueRef.current = getSelectedValue();
                            setValue(lastValueRef.current);
                            onChange?.(getSelectedValue(), _level, getSelectedLabel(), getSelectedNode());
                        } else {
                            setSelectedNode(_level, node);
                            if (menuProps?.multiple) {
                                setLevel(_level + 1);
                                // if (level < _level + 1) {
                                // }
                                return;
                            }
                            setLevel(_level + 1);
                            // onChange?.(getSelectedValue(), _level);
                            // 2022-10-20：从其他路径切换到当前值路径时，高亮当前值路径
                            const _val = getSelectedValue();
                            const notMatch = _val.some((item, i) => item !== value?.[i]);
                            if (!notMatch) {
                                value.forEach((item, i) => {
                                    setSelectedValue(i, item);
                                });
                            }
                        }
                    }
                }
            },
            [
                lazy,
                lazyLoad,
                childrenKey,
                setSelectedNode,
                storeOptionData,
                shouldSelect,
                setNodeLeaf,
                getSelectedLabel,
                labelFormatter,
                getSelectedValue,
                setValue,
                setLabel,
                onChange,
                getSelectedNode,
                forceUpdate,
                menuProps?.multiple,
                value,
                setSelectedValue,
            ],
        );

        const onCheckedChange = (_level: number, node: OptionNode, checked: boolean) => {
            setCheckedNode(_level, node, checked);
            const _value = getCheckedValue() ?? [];
            setValue(_value);
            onChange?.(_value, _level, multiLabel(), getCheckedNodes());
            // setForceUpdate(!forceUpdate);
        };

        const stopLazy = useCallback(() => {
            if (stopLazyRef.current === true) {
                stopLazyRef.current = false;
                return true;
            }
            return false;
        }, []);

        /**
         * 循环懒加载（初始化有值时自动加载）
         * @param l
         * @param parent
         */
        const loopLazyLoad = useCallback(
            (l: number, parent: OptionNode, _value: string[] | string[][], { isCover }: { isCover?: boolean }) => {
                const loopCore = (nodes: OptionNode[], _l: number) => {
                    if (stopLazy()) {
                        return;
                    }
                    const curNode = find(nodes, { [valueKey]: _value[_l] });
                    if (curNode) {
                        setSelectedNode(_l, curNode);
                        setLabel(getSelectedLabel(labelFormatter?.bind(this, showAllLevels ? _value.length : allLevel)));
                        loopLazyLoad(_l + 1, curNode, _value, { isCover });
                    }
                };

                if (stopLazy()) {
                    return;
                }

                if (isNotEmpty(_value[l])) {
                    const cacheNodes = getOptions(l);
                    if (cacheNodes?.length > 0) {
                        loopCore(cacheNodes, l);
                    } else {
                        new Promise((resolve, reject) => {
                            lazyLoad({ ...parent, level: l }, resolve, reject);
                        }).then(({ nodes }: { nodes: object[] }) => {
                            const newNodes = storeOptionData(nodes, l, parent, { isCover });
                            loopCore(newNodes, l);
                        });
                    }
                } else {
                    if (multiple) {
                        value.forEach(val => {
                            const curNode = find(getOptions(val.length - 1), { [valueKey]: val[val.length - 1] });
                            if (curNode) {
                                setCheckedNode(val.length - 1, curNode, true);
                            }
                        });
                        // setLabel(getSelectedLabel(labelFormatter?.bind(this, 0)));
                    }
                }
            },
            [
                stopLazy,
                valueKey,
                setSelectedNode,
                setLabel,
                getSelectedLabel,
                labelFormatter,
                showAllLevels,
                allLevel,
                getOptions,
                lazyLoad,
                storeOptionData,
                multiple,
                value,
                setCheckedNode,
            ],
        );

        useEffect(() => {
            setFilterList(handleSearch(searchText));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchText]);

        /** 多选框选择选项后，动态调整input框高度 */
        useEffect(() => {
            if (wrapperRef.current) {
                const height = wrapperRef.current?.clientHeight + 4;
                setInputHeight(height <= 32 ? 32 : height + 32);
            }
            if (popperInstRef.current && popperInstRef.current.update) {
                popperInstRef.current?.update();
            }
        }, [multiValue]);

        const refreshLazy = (isCover = false) => {
            // 懒加载且有默认值时
            if (lazy && lazyLoad) {
                if (value instanceof Array && isNotEmpty(value[0])) {
                    if (multiple) {
                        loopLazyLoad(0, null, (value as string[][])[0], { isCover });
                    } else {
                        loopLazyLoad(0, null, value, { isCover });
                    }
                } else {
                    if (isNotEmpty(lastValueRef.current)) {
                        stopLazyRef.current = true;
                    }
                    setLabel('');
                }
            } else {
                setLabel(getSelectedLabel(labelFormatter?.bind(this, showAllLevels ? value.length : allLevel)));
            }
            popperInstRef.current?.update();
        };

        useEffect(() => {
            popperInstRef.current?.update();
        }, [filterList.length]);

        useEffect(() => {
            refreshLazy(isNotEmpty(value));
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, lazyLoad, options]);

        // useEffect(() => {
        //     refreshLazy(true);
        //     // eslint-disable-next-line react-hooks/exhaustive-deps
        // }, [ lazyLoad]);

        useEffect(() => {
            // 懒加载且没有默认值时
            if (lazy && lazyLoad && isEmpty(value)) {
                new Promise((resolve, reject) => {
                    lazyLoad({ level: 0 }, resolve, reject);
                }).then(({ nodes }: { nodes: object[] }) => {
                    storeOptionData(nodes, 0, null, { isCover: true });
                });
            }
            if (isEmpty(props.lable)) {
                setLabel(getSelectedLabel(labelFormatter?.bind(this, showAllLevels ? value.length : allLevel)));
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [lazyLoad]);

        useImperativeHandle(ref, () => ({
            ref: containerRef,
            input: inputRef,
            setLabel,
            onClear,
            resetNodes: () => {
                resetNodes();
                setLevel(0);
            },
            setVisible,
        }));

        return (
            <CascaderContext.Provider value={{ props: menuProps, onSelect, onCheckedChange, loading, getDataType, searchText }}>
                <div
                    className={classNames(b(), is({ disabled }), m({ [size]: size }), props.className)}
                    style={props.style}
                    ref={containerRef}
                    onClick={event => event.stopPropagation()}
                >
                    <div className={e`trigger`}>
                        {multiple && (
                            <div
                                className={e`tags`}
                                onClick={onClick}
                                onMouseEnter={() => inputRef.current?.showClear(multiple ? multiValue.join(',') : label)}
                                onMouseLeave={() => inputRef.current?.hideClear()}
                            >
                                <div className={classNames(b`tags-wrapper`, 'has-prefix')} ref={wrapperRef}>
                                    {(collapseTags ? checkedNodes().slice(0, maxCollapseTags) : checkedNodes()).map((item, i) => {
                                        return (
                                            <Tag key={i} type="info" closable={!disabled} onClick={onClick} onClose={() => onCloseTag(item)} disableTransitions>
                                                {item.map(node => node[labelKey]).join(separator)}
                                            </Tag>
                                        );
                                    })}
                                    {collapseTags && multiLabel()?.length > maxCollapseTags && (
                                        <Tooltip
                                            popperClass={e`tooltip`}
                                            placement="top"
                                            disabled={!collapseTagsTooltip}
                                            content={
                                                <>
                                                    {checkedNodes()
                                                        .slice(maxCollapseTags, checkedNodes().length)
                                                        .map((item, i) => (
                                                            <Tag key={i} type="info" disableTransitions>
                                                                {item.map(node => node[labelKey]).join(separator)}
                                                            </Tag>
                                                        ))}
                                                </>
                                            }
                                            effect="light"
                                            enterable
                                        >
                                            <Tag type="info" onClick={onClick} disableTransitions>
                                                {collapseTips
                                                    ? collapseTips(multiLabel().length - maxCollapseTags, multiLabel().length)
                                                    : `+ ${multiLabel().length - maxCollapseTags}`}
                                            </Tag>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        )}
                        <Input
                            ref={inputRef}
                            value={multiple ? multiValue.join(separator) : label}
                            placeholder={placeholder}
                            readOnly
                            hiddenValue={multiple}
                            clearable={clearable && !disabled}
                            disabled={disabled}
                            size={size}
                            onClick={onClick}
                            onClear={onClear}
                            plain={props.plain}
                            className={is({ focus: visible })}
                            error={error}
                            warning={warning}
                            innerStyle={multiple ? { height: inputHeight } : {}}
                            suffix={<Icon prefix="fal" name="angle-down" className={visible ? 'fa-rotate-180' : ''} onClick={onClick} />}
                            prefix={props.prefix}
                            append={props.append}
                            prepend={props.prepend}
                            {...omit(htmlInputProps, [
                                'value',
                                'defaultValue',
                                'onInput',
                                'size',
                                'prefix',
                                'onChange',
                                'style',
                                'readOnly',
                                'disabled',
                                'className',
                                'type',
                                'maxLength',
                                'minLength',
                                'name',
                            ])}
                        />
                    </div>
                </div>

                <Popper
                    referenceElement={() => inputRef?.current?.ref}
                    visible={visible}
                    popperInstRef={popperInstRef}
                    popperClass={e`dropdown`}
                    // popperStyle={popperStyle}
                    onDestroy={() => setVisible(false)}
                    onEnter={() => {
                        popperInstRef.current?.update();
                        onEnter?.();
                    }}
                    afterEnter={() => {
                        for (const key in menuRefs.current) {
                            if (Object.prototype.hasOwnProperty.call(menuRefs.current, key)) {
                                const item = menuRefs.current[key];
                                item?.scrollToSelected();
                            }
                        }
                        afterEnter?.();
                    }}
                    afterLeave={handleAfterLeave}
                    placement={'bottom-start'}
                    transitionAppear
                    unmountOnExit
                    {...transitionProps}
                    {...popperProps}
                >
                    <div className={b`panel`}>
                        {filterable && (
                            <div className={e`search`} onClick={event => event.stopPropagation()}>
                                <Input
                                    ref={searchInstance}
                                    placeholder={t('el.select.search', { lng: locale })}
                                    clearable
                                    plain
                                    debounceInput
                                    onClear={onClearSearch}
                                    onChange={onSearch}
                                    prefix={<Icon prefix="fal" name="search" />}
                                />
                                <Divider style={{ margin: 0 }} />
                            </div>
                        )}
                        {isNotEmpty(searchText) ? (
                            <CascaderDropdown options={filterList} separator={separator} value={value} checkedNodes={checkedNodes} />
                        ) : (
                            <div className={e`panels`}>
                                {new Array(level + 1).fill(0).map((_, l) => {
                                    return (
                                        <CascaderMenu
                                            key={getValueOfLevel(l) + '_' + l}
                                            ref={_ref => (menuRefs.current[l] = _ref)}
                                            data={getOptions(l)}
                                            level={l}
                                            value={getValueOfLevel(l)}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </Popper>
            </CascaderContext.Provider>
        );
    }),
);

Cascader.displayName = 'Cascader';

export default Cascader;
