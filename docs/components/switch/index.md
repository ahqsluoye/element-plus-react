---
title: Switch 开关
lang: zh-CN
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `value` 到一个 `Boolean` 类型的变量。可以使用 `activeColor` 属性与 `inactiveColor` 属性来设置开关的背景色。 也可以使用 `--el-switch-on-color` 属性与 `--el-switch-off-color` 属性来设置开关的背景色。

<code src="./basic.tsx"></code>

## 尺寸

<code src="./sizes.tsx"></code>

## 文字描述

使用`activeText`属性与`inactiveText`属性来设置开关的文字描述。 使用 `inlinePrompt` 属性来控制文本是否显示在点内。

使用`activeText`属性与`inactiveText`属性来设置开关的文字描述。

<code src="./text-description.tsx"></code>

## 显示自定义图标

:::info{title=TIP}

使用 `inactiveIcon` 和 `activeIcon` 属性来添加图标。 您可以传递组件名称的字符串（提前注册）或组件本身是一个 SVG Vue 组件。 Element Plus 提供了一组图标，您可以在 [icon component](/zh-CN/component/icon) 查看。

:::

使用 `inactiveIcon` 和 `activeIcon` 属性来添加图标。 使用 `inlinePrompt` 属性来控制图标显示在点内。

<code src="./custom-icons.tsx"></code>

## 扩展的 value 类型

你可以设置 `activeValue` 和 `inactiveValue` 属性， 它们接受 `Boolean`、`String` 或 `Number` 类型的值。

<code src="./extended-value-types.tsx"></code>

## 禁用状态

设置`disabled`属性，接受一个`Boolean`，设置`true`即可禁用。

<code src="./disabled.tsx"></code>

## 加载状态

设置`loading`属性，接受一个`Boolean`，设置`true`即加载中状态。

<code src="./loading.tsx"></code>

## 阻止切换

设置`beforeChange`属性，若返回 false 或者返回 Promise 且被 reject，则停止切换。

<code src="./prevent-switching.tsx"></code>

## 属性

| 属性名             | 说明                                                                             | 类型                                | 可选值                  | 默认值  |
| ------------------ | -------------------------------------------------------------------------------- | ----------------------------------- | ----------------------- | ------- |
| value              | 绑定值，必须等于 `activeValue` 或 `inactiveValue`，默认为 `Boolean` 类型         | boolean / string / number           | —                       | —       |
| disabled           | 是否禁用                                                                         | boolean                             | —                       | false   |
| loading            | 是否显示加载中                                                                   | boolean                             | —                       | false   |
| size               | switch 的大小                                                                    | string                              | large / default / small | default |
| width              | switch 的宽度                                                                    | number                              | —                       | —       |
| inlinePrompt       | 图标或文本是否显示在点内                                                         | boolean                             | —                       | false   |
| activeIcon         | switch 状态为 `on` 时所显示图标，设置此项会忽略 `activeText`                     | `string \| Component`               | —                       | —       |
| inactiveIcon       | switch 状态为 `off` 时所显示图标，设置此项会忽略 `inactiveText`                  | `string \| Component`               | —                       | —       |
| activeActionIcon   | `on`状态下显示的图标组件                                                         | `string \| Component`               | —                       |
| inactiveActionIcon | `off`状态下显示的图标组件                                                        | `string \| Component`               | —                       |
| activeText         | switch 打开时的文字描述                                                          | string                              | —                       | —       |
| inactiveText       | switch 的状态为 `off` 时的文字描述                                               | string                              | —                       | —       |
| activeValue        | switch 状态为 `on` 时的值                                                        | boolean / string / number           | —                       | true    |
| inactiveValue      | switch 的状态为 `off` 时的值                                                     | boolean / string / number           | —                       | false   |
| activeColor        | 当在 `on` 状态时的背景颜色(已废弃，请使用 CSS var `--el-switch-on-color` )       | string                              | —                       | —       |
| inactiveColor      | `off` 状态时的背景颜色(已废弃，使用 CSS var `--el-switch-of-color` )             | string                              | —                       | —       |
| borderColor        | 开关的边框颜色 ( 已废弃，使用 CSS var `--el-switch-border-color` )               | string                              | —                       | —       |
| name               | switch 对应的 name 属性                                                          | string                              | —                       | —       |
| beforeChange       | switch 状态改变前的钩子， 返回 `false` 或者返回 `Promise` 且被 reject 则停止切换 | `() => Promise<boolean> \| boolean` | —                       | —       |

## 事件

| 事件名   | 说明                            | 回调参数        |
| -------- | ------------------------------- | --------------- |
| onChange | switch 状态发生变化时的回调函数 | val，新状态的值 |
