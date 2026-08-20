---
title: Input
lang: en-US
---

<Meta></Meta>

# Input

Input data using mouse or keyboard.

## Basic Usage

<code src="./basic.tsx" path="input"></code>

## Disabled / Readonly / Borderless

Use the `disabled` attribute to specify whether the input component is disabled.

<code src="./disabled.tsx" path="input"></code>

## Clearable

Use the `clearable` attribute to get an input box that can be cleared with one click.

<code src="./clearable.tsx" path="input"></code>

## Formatter

Display value within its situation with `formatter`, and we usually use `parser` at the same time.

<code src="./formatter.tsx" path="input"></code>

## Password

Use the `showPassword` attribute to get a password input box that can toggle between showing and hiding the password.

<code src="./password.tsx" path="input"></code>

## Input with Icon

Add an icon to indicate input type.

To add icons in Input, you can simply use the `prefix` and `suffix` attributes.

<code src="./with-icon.tsx" path="input"></code>

## Textarea

Resizable input box for entering multiple lines of text information.

The height of the textarea can be controlled by the `rows` attribute.

<code src="./textarea.tsx" path="input"></code>

<!-- ## Autosize Textarea

Setting the `autosize` attribute for a textarea type input makes the height automatically adjust based on content. You can provide an object with max and min heights to `autosize` to allow the input to automatically adjust. -->

<!-- <code src="./auto-sizing-textarea.tsx" path="input"></code> -->

## Mixed Input

Prepend or append an element, generally a label or a button.

Use `append` or `prepend` to specify the content that is distributed before or after the Input.

<code src="./mixed-input.tsx" path="input"></code>

## Sizes

Use the `size` attribute to change the input size. In addition to the default size, there are two other options: `large`, `small`.

<code src="./various-size.tsx" path="input"></code>

## Input Length Limit

Use the `maxLength` and `minLength` attributes to control the maximum and minimum number of characters for the input content. "Character count" is measured using JavaScript string length. Setting the `maxLength` prop for text or textarea type inputs can limit the length of the input value. You can display the remaining character count by setting `showWordLimit` to `true`.

<code src="./length-limiting.tsx" path="input"></code>

## Input Range

<code src="./input-range.tsx" path="input"></code>

## API

### Input Properties

| Name          | Description                                                                                                                   | Type                                                                                                                                              | Default |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| type          | Type                                                                                                                          | `string` `'text' \| 'hidden' \| ...` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text    |
| value         | Binding value (controlled)                                                                                                    | `string` / `number`                                                                                                                               | —       |
| defaultValue  | Default value                                                                                                                 | `string` / `number`                                                                                                                               | —       |
| size          | Input size                                                                                                                    | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                                                      | —       |
| id            | Unique identifier for the input                                                                                               | `string`                                                                                                                                          | —       |
| prefix        | Prefix content for the input, only effective when type="text"                                                                 | `string` / `Component`                                                                                                                            | —       |
| suffix        | Suffix content for the input, only effective when type="text"                                                                 | `string` / `Component`                                                                                                                            | —       |
| prepend       | Prepend content for the input, only effective when type="text"                                                                | `string` / `Component`                                                                                                                            | —       |
| append        | Append content for the input, only effective when type="text"                                                                 | `string` / `Component`                                                                                                                            | —       |
| clearable     | Whether to show the clear button                                                                                              | `boolean`                                                                                                                                         | false   |
| formatter     | Specifies the format of the input value. (Only works when type is 'text')                                                     | <Enum type='Function'>(value: string \| number) => string</Enum>                                                                                  | —       |
| showPassword  | Whether to show the toggle password icon                                                                                      | `boolean`                                                                                                                                         | false   |
| plain         | Whether to use plain text mode, i.e. no border                                                                                | `boolean`                                                                                                                                         | —       |
| innerStyle    | Custom inline style for the input                                                                                             | `CSSProperties`                                                                                                                                   | —       |
| maxLength     | Maximum input length                                                                                                          | `number`                                                                                                                                          | —       |
| minLength     | Native attribute, minimum input length                                                                                        | `number`                                                                                                                                          | —       |
| showWordLimit | Whether to show word count, only works when type is 'text' or 'textarea'                                                      | `boolean`                                                                                                                                         | —       |
| placeholder   | Placeholder text for the input                                                                                                | `string`                                                                                                                                          | —       |
| disabled      | Whether to disable                                                                                                            | `boolean`                                                                                                                                         | false   |
| name          | Equivalent to the native input `name` attribute                                                                                | `string`                                                                                                                                          | —       |
| readOnly      | Native `readonly` attribute, whether the input is readonly                                                                    | `boolean`                                                                                                                                         | false   |
| autocomplete  | Native autocomplete attribute                                                                                                 | `string`                                                                                                                                          | —       |
| tabindex      | Native tabindex attribute                                                                                                     | `number`                                                                                                                                          | —       |
| ariaLabel     | Native aria-label attribute                                                                                                   | `string`                                                                                                                                          | —       |
| form          | Native form attribute                                                                                                         | `string`                                                                                                                                          | —       |
| autofocus     | Native autofocus attribute                                                                                                    | `boolean`                                                                                                                                         | —       |
| inputmode     | Native inputmode attribute                                                                                                    | <Enum>'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'</Enum>                                                  | —       |

