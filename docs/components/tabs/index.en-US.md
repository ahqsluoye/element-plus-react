---
title: Tabs
lang: en-US
---

<Meta></Meta>

# Tabs

Divide data collections that are related yet belong to different types.

## Basic Usage

Basic and concise tabs.

The Tabs component provides tab functionality. By default, the first tab is selected. You can also specify the currently selected tab through the `value` attribute.

<code src="./basic.tsx"></code>

## Card Style Tabs

You can set tabs with a card style.

Simply set the `type` attribute to `card` to change the tabs to card style.

<code src="./card-style.tsx"></code>

## Border Card Style

You can also set tabs to have a bordered card style.

Set `type` to `borderCard`.

<code src="./border-card.tsx"></code>

## Tab Position

You can set the tab position through `tabPosition`.

There are four directions for tabs: `tabPosition="left|right|top|bottom"`.

<code src="./tab-position.tsx"></code>

## Dynamic Add & Remove Tabs

The add and remove buttons can only be used under card-style tabs.

<code src="./dynamic-tabs.tsx"></code>

## Custom Add Button Icon

You can customize the add button icon through the `addIcon` attribute.

<code src="./customized-add-button-icon.tsx"></code>

## Customized Trigger

<code src="./customized-trigger.tsx"></code>

## Tabs API

### Tabs Properties

| Name              | Description                                                                                                          | Type                                                                                                                              | Default    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| activeName        | Binding value, name of the selected tab. Default is the name of the first tab (controlled)                            | `string` / `number`                                                                                                               | —          |
| defaultActiveName | The `name` of the default selected tab                                                                              | `string` / `number`                                                                                                               | —          |
| type              | Type of tab style                                                                                                    | <Enum>'' \| 'card' \| 'border-card'</Enum>                                                                                        | ''         |
| closable          | Whether the tab can be closed                                                                                        | `boolean`                                                                                                                         | false      |
| addable           | Whether the tab can be added                                                                                         | `boolean`                                                                                                                         | false      |
| addIcon           | Custom add button icon                                                                                               | `React.ReactNode`                                                                                                                 | —          |
| editable          | Whether the tab can be both added and closed                                                                         | `boolean`                                                                                                                         | false      |
| tabPosition       | Position of the tabs                                                                                                 | <Enum>'top' \| 'right' \| 'bottom' \| 'left'</Enum>                                                                               | top        |
| stretch           | Whether the tab width automatically fits its container                                                               | `boolean`                                                                                                                         | false      |
| center            | Whether to center the tabs                                                                                           | `boolean`                                                                                                                         | false      |
| classPrefix       | Style prefix                                                                                                         | `string`                                                                                                                          | —          |
| headerStyle       | Style of the tab header bar div                                                                                      | `React.CSSProperties`                                                                                                             | —          |
| contentStyle      | Style of the content div                                                                                              | `React.CSSProperties`                                                                                                             | —          |
| beforeLeave       | Hook function before switching tabs. If it returns `false` or a rejected `Promise`, switching will be prevented.     | <Enum type="Function">(activeName: TabPaneName, oldActiveName: TabPaneName) => void \| boolean \| Promise<void \| boolean></Enum> | () => true |

### Tabs Events

| Name        | Description                            | Type                                                                                           |
| ----------- | -------------------------------------- | ---------------------------------------------------------------------------------------------- |
| onTabClick  | Triggered when a tab is selected       | <Enum type="Function">(context: TabsPaneContext) => void</Enum>                                |
| onTabChange | Triggered when `activeName` changes     | <Enum type="Function">(name: TabPaneName \| undefined) => void</Enum>                          |
| onTabRemove | Triggered when the tab remove button is clicked | <Enum type="Function">(name: TabPaneName \| undefined) => void</Enum>                          |
| onTabAdd    | Triggered when the tab add button is clicked | <Enum type="Function">() => void</Enum>                                                        |
| onTabEdit   | Triggered after clicking the tab add or remove button | <Enum type="Function">(name: TabPaneName \| undefined, type: 'add' \| 'remove') => void</Enum> | —   |

## Tab-pane API

### Tab-pane Properties

| Name        | Description                                                                                                                    | Type                                    | Default |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ------ |
| label       | Title of the tab                                                                                                               | `string` / `React.ReactElement`         | ''     |
| name        | Identifier corresponding to the tab binding value, representing the alias of the tab. Default is the serial number of the tab pane, e.g. the first tab is 0 | `string` / `number`                     | —      |
| closable    | Whether the tab can be closed                                                                                                  | `boolean`                               | false  |
| disabled    | Whether the tab is disabled                                                                                                    | `boolean`                               | false  |
| lazy        | Whether the tab is lazily rendered                                                                                             | `boolean`                               | false  |
| classPrefix | Style prefix                                                                                                                    | `string`                                | —      |
| onTabShow   | Triggered when the tab is activated                                                                                            | <Enum type="Function">() => void</Enum> | —      |
| onTabClose  | Triggered when the tab is closed                                                                                               | <Enum type="Function">() => void</Enum> | —      |
| data        | Extra parameters passed to the click event                                                                                     | `Record<string \| number, any>`         | —      |