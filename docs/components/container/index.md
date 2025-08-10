---
title: Container 布局容器
lang: zh-CN
---

# Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

`<ElContainer>`：外层容器。 当子元素中包含 `<ElHeader>` 或 `<ElFooter>` 时，全部子元素会垂直上下排列， 否则会水平左右排列。

`<ElHeader>`：顶栏容器。

`<ElAside>`：侧边栏容器。

`<ElMain>`：主要区域容器。

`<ElFooter>`：底栏容器。

:::info{title=TIP}

以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。 此外， `<ElContainer>`的直接子元素必须是后四个组件中的一个或多个。 后四个组件的父元素必须是一个 `<ElContainer>`

:::

## 常见页面布局

<style lang="scss">
@use '../../examples/container/common-layout.scss';
</style>

<code src="./layout-hm.tsx"></code>

<br>

<code src="./layout-hmf.tsx"></code>

<br>

<code src="./layout-am.tsx"></code>

<br>

<code src="./layout-ham.tsx"></code>

<br>

<code src="./layout-hamf.tsx"></code>

<br>

<code src="./layout-ahm.tsx"></code>

<br>

<code src="./layout-ahmf.tsx"></code>

## 例子

<code src="./example.tsx"></code>

## Container API

### Container 属性

| 属性名    | 说明             | 类型                                                | 默认值                                                               |
| --------- | ---------------- | --------------------------------------------------- | -------------------------------------------------------------------- |
| direction | 子元素的排列方向 | <Enum type="enum">'horizontal' \| 'vertical'</Enum> | 子元素中有 `ElHeader` 或 `ElFooter` 时为 vertical，否则为 horizontal |

## Header API

### Header 属性

| 属性名 | 说明     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| height | 顶栏高度 | `string` | 60px   |

## Aside API

### Aside 属性

| 属性名 | 说明       | 类型     | 默认值 |
| ------ | ---------- | -------- | ------ |
| width  | 侧边栏宽度 | `string` | 300px  |

## Footer API

### Footer 属性

| 属性名 | 说明     | 类型     | 默认值 |
| ------ | -------- | -------- | ------ |
| height | 底栏高度 | `string` | 60px   |
