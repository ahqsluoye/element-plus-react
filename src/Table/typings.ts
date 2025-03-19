/* eslint-disable lines-around-comment */
import { Placement } from '@popperjs/core';
import React, { RefObject } from 'react';
import { ScrollbarRef } from '../Scrollbar';
import { BaseProps, NativeProps } from '../types/common';

type CI<T> = { column: TableColumnCtx<T>; $index: number };

type Filters = {
    text: string;
    value: string;
}[];

type FilterMethods<T> = (value: any, row: T, column: TableColumnCtx<T>) => void;

export type RenderCell<T> = { $index: number; row: T; column?: TableColumnCtx<T> };

export type TableColumnProps<T> = {
    /** 对应列的类型。 如果设置了selection则显示多选框； 如果设置了 index 则显示该行的索引（从 1 开始计算）； 如果设置了 expand 则显示为一个可展开的按钮 */
    type?: 'selection' | 'index' | 'expand' | 'drag';
    /** 如果设置了 type=index，可以通过传递 index 属性来自定义索引 */
    index?: number | ((index: number, row?: T) => number);
    /** column 的 key，如果需要使用 filterChange 事件，则需要此属性标识是哪个 column 的筛选条件 */
    label?: string | React.ReactElement;
    /**  */
    className?: string;
    /** 当前列标题的自定义类名 */
    labelClassName?: string;
    /** 字段名称 对应列内容的字段名， 也可以使用 prop 属性 */
    name?: string;
    /** 字段名称 对应列内容的字段名， 也可以使用 name 属性 */
    prop?: string;
    /** 对应列的宽度 */
    width?: number;
    /** 对应列的最小宽度， 对应列的最小宽度， 与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列 */
    minWidth?: number;
    /** 列标题 Label 区域渲染使用的 Function */
    renderHeader?: (data: CI<T>) => React.ReactElement;
    /** 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sortChange 事件 */
    sortable?: boolean | 'custom';
    /** 指定数据按照哪个属性进行排序，仅当sortable设置为true的时候有效。 应该如同 Array.sort 那样返回一个 Number */
    sortMethod?: (a: T, b: T) => number;
    /** 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sortMethod 的时候有效。 如果 sortBy 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 */
    sortBy?: string | /* ((row: T, index: number) => string) | */ string[];
    /** 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序 */
    sortOrders?: ('ascending' | 'descending' | null)[];
    /** 对应列是否可以通过拖动改变宽度（需要在 elTable 上设置 border 属性为真） */
    resizable?: boolean;
    /** column 的 key， column 的 key， 如果需要使用 filterChange 事件，则需要此属性标识是哪个 column 的筛选条件 */
    columnKey?: string;
    /**  */
    rawColumnKey?: string;
    /**  */
    align?: 'left' | 'center' | 'right';
    /** 表头对齐方式， 若不设置该项，则使用表格的对齐方式 */
    headerAlign?: 'left' | 'center' | 'right';
    /** 当内容过长被隐藏时显示 tooltip */
    showOverflowTooltip?: boolean;
    /** 列是否固定在左侧或者右侧。 true 表示固定在左侧 */
    fixed?: boolean | 'left' | 'right';
    /** 用来格式化内容 */
    formatter?: (row: T, column: TableColumnCtx<T>, cellValue: any, index: number) => React.ReactElement | string;
    /** 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 */
    selectable?: (row: T, index: number) => boolean;
    /** 分页保留勾选项，仅对  type=selection 的列有效， 请注意， 需指定 rowKey 来让这个功能生效 */
    reserveSelection?: boolean;
    /** 数据过滤使用的方法， 如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示 */
    filterMethod?: FilterMethods<T>;
    /** 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性 */
    filteredValue?: string[];
    /** 数据过滤的选项， 数组格式，数组中的元素需要有 text 和 value 属性。 数组中的每个元素都需要有 text 和 value 属性 */
    filters?: Filters;
    /** 过滤弹出框的定位 */
    filterPlacement?: Placement;
    /** 数据过滤的选项是否多选 */
    filterMultiple?: boolean;
    /** 子组件 */
    children?: React.ReactElement<TableColumnProps<T>> | React.ReactElement<TableColumnProps<T>>[] | ((data: RenderCell<T>) => React.ReactElement | string | number);
};

