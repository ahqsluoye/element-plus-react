---
title: Checkbox
lang: en-US
---

<Meta></Meta>

# Checkbox

A group of options for multiple choices.

## Basic Usage

Used alone, it can represent a toggle between two states. The content written in the tag is the description after the `Checkbox` button.

The `CheckboxGroup` element can manage multiple checkboxes as a group. Simply use `value` to bind a variable of type `Array` in the `Group`.
When there is only one option, the default value type is `Boolean`, and it becomes `true` when selected. The content in the `Checkbox` tag will become the description after the checkbox button.

<code src="./basic.tsx"></code>

## Disabled State

Unavailable state for checkboxes.

Set the `disabled` attribute.

<code src="./disabled.tsx"></code>

## Checkbox Group

Suitable for scenarios where multiple checkboxes are bound to the same array, indicating which items are selected in this group by whether they are checked.

Define `value` in the `Checkbox` element to bind a variable. In a single checkbox, the default bound variable value is `Boolean`, and it becomes `true` when selected.
In the `Checkbox` component, `value` is the value of the checkbox. `value` also corresponds to the element values in the array. If the specified value exists in the array, it is in the selected state, and vice versa.

<code src="./grouping.tsx"></code>

## Options Attribute

A shortcut example for basic `ElCheckboxGroup` usage. You can customize the alias of `options` through the `props` attribute.

<code src="./options.tsx"></code>

## Indeterminate

The `indeterminate` attribute is used to indicate an indeterminate state of the checkbox, generally used to implement a select-all effect.

<code src="./intermediate.tsx"></code>

## Limiting the Number of Selectable Items

Use the `min` and `max` attributes to limit the number of items that can be checked.

<code src="./limitation.tsx"></code>

## Button Style

Checkbox group with button styles.

Simply replace the `ElCheckbox` element with the `ElCheckboxButton` element. Additionally, Element Plus provides a `size` attribute.

<code src="./button-style.tsx"></code>

<!-- ## With Borders

Set the `border` attribute to render checkboxes with borders.

<code src="./with-border.tsx"></code> -->

## Checkbox API

### Checkbox Properties

| Name           | Description                           | Type                                         | Default |
| -------------- | ------------------------------------- | -------------------------------------------- | ------- |
| value          | Value when selected                   | `string` / `number`                          | —       |
| disabled       | Whether disabled                       | `boolean`                                    | false   |
| size           | Size of the Checkbox                  | <Enum>'large' \| 'default' \| 'small'</Enum> | —       |
| title          | Tooltip tip                           | `string`                                     | —       |
| readOnly       | Whether read-only                     | `boolean`                                    | —       |
| name           | Native name attribute                 | `string`                                     | —       |
| checked        | Whether currently checked (controllable) | `boolean`                                  | false   |
| defaultChecked | Whether selected by default           | `boolean`                                    | false   |
| indeterminate  | Set indeterminate state, only responsible for style control | `boolean`                          | false   |
| prevent        | Whether to prevent default event when clicking checkbox | `boolean`                                    | —       |

<!-- The following properties were not found in the current type definitions -->
<!-- | border         | Whether to display border             | `boolean`                                    | false  | -->
<!-- | inline         | Inline layout                         | `boolean`                                    | —      | -->

### Checkbox Events

| Name            | Description                               | Type                                                                                                                  |
| --------------- | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| onChange        | Triggered when the binding value changes  | <Enum type='Function'>(checked: boolean, value: ValueType, event: React.ChangeEvent<HTMLInputElement>) => void</Enum> |
| onClick         | Click event on the top-level div of checkbox | <Enum type='Function'>(event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => void</Enum>                          |
| onCheckboxClick | Click event on checkbox                  | <Enum type='Function'>(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void</Enum>                          |

## CheckboxGroup API

### CheckboxGroup Properties

| Name               | Description                                                           | Type                                                                             | Default                                                                            |
| ------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| value              | Value when selected (controllable mode)                               | <Enum type='object'>string[] \| number[]</Enum>                                  | []                                                                                 |
| defaultValue       | Default selected value                                                | <Enum type='object'>string[] \| number[]</Enum>                                  | []                                                                                 |
| size               | Size of the checkbox group                                            | <Enum>'large' \| 'default' \| 'small'</Enum>                                     | —                                                                                  |
| disabled           | Whether disabled                                                      | `boolean`                                                                        | false                                                                              |
| getBooleanOnSingle | Get Boolean type value when there is a single CheckBox                | `boolean`                                                                        | false                                                                              |
| min                | Minimum number of checkboxes that can be checked                     | `number`                                                                         | —                                                                                  |
| max                | Maximum number of checkboxes that can be checked                     | `number`                                                                         | —                                                                                  |
| options            | Data source of options. The keys `value`, `label`, and `disabled` can be customized through `props`. | <Enum type="array">Array<{[key: string]: any}></Enum>                            | —                                                                                  |
| props              | Configuration of options                                              | <Enum type="object">{ value?: string; label?: string; disabled?: string }</Enum> | <Enum type="object">{value: 'value', label: 'label', disabled: 'disabled'}</Enum> |

### CheckboxGroup Events

| Name     | Description                               | Type                                                                                |
| -------- | ----------------------------------------- | ----------------------------------------------------------------------------------- |
| onChange | Triggered when the binding value changes  | <Enum type='Function'>(value: boolean \| ValueType[], event?: Event) => void</Enum> |