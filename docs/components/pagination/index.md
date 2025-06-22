---
title: Pagination 分页
lang: zh-CN
---

# Pagination 分页

当数据量过多时，使用分页分解数据。

## 基础用法

设置 `layout` ，表示需要显示的内容，用逗号分隔，布局元素会依次显示。 分页元素如下： `prev` (上一页按钮), `next` (下一页按钮), `pager` (分页列表), `jumper` (跳转), `total` (总计), `sizes` (每页条数选择) 和 `->` (every element after this symbol will be pulled to the right).

<code src="./basic-usage.tsx"></code>

## 设置最大页码按钮数

默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。 通过 `pagerCount` 属性可以设置最大页码按钮数。

<code src="./number-of-pagers.tsx"></code>

## 带有背景色的分页

设置 `background` 属性可以为分页按钮添加背景色。

<code src="./background-color.tsx"></code>

## 小型分页

在空间有限的情况下，可以使用简单的小型分页。

通过 `size` 更改大小 这是个 `small` 的例子

<code src="./small-pagination.tsx"></code>

## 当只有一页时隐藏分页

当只有一页时，通过设置 `hideOnSinglePage` 属性来隐藏分页。

<code src="./auto-hide-pagination.tsx"></code>

## 附加功能

根据场景需要，可以添加其他功能模块。

此示例是一个完整的用例。 使用了 `sizeChange` 和 `currentChange` 事件来处理页码大小和当前页变动时候触发的事件。 `pageSizes` 接受一个整数类型的数组，数组元素为展示的选择每页显示个数的选项， `[100, 200, 300, 400]` 表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。

<code src="./more-elements.tsx"></code>

## API

### 属性

| 属性名             | 说明                                                          | 类型                                                                                                                  | 默认值                               |
| ------------------ | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| size               | 分页大小                                                      | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                          | —                                    |
| background         | 是否为分页按钮添加背景色                                      | `boolean`                                                                                                             | false                                |
| pageSize           | 每页显示条目个数                                              | `number`                                                                                                              | 10                                   |
| defaultPageSize    | 每页默认的条目个数，不设置时默认为 10                         | `number`                                                                                                              | -                                    |
| total              | 总条目数                                                      | `number`                                                                                                              | —                                    |
| pagerCount         | 设置最大页码按钮数。 页码按钮的数量，当总页数超过该值时会折叠 | `number`                                                                                                              | 7                                    |
| currentPage        | 当前页数                                                      | `number`                                                                                                              | 1                                    |
| defaultCurrentPage | 当前页数的初始值，不设置时默认为 1                            | `number`                                                                                                              | -                                    |
| layout             | 组件布局，子组件名用逗号分隔                                  | <Enum type="string"> `string (consists of sizes, prev, pager, next, jumper, ->, total)` </Enum>                       | prev, pager, next, jumper, ->, total |
| pageSizes          | 每页显示个数选择器的选项设置                                  | ` array` `number[] `                                                                                                  | [10, 20, 30, 40, 50, 100]            |
| prevText           | 替代图标显示的上一页文字                                      | `string`                                                                                                              | —                                    |
| prevIcon           | 上一页的图标， 比 `prevText` 优先级更高                       | `string` / `Component`                                                                                                | angle-left                           |
| nextText           | 替代图标显示的下一页文字                                      | `string`                                                                                                              | —                                    |
| nextIcon           | 下一页的图标， 比 `nextText` 优先级更高                       | `string` / `Component`                                                                                                | angle-right                          |
| disabled           | 是否禁用分页                                                  | `boolean`                                                                                                             | false                                |
| hideOnSinglePage   | 只有一页时是否隐藏                                            | `boolean`                                                                                                             | false                                |
| simple             | 当添加该属性时，显示为简单分页                                | `boolean`                                                                                                             | false                                |
| showTotal          | 用于显示数据总量和当前数据顺序                                | <Enum type="Function">(total: number, [from, to]: [number, number]) => React.ReactElement \| boolean \| string</Enum> | —                                    |

:::error{title=WARNING}

我们现在会检查一些不合理的用法，如果发现分页器未显示，可以核对是否违反以下情形：

-   `total` 必须传，不然组件无法判断总页数；
-   如果传入了 `currentPage`，必须监听 `currentPage` 变更的事件（`onChange`），否则分页切换不起作用；
-   如果传入了 `pageSize`，且布局包含 pageSize 选择器（即 `layout` 包含 `sizes`），必须监听 `pageSize` 变更的事件（`onSizeChange`），否则分页大小的变化将不起作用。

:::

### 事件

| 事件名       | 说明                     | 类型                                                                         |
| ------------ | ------------------------ | ---------------------------------------------------------------------------- |
| onSizeChange | `pageSize` 改变时触发    | <Enum type='Function'>(pageSize: number, currentPage: number) => void</Enum> |
| onChange     | `currentPage` 改变时触发 | <Enum type='Function'>(currentPage: number, pageSize: number) => void</Enum> |
