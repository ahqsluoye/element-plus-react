---
title: Scrollbar
lang: en-US
---

<Meta></Meta>

# Scrollbar

Used to replace the browser's native scrollbar.

## Basic Usage

Use the `height` attribute to set the height of the scrollbar. If not set, it adapts to the height of the parent container.

<code src="./basic-usage.tsx"></code>

## Horizontal Scroll

When the element width is greater than the scrollbar width, a horizontal scrollbar is displayed.

<code src="./horizontal-scroll.tsx"></code>

## Max Height

The scrollbar is displayed only when the element height exceeds the max height.

<code src="./max-height.tsx"></code>

<!-- ## Manual Scroll

Use `setScrollTop` and `setScrollLeft` methods to manually control the scrolling of the scrollbar.

scrollbar/manual-scroll -->

## API

### Properties

| Name           | Description                                                                 | Type                                                 | Default |
| -------------- | --------------------------------------------------------------------------- | ---------------------------------------------------- | ------- |
| height         | Height of scrollbar                                                         | `string` / `number`                                  | —       |
| maxHeight      | Max height of scrollbar                                                     | `string` / `number`                                  | —       |
| native         | Whether to use native scrollbar style                                       | `boolean`                                            | false   |
| wrapStyle      | Custom style for the wrap container                                         | `string` / <Enum type='object'>CSSProperties</Enum>  | —       |
| wrapClass      | Custom class name for the wrap container                                    | `string`                                             | —       |
| viewStyle      | Custom style for the view                                                   | `string` / <Enum type='object'>CSSProperties</Enum>  | —       |
| viewClass      | Custom class name for the view                                             | `string`                                             | —       |
| noresize       | Do not respond to container size changes. If the container size does not change, it is recommended to set it for performance optimization | `boolean`                                            | false   |
| tag            | Element tag of the view                                                     | `string`                                             | div     |
| always         | Always show scrollbar                                                       | `boolean`                                            | false   |
| minSize        | Minimum size of scrollbar                                                   | `number`                                             | 20      |
| showHorizontal | Whether to show horizontal scrollbar                                        | `boolean`                                            | —       |
| showVertical   | Whether to show vertical scrollbar                                          | `boolean`                                            | —       |

### Events

| Name    | Description                                           | Type                                                                                                                              |
| ------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| onScroll | Triggered when a scroll event occurs, returns the scroll distance | <Enum type="Function">(data: { e: React.UIEvent<HTMLDivElement, UIEvent>; scrollTop: number; scrollLeft: number }) => void</Enum> |

### Ref

| Name          | Description                   | Type                                                                                         |
| ------------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| scrollTo      | Scroll to a specific coordinate | <Enum type="Function">(options: ScrollToOptions \| number, yCoord?: number) => void </Enum> |
| setScrollTop  | Set the distance from the top of the scrollbar | <Enum type="Function">(scrollTop: number) => void</Enum>                                    |
| setScrollLeft | Set the distance from the left of the scrollbar | <Enum type="Function">(scrollLeft: number) => void </Enum>                                  |
| update        | Manually update the scrollbar status | <Enum type="Function">() => void </Enum>                                                    |
| wrapRef       | Ref object of the scrollbar wrap | <Enum type="Object">Ref\<HTMLDivElement\></Enum>                                             |
| resizeRef     | Ref object of the view        | <Enum type="Object">Ref\<any\></Enum>                                                        |

<!--          | handleScroll           | Trigger scroll event                                                                                 | <Enum  type="Function">() => void </Enum> -->