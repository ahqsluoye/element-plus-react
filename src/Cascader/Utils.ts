import cloneDeep from 'lodash/cloneDeep';
import omit from 'lodash/omit';
import { isNotEmpty, randomCode } from '../Util';
import { CascaderMenuProps, OptionNode, TreeMenuProps } from './typings';

export const toArray = (val: string | string[] | string[][], separator = '/'): string[] | string[][] => {
    if (isNotEmpty(val)) {
        if (typeof val === 'string') {
            return val.split(separator);
        } else if (val instanceof Array) {
            return val;
        }
    }
    return [];
};

export const reOrgTree = (
    treeData: object[],
    level: number,
    { valueKey = 'value', labelKey = 'label', leafKey = 'leaf', childrenKey = 'children' }: CascaderMenuProps,
    { valueKey: treeValueKey = 'key', labelKey: treeLabelKey = 'title', childrenKey: treeChildrenKey = 'children' }: TreeMenuProps,
    plainData: OptionNode[] = [],
    parent: any = null,
): OptionNode[] => {
    return treeData.map((node: any) => {
        if (node[childrenKey]) {
            node[childrenKey] = reOrgTree(
                node[childrenKey],
                level,
                { valueKey, labelKey, leafKey, childrenKey },
                { valueKey: treeValueKey, labelKey: treeLabelKey, childrenKey: treeChildrenKey },
                plainData,
                omit(cloneDeep(node), childrenKey),
            );
        }
        const id = randomCode(11);
        plainData.push({
            __id: id,
            __level: level,
            __pId: parent?.__id ?? '0',
            [valueKey]: node[treeValueKey],
            [labelKey]: node[treeLabelKey],
            [leafKey]: false,
            treeChildren: Object.prototype.hasOwnProperty.call(node, treeChildrenKey),
            ...(parent != null ? { parent } : {}),
        });
        return {
            ...node,
            __id: id,
            __pId: parent?.__id ?? '0',
        };
    });
};
