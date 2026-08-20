---
title: Link
lang: en-US
---

<Meta></Meta>

# Link

Text hyperlink.

## Basic Usage

Basic text link usage.

<code src="./basic.tsx"></code>

## Disabled

Disabled state of link.

<code src="./disabled.tsx"></code>

## Underline

Text link underline.

<code src="./underline.tsx"></code>

## Icon

Link with icon.

:::info{title=TIP}

Use the `icon` attribute to add an icon to the button. Element Plus React provides a rich set of icons. You can find them in the [icon component](/components/icon-list).

:::

<code src="./with-icon.tsx"></code>

## Link API

### Properties

| Name      | Description                         | Type                                                                                | Default |
| --------- | ----------------------------------- | ----------------------------------------------------------------------------------- | ------- |
| type      | Type                                | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'</Enum> | default |
| underline | Whether to show underline           | <Enum>'always' \| 'hover' \| 'never'</Enum>                                        | hover   |
| target    | Same as native target attribute     | <Enum>'_blank' \| '_self' \| '_top'</Enum>                                         | _self   |
| disabled  | Whether to disable                  | `boolean`                                                                           | false   |
| href      | Native href attribute               | `string`                                                                            | —       |
| icon      | Icon component                      | `string` / `Component`                                                              | —       |