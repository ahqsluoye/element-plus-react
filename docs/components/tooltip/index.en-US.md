---
title: Tooltip
lang: en-US
---

<Meta></Meta>

# Tooltip

Display prompt information for mouse hover.

## Basic Usage

Here we provide 9 different placement options. You can refer to the complete example below to understand and choose the effect you want.

Use the `content` property to determine the tooltip content on `hover`. The `placement` property determines the display effect: the `placement` property value is `[direction]-[alignment]`; four directions: `top`, `left`, `right`, `bottom`; three alignment positions: `start`, `end`, default is empty. For example, `placement="left-end"` means the tooltip appears on the left side of the target element, and the bottom of the tooltip aligns with the bottom of the target element.

<code src="./basic.tsx"></code>

## Theme

The Tooltip component has two built-in themes: `dark` and `light`.

:::info{title=TIP}

To use a custom theme, you must know where your tooltip is rendered. If your tooltip is rendered as a root element, you will need to set CSS rules globally.

When using a custom theme and displaying an arrow at the same time, it is recommended not to use a linear gradient background color. Because the popup arrow and content are two different elements, the popup arrow's style needs to be set separately, and when using a gradient background color, it may look odd.

:::

Modify the theme by setting `effect`, the default value is `dark`.

<code src="./theme.tsx"></code>

## More Content

Display multiple lines of text or set the format of text content.

<code src="./rich-content.tsx"></code>

## Virtual Trigger

Sometimes we want to place the tooltip's trigger element elsewhere without writing it together, then you can use virtual triggering.

:::info{title=TIP}

Note that the virtual triggering tooltip is a controlled component, so you must control whether the tooltip is displayed or not. **You will not** be able to close the tooltip by clicking on a blank area.

:::

<code src="./virtual-trigger.tsx"></code>

## Singleton

Tooltip can work as a singleton, which means you can have multiple trigger elements triggering the same tooltip at the same time. This feature is built on top of `virtual triggering`.

:::info{title=TIP}

Known issue: when using singleton mode, the tooltip may bounce when the trigger element changes.

:::

<code src="./singleton.tsx"></code>

## Controlled Mode

Tooltip can be controlled to show and hide by the parent component using `visible`.

<code src="./controlled.tsx"></code>

## API

### Properties

| Name              | Description                                                           | Type                                                                                                                                                                            | Default |
| ----------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| appendTo          | Which HTML element the tooltip content is appended to                  | `HTMLElement`                                                                                                                                                                   | —       |
| effect            | Tooltip theme, built-in: `dark` / `light`                             | <Enum>'dark' \| 'light' \| string</Enum>                                                                                                                                        | dark    |
| content           | Display content                                                        | `string \| React.ReactNode`                                                                                                                                                     | ''      |
| placement         | Position of the Tooltip component                                      | <Enum>'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | bottom  |
| visible           | Visibility of the Tooltip component                                    | `boolean`                                                                                                                                                                       | —       |
| defaultVisible    | Initial visibility state                                                | `boolean`                                                                                                                                                                       | —       |
| disabled          | Whether the Tooltip component is disabled                               | `boolean`                                                                                                                                                                       | —       |
| offset            | Offset of the position                                                 | `number`                                                                                                                                                                        | 12      |
| virtualTriggering | Identify whether virtual triggering is enabled                         | `boolean`                                                                                                                                                                       | —       |
| virtualRef        | Identify the trigger element when virtual triggering                    | <Enum type="object">VirtualElement</Enum>                                                                                                                                       | —       |
| contentSlot       | Content slot                                                           | <Enum type="Function">() => React.ReactNode</Enum>                                                                                                                              | —       |
| disableTransition | Whether to disable transition animation                               | `boolean`                                                                                                                                                                       | —       |
| showAfter         | How long to show content after triggering, in milliseconds             | `number`                                                                                                                                                                        | 0       |
| hideAfter         | Delay before hiding, in milliseconds                                   | `number`                                                                                                                                                                        | 200     |
| enterable         | Whether the mouse can enter the tooltip                                | `boolean`                                                                                                                                                                       | true    |
| trigger           | How to trigger the Tooltip                                             | <Enum>'hover' \| 'click' \| 'contextmenu'</Enum>                                                                                                                                | hover   |
| onMouseEnter      | Triggers when mouse enters                                             | <Enum type="Function">(e?: React.MouseEvent<any>) => void</Enum>                                                                                                                | —       |
| onMouseLeave      | Triggers when mouse leaves                                             | <Enum type="Function">(e?: React.MouseEvent<any>) => void</Enum>                                                                                                                | —       |
| triggerRef        | Trigger element reference                                              | `React.ReactElement`                                                                                                                                                            | —       |
| showArrow         | Whether the tooltip content has an arrow                               | `boolean`                                                                                                                                                                       | true    |
| persistent        | When tooltip is inactive and persistent is false, the tooltip will be destroyed | `boolean`                                                                                                                                                                       | true    |
| popperClass       | Custom class name for Tooltip's popper                                 | `string`                                                                                                                                                                        | —       |
| popperStyle       | Custom style for Tooltip's popper                                      | `object`                                                                                                                                                                        | —       |

### Ref

| Name         | Description                                                    | Type                                                    |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------- |
| popperRef    | el-popper component instance                                   | <Enum type='object'>Ref<PopperOptionRef \| null></Enum> |
| updatePopper | Update el-popper component instance                            | <Enum type='Function'>() => void</Enum>                 |
| onOpen       | onOpen method controls el-tooltip display state                | <Enum type='Function'>() => void</Enum>                 |
| onClose      | onClose method controls el-tooltip display state               | <Enum type='Function'>() => void</Enum>                 |
| hide         | Provides hide method                                          | <Enum type='Function'>() => void</Enum>                 |