---
title: DatePickerPane 日期选择器面板
lang: zh-CN
---

# DatePickerPane 日期选择器面板

`DatePickerPanel`是`DatePicker`的核心组件。

## 选择某一天

以”日“为基本单位，基础的日期选择控件

<code src="./basic.tsx"></code>

## 边框

默认情况下，边框是默认的，如果你不想要边框请参考示例。
例如，`DatePicker`不继承`border`。

<code src="./border.tsx"></code>

## 禁用

"禁用"属性决定日期选择器是否完全禁用。

<code src="./disabled.tsx"></code>

## 展示类型

时间面板的类型由 <code>type</code> 属性指定。

<code src="./all-types.tsx"></code>

<!-- ## 本地化

由于 Element Plus 的默认语言为英语，如果你需要设置其它的语言，请参考<a href="/zh-CN/guide/i18n">国际化</a>文档。

要注意的是：日期相关的文字（月份，每一周的第一天等等） 也都进行了本地化配置。 -->

## 应用开发接口（API）

### 属性

| 属性名         | 说明                                                                                       | 类型                                                                                                                                                          | 默认值                                                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| value          | 绑定值，如果它是数组，长度应该是 2                                                         | `string` \ <Enum type="object">[string, string]</Enum>                                                                                                        | —                                                                                                                                 | —          |
| defaultValue   | 可选，选择器打开时默认显示的时间                                                           | `string` \ <Enum type="object">[string, string]</Enum>                                                                                                        | —                                                                                                                                 | —          |
| border         | 日期选择器是否有边框                                                                       | `boolean`                                                                                                                                                     | true                                                                                                                              |
| disabled       | 禁用                                                                                       | `boolean`                                                                                                                                                     | —                                                                                                                                 | false      |
| type           | 显示类型                                                                                   | `string`                                                                                                                                                      | <Enum>'year' \| 'years' \|'month' \| 'months' \| 'date' \| 'dates' \| 'week' \| 'daterange' \| 'monthrange' \| 'yearrange'</Enum> | date       |
| format         | 显示在输入框中的格式                                                                       | `string`                                                                                                                                                      | —                                                                                                                                 | YYYY-MM-DD |
| valueFormat    | 可选，绑定值的格式。 不指定则绑定值为 Date 对象                                            | `string`                                                                                                                                                      | —                                                                                                                                 | —          |
| showToday      | 是否展示“今天”按钮                                                                         | `boolean`                                                                                                                                                     | —                                                                                                                                 | false      |
| isoWeek        | 设置 ISO 周数，其中 1 为星期一，7 为星期日                                                 | `boolean`                                                                                                                                                     | —                                                                                                                                 | false      |
| unlinkPanels   | 在范围选择器里取消两个日期面板之间的联动                                                   | `boolean`                                                                                                                                                     | —                                                                                                                                 | false      |
| disabledDate   | 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。 | <Enum type='Function'>`(time: Date) => boolean`</Enum>                                                                                                        | —                                                                                                                                 | —          |
| shortcuts      | 设置快捷选项，需要传入数组对象                                                             | <Enum type='object'>`Array<{ text: string, value: Date \| Function }>`</Enum>                                                                                 | —                                                                                                                                 | —          |
| formatter      | 格式化                                                                                     | <Enum type='Function'>(value: Dayjs, text: number, extra?: { view?: DateType \| DateRangeType; defaultText?: string \| number }) => React.ReactElement</Enum> | —                                                                                                                                 | —          |
| showWeekNumber | 显示周数                                                                                   | `boolean`                                                                                                                                                     | —                                                                                                                                 | false      |

<!-- | defaultTime          | 范围选择时选中日期所使用的当日内具体时刻                                                                                                                   | <Enum type="object">Date \| [Date, Date]</Enum>                                                                                                                                                                             | —        |
| singlePanel          | 在范围选择器中只显示一个面板                                                                                                                               | `boolean`                                                                                                                                                                                                                   | false    | -->

### 事件

| 名称     | 详情                   | 类型                                                                                                                                            |
| -------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange | 用户确认选定的值时触发 | <Enum type='Function'>`(value: string \| Date \| number \| [string, string] \| [Date, Date] \| [number, number], event?: Event) => void`</Enum> |
