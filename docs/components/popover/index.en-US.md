---
title: Popover
lang: en-US
---

<Meta></Meta>

# Popover

## Placement

Popover provides 9 placements.

Use the `content` attribute to set the content displayed on hover. The `placement` attribute determines the position of the Popover. The value format is `[orientation]-[alignment]` with four orientations `top`, `left`, `right`, `bottom` and three alignments `start`, `end`, `null`, and the default alignment is null. Take `placement="left-end"` for example, the Popover will display on the left of the hovering element, and the bottom of the Popover aligns with the bottom of the element.

<code src="./placement.tsx"></code>

## Basic Usage

Similar to Tooltip, Popover is built based on `Popper`. So for duplicated attributes, please refer to the Tooltip documentation for details.

The `trigger` attribute is used to determine the trigger mode of the popover, supporting: `hover`, `click`, `focus`, or `contextmenu`. If you want to control it manually, you can set the `visible` attribute.

<code src="./basic-usage.tsx"></code>

<!-- ## Virtual Triggering

Like Tooltip, Popover can be triggered by virtual elements. This feature is useful when the triggering element and the content element are separated. Typically we use `#reference` to place the triggering element, and with the `triggeringElement` API, you can set your triggering element anywhere. Note that the triggering element should be an element that accepts `mouse` and `keyboard` events.

:::error

`vPopover` will be deprecated, please use `virtualRef` as an alternative.

:::

<code src="./virtual-triggering.tsx"></code>

## Rich Content

Other components can be nested in Popover. The following is an example of a nested table.

Use slots to replace the `content` attribute.

<code src="./nested-information.tsx"></code>

## Nested Operations

Of course, you can also nest operations, which is lighter than using a dialog.

<code src="./nested-operation.tsx"></code>

 -->

## API

### Properties

| Name           | Description                                                                                                           | Type                                                                                                                                                                            | Default   |
| -------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| trigger        | Trigger mode                                                                                                          | <Enum>'click' \| 'hover' \| 'contextmenu'</Enum>                                                                                                                                | hover     |
| title          | Title                                                                                                                 | `string`                                                                                                                                                                        | —         |
| effect         | Default theme                                                                                                         | <Enum>'dark' \| 'light'</Enum> / `string`                                                                                                                                       | light     |
| content        | Displayed content                                                                                                     | `string`                                                                                                                                                                        | ''        |
| width          | Width                                                                                                                 | `string` / `number`                                                                                                                                                             | 150       |
| placement      | Placement                                                                                                             | <Enum>'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | bottom    |
| disabled       | Whether Popover is disabled                                                                                            | `boolean`                                                                                                                                                                       | false     |
| visible        | Whether Popover is visible                                                                                            | `boolean` / `null`                                                                                                                                                              | null      |
| defaultVisible | Default value                                                                                                         | `boolean`                                                                                                                                                                       | —         |
| showAfter      | Delay before showing content after trigger, in milliseconds                                                            | `number`                                                                                                                                                                        | 0         |
| hideAfter      | Delay before hiding, in milliseconds                                                                                  | `number`                                                                                                                                                                        | 200       |
| plain          | Whether it is plain text                                                                                               | `boolean`                                                                                                                                                                       | —         |
| offset         | Offset of the popup. `Popover` is built on `Tooltip`, the offset of `Popover` is `undefined`, but the offset of `Tooltip` is 12 | `number`                                                                                                                                                                        | undefined |
| showArrow      | Whether to show the Tooltip arrow                                                                                      | `boolean`                                                                                                                                                                       | true      |
| persistent     | When the dropdown is inactive and `persistent` is `false`, the dropdown will be destroyed                                | `boolean`                                                                                                                                                                       | true      |
| popperClass    | Add class name to the popper                                                                                          | `string`                                                                                                                                                                        | —         |
| popperStyle    | Custom style for the popper                                                                                           | `string` / `object`                                                                                                                                                             | —         |

<!-- The following properties were not found in the current type definitions -->
<!-- | popperOptions  | Parameters for [popper.js](https://popper.js.org/docs/v2/)                                        | `object`                                                                                                                                                                        |           | -->

### Events

| Name        | Description                   | Parameters |
| ----------- | ----------------------------- | ---------- |
| beforeEnter | Triggered before the enter animation starts | —        |
| onEnter     | Triggered when the enter animation is playing | —        |
| afterEnter  | Triggered after the enter animation ends | —        |
| beforeLeave | Triggered before the leave animation starts | —        |
| onLeave     | Triggered when the leave animation is playing | —        |
| afterLeave  | Triggered after the leave animation ends | —        |