---
title: Virtualized Table
lang: en-US
---

<Meta></Meta>

# Virtualized Table

In frontend development, the table component has always been a frequently used component, especially in middle-office and data analysis scenarios. However, for [Table V1](./table.md), when there are more than 1000 data records in one screen, performance issues such as lag may occur, resulting in a poor experience.

With the Virtualized Table component, rendering massive amounts of data will no longer be a headache.

## Basic Usage

Let's demonstrate the performance of the Virtualized Table by rendering a basic example with 10 columns and 1000 rows.

<code src="./basic.tsx"></code>

## Auto Resizer

If you don't want to manually pass the `width` and `height` properties to the table, you can use the AutoResizer to wrap the table component. This will automatically update the width and height for you.

Try resizing your browser to see how it works.

:::tip

Since the default height of the `AutoResizer` component is 100%, make sure the parent element of this component **has a fixed height**. Alternatively, you can define it by passing the `style` attribute to `AutoResizer`.

:::

<code src="./auto-resizer.tsx"></code>

## Customize Cell Renderer

Of course, you can render table cells according to your needs. Here's a simple example of how to customize your cells.

<code src="./cell-templating.tsx"></code>

## Table with Selections

Use a customized cell renderer to add selection capability to the table component.

<code src="./selection.tsx"></code>

## Inline Editing

Similar to the approach of adding checkboxes above, we can implement editable cells in the same way.

<code src="./inline-editing.tsx"></code>

## Table with Status

You can highlight your table content to distinguish between "success, information, warning, danger" and other states.

To customize the appearance of rows, use the `rowClassName` attribute. For example, every 10th row automatically gets the `bg-blue-200` class, and every 5th row gets the `bg-red-100` class.

<code src="./row-class.tsx"></code>

## Sticky Rows

You can easily use the `fixedData` attribute to fix certain rows to the top of the table.

You can dynamically set sticky rows based on scroll events, as shown in this example.

<code src="./sticky-rows.tsx"></code>

## Fixed Columns

If you need columns to stick to the left or right for some reason, you can achieve this by adding special attributes to the table.

You can set the `fixed` attribute of the column to `true` (representing `FixedDir.LEFT`), `FixedDir.LEFT`, or `FixedDir.RIGHT`.

<code src="./fixed-columns.tsx"></code>

## Grouping Header

As shown in this example, group your headers by customizing the header renderer.

:::info{title=TIP}

In this case, we used the `JSX` feature, which is not supported in the playground. You can try them out in your local environment or online IDEs such as `codesandbox`.

It is recommended that you use JSX to write your table component, since it involves VNode manipulation.

:::

<code src="./grouping-header.tsx"></code>

## Filter

The virtualized table provides custom header renderers for creating customized headers. We can then use these to render filters.

<code src="./filter.tsx"></code>

## Sortable Table

You can sort the table with sort state.

<code src="./sort.tsx"></code>

## Controlled Sort

You can define multiple sortable columns as needed. Keep in mind that when you define multiple sortable columns, the UI may appear confusing to your users, as they won't know which column is currently being sorted.

<code src="./controlled-sort.tsx"></code>

## Cross Hovering

When dealing with a large list, it's easy to lose track of the current row and column you're visiting. In such cases, using this feature can be very helpful.

<code src="./cross-hovering.tsx"></code>

## Colspan

The virtualized table doesn't use the built-in `table` element, so `colspan` and `rowspan` behave a bit differently compared to [TableV1](./table.md). However, with a customized row renderer, these features can still be implemented. In this section, we'll demonstrate how to achieve this.

<code src="./colspan.tsx"></code>

## Rowspan

Since we've covered [Colspan](#colspan), it's worth noting that we also have row span. It's a bit different from colspan but the idea is basically the same.

<code src="./rowspan.tsx"></code>

## Rowspan and Colspan Together

We can combine rowspan and colspan together to meet your business needs!

<code src="./spans.tsx"></code>

## Tree Data

The Virtualized Table can also render data in a tree-like structure. Click the arrow icon to expand or collapse the tree nodes.

<code src="./tree-data.tsx"></code>

## Dynamic Height Rows

The Virtualized Table is capable of rendering rows with dynamic heights. If you're working with data and are uncertain about the content size, this feature is ideal for rendering rows that adjust to the content's height. To enable this, pass down the `estimatedRowHeight` attribute. The closer the estimated height matches the actual content, the smoother the rendering experience.

:::info{title=TIP}

Each row's height is dynamically measured during rendering. As a result, if you're trying to display a large amount of data, the UI **might be** bouncing.

:::

<code src="./dynamic-height.tsx"></code>

