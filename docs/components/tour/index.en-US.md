---
title: Tour
lang: en-US
---

<Meta></Meta>

# Tour

A popup component for guiding users through a product. Use when you want to guide users and introduce the product.

## Basic Usage

The most basic usage.

<code src="./basic.tsx"></code>

## Non-modal

Use `mask="false"` to make the guide non-modal. At the same time, to emphasize the guide itself, it is recommended to use with `type="primary"`.

<code src="./non-modal.tsx"></code>

## Placement

Change the placement of the guide relative to the target. There are 12 placements available. When `target` is empty, the guide will show in the center.

<code src="./placement.tsx"></code>

## Custom Mask Style

Custom mask style.

<code src="./mask.tsx"></code>

## Custom Indicator

Custom indicator.

<code src="./indicator.tsx"></code>

## Target

Various parameter passing types of target. Supports string and function types.

<code src="./target.tsx"></code>

## Tour API

:::info{title=TIP}

The configuration with the same name on the tour-step component has higher priority.

:::

### Tour Properties

| Name                  | Description                                                      | Type                                                                                                                                                                                  | Default                                           |
| --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| appendTo              | Which DOM element to mount to                                    | `CSSSelector` / `HTMLElement`                                                                                                                                                         | `body`                                            |
| showArrow             | Whether to show the arrow                                        | `boolean`                                                                                                                                                                             | true                                              |
| placement             | Position of the guide card relative to the target element        | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | `bottom`                                          |
| contentStyle          | Custom style for content                                         | `CSSProperties`                                                                                                                                                                       | —                                                 |
| mask                  | Whether to enable masking, change mask style and fill color by pass custom props | `boolean` \| <Enum type="object">{ style?: CSSProperties; color?: string; }</Enum>                                                                                                          | `true`                                            |
| gap                   | Transparent gap between mask and target                          | `TourGap`                                                                                                                                                                             | <Enum type="object">{ offset: 6, radius: 2 }</Enum> |
| type                  | Type, affects the background color and text color                | `default` \| `primary`                                                                                                                                                                | `default`                                         |
| visible               | Control the show/hide of the guide (controlled mode)             | `boolean`                                                                                                                                                                             | `false`                                           |
| defaultVisible        | Default visible state (uncontrolled mode)                        | `boolean`                                                                                                                                                                             | `false`                                           |
| current               | Current step index (controlled mode)                             | `number`                                                                                                                                                                              | `0`                                               |
| defaultCurrent        | Default current step index (uncontrolled mode)                   | `number`                                                                                                                                                                              | `0`                                               |
| scrollIntoViewOptions | Whether to support scrolling the current element into view, or pass configuration to specify scroll view related parameters | `boolean` \| `ScrollIntoViewOptions`                                                                                                                                                  | <Enum type="object">{ block: 'center' }</Enum>     |
| zIndex                | Tour's z-index                                                   | `number`                                                                                                                                                                              | `2001`                                            |
| showClose             | Whether to show a close button                                   | `boolean`                                                                                                                                                                             | `true`                                            |
| closeIcon             | Custom close icon, default is Close                              | `string`                                                                                                                                                                              | `Component`                                       |
| closeOnPressEscape    | Whether the guide can be closed by pressing ESC                  | `boolean`                                                                                                                                                                             | `true`                                            |
| targetAreaClickable   | Whether the target element area is clickable when the mask is enabled | `boolean`                                                                                                                                                                             | `true`                                            |
| indicators            | Custom indicator                                                 | <Enum type="object">{ current: number, total: number }</Enum>                                                                                                                         | —                                                 |

### Tour Events

| Name     | Description                     | Type                                                                     |
| -------- | ------------------------------- | ------------------------------------------------------------------------ |
| onClose  | Callback function when guide is closed | <Enum type="Function">(current: number) => void</Enum>                   |
| onFinish | Callback function when guide is finished | <Enum type="Function">() => void</Enum>                                  |
| onChange | Callback when step changes     | <Enum type="Function">(current: number, visible: boolean) => void</Enum> |

## TourStep API

### TourStep Properties

| Name                  | Description                                                                                                            | Type                                                                                                                                                                                         | Default   |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| target                | Get the element the guide card points to. Empty makes it show in center of screen. Supports string and Function types. String type is the selector of document.querySelector. | `HTMLElement` \| `string` \ <Enum type="Function">() => HTMLElement</Enum>                                                                                                                   | —         |
| showArrow             | Whether to show the arrow                                                                                              | `boolean`                                                                                                                                                                                    | —         |
| title                 | Title                                                                                                                  | `string`                                                                                                                                                                                     | —         |
| description           | Description                                                                                                            | `string`                                                                                                                                                                                     | —         |
| placement             | Position of the guide card relative to the target element                                                              | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | `bottom`  |
| contentStyle          | Custom style for content                                                                                               | `CSSProperties`                                                                                                                                                                              | —         |
| mask                  | Whether to enable masking, change mask style and fill color by pass custom props                                       | `boolean` \| <Enum type="object">{ style?: CSSProperties; color?: string; }</Enum>                                                                                                           | —         |
| type                  | Type, affects the background color and text color                                                                      | `default` \| `primary`                                                                                                                                                                       | `default` |
| nextButtonProps       | Properties of the "Next" button                                                                                         | <Enum type="object">{ children: ReactNode \| string; onClick: Function }</Enum>                                                                                                                | —         |
| prevButtonProps       | Properties of the "Previous" button                                                                                     | <Enum type="object">{ children: ReactNode \| string; onClick: Function }</Enum>                                                                                                                | —         |
| scrollIntoViewOptions | Whether to support scrolling the current element into view, or pass configuration to specify scroll view related parameters. Default follows the `scrollIntoViewOptions` property of Tour | `boolean` \| `ScrollIntoViewOptions`                                                                                                                                                         | —         |
| showClose             | Whether to show a close button                                                                                          | `boolean`                                                                                                                                                                                    | —         |
| closeIcon             | Custom close icon, default is Close                                                                                    | `string` \| `Component`                                                                                                                                                                      | —         |
| header                | Custom header content                                                                                                  | `ReactNode`                                                                                                                                                                                  | —         |

### TourStep Events

| Name    | Description                     | Parameters                              |
| ------- | ------------------------------- | --------------------------------------- |
| onClose | Callback function when guide is closed | <Enum type="Function">() => void</Enum> |