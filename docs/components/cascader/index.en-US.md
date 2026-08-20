---
title: Cascader
lang: en-US
---

<Meta></Meta>

# Cascader

When a data set has a clear hierarchical structure, the cascader can be used to view and select them level by level.

## Basic Usage

There are two ways to trigger sub-menus.

Simply assign an options array to the Cascader's `options` attribute to render a cascader. Use the `props.expandTrigger` attribute to control how child nodes are expanded.

<code src="./basic.tsx"></code>

## Disabled Options

Declare an option as disabled by setting the `disabled` field in the data source.

In this example, the first element in the array specified by `options` has a `disabled: true` key-value pair, so it is disabled. By default, Cascader checks whether the `disabled` field of each item in the data is `true`. If the field name indicating disabled state in your data is not `disabled`, you can specify it through the `props.disabled` attribute (see the API table below for details). Of course, the field names `value`, `label`, and `children` can also be customized in the same way.

<code src="./option-disabling.tsx"></code>

## Clearable

Set the input to be clearable through `clearable`.

<code src="./clearable.tsx"></code>

## Display Only the Last Level

You can display only the last level label of the selected item in the input instead of the full path.

The `showAllLevels` attribute defines whether to display the full path. Set it to `false` to display only the last level.

<code src="./last-level.tsx"></code>

## Multiple Selection

Add `props={{ multiple: true }}` to the tag to enable multiple selection mode.

When using multiple selection, all selected tags will be displayed by default. You can set `collapseTags = true` to collapse the selected tags. You can use the `collapseTagsTooltip` attribute to enable the behavior of hovering over the collapsed text to display the specific selected values.

<code src="./multiple-selection.tsx"></code>

## Select Any Level of Option

In single selection mode, you can only select leaf nodes; in multiple selection mode, checking parent nodes actually selects all leaf nodes. When this feature is enabled, parent and child nodes can be unlinked, allowing selection of any level of option.

Set `props.checkStrictly = true` to unlink the checked state of parent and child nodes, enabling selection of any level of option.

<code src="./any-level.tsx"></code>

## Dynamic Loading

When a level is selected, the options under that level are dynamically loaded.

Enable dynamic loading through `lazy`, and set the method for loading the data source through `lazyload`. The `lazyload` method has two parameters: the first parameter `node` is the currently clicked node, and the second `resolve` is the callback for data loading completion (must be called). To more accurately display the status of nodes, you can also add a flag for whether a node is a leaf node (default field is `leaf`, modifiable through `props.leaf`). Otherwise, whether it is a leaf node is determined by the presence or absence of child nodes.

<code src="./dynamic-loading.tsx"></code>

## Filterable

Quickly search for and select options.

Enable filtering by adding `filterable`. Cascader matches all node labels and their parent node labels to see if they contain the entered keyword. You can also use `filterMethod` to customize the search logic, which accepts a function with the first parameter being the node and the second being the search keyword, returning a boolean value to indicate whether it matches.

<code src="./filterable.tsx"></code>

## Custom Node Content

Customize the content of option nodes.

You can customize node content through `nodeFormatter`. You can access the `node` and `data` properties in the scope, representing the Node object of the current node and the data of the current node respectively.

<code src="./custom-content.tsx"></code>

## Custom Suggestion Item

You can customize suggestion items through `suggestionItemFormatter`. You can access `item` in the scope, which represents the suggestion item.

<code src="./custom-suggestion-item.tsx"></code>

## Cascader Panel

The cascader panel is the core component of the cascader. Like the cascader, it supports single selection, multiple selection, dynamic loading, and other features.

Like the cascader, use `options` to specify options, and `props` to set multiple selection, dynamic loading and other features. See the API table below for details.

<code src="./panel.tsx"></code>

<!-- ## Custom Tag

You can customize tags.

Insert the customized tag into the slot of `el-cascader`. `collapse-tags`, `collapse-tags-tooltip`, `max-collapse-tags` will not work in this mode.

<code src="./custom-tag.tsx"></code>

## Show Checked Strategy

Control how selected values are displayed in multiple selection mode.

In multiple selection mode, you can use `show-checked-strategy` to control how selected values are displayed. The default strategy is `child`, which displays all selected child nodes. The `parent` strategy only displays parent nodes when all their child nodes are selected.