## Detail View

Using dynamic height rendering, you can also display a detailed view within the table.

<code src="./detailed-view.tsx"></code>

## Customized Footer

Customize the table footer, typically used to display summary data and information.

<code src="./footer.tsx"></code>

## Customized Empty Renderer

Render a customized empty element.

<code src="./empty.tsx"></code>

## Overlay

When you want to show a floating element like a loading indicator, you can render an overlay floating on top of the table.

<code src="./overlay.tsx"></code>

## Manual Scrolling

Use the methods provided by Table V2 to scroll manually or programmatically to a specified offset or row.

:::info{title=TIP}

The second parameter of `scrollToRow` represents the scrolling strategy, which calculates the position to scroll to. The default is `auto`. If you want to scroll to a specific position, you can define the strategy yourself. Available options are `"auto" | "center" | "end" | "start" | "smart"`.

The difference between `smart` and `auto` is that `auto` is a subset of the `smart` scroll strategy.

:::

<code src="./manual-scroll.tsx"></code>

## TableV2 Properties

| Name                   | Description                                                                                                           | Type                                                   | Default   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------- |
| cache                  | Number of rows loaded in advance for better rendering performance                                                     | `number`                                               | 2         |
| estimatedRowHeight     | Estimated height for rendering dynamic cells                                                                          | `number`                                               | —         |
| headerClass            | Custom class name for the header part                                                                                 | `string` / Function<[HeaderClassGetter](#typings)>     | —         |
| headerProps            | Custom props for the header part                                                                                      | `object` / Function<[HeaderPropsGetter](#typings)>     | —         |
| headerCellProps        | Custom props for the header cell part                                                                                 | `object` / Function<[HeaderCellPropsGetter](#typings)> | —         |
| headerHeight           | The height of the header is set by `height`. If an array is passed, it makes the header row equal to the array length | `number`/ `number[]`                                   | 50        |
| footerHeight           | Height of the footer part. When a value is passed, this part will be included in the table height calculation         | `number`                                               | 0         |
| rowClass               | Custom class name for the row wrapper part                                                                            | `string` / Function<[RowClassGetter](#typings)>        | —         |
| rowKey                 | The key value of each row. If not provided, the index will be used instead                                            | `string` / `Symbol` / `number`                         | id        |
| rowProps               | Custom class name for the row component part                                                                          | `object` / Function<[RowPropsGetter](#typings)>        | —         |
| rowHeight              | Height of each row, used for calculating the total height of the table                                                | `number`                                               | 50        |
| rowEventHandlers       | Triggered when a series of event handlers are added to each row                                                       | `object`<[RowEventHandlers](#typings)>                 | —         |
| cellProps              | Custom props for each cell (except header cells)                                                                      | `object` / Function<[CellPropsGetter](#typings)>       | —         |
| columns                | Array of column configurations                                                                                        | [Column[]](#column-attribute)                          | —         |
| data                   | Array of data to be rendered in the table                                                                             | [Data[]](#typings)                                     | []        |
| dataGetter             | A custom method for fetching data from the data source                                                                | Function<[DataGetter\<T\>](#typings)>                  | —         |
| fixedData              | Data for rendering rows above the main content and below the header                                                   | `object`<[Data](#typings)>                             | —         |
| expandColumnKey        | Column key to mark which rows can be expanded                                                                         | `string`                                               | —         |
| expandedRowKeys        | Array of keys for expanded rows, can be used with `v-model`                                                           | [KeyType[]](#typings)                                  | —         |
| defaultExpandedRowKeys | Array of keys for default expanded rows, **this data is NOT reactive**                                                | [KeyType[]](#typings)                                  | —         |
| className              | Class name for the table, applied to all three parts (left, right, main)                                              | `string` / `array` / `object`                          | —         |
| fixed                  | Whether the cell width is adaptive or fixed                                                                           | `boolean`                                              | false     |
| width ^(required)      | Width of the table                                                                                                    | `number`                                               | —         |
| height ^(required)     | Height of the table                                                                                                   | `number`                                               | —         |
| maxHeight              | Maximum height of the table                                                                                           | `number`                                               | —         |
| indentSize             | Horizontal indentation of the tree table                                                                              | `number`                                               | 12        |
| hScrollbarSize         | Configure the horizontal scrollbar size of the table to prevent horizontal and vertical scrollbars from overlapping   | `number`                                               | 6         |
| vScrollbarSize         | Configure the vertical scrollbar size of the table to prevent horizontal and vertical scrollbars from overlapping     | `number`                                               | 6         |
| scrollbarAlwaysOn      | If enabled, the scrollbar will always be displayed; otherwise it will only be shown when the mouse hovers over        | `boolean`                                              | false     |
| sortBy                 | Sort indicator                                                                                                        | `object`<[SortBy](#typings)>                           | {}        |
| sortState              | Multiple sort indicator                                                                                               | `object`<[SortState](#typings)>                        | undefined |

## TableV2 Slots

| Name       | Parameter                                 |
| ---------- | ----------------------------------------- |
| cell       | `object`<[CellSlotProps](#typings)>       |
| header     | `object`<[HeaderSlotProps](#typings)>     |
| headerCell | `object`<[HeaderCellSlotProps](#typings)> |
| row        | `object`<[RowSlotProps](#typings)>        |
| footer     | —                                         |
| empty      | —                                         |
| overlay    | —                                         |

## TableV2 Events

| Name               | Description                                                           | Parameter                                |
| ------------------ | --------------------------------------------------------------------- | ---------------------------------------- |
| columnSort         | Called when a column is sorted                                        | `object`<[ColumnSortParam](#typings)>    |
| expandedRowsChange | Triggered when the expanded state of rows changes                     | [KeyType[]](#typings)                    |
| endReached         | Triggered when the end of the table is reached                        | —                                        |
| scroll             | Triggered after the table is scrolled by the user                     | `object`<[ScrollParams](#typings)>       |
| rowsRendered       | Triggered after rows are rendered                                     | `object`<[RowsRenderedParams](#typings)> |
| rowExpand          | Triggered when clicking the arrow icon to expand/collapse a tree node | `object`<[RowExpandParams](#typings)>    |

## TableV2 Methods

| Name         | Description                                          | Parameter                                                                                              |
| ------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| scrollTo     | Scroll to a given position                           | <Enum type="Function">(param: {scrollLeft?: number, scrollTop?: number}) => void</Enum>                |
| scrollToLeft | Scroll to a given horizontal position                | <Enum type="Function">(scrollLeft: number) => void</Enum>                                              |
| scrollToTop  | Scroll to a given vertical position                  | <Enum type="Function">(scrollTop: number) => void</Enum>                                               |
| scrollToRow  | Scroll to a given row with specified scroll strategy | <Enum type="Function">(row: number, strategy?: 'center' \| 'end' \| 'start' \| 'smart') => void</Enum> |

:::tip

Note that these are `JavaScript` objects, so you **CANNOT USE** kebab-case for these attributes.

:::

## Column Attribute

| Name               | Description                                                      | Type                                                                                                                                                                 | Default |
| ------------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| align              | Alignment of table cell content                                  | [Alignment](https://github.com/element-plus/element-plus/blob/b92b22932758f0ddea98810ae248f6ca62f77e25/packages/components/table-v2/src/constants.ts#L6)             | left    |
| class              | Class name for the column                                        | `string`                                                                                                                                                             | —       |
| key                | Unique identification                                            | [KeyType](#typings)                                                                                                                                                  | —       |
| dataKey            | Unique identifier of data                                        | [KeyType](#typings)                                                                                                                                                  | —       |
| fixed              | Fixed direction of the column                                    | `boolean` / [FixedDir](https://github.com/element-plus/element-plus/blob/b92b22932758f0ddea98810ae248f6ca62f77e25/packages/components/table-v2/src/constants.ts#L11) | false   |
| flexGrow           | CSS `flex grow`, only effective when not a fixed table           | `number`                                                                                                                                                             | 0       |
| flexShrink         | CSS `flex shrink`, only effective when not a fixed table         | `number`                                                                                                                                                             | 1       |
| headerClass        | Custom class name for the header                                 | `string`                                                                                                                                                             | —       |
| hidden             | Whether the column is invisible                                  | `boolean`                                                                                                                                                            | —       |
| style              | Custom class name for the column cell, merged with the grid cell | <Enum type="object">CSSProperties</Enum>                                                                                                                             | —       |
| sortable           | Whether the column is sortable                                   | `boolean`                                                                                                                                                            | —       |
| title              | Default text in the header cell                                  | `string`                                                                                                                                                             | —       |
| maxWidth           | Maximum width of the column                                      | `number`                                                                                                                                                             | —       |
| minWidth           | Minimum width of the column                                      | `number`                                                                                                                                                             | —       |
| width ^(required)  | Width of the column                                              | `number`                                                                                                                                                             | —       |
| cellRenderer       | Custom cell renderer                                             | `VueComponent` / (props: [CellRenderProps](#typings)) => VNode                                                                                                       | —       |
| headerCellRenderer | Custom header renderer                                           | `VueComponent` / (props: [HeaderRenderProps](#typings)) => VNode                                                                                                     | —       |

## Typings{#typings}

<details open>
<summary>Show Type Declarations</summary>

```ts
type HeaderClassGetter = (param: { columns: Column<any>[]; headerIndex: number }) => string;

type HeaderPropsGetter = (param: { columns: Column<any>[]; headerIndex: number }) => Record<string, any>;

type HeaderCellPropsGetter = (param: { columns: Column<any>[]; column: Column<any>; columnIndex: number; headerIndex: number; style: CSSProperties }) => Record<string, any>;

type RowClassGetter = (param: { columns: Column<any>[]; rowData: any; rowIndex: number }) => string;

type RowPropsGetter = (param: { columns: Column<any>[]; rowData: any; rowIndex: number }) => Record<string, any>;

type CellPropsGetter = (param: { column: Column<any>; columns: Column<any>[]; columnIndex: number; cellData: any; rowData: any; rowIndex: number }) => void;

type DataGetterParams<T> = {
    columns: Column<T>[];
    column: Column<T>;
    columnIndex: number;
} & RowCommonParams;

type DataGetter<T> = (params: DataGetterParams<T>) => T;

type CellRenderProps<T> = {
    cellData: T;
    column: Column<T>;
    columns: Column<T>[];
    columnIndex: number;
    rowData: any;
    rowIndex: number;
};

type HeaderRenderProps<T> = {
    column: Column<T>;
    columns: Column<T>[];
    columnIndex: number;
    headerIndex: number;
};

type ScrollParams = {
    xAxisScrollDir: 'forward' | 'backward';
    scrollLeft: number;
    yAxisScrollDir: 'forward' | 'backward';
    scrollTop: number;
};

type CellSlotProps<T> = {
    column: Column<T>;
    columns: Column<T>[];
    columnIndex: number;
    depth: number;
    style: CSSProperties;
    rowData: any;
    rowIndex: number;
    isScrolling: boolean;
    expandIconProps?:
        | {
              rowData: any;
              rowIndex: number;
              onExpand: (expand: boolean) => void;
          }
        | undefined;
};

type HeaderSlotProps = {
    cells: VNode[];
    columns: Column<any>[];
    headerIndex: number;
};

type HeaderCellSlotProps = {
    class: string;
    columns: Column<any>[];
    column: Column<any>;
    columnIndex: number;
    headerIndex: number;
    style: CSSProperties;
    headerCellProps?: any;
    sortBy: SortBy;
    sortState?: SortState | undefined;
    onColumnSorted: (e: MouseEvent) => void;
};

type RowCommonParams = {
    rowData: any;
    rowIndex: number;
};

type RowEventHandlerParams = {
    rowKey: KeyType;
    event: Event;
} & RowCommonParams;

type RowEventHandler = (params: RowEventHandlerParams) => void;
type RowEventHandlers = {
    onClick?: RowEventHandler;
    onContextmenu?: RowEventHandler;
    onDblclick?: RowEventHandler;
    onMouseenter?: RowEventHandler;
    onMouseleave?: RowEventHandler;
};

type RowsRenderedParams = {
    rowCacheStart: number;
    rowCacheEnd: number;
    rowVisibleStart: number;
    rowVisibleEnd: number;
};

type RowSlotProps = {
    columns: Column<any>[];
    rowData: any;
    columnIndex: number;
    rowIndex: number;
    data: any;
    key: number | string;
    isScrolling?: boolean;
    style: CSSProperties;
};

type RowExpandParams = {
    expanded: boolean;
    rowKey: KeyType;
} & RowCommonParams;

type Data = {
    [key: KeyType]: any;
    children?: Array<any>;
};

type FixedData = Data;

type KeyType = string | number | symbol;

type ColumnSortParam<T> = { column: Column<T>; key: KeyType; order: SortOrder };

enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}

type SortBy = { key: KeyType; order: SortOrder };
type SortState = Record<KeyType, SortOrder>;
```

</details>

## FAQs

#### How do I render a list with a checkbox in the first column?

Since you can define your own cell renderer, you can follow the [Customize Cell Renderer](#customize-cell-renderer) example to render a `checkbox` and manage its state yourself.

#### Why does the Virtualized Table provide fewer features than [TableV1](./table.md)?

For the virtualized table, we intend to reduce some features and let users implement them according to their needs. Integrating too many features makes the component code difficult to maintain, and for most users, basic features are sufficient. Some key features have not been developed yet. We'd love to hear your opinion. Join [Discord](https://discord.com/invite/gXK9XNzW3X) to stay tuned.
