---
title: Progress 进度条
lang: zh-CN
---

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 直线进度条

Progress 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性**必填**，并且必须在 `0-100` 的范围内。 你可以通过设置 `format` 来自定义文字显示的格式。

<code src="./linear-progress-bar.tsx"></code>

## 进度条内显示百分比标识

百分比不占用额外控件，适用于文件上传等场景。

Progress 组件可通过 `strokeWidth` 属性更改进度条的高度，并可通过 `textInside` 属性来改变进度条内部的文字。

<code src="./internal-percentage.tsx"></code>

## 自定义进度条的颜色

可以通过 `color` 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值，函数和数组。

<code src="./custom-color.tsx"></code>

## 环形进度条

Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

<code src="./circular-progress-bar.tsx"></code>

## 仪表盘形进度条

您也可以指定 `type` 属性到 `dashboard` 使用控制面板进度栏。

<code src="./dashboard-progress-bar.tsx"></code>

## 自定义内容

通过`children`添加自定义内容。

<code src="./customized-content.tsx"></code>

## 动画进度条

使用 `intermediate` 属性来设置不确定的进度， `duration` 来控制动画持续时间。

<code src="./indeterminate-progress.tsx"></code>

## 属性

| 属性名        | 说明                                                          | 类型                                                                                                                                         | 默认值 |
| ------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| percentage    | 百分比，**必填**                                              | <Enum type="number">(0-100)</Enum>                                                                                                           | 0      |
| type          | 进度条类型                                                    | <Enum>'line'\| 'circle'\| 'dashboard'</Enum>                                                                                                 | line   |
| strokeWidth   | 进度条的宽度                                                  | number                                                                                                                                       | 6      |
| textInside    | 进度条显示文字内置在进度条内（仅 `type` 为 'line' 时可用）    | boolean                                                                                                                                      | false  |
| status        | 进度条当前状态                                                | <Enum> 'success' \| 'exception' \| 'warning'</Enum>                                                                                          | —      |
| indeterminate | 是否为动画进度条                                              | boolean                                                                                                                                      | false  |
| duration      | 控制动画进度条速度                                            | number                                                                                                                                       | 3      |
| color         | 进度条背景色 进度条背景色 （会覆盖 `status` 状态颜色）        | string / <Enum type="Function">`(percentage: number) => string`</Enum> / <Enum type="Array">`{ color: string; percentage: number }[]`</Enum> | ''     |
| width         | 环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用） | number                                                                                                                                       | 126    |
| showText      | 是否显示进度条文字内容                                        | boolean                                                                                                                                      | true   |
| strokeLinecap | circle/dashboard 类型路径两端的形状                           | <Enum>`'butt' \| 'round' \| 'square'`</Enum>                                                                                                 | round  |
| format        | 指定进度条文字内容                                            | <Enum type="Function">`(percentage: number) => string`</Enum>                                                                                | —      |