<code src="./show-checked-strategy.tsx"></code>

## Click to Check Node

Only use `multiple` or `checkStrictly` attributes.

You can add `checkOnClickNode` to make the node itself clickable (not just the prefix icon). Toggle the visibility of the prefix with `showPrefix`. info{title=TIP} Add `checkOnClickLeaf` to check only leaf nodes (the last level child nodes), enabled by default.

<code src="./check-on-click-node.tsx"></code>

## Custom Header & Footer

You can customize the header and footer of the dropdown through slots.

Use slots to customize content.

<code src="./custom-header-footer.tsx"></code> -->

## Cascader API

### Cascader Properties

| Name                         | Description                                                                                                           | Type                                                                                          | Default |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------- |
| defaultValue                 | Default value                                                                                                         | <Enum type='object'>CascaderValue</Enum>                                                      | —       |
| value                        | Binding value of selected item                                                                                        | <Enum type='object'>CascaderValue</Enum>                                                      | —       |
| options                      | Data source of options. `value` and `label` can be customized through `CascaderMenuProps`.                           | <Enum type='object'>Record<string, unknown>[]</Enum>                                          | —       |
| props                        | Configuration options, see the `CascaderMenuProps` table below.                                                       | <Enum type='object'>CascaderMenuProps</Enum>                                                  | —       |
| placeholder                  | Input placeholder text                                                                                                 | `string`                                                                                      | —       |
| disabled                     | Whether disabled                                                                                                      | `boolean`                                                                                     | —       |
| clearable                    | Whether to support clearing options                                                                                   | `boolean`                                                                                     | —       |
| showAllLevels                | Whether to display the full path of the selected value in the input                                                    | `boolean`                                                                                     | true    |
| collapseTags                 | Whether to collapse tags in multiple selection mode                                                                     | `boolean`                                                                                     | —       |
| size                         | Size                                                                                                                  | <Enum>'large' \| 'default' \| 'small'</Enum>                                                  | —       |
| maxCollapseTags              | Maximum number of tags to display. Only takes effect when collapseTags is set to true.                                  | `number`                                                                                      | —       |
| collapseTagsTooltip          | When hovering over the text of collapsed tags, whether to display all selected tags. To use this, collapseTags must be set to true | `boolean`                                                                                     | false   |
| maxCollapseTagsTooltipHeight | Maximum height of collapse tags                                                                                       | `string` / `number`                                                                           | —       |
| collapseTips                 | Formatter function for the text of collapsed tags when hovering. To use this, `collapseTags` must be set to true.       | <Enum type='Function'>(collapseNum: number, total: number) => string </Enum>                  | false   |
| separator                    | Character used to separate options                                                                                     | `string`                                                                                      | ' / '   |
| filterable                   | Whether the option can be searched                                                                                     | `boolean`                                                                                     | —       |
| filterMethod                 | Custom search logic. The first parameter is the node, the second is the search keyword. The returned boolean indicates whether to keep the option. | <Enum type='Function'>(val: CascaderValue, searchText: string) => boolean</Enum> | —       |
| nodeFormatter                | Custom content of option nodes. Receives the Node object and data of the current node respectively.                    | <Enum type='Function'>(params: { node?: CascaderNode; data?: any }) => React.reactNode</Enum> | —       |
| suggestionItemFormatter      | Custom suggestion item content when searching                                                                          | <Enum type='Function'>(item: CascaderNode[]) => React.reactNode</Enum>                        | —       |
| plain                        | Whether it is plain text mode (no border)                                                                             | `boolean`                                                                                     | —       |
| prefix                       | Input prefix content, only effective for type="text"                                                                   | `string` / `Component`                                                                        | —       |
| suffix                       | Input suffix content, only effective for type="text"                                                                   | `string` / `Component`                                                                        | —       |
| prepend                      | Input prepend content, only effective for type="text"                                                                  | `string` / `Component`                                                                        | —       |
| append                       | Input append content, only effective for type="text"                                                                   | `string` / `Component`                                                                        | —       |
| labelFormatter               | Custom label format function                                                                                          | <Enum type='Function'>(level?: number, node?: object[]) => string</Enum>                      | —       |
| shouldSelect                 | Whether it can be selected                                                                                            | <Enum type='Function'>(node?: object, level?: number) => boolean</Enum>                       | —       |
| popperClass                  | Custom class name for the popup content                                                                               | `string`                                                                                      | ''      |

