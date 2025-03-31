---
title: Checkbox 多选框
lang: zh-CN
---

# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 `Checkbox` 按钮后的介绍。

`CheckboxGroup`元素能把多个 `checkbox` 管理为一组，只需要在 `Group` 中使用 `value` 绑定 `Array` 类型的变量即可。
只有一个选项时的默认值类型为 `Boolean`，当选中时值为`true`。 `Checkbox` 标签中的内容将成为复选框按钮之后的描述。

<code src="./basic.tsx"></code>

## 禁用状态

多选框不可用状态。

设置 `disabled` 属性即可。

<code src="./disabled.tsx"></code>

## 多选框组

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

在 `Checkbox` 元素中定义 `value` 绑定变量，单一的 checkbox 中，默认绑定变量的值会是 `Boolean`，选中为 `true`。
在 `Checkbox` 组件中，`value` 是选择框的值。 `value` 也与数组中的元素值相对应。 如果指定的值存在于数组中，就处于选择状态，反之亦然。

<code src="./grouping.tsx"></code>

## 中间状态

`indeterminate` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

<code src="./intermediate.tsx"></code>

## 可选项目数量的限制

使用 `min` 和 `max` 属性能够限制可以被勾选的项目的数量。

<code src="./limitation.tsx"></code>

## 按钮样式

按钮样式的多选组合。

只需要把 `elCheckbox` 元素替换为 `el-checkbox-button` 元素即可。 此外，Element Plus 还提供了`size`属性。

<code src="./button-style.tsx"></code>

<!-- ## 带有边框

设置`border`属性可以渲染为带有边框的多选框。

<code src="./with-border.tsx"></code> -->

## Checkbox API

### Checkbox 属性

| 属性名         | 说明                           | 类型                                         | 默认值 |
| -------------- | ------------------------------ | -------------------------------------------- | ------ |
| value          | 选中状态的值                   | `string` / `number`                          | —      |
| disabled       | 是否禁用                       | `boolean`                                    | false  |
| border         | 是否显示边框                   | `boolean`                                    | false  |
| size           | Checkbox 的尺寸                | <Enum>'large' \| 'default' \| 'small'</Enum> | —      |
| name           | 原生 name 属性                 | `string`                                     | —      |
| checked        | 当前是否勾选（可控）           | `boolean`                                    | false  |
| defaultChecked | 默认是否选中                   | `boolean`                                    | false  |
| indeterminate  | 设置不确定状态，仅负责样式控制 | `boolean`                                    | false  |

### Checkbox 事件

| 事件名          | 说明                     | 类型                                                                                                                  |
| --------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| onChange        | 当绑定值变化时触发的事件 | <Enum type='Function'>(checked: boolean, value: ValueType, event: React.ChangeEvent<HTMLInputElement>) => void</Enum> |
| onClick         | 当绑定值变化时触发的事件 | <Enum type='Function'>(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void</Enum>                          |
| onCheckboxClick | 点击 checkbox 事件       | <Enum type='Function'>(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void</Enum>                          |

## CheckboxGroup API

### CheckboxGroup 属性

| 属性名             | 说明                                  | 类型                                            | 默认值 |
| ------------------ | ------------------------------------- | ----------------------------------------------- | ------ |
| value              | 选中状态的值                          | <Enum type='object'>string[] \| number[]</Enum> | []     |
| size               | 多选框组尺寸                          | <Enum>'large' \| 'default' \| 'small'</Enum>    | —      |
| disabled           | 是否禁用                              | `boolean`                                       | false  |
| getBooleanOnSingle | 单个 CheckBox 时获取 Boolean 类型的值 | `boolean`                                       | false  |
| min                | 可被勾选的 checkbox 的最小数量        | `number`                                        | —      |
| max                | 可被勾选的 checkbox 的最大数量        | `number`                                        | —      |

### CheckboxGroup 事件

| 事件名   | 说明                     | 类型                                                                                |
| -------- | ------------------------ | ----------------------------------------------------------------------------------- |
| onChange | 当绑定值变化时触发的事件 | <Enum type='Function'>(value: boolean \| ValueType[], event?: Event) => void</Enum> |
