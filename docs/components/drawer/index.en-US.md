---
title: Drawer
lang: en-US
---

<Meta></Meta>

# Drawer

Sometimes, `Dialog` does not always satisfy our requirements. Let's say you have a massive form, or you need space to display something like `terms & conditions` — `Drawer` has almost identical API with `Dialog`, but introduces a different user experience.

## Basic Usage

Callout a temporary drawer, from multiple directions.

You must set `visible` for `Drawer` like `Dialog` does to control the visibility of `Drawer` itself. It accepts a `boolean` type. `Drawer` has three parts: `title`, `body` and `footer`. You can also set the title through the `title` attribute, which defaults to an empty string. The `body` part is the main area of `Drawer`, which contains user-defined content. The `footer` is used to display footer information. When opening, `Drawer` expands itself from **right to left** to **30%** of the browser width by default. You can change this default behavior by setting `direction` and `size` attributes. The following example demonstrates how to use the `beforeClose` API. For more details, refer to the API section at the bottom of the page.

<code src="./basic-usage.tsx"></code>

## No Title

When you no longer need a title, you can remove it from the drawer.

Set the `withHeader` attribute to **false** to control whether the title is displayed. If your application needs to be accessible, make sure to set the `title` attribute.

<code src="./no-title.tsx"></code>

## Customized Content

Like `Dialog`, `Drawer` can be used to display a multitude of diverse interactions.

<code src="./customization-content.tsx"></code>

<!-- ## Customized Header

`header` can be used to customize the area where the title is displayed. To maintain accessibility, use the `title` attribute in addition to using this slot, or use the `titleId` slot property to specify which element should be read out as the drawer title.

<code src="./customization-header.tsx"></code> -->

## Nested Drawer

You can also have multiple layers of `Drawer` just like `Dialog`.

<code src="./nested-drawer.tsx"></code>

:::info{title=TIP}

The content inside Drawer is lazily rendered — it is not rendered to the DOM until it is first opened. Therefore, if you need to perform DOM manipulation or access a component using `ref`, do it in the `open` event callback.

:::

## Drawer Properties

| Name              | Description                                                                                                                       | Type                                                | Default |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------- |
| visible           | whether the Drawer is displayed (controlled **required**)                                                                          | `boolean`                                           | false   |
| onCloseDrawer     | function to close Drawer, used with `visible` attribute, sets `visible` to `false` after closing.                                 | <Enum type="Function">() => void</Enum>             | —       |
| modal             | whether a mask is displayed                                                                                                       | `boolean`                                           | true    |
| modalPenetrable   | whether the mask is penetrable. The modal attribute must be `false`                                                                 | `boolean`                                           | —       |
| modalClass        | custom class names for mask                                                                                                       | `string`                                            | —       |
| headerClass       | custom class names for header wrapper                                                                                             | `string`                                            | —       |
| bodyClass         | custom class names for body wrapper                                                                                               | `string`                                            | —       |
| footerClass       | custom class names for footer wrapper                                                                                             | `string`                                            | —       |
| lockScroll        | whether scroll of body is disabled while Drawer is displayed                                                                       | `boolean`                                           | true    |
| openDelay         | the time (milliseconds) before open                                                                                                | `number`                                            | —       |
| closeDelay        | the time (milliseconds) before close                                                                                               | `number`                                            | —       |
| closeOnClickModal | whether the Drawer can be closed by clicking the mask                                                                              | `boolean`                                           | true    |
| showClose         | whether to show a close button                                                                                                    | `boolean`                                           | true    |
| beforeClose       | callback before Drawer closes, it will prevent Drawer from closing                                                                 | <Enum type="Function">(done: DoneFn) => void</Enum> | —       |
| title             | title of Drawer                                                                                                                    | `string` \| `ReactElement`                          | —       |
| footer            | footer content of Drawer                                                                                                           | `ReactNode`                                         | —       |
| withHeader        | controls whether the header section is displayed, defaults to true; when set to false, the `title` attribute does not work          | `boolean`                                           | true    |
| border            | whether the title has a border                                                                                                    | `boolean`                                           | true    |
| size              | size of Drawer; when using `number` type, it is in pixels; when using `string` type, pass 'x%', otherwise it will be interpreted as `number` | `number` / `string`                                 | '30%'   |
| direction         | opening direction of Drawer                                                                                                        | <Enum>'rtl' \| 'ltr' \| 'ttb' \| 'btt'</Enum>       | 'ltr'   |
| zIndex            | same as z-index in native CSS, z-order of dialog                                                                                   | `number`                                            | —       |
| destroyOnClose    | whether to destroy child elements after closing the Drawer                                                                          | `boolean`                                           | true    |

<!-- The following properties were not found in the current type definitions -->
<!-- | defaultVisible    | whether the Drawer is displayed by default (uncontrolled)                                                                                              | `boolean`                                           | false         | -->
<!-- | className         | custom class name for Drawer                                                                                                        | string                                              | —             | -->
<!-- | modalClassName    | custom class name for mask                                                                                                         | `string`                                            | -             | -->

## Drawer Events

| Name     | Description                        | Type                                    |
| -------- | ---------------------------------- | --------------------------------------- |
| onOpen   | triggers when the Dialog opens     | <Enum type="Function">() => void</Enum> |
| onOpened | triggers when the Dialog opening animation ends | <Enum type="Function">() => void</Enum> |
| onClose  | triggers when the Dialog closes    | <Enum type="Function">() => void</Enum> |
| onClosed | triggers when the Dialog closing animation ends | <Enum type="Function">() => void</Enum> |