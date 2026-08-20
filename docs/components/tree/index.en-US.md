---
title: Tree
lang: en-US
---

<Meta></Meta>

# Tree

Display information in a clear hierarchical structure, expandable or collapsible.

## Basic Usage

Basic tree structure display.

<code src="./basic.tsx"></code>

## Selectable

Suitable for scenarios where selection of levels is required.

This example also shows how to dynamically load node data.

<code src="./selectable.tsx"></code>

:::error{title=WARNING}

When using `showCheckbox`, since `checkOnClickLeaf` defaults to true, the last tree node can be checked by clicking on the node.

:::

## Custom Leaf Node in Lazy Mode

Since data for that level is only fetched when clicking a node, by default Tree cannot predict whether a node is a leaf node. So a drop-down button is added to each node. If the node has no child data, the drop-down button will disappear after clicking. At the same time, you can also tell Tree in advance whether a node is a leaf node, avoiding the need to render a drop-down button before leaf nodes.

<code src="./custom-leaf.tsx"></code>

## Lazy Loading Multiple Times

When loading remote node data, lazy loading may sometimes fail. In this case, you can call reject to maintain the node status and allow remote loading to continue.

<code src="./multiple-times-load.tsx"></code>

## Disabled Checkbox

The checkbox of a node can be set as disabled.

In the example, the disabled state is set via `disabled`. The corresponding checkboxes are disabled and cannot be clicked.

<code src="./disabled.tsx"></code>

## Default Expanded and Default Checked

Tree nodes can be set to expanded and checked during initialization.

Set default expanded and default checked nodes via `defaultExpandedKeys` and `defaultCheckedKeys` respectively. Note that `nodeKey` must be set at this time. Its value is a field name in the node data, which is unique throughout the tree.

<code src="./default-state.tsx"></code>

## Checking Tree Nodes

This example shows how to get and set checked nodes. There are two ways to get and set: through node or through key. If you need to get or set through key, `nodeKey` must be set.

<code src="./checking-tree.tsx"></code>

## Custom Node Content

Node content supports customization. You can add buttons, icons and other content in the node area.

Use `renderContent` to specify the render function, which should return the desired content for the node area.

<code src="./customized-node.tsx"></code>

## Custom Node Class

Node class names support customization.

Use `props.class` to set node class names.

<code src="./custom-node-class.tsx"></code>

## Tree Node Filtering

Tree nodes can be filtered.

Call the `filter` method of the Tree instance to filter tree nodes. The parameter is the filter keyword. Note that `filterNodeMethod` needs to be set at this time, and its value is the filter function.

<code src="./filtering.tsx"></code>

## Accordion Mode

For nodes at the same level, only one can be expanded at a time.

<code src="./accordion.tsx"></code>

## Draggable

Nodes can be dragged via the `draggable` property.

<code src="./draggable.tsx"></code>

## Properties

