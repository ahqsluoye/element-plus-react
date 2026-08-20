---
title: Dropdown
lang: en-US
---

<Meta></Meta>

# Dropdown

Toggleable menu for displaying lists of links and actions.

## Basic Usage

Hover on the dropdown menu to unfold it for more actions.

The triggering element is rendered by the child component, and the dropdown part is set via the `menu` attribute on the `Dropdown`. By default, the dropdown list shows when you hover on the triggering element without having to click it.

<code src="./basic-usage.tsx"></code>

## Triggering Element

Use the button to trigger the dropdown list.

Set `splitButton` to `true` to split the triggering element into a button group, with the left button being a normal button and the right one the actual triggering target. If you want to insert a separator line between the third and fourth options, just add a `divider` CSS class to the fourth option.

<code src="./triggering-element.tsx"></code>

## How to Trigger

Click or hover to activate.

Set the `trigger` attribute to `click`; the default is `hover`.

<code src="./how-to-trigger.tsx"></code>

## Menu Hiding Behavior

This can be configured via the `hideOnClick` attribute.

By default, the dropdown menu is hidden after clicking a menu item. Set `hideOnClick` to `false` to disable this behavior.

<code src="./menu-hiding-behavior.tsx"></code>

## Command Event

Clicking a menu item triggers an event, and users can perform different operations via the corresponding menu item key.

<code src="./command-event.tsx"></code>

## Dropdown Methods

You can manually open or close the dropdown menu using `handleOpen` or `handleClose`.

<code src="./dropdown-methods.tsx"></code>

## Sizes

Besides the default size, the Dropdown component provides three additional sizes for you to choose among different scenarios.

Use the `size` attribute to configure the size. The available sizes are: `large`, `default`, or `small`.

<code src="./sizes.tsx"></code>

## Virtual Triggering

Sometimes we want to place the dropdown trigger element elsewhere without writing them together. In this case, you can use virtual triggering.

<code src="./virtual-trigger.tsx"></code>

## Dropdown Properties

| Name              | Description                                                                                                          | Type                                                                                                                         | Default |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- |
| menu              | Dropdown menu                                                                                                        | <Enum type='object'> `React.ReactElement<DropdownMenuProps>`</Enum>                                                          | ''      |
| visible           | whether the state is visible                                                                                         | `boolean`                                                                                                                    | —       |
| defaultVisible    | initial value                                                                                                        | `boolean`                                                                                                                    | —       |
| type              | menu button type, same as `Button` component, only works when `splitButton` is true                                  | <Enum type="enum">'' \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger' \| 'text' (deprecated)</Enum> | ''      |
| size              | menu size, also works on the split button when `splitButton` is true                                                 | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                               | ''      |
| buttonProps       | props for the button component, refer to [Button Attributes](./button#button-properties)                              | `object`                                                                                                                     | —       |
| maxHeight         | the max height of the menu                                                                                           | `string` / `number`                                                                                                          | ''      |
| splitButton       | whether a button group is displayed                                                                                   | `boolean`                                                                                                                    | false   |
| disabled          | whether to disable                                                                                                    | `boolean`                                                                                                                    | false   |
| placement         | placement of the pop menu                                                                                             | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'</Enum>                     | bottom  |
| effect            | Tooltip theme, built-in theme: `dark` / `light`                                                                       | <Enum type="enum">'dark' \| 'light'</Enum> / `string`                                                                        | light   |
| trigger           | how to trigger the dropdown                                                                                           | <Enum type="enum">'click' \| 'hover' \| 'contextmenu'`/`array``Array<'click' \| 'hover' \| 'contextmenu'></Enum>             | hover   |
| virtualTriggering | whether virtual triggering is enabled                                                                                 | `boolean`                                                                                                                    | —       |
| virtualRef        | indicates the reference element to which the dropdown is attached                                                     | `HTMLElement`                                                                                                                | —       |
| hideOnClick       | whether to hide the menu after clicking a menu item                                                                   | `boolean`                                                                                                                    | true    |
| showArrow         | whether the tooltip content has an arrow                                                                              | `boolean`                                                                                                                    | true    |
| showTimeout       | delay time before showing the dropdown (only works when trigger is `hover`)                                            | `number`                                                                                                                     | 150     |
| hideTimeout       | delay time before hiding the dropdown (only works when trigger is `hover`)                                             | `number`                                                                                                                     | 150     |
| persistent        | when the dropdown is inactive and `persistent` is `false`, the dropdown menu will be destroyed                          | `boolean`                                                                                                                    | true    |
| popperClass       | custom class name for the dropdown                                                                                   | `string` / `object`                                                                                                          | ''      |
| popperStyle       | custom style for the dropdown                                                                                        | `string` / `object`                                                                                                          | —       |

<!--
| triggerKeys | specify which keys on the keyboard can trigger when pressed | <Enum type="array">string[]`                                                                                                 |`['Enter', 'Space', 'ArrowDown', 'NumpadEnter']</Enum> |
| role | the ARIA role attribute for the dropdown menu. Depending on the use case, you may want to change this to 'navigation' | <Enum type="enum">'dialog' \| 'grid' \| 'group' \| 'listbox' \| 'menu' \| 'navigation' \| 'tooltip' \| 'tree'</Enum> | menu |
| tabindex | [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) of Dropdown | `number` / `string` | 0 |
| popperOptions | [popper.js](https://popper.js.org/docs/v2/) parameters | `object` | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported | whether the dropdown popup is teleported to the body | `boolean` | true |
| appendTo | which element the dropdown content appends to | `CSSSelector` / `HTMLElement` | — |
| persistent | when the dropdown is inactive and `persistent` is `false`, the dropdown menu will be destroyed | `boolean` | true |
-->

## Dropdown Events

| Name            | Description                                                                       | Type                                                                                |
| --------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| onClick         | triggers when the left button is clicked (when `splitButton` is `true`)            | <Enum type="Function">(e: React.MouseEvent<HTMLElement, MouseEvent>) => void</Enum> |
| onCommand       | triggers when a dropdown item is clicked; the parameter is the command dispatched from the dropdown item | <Enum type="Function">(...args: any[]) => void</Enum>                               |
| onVisiblechange | triggers when the dropdown appears/disappears; the parameter is `true` when it appears, `false` otherwise | <Enum type="Function">(val: boolean) => void</Enum>                                 |

### Dropdown Ref

| Name        | Description             | Type                                    |
| ----------- | ----------------------- | --------------------------------------- |
| handleOpen  | open the dropdown menu  | <Enum type="Function">() => void</Enum> |
| handleClose | close the dropdown menu | <Enum type="Function">() => void</Enum> |

## DropdownItem API

### DropdownItem Properties

| Name     | Description                                                                   | Type                           | Default |
| -------- | ----------------------------------------------------------------------------- | ------------------------------ | ------- |
| command  | a command dispatched to the `command` callback function                       | `string` / `number` / `object` | —       |
| disabled | whether the item is disabled                                                  | `boolean`                      | false   |
| divided  | whether a divider is displayed                                                | `boolean`                      | false   |
| active   | whether it is in active state                                                 | `boolean`                      | false   |