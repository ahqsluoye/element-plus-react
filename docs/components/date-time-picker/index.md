---
title: DateTimePicker 日期时间选择器
lang: zh-CN
---

# DateTimePicker 日期时间选择器

在同一个选择器里选择日期和时间

:::info{title=TIP}

日期时间选择器来自日期选择器和时间选择器的组合。 关于属性的更详细解释，请参阅日期选择器和时间选择器。

:::

## 日期和时间点

通过设置`type`属性为`datetime`，即可在同一个选择器里同时进行日期和时间的选择。 快捷方式的使用方法与 Date Picker 相同。

<code src="./date-and-time.tsx"></code>

## 日期时间格式

使用`format`指定输入框的格式。 使用`valueFormat`指定绑定值的格式。

默认情况下，组件返回`Date`对象。

在 [这里](https://day.js.org/docs/en/display/format#list-of-all-available-formats) 查看 Day.js 支持的所有格式。

:::error{title=WARNING}

请一定要注意传入参数的大小写是否正确

:::

<code src="./date-and-time-formats.tsx"></code>

## 日期和时间范围

设置`type`为`datetimerange`即可选择日期和时间范围

:::error{title=TODO}

:::

<!-- <code src="./date-and-time-range.tsx"></code> -->

## 默认的起始与结束时刻

使用`datetimerange`进行范围选择时，在日期选择面板中选定起始与结束的日期，默认会使用该日期的`00:00:00`作为起始与结束的时刻；通过选项`default-time`可以控制选中起始与结束日期时所使用的具体时刻。 我们可以使用 `default-time` 属性来控制它。 `default-time`接受一个数组，其中第一项控制起始日期的具体时刻，第二项控制结束日期的具体时刻。 第一项控制开始日期的时间值，第二项控制结束日期的时间值。

:::error{title=TODO}

:::

<!-- <code src="./default-time.tsx"></code> -->

## API

### 属性

| 属性名           | 说明                                                                                       | 类型                                                   | 可选值                                                        | 默认值              |
| ---------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------- | ------------------- |
| value            | 绑定值，如果它是数组，长度应该是 2                                                         | `string` \ <Enum type="object">[string, string]</Enum> | —                                                             | —                   |
| defaultValue     | 可选，选择器打开时默认显示的时间                                                           | `string` \ <Enum type="object">[string, string]</Enum> | —                                                             | —                   |
| disabled         | 禁用                                                                                       | boolean                                                | —                                                             | false               |
| clearable        | 是否显示清除按钮                                                                           | boolean                                                | —                                                             | true                |
| size             | 输入框尺寸                                                                                 | string                                                 | large/default/small                                           | default             |
| placeholder      | 非范围选择时的占位内容                                                                     | string                                                 | —                                                             | —                   |
| startPlaceholder | 范围选择时开始日期的占位内容                                                               | `string`                                               | —                                                             | —                   |
| endPlaceholder   | 范围选择时结束日期的占位内容                                                               | `string`                                               | —                                                             | —                   |
| type             | 显示类型                                                                                   | string                                                 | year/month/date/datetime/ week/datetimerange/daterange        | date                |
| format           | 显示在输入框中的格式                                                                       | string                                                 | see [date formats](/en-US/component/date-picker#date-formats) | YYYY-MM-DD HH:mm:ss |
| popperClass      | DateTimePicker 下拉框的类名                                                                | string                                                 | —                                                             | —                   |
| rangeSeparator   | 选择范围时的分隔符                                                                         | string                                                 | —                                                             | '-'                 |
| defaultTime      | 选择日期后的默认时间值。 如未指定则默认时间值为 `00:00:00`                                 | `Date` \ <Enum type="object">[Date, Date]</Enum>       | —                                                             | —                   |
| valueFormat      | 可选，绑定值的格式。 不指定则绑定值为 Date 对象                                            | string                                                 | 查看 [日期格式](https://day.js.org/docs/en/display/format)    | —                   |
| unlinkPanels     | 在范围选择器里取消两个日期面板之间的联动                                                   | boolean                                                | —                                                             | false               |
| prefixIcon       | 自定义前缀图标                                                                             | `string \| Component`                                  | —                                                             | Clock               |
| shortcuts        | 设置快捷选项，需要传入数组对象                                                             |                                                        | —                                                             | —                   |
| disabledDate     | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 | <Enum type='Function'>`(time: Date) => boolean`</Enum> | —                                                             | —                   |

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