export type TableColumnCtx<T> = Omit<TableColumnProps<T>, 'children'> & {
    /**  */
    id?: string;
    /**  */
    realWidth?: number;
    /**  */
    offsetWidth?: number;
    /**  */
    renderCell?: (data: RenderCell<T>) => React.ReactElement;
    /**  */
    colSpan?: number;
    /**  */
    rowSpan?: number;
    /**  */
    children?: TableColumnCtx<T>[];
    /**  */
    level?: number;
    /**  */
    filterable?: boolean | FilterMethods<T> | Filters;
    /**  */
    order?: string;
    /**  */
    isColumnGroup?: boolean;
    /**  */
    isSubColumn?: boolean;
    /**  */
    columns?: TableColumnCtx<T>[];
    /**  */
    getColumnIndex?: () => number;
    /**  */
    no?: number;
    /**  */
    filterOpened?: boolean;
};

export interface TreeNode {
    id?: string;
    parentId?: string;
    /** 是否已展开 */
    expanded?: boolean;
    /** 是否加载中 */
    loading?: boolean;
    /** 是否没有懒加载子节点 */
    noLazyChildren?: boolean;
    /** 缩进宽度 */
    indent?: number;
    /** 树的层级 */
    level?: number;
    /** 是否显示 */
    display?: boolean;
}

export interface TableEvents<T> {
    /** 当用户手动勾选数据行的 Checkbox 时触发的事件 */
    onSelect?: (selection: T[], row: T) => void;
    /** 当用户手动勾选全选 Checkbox 时触发的事件  */
    onSelectAll?: (selection: T[]) => void;
    /** 当选择项发生变化时会触发该事件  */
    onSelectionChange?: (selection: T[]) => void;
    /** 当单元格 hover 进入时会触发该事件  */
    onCellMouseEnter?: (row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: React.MouseEvent<Element>) => void;
    /** 当单元格 hover 退出时会触发该事件  */
    onCellMouseLeave?: (row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: React.MouseEvent<Element>) => void;
    /** 当某个单元格被点击时会触发该事件  */
    onCellClick?: (row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: React.MouseEvent<Element>) => void;
    /** 当某个单元格被双击击时会触发该事件  */
    onCellDblclick?: (row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: React.MouseEvent<Element>) => void;
    /** 当某个单元格被鼠标右键点击时会触发该事件  */
    onCellContextmenu?: (row: T, column: TableColumnCtx<T>, cell: HTMLTableCellElement, event: React.MouseEvent<Element>) => void;
    /** 当某一行被点击时会触发该事件  */
    onRowClick?: (row: T, column: TableColumnCtx<T>, event: React.MouseEvent<Element>) => void;
    /** 当某一行被鼠标右键点击时会触发该事件  */
    onRowContextmenu?: (row: T, column: TableColumnCtx<T>, event: React.MouseEvent<Element>) => void;
    /** 当某一行被双击时会触发该事件  */
    onRowDblclick?: (row: T, column: TableColumnCtx<T>, event: React.MouseEvent<Element>) => void;
    /** 当某一列的表头被点击时会触发该事件  */
    onHeaderClick?: (column: TableColumnCtx<T>, event: React.MouseEvent<Element>) => void;
    /** 当某一列的表头被鼠标右键点击时触发该事件  */
    onHeaderContextmenu?: (column: TableColumnCtx<T>, event: React.MouseEvent<Element>) => void;
    /** 当表格的排序条件发生变化的时候会触发该事件  */
    onSortChange?: (data: { column: TableColumnCtx<T>; prop: string; order: 'ascending' | 'descending' }) => T[];
    /** column 的 key， 如果需要使用 filterChange 事件，则需要此属性标识是哪个 column 的筛选条件  */
    onFilterChange?: (filters: any) => void;
    /** 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlightCurrentRow 属性  */
    onCurrentChange?: (currentRow: T, oldCurrentRow: T) => void;
    /** 当拖动表头改变了列的宽度的时候会触发该事件  */
    onHeaderDragend?: (newWidth: number, oldWidth: number, column: TableColumnCtx<T>, event: React.MouseEvent<Element>) => void;
    /** 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）  */
    onExpandChange?: (row: T, expandedRows: boolean | string[]) => void;
    /** 拖拽排序后的回调 */
    onDragChange?: (data: T[]) => void;
}

