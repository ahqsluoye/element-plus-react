/* eslint-disable indent */
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import filter from 'lodash/filter';
import flattenDeep from 'lodash/flattenDeep';
import head from 'lodash/head';
import omit from 'lodash/omit';
import trim from 'lodash/trim';
import React, { RefObject, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { Input, InputGroup, InputRef } from '../Input';
import { Popper, PopperOptionRef } from '../Popper';
import { Scrollbar, ScrollbarRef } from '../Scrollbar';
import { Tag } from '../Tag';
import { CheckInfo, DataNode, DirectoryTree, Key, RCTree } from '../Tree';
import { isEmpty, isNotEmpty } from '../Util';
import { partitionAnimationProps, partitionHTMLProps, partitionPopperPropsUtils, partitionTreePropsUtils, useClassNames, useControlled, useDisabled, useSize } from '../hooks';
import { parentNotSelectable } from './Utils';
import { SelectInfo, TreeSelectProps, TreeSelectRef } from './typings';

function InternalTreeSelect<RecordType extends object = DataNode>(props: TreeSelectProps<RecordType>, ref: RefObject<TreeSelectRef>) {
    props = {
        clearable: true,
        collapseTags: true,
        checkStrictly: true,
        disabled: false,
        selectable: true,
        filterable: true,
        placeholder: '请选择',
        noDataText: '无数据',
        loadingText: (
            <span>
                <Icon prefix="fas" name="spinner" spin /> 加载中...
            </span>
        ),
        fieldNames: { title: 'title', key: 'key', children: 'children' },
        onBeforeClick: () => true,
        ...props,
    };
    const {
        placeholder,
        clearable,
        filterable,
        multiple,
        collapseTags,
        onChange,
        onEnter,
        afterLeave,
        maxWidth,
        fieldNames,
        append,
        prepend,
        warning,
        error,
        loading,
        loadingText,
        noDataText,
        onExpand,
        onLoadSuccess,
        onSelect,
        onBeforeClick,
        onClickNode,
        ...rest
    } = props;
    const { b, e, m, be, is } = useClassNames('select');
    const disabled = useDisabled(props.disabled);
    const size = useSize(props.size);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const [visible, setVisible] = useState(false);
    // 单选框显示文本
    const [label, setLabel] = useState('');
    // 搜索关键词
    const [searchText, setSearchText] = useState('');
    const [expandedKeys, setExpandedKeys] = useState(props.expandedKeys ?? []);
    const [autoExpandParent, setAutoExpandParent] = useState(false);
    // 多选时input框高度
    const [inputHeight, setInputHeight] = useState(32);
    const [popperStyle, setPopperStyle] = useState<React.CSSProperties>({});
    const [checkedNodes, setCheckedNodes] = useState<DataNode[]>([]);

    const groupRef = useRef<HTMLDivElement>();
    // 选择框容器div
    const containerRef = useRef<HTMLDivElement>();
    // 下拉选项容器div
    const contentRef = useRef<HTMLDivElement>();
    const wrapperRef = useRef<HTMLInputElement>();
    const popperInstRef = useRef<PopperOptionRef>();
    const treeRef = useRef<RCTree>();
    const dataList = useRef<any[]>([]);
    const labelRef = useRef<string>();
    const inputInstance = useRef<InputRef>(null);
    const searchInstance = useRef<InputRef>(null);
    const scrollbarRef = useRef<ScrollbarRef>(null);

    const [htmlInputProps] = partitionHTMLProps(rest);
    const [transitionProps] = partitionAnimationProps(rest);
    const [popperProps] = partitionPopperPropsUtils(rest);
    const [treeProps] = partitionTreePropsUtils(rest);

    useEffect(() => {
        labelRef.current = label;
    }, [label]);

    // 打开后搜索框自动获取焦点
    useEffect(() => {
        if (visible && filterable) {
            searchInstance.current.focus();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    const treeData = useMemo(() => {
        return !multiple && !props.checkStrictly ? parentNotSelectable(props.treeData) : props.treeData;
    }, [multiple, props.checkStrictly, props.treeData]);

    const loop = useCallback(
        (data, searchValue, parent) =>
            data.map(item => {
                const index = item[fieldNames.title].indexOf(searchValue);
                const beforeStr = item[fieldNames.title].substring(0, index);
                const afterStr = item[fieldNames.title].slice(index + searchValue.length);
                const title =
                    index > -1 ? (
                        <span>
                            {beforeStr}
                            <span className={b('tree-search-value', false)}>{searchValue}</span>
                            {afterStr}
                        </span>
                    ) : (
                        <span>{item[fieldNames.title]}</span>
                    );
                const newItem = { ...item, parentId: parent ? [parent.parentId, parent[fieldNames.key]].filter(item1 => !!item1).join(',') : '' };
                dataList.current.push(newItem);

                if (item?.[fieldNames.children]?.length > 0) {
                    return {
                        ...item,
                        [fieldNames.title]: title,
                        _title: item[fieldNames.title],
                        [fieldNames.key]: item[fieldNames.key],
                        [fieldNames.children]: loop(item.children, searchValue, newItem).filter(item1 => !!item1),
                        disabled: item.disabled,
                    };
                }

                return index > -1
                    ? {
                          ...item,
                          [fieldNames.title]: title,
                          _title: item[fieldNames.title],
                          [fieldNames.key]: item[fieldNames.key],
                          disabled: item.disabled,
                      }
                    : null;
            }),
        [b, fieldNames.children, fieldNames.key, fieldNames.title],
    );

    const filterTreeData = useMemo(() => {
        if (isEmpty(searchText)) {
            return treeData;
        }
        dataList.current = [];
        if (treeData?.length > 0) {
            const res = loop(treeData, searchText, null);
            return res.filter(item => !!item);
        }
        return [];
    }, [loop, searchText, treeData]);

    const getExpandKeys = useCallback(() => {
        const _expandedKeys = flattenDeep(
            dataList.current.map(item => {
                if (item[fieldNames.title].indexOf(searchText) > -1) {
                    return item.parentId?.split(',') ?? [];
                }
                return null;
            }),
        ).filter((item, i, self) => item && self.indexOf(item) === i);
        setExpandedKeys(_expandedKeys);
        setAutoExpandParent(true);
    }, [fieldNames.title, searchText]);

    /** 搜索时 */
    useEffect(() => {
        popperInstRef.current?.update();
        if (isNotEmpty(searchText)) {
            getExpandKeys();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText, popperStyle]);

    useEffect(() => {
        const flattenNodes = treeRef.current?.flattenTreeData(expandedKeys);
        treeRef.current?.setState({
            expandedKeys,
            flattenNodes,
        });
    }, [expandedKeys]);

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

    const multiLabel = useMemo(() => {
        if (multiple && checkedNodes.length > 0) {
            return checkedNodes.map(item => item[fieldNames.title]?.toString());
        }
        return [];
    }, [checkedNodes, multiple, fieldNames.title]);

    const refreshWidth = useCallback(() => {
        const rect = (append || prepend ? groupRef : containerRef).current?.getBoundingClientRect();
        const width = rect.width > 200 ? rect.width : 200;
        setPopperStyle({
            ...popperStyle,
            width: isEmpty(treeData) ? rect.width : width,
        });
    }, [append, popperStyle, prepend, treeData]);

    const fn = debounce(
        useCallback(() => {
            if (visible && contentRef.current) {
                refreshWidth();
            }
        }, [refreshWidth, visible]),
        200,
    );

    /** 动态计算下拉框宽度 */
    const handleEnter = useCallback(
        node => {
            if (visible && contentRef.current) {
                refreshWidth();
                // treeRef.current.scrollTo({ key: value });
                onEnter?.(node);
            }
        },
        [onEnter, refreshWidth, visible],
    );

    /** 关闭下拉框后清空搜索项 */
    const handleAfterLeave = useCallback(
        node => {
            setSearchText('');
            afterLeave?.(node);
            searchInstance.current.onClear();
        },
        [afterLeave],
    );

    /**
     * 展开/关闭下拉框
     * @param e
     * @returns
     */
    const onClick = useCallback(
        (event: React.MouseEvent<any>) => {
            event.stopPropagation();
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
        item => {
            const res = filter(multiValue, item1 => item1 !== item);
            setCheckedNodes(filter(checkedNodes, item1 => item1.key !== item));
            setValue(res);
            onChange?.(
                res,
                checkedNodes.map(item1 => item1[fieldNames.title]?.toString()),
            );
        },
        [checkedNodes, fieldNames.title, multiValue, onChange, setValue],
    );

    /** 重置值 */
    const onClear = useCallback(() => {
        setValue(multiple ? [] : '');
        setLabel('');
        onChange?.('', '');
    }, [multiple, onChange, setValue]);

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

    /** 选中回调 */
    const handleSelect = useCallback(
        (selectedKeys: Key[], info: SelectInfo<RecordType>) => {
            info.nativeEvent.preventDefault();
            if (multiple) {
                return;
            }
            if (!onBeforeClick?.(info.node, info.nativeEvent)) {
                return;
            }
            // @ts-ignore
            const text = info.node?._title ?? info.node[fieldNames.title]?.toString();
            setLabel(text);
            // @ts-ignore
            setValue(selectedKeys);
            onChange?.(multiple ? selectedKeys : head(selectedKeys), text);
            !multiple && onClick(info.nativeEvent);
            // @ts-ignore
            onSelect?.(selectedKeys, info);
            onClickNode?.(info.node, info.nativeEvent);
        },
        [multiple, onBeforeClick, fieldNames.title, setValue, onChange, onClick, onSelect, onClickNode],
    );

    const handleCheck = useCallback(
        (checked: { checked: Key[]; halfChecked: Key[] } | Key[], info: CheckInfo<DataNode>) => {
            // @ts-ignore
            setValue(checked);
            setCheckedNodes(info.checkedNodes);
            setLabel('');
            onChange?.(
                checked instanceof Array ? checked : checked?.checked,
                info.checkedNodes.map(item => item[fieldNames.title]),
            );
        },
        [fieldNames.title, onChange, setValue],
    );

    /** 多选框选择选项后，动态调整input框高度 */
    useEffect(() => {
        const height = wrapperRef?.current?.clientHeight + 4;
        setInputHeight(height < 32 ? 32 : height);
        popperInstRef?.current?.update();
    }, [multiValue]);

    useEffect(() => {
        window.addEventListener('resize', fn);
        return () => {
            window.removeEventListener('resize', fn);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const { selectedKeys = [], keyEntities = {}, fieldNames: _fieldNames = {} } = treeRef.current?.state ?? {};
        if (isEmpty(labelRef.current) && isNotEmpty(selectedKeys)) {
            const labels = selectedKeys
                .filter(item => isNotEmpty(item))
                .map(item => {
                    return keyEntities[item]?.node[_fieldNames.title] ?? null;
                });
            if (labels.length > 0) {
                setLabel(labels.join(','));
            }
            onLoadSuccess?.(value, labels);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeData]);

    useImperativeHandle(ref, () => ({
        popperInstRef: popperInstRef.current,
        label,
        setLabel,
        inputInstance: inputInstance.current,
        searchInstance: searchInstance.current,
        getValue: () => value,
        setValue,
        onClear,
        setVisible,
    }));

    const content = useMemo(
        () => (
            <div
                className={classNames(b(), m({ [size]: size }), is({ disabled }), props.className)}
                style={append || prepend ? null : props.style}
                ref={append || prepend ? groupRef : containerRef}
            >
                <div className={e`trigger`}>
                    {multiple && (
                        <div className={e`tags`}>
                            <div className={classNames(b`tags-wrapper`, 'has-prefix')} onClick={onClick} ref={wrapperRef}>
                                {(collapseTags ? multiLabel.slice(0, 1) : multiLabel).map((item, i) => {
                                    return (
                                        <Tag type="info" onClick={onClick} onClose={() => onCloseTag(multiValue[i])}>
                                            {item}
                                        </Tag>
                                    );
                                })}
                                {collapseTags && multiValue?.length > 1 && (
                                    <Tag type="info" onClick={onClick}>
                                        {`+ ${multiValue.length - 1}`}
                                    </Tag>
                                )}
                            </div>
                        </div>
                    )}
                    <Input
                        value={label}
                        placeholder={placeholder}
                        readOnly
                        clearable={clearable && !disabled}
                        disabled={disabled}
                        size={size}
                        onClick={onClick}
                        onClear={onClear}
                        plain={props.plain}
                        className={is({ active: visible })}
                        error={error}
                        warning={warning}
                        innerStyle={multiple ? { height: inputHeight } : {}}
                        suffix={<Icon prefix="fal" name="angle-down" className={visible ? 'fa-rotate-180' : ''} onClick={onClick} />}
                        ref={inputInstance}
                        {...omit(htmlInputProps, ['onInput', 'disabled', 'size', 'prefix', 'onChange', 'style'])}
                    />
                </div>

                <Popper
                    referenceElement={append || prepend ? groupRef : containerRef}
                    visible={visible}
                    popperStyle={popperStyle}
                    popperInstRef={popperInstRef}
                    onDestroy={() => setVisible(false)}
                    onEnter={handleEnter}
                    afterLeave={handleAfterLeave}
                    placement={'bottom-start'}
                    transitionAppear
                    {...transitionProps}
                    {...popperProps}
                >
                    <div className={classNames(b`dorpdown`, is({ multiple }))} onClick={event => event.stopPropagation()} ref={contentRef}>
                        <>
                            {filterable && (
                                <div className={e('search')} onClick={event => event.stopPropagation()}>
                                    <Input
                                        // value={searchText}
                                        ref={searchInstance}
                                        style={{ width: '100%' }}
                                        placeholder="请输入关键词"
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
                            <Scrollbar ref={scrollbarRef} wrapClass={be('dropdown', 'wrap')} viewClass={be('dropdown', 'list')}>
                                {filterTreeData?.length === 0 || loading ? (
                                    <li className={classNames(be('dropdown', 'item'), 'no-data')} key="no-data" onClick={() => setVisible(false)}>
                                        {loading ? loadingText : noDataText}
                                    </li>
                                ) : (
                                    <DirectoryTree
                                        ref={treeRef}
                                        // height={filterable ? 240 : 248}
                                        selectedKeys={value instanceof Array ? (value as Key[]) : [value]}
                                        checkedKeys={value instanceof Array ? (value as Key[]) : [value]}
                                        // defaultExpandedKeys={value instanceof Array ? value : [value]}
                                        treeData={filterTreeData}
                                        checkable={multiple}
                                        showIcon={false}
                                        // @ts-ignore
                                        onSelect={handleSelect}
                                        onCheck={handleCheck}
                                        fieldNames={fieldNames}
                                        onExpand={(_expandedKeys, info) => {
                                            onExpand?.(_expandedKeys, info);
                                            // setExpandedKeys(_expandedKeys);
                                            setAutoExpandParent(false);
                                            setTimeout(() => {
                                                popperInstRef.current?.update();
                                                scrollbarRef.current?.update();
                                            }, 200);
                                        }}
                                        // expandedKeys={expandedKeys}
                                        autoExpandParent={autoExpandParent}
                                        {...omit(treeProps, [
                                            'checkStrictly',
                                            'expandedKeys',
                                            'selectedKeys',
                                            'checkedKeys',
                                            'treeData',
                                            'checkable',
                                            'showIcon',
                                            'onSelect',
                                            'onCheck',
                                        ])}
                                    />
                                )}
                            </Scrollbar>
                        </>
                    </div>
                </Popper>
            </div>
        ),
        [
            b,
            m,
            size,
            is,
            disabled,
            props.className,
            props.style,
            props.plain,
            append,
            prepend,
            e,
            multiple,
            onClick,
            collapseTags,
            multiLabel,
            multiValue,
            label,
            placeholder,
            clearable,
            onClear,
            visible,
            error,
            warning,
            inputHeight,
            htmlInputProps,
            popperStyle,
            handleEnter,
            handleAfterLeave,
            transitionProps,
            popperProps,
            filterable,
            onClearSearch,
            onSearch,
            be,
            filterTreeData,
            loading,
            loadingText,
            noDataText,
            value,
            handleSelect,
            handleCheck,
            fieldNames,
            autoExpandParent,
            treeProps,
            onCloseTag,
            onExpand,
        ],
    );

    if (append || prepend) {
        return (
            <InputGroup prepend={prepend} append={append} ref={groupRef} style={props.style}>
                {content}
            </InputGroup>
        );
    } else {
        return content;
    }
}

const ForwardTreeSelect = forwardRef(InternalTreeSelect) as <RecordType extends object = any>(
    props: TreeSelectProps<RecordType> & { ref?: RefObject<TreeSelectRef> },
) => React.ReactElement;

type InternalDirectoryTreeType = typeof ForwardTreeSelect;

interface DirectoryTreeSelectInterface extends InternalDirectoryTreeType {
    displayName?: string;
    defaultProps?: Partial<TreeSelectProps<any>>;
}

const TreeSelect = ForwardTreeSelect as DirectoryTreeSelectInterface;

TreeSelect.displayName = 'TreeSelect';

export default TreeSelect;
