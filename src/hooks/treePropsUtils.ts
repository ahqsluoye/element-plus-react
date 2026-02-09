import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import { TreeProps } from '../Tree';

export const treeAllProps = [
    'data',
    'emptyText',
    'renderAfterExpand',
    'nodeKey',
    'checkStrictly',
    'expandOnClickNode',
    'defaultExpandAll',
    'checkOnClickNode',
    'checkOnClickLeaf',
    'checkDescendants',
    'autoExpandParent',
    'defaultCheckedKeys',
    'defaultExpandedKeys',
    'currentNodeKey',
    'renderContent',
    'showCheckbox',
    'draggable',
    'allowDrag',
    'allowDrop',
    'props',
    'lazy',
    'highlightCurrent',
    'load',
    'filterNodeMethod',
    'accordion',
    'indent',
    'icon',
    'renderEmpty',
    'onNodeClick',
    'onNodeContextmenu',
    'onCheckChange',
    'onNodeExpandAll',
    'onCheck',
    'onCurrentChange',
    'onNodeExpand',
    'onNodeCollapse',
    'onNodeDragStart',
    'onNodeDragOver',
    'onNodeDragLeave',
    'onNodeDragEnter',
    'onNodeDragEnd',
    'onNodeDrop',
];

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @author	Parker
 * @CreateTime	2022/4/8 17:46:40
 * @LastEditor	Parker
 * @ModifyTime	2026/2/7 14:37:37
 * @param {object} props A ReactElement props object
 * @param {Object} [options={}]
 * @param {Array} [options.htmlProps] An array of html input props
 * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
 * @returns {[{}, {}]} An array of objects
 */
export const partitionTreePropsUtils = (props: any, options: any = {}): [TreeProps, any] => {
    const { treeProps = treeAllProps } = options;

    const inputProps: { [key: string]: string } = {};
    const rest = {};

    forEach(props, (val, prop) => {
        const target: any = includes(treeProps, prop) ? inputProps : rest;
        target[prop] = val;
    });

    return [inputProps, rest];
};
