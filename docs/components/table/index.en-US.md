---
title: Table
lang: en-US
---

<Meta></Meta>

# Table

Display multiple data with similar format. You can sort, filter, compare your data in a table.

## Basic Table

Basic table is just for data display.

After setting the `data` attribute of `Table` with an object array, you can use `prop` (corresponding to a key of the object in the `data` array) in `TableColumn` to insert data to table columns, and set the `label` attribute to define the column name. You can also use the `width` attribute to define the width of columns.

<code src="./basic.tsx"></code>

## Striped Table

Striped table makes it easier to distinguish different rows.

`stripe` can create a striped table. If `true`, the table will be striped.

<code src="./striped.tsx"></code>

## Table with Border

By default, the Table component has no vertical border. If you need it, you can set the `border` attribute to `true` to enable it.

<code src="./with-border.tsx"></code>

## Table with Status

You can highlight your table content to distinguish between "success, information, warning, danger" and other states.

You can specify the `rowClassName` attribute of the Table component to add a class to a row in the Table, so you can customize the style of each row.

<code src="./with-status.tsx"></code>

## Table with Show Overflow Tooltip

When the content is too long, it will break into multiple lines. You can use `showOverflowTooltip` to keep it in one line.

The `showOverflowTooltip` attribute accepts a `Boolean` value. When set to `true`, the extra content will show in a tooltip when hovering over the cell.

<code src="./show-overflow-tooltip"></code>

## Table with Fixed Header

When there are too many rows, you can use a fixed header.

By setting the `height` attribute in the `Table` element, you can fix the table header without any additional code.

<code src="./fixed-header.tsx"></code>

## Table with Fixed Column

When there are too many columns, you can fix some of them.

Fixed columns require the `fixed` attribute, which accepts a `Boolean`. If `true`, the column will be fixed on the left. It also accepts strings, `left` or `right`, to indicate whether it's fixed on the left or right.

<code src="./fixed-column.tsx"></code>

## Table with Fixed Columns and Header

When you have a large amount of data in your table, you can fix the header and columns at the same time.

Fixed columns and headers can be used simultaneously by setting the above two attributes.

<code src="./fixed-column-and-header.tsx"></code>

## Fluid Height

When the data changes dynamically, you can set a maximum height for the Table.

Set the `maxHeight` attribute to specify the maximum height for the Table. If the required height of the table exceeds the maximum height, a scrollbar will appear.

<code src="./fixed-header-with-fluid-header.tsx"></code>

## Grouping Table Head

When the data structure is complex, you can use a group header to show the data hierarchy.

Just place `TableColumn` inside another `TableColumn` to achieve a grouped header.

<code src="./grouping-header.tsx"></code>

## Single Select

Single row selection is supported.

The Table component provides single selection support. You just need to configure the `highlightCurrentRow` attribute to enable single selection. Then the `currentChange` event manages the triggered event when selected, passing `currentRow` and `oldCurrentRow`. If you need to display an index, you can add a `TableColumn` with `type` attribute set to `index` to display the index number starting from 1.

<code src="./single-select.tsx"></code>

## Multiple Select

You can also select multiple rows.

Implementing multi-select is very simple: manually add a `TableColumn` with `type` attribute set to `selection`. In addition to multi-select, the `showOverflowTooltip` attribute is also used here. By default, if the cell content is too long, it will take up multiple lines. If you want single-line display, you can use the `showOverflowTooltip` attribute, which accepts a `Boolean`. When set to `true`, the extra content will be displayed as a tooltip on hover.

<code src="./multi-select.tsx"></code>

## Sorting

Sort the data to find or compare data quickly.

Set the `sortable` attribute in a column to sort by that column. It accepts a `Boolean`, default is `false`. You can set the default sort column and order through the `defaultSort` attribute of the Table. Use `sortMethod` or `sortBy` to apply custom sorting rules. If backend sorting is needed, set `sortable` to `custom`, and listen to the `sortChange` event on the Table. In the event callback, you can get the current sort field and order, and request the sorted table data from the API. In this example, we also use the `formatter` attribute to format the value of a specific column. It accepts a `Function` with two parameters: `row` and `column`, which can be processed as needed.

