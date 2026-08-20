---
title: Popconfirm
lang: en-US
---

<Meta></Meta>

# Popconfirm

A simple confirmation dialog of an element click action.

## Basic Usage

Popconfirm is similar to Popover. So for some duplicated attributes, please refer to the documentation of Popover.

Only `title` attribute is available in Popconfirm, the `content` attribute will be ignored.

<code src="./basic-usage.tsx"></code>

## Customize Content

You can customize the content of Popconfirm.

<code src="./customize.tsx"></code>

## API

### Properties

| Name              | Description                                                        | Type                                                                             | Default        |
| ----------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------- | -------------- |
| title             | Title                                                              | `string`                                                                         | —              |
| confirmButtonText | Confirm button text                                                | `string`                                                                         | —              |
| cancelButtonText  | Cancel button text                                                 | `string`                                                                         | —              |
| confirmButtonType | Confirm button type                                                | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'</Enum> | primary        |
| cancelButtonType  | Cancel button type                                                 | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'</Enum> | text           |
| icon              | Custom icon                                                        | `string` / `Component`                                                           | QuestionFilled |
| iconColor         | Icon color                                                         | `string`                                                                         | #f90           |
| hideIcon          | Whether to hide the icon                                           | `boolean`                                                                        | false          |
| width             | Popconfirm width, minimum width 150px                               | `string` / `number`                                                              | 150            |
| persistent        | When the dropdown is inactive and `persistent` is `false`, the dropdown will be destroyed | `boolean`                                                                        | true           |

### Events

| Name      | Description                        | Type                                    |
| --------- | ---------------------------------- | --------------------------------------- |
| onConfirm | Triggered when the confirm button is clicked | <Enum type="Function">() => void</Enum> |
| onCancel  | Triggered when the cancel button is clicked | <Enum type="Function">() => void</Enum> |