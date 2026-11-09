---
title: DatePickerPanel
lang: en-US
---

# DatePickerPanel ^(beta)

`DatePickerPanel` is the core component of `DatePicker`.

## Enter Date

Basic date picker measured by 'day'.

<code src="./basic.tsx"></code>

## Border

By default the date-picker-panel is bordered but in some case you don't want it.
For example `DatePicker` don't inherit `border`.

<code src="./border.tsx"></code>

## Disabled

The `disabled` attribute determines if the date picker is fully disabled.

<code src="./disabled.tsx"></code>

## Types

The measurement is determined by the `type` attribute.

<code src="./all-types.tsx"></code>

<!-- ## Localization

The default locale of is English, if you need to use other languages, please check [Internationalization](/en-US/guide/i18n)

Note, date time locale (month name, first day of the week ...) are also configured in localization. -->

## API

### Attributes

| Name           | Description                                                                                                             | Type                                                                                                                                                           | Default                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| value          | Binding value, if it is an array, the length should be 2                                                                | `string` \ <Enum type="object">[string, string]</Enum>                                                                                                         | —                                                                                                                                 | —          |
| defaultValue   | Optional, the default time displayed when the picker is opened                                                          | `string` \ <Enum type="object">[string, string]</Enum>                                                                                                         | —                                                                                                                                 | —          |
| border         | whether the date picker is bordered                                                                                     | `boolean`                                                                                                                                                      | true                                                                                                                              |
| disabled       | Whether to disable                                                                                                      | `boolean`                                                                                                                                                      | —                                                                                                                                 | false      |
| type           | Display type                                                                                                            | `string`                                                                                                                                                       | <Enum>'year' \| 'years' \|'month' \| 'months' \| 'date' \| 'dates' \| 'week' \| 'daterange' \| 'monthrange' \| 'yearrange'</Enum> | date       |
| format         | Format displayed in the input box                                                                                       | `string`                                                                                                                                                       | —                                                                                                                                 | YYYY-MM-DD |
| valueFormat    | Optional, format of the binding value. If not specified, the binding value will be a Date object                        | `string`                                                                                                                                                       | —                                                                                                                                 | —          |
| name           | Equivalent to the native input `name` attribute                                                                         | `string`                                                                                                                                                       | —                                                                                                                                 | —          |
| showToday      | Whether to show the "Today" button                                                                                      | `boolean`                                                                                                                                                      | —                                                                                                                                 | false      |
| isoWeek        | Set ISO week number, where 1 is Monday and 7 is Sunday                                                                  | `boolean`                                                                                                                                                      | —                                                                                                                                 | false      |
| unlinkPanels   | Unlink the two date panels in the range picker                                                                          | `boolean`                                                                                                                                                      | —                                                                                                                                 | false      |
| disabledDate   | A function to determine whether the date is disabled, taking a Date object as parameter. Should return a Boolean value. | <Enum type='Function'>`(time: Date) => boolean`</Enum>                                                                                                         | —                                                                                                                                 | —          |
| shortcuts      | Set shortcut options, needs to pass in an array of objects                                                              | <Enum type='object'>`Array<{ text: string, value: Date \| Function }>`</Enum>                                                                                  | —                                                                                                                                 | —          |
| formatter      | Formatting                                                                                                              | <Enum type='Function'>(value: Dayjs, text: number, extra?: { view?: DateType \| DateRangeType; defaultText?: string \| number }) => React.ReactElement;</Enum> | —                                                                                                                                 | —          |
| showWeekNumber | Show week number                                                                                                        | `boolean`                                                                                                                                                      | —                                                                                                                                 | false      |

### Events

| Name     | Description                                        | Type                                                                                                                                            |
| -------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange | Triggers when the user confirms the selected value | <Enum type='Function'>`(value: string \| Date \| number \| [string, string] \| [Date, Date] \| [number, number], event?: Event) => void`</Enum> |
