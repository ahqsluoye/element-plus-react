---
title: Table 表格
lang: zh-CN
---

<Meta></Meta>

# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。

## 基础表格

基础的表格展示用法。

当 `Table` 元素中注入 `data` 对象数组后，在 `TableColumn` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。 可以使用 `width` 属性来定义列宽。

<code src="./basic.tsx"></code>

## 带斑马纹表格

使用带斑马纹的表格，可以更容易区分出不同行的数据。

`stripe` 可以创建带斑马纹的表格。 如果 `true` , 表格将会带有斑马纹。

<code src="./striped.tsx"></code>

## 带边框表格

默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 `border` 属性，把该属性设置为 `true` 即可启用。

<code src="./with-border.tsx"></code>

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

可以通过指定 Table 组件的 `rowClassName` 属性来为 Table 中的某一行添加 class， 这样就可以自定义每一行的样式了。

<code src="./with-status.tsx"></code>

## 显示溢出工具提示的表格

当内容太长时，它会分成多行。您可以使用 showOverflowTooltip 将其保留在一行中。

属性 showOverflowTooltip 接受一个布尔值。 为 true 时多余的内容会在 hover 时以 tooltip 的形式显示出来。

<code src="./show-overflow-tooltip"></code>

## 固定表头

纵向内容过多时，可选择固定表头。

只要在 `ElTable` 元素中定义了 `height` 属性，即可实现固定表头的表格，而不需要额外的代码。

<code src="./fixed-header.tsx"></code>

## 固定列

横向内容过多时，可选择固定列。

固定列需要使用 `fixed` 属性，它接受 `Boolean` 值。 如果为 `true` , 列将被左侧固定. 它还接受传入字符串，left 或 right，表示左边固定还是右边固定。

<code src="./fixed-column.tsx"></code>

## 固定列和表头

当您有大量数据块放入表中，您可以同时固定表头和列。

固定列和表头可以同时使用，只需要将上述两个属性分别设置好即可。

<code src="./fixed-column-and-header.tsx"></code>

## 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

通过设置 `maxHeight` 属性为 `ElTable` 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条。

<code src="./fixed-header-with-fluid-header.tsx"></code>

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

只需要将 ElTableColumn 放置于 ElTableColumn 中，你可以实现组头。

<code src="./grouping-header.tsx"></code>

## 单选

选择单行数据时使用色块表示。

Table 组件提供了单选的支持， 只需要配置 `highlightCurrentRow` 属性即可实现单选。 之后由 `currentChange` 事件来管理选中时触发的事件，它会传入 `currentRow` ， `oldCurrentRow` 。 如果需要显示索引，可以增加一列 `ElTableColumn` ，设置 `type` 属性为 `index` 即可显示从 1 开始的索引号。

<code src="./single-select.tsx"></code>

## 多选

你也可以选择多行。

实现多选非常简单: 手动添加一个 `ElTableColumn` ，设 `type` 属性为 `selection` 即可； 除了多选，这里还使用到了 `showOverflowTooltip` 属性。 默认情况下，如果单元格内容过长，会占用多行显示。 若需要单行显示可以使用 `showOverflowTooltip` 属性，它接受一个 `Boolean` ， 为 `true` 时多余的内容会在 hover 时以 tooltip 的形式显示出来。

<code src="./multi-select.tsx"></code>

## 排序

对表格进行排序，可快速查找或对比数据。

在列中设置 `sortable` 属性即可实现以该列为基准的排序， 接受一个 `Boolean` ，默认为 `false` 。 可以通过 Table 的 `defaultSort` 属性设置默认的排序列和排序顺序。 可以使用 `sortMethod` 或者 `sortBy` 使用自定义的排序规则。 如果需要后端排序，需将 `sortable` 设置为 `custom` ，同时在 Table 上监听 `sortChange` 事件， 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。 在本例中，我们还使用了 `formatter` 属性，它用于格式化指定列的值， 接受一个 `Function` ，会传入两个参数： `row` 和 `column` ， 可以根据自己的需求进行处理。

