import pick from 'lodash/pick';
import { RefObject, useEffect, useMemo } from 'react';

// 假设这些工具函数和常量已存在
import classNames from 'classnames';
import { SelectProps, SelectRef } from '../Select';
import { TreeRef } from '../Tree/typings';
import { nextTick } from '../Util';
import { useClassNames } from '../hooks';
import { popperAllProps } from '../hooks/popperPropsUtils';
import { TreeSelectProps } from './typings';

const formControlBaseKeys = ['name', 'value', 'defaultValue', 'disabled', 'size', 'readOnly', 'classPrefix', 'className', 'style'];
const animationEventKeys = ['beforeEnter', 'onEnter', 'afterEnter', 'beforeLeave', 'onLeave', 'afterLeave'];

const selectKeys = [
    ...formControlBaseKeys,
    ...animationEventKeys,
    'multiple',
    'disabled',
    'valueKey',
    'clearable',
    'clearIcon',
    'placeholder',
    'filterable',
    'filterMethod',
    'noDataText',
    'noMatchText',
    'loading',
    'loadingText',
    'loadingIcon',
    'max',
    'showArrow',
    'required',
    'error',
    'warning',
    'maxWidth',
    'collapseTags',
    'maxCollapseTags',
    'collapseTagsTooltip',
    'collapseTips',
    'allowCreate',
    'plain',
    'prepend',
    'append',
    'size',
    'appendToBody',
    'remote',
    'remoteMethod',
    'remoteShowSuffix',
    'suffixIcon',
    'tagType',
    'tagEffect',
    'labelFormat',
    'onChange',
    'onVisibleChange',
    'onRemoveTag',
    'onClear',
    'automaticDropdown',
    'header',
    'footer',
    'tag',
    ...popperAllProps,
];

const useSelect = (props: TreeSelectProps, { selectRef, treeRef, key }: { selectRef: RefObject<SelectRef>; treeRef: RefObject<TreeRef>; key: string }) => {
    const ns = useClassNames('tree-select');

    // 监听 props.data 变化并更新树节点
    useEffect(() => {
        if (props.filterable) {
            nextTick().then(() => {
                if (selectRef.current?.getValue() !== undefined) {
                    treeRef.current?.filter(selectRef.current?.getValue());
                }
            });
        }
    }, [props.data]);

    // // 聚焦到最后一个节点的逻辑
    // const focusLastNode = (listNode: any[]) => {
    //     const lastNode = listNode[listNode.length - 1];
    //     if (lastNode.expanded && lastNode.childNodes?.[lastNode.childNodes.length - 1]) {
    //         focusLastNode([lastNode.childNodes[lastNode.childNodes.length - 1]]);
    //     } else {
    //         const el = treeRef.current?.el$?.querySelector(`[data-key="${lastNode.key}"]`);
    //         el?.focus({ preventScroll: true });
    //     }
    // };

    // // 键盘事件处理
    // useEffect(() => {
    //     const handleKeyDown = async (evt: KeyboardEvent) => {
    //         const code = getEventCode(evt);
    //         const dropdownMenuVisible = selectRef.current?.dropdownMenuVisible;

    //         if ([EVENT_CODE.down, EVENT_CODE.up].includes(code) && dropdownMenuVisible) {
    //             await new Promise(resolve => setTimeout(resolve, 0)); // 等待异步操作完成
    //             if (code === EVENT_CODE.up) {
    //                 const listNode = treeRef.current?.store.root.childNodes;
    //                 focusLastNode(listNode);
    //             } else {
    //                 const hoveringIndex = selectRef.current?.states.hoveringIndex;
    //                 selectRef.current?.optionsArray[hoveringIndex]?.$el?.parentNode?.parentNode?.focus({
    //                     preventScroll: true,
    //                 });
    //             }
    //         }
    //     };

    //     const el = selectRef.current?.$el;
    //     if (el) {
    //         el.addEventListener('keydown', handleKeyDown, { capture: true });
    //         return () => el.removeEventListener('keydown', handleKeyDown, { capture: true });
    //     }
    // }, []);

    // 返回结果对象
    const result = useMemo(
        () => ({
            ...(pick(props, selectKeys) as Omit<SelectProps, 'props' | 'options'>),
            className: props.popperClass,
            style: props.style,
            // onUpdateModelValue: (value: any) => props.onUpdateModelValue?.(value),
            valueKey: key,
            popperClass: classNames(ns.e('popper'), ns.is('pure'), props.popperClass),
            filterMethod: (keyword = '') => {
                if (props.filterMethod) {
                    props.filterMethod(keyword);
                } else if (props.remoteMethod) {
                    props.remoteMethod(keyword);
                } else {
                    treeRef.current?.filter(keyword);
                }
            },
        }),
        [key, ns, props, treeRef],
    );

    return result;
};

export default useSelect;
