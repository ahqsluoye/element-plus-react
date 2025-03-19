import omit from 'lodash/omit';
import { TreeNode } from './typings';
import { getRowIdentity } from './util';

/**
 * 树形表格数据平铺成二维数据
 * @param data 表格数据
 * @param treeProps 渲染嵌套数据的配置选项
 * @param rowKey 行数据的 Key，用来优化 Table 的渲染
 * @param defaultExpandAll 是否默认展开所有行
 * @param defaultExpandRowKeys 默认展开行
 * @param result 重组后数据
 * @param level 层级
 * @param parentId 父ID
 * @param parentDisplay 父级是否显示
 * @returns
 */
export const flatTreeData = <T>(
    data: T[],
    treeProps: {
        hasChildren: string;
        children: string;
    },
    rowKey: string | ((data: { row: T }) => string),
    defaultExpandAll = false,
    defaultExpandRowKeys = [],
    result: (T & TreeNode)[] = [],
    level = 0,
    parentId = null,
    parentDisplay = false,
) => {
    if (data.length > 0) {
        data.forEach(item => {
            const id = getRowIdentity(item, rowKey);
            if (Object.prototype.hasOwnProperty.call(item, treeProps.children)) {
                // 第一层级直接显示，后面的层级展开条件：1. 上级是否显示且展开 2. 或者默认都展开
                parentDisplay = (parentDisplay && defaultExpandRowKeys.includes(parentId)) || defaultExpandAll ? true : level === 0;
                result.push({
                    display: parentDisplay,
                    expanded: defaultExpandRowKeys.includes(id) || defaultExpandAll,
                    noLazyChildren: false,
                    ...item,
                    level,
                    parentId,
                });
                flatTreeData(item[treeProps.children], treeProps, rowKey, defaultExpandAll, defaultExpandRowKeys, result, level + 1, getRowIdentity(item, rowKey), parentDisplay);
            } else {
                // 如果懒加载时，层级为0
                result.push(
                    level > 0
                        ? {
                              // 展开条件：1. 上级是否显示且展开 2. 或者默认都展开
                              display: (parentDisplay && defaultExpandRowKeys.includes(parentId)) || defaultExpandAll,
                              expanded: false,
                              noLazyChildren: true,
                              ...item,
                              level,
                              parentId,
                          }
                        : { display: true, level: 0, noLazyChildren: true, ...item, parentId },
                );
            }
        });
        return result;
    }
};

/**
 * 获取某一行数据所有的子节点
 * @param data
 * @param treeProps
 * @param rowKey
 * @param defaultExpandAll
 * @param result
 * @returns
 */
export const getAllChildren = <T>(
    data: T[],
    treeProps: {
        hasChildren: string;
        children: string;
    },
    rowKey: string | ((data: { row: T }) => string),
    defaultExpandAll = false,
    result: T[] = [],
) => {
    if (data.length > 0) {
        data.forEach(item => {
            result.push(item);
            if (Object.prototype.hasOwnProperty.call(item, treeProps.children)) {
                flatTreeData(item[treeProps.children], treeProps, rowKey, defaultExpandAll, result);
            }
        });
        return result;
    }
};

/**
 * 将原始树形数据和树节点数据合并成可以渲染的表格数据
 * @param treeData 原始树形数据
 * @param treeNodes 树节点数据
 * @param treeProps
 * @param rowKey
 * @param result 结果数据
 * @returns
 */
export const mergeTreeData = <T>(
    treeData: T[],
    treeNodes: TreeNode[],
    treeProps: {
        hasChildren: string;
        children: string;
    },
    rowKey: string | ((data: { row: T }) => string),
    result: (T & TreeNode)[] = [],
) => {
    if (treeData.length > 0) {
        treeData.forEach(item => {
            const id = getRowIdentity(item, rowKey);
            const treeNode = treeNodes.find(item1 => item1.id === id);
            result.push({ ...item, ...omit(treeNode, 'id') });
            if (Object.prototype.hasOwnProperty.call(item, treeProps.children)) {
                mergeTreeData(item[treeProps.children], treeNodes, treeProps, rowKey, result);
            }
        });
        return result;
    }
    return [];
};

/**
 * 给某一行数据添加子节点
 * @param treeData
 * @param targetId 目标行id
 * @param children 子节点
 * @param treeProps
 * @param rowKey
 */
export const addTreeChildren = <T>(
    treeData: T[],
    targetId: string,
    children: T[],
    treeProps: {
        hasChildren: string;
        children: string;
    },
    rowKey: string | ((data: { row: T }) => string),
) => {
    if (treeData.length > 0) {
        treeData.forEach(item => {
            const id = getRowIdentity(item, rowKey);
            if (id === targetId) {
                item[treeProps.children] = children;
                return false;
            }
            if (Object.prototype.hasOwnProperty.call(item, treeProps.children)) {
                addTreeChildren(item[treeProps.children], targetId, children, treeProps, rowKey);
            }
        });
    }
};
