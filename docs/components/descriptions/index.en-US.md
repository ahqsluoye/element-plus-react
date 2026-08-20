---
title: Descriptions
lang: en-US
---

<Meta></Meta>

# Descriptions

Display multiple fields in list form.

## Basic Usage

<code src="./basic-usage.tsx"></code>

## Sizes

<code src="./sizes.tsx"></code>

## Vertical List

<code src="./vertical-list.tsx"></code>

## Customized Style

<code src="./customized-style.tsx"></code>

## Descriptions API

### Descriptions Properties

| Name      | Description                            | Type                                               | Default    |
| --------- | -------------------------------------- | -------------------------------------------------- | ---------- |
| border    | whether to have border                 | `boolean`                                          | false      |
| column    | numbers of `Descriptions Item` in one line | `number`                                           | 3          |
| direction | direction of list                      | <Enum>'vertical' \| 'horizontal'</Enum>            | horizontal |
| size      | size of list                           | <Enum>'' \| 'large' \| 'default' \| 'small'</Enum> | —          |
| title     | title text, displayed on the top left   | `string`                                           | ''         |
| extra     | extra text, displayed on the top right  | `string`                                           | ''         |

<!--
| labelWidth | label width of every column                | `string` / `number`                                | ''         | -->

## DescriptionsItem API

### DescriptionsItem Properties

| Name           | Description                                                                                                                                               | Type                                       | Default |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| label          | label text                                                                                                                                                | `string` / `React.ReactElement`            | ''      |
| span           | colspan of column                                                                                                                                          | `number`                                   | 1       |
| width          | column width, the width of the same column in different rows is set by the max value (If no `border`, width contains label and content)                   | `string` / `number`                        | ''      |
| minWidth       | column minimum width, columns with `width` has a fixed width, while columns with `minWidth` has a width that is distributed in proportion (If no `border`, width contains label and content) | `string` / `number`                        | ''      |
| align          | column content alignment (If no `border`, effective for both label and content)                                                                           | <Enum>'left' \| 'center' \| 'right'</Enum> | left    |
| labelAlign     | column label alignment, if omitted, the value of `align` will be applied (If no `border`, please use `align` attribute)                                  | <Enum>'left' \| 'center' \| 'right'</Enum> | ''      |
| labelClassName | custom class name for label                                                                                                                               | `string`                                   | ''      |
| className      | custom class name for content                                                                                                                             | `string`                                   | ''      |

<!-- The following properties were not found in the current type definitions -->
<!--

-->

<!--
| rowspan        | the number of rows a cell should span                                                                                                                               | `number`                                   | 1    |
| labelWidth     | column label width, if not set, it will be the same as the width of the column. Higher priority than the `labelWidth` of `Descriptions`                                                                  | `string` / `number`                        | ''   | -->