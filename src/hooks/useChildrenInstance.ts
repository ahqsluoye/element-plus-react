import React, { Children, ComponentType, Fragment, useCallback, useRef } from 'react';
import { ComponentChildren } from '../types/common';

/**
 * 获取特定名称的子组件
 * @param componentChildren 子组件
 * @param compName 目标组件名称 （`displayName`属性）
 * @param virtualCompName 子组件中的需要继续乡下递归查找的组件名称（`displayName`属性）
 * @returns 返回获取组件的函数以供随时调用
 */
function useChildrenInstance<T, S = T>(compName: string | string[], ...virtualCompName: string[]): (componentChildren: ComponentChildren) => React.ReactElement<S>[] {
    const result = useRef<React.ReactElement<S>[] | null>([]);
    virtualCompName = ['Fragment', ...virtualCompName];

    if (typeof compName === 'string') {
        compName = [compName];
    }

    const getInstanceFromChildren = useCallback(
        (_children: ComponentChildren) => {
            Children.forEach(_children, (node: React.ReactElement<any>) => {
                let nodeType = node?.type;
                nodeType = (nodeType as ComponentType)?.displayName || nodeType;
                if (typeof nodeType === 'string' && compName.includes(nodeType)) {
                    const temp = node as React.ReactElement<S>;
                    result.current.push(temp);
                } else if (typeof nodeType === 'string' && virtualCompName.includes(nodeType)) {
                    getInstanceFromChildren(node.props.children);
                } else if (nodeType === Fragment) {
                    getInstanceFromChildren(node.props.children);
                } else if (node instanceof Array) {
                    getInstanceFromChildren(node);
                } else {
                    return true;
                }
            });
        },
        [compName, virtualCompName],
    );

    const getValue = useCallback(
        (componentChildren: ComponentChildren) => {
            if (componentChildren) {
                result.current = [];
                getInstanceFromChildren(componentChildren);
                return result.current;
            }
            return [];
        },
        [getInstanceFromChildren],
    );

    return getValue;
}

export default useChildrenInstance;