<!-- The following properties were not found in the current type definitions
| lable                        | Label                                                                                                                 | `string`                                                                                      | —      |
| panel                        | Whether to display as a panel                                                                                         | `boolean`                                                                                     | —      |
| appendToBody                 | Whether to append to body                                                                                             | `boolean`                                                                                     | —      |
| noDataText                   | Text displayed when options are empty                                                                                  | `string`                                                                                      | —      |
| noMatchText                  | Text displayed when there is no search match                                                                           | `string`                                                                                      | —      |
| loading                      | Whether data is being fetched from remote                                                                              | `boolean`                                                                                     | —      |
| loadingText                  | Text displayed during remote loading                                                                                   | `string`                                                                                      | —      |
| required                     | Whether required                                                                                                      | `boolean`                                                                                     | —      |
| debounce                     | Debounce delay when typing search keyword, in milliseconds                                                              | `number`                                                                                      | 300    |
 -->

### Cascader Events

| Name            | Description                                                      | Type                                                                                                                    |
| --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| onChange        | Triggered when the binding value changes                          | <Enum type="Function">(value: CascaderValue, level?: number, label?: string\|string[], node?: S[]\|S[][]) => void/Enum> |
| onExpandChange  | Triggered when expanded nodes change                              | <Enum type="Function">(value: CascaderValue) => void</Enum>                                                             |
| onClear         | Triggered when user clicks the clear button in clearable single selection mode | <Enum type="Function">() => void</Enum>                                                                                 |
| onVisibleChange | Triggered when the dropdown appears/disappears                    | <Enum type="Function">(value: boolean) => void</Enum>                                                                   |
| onRemoveTag     | Triggered when a tag is removed in multiple selection mode        | <Enum type="Function">(node: CascaderNode) => void</Enum>                                                               |

### CascaderRef

| Name                | Description                                                                                                                          | Type                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| getCheckedNodes     | Get an array of currently selected nodes. (leafOnly) whether to return only leaf checked nodes, default is `false`                  | <Enum type="Function">() => CascaderNode[][] \| undefined</Enum> |
| ref                 | Ref of cascader input container                                                                                                      | <Enum type="object">RefObject<HTMLDivElement></Enum>             |
| togglePopperVisible | Toggle popper visibility                                                                                                             | <Enum type="Function">(visible?: boolean) => void</Enum>         |
| input               | Input ref                                                                                                                            | <Enum type="object">input</Enum>                                 |
| presentText         | Selected content text                                                                                                                | string                                                           |

## CascaderPanel API

### CascaderPanel Properties

| Name         | Description                                                                           | Type                                                                       | Default |
| ------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| defaultValue | Default value                                                                         | `string` /`number` /<Enum type='object'>string[] \| number[] \| any</Enum> | —       |
| value        | Binding value of selected item                                                        | `string` /`number` /<Enum type='object'>string[] \| number[] \| any</Enum> | —       |
| options      | Data source of options. `value` and `label` can be customized through `CascaderMenuProps`. | <Enum type='object'>Record<string, unknown>[]</Enum>                       | —       |
| props        | Configuration options, see the `CascaderMenuProps` table below.                       | <Enum type='object'>CascaderMenuProps</Enum>                               | —       |

### CascaderPanel Events

| Name            | Description                                                      | Type                                                        |
| --------------- | ---------------------------------------------------------------- | ----------------------------------------------------------- |
| onChange        | Triggered when the binding value changes                          | <Enum type="Function">(value: CascaderValue) => void</Enum> |
| onExpandChange  | Triggered when expanded nodes change                              | <Enum type="Function">(value: CascaderValue) => void</Enum> |

### CascaderPanelRef

| Name              | Description                                                                                                                          | Type                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| getCheckedNodes   | Get an array of currently selected nodes. (leafOnly) whether to return only leaf checked nodes, default is `false`                  | <Enum type='Function'>(leafOnly: boolean) => CascaderNode[] \| undefined</Enum> |
| clearCheckedNodes | Clear selected nodes                                                                                                                 | <Enum type='Function'>() => void</Enum>                                         |

