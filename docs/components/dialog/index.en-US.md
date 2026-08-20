---
title: Dialog
lang: en-US
---

<Meta></Meta>

# Dialog

Informs users while preserving the current page state.

## Basic Usage

Dialog pops up a dialog box, and it's quite customizable.

Set the `visible` attribute with a `Boolean`, and Dialog shows when it is `true`. The Dialog has three parts: `header`, `body` and `footer`, and the `header` is for defining a title. Finally, this example demonstrates how `beforeClose` is used.

<code src="./basic-usage.tsx"></code>

:::info{title=TIP}

`beforeClose` only works when user clicks the close icon or the backdrop. If you have buttons that close the Dialog in the `footer`, you can add what you would do with `beforeClose` in the buttons' click event handler.
:::

## Customized Content

The content of Dialog can be anything, even a table or a form. This example shows how to use Element Plus React Table and Form with Dialog.

<code src="./customization-content.tsx"></code>

## Customized Header

`header` can be used to customize the area where the title is displayed.

<code src="./customization-header.tsx"></code>

## Nested Dialog

<code src="./nested-dialog.tsx"></code>

## Centered Content

Dialog's content can be centered.

Setting `center` to `true` will center dialog's header and footer horizontally. `center` only affects Dialog's header and footer. The body of Dialog can be anything, so sometimes it may not look good when centered. You need to write some CSS if you wish to center the body as well.

<code src="./centered-content.tsx"></code>

:::info{title=TIP}
The content of Dialog is lazily rendered — it is not rendered to the DOM until it is opened. Therefore, if you need to perform DOM manipulation or access a component using `ref`, do it in the `onOpen`, `onEnter` or `afterEnter` event callbacks.
:::

## Align Center Dialog

Open dialog from the center of the screen.

Set `alignCenter` to `true` to center the dialog both horizontally and vertically. The `top` attribute will not work at the same time because the dialog is vertically centered in a flexbox.

<code src="./align-center.tsx"></code>

## Draggable Dialog

Try to drag the `header` part.

Set `draggable` to `true` to enable dragging. Set `overflow` to `true` to allow dragging beyond the viewport.

<code src="./draggable-dialog.tsx"></code>

## Fullscreen

Set the `fullscreen` attribute to open fullscreen dialog.

<code src="./fullscreen-dialog.tsx"></code>

## Custom Animation

Customize dialog animation through the `transition` attribute, which accepts either of the following values:

- Animation name (string)

- Transition configuration (object)

Examples include scale, slide, fade, bounce animations and object-based configurations with custom event handlers.

<code src="./custom-animation.tsx"></code>

## API

### Dialog Properties

| Name              | Description                                                                                            | Type                                                | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ------- |
| visible           | whether the Dialog is displayed (controlled **required**)                                              | `boolean`                                           | —       |
| onCloseDialog     | function to close Dialog, used with `visible` attribute, sets `visible` to `false` after closing.      | <Enum type="Function">() => void</Enum>             | —       |
| title             | title of Dialog                                                                                         | `string` / `Component`                              | ''      |
| width             | width of Dialog, default is 50%                                                                         | `string` / `number`                                 | ''      |
| fullscreen        | whether the Dialog takes up full screen                                                                 | `boolean`                                           | false   |
| top               | value for `margin-top` of Dialog CSS, default is 15vh                                                    | `string`                                            | ''      |
| modal             | whether a mask is displayed                                                                             | `boolean`                                           | true    |
| modalPenetrable   | whether the mask is penetrable. The modal attribute must be `false`                                      | `boolean`                                           | —       |
| modalClass        | custom class names for mask                                                                             | `string`                                            | —       |
| headerClass       | custom class names for header wrapper                                                                   | `string`                                            | —       |
| bodyClass         | custom class names for body wrapper                                                                     | `string`                                            | —       |
| footerClass       | custom class names for footer wrapper                                                                   | `string`                                            | —       |
| lockScroll        | whether scroll of body is disabled while Dialog is displayed                                             | `boolean`                                           | true    |
| openDelay         | the time (milliseconds) before open                                                                      | `number`                                            | —       |
| closeDelay        | the time (milliseconds) before close                                                                     | `number`                                            | —       |
| closeOnClickModal | whether the Dialog can be closed by clicking the mask                                                    | `boolean`                                           | true    |
| showClose         | whether to show a close button                                                                          | `boolean`                                           | true    |
| beforeClose       | callback before Dialog closes, it will prevent Dialog from closing; use `done` to close the dialog      | <Enum type="Function">(done: DoneFn) => void</Enum> | —       |
| draggable         | enable dragging feature for Dialog                                                                       | `boolean`                                           | false   |
| overflow          | draggable Dialog can overflow the viewport                                                              | `boolean`                                           | —       |
| center            | whether to align the header and footer in center                                                        | `boolean`                                           | false   |
| alignCenter       | whether to align the dialog both horizontally and vertically                                            | `boolean`                                           | false   |
| zIndex            | same as z-index in native CSS, z-order of dialog                                                        | `number`                                            | —       |
| className         | custom class names for Dialog                                                                           | `string`                                            | —       |
| footer            | footer content of Dialog                                                                                | `ReactNode`                                         | —       |
| border            | whether the title has a border                                                                          | `boolean`                                           | —       |
| transitionConfig  | custom transition configuration for dialog animation                                                    | `string \| TransitionProps`                         | —       |
| destroyOnClose    | whether to destroy child elements after closing the Dialog                                              | `boolean`                                           | true    |

<!-- The following properties were not found in the current type definitions -->
<!-- | defaultVisible    | whether the Dialog is displayed by default                                                               | `boolean`                                           | —     | -->
<!-- | unmountOnExit     | whether to destroy elements in Dialog when closed                                                       | `boolean`                                           | false | -->

### Dialog Events

| Name     | Description                        | Type                                    |
| -------- | ---------------------------------- | --------------------------------------- |
| onOpen   | triggers when the Dialog opens     | <Enum type="Function">() => void</Enum> |
| onOpened | triggers when the Dialog opening animation ends | <Enum type="Function">() => void</Enum> |
| onClose  | triggers when the Dialog closes    | <Enum type="Function">() => void</Enum> |
| onClosed | triggers when the Dialog closing animation ends | <Enum type="Function">() => void</Enum> |