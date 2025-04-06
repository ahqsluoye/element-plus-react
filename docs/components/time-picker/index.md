---
title: TimePicker 时间选择器
lang: zh-CN
---

# TimePicker 时间选择器

用于选择或输入日期

## 任意时间点

可以选择任意时间

<!-- 提供了两种交互方式：默认情况下通过鼠标滚轮进行选择，打开`arrowControl`属性则通过界面上的箭头进行选择。 -->

<code src="./basic.tsx"></code>

## 限制时间选择范围

您也可以限制时间选择范围。

通过 `disabledHours`，`disabledMinutes` 和 `disabledSeconds` 限制可选时间范围。

<code src="./basic-range.tsx"></code>

## 任意时间范围

可选择任意的时间范围

添加`isRange`属性即可选择时间范围。

<code src="./range.tsx"></code>

## TimePicker 属性

| 属性名           | 说明                               | 类型                                                                                                        | 可选值                                                           | 默认值   |
| ---------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | -------- |
| value            | 绑定值，如果它是数组，长度应该是 2 | `string` \ <Enum type="object">[string, string]</Enum>                                                      | —                                                                | —        |
| defaultValue     | 可选，选择器打开时默认显示的时间   | `string` \ <Enum type="object">[string, string]</Enum>                                                      | —                                                                | —        |
| disabled         | 禁用                               | `boolean`                                                                                                   | —                                                                | false    |
| clearable        | 是否显示清除按钮                   | `boolean`                                                                                                   | —                                                                | true     |
| size             | 输入框尺寸                         | `string`                                                                                                    | <Enum>'large' \| 'default' \| 'small' </Enum>                    | —        |
| placeholder      | 非范围选择时的占位内容             | `string`                                                                                                    | —                                                                | —        |
| startPlaceholder | 范围选择时开始日期的占位内容       | `string`                                                                                                    | —                                                                | —        |
| endPlaceholder   | 范围选择时结束日期的占位内容       | `string`                                                                                                    | —                                                                | —        |
| isRange          | 是否为时间范围选择                 | `boolean`                                                                                                   | —                                                                | false    |
| popperClass      | TimePicker 下拉框的类名            | `string`                                                                                                    | —                                                                | —        |
| rangeSeparator   | 选择范围时的分隔符                 | `string`                                                                                                    | —                                                                | '-'      |
| format           | 显示在输入框中的格式               | `string`                                                                                                    | 请查看 [date formats](/en-US/component/date-picker#date-formats) | HH:mm:ss |
| name             | 等价于原生 input `name` 属性       | `string`                                                                                                    | —                                                                | —        |
| prefixIcon       | 自定义前缀图标                     | `string \| Component`                                                                                       | —                                                                | Clock    |
| disabledHours    | 禁止选择部分小时选项               | <Enum type="Function">(role?: RoleType, compare?: Compare) => number[]</Enum>                               | —                                                                | —        |
| disabledMinutes  | 禁止选择部分分钟选项               | <Enum type="Function">(hour: number, role?: RoleType, compare?: Compare) => number[]</Enum>                 | —                                                                | —        |
| disabledSeconds  | 禁止选择部分秒选项                 | <Enum type="Function">(hour: number, minute: number, role?: RoleType, compare?: Compare) => number[]</Enum> | —                                                                | —        |

## TimePicker 事件

### 事件

| 事件名          | 说明                                    | 类型                                                                                                                           |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| onChange        | 用户确认选定的值时触发                  | <Enum type="Function">`(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void`</Enum> |
| onBlur          | 在组件 Input 失去焦点时触发             | <Enum type="Function">`(e: FocusEvent) => void`</Enum>                                                                         |
| onFocus         | 在组件 Input 获得焦点时触发             | <Enum type="Function">`(e: FocusEvent) => void`</Enum>                                                                         |
| onClear         | 可清空的模式下用户点击清空按钮时触发    | <Enum type="Function">`() => void`</Enum>                                                                                      |
| onVisibleChange | 当 TimePicker 的下拉列表出现/消失时触发 | <Enum type="Function">`(visibility: boolean) => void`</Enum>                                                                   |

### Ref

| 名称        | 说明               | Type                                      |
| ----------- | ------------------ | ----------------------------------------- |
| focus       | 使组件获取焦点     | <Enum type="Function">`() => void`</Enum> |
| blur        | 使组件失去焦点     | <Enum type="Function">`() => void`</Enum> |
| handleOpen  | 打开时间选择器弹窗 | <Enum type="Function">`() => void`</Enum> |
| handleClose | 关闭时间选择器弹窗 | <Enum type="Function">`() => void`</Enum> |
