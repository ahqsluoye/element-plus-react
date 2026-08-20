---
title: Input Number
lang: en-US
---

<Meta></Meta>

# Input Number

Input numerical values with a customizable range.

## Basic Usage

To use it, just bind a variable to `value` in the `<ElInputNumber>` element, and the initial value of the variable is the default value.

<code src="./basic.tsx"></code>

:::info{title=TIP}

When inputting an invalid string into the input box, the input value will import `NaN` to the upper layer due to an error.

:::

## Disabled

The `disabled` attribute accepts a `Boolean`. Setting it to `true` disables the entire component. If you only need to control the value within a range, you can set the `min` and `max` attributes. The default minimum value is `0`.

<code src="./disabled.tsx"></code>

## Steps

Allows you to define incremental steps.

Set the `step` attribute to control the step size.

<code src="./steps.tsx"></code>

## Step Strictly

The `stepStrictly` attribute accepts a `Boolean`. If this attribute is set to `true`, only multiples of the step can be entered.

<code src="./step-strictly.tsx"></code>

## Precision

Set the `precision` attribute to control the numerical precision, which accepts a `Number`.

<code src="./precision.tsx"></code>

:::info{title=TIP}

The value of `precision` must be a non-negative integer and cannot be less than the decimal places of `step`.

:::

## Sizes

Use the `size` attribute to configure the size. Optional sizes are: `large` or `small`.

<code src="./size.tsx"></code>

## Controls Position

Set the `controlsPosition` attribute to control the button position.

<code src="./controlled.tsx"></code>

## Custom Icon

Use `decreaseIcon` and `increaseIcon` to set custom icons.

<code src="./custom.tsx"></code>

## With Prefix and Suffix

Use prefix and suffix.

<code src="./with-prefix-suffix.tsx"></code>

## API

### Properties

| Name               | Description                                             | Type                                                                                             | Default    |
| ------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ---------- |
| value              | Binding value (controlled)                              | `number` / `string`                                                                              | —          |
| defaultValue       | Default value                                           | `number` / `string`                                                                              | —          |
| min                | Set the minimum value allowed by the counter            | `number`                                                                                         | -Infinity  |
| max                | Set the maximum value allowed by the counter            | `number`                                                                                         | Infinity   |
| step               | Counter step                                            | `number`                                                                                         | 1          |
| stepStrictly       | Whether only multiples of step can be entered           | `boolean`                                                                                        | false      |
| precision          | Numerical precision                                     | `number`                                                                                         | —          |
| size               | Counter size                                            | <Enum>'large' \| 'default' \| 'small'</Enum>                                                     | default    |
| readonly           | Native `readonly` attribute, whether the input is readonly | `boolean`                                                                                        | false      |
| disabled           | Whether to disable                                      | `boolean`                                                                                        | false      |
| controls           | Whether to use control buttons                          | `boolean`                                                                                        | true       |
| controlsPosition   | Control button position                                 | <Enum>'' \| 'right'</Enum>                                                                       | —          |
| name               | Equivalent to the native input `name` attribute         | `string`                                                                                         | —          |
| placeholder        | Equivalent to the native input `placeholder` attribute  | `string`                                                                                         | —          |
| valueOnClear       | The value displayed when the input is cleared           | <Enum>'min' \| 'max' \| number \| null</Enum>                                                    | —          |
| prefix             | Prefix content for the input                            | `string` / `Component`                                                                           | —          |
| suffix             | Suffix content for the input                            | `string` / `Component`                                                                           | —          |
| prepend            | Prepend content for the input                           | `string` / `Component`                                                                           | —          |
| append             | Append content for the input                            | `string` / `Component`                                                                           | —          |
| maxLength          | Maximum input length                                    | `number`                                                                                         | —          |
| minLength          | Native attribute, minimum input length                  | `number`                                                                                         | —          |
| align              | Inner input text alignment                              | <Enum>'left' \| 'right' \| 'center'</Enum>                                                       | —          |
| disabledScientific | Disable scientific notation input (e.g. entering 'e')   | `boolean`                                                                                        | —          |
| inputmode          | Native inputmode attribute                              | <Enum>'none' \| 'text' \| 'tel' \| 'url' \| 'email' \| 'numeric' \| 'decimal' \| 'search'</Enum> | —          |
| decreaseIcon       | Custom decrease button icon                             | `ReactNode`                                                                                      | —          |
| increaseIcon       | Custom increase button icon                             | `ReactNode`                                                                                      | —          |

### Events

| Name     | Description                     | Type                                                                                               |
| -------- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| onChange | Triggered when the bound value changes | <Enum type='Function'>(currentValue: number \| string, oldValue?: number \| string) => void</Enum> |

### Ref

| Name     | Description                  | Type                                             |
| -------- | ---------------------------- | ------------------------------------------------ |
| root     | Top-level div                | <Enum type='object'>Ref\<HTMLDivElement\></Enum> |
| input    | Input instance              | <Enum type='object'>Ref\<InputRef\></Enum>       |
| getValue | Get value                   | <Enum type='Function'>() => number</Enum>        |
| focus    | Make the input component gain focus | <Enum type='Function'>() => void</Enum>          |
| blur     | Make the input component lose focus | <Enum type='Function'>() => void</Enum>          |