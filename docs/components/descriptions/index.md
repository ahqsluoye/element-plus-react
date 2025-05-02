---
title: Descriptions 描述列表
lang: zh-CN
---

# Descriptions 描述列表

列表形式展示多个字段。

## 基础用法

<code src="./basic-usage.tsx"></code>

## 不同尺寸

<code src="./sizes.tsx"></code>

## 垂直列表

<code src="./vertical-list.tsx"></code>

## 自定义样式

<code src="./customized-style.tsx"></code>

## Descriptions API

### Descriptions 属性

| 属性名    | 说明                            | 类型                                               | 默认       |
| --------- | ------------------------------- | -------------------------------------------------- | ---------- |
| border    | 是否带有边框                    | `boolean`                                          | false      |
| column    | 一行 `Descriptions Item` 的数量 | `number`                                           | 3          |
| direction | 排列的方向                      | <Enum>'vertical' \| 'horizontal'</Enum>            | horizontal |
| size      | 列表的尺寸                      | <Enum>'' \| 'large' \| 'default' \| 'small'</Enum> | —          |
| title     | 标题文本，显示在左上方          | `string`                                           | ''         |
| extra     | 操作区文本，显示在右上方        | `string`                                           | ''         |

<!--
| labelWidth | 每一列的标签宽度                | `string` / `number`                                | ''         | -->

## DescriptionsItem API

### DescriptionsItem 属性

| 属性名         | 说明                                                                                                                                               | 类型                                       | 默认 |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ---- |
| label          | 标签文本                                                                                                                                           | `string`                                   | ''   |
| span           | 列的数量                                                                                                                                           | `number`                                   | 1    |
| width          | 列的宽度，不同行相同列的宽度按最大值设定（如无 `border` ，宽度包含标签与内容）                                                                     | `string` / `number`                        | ''   |
| minWidth       | 列的最小宽度，与 `width` 的区别是 `width` 是固定的，`minWidth` 会把剩余宽度按比例分配给设置了 `minWidth` 的列（如无 `border`，宽度包含标签与内容） | `string` / `number`                        | ''   |
| align          | 列的内容对齐方式（如无 `border`，对标签和内容均生效）                                                                                              | <Enum>'left' \| 'center' \| 'right'</Enum> | left |
| labelAlign     | 列的标签对齐方式，若不设置该项，则使用内容的对齐方式（如无 `border`，请使用 `align` 参数）                                                         | <Enum>'left' \| 'center' \| 'right'</Enum> | ''   |
| className      | 列的内容自定义类名                                                                                                                                 | `string`                                   | ''   |
| labelClassName | column label custom class name                                                                                                                     | `string`                                   | ''   |

<!--
| rowspan        | 单元格应该跨越的行数                                                                                                                               | `number`                                   | 1    |
| labelWidth     | 列标签宽，如果未设置，它将与列宽度相同。 比 `Descriptions` 的 `labelWidth` 优先级高                                                                | `string` / `number`                        | ''   | -->
