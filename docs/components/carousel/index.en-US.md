---
title: Carousel
lang: en-US
---

<Meta></Meta>

# Carousel

Loop through images, text, and other content of the same type in a limited space.

## Basic Usage

Combine `ElCarousel` and `ElCarouselItem` tags to create a carousel. The content of each page is fully customizable — place the content you want to display inside the `ElCarouselItem` tag. By default, switching is triggered when the mouse hovers over the bottom indicators. Set the `trigger` attribute to `click` to trigger switching on click instead.

<code src="./basic.tsx"></code>

## Motion Blur

Add motion blur to infuse dynamism and smoothness into the carousel.

Enabling motion blur enhances the dynamism and smoothness of the carousel. The default value of `motionBlur` is `false`. Manually activating this feature provides a visual enhancement.

<code src="./motion-blur.tsx"></code>

## Indicators

The indicator display position can be set outside the container.

The `indicatorPosition` attribute defines the position of indicators. By default, they are displayed inside the carousel; set to `outside` to display them outside; set to `none` to hide indicators entirely.

<code src="./indicator.tsx"></code>

## Arrows

You can set when the navigation arrows are displayed.

The `arrow` attribute defines when the navigation arrows are displayed. By default, arrows only appear when the mouse hovers over the carousel. If `arrow` is set to `always`, they are always displayed; if set to `never`, they are always hidden.

<code src="./arrows.tsx"></code>

## Auto Height

When the `height` of the carousel is set to `auto`, the carousel height is automatically set based on the height of its child content.

<code src="./auto-height.tsx"></code>

## Card Mode

When there is ample horizontal space but limited vertical space, card mode can be used.

Set the `type` attribute to `card` to enable card mode. In terms of interaction, the biggest difference between card mode and normal mode is that card mode allows switching by directly clicking on the slides on both sides.

<code src="./card.tsx"></code>

## Vertical Layout

By default, the `direction` is `horizontal`. Set `direction` to `vertical` to display the carousel vertically.

<code src="./vertical.tsx"></code>

## Carousel API

### Carousel Properties

| Name               | Description                                                  | Type                                        | Default    |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------- | ---------- |
| height             | Height of the carousel                                       | `string`                                    | ''         |
| initialIndex       | Index of the initially active slide (starting from 0)        | `number`                                    | 0          |
| trigger            | Trigger mode for indicators                                 | <Enum>'hover' \| 'click'</Enum>             | hover      |
| autoplay           | Whether to automatically switch                              | `boolean`                                   | true       |
| interval           | Interval for automatic switching, in milliseconds            | `number`                                    | 3000       |
| indicatorPosition  | Position of indicators                                       | <Enum>'' \| 'none' \| 'outside'</Enum>      | ''         |
| arrow              | When navigation arrows are displayed                         | <Enum>'always' \| 'hover' \| 'never'</Enum> | hover      |
| type               | Type of carousel                                             | <Enum>'' \| 'card'</Enum>                   | ''         |
| cardScale          | Scaled size of the secondary card when type is card          | `number`                                    | 0.83       |
| loop               | Whether to loop display                                      | `boolean`                                   | true       |
| direction          | Display direction                                            | <Enum>'horizontal' \| 'vertical'</Enum>     | horizontal |
| pauseOnHover       | Pause automatic switching when mouse hovers                 | `boolean`                                   | true       |
| motionBlur         | Add motion blur to infuse dynamism and smoothness            | `boolean`                                   | false      |

### Carousel Events

| Name     | Description                                                                                                                           | Type                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| onChange | Triggered when the currently displayed slide switches, with two parameters: the index of the new slide and the index of the old slide   | <Enum type="Function">(current: number, prev: number) => boolean </Enum> |

### Carousel Ref

| Name          | Description                                                                                                                          | Type                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| activeIndex   | Index of the current slide                                                                                                           | `number`                                                        |
| setActiveItem | Manually switch slides, pass the index of the target slide (starting from 0); or the `name` attribute value of the corresponding `ElCarouselItem` | <Enum type="Function">(index: string \| number) => void </Enum> |
| prev          | Switch to the previous slide                                                                                                         | <Enum type="Function">() => void</Enum>                         |
| next          | Switch to the next slide                                                                                                             | <Enum type="Function">() => void</Enum>                         |

## CarouselItem API

### CarouselItem Properties

| Name  | Description                                                             | Type                | Default |
| ----- | ----------------------------------------------------------------------- | ------------------- | ------- |
| name  | Name of the slide, can be used as a parameter for `setActiveItem`       | `string`            | ''      |
| label | Text of the indicator corresponding to this slide                       | `string` / `number` | ''      |