---
title: TreeSelect
lang: en-US
---

<Meta></Meta>

# TreeSelect

A tree selector with a dropdown menu, combining the functionality of both `ElTree` and `ElSelect` components.

## Basic Usage

Selector for tree structures.

<code src="./basic.tsx"></code>

## Select any Level

When the `checkStrictly` attribute is set to `true`, any node can be selected; otherwise, only child nodes can be selected.

:::info{title=TIP}

When using `showCheckbox`, since `checkOnClickNode` defaults to `false`, you can only select via the checkbox. Of course, you can also set it to `true`, so clicking the entire node can complete the selection.

:::
<code src="./check-strictly.tsx"></code>

:::warning{title=TIP}

When using `showCheckbox`, since `checkOnClickLeaf` defaults to `true`, the last tree node can be checked by clicking on the node.

:::

## Multiple Selection

Select multiple options via clicks or checkboxes.

<code src="./multiple.tsx"></code>

## Disabled Options

Disable options using the `disabled` field.

<code src="./disabled.tsx"></code>

## Filterable

Use keyword filtering or custom filtering methods. `filterMethod` can customize the data filtering method, and `filterNodeMethod` can customize the node data filtering method.

<code src="./filterable.tsx"></code>

## Custom Content

Customize the content of tree nodes.

<code src="./slots.tsx"></code>

## Lazy Load

Lazy loading of tree nodes, more suitable for lists with large data volumes.

<code src="./lazy.tsx"></code>

## API

### Properties

Since this component is a combination of `ElTree` and `ElSelect`, their original properties have not been changed, so they are not repeated here. Please refer to the original component documentation.

| Properties                     | Methods                | Events                         |
| ------------------------------ | ---------------------- | ------------------------------ |
| [tree](./tree#properties)      | [tree](./tree#methods) | [tree](./tree#events)          |
| [select](./select#select-properties) | [select](./select#methods) | [select](./select#select-events) |

#### Other Properties

| Name      | Description                                                            | Type                                     | Default |
| --------- | ---------------------------------------------------------------------- | ---------------------------------------- | ------- |
| cacheData | Cached data for lazy-loaded nodes, same structure as data, used to get the label of unloaded data | <Enum type="object">CacheOption[]</Enum> | []      |

## Type Declarations

<details open>
  <summary>Show Declarations</summary>

```ts
type CacheOption = {
    value: string | number | boolean | object;
    label: string | number;
    isDisabled: boolean;
};
```

</details>