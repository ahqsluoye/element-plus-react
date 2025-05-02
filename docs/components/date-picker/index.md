---
title: DatePicker 日期选择器
lang: zh-CN
---

# DatePicker 日期选择器

用于选择或输入日期

## 选择某一天

以”日“为基本单位，基础的日期选择控件

基本单位由 `type` 属性指定。 通过 `shortcuts` 配置快捷选项， 通过 `disabledDate` 函数，来设置禁用掉的日期。

<code src="./enter-date.tsx"></code>

## 其他日期单位

通过扩展基础的日期选择，可以选择周、月、年或多个日期

<code src="./other-measurements.tsx"></code>

## 选择一段时间

你可以通过如下例子来学习如何设置一个日期范围选择器。

在选择日期范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前月份，可以使用 `unlinkPanels` 属性解除联动。

<code src="./date-range.tsx"></code>

## 选择月份范围

你当然还可以选择一个月的范围。

在选择月份范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlinkPanels` 属性解除联动。

<code src="./month-range.tsx"></code>

## 年份范围

你可以通过如下例子来学习如何设置一个年份范围选择器。

选择范围时，默认情况下左右面板会联动。 如果希望两个面板各自独立切换当前年份，可以使用 `unlinkPanels` 属性解除联动。

<code src="./year-range.tsx"></code>

<!-- ## 默认值

日期选择器会在用户未选择任何日期的时候默认展示当天的日期。 你也可以使用 `defaultValue` 来修改这个默认的日期。 请注意该值需要是一个可以解析的 `new Date()` 对象。

如果类型是 `daterange`, `defaultValue` 则会设置左边窗口的默认值。

<code src="./default-value.tsx"></code> -->

## 日期格式

使用`format`指定输入框的格式。 使用 `valueFormat` 指定绑定值的格式。

默认情况下，组件接受并返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

:::error{title=WARNING}

请一定要注意传入参数的大小写是否正确
:::

<code src="./date-formats.tsx"></code>

<!-- ## 默认显示日期

在选择日期范围时，你可以指定起始日期和结束日期的默认时间。

默认情况下，开始日期和结束日期的时间部分都是选择日期当日的 `00:00:00`。 通过 `defaultTime` 可以分别指定开始日期和结束日期的具体时刻。 它接受最多两个日期对象的数组。 其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。

<code src="./default-time.tsx"></code> -->

<!-- ## 设置自定义前缀的内容

前缀内容可以被自定义。

当你从其他 vue 组件或由渲染函数生成的组件中导入组件时, 你可以设置 `prefixIcon` 属性来定制前缀内容

<code src="./custom-prefix-icon.tsx"></code>

## 自定义内容

弹出框的内容是可以自定义的，在插槽内你可以获取到当前单元格的数据

<code src="./custom-content.tsx"></code> -->

<!-- ## 国际化

由于 Element Plus 的默认语言为英语，如果你需要设置其它的语言，请参考[国际化](/zh-CN/guide/i18n)文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等）也都是通过国际化来配置的。 -->

## API

### 属性

| 属性名           | 说明                                                                                       | 类型                                                                            | 可选值                                                                                                                            | 默认值     |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| value            | 绑定值，如果它是数组，长度应该是 2                                                         | `string` \ <Enum type="object">[string, string]</Enum>                          | —                                                                                                                                 | —          |
| defaultValue     | 可选，选择器打开时默认显示的时间                                                           | `string` \ <Enum type="object">[string, string]</Enum>                          | —                                                                                                                                 | —          |
| disabled         | 禁用                                                                                       | boolean                                                                         | —                                                                                                                                 | false      |
| size             | 输入框尺寸                                                                                 | string                                                                          | <Enum>'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                | default    |
| clearable        | 是否显示清除按钮                                                                           | boolean                                                                         | —                                                                                                                                 | true       |
| placeholder      | 非范围选择时的占位内容                                                                     | string                                                                          | —                                                                                                                                 | —          |
| startPlaceholder | 范围选择时开始日期的占位内容                                                               | string                                                                          | —                                                                                                                                 | —          |
| endPlaceholder   | 范围选择时结束日期的占位内容                                                               | string                                                                          | —                                                                                                                                 | —          |
| type             | 显示类型                                                                                   | string                                                                          | <Enum>'year' \| 'years' \|'month' \| 'months' \| 'date' \| 'dates' \| 'week' \| 'daterange' \| 'monthrange' \| 'yearrange'</Enum> | date       |
| format           | 显示在输入框中的格式                                                                       | string                                                                          | —                                                                                                                                 | YYYY-MM-DD |
| rangeSeparator   | 选择范围时的分隔符                                                                         | string                                                                          | —                                                                                                                                 | '-'        |
| valueFormat      | 可选，绑定值的格式。 不指定则绑定值为 Date 对象                                            | string                                                                          | —                                                                                                                                 | —          |
| name             | 等价于原生 input `name` 属性                                                               | string                                                                          | —                                                                                                                                 | —          |
| showToday        | 是否展示“今天”按钮                                                                         | boolean                                                                         | —                                                                                                                                 | false      |
| isoWeek          | 设置 ISO 周数，其中 1 为星期一，7 为星期日                                                 | boolean                                                                         | —                                                                                                                                 | false      |
| unlinkPanels     | 在范围选择器里取消两个日期面板之间的联动                                                   | boolean                                                                         | —                                                                                                                                 | false      |
| disabledDate     | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 | <Enum type='Function'>`(time: Date) => boolean`</Enum>                          | —                                                                                                                                 | —          |
| shortcuts        | 设置快捷选项，需要传入数组对象                                                             | <Enum type='object'>`Array<{ text: string, value: Date \| Function }>`</Enum>   | —                                                                                                                                 | —          |
| formatter        | 格式化                                                                                     | <Enum type='Function'>(value: Dayjs, text: number) => React.ReactElement</Enum> | —                                                                                                                                 | —          |

### 事件

| 事件名   | 说明                   | 回调参数                                                                                                                                        |
| -------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange | 用户确认选定的值时触发 | <Enum type='Function'>`(value: string \| Date \| number \| [string, string] \| [Date, Date] \| [number, number], event?: Event) => void`</Enum> |

<!--|            | blur                                                                                          | 在组件 Input 失去焦点时触发                                                                                | `(e: FocusEvent)` |
| focus          | 在组件 Input 获得焦点时触发                                                                   | `(e: FocusEvent)`                                                                                          |
| calendarChange | 如果用户没有选择日期，那默认展示当前日的月份。 你可以使用 `defaultValue` 来设置成其他的日期。 | `(val: [Date, Date])`                                                                                      |
| panelChange    | 当日期面板改变时触发。                                                                        | `(date, mode, view)`                                                                                       |
| visibleChange  | 当 DatePicker 的下拉列表出现/消失时触发                                                       | `(visibility: boolean)`                                                                                    | |-->

<!-- ## Methods

| 方法名      | 说明               | 参数 |
| ----------- | ------------------ | ---- |
| focus       | 使 input 获取焦点  | —    |
| handleOpen  | 打开日期选择器弹窗 | —    |
| handleClose | 关闭日期选择器弹窗 | —    | -->

### Ref

| 名称        | 说明               | Type                                      |
| ----------- | ------------------ | ----------------------------------------- |
| focus       | 使组件获取焦点     | <Enum type="Function">`() => void`</Enum> |
| blur        | 使组件失去焦点     | <Enum type="Function">`() => void`</Enum> |
| handleOpen  | 打开时间选择器弹窗 | <Enum type="Function">`() => void`</Enum> |
| handleClose | 关闭时间选择器弹窗 | <Enum type="Function">`() => void`</Enum> |
