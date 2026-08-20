---
title: Alert
lang: en-US
---

<Meta></Meta>

# Alert

Displays important alert messages.

## Basic Usage

Alert components are non-overlay elements in the page that do not disappear automatically.

Alert provides 5 types defined by `type`, whose default value is `info`.

<code src="./basic.tsx"></code>

## Theme

Alert provides two different themes, `light` and `dark`.

Set `effect` to change the theme, default is `light`.

<code src="./theme.tsx"></code>

## Customizable Close Button

Customize the close button as texts or other symbols.

Alert allows you to configure if it's closable. The close button text and closing callbacks are also customizable. `closable` attribute decides if the component can be closed or not. It accepts `boolean`, and the default is `false`. You can set `closeText` attribute to replace the default close icon. Be careful that `closeText` must be a string. `onClose` event fires when the component is closed.

<code src="./close-button.tsx"></code>

## With Icon

Displaying an icon improves readability.

Setting the `showIcon` attribute displays an icon that corresponds with the current Alert type. Or use the `icon` prop to customize icon content.

<code src="./icon.tsx"></code>

## Centered Text

Use the `center` attribute to center the text.

<code src="./center.tsx"></code>

## With Description

Add a more detailed description to the Alert component to help users understand more information.

Besides the required `title` attribute, you can add a `description` attribute to help you describe the alert with more details. Description can only store text content, and it will word wrap automatically when the content exceeds the length limit.

<code src="./description.tsx"></code>

## With Icon and Description

At last, this is an example with both icon and description.

<code src="./icon-description.tsx"></code>

## Alert API

### Properties

| Name        | Description                              | Type                                                                              | Default |
| ----------- | ---------------------------------------- | --------------------------------------------------------------------------------- | ------- |
| title       | alert title.                             | `string`                                                                          | —       |
| type        | alert type.                              | <Enum type="enum">'primary' \| 'success' \| 'warning' \| 'info' \| 'error'</Enum> | info    |
| description | descriptive text.                        | `string`                                                                          | —       |
| closable    | whether alert can be dismissed.          | `boolean`                                                                         | true    |
| center      | whether content is placed in the center. | `boolean`                                                                         | false   |
| closeText   | customized close button text.            | `string`                                                                          | —       |
| showIcon    | whether a type icon is displayed.        | `boolean`                                                                         | false   |
| effect      | theme style.                             | <Enum type="enum">'light' \| 'dark'</Enum>                                        | light   |
| icon        | custom icon                              | `IconName`                                                                        | —       |

### Events

| Name    | Description                   | Type                                                   |
| ------- | ----------------------------- | ------------------------------------------------------ |
| onClose | trigger when alert is closed. | <Enum type="Function">(evt: MouseEvent) => void</Enum> |