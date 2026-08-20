---
title: TimePicker
lang: en-US
---

<Meta></Meta>

# TimePicker

Use Time Picker for time input.

## Arbitrary Time Picker

Can pick an arbitrary time.

<code src="./basic.tsx"></code>

## Limit the Time Range

You can also limit the time range.

Use `disabledHours`, `disabledMinutes` and `disabledSeconds` to limit the selectable time range.

<code src="./basic-range.tsx"></code>

## Arbitrary Time Range

Can pick an arbitrary time range.

Add the `isRange` attribute to pick a time range.

<code src="./range.tsx"></code>

## API

### TimePicker Properties

| Name              | Description                                         | Type                                                                                                        | Default |
| ----------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| value             | Binding value, if it is an array, length should be 2 | `string` \ <Enum type="object">[string, string]</Enum>                                                      | —       |
| defaultValue      | Optional, the default time displayed when the picker opens | `string` \ <Enum type="object">[string, string]</Enum>                                                      | —       |
| disabled          | Whether to disable                                  | `boolean`                                                                                                   | false   |
| clearable         | Whether to show clear button                        | `boolean`                                                                                                   | true    |
| size              | Input box size                                      | `string`                                                                                                    | <Enum>'large' \| 'default' \| 'small'</Enum>                    | —       |
| placeholder       | Placeholder in non-range mode                       | `string`                                                                                                    | —       |
| startPlaceholder  | Placeholder for start time in range mode            | `string`                                                                                                    | —       |
| endPlaceholder    | Placeholder for end time in range mode              | `string`                                                                                                    | —       |
| isRange           | Whether to pick a time range                        | `boolean`                                                                                                   | false   |
| popperClass       | Custom class name for TimePicker's dropdown          | `string`                                                                                                    | —       |
| rangeSeparator    | Range separator                                     | `string`                                                                                                    | '-'     |
| format            | Format of the displayed value in the input box      | `string`                                                                                                    | HH:mm:ss |
| name              | Same as `name` in native input                      | `string`                                                                                                    | —       |
| prefixIcon        | Custom prefix icon component                        | `string \| Component`                                                                                       | Clock   |
| disabledHours     | Specify the array of hours that cannot be selected  | <Enum type="Function">(role?: RoleType, compare?: Compare) => number[]</Enum>                               | —       |
| disabledMinutes   | Specify the array of minutes that cannot be selected | <Enum type="Function">(hour: number, role?: RoleType, compare?: Compare) => number[]</Enum>                 | —       |
| disabledSeconds   | Specify the array of seconds that cannot be selected | <Enum type="Function">(hour: number, minute: number, role?: RoleType, compare?: Compare) => number[]</Enum> | —       |

### TimePicker Events

| Name              | Description                                           | Type                                                                                                                           |
| ----------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| onChange          | Triggers when user confirms the value                 | <Enum type="Function">`(val: number \| string \| Date \| [number, number] \| [string, string] \| [Date, Date]) => void`</Enum> |
| onBlur            | Triggers when Input blurs                             | <Enum type="Function">`(e: FocusEvent) => void`</Enum>                                                                         |
| onFocus           | Triggers when Input focuses                           | <Enum type="Function">`(e: FocusEvent) => void`</Enum>                                                                         |
| onClear           | Triggers when the clear icon is clicked in clearable mode | <Enum type="Function">`() => void`</Enum>                                                                                      |
| onVisibleChange   | Triggers when the TimePicker's dropdown appears/disappears | <Enum type="Function">`(visibility: boolean) => void`</Enum>                                                                   |

### Ref

| Name        | Description                          | Type                                      |
| ----------- | ------------------------------------ | ----------------------------------------- |
| focus       | Focus the component                  | <Enum type="Function">`() => void`</Enum> |
| blur        | Blur the component                   | <Enum type="Function">`() => void`</Enum> |
| handleOpen  | Open the TimePicker popper           | <Enum type="Function">`() => void`</Enum> |
| handleClose | Close the TimePicker popper          | <Enum type="Function">`() => void`</Enum> |