---
title: Tag 标签
lang: zh-CN
---

# Tag 标签

用于标记和选择。

## 基础用法

由 `type` 属性来选择 tag 的类型。 也可以通过 `color` 属性来自定义背景色。

<code src="./basic.tsx"></code>

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。 它接受一个 `Boolean`。 默认的标签移除时会附带渐变动画。 如果不想使用，可以设置 `disableTransitions` 属性，它接受一个 `Boolean`，`true` 为关闭。 当 Tag 被移除时会触发 `onClose` 事件。

<code src="./removable.tsx"></code>

## 动态编辑标签

动态编辑标签可以通过点击标签关闭按钮后触发的 `onClose` 事件来实现。

<code src="./editable.tsx"></code>

## 不同尺寸

Tag 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

使用 `size` 属性来设置额外尺寸, 可选值包括 `large`, `default` 或 `small`.

<code src="./sizes.tsx"></code>

## 主题

Tag 组件提供了三个不同的主题：`dark`、`light` 和 `plain`。

通过设置 `effect` 属性来改变主题，默认为 `light`。

<code src="./theme.tsx"></code>

## 圆形标签

Tag 可以向按钮组件一样变为完全圆形。

<code src="./rounded.tsx"></code>

<!-- ## 可选中的标签

有时候因为业务需求，我们可能会需要用到类似复选框的标签，但是**按钮式的复选框**的样式又不满足需求，此时我们就可以用到 `checkTag`组件。

check-tag 的基础使用方法，check-tag 提供的 API 非常简单。

<code src="./checkable.tsx"></code> -->

## Tag API

### Tag 属性

| 属性名             | 说明             | 类型                                                                   | 可选值  | 默认值 |
| ------------------ | ---------------- | ---------------------------------------------------------------------- | ------- | ------ |
| type               | Tag 的类型       | <Enum>'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'</Enum> | primary |
| closable           | 是否可关闭       | `boolean`                                                              | false   |
| disableTransitions | 是否禁用渐变动画 | `boolean`                                                              | false   |
| hit                | 是否有边框描边   | `boolean`                                                              | false   |
| color              | 背景色           | `string`                                                               | —       |
| size               | Tag 的尺寸       | <Enum>'large' \| 'default' \| 'small'</Enum>                           | —       |
| effect             | Tag 的主题       | <Enum>'dark' \| 'light' \| 'plain'</Enum>                              | light   |
| round              | Tag 是否为圆形   | `boolean`                                                              | false   |

### Tag 事件

| 事件名  | 说明                  | 参数                                                   |
| ------- | --------------------- | ------------------------------------------------------ |
| onClick | 点击 Tag 时触发的事件 | <Enum type="Function">(evt: MouseEvent) => void</Enum> |
| onClose | 关闭 Tag 时触发的事件 | <Enum type="Function">(evt: MouseEvent) => void</Enum> |

<!-- ## CheckTag 属性

| 属性名  | 说明     | 类型    | 可选值     | 默认值 |
| ------- | -------- | ------- | ---------- | ------ |
| checked | 是否选中 | boolean | true/false | —      |

## CheckTag 事件

| 事件名 | 说明                        | 参数    |
| ------ | --------------------------- | ------- |
| change | 点击 Check Tag 时触发的事件 | checked | -->
