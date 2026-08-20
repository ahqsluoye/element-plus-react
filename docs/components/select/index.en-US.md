---
title: Select
lang: en-US
---

<Meta></Meta>

# Select

When there are plenty of options, use a drop-down menu to display and select desired ones.

## Basic Usage

The basic single select. The value of `value` is the `value` property of the currently selected `ElOption`.

<code src="./basic-usage.tsx"></code>

## Options Attribute

Basic usage of `ElOption`. You can customize the alias of `options` through the `props` attribute.

<code src="./options.tsx"></code>

## Data Attribute

When you need to get additional data after `Select` is selected, use the `data` attribute to pass custom data. The data type can be `Object`, `Boolean`, or `String`. The `onChange` callback will return this data.

<code src="./data.tsx"></code>

## Disabled Option

Set the value of `disabled` to `true` in `ElOption` to disable this option.

<code src="./disabled-option.tsx"></code>

## Disabled State

Disable the entire select component.

Set the `disabled` attribute on `ElSelect` to make the entire select disabled.

<code src="./disabled.tsx"></code>

## Clearable

You can use the clear icon to clear the selection.

Set the `clearable` attribute for `ElSelect` to clear the select. Note that `clearable` only works for single select.

<code src="./clearable.tsx"></code>

## Basic Multiple Select

Multiple select uses tags to display selected options.

Set the `multiple` attribute for `ElSelect` to enable multiple mode. In this case, the value of `value` is an array of selected values. By default, selected values are displayed as Tag components. You can also set the `collapseTags` attribute to collapse them into a single text. Use the `collapseTagsTooltip` attribute to enable showing all selected tags when hovering over the collapsed text.

<code src="./multiple.tsx"></code>

## Custom Template

You can customize how to render each option.

Wrap the customized HTML template with `ElOption`.

<code src="./custom-template.tsx"></code>

## Custom Header

You can customize the header of the dropdown.

<code src="./custom-header.tsx"></code>

## Custom Footer

You can customize the footer of the dropdown.

<code src="./custom-footer.tsx"></code>

## Grouping

You can group options to distinguish different groups.

Use `ElOptionGroup` to group the options, and its `label` attribute stands for the name of the group.

<code src="./grouping.tsx"></code>

## Filterable

Use the filter feature to quickly find options.

Add the `filterable` attribute to `ElSelect` to enable filtering. By default, Select will find all options whose `label` attribute contains the input value. If you prefer other filtering logic, you can pass a `filterMethod`. `filterMethod` is a `Function` that gets called when the input value changes, and its parameter is the current input value.

<code src="./filterable.tsx"></code>

## Remote Search

Enter keywords to search data from a remote server.

Search data from the server by entering keywords. To enable remote search, set `filterable` and `remote` to `true`, and also pass a `remoteMethod`. `remoteMethod` is a `Function` that gets called when the input value changes, and its parameter is the current input value.

<code src="./remote-search.tsx"></code>

## Create New Options

Create and select new items that are not included in the initial options.

By using the `allowCreate` attribute, users can create new items through the input box. For `allowCreate` to work properly, `filterable` must be set to `true`.

<code src="./allow-create.tsx"></code>

## Custom Tag

You can customize tags.

Use the `tag` attribute to customize tag content. `collapseTags`, `collapseTagsTooltip`, `maxCollapseTags` do not work in this mode.

<code src="./custom-tag.tsx"></code>

## Custom Loading

Modify the loading area content.

<code src="./custom-loading.tsx"></code>

## Custom Label

You can customize labels.

<code src="./custom-label.tsx"></code>

## Select API

### Select Properties

