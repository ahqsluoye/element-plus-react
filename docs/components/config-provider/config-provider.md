---
title: 全局配置
lang: zh-CN
---

# Config Provider 全局配置

Config Provider 被用来提供全局的配置选项，让你的配置能够在全局都能够被访问到。

## i18n 配置

通过 Config Provider 来配置多语言，让你的应用可以随时切换语言。

:::demo 使用两个属性来提供 i18n 相关配置

config-provider/usage

:::

## 对按钮进行配置

:::demo

config-provider/button

:::

## 对消息进行配置

:::demo

config-provider/message

:::

## 空值配置^(2.7.0)

<details>
  <summary>支持的组件</summary>

- Cascader 级联选择器
- DatePicker 日期选择器
- Select 选择器
- SelectV2 选择器
- TimePicker 时间选择器
- TimeSelect 时间选择
- TreeSelect 树形选择

</details>

设置 `empty-values` 来配置组件的默认空值。 默认值是 `['', null, undefined]`。 如果认为空字符串不是一个空值，可以设置成 `[undefined, null]`。

设置 `value-on-clear` 以设置清空选项的值。 组件默认值是 `undefined`。 在日期组件中是 `null`。 如果想设置成 `undefined`，请使用 `() => undefined`。

:::demo

config-provider/empty-values

:::

## 实验性功能

在本节中，您可以学习如何使用 Config Provider 来提供实验性功能。 现在，我们还没有添加任何实验性功能，但在未来的规划中，我们将添加一些实验性功能。 您可以使用此配置来管理这些功能。

 <!-- TODO -->

## API

### Config Provider Attributes

| 属性名                     | 说明                                                                                                                                     | 类型                                                                                                                                                                                                                                                             | 默认值                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| locale                  | 翻译文本对象                                                                                                                                 | ^[object]`{name: string, el: TranslatePair}`[](https://github.com/element-plus/element-plus/blob/a98ff9b40c0c3d2b9959f99919bd8363e3e3c25a/packages/locale/index.ts#L5) [languages](https://github.com/element-plus/element-plus/tree/dev/packages/locale/lang) | [en](https://github.com/element-plus/element-plus/blob/dev/packages/locale/lang/en.ts) |
| size                    | 全局组件大小                                                                                                                                 | ^[enum]`'large' \| 'default' \| 'small'`                                                                                                                                                                                                                     | default                                                                                |
| zIndex                  | 全局初始化 zIndex 的值                                                                                                                        | ^[number]                                                                                                                                                                                                                                                      | —                                                                                      |
| namespace               | 全局组件类名称前缀 (需要配合 [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1) 使用) | ^[string]                                                                                                                                                                                                                                                      | el                                                                                     |
| button                  | 按钮相关配置，[详见下表](#button-attribute)                                                                                                       | ^[object]`{autoInsertSpace?: boolean}`                                                                                                                                                                                                                         | 详见下表                                                                                   |
| message                 | 消息相关配置， [详见下表](#message-attribute)                                                                                                     | ^[object]`{max?: number}`                                                                                                                                                                                                                                      | 详见下表                                                                                   |
| experimental-features   | 将要添加的实验阶段的功能，所有功能都是默认设置为 false                                                                                                         | ^[object]                                                                                                                                                                                                                                                      | —                                                                                      |
| empty-values ^(2.7.0)   | 输入类组件空值                                                                                                                                | ^[array]                                                                                                                                                                                                                                                       | —                                                                                      |
| value-on-clear ^(2.7.0) | 输入类组件清空值                                                                                                                               | ^[string] / ^[number] / ^[boolean] / ^[Function]                                                                                                                                                                                                               | —                                                                                      |

### Button Attribute

| 参数              | 描述                                      | 类型         | 默认值   |
| --------------- | --------------------------------------- | ---------- | ----- |
| autoInsertSpace | 两个中文字符之间自动插入空格(仅当文本长度为 2 且所有字符均为中文时才生效) | ^[boolean] | false |

### Message Attribute

| 参数                 | 描述                        | 类型         | 默认值 |
| ------------------ | ------------------------- | ---------- | --- |
| max                | 可同时显示的消息最大数量              | ^[number]  | —   |
| grouping ^(2.8.2)  | 合并内容相同的消息，不支持 VNode 类型的消息 | ^[boolean] | —   |
| duration ^(2.8.2)  | 显示时间，单位为毫秒。 设为 0 则不会自动关闭  | ^[number]  | —   |
| showClose ^(2.8.2) | 是否显示关闭按钮                  | ^[boolean] | —   |
| offset ^(2.8.2)    | Message 距离窗口顶部的偏移量        | ^[number]  | —   |

### Config Provider Slots

| 名称      | 描述      | Scope                 |
| ------- | ------- | --------------------- |
| default | 自定义默认内容 | config: 提供全局配置（从顶部继承） |
