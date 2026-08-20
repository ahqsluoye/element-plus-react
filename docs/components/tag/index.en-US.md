---
title: Tag
lang: en-US
---

<Meta></Meta>

# Tag

Used for marking and selection.

## Basic Usage

Use the `type` attribute to define the type of Tag. You can also customize the background color through the `color` attribute.

<code src="./basic.tsx"></code>

## Removable Tag

Set the `closable` attribute to define whether a tag can be removed. It accepts a `Boolean`. By default, tag removal comes with a fading animation. If you don't want to use it, set the `disableTransitions` attribute, which accepts a `Boolean`, to `true`. The `onClose` event is triggered when the Tag is removed.

<code src="./removable.tsx"></code>

## Edit Dynamically

Dynamically editable tags can be implemented through the `onClose` event triggered when clicking the tag close button.

<code src="./editable.tsx"></code>

## Sizes

Besides the default size, the Tag component provides three additional sizes for choosing in different scenarios.

Use the `size` attribute to set additional sizes. Available values: `large`, `default`, or `small`.

<code src="./sizes.tsx"></code>

## Theme

The Tag component provides three different themes: `dark`, `light`, and `plain`.

Change the theme by setting the `effect` attribute. The default is `light`.

<code src="./theme.tsx"></code>

## Rounded

Tags can be fully rounded like buttons.

<code src="./rounded.tsx"></code>

## API

### Tag Properties

| Name               | Description                  | Type                                                                   | Options                                    | Default |
| ------------------ | ---------------------------- | ---------------------------------------------------------------------- | ------------------------------------------ | ------- |
| type               | Type of Tag                  | <Enum>'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'</Enum> | primary                                    |
| closable           | Whether the tag can be closed | `boolean`                                                              | false                                      |
| disableTransitions | Whether to disable animations | `boolean`                                                              | false                                      |
| hit                | Whether to have a highlighted border | `boolean`                                                         | false                                      |
| color              | Background color             | `string`                                                               | —                                          |
| size               | Size of Tag                  | <Enum>'large' \| 'default' \| 'small'</Enum>                           | —                                          |
| effect             | Theme of Tag                 | <Enum>'dark' \| 'light' \| 'plain'</Enum>                              | light                                      |
| round              | Whether the tag is rounded   | `boolean`                                                              | false                                      |

### Tag Events

| Name    | Description                          | Parameters                                             |
| ------- | ------------------------------------ | ------------------------------------------------------ |
| onClick | Triggered when Tag is clicked        | <Enum type="Function">(evt: MouseEvent) => void</Enum> |
| onClose | Triggered when Tag is closed         | <Enum type="Function">(evt: MouseEvent) => void</Enum> |