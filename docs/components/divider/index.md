---
title: Divider 分割线
lang: zh-CN
---

# Divider 分割线

区隔内容的分割线。

## 基础用法

对不同段落的文本进行分割。

<code src="./basic-usage.tsx"></code>

## 设置文案

可以在分割线上自定义文本内容。

<code src="./custom-content.tsx"></code>

## 虚线

您可以设置分隔符的样式。

<code src="./line-dashed.tsx"></code>

## 垂直分隔线

<code src="./vertical-divider.tsx"></code>

## API

### 属性

| 属性名          | 说明                   | 类型                                                                                                                                            | 默认       |
| --------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| direction       | 设置分割线方向         | <Enum>'horizontal' \| 'vertical'</Enum>                                                                                                         | horizontal |
| borderStyle     | 设置分隔符样式         | <Enum>'none' \| 'solid' \| 'hidden' \| 'dashed' \| ...</Enum> [css/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid      |
| contentPosition | 自定义分隔线内容的位置 | <Enum>'left' \| 'right' \| 'center'</Enum>                                                                                                      | center     |
