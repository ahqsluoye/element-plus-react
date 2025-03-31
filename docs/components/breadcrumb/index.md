---
title: Breadcrumb 面包屑
lang: zh-CN
---

# Breadcrumb 面包屑

显示当前页面的路径，快速返回之前的任意页面。

## 基础用法

在 `ElBreadcrumb` 中使用 `ElBreadcrumbItem` 标签表示从首页开始的每一级。 该组件接受一个 `String` 类型的参数 separator 来作为分隔符。 默认值为 '/'。

<code src="./basic.tsx"></code>

## 图标分隔符

通过设置 `separator` 可使用相应的 图标 作为分隔符。

<code src="./icon.tsx"></code>

## Breadcrumb API

### Breadcrumb 属性

| 属性名    | 说明   | 类型                   | 默认值 |
| --------- | ------ | ---------------------- | ------ |
| separator | 分隔符 | `string` / `Component` | /      |

## BreadcrumbItem API

### BreadcrumbItem 属性

| 属性名 | 说明                                      | 类型                                                   | 默认值 |
| ------ | ----------------------------------------- | ------------------------------------------------------ | ------ |
| to     | 路由跳转目标，同 `vueRouter` 的 `to` 属性 | `string` / <Enum type='object'>RouteLocationRaw</Enum> | ''     |

<!-- | replace | 如果设置该属性为 `true`, 导航将不会留下历史记录 | `boolean`                                              | false  | -->
