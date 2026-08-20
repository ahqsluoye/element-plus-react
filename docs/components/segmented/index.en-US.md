---
title: Segmented
lang: en-US
---

<Meta></Meta>

# Segmented

Display multiple options and allow users to select a single option.

## Basic Usage

Set `value` to the option value.

<code src="./basic.tsx"></code>

## Direction

Set `vertical` to change the direction.

<code src="./custom-direction.tsx"></code>

## Disabled

Set the `disabled` attribute to disable some options.

<code src="./disabled.tsx"></code>

## Custom Options

When your `options` format is different from the default format, you can customize `options` through the `props` attribute.

<code src="./props.tsx"></code>

## Block

Set `block` to `true` to fit the width of the parent element.

<code src="./block.tsx"></code>

## Custom Content

Set `children` to render custom content.

<code src="./custom-content.tsx"></code>

## Custom Style

Use CSS variables to set custom styles.

<code src="./custom-style.tsx"></code>

## API

### Properties

| Name         | Description               | Type                                                           | Default    |
| ------------ | ------------------------- | -------------------------------------------------------------- | ---------- |
| value        | Binding value             | `string` / `number` / `boolean`                                | —          |
| defaultValue | Default binding value     | `string` / `number` / `boolean`                                | —          |
| options      | Data of the options       | <Enum type="array">Option[]</Enum>                             | []         |
| props        | Configuration options, see the table below | `object`                                            | —          |
| size         | Size of the component     | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum> | ''         |
| block        | Fit the width of the parent element | `boolean`                                                  | false      |
| disabled     | Whether disabled          | `boolean`                                                      | false      |
| name         | Native `name` attribute    | `string`                                                       | —          |
| id           | Native `id` attribute     | `string`                                                       | —          |
| direction    | Display direction         | <Enum type="enum">'horizontal' \| 'vertical'</Enum>            | horizontal |

### props

| Attribute | Description                                                     | Type     | Default  |
| --------- | --------------------------------------------------------------- | -------- | -------- |
| value     | Specify which key of the node object is used as the value       | `string` | value    |
| label     | Specify which key of the node object is used as the label       | `string` | label    |
| disabled  | Specify which key of the node object is used as the disabled state | `string` | disabled |

### Events

| Name     | Description                                                                 | Type                                            |
| -------- | --------------------------------------------------------------------------- | ----------------------------------------------- |
| onChange | Triggered when the selected value changes, the parameter is the currently selected value | <Enum type="Function">(val: any) => void</Enum> |

## Type Declarations

<details open>
  <summary>Show declarations</summary>

```ts
type Option = Record<string, any> | string | number | boolean;
```

</details>