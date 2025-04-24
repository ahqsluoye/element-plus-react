---
title: Skeleton 骨架屏
lang: zh-CN
---

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 基础用法

基础的骨架效果。

<code src="./basic-usage.tsx"></code>

## 更多参数

可以配置骨架屏段落数量，以便更接近真实渲染效果。每行长度随机

<code src="./configurable-rows.tsx"></code>

## 动画效果

我们提供了一个开关标志，表明是否显示加载动画， 调用 `animated` 如果真是这样，所有的 `el-skeleton` 的子节点将显示动画。

<code src="./animation.tsx"></code>

## 自定义样式

Element Plus 提供的排版模式有时候并不满足要求，当您想要用自己定义的模板时，可以通过一个具名 Slot `template` 来自己设定模板。

我们提供了不同的模板单元可供使用，具体可选值请看 API 详细描述。 另外，在构建您自己自定义的骨架时，您应该尽可能更接近于真正的 DOM。 避免 DOM 因高度差而发生抖动。

<code src="./customized-template.tsx"></code>

## 加载状态

当 `Loading` 结束之后，我们往往需要显示真实的 UI， 可以通过 `visible` 属性的值来控制是否显示加载后的 DOM。

<code src="./loading-state.tsx"></code>

<!-- ## 渲染多条数据

大多时候, 骨架屏都被用来渲染列表, 当我们需要在从服务器获取数据的时候来渲染一个假的 UI。 利用 `count` 这个属性就能控制渲染多少条假的数据在页面上

:::info{title=TIP}

我们不推荐在浏览器中渲染过多的虚假 UI 元素，这样会消耗更多时间销毁骨架元素，从而引起性能问题。 为了用户体验，请尽量将 `count` 值保持在小一点的数值。

:::

<code src="./rendering-with-data.tsx"></code> -->

## 防止渲染抖动

有的时候，API 的请求回来的特别快，往往骨架占位刚刚被渲染，真实的数据就已经回来了，用户的界面会突然一闪， 此时为了避免这种情况，就需要通过 `throttle` 属性来避免这个问题。

:::info{title=TIP}

`throtle` 属性支持两个值： `number` 和 `object`。 当通过 `number`时，它相当于 `{leading: xxx}`，控制骨架屏幕显示的节奏。 当然，您也可以通过传递 `{trailing: xxx}` 来控制骨架屏消失的节奏。

:::

<code src="./avoiding-rendering-bouncing.tsx"></code>

## 初始渲染加载

当初始值为 loading: true 时，您可以设置 `defaultVisible` 来控制初始骨架屏的即时显示，而无需进行节流。

<code src="./initial-rendering-loading.tsx"></code>

## 切换显示/隐藏时避免渲染抖动

:::info{title=TIP}

您可以设置 `defaultVisible` 和 `throttle: {leading: xxx, trailing: xxx}`，以控制骨架效果的初始显示，并使切换加载状态时骨架效果的过渡更加平滑。
:::

有时，当加载状态切换显示或隐藏时，您可能希望业务组件的渲染更加平滑。 您可以设置 `throttle: {leading: xxx, trailing: xxx}` 来控制渲染抖动。

<code src="./leading-trailing-without-bouncing.tsx"></code>

## Skeleton API

### Skeleton 属性

| 属性名   | 说明                                        | 类型      | 默认值 |
| -------- | ------------------------------------------- | --------- | ------ |
| animated | 是否使用动画                                | `boolean` | false  |
| count    | 渲染多少个 template, 建议使用尽可能小的数字 | `number`  | 1      |
| loading  | 是否显示加载结束后的 DOM 结构               | `boolean` | false  |
| rows     | 骨架屏段落数量                              | `number`  | 3      |
| throttle | 渲染延迟（以毫秒为单位）                    | `number`  | 0      |

### Skeleton 插槽

| 插槽名   | 说明                     | 作用域                      |
| -------- | ------------------------ | --------------------------- |
| default  | 真正渲染的 DOM           | ` object``$attrs `          |
| template | 渲染 skeleton 模板的内容 | ` object``{ key: number } ` |

## SkeletonItem API

### SkeletonItem Attributes

| 属性名  | 说明                   | 类型                                                                                              | 默认值 |
| ------- | ---------------------- | ------------------------------------------------------------------------------------------------- | ------ |
| variant | 当前渲染 skeleton 类型 | ` enum``'p' \| 'text' \| 'h1' \| 'h3' \| 'caption' \| 'button' \| 'image' \| 'circle' \| 'rect' ` | text   |
