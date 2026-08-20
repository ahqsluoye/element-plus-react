---
title: Transfer
lang: en-US
---

<Meta></Meta>

# Transfer

## Basic Usage

Data is passed to Transfer via the `data` attribute. The data needs to be an object array, and each object should have these attributes: `key` being the unique identifier of the data item, `label` being the displayed text, and `disabled` indicating whether the data item is disabled. Items in the target list are synced to the variable bound to `value`, and the value is an array of data item `key`s. Of course, if you don't want the target list to be initially empty, you can assign an initial value to the `value` bound variable as in this example.

<code src="./basic.tsx"></code>

## Filterable

You can search and filter data items when there is a lot of data.

Set `filterable` to `true` to enable search mode. By default, if the data item's `label` attribute contains the search keyword, it will be displayed in the search results. You can also use `filterMethod` to define your own search logic. `filterMethod` receives a method. When the search keyword changes, it passes the current keyword and each data item to the method. If the method returns `true`, the corresponding data item will be displayed in the search results.

<code src="./filterable.tsx"></code>

## Customizable

You can customize list title text, button text, data item render function, list footer check status text, list footer content, etc.

Use `titles`, `buttonTexts`, `renderContent` and `format` to customize list title text, button text, data item render function, and list header check status text respectively. For the list footer content, two format functions are provided: `leftFooter` and `rightFooter`. In addition, if you want some data items to be initially checked, you can use `leftDefaultChecked` and `rightDefaultChecked` attributes. Finally, this example also demonstrates the usage of the `onChange` event.

<code src="./customizable.tsx"></code>

## Custom Empty Content

You can customize the content displayed when the list is empty or when no filtering results are found.

Use `leftEmpty` and `rightEmpty` slots to customize the empty content of each panel.

<code src="./empty-content.tsx"></code>

## Prop Aliases

By default, Transfer only recognizes the `key`, `label` and `disabled` fields in a data item. If your data has different field names, you can use the `props` attribute to set aliases for them.

The data source in this example does not have `key` and `label` fields. The fields with the same functionality are named `value` and `desc`. Therefore, you can use the `props` attribute to set aliases for `key` and `label`.

<code src="./prop-alias.tsx"></code>

## Transfer API

### Transfer Properties

| Name               | Description                                        | Type                                                                               | Default |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| value              | Binding value of selected items (controlled mode)  | <Enum type="array">Array<string \| number></Enum>                                  | []      |
| defaultValue       | Default binding value of selected items           | <Enum type="array">Array<string \| number></Enum>                                  | []      |
| data               | Data source of Transfer                            | <Enum type="array">Record<string, any>[]</Enum>                                    | []      |
| filterable         | Whether it is searchable                           | `boolean`                                                                          | false   |
| filterPlaceholder  | Placeholder for the search input                   | `string`                                                                           | —       |
| filterMethod       | Custom filter method                               | <Enum type="Function">(query: string, item: Record<string, any>) => boolean</Enum> | —       |
| titles             | Custom list titles                                 | <Enum type="array">[string, string]</Enum>                                         | []      |
| buttonTexts        | Custom button texts                               | <Enum type="array">[string, string]</Enum>                                         | []      |
| renderContent      | Custom render function for data items              | <Enum type="object">TransferRender</Enum>                                          | —       |
| format             | Check status text at the top of the list           | <Enum type="object">TransferFormat</Enum>                                          | {}      |
| props              | Field aliases for data source                      | <Enum type="object">TransferPropsAlias</Enum>                                      | —       |
| leftDefaultChecked | Array of keys of initially checked data items in the left list | <Enum type="array">Array<string \| number></Enum>                                  | []      |
| rightDefaultChecked| Array of keys of initially checked data items in the right list | <Enum type="array">Array<string \| number></Enum>                                  | []      |
| leftFooter         | Content at the bottom of the left list             | <Enum type="Function">(props: TransferListProps) => React.ReactElement</Enum>      | —       |
| rightFooter        | Content at the bottom of the right list            | <Enum type="Function">(props: TransferListProps) => React.ReactElement</Enum>      | —       |
| leftEmpty          | Content when the left panel is empty or no data matches the filter | `No Data`                                                                           | —       |
| rightEmpty         | Content when the right panel is empty or no data matches the filter | `No Data`                                                                           | —       |

### Transfer Events

| Name               | Description                                                                    | Type                                                                                                                |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| onChange           | Triggers when data items in the right list change                              | <Enum type="Function">(value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => void</Enum> |
| onLeftCheckChange  | Triggers when data items in the left list are checked/unchecked by the user   | <Enum type="Function">(value: TransferKey[], movedKeys?: TransferKey[]) => void</Enum>                              |
| onRightCheckChange | Triggers when data items in the right list are checked/unchecked by the user  | <Enum type="Function">(value: TransferKey[], movedKeys?: TransferKey[]) => void</Enum>                              |

## Type Declarations

<details open>
  <summary>Show Declarations</summary>

```ts
import React from 'react';

type TransferKey = string | number;

type TransferDirection = 'left' | 'right';

type TransferDataItem = Record<string, any>;

type TransferRender = (options: TransferDataItem) => React.ReactNode;

type TransferFormat = React.ReactElement<any> | ((info: { checked: number; total: number }) => React.ReactNode);

interface TransferPropsAlias {
    label?: string;
    key?: string;
    disabled?: string;
}
```

</details>