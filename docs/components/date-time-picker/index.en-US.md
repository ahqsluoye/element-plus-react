---
title: DateTimePicker
lang: en-US
---

<Meta></Meta>

# DateTimePicker

Select date and time in one picker.

:::info{title=TIP}

DateTimePicker is derived from the combination of DatePicker and TimePicker. For a more detailed explanation on attributes, please refer to DatePicker and TimePicker.

:::

## Date and Time

You can select date and time in one picker at the same time by setting the `type` attribute to `datetime`. The usage of shortcuts is the same as DatePicker.

<code src="./date-and-time.tsx"></code>

## DateTime Formats

Use `format` to specify the format displayed in the input box. Use `valueFormat` to specify the format of the binding value.

By default, the component returns `Date` objects.

Check all formats supported by Day.js [here](https://day.js.org/docs/en/display/format#list-of-all-available-formats).

:::error{title=WARNING}

Pay attention to the case of the parameters passed.

:::

<code src="./date-and-time-formats.tsx"></code>

## Date and Time Range

Set `type` to `datetimerange` to select a date and time range.

:::error{title=TODO}

:::

<!-- <code src="./date-and-time-range.tsx"></code> -->

## Default Start and End Time

When using `datetimerange` for range selection, after selecting the start and end dates on the date selection panel, the `00:00:00` of that date is used as the default start and end time. The specific moment when selecting the start and end dates can be controlled via the `defaultTime` option. `defaultTime` accepts an array, where the first item controls the specific moment of the start date, and the second item controls the specific moment of the end date.

:::error{title=TODO}

:::

<!-- <code src="./default-time.tsx"></code> -->

## API

### Properties

| Name            | Description                                                                                                 | Type                                                   | Optional Values                                                                                               | Default                            |
| --------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| value           | Binding value, if it is an array, the length should be 2                                                    | `string` \ <Enum type="object">[string, string]</Enum> | —                                                                                                            | —                                  |
| defaultValue    | Optional, the default time displayed when the picker is opened                                              | `string` \ <Enum type="object">[string, string]</Enum> | —                                                                                                            | —                                  |
| disabled        | Whether to disable                                                                                          | `boolean`                                              | —                                                                                                            | false                              |
| clearable       | Whether to show the clear button                                                                            | `boolean`                                              | —                                                                                                            | true                               |
| size            | Input box size                                                                                              | `string`                                               | large/default/small                                                                                          | default                            |
| placeholder     | Placeholder content for non-range selection                                                                 | `string`                                               | —                                                                                                            | —                                  |
| startPlaceholder | Placeholder content for the start date in range selection                                                   | `string`                                               | —                                                                                                            | —                                  |
| endPlaceholder  | Placeholder content for the end date in range selection                                                     | `string`                                               | —                                                                                                            | —                                  |
| type            | Display type                                                                                                | `string`                                               | year/month/date/datetime/ week/datetimerange/daterange                                                       | date                               |
| format          | Format displayed in the input box                                                                           | `string`                                               | see [date formats](/en-US/component/date-picker#date-formats)                                                 | YYYY-MM-DD HH:mm:ss                |
| popperClass     | Class name of the DateTimePicker dropdown                                                                   | `string`                                               | —                                                                                                            | —                                  |
| rangeSeparator  | Separator when selecting a range                                                                            | `string`                                               | —                                                                                                            | '-'                                |
| defaultTime     | Default time value after selecting a date. If not specified, the default time value is `00:00:00`          | `Date`                                                 | —                                                                                                            | —                                  |
| valueFormat     | Optional, format of the binding value. If not specified, the binding value will be a Date object             | `string`                                               | see [date formats](https://day.js.org/docs/en/display/format)                                                | —                                  |
| unlinkPanels    | Unlink the two date panels in the range picker                                                              | `boolean`                                              | —                                                                                                            | false                              |
| prefixIcon      | Custom prefix icon                                                                                          | `string \| Component`                                  | —                                                                                                            | Clock                              |
| shortcuts       | Set shortcut options, needs to pass in an array of objects                                                  |                                                        | —                                                                                                            | —                                  |
| disabledDate    | A function to determine whether the date is disabled, taking a Date object as parameter. Should return a Boolean value. | <Enum type='Function'>`(time: Date) => boolean`</Enum> | —                                                                                                            | —                                  |
| showWeekNumber  | Show week number                                                                                            | `boolean`                                              | —                                                                                                            | false                              |

### Events

| Name            | Description                                              | Type                                                                                                                           |
| --------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| onChange        | Triggers when the user confirms the selected value       | <Enum type="Function">`(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void`</Enum> |
| onBlur          | Triggers when the component Input loses focus            | <Enum type="Function">`(e: FocusEvent) => void`</Enum>                                                                         |
| onFocus         | Triggers when the component Input gains focus            | <Enum type="Function">`(e: FocusEvent) => void`</Enum>                                                                         |
| onClear         | Triggers when the user clicks the clear button in clearable mode | <Enum type="Function">`() => void`</Enum>                                                                                      |
| onVisibleChange | Triggers when the TimePicker's dropdown appears/disappears | <Enum type="Function">`(visibility: boolean) => void`</Enum>                                                                   |

### Ref

| Name        | Description               | Type                                      |
| ----------- | ------------------------- | ----------------------------------------- |
| focus       | Make the component focus  | <Enum type="Function">`() => void`</Enum> |
| blur        | Make the component blur   | <Enum type="Function">`() => void`</Enum> |
| handleOpen  | Open the time picker popup | <Enum type="Function">`() => void`</Enum> |
| handleClose | Close the time picker popup | <Enum type="Function">`() => void`</Enum> |