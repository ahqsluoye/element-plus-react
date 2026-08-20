---
title: Anchor
lang: en-US
---

<Meta></Meta>

# Anchor

Through the anchor point, you can quickly find the position of the information content on the current page.

## Basic Usage

The most basic usage.

<code src="./basic.en-US.tsx"></code>

## Horizontal Mode

Horizontally aligned anchors

> **Tip**: Horizontal mode does not support `children`.

<code src="./horizontal.en-US.tsx"></code>

## Scroll Container

Custom scroll area, use `offset` prop to set anchor scroll offset. Listen to the `onClick` event and prevent the browser's default behavior so it will not change history.

<code src="./scroll.tsx"></code>

## Anchor Link Change

Listening for anchor link change.

<code src="./change.en-US.tsx"></code>

## Underline Type

Set `type="underline"` to change to underline type.

<code src="./underline.en-US.tsx"></code>

## Affix Mode

Use the Affix component to fix the anchor point within the page.

<code src="./affix.en-US.tsx"></code>

## Anchor API

### Anchor Properties

| Name            | Description                                                | Type                                                | Default    |
| --------------- | ---------------------------------------------------------- | --------------------------------------------------- | ---------- |
| container       | scroll container.                                          | `string` \| `RefObject<HTMLElement>` \| `Window`    | —          |
| offset          | set the offset of the anchor scroll.                       | `number`                                            | 0          |
| bound           | the offset of the element starting to trigger the anchor.  | `number`                                            | 15         |
| duration        | set the scroll duration of the container, in milliseconds. | `number`                                            | 300        |
| marker          | whether to show the marker.                                | `boolean`                                           | true       |
| type            | set Anchor type.                                           | <Enum type="enum">'default' \| 'underline'</Enum>   | `default`  |
| direction       | set Anchor direction.                                      | <Enum type="enum">'vertical' \| 'horizontal'</Enum> | `vertical` |
| selectScrollTop | whether the link is selected at the top when scrolling     | `boolean`                                           | false      |

### Anchor Events

| Name     | Description                                | Type                                                                |
| -------- | ------------------------------------------ | ------------------------------------------------------------------- |
| onChange | triggered when the anchor link changes     | <Enum type="Function">(href: string) => void</Enum>                 |
| onClick  | triggered when the user clicks on the link | <Enum type="Function">(e: MouseEvent, href?: string) => void</Enum> |

### AnchorRef

| Name     | Description                               | Type                                                |
| -------- | ----------------------------------------- | --------------------------------------------------- |
| scrollTo | manually scroll to the specific position. | <Enum type="Function">(href: string) => void</Enum> |

### AnchorLink Properties

| Name  | Description                   | Type                          | Default |
| ----- | ----------------------------- | ----------------------------- | ------- |
| title | the text content of the link. | `string` \| `React.ReactNode` | —       |
| href  | the address of the link.      | `string`                      | —       |
