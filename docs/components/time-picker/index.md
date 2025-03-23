---
title: TimePicker 时间选择器
`boolean` ang: zh-CN
---

# TimePicker 时间选择器

用于选择或输入日期

## 任意时间点

可以选择任意时间

提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrowControl`属性则通过界面上的箭头进行选择。

<code src="./basic.tsx"></code>

## 限制时间选择范围

您也可以限制时间选择范围。

通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。,

<code src="./basic-range.tsx"></code>

<!-- ## 任意时间范围

可选择任意的时间范围

添加`isRange`属性即可选择时间范围。 同样支持 `arrowControl` 属性。

<code src="./range.tsx"></code> -->

## TimePicker 属性

| 属性名                | 说明                                      | 类型                                   | 可选值                                                           | 默认值      |
| --------------------- | ----------------------------------------- | -------------------------------------- | ---------------------------------------------------------------- | ----------- |
| model-value / v-model | 绑定值，如果它是数组，长度应该是 2        | Date / number / string / Array         | —                                                                | —           |
| readonly              | 完全只读                                  | boolean                                | —                                                                | false       |
| disabled              | 禁用                                      | boolean                                | —                                                                | false       |
| editable              | 文本框可输入                              | boolean                                | —                                                                | true        |
| clearable             | 是否显示清除按钮                          | boolean                                | —                                                                | true        |
| size                  | 输入框尺寸                                | string                                 | large / default / small                                          | —           |
| placeholder           | 非范围选择时的占位内容                    | string                                 | —                                                                | —           |
| start-placeholder     | 范围选择时开始日期的占位内容              | string                                 | —                                                                | —           |
| end-placeholder       | 范围选择时结束日期的占位内容              | string                                 | —                                                                | —           |
| is-range              | 是否为时间范围选择                        | boolean                                | —                                                                | false       |
| arrow-control         | 是否使用箭头进行时间选择                  | boolean                                | —                                                                | false       |
| popper-class          | TimePicker 下拉框的类名                   | string                                 | —                                                                | —           |
| range-separator       | 选择范围时的分隔符                        | string                                 | —                                                                | '-'         |
| format                | 显示在输入框中的格式                      | string                                 | 请查看 [date formats](/en-US/component/date-picker#date-formats) | HH:mm:ss    |
| default-value         | 可选，选择器打开时默认显示的时间          | Date / [Date, Date]                    | —                                                                | —           |
| id                    | 等价于原生 input `id` 属性                | string / [string, string]              | —                                                                | -           |
| name                  | 等价于原生 input `name` 属性              | string                                 | —                                                                | —           |
| prefix-icon           | 自定义前缀图标                            | `string \| Component`                  | —                                                                | Clock       |
| clear-icon            | 自定义清除图标                            | `string \| Component`                  | —                                                                | CircleClose |
| disabled-hours        | 禁止选择部分小时选项                      | function                               | —                                                                | —           |
| disabled-minutes      | 禁止选择部分分钟选项                      | Function(selectedHour)                 | —                                                                | —           |
| disabled-seconds      | 禁止选择部分秒选项                        | Function(selectedHour, selectedMinute) | —                                                                | —           |
| teleported            | 是否将 popover 的下拉列表镜像至 body 元素 | boolean                                | true / false                                                     | true        |

## TimePicker 事件

| 事件名         | 说明                                    | 回调参数                |
| -------------- | --------------------------------------- | ----------------------- |
| change         | 用户确认选定的值时触发                  | `(val: typeof v-model)` |
| blur           | 在组件 Input 失去焦点时触发             | `(e: FocusEvent)`       |
| focus          | 在组件 Input 获得焦点时触发             | `(e: FocusEvent)`       |
| visible-change | 当 TimePicker 的下拉列表出现/消失时触发 | `(visibility: boolean)` |

## TimePicker 方法

| 方法名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| focus       | 使 input 获取焦点  | —    |
| blur        | 使 input 失去焦点  | —    |
| handleOpen  | 打开时间选择器弹窗 | —    |
| handleClose | 关闭时间选择器弹窗 | —    |
