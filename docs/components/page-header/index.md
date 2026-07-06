---
title: Page Header 页头
lang: zh-CN
---

<Meta></Meta>

# Page Header 页头

如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。

## 完整示例

<code src="./complete.tsx"></code>

## 基础用法

简单场景下的标准页头。

<code src="./basic.tsx"></code>

## 自定义图标

默认图标可能无法满足您的需求，您可以通过设置`icon`属性来自定义图标，示例如下。

<code src="./custom-icon.tsx"></code>

## 无图标

有时，页面全是元素，您可能不想展示页面上方的图标，您可以设置`icon`属性值为`""`来去除它。

<code src="./no-icon.tsx"></code>

## 面包屑导航

使用页头组件，您可以通过添加插槽 `breadcrumb` 来设置面包屑路由导航。

<code src="./breadcrumb.tsx"></code>

## 额外操作部分

头部可能会变得很复杂，您可以在头部添加更多的区块，以允许丰富的交互。

<code src="./additional-sections.tsx"></code>

## 主要内容

有时我们想让页头显示一些协同响应内容，我们可以使用 `default` 插槽。

<code src="./main-content.tsx"></code>

## API

### 属性

| 属性名     | 说明                                          | 类型                   | 默认       |
| ---------- | --------------------------------------------- | ---------------------- | ---------- |
| icon       | Page Header 的图标 Icon 组件                  | `string`               | arrow-left |
| title      | Page Header 的主标题，默认是 Back (内置 a11y) | `string` / `Component` | ''         |
| content    | Page Header 的内容                            | `string` / `Component` | ''         |
| extra      | 扩展设置                                      | `string` / `Component` | ''         |
| breadcrumb | 面包屑导航内容                                | `string` / `Component` | ''         |
| default    | 默认内容                                      | `string` / `Component` | ''         |

### 事件

| 事件名 | 说明             | 类型                                    |
| ------ | ---------------- | --------------------------------------- |
| onBack | 点击左侧区域触发 | <Enum type="Function">() => void</Enum> |
