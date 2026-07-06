---
title: Tour 漫游式引导
lang: zh-CN
---

<Meta></Meta>

# Tour 漫游式引导

用于分步引导用户了解产品功能的气泡组件。 用来引导用户并介绍产品

## 基础用法

最简单的用法。

<code src="./basic.tsx"></code>

## 非模态

使用`mask="false"`可以将引导变为非模态， 同时为了强调引导本身，建议与 type="primary" 组合使用。

<code src="./non-modal.tsx"></code>

## 位置

改变引导相对于目标的位置，共有 12 种位置可供选择。 当 `target` 为空时引导将会展示在正中央。

<code src="./placement.tsx"></code>

## 自定义遮罩样式

自定义遮罩样式。

<code src="./mask.tsx"></code>

## 自定义指示器

自定义指示器。

<code src="./indicator.tsx"></code>

## 目标

可以传入目标的各种类型的参数。 自以来支持字符串和函数类型。

<code src="./target.tsx"></code>

## Tour API

:::info{title=TIP}

tour-step 组件上相同名称配置的优先级更高。
:::

### Tour 属性

| 属性                  | 描述                                                             | 类型                                                                                                                                                                                  | 默认值                                             |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| appendTo              | 挂载到哪个 DOM 元素                                              | `CSSSelector` / `HTMLElement`                                                                                                                                                         | `body`                                             |
| showArrow             | 是否显示箭头                                                     | `boolean`                                                                                                                                                                             | true                                               |
| placement             | 引导卡片相对于目标元素的位置                                     | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'` | `bottom</Enum>                                     |
| contentStyle          | 为 content 自定义样式                                            | `CSSProperties`                                                                                                                                                                       | —                                                  |
| mask                  | 是否启用遮罩，通过自定义属性改变遮罩样式以及填充的颜色           | `boolean` \| <Enum type="Object">{ style?: CSSProperties; color?: string; }`                                                                                                          | `true</Enum>                                       |
| gap                   | 遮罩和目标之间的透明的间距                                       | `TourGap`                                                                                                                                                                             | <Enum type="Object">{ offset: 6, radius: 2}</Enum> |
| type                  | 类型，影响底色与文字颜色                                         | `default` \| `primary`                                                                                                                                                                | `default`                                          |
| visible               | 控制引导的显示/隐藏（受控模式）                                  | `boolean`                                                                                                                                                                             | `false`                                            |
| defaultVisible        | 默认显示状态（非受控模式）                                       | `boolean`                                                                                                                                                                             | `false`                                            |
| current               | 当前步骤索引（受控模式）                                         | `number`                                                                                                                                                                              | `0`                                                |
| defaultCurrent        | 默认当前步骤索引（非受控模式）                                   | `number`                                                                                                                                                                              | `0`                                                |
| scrollIntoViewOptions | 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数 | `boolean` \| `ScrollIntoViewOptions`                                                                                                                                                  | <Enum type="Object">{ block: 'center' }</Enum>     |
| zIndex                | Tour 的层级                                                      | `number`                                                                                                                                                                              | `2001`                                             |
| showClose             | 是否显示关闭按钮                                                 | `boolean`                                                                                                                                                                             | `true`                                             |
| closeIcon             | 自定义关闭图标，默认 Close                                       | `string`                                                                                                                                                                              | `Component`                                        |
| closeOnPressEscape    | 是否可以通过按下 ESC 关闭引导                                    | `boolean`                                                                                                                                                                             | `true`                                             |
| targetAreaClickable   | 启用蒙层时，target 元素区域是否可以点击。                        | `boolean`                                                                                                                                                                             | `true`                                             |
| indicators            | 自定义指示器                                                     | <Enum type="object">{ current: number, total: number }</Enum>                                                                                                                         | —                                                  |

### Tour 事件

| 事件名   | 描述                 | 类型                                                                     |
| -------- | -------------------- | ------------------------------------------------------------------------ |
| onClose  | 关闭引导时的回调函数 | <Enum type="Function">(current: number) => void</Enum>                   |
| onFinish | 引导完成时的回调     | <Enum type="Function">() => void</Enum>                                  |
| onChange | 步骤改变时的回调     | <Enum type="Function">(current: number, visible: boolean) => void</Enum> |

## TourStep API

### TourStep 属性

| 属性                  | 描述                                                                                                            | 类型                                                                                                                                                                                         | 默认值    |
| --------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | --- |
| target                | 获取引导卡片指向的元素， 为空时居中于屏幕。 支持字符串和函数类型。 字符串类型是文档.querySelector 的选择器。    | `HTMLElement` \| `string` \ <Enum type="Function">() => HTMLElement</Enum>                                                                                                                   | —         |
| showArrow             | 是否显示箭头                                                                                                    | `boolean`                                                                                                                                                                                    | —         |
| title                 | title                                                                                                           | `string`                                                                                                                                                                                     | —         |
| description           | description                                                                                                     | `string`                                                                                                                                                                                     | —         |
| placement             | 引导卡片相对于目标元素的位置                                                                                    | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'`</Enum> | `bottom`  |
| contentStyle          | 为 content 自定义样式                                                                                           | `CSSProperties`                                                                                                                                                                              | —         |
| mask                  | 是否启用蒙层，也可传入配置改变蒙层样式和填充色                                                                  | `boolean` \| <Enum type="Object">{ style?: CSSProperties; color?: string; }</Enum>                                                                                                           | —         |
| type                  | 类型，影响底色与文字颜色                                                                                        | `default` \| `primary`                                                                                                                                                                       | `default` |
| nextButtonProps       | “下一步”按钮的属性                                                                                              | <Enum type="Object">{ children: VueNode \| string; onClick: Function }</Enum>                                                                                                                | —         |
| prevButtonProps       | “上一步”按钮的属性                                                                                              | <Enum type="Object">{ children: VueNode \| string; onClick: Function }</Enum>                                                                                                                | —         |
| scrollIntoViewOptions | 是否支持当前元素滚动到视窗内，也可传入配置指定滚动视窗的相关参数，默认跟随 Tour 的 `scrollIntoViewOptions` 属性 | `boolean` \| `ScrollIntoViewOptions`                                                                                                                                                         | —         |
| showClose             | 是否显示关闭按钮                                                                                                | `boolean`                                                                                                                                                                                    | —         |
| closeIcon             | 自定义关闭图标，默认 Close                                                                                      | `string` \| `Component`                                                                                                                                                                      | —         |
| header                | 自定义 header 内容                                                                                              | `ReactNode`                                                                                                                                                                                  | —         |     |

### TourStep 事件

| 事件名  | 描述                 | 参数                                    |
| ------- | -------------------- | --------------------------------------- |
| onClose | 关闭引导时的回调函数 | <Enum type="Function">() => void</Enum> |