## CascaderMenuProps

| Attribute     | Description                                                                                                         | Type                                                                                                          | Default  |
| ------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| expandTrigger | How secondary menus are expanded                                                                                    | <Enum>'click' \| 'hover'</Enum>                                                                               | click    |
| multiple      | Whether multiple selection is enabled                                                                                | `boolean`                                                                                                     | false    |
| checkStrictly | Whether parent and child nodes are not strictly linked                                                               | `boolean`                                                                                                     | false    |
| emitPath      | When a selected node changes, whether to return an array of values from each level menu. If set to false, only the node's value is returned. | `boolean`                                                                                                     | —        |
| lazy          | Whether to dynamically load child nodes, needs to be used with lazyLoad method                                       | `boolean`                                                                                                     | false    |
| lazyLoad      | Method for loading dynamic data, only effective when lazy is true                                                   | <Enum type='Function'>(node: object, resolve?: (value: object[]) => void, reject?: () => void) => void</Enum> | —        |
| value         | Specify which attribute of the option object is used as the option's value                                           | `string`                                                                                                      | value    |
| label         | Specify which attribute of the option object is used as the option's label                                          | `string`                                                                                                      | label    |
| children      | Specify which attribute of the option object is used as the option's sub-options                                     | `string`                                                                                                      | children |
| disabled      | Specify which attribute of the option object is used as the option's disabled state                                  | `string`                                                                                                      | disabled |
| leaf          | Specify which attribute of the option object is used as the leaf node flag                                           | `string`                                                                                                      | —        |

## Type Declarations

<details open>
  <summary>Show declarations</summary>

```ts
type CascaderNodeValue = string | number;
type CascaderNodePathValue = CascaderNodeValue[];
type CascaderValue = CascaderNodeValue | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[];

type Resolve = (data: any) => void;

type ExpandTrigger = 'click' | 'hover';

type LazyLoad = (node: Node, resolve: Resolve) => void;

type isDisabled = (data: CascaderOption, node: Node) => boolean;

type isLeaf = (data: CascaderOption, node: Node) => boolean;

interface CascaderOption extends Record<string, unknown> {
    label?: string;
    value?: CascaderNodeValue;
    children?: CascaderOption[];
    disabled?: boolean;
    leaf?: boolean;
}

interface CascaderMenuProps {
    /** How secondary menus are expanded */
    expandTrigger?: 'click' | 'hover';
    /** Whether multiple selection is enabled */
    multiple?: boolean;
    /** Whether parent and child nodes are not strictly linked */
    checkStrictly?: boolean;
    /** Whether to dynamically load child nodes, needs to be used with lazyLoad method */
    lazy?: boolean;
    /** Method for loading dynamic data, only effective when lazy is true */
    lazyLoad?: (node: object, resolve?: (value: object[]) => void, reject?: () => void) => void;
    /** Specify which attribute of the option object is used as the option's value */
    value?: string;
    /** Specify which attribute of the option object is used as the option's label */
    label?: string;
    /** Specify which attribute of the option object is used as the option's sub-options */
    children?: string;
    /** Specify which attribute of the option object is used as the option's disabled state */
    disabled?: string;
    /** Specify which attribute of the option object is used as the leaf node flag */
    leaf?: string;
}

interface CascaderNode extends Object {
    /**
     * Primary key
     * @private
     */
    __id: string;
    /**
     * Parent node ID
     * @private
     */
    __pId: string;
    /**
     * Level
     * @private
     */
    __level?: number;
    /**
     * Whether it is a leaf node
     * @private
     */
    __leaf?: boolean;
    /**
     * Whether checked
     * @private
     */
    __checked?: boolean;
    /**
     * Whether indeterminate
     * @private
     */
    __indeterminate?: boolean;
    /**
     * Node data
     * @private
     */
    data?: object;
    /**
     * Sub-node collection
     * @private
     */
    children?: OptionNode[];
    /**
     * Sub-node collection for tree component
     * @private
     */
    treeChildren?: boolean;
}
```

</details>