/* eslint-disable indent */
import classNames from 'classnames';
import flattenDeep from 'lodash/flattenDeep';
import React, { forwardRef, memo, useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Scrollbar, ScrollbarRef } from '../Scrollbar';
import { RCTree } from '../Tree';
import { isNotEmpty } from '../Util';
import { useClassNames } from '../hooks';
import { CascaderContext } from './CascaderContext';
import { OptionNode } from './typings';

interface Props {
    data: OptionNode[];
    level: number;
    value: string;
}

export interface CascaderMenuRef {
    scrollToSelected: () => void;
}

/**
 * @author	Parker
 * @CreateTime	2022/4/17 14:14:01
 * @LastEditor	Parker
 * @ModifyTime	2025/2/22 16:22:21
 * @Description
 */
const CascaderMenu = memo(
    forwardRef<CascaderMenuRef, Props>((props, ref) => {
        const { data = [], level, value } = props;
        const { menuProps, treeMenuProps, onSelect, onCheckedChange, getDataType, loading, getExpandedKeys, searchText } = useContext(CascaderContext);
        const { valueKey = 'value', labelKey = 'label', disabledKey = 'disabled', multiple } = menuProps;
        const { valueKey: treeValueKey = 'key', labelKey: treeLabelKey = 'title', childrenKey: treeChildrenKey } = treeMenuProps;
        const { b, be, is } = useClassNames('cascader');
        const treeRef = useRef<RCTree>();
        const dataList = useRef<any[]>([]);
        const ulRef = useRef<ScrollbarRef>(null);

        const isTree = useMemo(() => {
            return getDataType(level);
        }, [getDataType, level]);

        const fieldNames = useMemo(() => {
            return { title: treeLabelKey, key: treeValueKey, children: treeChildrenKey };
        }, [treeChildrenKey, treeLabelKey, treeValueKey]);

        const loop = useCallback(
            (_data, searchValue, parent) =>
                _data.map(item => {
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

        const expandByKeys = useCallback(expandedKeys => {
            const flattenNodes = treeRef.current?.flattenTreeData(expandedKeys);
            treeRef.current?.setState({
                expandedKeys,
                flattenNodes,
            });
        }, []);

        const getExpandKeys = useCallback(() => {
            if (isTree) {
                const _expandedKeys = flattenDeep(
                    dataList.current.map(item => {
                        if (item[fieldNames.title].indexOf(searchText) > -1) {
                            return item.parentId?.split(',') ?? [];
                        }
                        return null;
                    }),
                ).filter((item, i, self) => item && self.indexOf(item) === i);
                // setAutoExpandParent(true);
                expandByKeys(_expandedKeys);
                // setExpandedKeys(level, _expandedKeys);
            }
        }, [expandByKeys, fieldNames.title, isTree, searchText]);

        const scrollToSelected = useCallback(() => {
            if (ulRef.current?.resizeRef?.current) {
                const node = ulRef.current.resizeRef.current.querySelectorAll('.in-active-path');
                if (node && node.length > 0) {
                    setTimeout(() => {
                        scrollIntoView(node[0], {
                            scrollMode: 'if-needed',
                            block: 'center',
                        });
                    }, 150);
                }
            }
        }, []);

        /** 搜索时 */
        useEffect(() => {
            if (isTree && isNotEmpty(searchText)) {
                getExpandKeys();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchText]);

        useEffect(() => {
            if (isTree) {
                const expandedKeys = getExpandedKeys(level);
                expandByKeys(expandedKeys);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        useImperativeHandle(ref, () => ({
            scrollToSelected: () => {
                scrollToSelected();
            },
        }));

        return (
            <Scrollbar
                ref={ulRef}
                tag="ul"
                className={classNames(b`menu`, is('list'))}
                wrapClass={be('menu', 'wrap')}
                viewClass={classNames(be('menu', 'list'), { [b('no-data', false)]: data?.length === 0 })}
            >
                {data?.length > 0 &&
                    data.map(item => {
                        return (
                            <li
                                key={item.__id}
                                className={classNames(
                                    b`node`,
                                    { 'in-active-path': multiple ? item.__checked || item.__indeterminate : value === item[valueKey] },
                                    is({ disabled: item[disabledKey] }),
                                )}
                                onClick={() => {
                                    if (!item[disabledKey]) {
                                        if (menuProps.expandTrigger === 'click' || item.__leaf) {
                                            onSelect?.(level, item);
                                        }
                                    }
                                }}
                                onMouseEnter={() => {
                                    if (menuProps.expandTrigger === 'hover' && !item[disabledKey] && !item.__leaf) {
                                        onSelect?.(level, item);
                                    }
                                }}
                            >
                                {multiple && (
                                    <Checkbox
                                        checked={item.__checked}
                                        indeterminate={item.__indeterminate}
                                        onChange={(checked: boolean) => onCheckedChange?.(level, item, checked)}
                                    />
                                )}
                                <span className={be('node', 'label')}>{item[labelKey]}</span>
                                {!item.__leaf && loading !== item.__id && <Icon name="angle-right" className={be('node', 'postfix')} />}
                                {loading === item.__id && <Icon prefix="fas" name="spinner" spin className={be('node', 'postfix')} />}
                            </li>
                        );
                    })}
                {data?.length === 0 && (loading ? '正在加载数据...' : '暂无数据!')}
            </Scrollbar>
        );
    }),
);

export default CascaderMenu;
