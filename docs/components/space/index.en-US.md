---
title: Space
lang: en-US
---

<Meta></Meta>

# Space

Although we have the [Divider](/en-US/component/divider) component, there are many times when we need a page structure that is not separated by the [Divider](/en-US/component/divider) component. So we would repeatedly use many [Divider](/en-US/component/divider) components, which causes some trouble in our development efficiency. **Space** was created to solve this problem.

## Basic Usage

The most basic usage is to provide unified spacing between components through this component.

Use Space to provide spacing between multiple components.

<code src="./basic.tsx"></code>

## Vertical Layout

Use `direction` to control the layout direction, which is essentially controlled by `flexDirection` internally.

We also provide a vertical layout.

<code src="./vertical-layout.tsx"></code>

## Control the Size of the Space

Control the space size by adjusting the `size` value.

Use the built-in `small`, `default`, `large` to set the spacing size, corresponding to `8px`, `12px`, and `16px` respectively. The default spacing size is `small`, which is `8px`.

You can also control the size through a custom size. See the next section.

<code src="./control-size.tsx"></code>

## Customized Size

Sometimes the built-in sizes don't meet the designer's requirements. We can set the size by passing a custom size (numeric type).

<code src="./customized-size.tsx"></code>

:::info{title=TIP}
Do not use `ElSpace` with components that depend on the parent element's percentage width (or height), such as `ElSlider`, as this will cause the cursor to be out of sync.
:::

## Auto Wrapping

In **horizontal** mode, use `wrap` (**boolean type**) to control the auto-wrapping behavior.

Use the `wrap` attribute to control line wrapping.

<code src="./auto-wrapping.tsx"></code>

## Spacer

Sometimes just adding blank space between rows doesn't meet our daily needs. At this point, the spacer can play a very good role.

## Literal Type Spacer

<code src="./literal-type-spacer.tsx"></code>

## Spacer Can Also Be ReactNode Type

<code src="./vnode-type-spacer.tsx"></code>

## Alignment

Set this attribute to adjust the alignment of all child nodes in the container. The available values are the same as [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).

Use the `alignment` attribute to align items.

<code src="./alignment.tsx"></code>

## Fill the Container

Through the `fill` **(boolean type)** parameter, you can control whether child nodes automatically fill the container.

In the example below, when `fill` is set, the width of child nodes will automatically adapt to the container width.

Use the `fill` attribute to make child nodes automatically fill the container.

<code src="./fill.tsx"></code>

You can also use the `fillRatio` parameter to customize the fill ratio. The default value is `100`, representing `100%` fill based on the parent container width.

Note that the visual representation of horizontal and vertical layouts is slightly different. See the examples below for the specific effect.

Use `fillRatio` to customize the fill ratio.

<code src="./fill-ratio.tsx"></code>

## API

### Space Properties

| Name      | Description                                                                                                          | Type                                                                                                                                                                            | Default    |
| --------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| alignment | Alignment method                                                                                                     | <Enum type="enum">'center' \| 'normal' \| 'stretch' \| ...</Enum> [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)                                   | center     |
| justify   | Justification method                                                                                                 | <Enum type="enum">'center' \| 'start' \| 'space-between' \| ...</Enum> [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/justify-content) | -          |
| direction | Arrangement direction                                                                                                | <Enum type="enum">'vertical' \| 'horizontal'</Enum>                                                                                                                             | horizontal |
| spacer    | Spacer                                                                                                               | `string` / `number` / `React.ReactNode`                                                                                                                                                   | —          |
| size      | Spacing size                                                                                                         | <Enum type="enum">'small' \| 'medium' \| 'large'`/`number`/`array``[number, number]</Enum>                                                                                     | small      |
| wrap      | Set whether to auto-wrap                                                                                             | `boolean`                                                                                                                                                                       | false      |
| fill      | Whether child elements fill the parent container                                                                     | `boolean`                                                                                                                                                                       | false      |
| fillRatio | Ratio to fill the parent container                                                                                    | `number`                                                                                                                                                                        | 100        |
| prefixCls | Class name prefix for space-items                                                                                    | `string`                                                                                                                                                                        | —          |