<code src="./sort.tsx"></code>

## Column Drag Sort<ElTag type="primary" round={true} effect="plain">2.0.7</ElTag>

By setting the `columnSortEnabled` attribute to `true`, you can enable column drag sort. The `onColumnSortChange` event is used to listen for column sort changes.

<code src="./column-sort.tsx"></code>

## Custom Column Template

Customize the display content of columns, can be combined with other components.

Column rendering uses a function: `(data: { $index: number; row: any }) => React.ReactNode`

<code src="./custom-column.tsx"></code>

## Custom Header

The table header supports customization.

The `label` of `TableColumn` supports not only text but also `React.ReactNode`.

<code src="./custom-header.tsx"></code>

## Expandable Row

When the row content is too long and you don't want to display the horizontal scroll bar, you can use the Table expandable row feature.

Activate expandable rows by setting `type="expand"` and children. The template of `TableColumn` will be rendered as the content of the expanded row. The accessible attributes for the expanded row are the same as when using a custom column template function.

<code src="./expandable-row.tsx"></code>

## Tree Data and Lazy Loading

Supports displaying tree-structured data. When a row contains a `children` field, it is treated as tree data. The `rowKey` prop is required for rendering nested data. In addition, child row data can be loaded asynchronously. Set the `lazy` attribute of Table to `true` and provide the `load` function. Specify which rows contain child nodes through the `hasChildren` field in the row. Both `children` and `hasChildren` can be configured via `treeProps`.

<code src="./tree-and-lazy.tsx"></code>

## Summary Row

:::info{title=TODO}
:::

If the table displays various numbers, you can show the sum of each column at the end of the table.

Set `showSummary` to `true` to display a summary row at the end of the table. By default, for the summary row, the first column does not sum data but displays the text "Sum" (configurable via `sumText`). Other columns will sum all numeric values in that column and display them. Of course, you can define your own summary logic. Use `summaryMethod` and pass a function that returns an array. Each item in the array will be displayed in each column of the summary row. See the second table in this example for details.

<!-- <code src="./summary.tsx"></code> -->

## Rowspan and Colspan

When multiple rows or columns share the same data, you can merge rows or columns.

Use the `spanMethod` method passed to the table to merge rows or columns. The method's parameter is an object containing the current row `row`, current column `column`, current row index `rowIndex`, and current column index `columnIndex`. The function can return an array containing two elements, the first representing `rowspan` and the second representing `colspan`. It can also return an object with keys `rowspan` and `colspan`.

<code src="./rowspan-and-colspan.tsx"></code>

## Custom Index

Customize the row index for `type=index` columns.

By passing the `index` attribute to a `type=index` column, you can customize the index. When this attribute receives a number, it will be used as the starting value for the index. It can also receive a function that provides the current row index (starting from `0`) as a parameter, and the return value will be displayed as the index.

<code src="./custom-index.tsx"></code>

## Table Layout

The layout of cells, rows, and columns in a table can be specified through the [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) property.

<code src="./table-layout.tsx"></code>

## Tooltip Formatter

You can use `tooltipFormatter` to customize the tooltip content.

<code src="./tooltip-formatter.tsx"></code>

## Table API

### Table Properties

