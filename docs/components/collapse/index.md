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

## 自定义图标

除了使用 `icon` 属性外，您还可以自定义面板项目图标，从而添加自定义内容。

<code src="./custom-icon.tsx"></code>

## 自定义图标位置

使用 `expand-icon-position` 属性，您可以自定义图标位置。

<code src="./custom-icon-position.tsx"></code>

## 阻止折叠

设置 `beforeChange` 属性，若返回 false 或者返回 `Promise` 且被 `reject` ，则停止切换。

<code src="./prevent-collapsing.tsx"></code>

## Collapse API

### Collapse 属性

| 属性名             | 详情                                                                                | 类型                                                           | 默认值 |
| ------------------ | ----------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| defaultActiveName  | 当前激活的面板(如果是手风琴模式，绑定值类型需要为`string`，否则为`array`)           | `string` / `array`                                             | —      |
| activeName         | 当前激活的面板(可控模式：如果是手风琴模式，绑定值类型需要为`string`，否则为`array`) | `string` / `array`                                             | —      |
| accordion          | 是否手风琴模式                                                                      | `boolean`                                                      | false  |
| expandIconPosition | 设置展开图标位置                                                                    | <Enum type="enum">'left' \| 'right'</Enum>                     | right  |
| beforeCollapse     | 折叠状态更改之前的折叠钩子。 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | <Enum type="Function">() => Promise<boolean> \| boolean</Enum> | —      |

### Collapse 事件

| 事件名   | 说明                                                                    | 类型                                                                |
| -------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- |
| onChange | 切换当前活动面板，在手风琴模式下其类型是`string`，在其他模式下是`array` | <Enum type="Function">(activeNames: array \| string) => void</Enum> |

### Collapse Exposes

| 方法名         | 说明               | 类型                                                                     |
| -------------- | ------------------ | ------------------------------------------------------------------------ |
| activeNames    | 当前活动的面板名称 | <Enum type="object">(string \| number)[]</Enum>                          |
| setActiveNames | 设置活动面板名称   | <Enum type="Function">(activeNames: (string \| number)[]) => void</Enum> |

## Collapse Item API

### Collapse Item 属性

| 属性名   | 说明           | Type                                                                                             | 默认值     |
| -------- | -------------- | ------------------------------------------------------------------------------------------------ | ---------- |
| name     | 唯一标志符     | `string` / `number`                                                                              | —          |
| title    | 面板标题       | `string` / `Component` / <Enum type="Function">((isActive: boolean) => React.ReactNode)</Enum>   | ''         |
| icon     | 折叠项目的图标 | `IconName` / `Component` / <Enum type="Function">((isActive: boolean) => React.ReactNode)</Enum> | ArrowRight |
| disabled | 是否禁用       | `boolean`                                                                                        | false      |

### Collapse Item Exposes

| Name     | Description        | Type                 |
| -------- | ------------------ | -------------------- |
| isActive | 当前折叠项是否激活 | boolean \| undefined |
