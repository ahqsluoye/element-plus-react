---
title: Slider 滑块
lang: zh-CN
---

<Meta></Meta>

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

通过设置绑定值自定义滑块的初始值

<code src="./basic-usage.tsx"></code>

## 离散值

选项可以是离散的

改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点

<code src="./discrete-values.tsx"></code>

## 带有输入框的滑块

通过输入框输入来改变当前的值。

设置 `show-input` 属性会在右侧显示一个输入框

<code src="./slider-with-input-box.tsx"></code>

## 不同尺寸

<code src="./sizes.tsx"></code>

## 位置

您可以自定义 Tooltip 提示的位置。

<code src="./placement.tsx"></code>

## 范围选择

你还可以选择一个范围值

配置 `range` 属性以激活范围选择模式，该属性的绑定值是一个数组，由最小边界值和最大边界值组成。

<code src="./range-selection.tsx"></code>

## 垂直模式

配置 `vertical` 属性为 `true` 启用垂直模式。 在垂直模式下，必须设置 `height` 属性。

<code src="./vertical-mode.tsx"></code>

## 显示标记

设置 `marks` 属性可以在滑块上显示标记。

<code src="./show-marks.tsx"></code>

## 限制值

设置 `step="mark"` 以将滑块值限制为刻度。

<code src="./restrict-value.tsx"></code>

## API

### 属性

| 属性名            | 描述                                                                                      | 类型                                                                                                                                                                                        | 默认    |
| ----------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| defaultValue      | 选中项默认值                                                                              | `number` / <Enum type="object">number[]</Enum>                                                                                                                                              | 0       |
| value             | 选中项绑定值                                                                              | `number` / <Enum type="object">number[]</Enum>                                                                                                                                              | 0       |
| min               | 最小值                                                                                    | `number`                                                                                                                                                                                    | 0       |
| max               | 最大值                                                                                    | `number`                                                                                                                                                                                    | 100     |
| disabled          | 是否禁用                                                                                  | `boolean`                                                                                                                                                                                   | false   |
| step              | 步长                                                                                      | `number`                                                                                                                                                                                    | 1       |
| showInput         | 是否显示输入框，仅在非范围选择时有效                                                      | `boolean`                                                                                                                                                                                   | false   |
| showInputControls | 在显示输入框的情况下，是否显示输入框的控制按钮                                            | `boolean`                                                                                                                                                                                   | true    |
| size              | slider 包装器的大小，垂直模式下该属性不可用                                               | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                                                              | default |
| inputSize         | 输入框的大小，如果设置了 `size` 属性，默认值自动取 `size`                                 | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                                                              | default |
| showStops         | 是否显示间断点                                                                            | `boolean`                                                                                                                                                                                   | false   |
| showTooltip       | 是否显示提示信息                                                                          | `boolean`                                                                                                                                                                                   | true    |
| formatTooltip     | 格式化提示信息                                                                            | <Enum type="Function">(value: number) => number \| string</Enum>                                                                                                                            | —       |
| range             | 是否开启选择范围                                                                          | `boolean`                                                                                                                                                                                   | false   |
| vertical          | 垂直模式                                                                                  | `boolean`                                                                                                                                                                                   | false   |
| height            | 滑块高度，垂直模式必填                                                                    | `string`                                                                                                                                                                                    | —       |
| ariaLabel         | 原生 `aria-label`属性                                                                     | `string`                                                                                                                                                                                    | —       |
| rangeStartLabel   | 当 `range` 为 true 时，屏幕阅读器标签开始的标记                                           | `string`                                                                                                                                                                                    | —       |
| rangeEndLabel     | 当 `range` 为 true 时，屏幕阅读器标签结尾的标记                                           | `string`                                                                                                                                                                                    | —       |
| formatValueText   | 显示屏幕阅读器的 `ariaValuenow` 属性的格式                                                | <Enum type="Function">(value: number) => string</Enum>                                                                                                                                      | —       |
| debounce          | 输入时的去抖延迟，毫秒，仅在 `show-input` 等于 true 时有效                                | `number`                                                                                                                                                                                    | 300     |
| tooltipClass      | tooltip 的自定义类名                                                                      | `string`                                                                                                                                                                                    | —       |
| placement         | Tooltip 出现的位置                                                                        | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | top     |
| marks             | 标记， key 的类型必须为 `number` 且取值在闭区间 `[min, max]` 内，每个标记可以单独设置样式 | <Enum type="object">SliderMarks</Enum>                                                                                                                                                      | —       |
| onChange          | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）                                        | <Enum type="Function">(value: Arrayable<number>) => boolean</Enum>                                                                                                                          | —       |
| onInput           | 数据改变时触发（使用鼠标拖曳时，活动过程实时触发）                                        | <Enum type="Function">(value: Arrayable<number>) => boolean</Enum>                                                                                                                          | —       |

<!-- 以下属性在当前类型定义中未找到 -->
<!--
| persistent        | 当 slider 的 tooltip 处于非活动状态且 persistent 为 false 时，tooltip 将被销毁                                                                        | `boolean`                                                                                                                                                                                   | —       |
| debounce | 输入时的去抖延迟，毫秒，仅在 `show-input` 等于 true 时有效 | `number` | 300 |
-->

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type SliderMarks = Record<number, string | { style: CSSProperties; label: any }>;
type Arrayable<T> = T | T[];
```

</details>