<code src="./sort.tsx"></code>

## 列拖拽排序<ElTag type="primary" round={true} effect="plain">2.0.7</ElTag>

通过设置 `columnSortEnabled` 属性为 `true` ，即可开启列拖拽排序。 事件 `onColumnSortChange` 用于监听列排序变化，

<code src="./column-sort.tsx"></code>
<!-- ## 筛选

对表格进行筛选，可快速查找到自己想看的数据。

在列中设置 `filters` 和 `filterMethod` 属性即可开启该列的筛选， filters 是一个数组， `filterMethod` 是一个方法，它用于决定某些数据是否显示， 会传入三个参数： `value` , `row` 和 `column` 。

<code src="./filter.tsx"></code> -->

## 自定义列模板

自定义列的显示内容，可组合其他组件使用。

列使用函数渲染： `(data: { $index: number; row: any }) => React.ReactNode`

<code src="./custom-column.tsx"></code>

## 自定义表头

表头支持自定义。

`ElTableColumn` 的 `lable` 不仅仅支持文本，而且支持 `React.ReactNode` 。

<code src="./custom-header.tsx"></code>

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

通过设置 type="expand" 和 children 可以开启展开行功能， `ElTableColumn` 的模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 函数 相同。

<code src="./expandable-row.tsx"></code>

## 树形数据与懒加载

支持树类型的数据的显示。 当 row 中包含 `children` 字段时，被视为树形数据。 渲染嵌套数据需要 prop 的 `rowKey` 。 此外，子行数据可以异步加载。 设置 Table 的 `lazy` 属性为 true 与加载函数 `load` 。 通过指定 row 中的 `hasChildren` 字段来指定哪些行是包含子节点。 `children` 与 `hasChildren` 都可以通过 `treeProps` 配置。

<code src="./tree-and-lazy.tsx"></code>

## 表尾合计行

:::info{title=TODO}
:::

若表格展示的是各类数字，可以在表尾显示各列的合计。

将 `showSummary` 设置为 `true` 就会在表格尾部展示合计行。 默认情况下，对于合计行，第一列不进行数据求合操作，而是显示「合计」二字（可通过 `sumText` 配置），其余列会将本列所有数值进行求合操作，并显示出来。 当然，你也可以定义自己的合计逻辑。 使用 `summaryMethod` 并传入一个方法，返回一个数组，这个数组中的各项就会显示在合计行的各列中， 具体可以参考本例中的第二个表格。

<!-- <code src="./summary.tsx"></code> -->

## 合并行或列

多行或多列共用一个数据时，可以合并行或列。

通过给 table 传入 `spanMethod` 方法可以实现合并行或列， 方法的参数是一个对象，里面包含当前行 `row` 、当前列 `column` 、当前行号 ` rowIndex` 、当前列号 `columnIndex` 四个属性。 该函数可以返回一个包含两个元素的数组，第一个元素代表 `rowspan` ，第二个元素代表 `colspan` 。 也可以返回一个键名为 ` rowspan` 和 `colspan` 的对象。

<code src="./rowspan-and-colspan.tsx"></code>

## 自定义索引

自定义 `type=index` 列的行号。

通过给 ` type=index` 的列传入 index 属性，可以自定义索引。 该属性传入数字时，将作为索引的起始值。 也可以传入一个方法，它提供当前行的行号（从 `0` 开始）作为参数，返回值将作为索引展示。

<code src="./custom-index.tsx"></code>

## 表格布局

