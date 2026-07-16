import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import { useForceUpdate } from '@qsxy/element-plus-react/hooks/useForceUpdate';
import Select from '@qsxy/element-plus-react/Select/Select';
import { SelectRef } from '@qsxy/element-plus-react/Select/typings';
import Tree from '@qsxy/element-plus-react/Tree/Tree';
import { TreeRef } from '@qsxy/element-plus-react/Tree/typings';
import { isNotEmpty, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import { useMount } from 'ahooks';
import React, { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';
import CacheOptions from './cacheOptions';
import { TreeSelectProps, TreeSelectRef } from './typings';
import useSelect from './useSelect';
import useTree from './useTree';

const TreeSelect = forwardRef<TreeSelectRef, TreeSelectProps>((props, ref) => {
    props = mergeDefaultProps(
        {
            renderAfterExpand: true,
            expandOnClickNode: true,
            checkOnClickLeaf: true,
            autoExpandParent: true,
            indent: 18,
            props: {
                children: 'children',
                label: 'label',
                disabled: 'disabled',
                isLeaf: 'isLeaf',
                class: null,
            },
        },
        props,
    );

    const selectRef = useRef<SelectRef>();
    const treeRef = useRef<TreeRef>();

    const key = useMemo(() => props.nodeKey || props.valueKey || 'value', [props.nodeKey, props.valueKey]);

    const [value, setValue] = useControlled(props.value, props.defaultValue);
    const { forceUpdate } = useForceUpdate();

    const handleChange = useCallback(
        (val: any) => {
            setValue(val);
            props.onChange?.(val);
        },
        [setValue, props],
    );

    const selectProps = useSelect(props, { selectRef, treeRef, key });
    const { cacheOptions, ...treeProps } = useTree(props, { selectRef, treeRef, key, value, setValue });

    useMount(() => {
        if (isNotEmpty(value)) {
            forceUpdate();
        }
    });

    useImperativeHandle(
        ref,
        () => ({
            getValue: selectRef.current.getValue,
            setVisible: selectRef.current.setVisible,
            filter: treeRef.current.filter,
            updateKeyChildren: treeRef.current.updateKeyChildren,
            getCheckedNodes: treeRef.current.getCheckedNodes,
            setCheckedNodes: treeRef.current.setCheckedNodes,
            getCheckedKeys: treeRef.current.getCheckedKeys,
            setCheckedKeys: treeRef.current.setCheckedKeys,
            setChecked: treeRef.current.setChecked,
            getHalfCheckedNodes: treeRef.current.getHalfCheckedNodes,
            getHalfCheckedKeys: treeRef.current.getHalfCheckedKeys,
            getCurrentKey: treeRef.current.getCurrentKey,
            getCurrentNode: treeRef.current.getCurrentNode,
            setCurrentKey: treeRef.current.setCurrentKey,
            setCurrentNode: treeRef.current.setCurrentNode,
            getNode: treeRef.current.getNode,
            remove: treeRef.current.remove,
            append: treeRef.current.append,
            insertBefore: treeRef.current.insertBefore,
            insertAfter: treeRef.current.insertAfter,
        }),
        [selectRef, treeRef],
    );

    return (
        <Select ref={selectRef} {...selectProps} value={value} onChange={handleChange} unmountOnExit={false}>
            <CacheOptions data={cacheOptions} select={selectRef} />
            <Tree ref={treeRef} {...treeProps} />
        </Select>
    );
});

TreeSelect.displayName = 'ElTreeSelect';

export default TreeSelect;
