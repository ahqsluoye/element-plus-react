import cloneDeep from 'lodash/cloneDeep';

interface FieldNames {
    idKey?: string;
    parentIdKey?: string;
    childrenKey?: string;
}

/**
 * 非递归实现
 * 每一项都有parentId，根元素
 * @param list
 * @param rootId 根元素id
 * @param param2 可配晋参数
 * @returns
 */
export const generateTree = <T>(list: T[], rootId: string | number, { idKey = 'id', parentIdKey = 'parentId', childrenKey = 'children' } = {} as FieldNames): T[] => {
    if (!Array.isArray(list)) {
        new Error('only Array type can generate tree');
        return cloneDeep(list);
    }

    // 暂存数组以id为key的映射关系
    const objMap = {};
    //结果
    const result = [];
    for (const item of cloneDeep(list)) {
        const id = (item[idKey] + '')?.trim();
        const parentId = (item[parentIdKey] + '')?.trim();

        // 该元素有可能已经放入map中（找不到该项的parent时会先放入map）
        objMap[id] = !objMap[id] ? item : { ...item, ...objMap[id] };
        //找到映射关系那一项（注意这里是引用）
        const treeItem = objMap[id];
        if (parentId + '' === rootId + '') {
            //已经到根元素则将映射结果放进结果集
            if (treeItem[parentIdKey] !== rootId) {
                objMap[id] = { ...item, [childrenKey]: treeItem[childrenKey] || [] };
                result.push(objMap[id]);
            } else {
                result.push(treeItem);
            }
        } else {
            // 若父元素不存在，初始化父元素
            if (!objMap[parentId]) {
                objMap[parentId] = {};
            }
            //若无该根元素则放入map中
            if (!objMap[parentId][childrenKey]) {
                objMap[parentId][childrenKey] = [];
            }
            objMap[parentId][childrenKey].push(treeItem);
        }
    }
    return result;
};