| Name                | Description                                                                                                                                    | Type                                                                   | Default |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| data                | Display data                                                                                                                                   | <Enum type="object">Array<{[key: string]: any}></Enum>                 | —       |
| emptyText           | Text displayed when content is empty                                                                                                           | `string`                                                               | —       |
| nodeKey             | The attribute used as a unique identifier for each tree node, should be unique across the entire tree                                           | `string`                                                               | —       |
| props               | Configuration options, see the table below                                                                                                    | [Props](#props)                                                        | —       |
| renderAfterExpand   | Whether to render child nodes only after the tree node is expanded for the first time                                                          | `boolean`                                                              | true    |
| load                | Method for loading subtree data, only works when `lazy` is true                                                                               | <Enum type="Function">(node, resolve, reject) => void</Enum>           | —       |
| renderContent       | Render function for the content area of tree nodes                                                                                             | <Enum type="Function">({ node, data, store }) => void</Enum>           | —       |
| highlightCurrent    | Whether to highlight the currently selected node, default is false                                                                              | `boolean`                                                              | false   |
| defaultExpandAll    | Whether to expand all nodes by default                                                                                                        | `boolean`                                                              | false   |
| expandOnClickNode   | Whether to expand or collapse a node when clicking on it. Default is true. If false, the node will only be expanded or collapsed when clicking the arrow icon | `boolean`                                                              | true    |
| checkOnClickNode    | Whether to select a node when clicking on it. Default is false, meaning the node is only selected when clicking the checkbox.                 | `boolean`                                                              | false   |
| checkOnClickLeaf    | Whether to select or deselect a leaf node (last child node) when clicking on it                                                               | `boolean`                                                              | true    |
| autoExpandParent    | Whether to automatically expand the parent node when expanding a child node                                                                    | `boolean`                                                              | true    |
| defaultExpandedKeys | Array of keys of initially expanded nodes                                                                                                      | <Enum type="object">Array<string \| number></Enum>                     | —       |
| showCheckbox        | Whether the node is selectable                                                                                                                 | `boolean`                                                              | false   |
| checkStrictly       | When displaying checkboxes, whether to strictly follow the rule that parent and child nodes are not interrelated, default is false            | `boolean`                                                              | false   |
| checkDescendants    | Whether child nodes follow the parent node's selected state                                                                                   | `boolean`                                                              | —       |
| defaultCheckedKeys  | Array of keys of initially checked nodes                                                                                                      | <Enum type="object">Array<string \| number></Enum>                     | —       |
| currentNodeKey      | Currently selected node                                                                                                                       | `string` / `number`                                                    | —       |
| filterNodeMethod    | Method executed when filtering tree nodes. Returns `false` to hide the node                                                                    | <Enum type="Function">(value, data, node) => boolean</Enum>            | —       |
| accordion           | Whether to only expand one tree node at the same level each time                                                                               | `boolean`                                                              | false   |
| indent              | Horizontal indentation between adjacent level nodes, in pixels                                                                                 | `number`                                                               | 18      |
| icon                | Custom tree node icon component                                                                                                               | `string` / `Component`                                                 | —       |
| renderEmpty         | Custom content when data is empty                                                                                                              | <Enum type="Function">() => React.ReactNode</Enum>                     | —       |
| lazy                | Whether to lazy load child nodes, needs to be used with the `load` method                                                                      | `boolean`                                                              | false   |
| draggable           | Whether to enable node dragging                                                                                                                 | `boolean`                                                              | false   |
| allowDrag           | Determine whether a node can be dragged. If `false` is returned, the node cannot be dragged                                                    | <Enum type="Function">(node) => boolean</Enum>                         | —       |
| allowDrop           | Determine whether the target node can become the target position for dragging during dragging. If `false` is returned, the dragging node cannot be dropped to the target node. `type` has three cases: 'prev', 'inner' and 'next', which means placing before the target node, inserting into the target node, and placing after the target node respectively | <Enum type="Function">(draggingNode, dropNode, type) => boolean</Enum> | —       |

## props

| Props    | Description                                                                   | Type                                                            | Default |
| -------- | ----------------------------------------------------------------------------- | --------------------------------------------------------------- | ------- |
| label    | Specify which key of node object is used as the node's label                  | `string` / <Enum type="Function">(data, node) => string</Enum>  | —       |
| children | Specify which node object is used as the node's subtree                        | `string`                                                        | —       |
| disabled | Specify whether the node's checkbox is disabled, as a property of the node object | `string` / <Enum type="Function">(data, node) => boolean</Enum> | —       |
| isLeaf   | Specify whether the node is a leaf node, only works when `lazy` is specified   | `string` / <Enum type="Function">(data, node) => boolean</Enum> | —       |
| class    | Custom node class name                                                        | `string` / <Enum type="Function">(data, node) => string</Enum>  | —       |

## Methods

`Tree` component has the following methods, all returning the array of currently selected nodes:

| Method | Description | Parameters |
| ------ | ----------- | ---------- |
| filter | Filter all tree nodes, filtered nodes will be hidden | Takes one parameter, specified as the first parameter of `filterNodeMethod` |
| updateKeyChildren | Set new data for a node, only available when `nodeKey` is set | (key, data) Takes two parameters: 1. The key of the node 2. New data |
| getCheckedNodes | If the node is selectable (`showCheckbox` is `true`), this method returns the array of currently selected nodes | (leafOnly, includeHalfChecked) Takes two boolean parameters: 1. Default is `false`. If `true`, it returns the child nodes of the currently selected nodes 2. Default is `false`. If `true`, the return value includes half-checked node data |
| setCheckedNodes | Set the currently checked nodes, must set `nodeKey` attribute in advance when using this method | Array of nodes to be selected |
| getCheckedKeys | If the node is selectable (`showCheckbox` is `true`), it returns the array of keys of currently selected nodes | (leafOnly) Takes a boolean parameter, default is `false`. If `true`, it only returns the array of currently selected child nodes. |
| setCheckedKeys | Set the currently selected nodes, must set `nodeKey` attribute when using this method | (keys, leafOnly) Takes two parameters: 1. An array of keys of multi-nodes to be selected 2. Boolean value. If set to `true`, only the checked status of leaf nodes will be set. Default is `false`. |
| setChecked | Set whether the node is selected, must set `nodeKey` attribute when using this method | (key/data, checked, deep) Takes three parameters: 1. The key or data of the node to be selected 2. A boolean parameter indicating whether to select 3. A boolean parameter indicating whether to recursively select child nodes |
| getHalfCheckedNodes | If the node is selectable (`showCheckbox` is `true`), it returns the array of currently half-checked nodes | — |
| getHalfCheckedKeys | If the node is selectable (`showCheckbox` is `true`), it returns the array of keys of currently half-checked nodes | — |
| getCurrentKey | Returns the data of the currently selected node (returns null if none) | — |
| getCurrentNode | Returns the data of the currently selected node (returns null if none) | — |
| setCurrentKey | Set the current selected state of a node by key, must set `nodeKey` attribute when using this method | (key, shouldAutoExpandParent=true) 1. The key of the node to be selected, if `null`, cancel the currently selected node 2. Whether to expand the parent node |
| setCurrentNode | Set the node as selected, must set `nodeKey` attribute when using this method | (node, shouldAutoExpandParent=true) 1. The node to be selected 2. Whether to automatically expand the parent node |
| getNode | Get the node in the Tree component based on data or key | (data) The data or key of the node |
| remove | Remove a node from the Tree, must set `nodeKey` attribute when using this method | (data) The data or node object of the node to be deleted |
| append | Append a child node to a node in the Tree | (data, parentNode) 1. Data of the child node to append 2. Data, key or node of the parent node |
| insertBefore | Insert a node before a given node in the Tree | (data, refNode) Takes two parameters: 1. Data of the node to add 2. Data, key or node of the reference node |
| insertAfter | Insert a node after a given node in the Tree | (data, refNode) 1. Data of the node to add 2. Data, key or node of the reference node |

## Events

| Name              | Description                                                  | Callback Parameters                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| onNodeClick       | Triggers when a node is clicked                              | Four parameters: the node object corresponding to the clicked node, the `node` property of TreeNode, TreeNode and the event object                                          |
| onNodeContextmenu | Triggers when a node is right-clicked                        | Four parameters in order: event, the object corresponding to the node in the array passed to the `data` attribute, the Node corresponding to the node, and the node component itself |
| onCheckChange     | Triggers when the checkbox is clicked                        | Three parameters in order: the object corresponding to the node in the array passed to the data attribute, whether the node itself is selected, whether there are selected nodes in the subtree of the node |
| onCheck           | Triggers after clicking the node checkbox                    | Two parameters in order: the object corresponding to the node in the array passed to the data attribute, the tree's current selected state object, containing checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys |
| onCurrentChange   | Event triggered when the current selected node changes       | Two parameters in order: the data of the current node, the Node object of the current node                                                                                   |
| onNodeExpand      | Event triggered when a node is expanded                     | Three parameters in order: the object corresponding to the node in the array passed to the `data` attribute, the Node corresponding to the node, the node component itself     |
| onNodeCollapse    | Event triggered when a node is collapsed                     | Three parameters in order: the object corresponding to the node in the array passed to the `data` attribute, the Node corresponding to the node, the node component itself     |
| onNodeDragStart   | Event triggered when node dragging starts                    | Two parameters in order: the Node corresponding to the dragged node, event                                                                                                   |
| onNodeDragEnter   | Event triggered when dragging enters another node           | Three parameters in order: the Node corresponding to the dragged node, the Node corresponding to the entered node, event                                                    |
| onNodeDragLeave   | Event triggered when dragging leaves a node                 | Three parameters in order: the Node corresponding to the dragged node, the Node corresponding to the left node, event                                                        |
| onNodeDragOver    | Event triggered when dragging over a node (similar to browser's mouseover) | Three parameters in order: the Node corresponding to the dragged node, the Node corresponding to the currently entered node, event                                            |
| onNodeDragEnd     | Event triggered when dragging ends (may not be successful)   | Four parameters in order: the Node corresponding to the dragged node, the node finally entered at the end of dragging (may be empty), the placement position of the dragged node (before, after, inner), event |
| onNodeDrop        | Event triggered when dragging is successfully completed     | Four parameters in order: the Node corresponding to the dragged node, the node finally entered at the end of dragging, the placement position of the dragged node (before, after, inner), event |