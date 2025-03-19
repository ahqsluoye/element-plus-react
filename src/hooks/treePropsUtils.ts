import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import { DirectoryTreeProps } from '../Tree';

export const treeAllProps = [
    'showLine',
    'multiple',
    'selectedKeys',
    'filterAntTreeNode',
    'showIcon',
    'switcherIcon',
    'children',
    'blockNode',
    'prefixCls',
    'focusable',
    'activeKey',
    'tabIndex',
    'treeData',
    'fieldNames',
    'icon',
    'selectable',
    'disabled',
    'checkable',
    'checkStrictly',
    'draggable',
    'defaultExpandParent',
    'autoExpandParent',
    'defaultExpandAll',
    'defaultExpandedKeys',
    'expandedKeys',
    'defaultCheckedKeys',
    'checkedKeys',
    'defaultSelectedKeys',
    'allowDrop',
    'titleRender',
    'dropIndicatorRender',
    'onFocus',
    'onBlur',
    'onKeyDown',
    'onContextMenu',
    'onClick',
    'onDoubleClick',
    'onScroll',
    'onExpand',
    'onCheck',
    'onSelect',
    'onLoad',
    'loadData',
    'loadedKeys',
    'onMouseEnter',
    'onMouseLeave',
    'onRightClick',
    'onDragStart',
    'onDragEnter',
    'onDragOver',
    'onDragLeave',
    'onDragEnd',
    'onDrop',
];

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @author	Parker
 * @CreateTime	2022/4/8 17:46:40
 * @LastEditor	Parker
 * @ModifyTime	2022/4/21 10:06:19
 * @param {object} props A ReactElement props object
 * @param {Object} [options={}]
 * @param {Array} [options.htmlProps] An array of html input props
 * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
 * @returns {[{}, {}]} An array of objects
 */
export const partitionTreePropsUtils = (props: any, options: any = {}): [DirectoryTreeProps<any>, any] => {
    const { treeProps = treeAllProps } = options;

    const inputProps: { [key: string]: string } = {};
    const rest = {};

    forEach(props, (val, prop) => {
        const target: any = includes(treeProps, prop) ? inputProps : rest;
        target[prop] = val;
    });

    return [inputProps, rest];
};
