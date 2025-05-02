---
title: Popconfirm 气泡确认框
lang: zh-CN
---

# Popconfirm 气泡确认框

点击某个元素弹出一个简单的气泡确认框

## 基础用法

Popconfirm 的属性与 Popover 很类似， 因此对于重复属性，请参考 Popover 的文档，在此文档中不做详尽解释。

在 Popconfirm 中，只有 `title` 属性可用，`content` 属性会被忽略。

<code src="./basic-usage.tsx"></code>

## 自定义弹出框的内容

可以在 Popconfirm 中自定义内容。

<code src="./customize.tsx"></code>

## API

### 属性

| 属性名            | 说明                     | 类型                                                                             | 默认           |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------- | -------------- |
| title             | 标题                     | `string`                                                                         | —              |
| confirmButtonText | 确认按钮文字             | `string`                                                                         | —              |
| cancelButtonText  | 取消按钮文字             | `string`                                                                         | —              |
| confirmButtonType | 确认按钮类型             | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'</Enum> | primary        |
| cancelButtonType  | 取消按钮类型             | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'</Enum> | text           |
| icon              | 自定义图标               | `string` / `Component`                                                           | QuestionFilled |
| iconColor         | Icon 颜色                | `string`                                                                         | #f90           |
| hideIcon          | 是否隐藏 Icon            | `boolean`                                                                        | false          |
| width             | 弹层宽度，最小宽度 150px | `string` / `number`                                                              | 150            |
