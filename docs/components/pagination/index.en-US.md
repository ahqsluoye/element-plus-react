---
title: Pagination
lang: en-US
---

<Meta></Meta>

# Pagination

Use pagination to break down data when there is too much to display on one page.

## Basic Usage

Set `layout` to specify what content needs to be displayed, separated by commas, and the layout elements will be displayed in order. The pagination elements are as follows: `prev` (previous page button), `next` (next page button), `pager` (pagination list), `jumper` (jump to), `total` (total), `sizes` (page size selector), and `->` (every element after this symbol will be pulled to the right).

<code src="./basic-usage.tsx"></code>

## Number of Pagers

By default, when the total number of pages exceeds 7, Pagination will collapse the extra page number buttons. You can set the maximum number of page buttons through the `pagerCount` property.

<code src="./number-of-pagers.tsx"></code>

## Buttons with Background Color

Set the `background` property to add a background color to the pagination buttons.

<code src="./background-color.tsx"></code>

## Small Pagination

In cases of limited space, you can use a simple small pagination.

Change the size through `size`. This is an example of `small`.

<code src="./small-pagination.tsx"></code>

## Hide Pagination When There is Only One Page

When there is only one page, hide the pagination by setting the `hideOnSinglePage` property.

<code src="./auto-hide-pagination.tsx"></code>

## More Elements

Other functional modules can be added according to scenario needs.

This example is a complete use case. It uses `sizeChange` and `currentChange` events to handle the events triggered when the page size and current page change. `pageSizes` accepts an array of integers. The array elements are the options for selecting the number of items displayed per page. `[100, 200, 300, 400]` means four options: displaying 100, 200, 300, or 400 items per page.

<code src="./more-elements.tsx"></code>

## API

### Properties

| Name               | Description                                                                                           | Type                                                                                                                  | Default                              |
| ------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| size               | Pagination size                                                                                       | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                          | —                                    |
| background         | Whether to add background color to pagination buttons                                                  | `boolean`                                                                                                             | false                                |
| pageSize           | Number of items displayed per page                                                                    | `number`                                                                                                              | 10                                   |
| defaultPageSize    | Default number of items per page, defaults to 10 when not set                                         | `number`                                                                                                              | -                                    |
| total              | Total number of items                                                                                 | `number`                                                                                                              | —                                    |
| pagerCount         | Set the maximum number of page buttons. When the total number of pages exceeds this value, it will collapse | `number`                                                                                                              | 7                                    |
| currentPage        | Current page number                                                                                  | `number`                                                                                                              | 1                                    |
| defaultCurrentPage | Initial value of current page number, defaults to 1 when not set                                      | `number`                                                                                                              | -                                    |
| layout             | Component layout, sub-component names separated by commas                                             | <Enum type="string"> `string (consists of sizes, prev, pager, next, jumper, ->, total)` </Enum>                       | prev, pager, next, jumper, ->, total |
| pageSizes          | Option settings for the page size selector                                                           | ` array` `number[] `                                                                                                  | [10, 20, 30, 40, 50, 100]            |
| prevText           | Text for the previous page displayed instead of icon                                                  | `string`                                                                                                              | —                                    |
| prevIcon           | Icon for previous page, higher priority than `prevText`                                               | `string` / `Component`                                                                                                | angle-left                           |
| nextText           | Text for the next page displayed instead of icon                                                     | `string`                                                                                                              | —                                    |
| nextIcon           | Icon for next page, higher priority than `nextText`                                                   | `string` / `Component`                                                                                                | angle-right                          |
| disabled           | Whether pagination is disabled                                                                       | `boolean`                                                                                                             | false                                |
| hideOnSinglePage   | Whether to hide when there is only one page                                                          | `boolean`                                                                                                             | false                                |
| simple             | When this property is added, it will be displayed as simple pagination                               | `boolean`                                                                                                             | false                                |
| showTotal          | Used to display the total data volume and current data order                                         | <Enum type="Function">(total: number, [from, to]: [number, number]) => React.ReactElement \| boolean \| string</Enum> | —                                    |

:::error{title=WARNING}

We will now check for unreasonable usages. If you find that the pager is not displayed, please check whether the following conditions are violated:

- `total` must be passed, otherwise the component cannot determine the total number of pages;
- If `currentPage` is passed, you must listen to the `currentPage` change event (`onChange`), otherwise the pagination will not work;
- If `pageSize` is passed and the layout includes a pageSize selector (i.e., `layout` includes `sizes`), you must listen to the `pageSize` change event (`onSizeChange`), otherwise the page size change will not work.

:::

### Events

| Name         | Description                          | Type                                                                         |
| ------------ | ------------------------------------ | ---------------------------------------------------------------------------- |
| onSizeChange | Triggered when `pageSize` changes    | <Enum type='Function'>(pageSize: number, currentPage: number) => void</Enum> |
| onChange     | Triggered when `currentPage` changes | <Enum type='Function'>(currentPage: number, pageSize: number) => void</Enum> |