export interface TableProps<T>
    extends BaseProps,
        NativeProps<
            | '--el-table-border-color'
            | '--el-table-border'
            | '--el-table-text-color'
            | '--el-table-header-text-color'
            | '--el-table-row-hover-bg-color'
            | '--el-table-row-strip-bg-color'
            | '--el-table-current-row-bg-color'
            | '--el-table-header-bg-color'
            | '--el-table-fixed-box-shadow'
            | '--el-table-bg-color'
            | '--el-table-tr-bg-color'
            | '--el-table-expanded-cell-bg-color'
            | '--el-table-fixed-left-column'
            | '--el-table-fixed-right-column'
            | '--el-table-min-height'
        >,
        TableEvents<T> {
    /** 显示的数据 */
    data: T[];
    /** Table 的高度， 默认为自动高度。 如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式 */
    height?: string | number;
    /** Table 的最大高度。 合法的值为数字或者单位为 px 的高度 */
    maxHeight?: string | number;
    /** 行高 */
    rowHeight?: number;
    /** 是否为斑马纹 */
    stripe?: boolean;
    /** 是否带有纵向边框 */
    border?: boolean;
    /** Table 的尺寸 */
    size?: 'large' | 'default' | 'small';
    /** 列的宽度是否自撑开 */
    fit?: boolean;
    /** 是否显示表头 */
    showHeader?: boolean;
    /** 是否要高亮当前行 */
    highlightCurrentRow?: boolean;
    /** 当前行的 key，只写属性 */
    currentRowKey?: string | number;
    /** 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className */
    rowClassName?: ((data: { row: T; rowIndex: number }) => string) | string;
    /** 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style */
    rowStyle?: ((data: { row: T; rowIndex: number }) => React.CSSProperties) | React.CSSProperties;
    /** 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className */
    cellClassName?: ((data: { row: T; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) => string) | string;
    /** 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style */
    cellStyle?: ((data: { row: T; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) => React.CSSProperties) | React.CSSProperties;
    /** 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className */
    headerRowClassName?: ((data: { row: T; rowIndex: number }) => string) | string;
    /** 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style */
    headerRowStyle?: ((data: { row: T; rowIndex: number }) => React.CSSProperties) | React.CSSProperties;
    /** 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className */
    headerCellClassName?: ((data: { row: T; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) => string) | string;
    /** 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style */
    headerCellStyle?: ((data: { row: T; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) => React.CSSProperties) | React.CSSProperties;
    /** 行数据的 Key，用来优化 Table 的渲染； 在使用reserveSelection功能与显示树形数据时，该属性是必填的。 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function */
    rowKey?: string | ((data: { row: T }) => string);
    /** 空数据时显示的文本内容 */
    emptyText?: string;
    /** 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 */
    append?: React.ReactElement;
    /** 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 */
    defaultExpandAll?: boolean;
    /** 可以通过该属性设置 Table 目前的展开行，需要设置 rowKey 属性才能使用，该属性为展开行的 keys 数组 */
    expandRowKeys?: string[];
    /** 默认的排序列的 prop 和顺序。 它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序 */
    defaultSort?: TableSort;
    /** tooltip effect 属性 */
    tooltipEffect?: 'dark' | 'light';
    /** 是否在表尾显示合计行 */
    showSummary?: boolean;
    /** 合计行第一列的文本 */
    sumText?: string;
    /** 自定义的合计计算方法 */
    summaryMethod?: (data: { columns: TableColumnCtx<T>[]; data: T[] }) => string[];
    /** 合并行或列的计算方法 */
    spanMethod?: (data: { row: T; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) =>
        | number[]
        | {
              rowspan: number;
              colspan: number;
          }
        | undefined;
    /** 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。 若为 true，则选中所有行；若为 false，则取消选择所有行 */
    selectOnIndeterminate?: boolean;
    /** 展示树形数据时，树节点的缩进 */
    indent?: number;
    /** 是否懒加载子节点数据 */
    lazy?: boolean;
    /** 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息 */
    load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void;
    /** 渲染嵌套数据的配置选项 */
    treeProps?: { hasChildren?: string; children?: string };
    /** 设置表格单元、行和列的布局方式 */
    tableLayout?: 'fixed' | 'auto';
    /** 总是显示滚动条 */
    scrollbarAlwaysOn?: boolean;
    /** 确保主轴的最小尺寸 */
    flexible?: boolean;
    /** 是否为加载状态 */
    loading?: boolean;
    /** 仅对 type=expand 的列有效，类型为 Function，Function 的返回值用来决定这一行是否能被展开 */
    expandable?: (row: T) => Promise<boolean>;
    /** 是否在不能展开行时隐藏展开图标 */
    hideIconOnNotExpand?: boolean;
    /** 子组件 */
    children: React.ReactElement<TableColumnProps<T>> | React.ReactElement<TableColumnProps<T>>[];
}

export interface TableSort {
    prop?: string;
    order: 'ascending' | 'descending';
    init?: any;
    silent?: any;
}

export interface TableRefs {
    /** 表格div*/
    tableWrapper: RefObject<HTMLDivElement>;
    /** 表格内容div */
    innerWrpper: RefObject<HTMLDivElement>;
    /** 表格头部div */
    headerWrapper: RefObject<HTMLDivElement>;
    /** 表格底部div */
    footerWrapper: RefObject<HTMLDivElement>;
    /** 表格滚动条ref */
    scrollBarRef: RefObject<ScrollbarRef>;
    /** 拖动改变宽度辅助线 */
    resizeHelper: RefObject<HTMLDivElement>;
    /** 表格头部table */
    tableHeader: RefObject<HTMLTableElement>;
    /** 表格内容table */
    tableBody: RefObject<HTMLTableElement>;
    /** 无内容div */
    emptyBlock: RefObject<HTMLDivElement>;
}

export interface TableRef<T> {
    refs: TableRefs;
    /** 用于多选表格，清空用户的选择 */
    clearSelection: () => void;
    /** 返回当前选中的行	 */
    getSelectionRows: () => T[];
    /** 用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否 */
    toggleRowSelection: (row: T, selected: boolean) => void;
    /** 用于多选表格，切换全选和全不选	— */
    toggleAllSelection: () => void;
    /** 用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。	row, expanded */
    toggleRowExpansion?: () => void;
    /** 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态 */
    setCurrentRow: (row?: T | null) => void;
    /** 用于清空排序条件，数据会恢复成未排序的状态	— */
    clearSort?: () => void;
    /** 传入由columnKey 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器	columnKeys */
    clearFilter?: () => void;
    /** 对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局	— */
    doLayout: () => void;
    /** 手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。	prop: string, order: string */
    sort?: () => void;
    /** 滚动到一组特定坐标 */
    // eslint-disable-next-line no-undef
    scrollTo?: (options: ScrollToOptions | number, yCoord?: number) => void;
    /** 设置滚动条到顶部的距离 */
    setScrollTop?: (value: number) => void;
    /** 设置滚动条到左边的距离 */
    setScrollLeft?: (value: number) => void;
    /** 设置表格高度 */
    setHeight: (height: string | number) => void;
}
