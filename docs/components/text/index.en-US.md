---
title: Text
lang: en-US
---

<Meta></Meta>

# Text

Common text operations.

## Basic Usage

Use the `type` attribute to define the type of Text.

<code src="./basic.tsx"></code>

## Sizes

Use the `size` attribute to configure the size. Available sizes: `large`, `default`, or `small`.

<code src="./sizes.tsx"></code>

## Ellipsis

Use the `truncated` attribute to show an ellipsis when the text exceeds the viewport or max-width. Use the `lineClamp` attribute to control multiline styles.

<code src="./truncated.tsx"></code>

## Override

Use the `tag` attribute to override the element.

<code src="./override.tsx"></code>

## Mixed Usage

Mixed usage of the Text component.

<code src="./mixed.tsx"></code>

## API

### Properties

| Name      | Description        | Type                                                                   | Default |
| --------- | ------------------ | ---------------------------------------------------------------------- | ------- |
| type      | Type               | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> | —       |
| size      | Size               | <Enum>'large' \| 'default' \| 'small'</Enum>                           | default |
| truncated | Show ellipsis      | `boolean`                                                              | false   |
| lineClamp | Maximum lines      | `string` / `number`                                                    | —       |
| tag       | Custom element tag | `string`                                                               | span    |
| title     | Title              | `string`                                                               | —       |