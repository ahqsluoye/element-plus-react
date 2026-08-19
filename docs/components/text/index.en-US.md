---
title: Text
lang: zh-CN
---

<Meta></Meta>

# Text

文本的常见操作

## 基础用法

由 `type` 属性来选择 Text 的类型。

<code src="./basic.tsx"></code>

## 尺寸

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

<code src="./sizes.tsx"></code>

## 省略

通过 `truncated` 属性，在文本超过视图或最大宽度设置时展示省略符。 通过 `lineClamp` 属性控制多行的样式

<code src="./truncated.tsx"></code>

## 覆盖

使用属性 `tag` 覆盖元素

<code src="./override.tsx"></code>

## 混合使用

混合使用 Text 组件

<code src="./mixed.tsx"></code>

## API

### 属性

| 属性名    | 描述           | 类型                                                                   | 默认值  |
| --------- | -------------- | ---------------------------------------------------------------------- | ------- |
| type      | 类型           | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> | —       |
| size      | 大小           | <Enum>'large' \| 'default' \| 'small'</Enum>                           | default |
| truncated | 显示省略号     | `boolean`                                                              | false   |
| lineClamp | 最大行数       | `string` / `number`                                                    | —       |
| tag       | 自定义元素标签 | `string`                                                               | span    |
| title     | 标题           | `string`                                                               | —       |
