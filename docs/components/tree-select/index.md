---
title: TreeSelect 树形选择
lang: zh-CN
---

<Meta></Meta>

# TreeSelect 树形选择

含有下拉菜单的树形选择器，结合了 `ElTree` 和 `ElSelect` 两个组件的功能。

## 基础用法

树状选择器

<code src="./basic.tsx"></code>

## 选择任意级别

当属性 `checkStrictly=true` 时，任何节点都可以被选择，否则只有子节点可被选择。

:::info{title=TIP}

当使用 `showCheckbox`时，由于 `checkOnClickNode` 默认值是 false，这时候只能通过 checkbox 来选中，当然您也可以将其设置成 true，这样点击整个 node 都可以用来完成选择

:::
<code src="./check-strictly.tsx"></code>

:::error{title=TIP}

在使用 showCheckbox 时，因为 `checkOnClickLeaf` 默认值为 true， 最后一个树节点可以通过点击节点进行勾选。

:::

## 多选

通过点击或复选框选择多个选项。

<code src="./multiple.tsx"></code>

## 禁用选项

使用 disabled 字段禁用选项。

<code src="./disabled.tsx"></code>

## 可筛选

使用关键字筛选或自定义筛选方法。 `filterMethod`可以自定义数据筛选的方法， `filterNodeMethod`可以自定义节点数据筛选的方法。

<code src="./filterable.tsx"></code>

## 自定义内容

自定义树节点的内容。

<code src="./slots.tsx"></code>

## 懒加载

树节点懒加载，更加适合于数据量大的列表。

<code src="./lazy.tsx"></code>

## API

### 属性

由于这个组件是`ElTree`和`ElSelect`的结合体，他们的原始属性未被更改，故不在此重复。请跳转查看原组件的相应文档。

| 属性                           | 方法                    | 事件                           |
| ------------------------------ | ----------------------- | ------------------------------ |
| [tree](./tree#属性)            | [tree](./tree#方法)     | [tree](./tree#事件)            |
| [select](./select#select-属性) | [select](./select#方法) | [select](./select#select-事件) |

#### 其他属性

| 属性名    | 详情                                                           | 类型                                     | 默认值 |
| --------- | -------------------------------------------------------------- | ---------------------------------------- | ------ |
| cacheData | 懒加载节点的缓存数据，结构与数据相同，用于获取未加载数据的标签 | <Enum type="object">CacheOption[]</Enum> | []     |

## 类型声明

<details open>
  <summary>显示类型声明</summary>

```ts
type CacheOption = {
    value: string | number | boolean | object;
    label: string | number;
    isDisabled: boolean;
};
```

</details>