| Name                  | Description                                                                                                                                                                                                                                                                       | Type                                                                                                                                                               | Default                                                                                     |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| data                  | Table data                                                                                                                                                                                                                                                                        | <Enum type="array">any[]</Enum>                                                                                                                                    | []                                                                                          |
| height                | Height of the table. Default is auto height. If height is a number type, the unit is px; if height is a string type, the height will be set as the value of Table's style.height, and the Table height will be controlled by external styles.                                     | `string` / `number`                                                                                                                                                | —                                                                                           |
| maxHeight             | Maximum height of the table. Valid values are a number or a height in px.                                                                                                                                                                                                         | `string` / `number`                                                                                                                                                | —                                                                                           |
| rowHeight             | Row height                                                                                                                                                                                                                                                                        | `number`                                                                                                                                                           | —                                                                                           |
| stripe                | Whether the table is striped                                                                                                                                                                                                                                                      | `boolean`                                                                                                                                                          | false                                                                                       |
| border                | Whether the table has vertical border                                                                                                                                                                                                                                             | `boolean`                                                                                                                                                          | false                                                                                       |
| size                  | Size of the Table                                                                                                                                                                                                                                                                 | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                                     | —                                                                                           |
| fit                   | Whether column widths automatically fit the container                                                                                                                                                                                                                             | `boolean`                                                                                                                                                          | true                                                                                        |
| showHeader            | Whether the table header is visible                                                                                                                                                                                                                                               | `boolean`                                                                                                                                                          | true                                                                                        |
| highlightCurrentRow   | Whether to highlight the current row                                                                                                                                                                                                                                              | `boolean`                                                                                                                                                          | false                                                                                       |
| currentRowKey         | Key of the current row, set-only property                                                                                                                                                                                                                                         | `string` / `number`                                                                                                                                                | —                                                                                           |
| rowClassName          | Callback function for row className, or a string to set a fixed className for all rows                                                                                                                                                                                            | <Enum type="Function">(data: { row: any, rowIndex: number }) => string</Enum> / `string`                                                                           | —                                                                                           |
| rowStyle              | Callback function for row style, or a fixed object to set the same style for all rows                                                                                                                                                                                             | <Enum type="Function">(data: { row: any, rowIndex: number }) => CSSProperties </Enum> / <Enum type="object">CSSProperties</Enum>                                   | —                                                                                           |
| cellClassName         | Callback function for cell className, or a string to set a fixed className for all cells                                                                                                                                                                                          | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => string</Enum> / `string`                                         | —                                                                                           |
| cellStyle             | Callback function for cell style, or a fixed object to set the same style for all cells                                                                                                                                                                                           | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => CSSProperties</Enum> / <Enum type="object">CSSProperties</Enum>  | —                                                                                           |
| headerRowClassName    | Callback function for header row className, or a string to set a fixed className for all header rows                                                                                                                                                                              | <Enum type="Function">(data: { row: any, rowIndex: number }) => string</Enum> / `string`                                                                           | —                                                                                           |
| headerRowStyle        | Callback function for header row style, or a fixed object to set the same style for all header rows                                                                                                                                                                               | <Enum type="Function">(data: { row: any, rowIndex: number }) => CSSProperties </Enum> / <Enum type="object">CSSProperties</Enum>                                   | —                                                                                           |
| headerCellClassName   | Callback function for header cell className, or a string to set a fixed className for all header cells                                                                                                                                                                            | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => string</Enum> / `string`                                         | —                                                                                           |
| headerCellStyle       | Callback function for header cell style, or a fixed object to set the same style for all header cells                                                                                                                                                                             | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => CSSProperties </Enum> / <Enum type="object">CSSProperties</Enum> | —                                                                                           |
| rowKey                | Key of row data, used for optimizing Table rendering; required when using `reserveSelection` and displaying tree data. When the type is String, multi-level access is supported: `user.info.id`, but `user.info[0].id` is not supported, in which case `Function` should be used. | <Enum type="function">(row: any) => string</Enum> / `string`                                                                                                       | —                                                                                           |
| emptyText             | Text content displayed when there is no data                                                                                                                                                                                                                                      | `string`                                                                                                                                                           | No Data                                                                                     |
| defaultExpandAll      | Whether to expand all rows by default, works when the Table has expandable rows or is a tree table                                                                                                                                                                                | `boolean`                                                                                                                                                          | false                                                                                       |
| expandRowKeys         | Set the currently expanded rows of the Table through this attribute. The `rowKey` attribute must be set first. The value is an array of keys of the expanded rows.                                                                                                                | <Enum type="array">string[]</Enum>                                                                                                                                 | —                                                                                           |
| defaultSort           | The default sort column prop and order. The `prop` attribute specifies the default sort column, and `order` specifies the default sort order                                                                                                                                      | <Enum type="object">Sort</Enum>                                                                                                                                    | If `prop` is set but `order` is not set, `order` will default to ascending                  |
| tooltipEffect         | The `effect` of the overflow tooltip                                                                                                                                                                                                                                              | <Enum type="enum">'dark' \| 'light'</Enum>                                                                                                                         | dark                                                                                        |
| showSummary           | Whether to display a summary row at the end                                                                                                                                                                                                                                       | `boolean`                                                                                                                                                          | false                                                                                       |
| sumText               | Text displayed in the first column of the summary row                                                                                                                                                                                                                             | `string`                                                                                                                                                           | Sum                                                                                         |
| summaryMethod         | Custom summary calculation method                                                                                                                                                                                                                                                 | <Enum type="Function">(data: { columns: any[], data: any[] }) => (React.ReactNode \| string)[]</Enum>                                                              | —                                                                                           |
| spanMethod            | Calculation method for merging rows or columns                                                                                                                                                                                                                                    | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => number[] \| { rowspan: number, colspan: number } \| void</Enum>  | —                                                                                           |
| selectOnIndeterminate | Behavior when only some rows are selected in a multi-select table and the header checkbox is clicked. If true, all rows will be selected; if false, all rows will be deselected.                                                                                                  | `boolean`                                                                                                                                                          | true                                                                                        |
| indent                | Indentation of tree nodes when displaying tree data                                                                                                                                                                                                                               | `number`                                                                                                                                                           | 16                                                                                          |
| lazy                  | Whether to lazy load child node data                                                                                                                                                                                                                                              | `boolean`                                                                                                                                                          | false                                                                                       |
| load                  | Function for loading child node data, works when `lazy` is true                                                                                                                                                                                                                   | <Enum type="Function">(row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void</Enum>                                                                | —                                                                                           |
| treeProps             | Configuration for rendering nested data                                                                                                                                                                                                                                           | <Enum type="object">{ hasChildren?: string, children?: string, checkStrictly?: boolean }</Enum>                                                                    | ` object``{ hasChildren: 'hasChildren', children: 'children', checkStrictly: false }</Enum> |
| tableLayout           | Set the layout method of table cells, rows, and columns                                                                                                                                                                                                                           | <Enum type="enum">'fixed' \| 'auto'</Enum>                                                                                                                         | fixed                                                                                       |
| scrollbarAlwaysOn     | Always show scrollbar                                                                                                                                                                                                                                                             | `boolean`                                                                                                                                                          | false                                                                                       |
| showOverflowTooltip   | Whether to hide extra content and show them in a tooltip when hovering on the cell. This affects the display of all columns. See [tooltip-options](#table-attributes) for details.                                                                                                | `boolean`                                                                                                                                                          | —                                                                                           |
| flexible              | Ensure the minimum size of the main axis so it doesn't exceed the content                                                                                                                                                                                                         | `boolean`                                                                                                                                                          | false                                                                                       |
| loading               | Whether it is in loading state                                                                                                                                                                                                                                                    | `boolean`                                                                                                                                                          | false                                                                                       |
| expandable            | Only works for columns with `type=expand`. Type is Function, and the return value is used to determine whether the row can be expanded                                                                                                                                            | <Enum type="Function">(row: any) => Promise<boolean></Enum>                                                                                                        | —                                                                                           |
| hideIconOnNotExpand   | Whether to hide the expand icon when the row cannot be expanded                                                                                                                                                                                                                   | `boolean`                                                                                                                                                          | false                                                                                       |
| tooltipFormatter      | Customize the tooltip content when using `showOverflowTooltip`                                                                                                                                                                                                                    | <Enum type="Function">(data: { row: any, column: any, cellValue: any }) => React.ReactNode \| string</Enum>                                                        | —                                                                                           |
| append                | Content inserted after the last row of the table. If you need to implement infinite scrolling on the table content, you may need this. If the table has a summary row, this content will be placed above the summary row.                                                         | —                                                                                                                                                                  |                                                                                             |
| columnSortEnabled     | enable column drag sort                                                                                                                                                                                                                                                           | `boolean`                                                                                                                                                          | false                                                                                       |

### Table Events

| Name               | Description                                                                                                                                                                  | Type                                                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onSelect           | Triggered when the user manually checks the Checkbox of a data row                                                                                                           | <Enum type="Function">(selection: any[], row: any) => void</Enum>                                                                                                                    |
| onSelectAll        | Triggered when the user manually checks the select-all Checkbox                                                                                                              | <Enum type="Function">(selection: any[]) => void</Enum>                                                                                                                              |
| onSelectionChange  | Triggered when the selection changes                                                                                                                                         | <Enum type="Function">(newSelection: any[]) => void</Enum>                                                                                                                           |
| onMouseEnter       | Triggered when hovering into a cell                                                                                                                                          | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onMouseLeave       | Triggered when hovering out of a cell                                                                                                                                        | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onClick            | Triggered when a cell is clicked                                                                                                                                             | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onDblclick         | Triggered when a cell is double-clicked                                                                                                                                      | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onContextmenu      | Triggered when a cell is right-clicked                                                                                                                                       | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onClick            | Triggered when a row is clicked                                                                                                                                              | <Enum type="Function">(row: any, column: any, event: Event) => void</Enum>                                                                                                           |
| onContextmenu      | Triggered when a row is right-clicked                                                                                                                                        | <Enum type="Function">(row: any, column: any, event: Event) => void</Enum>                                                                                                           |
| onDblclick         | Triggered when a row is double-clicked                                                                                                                                       | <Enum type="Function">(row: any, column: any, event: Event) => void</Enum>                                                                                                           |
| onClick            | Triggered when a column header is clicked                                                                                                                                    | <Enum type="Function">(column: any, event: Event) => void</Enum>                                                                                                                     |
| onContextmenu      | Triggered when a column header is right-clicked                                                                                                                              | <Enum type="Function">(column: any, event: Event) => void</Enum>                                                                                                                     |
| onSortChange       | Triggered when the table's sorting condition changes                                                                                                                         | <Enum type="Function">(data: {column: any, prop: string, order: any }) => void</Enum>                                                                                                |
| onFilterChange     | Key of the column. If you need to use the filter-change event, this attribute is needed to identify which column's filter condition it is                                    | <Enum type="Function">(newFilters: any) => void</Enum>                                                                                                                               |
| onChange           | Triggered when the current row of the table changes. To highlight the current row, please enable the `highlightCurrentRow` attribute of the table                            | <Enum type="Function">(currentRow: any, oldCurrentRow: any) => void</Enum>                                                                                                           |
| onDragend          | Triggered when the column width is changed by dragging the header                                                                                                            | <Enum type="Function">(newWidth: number, oldWidth: number, column: any, event: MouseEvent) => void</Enum>                                                                            |
| onChange           | Triggered when the user expands or collapses a row (when expanding, the second parameter of the callback is expandedRows; for tree tables, the second parameter is expanded) | <Enum type="Function">(row: any, expandedRows: any[]) => void & (row: any, expanded: boolean) => void</Enum>                                                                         |
| onColumnSortChange | Triggered when the column's sort changes                                                                                                                                     | <Enum type="Function"> (data: { fromColumn: TableColumnCtx\<T\>; toColumn: TableColumnCtx\<T\>; fromIndex: number; toIndex: number; columns: TableColumnCtx\<T\>[] }) => void</Enum> |

### TableRef

| Name               | Description                                                                                                                                                     | Type                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| clearSelection     | Used in multi-select tables to clear the user's selection                                                                                                       | <Enum type="Function">() => void</Enum>                                                      |
| getSelectionRows   | Returns the currently selected rows                                                                                                                             | <Enum type="Function">() => any[]</Enum>                                                     |
| toggleRowSelection | Used in multi-select tables to toggle the selected state of a row. If a second parameter is passed, you can directly set whether the row is selected or not     | <Enum type="Function">(row: any, selected?: boolean, ignoreSelectable = true) => void</Enum> |
| toggleAllSelection | Used in multi-select tables to toggle select all and deselect all                                                                                               | <Enum type="Function">() => void</Enum>                                                      |
| toggleRowExpansion | Used in expandable or tree tables to toggle whether a row is expanded. Use the second parameter to directly set whether the row should be expanded or collapsed | <Enum type="Function">(row: any, expanded?: boolean) => void</Enum>                          |
| setCurrentRow      | Used in single-select tables to set a row as selected. If called without parameters, it will clear the current highlighted row's selection state                | <Enum type="Function">(row: any) => void</Enum>                                              |
| clearSort          | Used to clear sorting conditions, restoring data to its unsorted state                                                                                          | <Enum type="Function">() => void</Enum>                                                      |
| clearFilter        | Pass an array of `columnKey` to clear the filter condition of the specified column. If no parameter, clear all filters                                          | <Enum type="Function">(columnKeys?: string[]) => void</Enum>                                 |
| doLayout           | Re-layout the Table. When the visibility of the table changes, you may need to call this method to get the correct layout                                       | <Enum type="Function">() => void</Enum>                                                      |
| sort               | Manually sort the table. The `prop` parameter specifies the sort column, and `order` specifies the sort order                                                   | <Enum type="Function">(prop: string, order: string) => void</Enum>                           |
| scrollTo           | Scroll to a specific set of coordinates                                                                                                                         | <Enum type="Function">(options: number \| ScrollToOptions, yCoord?: number) => void</Enum>   |
| setScrollTop       | Set the vertical scroll position                                                                                                                                | <Enum type="Function">(top?: number) => void</Enum>                                          |
| setScrollLeft      | Set the horizontal scroll position                                                                                                                              | <Enum type="Function">(left?: number) => void</Enum>                                         |
| columns            | Get the context of the table columns                                                                                                                            | <Enum type="array">TableColumnCtx<any>[]</Enum>                                              |

## Table-column API

### Table-column Properties

| Name                | Description                                                                                                                                                                                                                      | Type                                                                                                                                                                                        | Default                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| type                | Type of the corresponding column. If set to `selection`, a checkbox will be displayed; if set to `index`, the row index (starting from 1) will be displayed; if set to `expand`, it will be displayed as an expandable button    | <Enum type="enum">'default' \| 'selection' \| 'index' \| 'expand'</Enum>                                                                                                                    | default                           |
| index               | If `type=index` is set, you can customize the index by passing the `index` attribute                                                                                                                                             | `number` / <Enum type="Function">(index: number) => number</Enum>                                                                                                                           | —                                 |
| label               | Displayed title                                                                                                                                                                                                                  | `string`                                                                                                                                                                                    | —                                 |
| columnKey           | Key of the column. If you need to use the `onFilterChange` event, this attribute is needed to identify which column's filter condition it is                                                                                     | `string`                                                                                                                                                                                    | —                                 |
| rawColumnKey        | Original key of the column                                                                                                                                                                                                       | `string`                                                                                                                                                                                    | —                                 |
| prop                | Field name corresponding to the field name of the column content, the `property` attribute can also be used                                                                                                                      | `string`                                                                                                                                                                                    | —                                 |
| name                | Field name corresponding to the field name of the column content, the `prop` attribute can also be used                                                                                                                          | `string`                                                                                                                                                                                    | —                                 |
| width               | Width of the corresponding column                                                                                                                                                                                                | `string` / `number`                                                                                                                                                                         | ''                                |
| minWidth            | Minimum width of the corresponding column. The difference from `width` is that `width` is fixed, while `minWidth` will proportionally distribute the remaining width to columns with `minWidth` set                              | `string` / `number`                                                                                                                                                                         | ''                                |
| fixed               | Whether the column is fixed on the left or right. `true` means fixed on the left                                                                                                                                                 | <Enum type="enum">'left' \| 'right'</Enum> / `boolean`                                                                                                                                      | false                             |
| renderHeader        | Function used to render the column header Label area                                                                                                                                                                             | <Enum type="Function">(data: { column: any, $index: number }) => void</Enum>                                                                                                                | —                                 |
| sortable            | Whether the corresponding column can be sorted. If set to 'custom', it means the user wants remote sorting and needs to listen to the Table's sort-change event                                                                  | `boolean` / `string`                                                                                                                                                                        | false                             |
| sortMethod          | Specify which attribute to sort data by, only effective when `sortable` is set to `true`. Should return a Number like Array.sort                                                                                                 | <Enum type="Function">(a: any, b: any) => number</Enum>                                                                                                                                     | —                                 |
| sortBy              | Specify which attribute to sort data by, only effective when `sortable` is true and `sortMethod` is not set. If `sortBy` is an array, it sorts by the first attribute first, then by the second if the first is equal, and so on | <Enum type="Function">(row: any, index: number) => string \| string \| string[]</Enum>                                                                                                      | —                                 |
| sortOrders          | The rotation order of sorting strategies used when sorting data, only effective when `sortable` is true. You need to pass an array. As the user clicks the header, the column will sort in the order of the array elements       | <Enum type="object">('ascending' \| 'descending' \| null)[]</Enum>                                                                                                                          | ['ascending', 'descending', null] |
| resizable           | Whether the corresponding column can be resized by dragging (requires `border` attribute set to true on the Table)                                                                                                               | `boolean`                                                                                                                                                                                   | true                              |
| formatter           | Used to format content                                                                                                                                                                                                           | <Enum type="function">(row: any, column: any, cellValue: any, index: number) => React.ReactNode \| string</Enum>                                                                            | —                                 |
| showOverflowTooltip | Show tooltip when content is too long and hidden                                                                                                                                                                                 | `boolean`                                                                                                                                                                                   | undefined                         |
| align               | Alignment                                                                                                                                                                                                                        | <Enum type="enum">'left' \| 'center' \| 'right'</Enum>                                                                                                                                      | left                              |
| headerAlign         | Header alignment. If not set, the table's alignment will be used                                                                                                                                                                 | <Enum type="enum">'left' \| 'center' \| 'right'</Enum>                                                                                                                                      | left                              |
| className           | Class name of the column                                                                                                                                                                                                         | `string`                                                                                                                                                                                    | —                                 |
| labelClassName      | Custom class name for the current column header                                                                                                                                                                                  | `string`                                                                                                                                                                                    | —                                 |
| selectable          | Only works for columns with `type=selection`. Type is Function, and the return value is used to determine whether the CheckBox of this row can be checked                                                                        | <Enum type="Function">(row: any, index: number) => boolean</Enum>                                                                                                                           | —                                 |
| reserveSelection    | Whether to retain options after data refresh, only works for columns with `type=selection`. Note that `rowKey` needs to be specified for this feature to work                                                                    | `boolean`                                                                                                                                                                                   | false                             |
| filters             | Data filter options, array format, each element in the array needs `text` and `value` attributes                                                                                                                                 | <Enum type="array">Array<{text: string, value: string}></Enum>                                                                                                                              | —                                 |
| filterPlacement     | Positioning of the filter popover                                                                                                                                                                                                | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | —                                 |
| filterMultiple      | Whether the data filter option is multi-select                                                                                                                                                                                   | `boolean`                                                                                                                                                                                   | true                              |
| filterMethod        | Method used for data filtering. For multi-select filter options, it will be executed for each data row. Returning true at any time will display the row.                                                                         | <Enum type="Function">(value: any, row: any, column: any) => void</Enum>                                                                                                                    | —                                 |
| filteredValue       | Selected data filter items. If you need to customize the rendering of the header filter, you may need this attribute                                                                                                             | <Enum type="object">string[]</Enum>                                                                                                                                                         | —                                 |
| tooltipFormatter    | Customize the tooltip content when using `showOverflowTooltip`                                                                                                                                                                   | <Enum type="Function">(data: { row: any, column: any, cellValue: any }) => React.ReactNode \| string</Enum>                                                                                 | —                                 |

## Type Declarations

<details open>
  <summary>Show Type Declarations</summary>

```ts
interface Sort {
    prop: string;
    order: 'ascending' | 'descending';
    init?: any;
    silent?: any;
}

interface TreeNode {
    expanded?: boolean;
    loading?: boolean;
    noLazyChildren?: boolean;
    indent?: number;
    level?: number;
    display?: boolean;
}
```

</details>
