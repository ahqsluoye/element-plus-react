---
title: Button
lang: en-US
---

<Meta></Meta>

# Button

Commonly used operation buttons.

## Basic Usage

Use `type`, `plain`, `round` and `circle` to define the button's style.

<code src="./basic.tsx"></code>

## Disabled State

You can use the `disabled` attribute to define whether the button is disabled.

Use the `disabled` attribute to control whether the button is in a disabled state. This attribute accepts a `Boolean` value.

<code src="./disabled.tsx"></code>

## Link Button

<code src="./link.tsx"></code>

## Text Button

Buttons without border and background color.

<code src="./text.tsx"></code>

## Dashed Button

Buttons with dashed border and no background color.

<code src="./dashed.tsx"></code>

## Icon Button

Use icons to add more meaning to buttons. You can also use icons alone without text to save display space.

Use the `icon` attribute to add an icon to the button. You can find the required icon in our Icon component.

<code src="./icon.tsx"></code>

## Button Group

Displayed as a button group, commonly used for multiple similar operations.

Use `<Button.Group>` to group multiple buttons.

<code src="./group.tsx"></code>

## Loading Button

Click the button to load data and provide loading feedback to the user.

Display the loading state by setting the `loading` attribute to `true`.

:::info{title=TIP}

You can use the `loadingSlot` or `loadingIcon` attribute to customize your loading icon

ps: `loadingSlot` takes higher priority than the `loadingIcon` attribute

:::

<code src="./loading.tsx"></code>

## Sizes

Besides the default size, the Button component provides several additional sizes for different scenarios.

Use the `size` attribute to configure the size, with `large` and `small` values available.

<code src="./size.tsx"></code>

## Custom Color

You can customize the button color using the `color` attribute.

We will automatically calculate the hover and active colors.

<code src="./custom.tsx"></code>

## Button API

### Button Properties

| Name            | Description                                                        | Type                                                              | Default |
| --------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ------- |
| size            | Size                                                              | <Enum>'large'\| 'small'</Enum>                                    | —       |
| type            | Type                                                              | <Enum>'primary'\| 'success'\| 'warning'\| 'error'\| 'info'</Enum> | —       |
| plain           | Whether it is a plain button                                      | `boolean`                                                         | false   |
| text            | Whether it is a text button                                       | `boolean`                                                         | false   |
| dashed          | Whether it is a dashed button                                     | `boolean`                                                         | false   |
| bg              | Whether to display the background color of text button           | `boolean`                                                         | false   |
| link            | Whether it is a link button                                       | `boolean`                                                         | false   |
| round           | Whether it is a round button                                      | `boolean`                                                         | false   |
| circle          | Whether it is a circle button                                     | `boolean`                                                         | false   |
| loading         | Whether it is in a loading state                                  | `boolean`                                                         | false   |
| loadingSlot     | Custom loading state icon component                               | `Component`                                                       | —       |
| loadingIcon     | Custom loading state icon name                                    | `string`                                                          | spinner |
| disabled        | Whether the button is disabled                                    | `boolean`                                                         | false   |
| icon            | Icon component                                                    | `string`                                                          | —       |
| nativeType      | Native type attribute                                             | <Enum>'button'\| 'submit'\| 'reset'</Enum>                        | button  |
| autoInsertSpace | Automatically insert space between two Chinese characters         | `boolean`                                                         | —       |
| color           | Custom button color, automatically calculate `hover` and `active` colors | `string`                                                     | —       |
| active          | Whether it is in an active state                                  | `boolean`                                                         | false   |
| iconProps       | Custom icon settings                                              | `IconProps` (excluding name property)                              | —       |

<!--
| autofocus       | Native `autofocus` attribute                                       | `boolean`                                                         | false   |
| dark            | Dark mode, meaning automatically set `color` to dark mode colors   | `boolean`                                                         | false   |
| block           | Format button to display within a content block                    | `boolean`                                                         | false   |
| href            | Providing `href` will render an `<a>` element styled as a button   | `string`                                                          | —       |
| target          | Display position of the link URL                                  | `string`                                                          | —       |
  -->

### Button Ref

| Name           | Description                       | Type                                                                                              |
| -------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| ref            | Button html element               | <Enum type='object'>Ref\<HTMLButtonElement></Enum>                                                |
| size           | Button size                       | <Enum type='object'>'' \| 'large'\| 'small' \| 'default</Enum>                                    |
| type           | Button type                       | <Enum type='object'>'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> |
| disabled       | Button disabled                   | `boolean`                                                                                         |
| shouldAddSpace | Whether to insert space between two characters | `boolean`                                                                                |

## ButtonGroup API

### ButtonGroup Properties

| Name        | Description                                            | Type                                                               | Default |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------------ | ------- |
| size        | Used to control the size of buttons in this button-group | <Enum>'large'\| 'small'</Enum>                                     | —       |
| type        | Used to control the type of buttons in this button-group | <Enum>'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'</Enum> | —       |
| bgColor     | Custom button color                                    | `string`                                                           | —       |
| borderColor | Custom button border color                             | `string`                                                           | —       |
| disabled    | Whether the button is disabled                         | `boolean`                                                          | false   |