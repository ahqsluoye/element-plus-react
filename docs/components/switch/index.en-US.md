---
title: Switch
lang: en-US
---

<Meta></Meta>

# Switch

Switch is used for switching between two opposing states, commonly used for toggling on/off states.

## Basic Usage

Bind `value` to a `Boolean` typed variable. The `activeColor` and `inactiveColor` attributes can be used to set the background color of the switch. You can also use the `--el-switch-on-color` and `--el-switch-off-color` CSS variables to set the background color.

<code src="./basic.tsx"></code>

## Sizes

<code src="./sizes.tsx"></code>

## Text Description

Use the `activeText` and `inactiveText` attributes to set the text description of the switch. Use the `inlinePrompt` attribute to control whether the text is displayed inside the dot.

Use the `activeText` and `inactiveText` attributes to set the text description of the switch.

<code src="./text-description.tsx"></code>

## Display Custom Icons

Use the `inactiveIcon` and `activeIcon` attributes to add icons. Use the `inlinePrompt` attribute to control whether the icon is displayed inside the dot.

<code src="./custom-icons.tsx"></code>

## Extended Value Types

You can set the `activeValue` and `inactiveValue` attributes, which accept `Boolean`, `String`, or `Number` typed values.

<code src="./extended-value-types.tsx"></code>

## Disabled

Set the `disabled` attribute, which accepts a `Boolean`, and set it to `true` to disable the switch.

<code src="./disabled.tsx"></code>

## Loading

Set the `loading` attribute, which accepts a `Boolean`, and set it to `true` to show a loading state.

<code src="./loading.tsx"></code>

## Prevent Switching

Set the `beforeChange` attribute. If it returns `false` or returns a `Promise` that gets rejected, switching will be stopped.

<code src="./prevent-switching.tsx"></code>

## API

### Properties

| Name           | Description                                                                                                                                | Type                                | Options                | Default |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- | ---------------------- | ------- |
| value          | Binding value, must be equal to `activeValue` or `inactiveValue`, defaults to `Boolean` type                                             | boolean / string / number           | —                      | —       |
| disabled       | Whether the switch is disabled                                                                                                             | boolean                             | —                      | false   |
| loading        | Whether to show loading state                                                                                                              | boolean                             | —                      | false   |
| size           | Size of the switch                                                                                                                         | string                              | large / default / small | default |
| name           | The `name` attribute of the switch                                                                                                         | string                              | —                      | —       |
| width          | Width of the switch                                                                                                                        | number                              | —                      | —       |
| inlinePrompt   | Whether the icon or text is displayed inside the dot                                                                                        | boolean                             | —                      | false   |
| activeIcon     | The icon displayed when the switch is in `on` state. Setting this will ignore `activeText`                                                | `string \| Component`               | —                      | —       |
| inactiveIcon   | The icon displayed when the switch is in `off` state. Setting this will ignore `inactiveText`                                              | `string \| Component`               | —                      | —       |
| activeAction   | The icon component displayed in `on` state                                                                                                 | `string \| Component`               | —                      | —       |
| inactiveAction | The icon component displayed in `off` state                                                                                                | `string \| Component`               | —                      | —       |
| activeText     | Text description when the switch is on                                                                                                     | string                              | —                      | —       |
| inactiveText   | Text description when the switch is off                                                                                                    | string                              | —                      | —       |
| activeValue    | Value when the switch is in `on` state                                                                                                      | boolean / string / number           | —                      | true    |
| inactiveValue  | Value when the switch is in `off` state                                                                                                     | boolean / string / number           | —                      | false   |
| activeColor    | Background color when in `on` state (deprecated, use CSS var `--el-switch-on-color` instead)                                               | string                              | —                      | —       |
| inactiveColor  | Background color when in `off` state (deprecated, use CSS var `--el-switch-off-color` instead)                                              | string                              | —                      | —       |
| borderColor    | Border color of the switch (deprecated, use CSS var `--el-switch-border-color` instead)                                                     | string                              | —                      | —       |
| beforeChange   | Hook before the switch state changes. If it returns `false` or returns a `Promise` that gets rejected, switching will be stopped            | `() => Promise<boolean> \| boolean` | —                      | —       |

### Events

| Name    | Description                          | Type                                                                                                                                            |
| ------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| onChange | Callback when the switch state changes | <Enum type="Function">(value?: boolean \| string \| number, checked?: boolean, e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void</Enum> |