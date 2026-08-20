---
title: Radio
lang: en-US
---

<Meta></Meta>

# Radio

Single selection among multiple options.

## Basic Usage

Radio should not have too many options. If you have many options, you should use the Select component instead.

<code src="./basic-usage.tsx"></code>

## Disabled State

The `disabled` attribute can be used to control the disabled state of the radio.

You just need to set the `disabled` attribute on the radio to control its disabled state.

<code src="./disabled.tsx"></code>

## Radio Group

Suitable for scenarios where you need to choose from multiple mutually exclusive options.

Combine the `ElRadioGroup` element and child `ElRadio` elements to create a radio group. Bind `value` to `ElRadioGroup`, and then set the `value` attribute for each `ElRadio`. Additionally, you can respond to changes through the `onChange` event, which passes a parameter `value` representing the changed value.

<code src="./radio-button-group.tsx"></code>

## Options Attribute

A shortcut for basic `ElCheckboxGroup` usage. You can customize the alias of `options` through the `props` attribute.

<code src="./options.tsx"></code>

## Button Style

You can make the radio look like a button.

Just replace the `ElRadio` element with the `ElRadioButton` element. Additionally, Element Plus React provides a `size` attribute to control the size of the radio.

<code src="./button-style.tsx"></code>

<!-- ## With Borders

Set the `border` attribute to `true` to render radios with borders.

<code src="./with-borders.tsx"></code> -->

## Radio API

### Radio Properties

| Name           | Description               | Type                                         | Default |
| -------------- | ------------------------- | -------------------------------------------- | ------- |
| value          | Bound value when selected | `string` / `number` / `boolean`              | —       |
| checked        | Whether selected (controlled) | `boolean`                                  | false   |
| defaultChecked | Whether selected (default value) | `boolean`                                | false   |
| title          | Tooltip tip               | `string`                                     | —       |
| disabled       | Whether radio is disabled | `boolean`                                    | false   |
| size           | Size of the radio         | <Enum>'large' \| 'default' \| 'small'</Enum> | —       |
| readOnly       | Whether read-only         | `boolean`                                    | —       |
| plaintext      | Whether rendered as plain text | `boolean`                                 | —       |
| name           | Native `name` attribute   | `string`                                     | —       |

### Radio Events

| Name     | Description                               | Type                                                                                                            |
| -------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| onChange | Triggered when the binding value changes  | <Enum type='Function'>(checked: boolean, value: any, event: React.ChangeEvent<HTMLInputElement>) => void</Enum> |

## RadioGroup API

### RadioGroup Properties

| Name     | Description                                                                           | Type                                                                             | Default                                                                            |
| -------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| value    | Bound value when selected                                                             | `string` / `number` / `boolean`                                                  | —                                                                                 |
| size     | Size of radio buttons or bordered radios                                              | `string`                                                                         | default                                                                           |
| disabled | Whether disabled                                                                      | `boolean`                                                                        | false                                                                             |
| name     | Native `name` attribute                                                               | `string`                                                                         | —                                                                                 |
| options  | Data source of options. The keys `value`, `label`, and `disabled` can be customized through `props`. | <Enum type="array">Array<{[key: string]: any}></Enum>                            | —                                                                                 |
| props    | Configuration of options                                                             | <Enum type="object">{ value?: string; label?: string; disabled?: string }</Enum> | <Enum type="object">{value: 'value', label: 'label', disabled: 'disabled'}</Enum> |

### RadioGroup Events

| Name     | Description                               | Type                                                                      |
| -------- | ----------------------------------------- | ------------------------------------------------------------------------- |
| onChange | Triggered when the binding value changes  | <Enum type='Function'>(value: string \| number \| boolean) => void</Enum> |

## RadioButton API

### RadioButton Properties

| Name           | Description               | Type                                         | Default |
| -------------- | ------------------------- | -------------------------------------------- | ------- |
| value          | Bound value when selected | `string` / `number` / `boolean`              | —       |
| checked        | Whether selected (controlled) | `boolean`                                  | false   |
| defaultChecked | Whether selected (default value) | `boolean`                                | false   |
| disabled       | Whether radio is disabled | `boolean`                                    | false   |
| size           | Size of the radio         | <Enum>'large' \| 'default' \| 'small'</Enum> | —       |
| name           | Native `name` attribute   | `string`                                     | —       |