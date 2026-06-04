---
title: Anchor 锚点
lang: zh-CN
---

# Anchor 锚点

通过锚点，您可以很快找到当前页面上信息内容的位置。

## 基础用法

最简单的用法。

<code src="./basic.tsx"></code>

## 水平模式

水平排列的锚点

> **提示**: 水平模式不支持 `children`。

<code src="./horizontal.tsx"></code>

## 滚动容器

自定义滚动区域，使用 `offset` props 可以设置锚点滚动偏移。监听 `onClick` 事件并阻止浏览器的默认行为，从而不会更改历史记录。

<code src="./scroll.tsx"></code>

## 锚点链接变化

监听锚点链接变化

<code src="./change.tsx"></code>

## 下划线类型

设置 `type="underline"` 以更改为下划线类型。

<code src="./underline.tsx"></code>

## 固定模式

使用 Affix 组件来固定住页面中的锚点。

<code src="./affix.tsx"></code>

## Anchor API

### Anchor 属性

| 属性            | 说明                               | 类型                                              | 默认值           |
| --------------- | ---------------------------------- | ------------------------------------------------- | ---------------- |
| container       | 滚动的容器                         | `string` \| `RefObject<HTMLElement>` \| `Window ` | —                |
| offset          | 设置锚点滚动的偏移量               | `number`                                          | 0                |
| bound           | 触发锚点的元素的位置偏移量         | `number`                                          | 15               |
| duration        | 设置容器滚动持续时间，单位为毫秒。 | `number`                                          | 300              |
| marker          | 是否显示标记                       | `boolean`                                         | true             |
| type            | 设置锚点类型                       | <Enum type="enum">'default' \| 'underline'`       | `default</Enum>  |
| direction       | 设置锚点方向                       | <Enum type="enum">'vertical' \| 'horizontal'`     | `vertical</Enum> |
| selectScrollTop | 滚动时，链接是否选中位于顶部       | `boolean`                                         | false            |

### Anchor 事件

| 事件名   | 说明                 | 类型                                                                |
| -------- | -------------------- | ------------------------------------------------------------------- |
| onChange | 当锚点链接变化时触发 | <Enum type="Function">(href: string) => void</Enum>                 |
| onClick  | 当用户点击链接时触发 | <Enum type="Function">(e: MouseEvent, href?: string) => void</Enum> |

### AnchorRef

| 名称     | 说明                 | 类型                                                |
| -------- | -------------------- | --------------------------------------------------- |
| scrollTo | 手动滚动到特定位置。 | <Enum type="Function">(href: string) => void</Enum> |

### AnchorLink 属性

| 属性名 | 说明           | 类型                          | 默认值 |
| ------ | -------------- | ----------------------------- | ------ |
| title  | 链接的文本内容 | `string` \| `React.ReactNode` | —      |
| href   | 链接的地址     | `string`                      | —      |
