---
title: Popconfirm 气泡确认框
`boolean` ang: zh-CN
---

# Popconfirm 气泡确认框

点击某个元素弹出一个简单的气泡确认框

:::info{title=TIP}

在 SSR 场景下，您需要将组件包裹在 `<client-only></client-only>` 之中 (如: [Nuxt](https://nuxt.com/v3)) 和 SSG (e.g: [VitePress](https://vitepress.vuejs.org/)).

:::

## 基础用法

Popconfirm 的属性与 Popover 很类似， 因此对于重复属性，请参考 Popover 的文档，在此文档中不做详尽解释。

在 Popconfirm 中，只有 `title` 属性可用，`content` 属性会被忽略。

<code src="./basic-usage.tsx"></code>

## 自定义弹出框的内容

可以在 Popconfirm 中自定义内容。

<code src="./customize.tsx"></code>

## 多种让 Popconfirm 出现的方法

点击按钮触发事件

<!-- <code src="./trigger-event.tsx"></code> -->

## API

### 属性

| 属性名              | 说明                                                                                 | 类型                                                                             | 默认           |
| ------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- | -------------- |
| title               | 标题                                                                                 | `string`                                                                         | —              |
| confirm-button-text | 确认按钮文字                                                                         | `string`                                                                         | —              |
| cancel-button-text  | 取消按钮文字                                                                         | `string`                                                                         | —              |
| confirm-button-type | 确认按钮类型                                                                         | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'</Enum> | primary        |
| cancel-button-type  | 取消按钮类型                                                                         | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'</Enum> | text           |
| icon                | 自定义图标                                                                           | `string` / `Component`                                                           | QuestionFilled |
| icon-color          | Icon 颜色                                                                            | `string`                                                                         | #f90           |
| hide-icon           | 是否隐藏 Icon                                                                        | `boolean`                                                                        | false          |
| hide-after          | 关闭时的延迟                                                                         | `number`                                                                         | 200            |
| teleported          | 是否将 popover 的下拉列表插入至 body 元素                                            | `boolean`                                                                        | true           |
| persistent          | 当 popover 组件长时间不触发且 `persistent` 属性设置为 `false` 时, popover 将会被删除 | `boolean`                                                                        | false          |
| width               | 弹层宽度，最小宽度 150px                                                             | `string` / `number`                                                              | 150            |

### 事件

| 插槽名  | 说明               | 类型                                                 |
| ------- | ------------------ | ---------------------------------------------------- |
| confirm | 点击确认按钮时触发 | <Enum type='Function'>(e: MouseEvent) => void</Enum> |
| cancel  | 点击取消按钮时触发 | <Enum type='Function'>(e: MouseEvent) => void</Enum> |

### Slots

| 事件名    | 说明                             |
| --------- | -------------------------------- |
| reference | 触发 Popconfirm 显示的 HTML 元素 |
