---
title: Radio 单选框
`boolean` ang: zh-CN
---

# Radio 单选框

在一组备选项中进行单选

## 基础用法

单选框不应该有太多的可选项， 如果你有很多的可选项你应该使用选择框而不是单选框。

<code src="./basic-usage.tsx"></code>

## 禁用状态

`disabled` 属性可以用来控制单选框的禁用状态。

你只需要为单选框设置 `disabled` 属性就能控制其禁用状态。

<code src="./disabled.tsx"></code>

## 单选框组

适用于在多个互斥的选项中选择的场景

结合`ElRadioGroup`元素和子元素`ElRadio`可以实现单选组， 为 `ElRadioGroup` 绑定 `value`，再为 每一个 `ElRadio` 设置好 `value` 属性即可， 另外，还可以通过 `onChange` 事件来响应变化，它会传入一个参数 `value` 来表示改变之后的值。

<code src="./radio-button-group.tsx"></code>

## 按钮样式

你可以让单选框看起来像一个按钮一样。

只需要把 `ElRadio` 元素换成 `ElRadio.Button` 元素即可， 此外，Element Plus React 还提供了 `size` 属性用来控制单选框的大小。

<code src="./button-style.tsx"></code>

<!-- ## 带有边框

设置 `border` 属性为 true 可以渲染为带有边框的单选框。

<code src="./with-borders.tsx"></code> -->

## Radio API

### Radio 属性

| 属性名         | 说明               | 类型                                         | 默认值 |
| -------------- | ------------------ | -------------------------------------------- | ------ |
| value          | 选中项绑定值       | `string` / `number` / `boolean`              | —      |
| checked        | 是否选中（可控）   | `boolean`                                    | false  |
| defaultChecked | 是否选中（默认值） | `boolean`                                    | false  |
| disabled       | 是否禁用单选框     | `boolean`                                    | false  |
| size           | 单选框的尺寸       | <Enum>'large' \| 'default' \| 'small'</Enum> | —      |
| name           | 原始 `name` 属性   | `string`                                     | —      |

### Radio 事件

| 事件名   | 说明                   | 类型                                                                      |
| -------- | ---------------------- | ------------------------------------------------------------------------- |
| onChange | 绑定值变化时触发的事件 | <Enum type='Function'>(value: string \| number \| boolean) => void</Enum> |

## RadioGroup API

### RadioGroup 属性

| 属性名   | 说明                       | 类型                            | 默认值  |
| -------- | -------------------------- | ------------------------------- | ------- |
| value    | 选中项绑定值               | `string` / `number` / `boolean` | —       |
| size     | 单选框按钮或边框按钮的大小 | `string`                        | default |
| disabled | 是否禁用                   | `boolean`                       | false   |
| name     | 原生 `name` 属性           | `string`                        | —       |

### RadioGroup 事件

| 事件名   | 说明                   | 类型                                                                      |
| -------- | ---------------------- | ------------------------------------------------------------------------- |
| onChange | 绑定值变化时触发的事件 | <Enum type='Function'>(value: string \| number \| boolean) => void</Enum> |

## RadioButton API

### RadioButton 属性

| 属性名         | 说明               | 类型                                         | 默认  |
| -------------- | ------------------ | -------------------------------------------- | ----- |
| value          | 选中项绑定值       | `string` / `number` / `boolean`              | —     |
| checked        | 是否选中（可控）   | `boolean`                                    | false |
| defaultChecked | 是否选中（默认值） | `boolean`                                    | false |
| disabled       | 是否禁用单选框     | `boolean`                                    | false |
| size           | 单选框的尺寸       | <Enum>'large' \| 'default' \| 'small'</Enum> | —     |
| name           | 原始 `name` 属性   | `string`                                     | —     |
