import { treeAllProps } from '@qsxy/element-plus-react/hooks/treePropsUtils';
import { OptionData, SelectRef } from '@qsxy/element-plus-react/Select/typings';
import { default as TreeNode } from '@qsxy/element-plus-react/Tree/model/node';
import { TreeKey, TreeNodeData, TreeNodeRef, TreeRef } from '@qsxy/element-plus-react/Tree/typings';
import { escapeStringRegexp, isEmpty, isFunction, nextTick } from '@qsxy/element-plus-react/Util/base';
import isEqual from 'lodash/isEqual';
import isNil from 'lodash/isNil';
import pick from 'lodash/pick';
import React, { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import TreeSelectOption from './TreeSelectOption';
import { CacheOption, TreeSelectProps } from './typings';
import { isValidArray, isValidValue, toValidArray, treeEach, treeFind } from './Utils'; // 假设工具函数已存在

const useTree = (
    props: TreeSelectProps,
    { selectRef, treeRef, key, value, setValue }: { selectRef: RefObject<SelectRef>; treeRef: RefObject<TreeRef>; key: string; value: any; setValue: (value: any) => void },
) => {
    const isEffect = useRef(true);

    // 监听 value 变化并同步树的选中状态
    useEffect(() => {
        if (props.showCheckbox && treeRef.current) {
            const treeInstance = treeRef.current;
            const currentKeys = treeInstance.getCheckedKeys();
            if (!isEqual(currentKeys, toValidArray(value))) {
                treeInstance.setCheckedKeys(toValidArray(value));
            }
        }
    }, [value]);

    // 计算 propsMap
    const propsMap = useMemo(
        () => ({
            value: key,
            label: 'label',
            children: 'children',
            disabled: 'disabled',
            isLeaf: 'isLeaf',
            ...props.props,
        }),
        [key, props.props],
    );

    // 获取节点属性值
    const getNodeValByProp = useCallback(
        (prop: keyof typeof propsMap, data: TreeNodeData) => {
            const propVal = propsMap[prop];
            if (isFunction(propVal)) {
                // @ts-ignore
                return propVal(data, treeRef.current?.getNode(getNodeValByProp('value', data)) as TreeNode);
            }
            return data[propVal as string];
        },
        [propsMap, treeRef],
    );

    // 默认展开父节点的 Key
    const defaultExpandedParentKeys = useMemo(() => {
        return toValidArray(value)
            .map(val => {
                return treeFind(
                    props.data || [],
                    data => getNodeValByProp('value', data) === val,
                    data => getNodeValByProp('children', data),
                    (data, index, array, parent) => parent && getNodeValByProp('value', parent),
                );
            })
            .filter(isValidValue);
    }, [value, props.data, getNodeValByProp]);

    // 缓存选项
    const cacheOptions = useMemo(() => {
        // if (!props.renderAfterExpand && !props.lazy) {
        //     return [];
        // }

        const options: CacheOption[] = [];
        treeEach(
            [...(props.data || []), ...(props.cacheData || [])],
            node => {
                const val = getNodeValByProp('value', node);
                options.push({
                    value: val,
                    currentLabel: getNodeValByProp('label', node),
                    label: getNodeValByProp('label', node),
                    isDisabled: getNodeValByProp('disabled', node),
                });
            },
            data => getNodeValByProp('children', data),
        );
        return options;
    }, [props.data, props.cacheData, getNodeValByProp]);

    useEffect(() => {
        if (isEffect.current) {
            if (!props.multiple) {
                const optionData = cacheOptions.find(item => item.value === value);
                if (optionData) {
                    if (treeRef.current.getNode(value as TreeKey)) {
                        treeRef.current?.setCurrentNode(treeRef.current.getNode(value as TreeKey));
                    }
                }
            }
        } else {
            isEffect.current = true;
        }
    }, [value]);

    // 获取子节点选中的 Key
    const getChildCheckedKeys = useCallback(() => {
        return treeRef.current?.getCheckedKeys().filter(item => {
            const node = treeRef.current?.getNode(item);
            return !isNil(node) && isEmpty(node.childNodes);
        });
    }, [treeRef]);

    const expandOnClickNode = useMemo(() => !props.checkStrictly && props.expandOnClickNode, [props.checkStrictly, props.expandOnClickNode]);

    const defaultExpandedKeys = useMemo(
        () => (props.defaultExpandedKeys ? [...props.defaultExpandedKeys, ...defaultExpandedParentKeys] : defaultExpandedParentKeys),
        [props.defaultExpandedKeys, defaultExpandedParentKeys],
    );

    // 渲染内容
    const renderContent = useCallback(
        ({ node, data, store }: any) => {
            return React.createElement(
                TreeSelectOption,
                {
                    value: getNodeValByProp('value', data),
                    label: getNodeValByProp('label', data),
                    disabled: getNodeValByProp('disabled', data),
                    visible: node.visible,
                },
                props.renderContent ? props.renderContent({ node, data, store }) : props.children,
            );
        },
        [getNodeValByProp, props],
    );

    // 过滤节点方法
    const filterNodeMethod = useCallback(
        (val: string, data: TreeNodeData, node: TreeNode) => {
            if (props.filterNodeMethod) {
                return props.filterNodeMethod(val, data, node);
            }
            if (!val) {
                return true;
            }
            const regexp = new RegExp(escapeStringRegexp(val), 'i');
            return regexp.test(getNodeValByProp('label', data) || '');
        },
        [props, getNodeValByProp],
    );

    // 节点点击事件
    const onNodeClick = useCallback(
        (data: TreeNodeData, node: TreeNode, treeNodeRef: RefObject<TreeNodeRef>, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            props.onNodeClick?.(data, node, treeNodeRef, e);
            if (props.showCheckbox && props.checkOnClickNode) {
                return;
            }

            if (!props.showCheckbox && (props.checkStrictly || node.isLeaf)) {
                if (!getNodeValByProp('disabled', data)) {
                    const val = selectRef.current?.onChoose(getNodeValByProp('value', data), data as OptionData, e);
                    isEffect.current = false;
                    setValue(val);
                }
            } else if (props.expandOnClickNode) {
                // treeNodeRef.current.handleExpandIconClick();
            }
        },
        [props, getNodeValByProp, selectRef, setValue],
    );

    // 节点勾选事件
    const onCheck = useCallback(
        (data: TreeNodeData, params: any) => {
            if (!props.showCheckbox) {
                return;
            }

            let controlledValue = null;
            const dataValue = getNodeValByProp('value', data);
            const dataMap: Record<string, any> = {};
            treeEach(
                [treeRef.current?.store.root],
                node => (dataMap[node.key] = node),
                node => node.childNodes,
            );

            const uncachedCheckedKeys = params.checkedKeys;
            const cachedKeys = props.multiple ? toValidArray(value).filter(item => !(item in dataMap) && !uncachedCheckedKeys.includes(item)) : [];

            const newCheckedKeys = cachedKeys.concat(uncachedCheckedKeys);

            if (props.checkStrictly) {
                let res = null;
                if (props.multiple) {
                    res = newCheckedKeys;
                } else {
                    res = newCheckedKeys.includes(dataValue) ? dataValue : undefined;
                }
                isEffect.current = false;
                const val = selectRef.current?.onChoose(dataValue, cacheOptions.find(cache => cache.value === dataValue) as OptionData);
                controlledValue = val;
            } else {
                if (props.multiple) {
                    // const childKeys = getChildCheckedKeys();
                    isEffect.current = false;
                    const val = selectRef.current?.onChoose(dataValue, cacheOptions.find(cache => cache.value === dataValue) as OptionData);
                    controlledValue = val;
                } else {
                    const firstLeaf = treeFind(
                        [data],
                        item => !isValidArray(getNodeValByProp('children', item)) && !getNodeValByProp('disabled', item),
                        item => getNodeValByProp('children', item),
                    );
                    const firstLeafKey = firstLeaf ? getNodeValByProp('value', firstLeaf) : undefined;

                    const hasCheckedChild =
                        isValidValue(value) &&
                        !!treeFind(
                            [data],
                            item => getNodeValByProp('value', item) === value,
                            item => getNodeValByProp('children', item),
                        );

                    selectRef.current?.onChoose(firstLeafKey === value || hasCheckedChild ? undefined : firstLeafKey, firstLeaf as OptionData);
                    controlledValue = firstLeafKey === value || hasCheckedChild ? undefined : firstLeafKey;
                }
            }

            setValue(controlledValue);
            nextTick(() => {
                const _checkedKeys = toValidArray(controlledValue);
                treeRef.current.setCheckedKeys(_checkedKeys);

                props.onCheck?.(data, {
                    checkedKeys: treeRef.current.getCheckedKeys(),
                    checkedNodes: treeRef.current.getCheckedNodes(),
                    halfCheckedKeys: treeRef.current.getHalfCheckedKeys(),
                    halfCheckedNodes: treeRef.current.getHalfCheckedNodes(),
                });
            });
            // selectRef.current?.focus();
        },
        [props, getNodeValByProp, treeRef, value, setValue, selectRef, cacheOptions],
    );

    // 节点展开事件
    const onNodeExpand = useCallback(
        (data: TreeNodeData, node: TreeNode, treeNodeRef: RefObject<TreeNodeRef>) => {
            props.onNodeExpand?.(data, node, treeNodeRef);
            nextTick(() => {
                if (!props.checkStrictly && props.lazy && props.multiple && node.checked) {
                    const dataMap: Record<string, any> = {};
                    const uncachedCheckedKeys = treeRef.current?.getCheckedKeys();

                    treeEach(
                        [treeRef.current?.store.root],
                        item => (dataMap[item.key] = item),
                        item => item.childNodes,
                    );

                    const cachedKeys = toValidArray(value).filter(item => !(item in dataMap) && !uncachedCheckedKeys.includes(item));

                    const childKeys = getChildCheckedKeys();
                    props.onChange?.(cachedKeys.concat(childKeys));
                }
            });
        },
        [props, treeRef, value, getChildCheckedKeys],
    );

    return {
        ...pick(props, treeAllProps),
        nodeKey: key,
        expandOnClickNode,
        defaultExpandedKeys,
        renderContent,
        filterNodeMethod,
        onNodeClick,
        onCheck,
        onNodeExpand,
        cacheOptions,
    };
};

export default useTree;
