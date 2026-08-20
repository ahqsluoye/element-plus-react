---
title: Badge
lang: en-US
---

<Meta></Meta>

# Badge

A number or status mark on buttons and icons.

## Basic Usage

Displays the amount of new messages.

The value can be a Number or String.

<code src="./basic.tsx"></code>

## Max Value

You can also customize the max value.

The max value is defined by the `max` property, which accepts a Number. Note that it only works when the value is also a Number.

<code src="./max.tsx"></code>

## Custom Display Content

You can also display any value you want other than numbers. Or you can use the `content` prop to customize the content.

When the value is a String, you can display customized text. Or use the `content` slot.

<code src="./customize.tsx"></code>

## Red Dot

Use a red dot to mark content that needs to be noticed by users.

Use the `isDot` attribute. It is a Boolean value.

<code src="./dot.tsx"></code>

## Offset

Set the offset of the badge dot, the format is [left, top], which represents the offset of the status dot from the left and top of the default position.

<code src="./offset.tsx"></code>

## API

### Properties

| Name       | Description                                                                   | Type                                                                               | Default |
| ---------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| value      | display value.                                                                | `string` / `number`                                                                | ''      |
| max        | maximum value, shows `{max}+` when exceeded. Only works if value is a number. | `number`                                                                           | 99      |
| isDot      | whether a little dot is displayed.                                            | `boolean`                                                                          | false   |
| hidden     | whether to hide the badge.                                                    | `boolean`                                                                          | false   |
| type       | badge type.                                                                   | <Enum type="enum">'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> | danger  |
| showZero   | whether to show badge when value is zero.                                     | `boolean`                                                                          | true    |
| color      | background color of the dot                                                   | `string`                                                                           | —       |
| offset     | offset of badge                                                               | `[number, number]`                                                                 | —       |
| badgeStyle | custom style of badge                                                         | `CSSProperties`                                                                    | —       |
| badgeClass | custom class name of badge                                                    | `string`                                                                           | —       |
