---
title: TableV2 虚拟化表格
lang: zh-CN
---

# TableV2 虚拟化表格

用于展示海量数据的高性能虚拟化表格组件，支持虚拟滚动、固定列、排序、选择等功能。

## 基础用法

基础的虚拟化表格展示用法。

通过 `columns` 属性配置表格列，`data` 属性传入数据，设置 `width` 和 `height` 来确定表格尺寸。

<code src="./basic.tsx"></code>

<!-- ## 虚拟滚动大量数据

虚拟化表格可以高效处理大量数据。

<code src="./large-data.tsx"></code>

## 固定列

横向内容过多时，可以固定列。

使用 `fixed` 属性来固定列，可选值为 `'left'`、`'right'` 或 `true`。

<code src="./fixed-column.tsx"></code>

## 排序

对表格进行排序。

在列配置中设置 `sortable` 属性为 `true` 即可开启排序。

<code src="./sort.tsx"></code>

## 行选择

支持单选和多选功能。

通过 `rowSelection` 属性配置行选择。

<code src="./selection.tsx"></code>

## 自定义单元格渲染

自定义单元格的显示内容。

通过列配置的 `render` 属性自定义单元格渲染。

<code src="./custom-cell.tsx"></code>

## TableV2 API

### TableV2 属性

| 属性名 | 说明 | 类型 | Default |
| ------ | ---- | ---- | ------- |
| data | 表格数据 | `any[]` | `[]` |
| columns | 列配置数组 | `TableV2Column[]` | `[]` |
| width | 表格宽度 | `number` | — |
| height | 表格高度 | `number` | — |
| rowHeight | 行高，支持固定值或函数 | `number \| ((index: number) => number)` | `48` |
| headerHeight | 表头高度 | `number` | `48` |
| rowKey | 行数据的唯一标识 | `string \| ((row: any) => string \| number)` | — |
| rowClass | 行类名 | `string \| ((row: any, rowIndex: number) => string)` | — |
| rowStyle | 行样式 | `CSSProperties \| ((row: any, rowIndex: number) => CSSProperties)` | — |
| defaultSort | 默认排序状态 | `TableV2SortState` | — |
| sort | 排序状态（受控） | `TableV2SortState` | — |
| rowSelection | 行选择配置 | `object` | — |
| bordered | 是否带边框 | `boolean` | `false` |
| stripe | 是否为斑马纹表格 | `boolean` | `false` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| highlightCurrentRow | 是否高亮当前行 | `boolean` | `false` |
| currentRowKey | 当前行的 key | `string \| number` | — |

### TableV2 事件

| 事件名 | 说明 | 类型 |
| ------ | ---- | ---- |
| onRowClick | 行点击事件 | `(row: any, rowIndex: number, e: MouseEvent) => void` |
| onRowDblClick | 行双击事件 | `(row: any, rowIndex: number, e: MouseEvent) => void` |
| onRowContextMenu | 行右键菜单事件 | `(row: any, rowIndex: number, e: MouseEvent) => void` |
| onHeaderClick | 表头点击事件 | `(column: any, columnIndex: number, e: MouseEvent) => void` |
| onSortChange | 排序变化事件 | `(sortState: TableV2SortState) => void` |
| onScroll | 滚动事件 | `(scrollState: TableV2ScrollState) => void` |
| onSelectedRowKeysChange | 选中行变化事件 | `(selectedRowKeys: (string \| number)[]) => void` |

### TableV2 实例方法

| 方法名 | 说明 | 类型 |
| ------ | ---- | ---- |
| scrollToTop | 滚动到指定垂直位置 | `(top: number) => void` |
| scrollToLeft | 滚动到指定水平位置 | `(left: number) => void` |
| scrollToPosition | 滚动到指定位置 | `({ top?: number; left?: number }) => void` |
| scrollToRow | 滚动到指定行 | `(index: number, align?: string) => void` |
| scrollToColumn | 滚动到指定列 | `(index: number) => void` |
| getRowHeight | 获取指定行的高度 | `(index: number) => number` |
| getTotalHeight | 获取表格总高度 | `() => number` |
| getStartIndex | 获取可见起始索引 | `() => number` |
| getEndIndex | 获取可见结束索引 | `() => number` |

### TableV2Column 列配置

| 属性名 | 说明 | 类型 | Default |
| ------ | ---- | ---- | ------- |
| key | 列的唯一标识 | `string \| number` | — |
| dataKey | 数据字段名 | `string` | — |
| title | 列标题 | `ReactNode` | — |
| width | 列宽度 | `number` | — |
| minWidth | 最小宽度 | `number` | — |
| fixed | 是否固定列 | `'left' \| 'right' \| true` | — |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | — |
| sortable | 是否可排序 | `boolean` | `false` |
| resizable | 是否可调整宽度 | `boolean` | `false` |
| className | 单元格类名 | `string` | — |
| style | 单元格样式 | `CSSProperties` | — |
| render | 自定义单元格渲染 | `({ row, rowIndex, column }) => ReactNode` | — |
| headerCellRender | 自定义表头单元格渲染 | `({ column, headerIndex }) => ReactNode` | — | -->
