---
title: Link 链接
lang: zh-CN
---

# Link 链接

文字超链接

## 基础用法

基础的文字链接用法。

<code src="./basic.tsx"></code>

## 禁用状态

文字链接不可用状态。

<code src="./disabled.tsx"></code>

## 下划线

文字链接下划线。

<code src="./underline.tsx"></code>

## 图标

带图标的链接

:::info{title=TIP}

使用 `icon` 属性来为按钮添加图标。 Element Plus React 提供了丰富的图标，您可以在 [icon component](/components/icon-list)

:::

<code src="./with-icon.tsx"></code>

## Link API

### 属性

| 属性名    | 说明               | 类型                                                                                | 默认值  |
| --------- | ------------------ | ----------------------------------------------------------------------------------- | ------- |
| type      | 类型               | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'</Enum> | default |
| underline | 是否下划线         | <Enum>'always' \| 'hover' \| 'never' </Enum>                                        | hover   |
| target    | 同原生 target 属性 | <Enum>'\_blank' \| '\_blank' \| '\_self' \| '\_top' </Enum>                         | \_self  |
| disabled  | 是否禁用状态       | `boolean`                                                                           | false   |
| href      | 原生 href 属性     | `string`                                                                            | —       |
| icon      | 图标组件           | `string` / `Component`                                                              | —       |