| Name                | Description                                                                                                           | Type                                                                                                                        | Default                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| value               | Binding value of the selected option                                                                                  | `string` / `number` / `boolean` / `array`                                                                                   | —                                                                                                                   |
| options             | Data source for options. The keys `value`, `label`, and `disabled` can be customized through `props`.                 | <Enum type="array">Array<{[key: string]: any}></Enum>                                                                       | —                                                                                                                   |
| props               | Configuration for options                                                                                             | <Enum type="object">{ value?: string; label?: string; disabled?: string; options?: string; data?: string }</Enum>           | <Enum type="object">{value: 'value', label: 'label', disabled: 'disabled', data: 'data', options: 'options'}</Enum> |
| multiple            | Whether multiple-select is activated                                                                                  | `boolean`                                                                                                                   | false                                                                                                               |
| disabled            | Whether Select is disabled                                                                                             | `boolean`                                                                                                                   | false                                                                                                               |
| size                | Size of the input                                                                                                     | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                                | —                                                                                                                   |
| clearable           | Whether the select can be cleared                                                                                      | `boolean`                                                                                                                   | false                                                                                                               |
| collapseTags        | Whether to collapse tags to text when multiple selecting                                                              | `boolean`                                                                                                                   | false                                                                                                               |
| collapseTagsTooltip | Whether to show all selected tags when hovering over the collapsed text. `collapseTags` must be set to `true`         | `boolean`                                                                                                                   | false                                                                                                               |
| maxCollapseTags     | Maximum number of tags to display. Only works when `collapseTags` is set to `true`.                                    | `number`                                                                                                                    | 1                                                                                                                   |
| collapseTips        | Formatter function for the collapsed tag text on hover. `collapseTags` must be set to `true`                          | <Enum type='Function'>(collapseNum: number, total: number) => string</Enum>                                                 | —                                                                                                                   |
| placeholder         | Placeholder                                                                                                           | `string`                                                                                                                    | —                                                                                                                   |
| filterable          | Whether Select is filterable                                                                                           | `boolean`                                                                                                                   | false                                                                                                               |
| filterMethod        | Custom filter method                                                                                                  | <Enum type='Function'>(searchText: string) => void</Enum>                                                                   | —                                                                                                                   |
| allowCreate         | Whether to allow users to create new items. Only works when `filterable` is set to `true`.                            | `boolean`                                                                                                                   | false                                                                                                               |
| remote              | Whether options are loaded from a remote server                                                                       | `boolean`                                                                                                                   | false                                                                                                               |
| remoteMethod        | Custom remote search method                                                                                           | <Enum type='Function'>(searchText: string) => void</Enum>                                                                   | —                                                                                                                   |
| remoteShowSuffix    | Whether to show the suffix icon in remote search method                                                                | `boolean`                                                                                                                   | —                                                                                                                   |
| loading             | Whether Select is loading data from a remote server                                                                   | `boolean`                                                                                                                   | false                                                                                                               |
| loadingText         | Text displayed when loading data from the server                                                                      | `string`                                                                                                                    | —                                                                                                                   |
| loadingIcon         | Icon displayed during remote loading                                                                                   | `ReactElement`                                                                                                              | —                                                                                                                   |
| noMatchText         | Text displayed when no data matches the filtering query                                                               | `string`                                                                                                                    | —                                                                                                                   |
| noDataText          | Text displayed when there are no options                                                                               | `string`                                                                                                                    | —                                                                                                                   |
| showArrow           | Whether the dropdown has an arrow                                                                                     | `boolean`                                                                                                                   | true                                                                                                                |
| plain               | Whether in plain text mode (no border)                                                                                 | `boolean`                                                                                                                   | —                                                                                                                   |
| prepend             | Prepended content of the input                                                                                        | `string` / `Component`                                                                                                      | —                                                                                                                   |
| append              | Appended content of the input                                                                                         | `string` / `Component`                                                                                                      | —                                                                                                                   |
| tagType             | Tag type                                                                                                              | <Enum>'success' \| 'info' \| 'warning' \| 'danger'</Enum>                                                                   | info                                                                                                                |
| tagEffect           | Tag effect                                                                                                            | <Enum>'light' \| 'dark' \| 'plain'</Enum>                                                                                   | light                                                                                                               |
| labelFormat         | Formatter function for tags                                                                                           | <Enum type='Function'>(index: number, value: OptionValue, label?: OptionValue) => ReactElement</Enum>                       | —                                                                                                                   |
| header              | Content at the top of the dropdown                                                                                    | `ReactElement`                                                                                                              | —                                                                                                                   |
| footer              | Content at the bottom of the dropdown                                                                                 | `ReactElement`                                                                                                              | —                                                                                                                   |
| tag                 | Custom tag content                                                                                                    | <Enum type='Function'>(params: { data: OptionData[]; selectDisabled: boolean; deleteTag: Function }) => ReactElement</Enum> | —                                                                                                                   |
| unmountOnExit       | Whether to unmount the component when exiting                                                                        | `boolean`                                                                                                                   | —                                                                                                                   |
| suffixIcon          | Custom suffix icon component                                                                                         | `IconName`                                                                                                                  | —                                                                                                                   |
| maxWidth            | Maximum width of the dropdown                                                                                        | `number`                                                                                                                    | —                                                                                                                   |

### Props

| Attribute | Description                                                                                  | Type     | Default  |
| --------- | -------------------------------------------------------------------------------------------- | -------- | -------- |
| value     | Specify which key of the option object is used as the option's value                         | `string` | value    |
| label     | Specify which key of the option object is used as the option's label                         | `string` | label    |
| options   | Specify which key of the option object is used as the option's child options                 | `string` | options  |
| disabled  | Specify which key of the option object is used as the option's disabled state                | `string` | disabled |
| data      | Specify which key of the option object is used as the option's custom data                   | `string` | data     |

### Select Events

| Name            | Description                                                   | Type                                                    |
| --------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| onChange        | Triggers when the selected value changes                      | <Enum type="Function">(value: any) => void</Enum>       |
| onVisibleChange | Triggers when the dropdown appears/disappears                 | <Enum type="Function">(visible: boolean) => void</Enum> |
| onRemoveTag     | Triggers when a tag is removed in multiple mode               | <Enum type="Function">(tagValue: any) => void</Enum>    |
| onClear         | Triggers when the user clicks the clear button in clearable single select mode | <Enum type="Function">() => void</Enum>                 |

## Option Group API

### Option Group Properties

| Name     | Description                                   | Type      | Optional | Default |
| -------- | --------------------------------------------- | --------- | -------- | ------- |
| label    | Name of the group                             | `string`  | —        | —       |
| disabled | Whether to disable all options in this group  | `boolean` | —        | false   |

## Option API

### Option Properties

| Name     | Description                                                                  | Type                | Optional | Default |
| -------- | ---------------------------------------------------------------------------- | ------------------- | -------- | ------- |
| value    | Value of the option                                                          | `string` / `number` | —        | —       |
| label    | Label of the option. If not set, it defaults to the same as `value`          | `string` / `number` | —        | —       |
| disabled | Whether the option is disabled                                               | `boolean`           | —        | false   |