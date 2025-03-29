import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';
import isEqual from 'lodash/isEqual';
import last from 'lodash/last';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Key } from '../Tree';
import { isEmpty, isNotEmpty, randomCode } from '../Util';
import { CascaderProps, OptionNode } from './typings';

export const useCascader = (initialData: object[], props: CascaderProps, value: string[] | string[][]) => {
    const { props: menuProps, showAllLevels, separator } = props;
    const { childrenKey = 'children', valueKey = 'value', labelKey = 'label', leafKey = 'leaf', lazy } = menuProps;
    // 展开层级数
    const [allLevel, setAllLevel] = useState(0);
    // 缓存每层组件类型
    const [dataTypes, setDataTypes] = useState([]);
    // 缓存每层组件类型（同上）
    const _dataTypes = useRef([]);
    // 缓存每层平铺数据
    const [optionData, setOptionData] = useState<Record<string, OptionNode[]>>({});
    // 缓存每层平铺数据（同上）
    const _optionData = useRef<Record<string, OptionNode[]>>({});
    // 选中的数据组
    const selectedValue = useRef<string[]>([]);
    // 选中的数据标签组
    const selectedLabel = useRef<string[]>([]);
    // 选中的节点组
    const selectedNode = useRef<OptionNode[]>([]);
    // 选中的节点组（多选）
    const checkedNodes = useRef<OptionNode[][]>([]);
    // 树组件扩展keys
    const expandKeys = useRef<Record<string, Key[]>>({});

    /**
     * 初始化时分离不同层级的数据
     * @param nodes
     * @param level 层级
     */
    const init = useCallback(
        (nodes: object[] = [], level: number, pid = '0') => {
            nodes.forEach((item: OptionNode) => {
                const __id = randomCode(11);
                if (Object.prototype.hasOwnProperty.call(item, childrenKey)) {
                    init(item[childrenKey], level + 1, __id);
                }
                if (_optionData.current[`level${level}`] === undefined) {
                    _optionData.current[`level${level}`] = [];
                }
                Object.assign(item, {
                    __level: level,
                    __id,
                    __pId: pid,
                    __leaf: item[leafKey] ?? !Object.prototype.hasOwnProperty.call(item, childrenKey) ?? false,
                    __checked: false,
                    __indeterminate: false,
                });
                _optionData.current[`level${level}`].push(item);
            });
            return _optionData.current;
        },
        [childrenKey, leafKey],
    );

    /**
     * 设置任意层级节点的值
     * @param level 层级
     * @param value
     */
    const setSelectedValue = useCallback((level: number, val: string) => {
        selectedValue.current = selectedValue.current.map((item, l) => {
            if (l < level) {
                return item;
            } else if (level === l) {
                return val;
            } else {
                return null;
            }
        });
    }, []);

    /**
     * 设置任意层级节点的标签
     * @param level 层级
     * @param value
     */
    const setSelectedLabel = useCallback((level: number, val: string) => {
        selectedLabel.current = selectedLabel.current.map((item, l) => {
            if (l < level) {
                return item;
            } else if (level === l) {
                return val;
            } else {
                return null;
            }
        });
    }, []);

    /**
     * 设置任意层级节点的标签
     * @param level 层级
     * @param value
     */
    const setSelectedNode = useCallback(
        (level: number, node: OptionNode) => {
            selectedNode.current = selectedNode.current.map((item, l) => {
                if (l < level) {
                    return item;
                } else if (level === l) {
                    return node;
                } else {
                    return null;
                }
            });
            setSelectedValue(level, node[valueKey]);
            setSelectedLabel(level, node[labelKey]);
        },
        [labelKey, setSelectedLabel, setSelectedValue, valueKey],
    );

    /**
     * 获取选中的值
     * @param level 层级
     * @returns
     */
    const getSelectedValue = useCallback(() => {
        const res = selectedValue.current.filter(item => isNotEmpty(item));
        // if (showAllLevels) {
        //     return cloneDeep(res);
        // } else {
        //     return last(res);
        // }
        return cloneDeep(res);
    }, []);

    /**
     * 获取任意层级选中的值
     * @param level 层级
     * @returns
     */
    const getValueOfLevel = useCallback((level?: number) => {
        if (isNotEmpty(level)) {
            return selectedValue.current[level];
        }
    }, []);

    /**
     * 获取选中的文本
     * @param level 层级
     * @returns
     */
    const getSelectedLabel = useCallback(
        (labelFormatter?: (node?: OptionNode[]) => string) => {
            const res = selectedLabel.current.filter(item => isNotEmpty(item));
            if (showAllLevels) {
                return labelFormatter ? labelFormatter(selectedNode.current.filter(item => isNotEmpty(item))) : res.join(separator);
            } else {
                return labelFormatter ? labelFormatter(selectedNode.current.slice(res.length - 1)) : last(res);
            }
        },
        [separator, showAllLevels],
    );

    const loopCheckedNodes = useCallback((level: number, node: OptionNode, checked: boolean) => {
        _optionData.current = {
            ..._optionData.current,
            [`level${level}`]: (_optionData.current?.[`level${level}`] ?? []).map(item => {
                // 当前节点选中状态变更
                if (item.__id === node.__id) {
                    if (item?.children?.length > 0) {
                        return {
                            ...item,
                            __checked: checked,
                            __indeterminate: false,
                            // 子节点状态同步
                            children: item.children.map(child => ({ ...child, __checked: checked, __indeterminate: false })),
                        };
                    }
                    return { ...item, __checked: checked, __indeterminate: false };
                }
                return item;
            }),
        };
        // 递归将下一级节点列表同步成父级节点状态
        if (node?.children?.length > 0) {
            node.children.forEach(child => {
                loopCheckedNodes(level + 1, child, checked);
            });
        }
    }, []);

    const getParent = useCallback(
        (level: number, node: OptionNode) => {
            const options = (isNotEmpty(optionData) ? optionData : _optionData.current)?.[`level${level - 1}`];
            if (options) {
                const _parent = options.find(item => item.__id === node.__pId);
                return _parent;
            }
            return null;
            // let parent;
            // if (_parent.length > 1) {
            //     _parent.find(item => item?.children?.some(child => child.__id === node.__id));
            // } else if (_parent.length > 0) {
            //     parent = _parent[0];
            // }
        },
        [optionData],
    );

    const loopGetParent = useCallback(
        (level: number, node: OptionNode, result: OptionNode[] = []) => {
            const _parent = getParent(level, node);
            if (_parent) {
                result.push(_parent);
                loopGetParent(level - 1, _parent, result);
            }
            return result;
        },
        [getParent],
    );

    /** 同步父级节点选中状态 */
    const loopParentStatus = useCallback(
        (level: number, node: OptionNode, checked: boolean, indeterminate: boolean) => {
            const val = selectedValue.current[level - 1];
            let parentChecked = checked;
            let parentInterminate = indeterminate;
            if (val) {
                const parent = getParent(level, node);
                if (parent) {
                    _optionData.current = {
                        ..._optionData.current,
                        [`level${level - 1}`]: (_optionData.current?.[`level${level - 1}`] ?? []).map(item => {
                            // 父级节点
                            if (item.__id === parent.__id) {
                                // 父级节点children里状态
                                const _children = item.children.map(child => {
                                    if (child.__id === node.__id) {
                                        return { ...child, __checked: checked, __indeterminate: indeterminate };
                                    }
                                    return child;
                                });
                                // 计算父级节点勾选和半选状态
                                const checkCount = _children.filter(child => child.__checked).length;
                                const indeterminateCount = _children.filter(child => child.__indeterminate).length;
                                parentChecked = checkCount === _children.length;
                                parentInterminate = indeterminateCount > 0 || (checkCount > 0 && checkCount < _children.length);
                                return {
                                    ...item,
                                    __checked: parentChecked,
                                    __indeterminate: parentInterminate,
                                    children: _children,
                                };
                            }
                            return item;
                        }),
                    };
                    loopParentStatus(level - 1, parent, parentChecked, parentInterminate);
                }
            }
        },
        [getParent],
    );

    const loopGetCheckedNodes = useCallback((level: number, nodes: OptionNode[], path: OptionNode[], result) => {
        nodes?.forEach(item => {
            // 只有一级且选中
            if (item.__checked && (!Object.prototype.hasOwnProperty.call(item, 'children') || item.children.length === 0)) {
                result.push([...path, item]);
            } else if (item.__checked || item.__indeterminate) {
                loopGetCheckedNodes(
                    level + 1,
                    item.children.map(child => _optionData.current?.[`level${level + 1}`]?.find(node => node.__id === child.__id)) ?? [],
                    [...path, item],
                    result,
                );
            }
        });
        return result;
    }, []);

    const getCheckedNodes = useCallback(() => {
        const result: OptionNode[][] = [];
        _optionData.current?.['level0']?.forEach(item => {
            // 只有一级且选中
            if (item.__checked && (!Object.prototype.hasOwnProperty.call(item, 'children') || item.children.length === 0)) {
                result.push([item]);
            } else if (item.__checked || item.__indeterminate) {
                loopGetCheckedNodes(1, item.children.map(child => _optionData.current?.['level1']?.find(node => node.__id === child.__id)) ?? [], [item], result);
            }
        });
        return result;
    }, [loopGetCheckedNodes]);

    /**
     * 设置选中节点
     * @param level 层级
     * @param node 当前节点
     * @param checked 是否选中
     */
    const setCheckedNode = useCallback(
        (level: number, node: OptionNode, checked: boolean) => {
            if (isEmpty(_optionData.current)) {
                _optionData.current = optionData;
            }
            loopCheckedNodes(level, node, checked);
            loopParentStatus(level, node, checked, false);
            checkedNodes.current = getCheckedNodes();
            setOptionData(_optionData.current);
        },
        [getCheckedNodes, loopCheckedNodes, loopParentStatus, optionData],
    );

    const getCheckedValue = useCallback(() => {
        return checkedNodes.current.map(nodes => nodes.map(item => item[valueKey] as string));
    }, [valueKey]);

    const getCheckedLabel = useCallback(() => {
        return checkedNodes.current.map(nodes => nodes.map(item => item[labelKey]));
    }, [labelKey]);

    /** 清空值 */
    const clearSelected = useCallback(() => {
        selectedValue.current = new Array(allLevel + 1).fill(null);
        selectedLabel.current = new Array(allLevel + 1).fill(null);
        selectedNode.current = new Array(allLevel + 1).fill(null);
        checkedNodes.current = [];
        for (let i = 0; i <= allLevel; i++) {
            _optionData.current = {
                ..._optionData.current,
                [`level${i}`]: _optionData.current[`level${i}`].map(item => ({ ...item, __checked: false, __indeterminate: false })),
            };
        }
        setOptionData(_optionData.current);
    }, [allLevel]);

    /**
     * 获取任意节点的option数据
     * @param level 层级
     * @returns
     */
    const getOptions = useCallback((level: number) => {
        if (level === 0) {
            return _optionData.current[`level${level}`];
        } else {
            // const options = optionData[`level${level - 1}`];
            const parent = selectedNode.current?.[level - 1];
            if (parent) {
                // console.log(_optionData.current[`level${level}`].filter(item => item.__pId === parent.__id));
                return _optionData.current?.[`level${level}`]?.filter(item => item.__pId === parent.__id);
                // return (options.find(item => item.__id === parent.__id) ?? {})[childrenKey];
            }
            return null;
        }
    }, []);

    /**
     * 懒加载时存储option
     * @param nodes
     * @param level 层级
     */
    const storeOptionData = useCallback(
        (nodes: object[], level: number, parent: OptionNode, { isCover }: { isCover?: boolean }): OptionNode[] => {
            let data = cloneDeep(_optionData.current);

            let newNodes: OptionNode[] = [];
            newNodes = nodes.map((node: object) => ({
                ...node,
                __level: level,
                __id: randomCode(11),
                __pId: parent?.__id ?? '0',
                __leaf: node[leafKey] ?? false,
                __checked: false,
                __indeterminate: false,
            }));

            // 新的层级
            if (isEmpty(data[`level${level}`])) {
                data = {
                    ...data,
                    [`level${level}`]: newNodes,
                };
            } else {
                // 已存在的层级，扩充数组
                data[`level${level}`] = isCover ? newNodes : data[`level${level}`].concat(newNodes);
            }

            // 给非叶子节点添加子节点
            if (level > 0 && parent) {
                const p = find(data[`level${level - 1}`], { __id: parent.__id });
                if (p) {
                    if (isEmpty(p?.[childrenKey])) {
                        p[childrenKey] = newNodes;
                        if (newNodes.length === 0) {
                            p.__leaf = true;
                        }
                    } else {
                        p[childrenKey] = isCover ? newNodes : p[childrenKey].concat(newNodes);
                    }
                }
            }
            setOptionData(data);
            _optionData.current = data;

            if (level > allLevel) {
                setAllLevel(level);
                for (let i = 0; i < level - allLevel; i++) {
                    selectedValue.current.push(null);
                    selectedLabel.current.push(null);
                    selectedNode.current.push(null);
                    setDataTypes(_dataTypes.current);
                }
            } else {
                selectedValue.current[level] = null;
                selectedLabel.current[level] = null;
                selectedNode.current[level] = null;
                const _types = cloneDeep(_dataTypes.current);
                _types[level] = false;
                setDataTypes((_dataTypes.current = _types));
            }
            return data[`level${level}`];
        },
        [allLevel, childrenKey, leafKey],
    );

    /**
     * 设置节点是否为叶子节点
     * @param node
     * @param isLeaf
     */
    const setNodeLeaf = useCallback(
        (node: OptionNode, isLeaf: boolean) => {
            const data = cloneDeep(optionData);
            const _node = find(data[`level${node['__level']}`], { __id: node.__id });
            _node[leafKey] = isLeaf;
            setOptionData(data);
            _optionData.current = data;
        },
        [leafKey, optionData],
    );

    /**
     * 获取数据类型
     * @param level 层级
     * @returns
     */
    const getDataType = useCallback(
        (level: number) => {
            return lazy && dataTypes[level];
        },
        [dataTypes, lazy],
    );

    /**
     * 获取扩展key
     * @param level 层级
     * @returns
     */
    const getExpandedKeys = useCallback((level: number): Key[] => {
        return expandKeys.current[`level${level}`] ?? [];
    }, []);

    /**
     * 设置扩展key
     * @param level 层级
     * @param keys
     * @returns
     */
    const setExpandedKeys = useCallback((level: number, keys: Key[]) => {
        expandKeys.current[`level${level}`] = keys;
    }, []);

    /** 搜索 */
    const handleSearch = useCallback(
        (searchText: string) => {
            const result: OptionNode[][] = [];
            if (isNotEmpty(searchText)) {
                const options = cloneDeep(_optionData.current);
                const regex = new RegExp(searchText, 'gi');

                /**
                 * 递归添加子节点
                 * @param level 层级
                 * @param nodes 子节点
                 * @param path 完整节点
                 * @returns
                 */
                const loopGetMatchNodes = (level: number, nodes: OptionNode[], path: OptionNode[]) => {
                    for (let index = 0; index < nodes.length; index++) {
                        const item = nodes[index];
                        // 最后一级，结束递归
                        if (!Object.prototype.hasOwnProperty.call(item, 'children') || item.children.length === 0) {
                            result.push([...path, item]);
                        } else if (item.children.length > 0) {
                            loopGetMatchNodes(level + 1, item.children ?? [], [...path, item]);
                        }
                        nodes.splice(index, 1);
                        options[`level${level}`].splice(
                            options[`level${level}`].findIndex(node => node.__id === item.__id),
                            1,
                        );
                        index--;
                    }
                    return result;
                };

                for (let i = 0; i <= allLevel; i++) {
                    for (let index = 0; index < options[`level${i}`].length; index++) {
                        const item = options[`level${i}`][index];
                        const res = null !== (item[labelKey] ?? item[valueKey].toString()).match(regex);
                        if (res) {
                            const current = i > 0 ? loopGetParent(i, item, [item]).reverse() : [item];
                            options[`level${i}`].splice(index, 1);
                            if (!Object.prototype.hasOwnProperty.call(item, 'children') || item.children.length === 0) {
                                result.push(current);
                            } else if (item.children.length > 0) {
                                loopGetMatchNodes(i + 1, item.children ?? [], current);
                            }
                            options[`level${i}`].splice(index, 1);
                            options[`level${i}`].splice(
                                options[`level${i}`].findIndex(node => node.__id === item.__id),
                                1,
                            );
                            index--;
                        }
                    }
                }
            }
            return result;
        },
        [allLevel, labelKey, loopGetParent, valueKey],
    );

    const resetNodes = useCallback(() => {
        _optionData.current = Object.keys(_optionData.current).reduce((prev, item) => ({ ...prev, [item]: [] }), {});
        setOptionData(_optionData.current);
        // clearSelected();
    }, []);

    useEffect(() => {
        const data = init(cloneDeep(initialData), 0);
        setOptionData(data);
        const l = Object.keys(data).length;
        if (l > 0) {
            setAllLevel(l - 1);
        }
        // selectedValue.current = new Array(l).fill(null);
        // selectedLabel.current = new Array(l).fill(null);
        // selectedNode.current = new Array(l).fill(null);

        // selectedNode.current.splice(
        //     0,
        //     value.length,
        //     ...value.map((item, i) => {
        //         const res = find(data[`level${i}`], { [valueKey]: item });
        //         return res ?? null;
        //     }),
        // );
        // selectedValue.current.splice(0, value.length, ...value);
        // selectedLabel.current.splice(
        //     0,
        //     value.length,
        //     ...selectedNode.current.map(item => {
        //         return item && item[labelKey] ? item[labelKey] : null;
        //     }),
        // );
        setDataTypes(new Array(l).fill(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.options]);

    const initSelectedValue = (_value: string[]) => {
        selectedValue.current = new Array(allLevel + 1).fill(null);
        selectedLabel.current = new Array(allLevel + 1).fill(null);
        selectedNode.current = new Array(allLevel + 1).fill(null);

        if (_value.length > 0) {
            const _level = _value.length - 1;
            const res = _optionData.current?.[`level${_level}`]?.filter(option => option[valueKey] === _value[_level]);
            if (res?.length > 1) {
                res.forEach(node => {
                    const parents = loopGetParent(node.__level, node, [node]);
                    const path = parents.reverse().map(pa => pa[valueKey]);
                    if (isEqual(path, _value)) {
                        selectedNode.current = parents;
                    }
                });
            } else if (res?.length === 1) {
                selectedNode.current = loopGetParent(_level, res[0], res).reverse();
            }
        }

        selectedValue.current.splice(0, _value.length, ..._value);
        selectedLabel.current.splice(0, _value.length, ...selectedNode.current.map(item => (item && item[labelKey] ? item[labelKey] : null)));
    };

    useEffect(() => {
        if (!lazy && allLevel >= 0) {
            if (props?.props?.multiple) {
                const _value = value.length > 0 ? (value[0] as string[]) : [];
                initSelectedValue(_value);

                if (isEmpty(_optionData.current)) {
                    _optionData.current = cloneDeep(optionData);
                }
                (value as string[][]).forEach(item => {
                    const { length } = item;
                    const _level = length - 1;
                    const res = _optionData.current[`level${_level}`].filter(option => option[valueKey] === item[_level]);
                    if (res.length > 1) {
                        res.forEach(node => {
                            const parents = loopGetParent(node.__level, node, [node]);
                            const path = parents.reverse().map(pa => pa[valueKey]);
                            if (isEqual(path, item)) {
                                loopCheckedNodes(_level, node, true);
                                loopParentStatus(_level, node, true, false);
                            }
                        });
                    } else if (res.length === 1) {
                        loopCheckedNodes(_level, res[0], true);
                        loopParentStatus(_level, res[0], true, false);
                    }
                });
                checkedNodes.current = getCheckedNodes();
                setOptionData(_optionData.current);
            } else {
                initSelectedValue(value as string[]);
            }
        }

        // setDataTypes(new Array(allLevel).fill(null));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, allLevel, props.options]);

    return {
        // eslint-disable-next-line lines-around-comment
        /** 最高层级 */
        allLevel,

        /** 选项数据 */
        optionData,

        /**
         * 懒加载时存储option
         * @param nodes
         * @param level 层级
         */
        storeOptionData,

        /**
         * 获取选中的值
         * @param level 层级
         * @returns
         */
        getSelectedValue,

        /**
         * 获取任意层级选中的值
         * @param level 层级
         * @returns
         */
        getValueOfLevel,

        /**
         * 获取选中的文本
         * @param level 层级
         * @returns
         */
        getSelectedLabel,

        /**
         * 设置任意层级节点的标签
         * @param level 层级
         * @param value
         */
        setSelectedNode,

        setSelectedValue,

        getSelectedNode: () => selectedNode.current,

        /**
         * 设置选中节点
         * @param level 层级
         * @param node 当前节点
         * @param checked 是否选中
         */
        setCheckedNode,

        getCheckedNodes: () => checkedNodes.current,

        getCheckedValue,

        getCheckedLabel,

        loopGetParent,

        /**
         * 获取任意节点的option数据
         * @param level 层级
         * @returns
         */
        getOptions,

        /** 清空值 */
        clearSelected,

        /**
         * 设置节点是否为叶子节点
         * @param node
         * @param isLeaf
         */
        setNodeLeaf,

        /**
         * 获取数据类型
         * @param level 层级
         * @returns
         */
        getDataType,

        /**
         * 获取扩展key
         * @param level 层级
         * @returns
         */
        getExpandedKeys,

        /**
         * 设置扩展key
         * @param level 层级
         * @param keys
         * @returns
         */
        setExpandedKeys,

        handleSearch,

        resetNodes,
    };
};