### Input Events

| Name         | Description                                                   | Type                                                                                      |
| ------------ | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| onChange     | Triggered when the Input value changes                        | <Enum type='Function'>(value: string \| number, event?: React.ChangeEvent) => void</Enum> |
| onInput      | Triggered when the Input value is entered                     | <Enum type='Function'>(value: string \| number) => void</Enum>                            |
| onClear      | Triggered when clicking the clear button generated by `clearable` | <Enum type='Function'>(e: React.MouseEvent) => void</Enum>                                |
| onFocus      | Triggered when the Input gains focus                         | <Enum type='Function'>(event: React.FocusEvent) => void</Enum>                            |
| onBlur       | Triggered when the Input loses focus                         | <Enum type='Function'>(event: React.FocusEvent) => void</Enum>                            |
| onKeyDown    | Triggered when a key is pressed on the Input                 | <Enum type='Function'>(event: React.KeyboardEvent) => void</Enum>                         |
| onMouseEnter | Triggered when the mouse enters                              | <Enum type='Function'>(event: React.MouseEvent) => void</Enum>                            |
| onMouseLeave | Triggered when the mouse leaves                              | <Enum type='Function'>(event: React.MouseEvent) => void</Enum>                            |

### Input Ref

| Name      | Description                  | Type                                                       |
| --------- | ---------------------------- | ---------------------------------------------------------- |
| ref       | Top-level div                | <Enum type='object'>Ref\<HTMLDivElement></Enum>            |
| input     | Input HTML element           | <Enum type='object'>HTMLInputElement</Enum>                |
| getValue  | Get value                   | <Enum type='Function'>() => `string` / `number`</Enum>     |
| setValue  | Set value                   | <Enum type='Function'>(`string` / `number`) => void</Enum> |
| clear     | Reset value                 | <Enum type='Function'>() => void</Enum>                    |
| focus     | Make the input component gain focus | <Enum type='Function'>() => void</Enum>                    |
| blur      | Make the input component lose focus | <Enum type='Function'>() => void</Enum>                    |

### Textarea Properties