通过属性 [table-layout](https://developer.mozilla.org/en-US/docs/Web/CSS/table-layout) 可以指定表格中单元格、行和列的布局方式

<code src="./table-layout.tsx"></code>

## Tooltip 自定义

您可以使用 `tooltipFormatter` 自定义 Tooltip 提示内容。

<code src="./tooltip-formatter.tsx"></code>

## Table API

### Table 属性

| 属性名                | 说明                                                                                                                                                                                                                    | 类型                                                                                                                                                               | Default                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| data                  | 表数据                                                                                                                                                                                                                  | <Enum type="array">any[]</Enum>                                                                                                                                    | []                                                                                          |
| height                | table 的高度。 默认为自动高度。 如果 height 为 number 类型， 单位 px； 如果 height 为 string 类型， 则这个高度会设置为 Table 的 style.height 的值， Table 的高度会受控于外部样式。                                      | `string` / `number`                                                                                                                                                | —                                                                                           |
| maxHeight             | table 的最大高度。 合法的值为数字或者单位为 px 的高度。                                                                                                                                                                 | `string` / `number`                                                                                                                                                | —                                                                                           |
| rowHeight             | 行高                                                                                                                                                                                                                    | `number`                                                                                                                                                           | —                                                                                           |
| stripe                | 是否为斑马纹 table                                                                                                                                                                                                      | `boolean`                                                                                                                                                          | false                                                                                       |
| border                | 是否带有纵向边框                                                                                                                                                                                                        | `boolean`                                                                                                                                                          | false                                                                                       |
| size                  | Table 的尺寸                                                                                                                                                                                                            | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                                     | —                                                                                           |
| fit                   | 列的宽度是否自撑开                                                                                                                                                                                                      | `boolean`                                                                                                                                                          | true                                                                                        |
| showHeader            | 是否显示表头                                                                                                                                                                                                            | `boolean`                                                                                                                                                          | true                                                                                        |
| highlightCurrentRow   | 是否要高亮当前行                                                                                                                                                                                                        | `boolean`                                                                                                                                                          | false                                                                                       |
| currentRowKey         | 当前行的 key， 只写属性                                                                                                                                                                                                 | `string` / `number`                                                                                                                                                | —                                                                                           |
| rowClassName          | 行的 className 的回调方法， 也可以使用字符串为所有行设置一个固定的 className。                                                                                                                                          | <Enum type="Function">(data: { row: any, rowIndex: number }) => string</Enum> / `string`                                                                           | —                                                                                           |
| rowStyle              | 行的 style 的回调方法， 也可以使用一个固定的 Object 为所有行设置一样的 Style。                                                                                                                                          | <Enum type="Function">(data: { row: any, rowIndex: number }) => CSSProperties </Enum> / <Enum type="object">CSSProperties</Enum>                                   | —                                                                                           |
| cellClassName         | 单元格的 className 的回调方法， 也可以使用字符串为所有单元格设置一个固定的 className。                                                                                                                                  | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => string</Enum> / `string`                                         | —                                                                                           |
| cellStyle             | 单元格的 style 的回调方法， 也可以使用一个固定的 Object 为所有单元格设置一样的 Style。                                                                                                                                  | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => CSSProperties</Enum> / <Enum type="object">CSSProperties</Enum>  | —                                                                                           |
| headerRowClassName    | 表头行的 className 的回调方法， 也可以使用字符串为所有表头行设置一个固定的 className。                                                                                                                                  | <Enum type="Function">(data: { row: any, rowIndex: number }) => string</Enum> / `string`                                                                           | —                                                                                           |
| headerRowStyle        | 表头行的 style 的回调方法， 也可以使用一个固定的 Object 为所有表头行设置一样的 Style。                                                                                                                                  | <Enum type="Function">(data: { row: any, rowIndex: number }) => CSSProperties </Enum> / <Enum type="object">CSSProperties</Enum>                                   | —                                                                                           |
| headerCellClassName   | 表头单元格的 className 的回调方法， 也可以使用字符串为所有表头单元格设置一个固定的 className。                                                                                                                          | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => string</Enum> / `string`                                         | —                                                                                           |
| headerCellStyle       | 表头单元格的 style 的回调方法， 也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。                                                                                                                          | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => CSSProperties </Enum> / <Enum type="object">CSSProperties</Enum> | —                                                                                           |
| rowKey                | 行数据的 Key， 用来优化 Table 的渲染； 在使用 `reserveSelection` 功能与显示树形数据时， 该属性是必填的。 类型为 String 时， 支持多层访问： `user.info.id` ， 但不支持 `user.info[0].id` ， 此种情况请使用 `Function` 。 | <Enum type="function">(row: any) => string</Enum> / `string`                                                                                                       | —                                                                                           |
| emptyText             | 空数据时显示的文本内容                                                                                                                                                                                                  | `string`                                                                                                                                                           | No Data                                                                                     |
| defaultExpandAll      | 是否默认展开所有行， 当 Table 包含展开行存在或者为树形表格时有效                                                                                                                                                        | `boolean`                                                                                                                                                          | false                                                                                       |
| expandRowKeys         | 可以通过该属性设置 Table 目前的展开行， 需要设置 row-key 属性才能使用， 该属性为展开行的 keys 数组。                                                                                                                    | <Enum type="array">string[]</Enum>                                                                                                                                 | —                                                                                           |
| defaultSort           | 默认的排序列的 prop 和顺序。 它的 `prop` 属性指定默认的排序的列， `order` 指定默认排序的顺序                                                                                                                            | <Enum type="object">Sort</Enum>                                                                                                                                    | 如果设置了`prop`，但没有设置 `order`，那么 `order`将被默认设置为 ascending                  |
| tooltipEffect         | 溢出的 tooltip 的 `effect`                                                                                                                                                                                              | <Enum type="enum">'dark' \| 'light'</Enum>                                                                                                                         | dark                                                                                        |
| showSummary           | 是否在表尾显示合计行                                                                                                                                                                                                    | `boolean`                                                                                                                                                          | false                                                                                       |
| sumText               | 显示摘要行第一列的文本                                                                                                                                                                                                  | `string`                                                                                                                                                           | Sum                                                                                         |
| summaryMethod         | 自定义的合计计算方法                                                                                                                                                                                                    | <Enum type="Function">(data: { columns: any[], data: any[] }) => (React.ReactNode \| string)[]</Enum>                                                              | —                                                                                           |
| spanMethod            | 合并行或列的计算方法                                                                                                                                                                                                    | <Enum type="Function">(data: { row: any, column: any, rowIndex: number, columnIndex: number }) => number[] \| { rowspan: number, colspan: number } \| void</Enum>  | —                                                                                           |
| selectOnIndeterminate | 在多选表格中， 当仅有部分行被选中时， 点击表头的多选框时的行为。 若为 true， 则选中所有行； 若为 false， 则取消选择所有行                                                                                               | `boolean`                                                                                                                                                          | true                                                                                        |
| indent                | 展示树形数据时， 树节点的缩进                                                                                                                                                                                           | `number`                                                                                                                                                           | 16                                                                                          |
| lazy                  | 是否懒加载子节点数据                                                                                                                                                                                                    | `boolean`                                                                                                                                                          | false                                                                                       |
| load                  | 加载子节点数据的函数， `lazy` 为 true 时生效                                                                                                                                                                            | <Enum type="Function">(row: any, treeNode: TreeNode, resolve: (data: any[]) => void) => void</Enum>                                                                | —                                                                                           |
| treeProps             | 渲染嵌套数据的配置选项                                                                                                                                                                                                  | <Enum type="object">{ hasChildren?: string, children?: string, checkStrictly?: boolean }</Enum>                                                                    | ` object``{ hasChildren: 'hasChildren', children: 'children', checkStrictly: false }</Enum> |
| tableLayout           | 设置表格单元、 行和列的布局方式                                                                                                                                                                                         | <Enum type="enum">'fixed' \| 'auto'</Enum>                                                                                                                         | fixed                                                                                       |
| scrollbarAlwaysOn     | 总是显示滚动条                                                                                                                                                                                                          | `boolean`                                                                                                                                                          | false                                                                                       |
| showOverflowTooltip   | 是否隐藏额外内容并在单元格悬停时使用 Tooltip 显示它们。 这将影响全部列的展示， 详请参考 [tooltip-options](#table-attributes)                                                                                            | `boolean`                                                                                                                                                          | —                                                                                           |
| flexible              | 确保主轴的最小尺寸， 以便不超过内容                                                                                                                                                                                     | `boolean`                                                                                                                                                          | false                                                                                       |
| loading               | 是否为加载状态                                                                                                                                                                                                          | `boolean`                                                                                                                                                          | false                                                                                       |
| expandable            | 仅对 type=expand 的列有效，类型为 Function，Function 的返回值用来决定这一行是否能被展开                                                                                                                                 | <Enum type="Function">(row: any) => Promise<boolean></Enum>                                                                                                        | —                                                                                           |
| hideIconOnNotExpand   | 是否在不能展开行时隐藏展开图标                                                                                                                                                                                          | `boolean`                                                                                                                                                          | false                                                                                       |
| tooltipFormatter      | 自定义 `showOverflowTooltip` 时的 tooltip 内容                                                                                                                                                                          | <Enum type="Function">(data: { row: any, column: any, cellValue: any }) => React.ReactNode \| string</Enum>                                                        | —                                                                                           |
| append                | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作， 可能需要用到这个。 若表格有合计行， 该内容会位于合计行之上。                                                                                      | —                                                                                                                                                                  |                                                                                             |
| columnSortEnabled     | 是否开启列拖拽排序                                                                                                                                                                                                      | `boolean`                                                                                                                                                          | false                                                                                       |

<!-- 以下属性在当前类型定义中未找到 -->
<!-- | tooltipOptions        | 溢出 tooltip 的选项， [参见下述 tooltip 组件](tooltip.html#attributes)                                                                                                                                                  | <Enum type="object">Pick<ElTooltipProps, 'effect' \| 'enterable' \| 'hideAfter' \| 'offset' \| 'placement' \| 'popperClass' \| 'popperOptions' \| 'showAfter' \| 'showArrow'></Enum> | ` object``{ enterable: true, placement: 'top', showArrow: true, hideAfter: 200, popperOptions: { strategy: 'fixed' } }</Enum> | -->
<!-- | scrollbarTabindex     | body 的滚动条的包裹容器 tabindex                                                                                                                                                                                        | `string` / `number`                                                                                                                                                                  | —                                                                                                                             | -->
<!-- | allowDragLastColumn | 是否允许拖动最后一列 | `boolean` | true | -->

### Table 事件

| 事件名             | 说明                                                                                                                       | 类型                                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| onSelect           | 当用户手动勾选数据行的 Checkbox 时触发的事件                                                                               | <Enum type="Function">(selection: any[], row: any) => void</Enum>                                                                                                                    |
| onSelectAll        | 当用户手动勾选全选 Checkbox 时触发的事件                                                                                   | <Enum type="Function">(selection: any[]) => void</Enum>                                                                                                                              |
| onSelectionChange  | 当选择项发生变化时会触发该事件                                                                                             | <Enum type="Function">(newSelection: any[]) => void</Enum>                                                                                                                           |
| onMouseEnter       | 当单元格 hover 进入时会触发该事件                                                                                          | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onMouseLeave       | 当单元格 hover 退出时会触发该事件                                                                                          | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onClick            | 当某个单元格被点击时会触发该事件                                                                                           | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onDblclick         | 当某个单元格被双击击时会触发该事件                                                                                         | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onContextmenu      | 当某个单元格被鼠标右键点击时会触发该事件                                                                                   | <Enum type="Function">(row: any, column: any, cell: HTMLTableCellElement, event: Event) => void</Enum>                                                                               |
| onClick            | 当某一行被点击时会触发该事件                                                                                               | <Enum type="Function">(row: any, column: any, event: Event) => void</Enum>                                                                                                           |
| onContextmenu      | 当某一行被鼠标右键点击时会触发该事件                                                                                       | <Enum type="Function">(row: any, column: any, event: Event) => void</Enum>                                                                                                           |
| onDblclick         | 当某一行被双击时会触发该事件                                                                                               | <Enum type="Function">(row: any, column: any, event: Event) => void</Enum>                                                                                                           |
| onClick            | 当某一列的表头被点击时会触发该事件                                                                                         | <Enum type="Function">(column: any, event: Event) => void</Enum>                                                                                                                     |
| onContextmenu      | 当某一列的表头被鼠标右键点击时触发该事件                                                                                   | <Enum type="Function">(column: any, event: Event) => void</Enum>                                                                                                                     |
| onSortChange       | 当表格的排序条件发生变化的时候会触发该事件                                                                                 | <Enum type="Function">(data: {column: any, prop: string, order: any }) => void</Enum>                                                                                                |
| onColumnSortChange | 拖拽调整列顺序后触发该事件                                                                                                 | <Enum type="Function"> (data: { fromColumn: TableColumnCtx\<T\>; toColumn: TableColumnCtx\<T\>; fromIndex: number; toIndex: number; columns: TableColumnCtx\<T\>[] }) => void</Enum> |
| onFilterChange     | column 的 key， 如果需要使用 filter-change 事件， 则需要此属性标识是哪个 column 的筛选条件                                 | <Enum type="Function">(newFilters: any) => void</Enum>                                                                                                                               |
| onChange           | 当表格的当前行发生变化的时候会触发该事件， 如果要高亮当前行， 请打开表格的 highlight-current-row 属性                      | <Enum type="Function">(currentRow: any, oldCurrentRow: any) => void</Enum>                                                                                                           |
| onDragend          | 当拖动表头改变了列的宽度的时候会触发该事件                                                                                 | <Enum type="Function">(newWidth: number, oldWidth: number, column: any, event: MouseEvent) => void</Enum>                                                                            |
| onChange           | 当用户对某一行展开或者关闭的时候会触发该事件（展开行时， 回调的第二个参数为 expandedRows； 树形表格时第二参数为 expanded） | <Enum type="Function">(row: any, expandedRows: any[]) => void & (row: any, expanded: boolean) => void</Enum>                                                                         |

<!-- 以下事件在当前类型定义中未找到 -->
<!-- | onScroll          | 表格被用户滚动后触发                                                                                                       | <Enum type="Function">({ scrollLeft: number, scrollTop: number }) => void</Enum>                             | -->

### TableRef

| 方法名             | 说明                                                                                                       | Type                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| clearSelection     | 用于多选表格， 清空用户的选择                                                                              | <Enum type="Function">() => void</Enum>                                                      |
| getSelectionRows   | 返回当前选中的行                                                                                           | <Enum type="Function">() => any[]</Enum>                                                     |
| toggleRowSelection | 用于多选表格， 切换某一行的选中状态， 如果使用了第二个参数， 则可直接设置这一行选中与否                    | <Enum type="Function">(row: any, selected?: boolean, ignoreSelectable = true) => void</Enum> |
| toggleAllSelection | 用于多选表格， 切换全选和全不选                                                                            | <Enum type="Function">() => void</Enum>                                                      |
| toggleRowExpansion | 用于可扩展的表格或树表格， 如果某行被扩展， 则切换。 使用第二个参数， 您可以直接设置该行应该被扩展或折叠。 | <Enum type="Function">(row: any, expanded?: boolean) => void</Enum>                          |
| setCurrentRow      | 用于单选表格， 设定某一行为选中行， 如果调用时不加参数， 则会取消目前高亮行的选中状态。                    | <Enum type="Function">(row: any) => void</Enum>                                              |
| clearSort          | 用于清空排序条件， 数据会恢复成未排序的状态                                                                | <Enum type="Function">() => void</Enum>                                                      |
| clearFilter        | 传入由 `columnKey` 组成的数组以清除指定列的过滤条件。 如果没有参数， 清除所有过滤器                        | <Enum type="Function">(columnKeys?: string[]) => void</Enum>                                 |
| doLayout           | 对 Table 进行重新布局。 当表格可见性变化时， 您可能需要调用此方法以获得正确的布局                          | <Enum type="Function">() => void</Enum>                                                      |
| sort               | 手动排序表格。 参数 `prop` 属性指定排序列， `order` 指定排序顺序。                                         | <Enum type="Function">(prop: string, order: string) => void</Enum>                           |
| scrollTo           | 滚动到一组特定坐标                                                                                         | <Enum type="Function">(options: number \| ScrollToOptions, yCoord?: number) => void</Enum>   |
| setScrollTop       | 设置垂直滚动位置                                                                                           | <Enum type="Function">(top?: number) => void</Enum>                                          |
| setScrollLeft      | 设置水平滚动位置                                                                                           | <Enum type="Function">(left?: number) => void</Enum>                                         |
| columns            | 获取表列的 context                                                                                         | <Enum type="array">TableColumnCtx<any>[]</Enum>                                              |

<!-- 以下方法在当前类型定义中未找到 -->
<!-- | updateKeyChildren  | 适用于 lazy Table, 需要设置 `rowKey` , 更新 key children                                                   | <Enum type="Function">(key: string, data: any[]) => void</Enum>                              | -->

## Table-column API

### Table-column 属性

| 属性名              | 说明                                                                                                                                                                                        | Type                                                                                                                                                                                        | 默认值                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| type                | 对应列的类型。 如果设置了 `selection` 则显示多选框； 如果设置了 ` index` 则显示该行的索引（从 1 开始计算）； 如果设置了 ` expand` 则显示为一个可展开的按钮                                  | <Enum type="enum">'default' \| 'selection' \| 'index' \| 'expand'</Enum>                                                                                                                    | default                           |
| index               | 如果设置了 `type=index` ， 可以通过传递 `index` 属性来自定义索引                                                                                                                            | `number` / <Enum type="Function">(index: number) => number</Enum>                                                                                                                           | —                                 |
| label               | 显示的标题                                                                                                                                                                                  | `string`                                                                                                                                                                                    | —                                 |
| columnKey           | column 的 key， column 的 key， 如果需要使用 onFilterChange 事件， 则需要此属性标识是哪个 column 的筛选条件                                                                                 | `string`                                                                                                                                                                                    | —                                 |
| rawColumnKey        | column 的原始 key                                                                                                                                                                           | `string`                                                                                                                                                                                    | —                                 |
| prop                | 字段名称 对应列内容的字段名， 也可以使用 `property` 属性                                                                                                                                    | `string`                                                                                                                                                                                    | —                                 |
| name                | 字段名称 对应列内容的字段名， 也可以使用 prop 属性                                                                                                                                          | `string`                                                                                                                                                                                    | —                                 |
| width               | 对应列的宽度                                                                                                                                                                                | `string` / `number`                                                                                                                                                                         | ''                                |
| minWidth            | 对应列的最小宽度， 对应列的最小宽度， 与 `width` 的区别是 `width` 是固定的， `minWidth` 会把剩余宽度按比例分配给设置了 `minWidth` 的列                                                      | `string` / `number`                                                                                                                                                                         | ''                                |
| fixed               | 列是否固定在左侧或者右侧。 `true` 表示固定在左侧                                                                                                                                            | <Enum type="enum">'left' \| 'right'</Enum> / `boolean`                                                                                                                                      | false                             |
| renderHeader        | 列标题 Label 区域渲染使用的 Function                                                                                                                                                        | <Enum type="Function">(data: { column: any, $index: number }) => void</Enum>                                                                                                                | —                                 |
| sortable            | 对应列是否可以排序， 如果设置为 'custom'， 则代表用户希望远程排序， 需要监听 Table 的 sort-change 事件                                                                                      | `boolean` / `string`                                                                                                                                                                        | false                             |
| sortMethod          | 指定数据按照哪个属性进行排序， 仅当 `sortable` 设置为 `true` 的时候有效。 应该如同 Array.sort 那样返回一个 Number                                                                           | <Enum type="Function">(a: any, b: any) => number</Enum>                                                                                                                                     | —                                 |
| sortBy              | 指定数据按照哪个属性进行排序， 仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。 如果 sort-by 为数组， 则先按照第 1 个属性排序， 如果第 1 个相等， 再按照第 2 个排序， 以此类推 | <Enum type="Function">(row: any, index: number) => string `/` string `/` object``string[]</Enum>                                                                                            | —                                 |
| sortOrders          | 数据在排序时所使用排序策略的轮转顺序， 仅当 sortable 为 true 时有效。 需传入一个数组， 随着用户点击表头， 该列依次按照数组中元素的顺序进行排序                                              | <Enum type="object">('ascending' \| 'descending' \| null)[]</Enum>                                                                                                                          | ['ascending', 'descending', null] |
| resizable           | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）                                                                                                                    | `boolean`                                                                                                                                                                                   | true                              |
| formatter           | 用来格式化内容                                                                                                                                                                              | <Enum type="function">(row: any, column: any, cellValue: any, index: number) => React.ReactNode \| string</Enum>                                                                            | —                                 |
| showOverflowTooltip | 当内容过长被隐藏时显示 tooltip                                                                                                                                                              | `boolean`                                                                                                                                                                                   | undefined                         |
| align               | 对齐方式                                                                                                                                                                                    | <Enum type="enum">'left' \| 'center' \| 'right'</Enum>                                                                                                                                      | left                              |
| headerAlign         | 表头对齐方式， 若不设置该项， 则使用表格的对齐方式                                                                                                                                          | <Enum type="enum">'left' \| 'center' \| 'right'</Enum>                                                                                                                                      | left                              |
| className           | 列的 className                                                                                                                                                                              | `string`                                                                                                                                                                                    | —                                 |
| labelClassName      | 当前列标题的自定义类名                                                                                                                                                                      | `string`                                                                                                                                                                                    | —                                 |
| selectable          | 仅对 type=selection 的列有效， 类型为 Function， Function 的返回值用来决定这一行的 CheckBox 是否可以勾选                                                                                    | <Enum type="Function">(row: any, index: number) => boolean</Enum>                                                                                                                           | —                                 |
| reserveSelection    | 数据刷新后是否保留选项， 仅对 ` type=selection` 的列有效， 请注意， 需指定 `rowKey` 来让这个功能生效。                                                                                      | `boolean`                                                                                                                                                                                   | false                             |
| filters             | 数据过滤的选项， 数组格式， 数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性。                                                                           | <Enum type="array">Array<{text: string, value: string}></Enum>                                                                                                                              | —                                 |
| filterPlacement     | 过滤弹出框的定位                                                                                                                                                                            | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | —                                 |

<!-- 以下属性在当前类型定义中未找到 -->
<!-- | filterClassName     | 过滤弹出框的 className                                                                                                                                                                      | `string`                                                                                                                                                                                    | —                                 | -->

| filterMultiple | 数据过滤的选项是否多选 | `boolean` | true |
| filterMethod | 数据过滤使用的方法， 如果是多选的筛选项， 对每一条数据会执行多次， 任意一次返回 true 就会显示。 | <Enum type="Function">(value: any, row: any, column: any) => void</Enum> | — |
| filteredValue | 选中的数据过滤项， 如果需要自定义表头过滤的渲染方式， 可能会需要此属性。 | <Enum type="object">string[]</Enum> | — |
| tooltipFormatter | 使用 `showOverflowTooltip` 时自定义 tooltip 内容 | <Enum type="Function">(data: { row: any, column: any, cellValue: any }) => React.ReactNode \| string</Enum> | — |

## Type Declarations

<details open>
  <summary>显示类型声明</summary>

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
