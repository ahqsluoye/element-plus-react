---
title: Collapse 折叠面板
lang: zh-CN
---

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<code src="./basic.tsx"></code>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示。

<code src="./accordion.tsx"></code>

## 自定义面板标题

通过 `title` 属性 来实现自定义面板的标题内容，以实现增加图标等效果。

<code src="./customization.tsx"></code>

## Collapse 属性

| 属性名            | 详情                                                                                | 类型               | 可选值 | 默认值 |
| ----------------- | ----------------------------------------------------------------------------------- | ------------------ | ------ | ------ |
| defaultActiveName | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`)           | `string` / `array` | —      | —      |
| activeName        | 当前激活的面板(可控模式：如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | `string` / `array` | —      | —      |
| accordion         | 是否手风琴模式                                                                      | `boolean`          | —      | false  |

## Collapse 事件

| 事件名   | 说明                                                                      | 类型                                                                |
| -------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| onChange | 切换当前活动面板，在手风琴模式下其类型是 `string`，在其他模式下是 `array` | <Enum type='Function'>(activeNames: array \| string) => void</Enum> |

## Collapse Item 属性

| 属性名   | 说明       | 类型                | 可选值 | 默认值 |
| -------- | ---------- | ------------------- | ------ | ------ |
| name     | 唯一标志符 | `string` / `number` | —      | —      |
| title    | 面板标题   | `string`            | —      | —      |
| disabled | 是否禁用   | `boolean`           | —      | —      |