| Name          | Description                                                                 | Type                                                        | Default |
| ------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------- | ------- |
| value         | Binding value (controlled)                                                  | `string` / `number`                                         | —       |
| defaultValue  | Default value                                                               | `string` / `number`                                         | —       |
| plain         | Whether to use plain text mode, i.e. no border                              | `boolean`                                                   | —       |
| rows          | Number of rows                                                              | `number`                                                    | —       |
| inputStyle    | Custom inline style for the input                                           | `CSSProperties`                                             | —       |
| maxLength     | Maximum input length                                                        | `number`                                                    | —       |
| minLength     | Native attribute, minimum input length                                      | `number`                                                    | —       |
| showWordLimit | Whether to show word count, only works when type is 'text' or 'textarea'    | `boolean`                                                   | —       |
| resize        | Control whether the user can resize                                         | <Enum>'none' \| 'both' \| 'horizontal' \| 'vertical'</Enum> | —       |
| autosize      | Whether height is adaptive, can accept an object, e.g.: `{ minRows: 2, maxRows: 6 }` | `boolean \| { minRows?: number; maxRows?: number }`         | —       |
| clearable     | Whether clearable                                                           | `boolean`                                                   | —       |
| placeholder   | Placeholder text for the input                                              | `string`                                                    | —       |
| disabled      | Whether to disable                                                          | `boolean`                                                   | false   |
| readOnly      | Native `readonly` attribute, whether the input is readonly                 | `boolean`                                                   | false   |

### Textarea Events

| Name     | Description                        | Type                                                                                      |
| -------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| onChange | Triggered when the Input value changes | <Enum type='Function'>(value: string \| number, event?: React.ChangeEvent) => void</Enum> |

### Textarea Ref

| Name     | Description                  | Type                                                       |
| -------- | ---------------------------- | ---------------------------------------------------------- |
| input    | Textarea HTML element        | <Enum type='object'>HTMLTextAreaElement</Enum>             |
| getValue | Get value                   | <Enum type='Function'>() => `string` / `number`</Enum>     |
| setValue | Set value                   | <Enum type='Function'>(`string` / `number`) => void</Enum> |
| clear    | Reset value                 | <Enum type='Function'>() => void</Enum>                    |
| focus    | Make the input component gain focus | <Enum type='Function'>() => void</Enum>                    |
| blur     | Make the input component lose focus | <Enum type='Function'>() => void</Enum>                    |

### InputRange Properties

| Name             | Description                          | Type                                                                   | Default |
| ---------------- | ------------------------------------ | ---------------------------------------------------------------------- | ------- |
| value            | Binding value (controlled)           | `[string \| null, string \| null] \| [number \| null, number \| null]` | —       |
| defaultValue     | Default value                         | `[string \| null, string \| null] \| [number \| null, number \| null]` | —       |
| name             | Input name attribute                 | `[string, string]`                                                     | —       |
| size             | Input size                           | <Enum>'large' \| 'default' \| 'small'</Enum>                           | —       |
| readOnly         | Readonly                             | `boolean`                                                              | —       |
| active           | Whether active state                 | `boolean`                                                              | —       |
| type             | Type                                 | <Enum>'text' \| 'hidden' \| 'number'</Enum>                            | —       |
| prefix           | Prefix content for the input         | `string` / `Component`                                                 | —       |
| suffix           | Suffix content for the input         | `string` / `Component`                                                 | —       |
| prepend          | Prepend content for the input        | `string` / `Component`                                                 | —       |
| append           | Append content for the input         | `string` / `Component`                                                 | —       |
| clearable        | Whether clearable                   | `boolean`                                                              | —       |
| plain            | Whether to use plain text mode, i.e. no border | `boolean`                                                              | —       |
| rangeSeparator   | Separator when selecting a range     | `string`                                                               | —       |
| innerStyle       | Custom inline style for the input    | `CSSProperties`                                                        | —       |
| startPlaceholder | Placeholder for the start input when selecting a range | `string`                                                               | —       |
| endPlaceholder   | Placeholder for the end input when selecting a range | `string`                                                               | —       |
| disabled         | Whether to disable                   | `boolean`                                                              | false   |

### InputRange Events

| Name     | Description                                                   | Type                                                                                     |
| -------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| onClear  | Triggered when clicking the clear button generated by `clearable` | <Enum type='Function'>(e: MouseEvent) => void</Enum>                                     |
| onChange | Triggered when the selected value changes                     | <Enum type='Function'>(value: InputRangeValueType \| null, event?: Event) => void</Enum> |