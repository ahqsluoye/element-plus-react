---
title: Transfer 穿梭框
lang: zh-CN
---

<Meta></Meta>

# Transfer 穿梭框

## 基础用法

Transfer 的数据通过 `data` 属性传入。 数据需要是一个对象数组，每个对象有以下属性：`key` 为数据的唯一性标识，`label` 为显示文本，`disabled` 表示该项数据是否禁止被操作。 目标列表中的数据项会同步到绑定至 `value` 的变量，值为数据项的 `key` 所组成的数组。 当然，如果希望在初始状态时目标列表不为空，可以像本例一样为 `value` 绑定的变量赋予一个初始值。

<code src="./basic.tsx"></code>

## 可搜索过滤

在数据很多的情况下，可以对数据进行搜索和过滤。

设置 `filterable` 为 `true` 即可开启搜索模式。 默认情况下，若数据项的 `label` 属性包含搜索关键字，则会在搜索结果中显示。 你也可以使用 `filterMethod` 定义自己的搜索逻辑。 `filterMethod` 接收一个方法，当搜索关键字变化时，会将当前的关键字和每个数据项传给该方法。 若方法返回 `true`，则会在搜索结果中显示对应的数据项。

<code src="./filterable.tsx"></code>

## 自定义

可以对列表标题文案、按钮文案、数据项的渲染函数、列表底部的勾选状态文案、列表底部的内容区等进行自定义。

可以使用 `titles`、`buttonTexts`、`renderContent` 和 `format` 属性分别对列表标题文案、按钮文案、数据项的渲染函数和列表顶部的勾选状态文案进行自定义。 对于列表底部的内容区，提供了两个格式化函数：`leftFooter` 和 `rightFooter`。 此外，如果希望某些数据项在初始化时就被勾选，可以使用 `leftDefaultChecked` 和 `rightDefaultChecked` 属性。 最后，本例还展示了 `onChange` 事件的用法。

<code src="./customizable.tsx"></code>

## 自定义空内容

您可以自定义列表为空或未找到筛选结果时显示的内容。

使用 `left-empty` 和 `right-empty` 插槽来自定义每个面板的空内容。

<code src="./empty-content.tsx"></code>

## 数据项属性别名

默认情况下，Transfer 仅能识别数据项中的 `key`、`label` 和 `disabled` 字段。 如果你的数据的字段名不同，可以使用 `props` 属性为它们设置别名。

本例中的数据源没有 `key` 和 `label` 字段，在功能上与它们相同的字段名为 `value` 和 `desc`。 因此可以使用`props` 属性为 `key` 和 `label` 设置别名。

<code src="./prop-alias.tsx"></code>

## Transfer API

### Transfer 属性

| 属性名                      | 说明                                       | 类型                                                                               | 默认值 |
| --------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------- | ------ |
| value                       | 选中项绑定值(可控模式)                     | <Enum type="array">Array<string \| number></Enum>                                  | []     |
| defaultValue                | 默认选中项绑定值                           | <Enum type="array">Array<string \| number></Enum>                                  | []     |
| data                        | Transfer 的数据源                          | <Enum type="array">Record<string, any>[]</Enum>                                    | []     |
| filterable                  | 是否可搜索                                 | `boolean`                                                                          | false  |
| filterPlaceholder           | 搜索框占位符                               | `string`                                                                           | —      |
| filterMethod                | 自定义搜索方法                             | <Enum type="Function">(query: string, item: Record<string, any>) => boolean</Enum> | —      |
| titles                      | 自定义列表标题                             | <Enum type="array">[string, string]</Enum>                                         | []     |
| buttonTexts                 | 自定义按钮文案                             | <Enum type="array">[string, string]</Enum>                                         | []     |
| renderContent               | 自定义数据项渲染函数                       | <Enum type="object">TransferRender</Enum>                                          | —      |
| format                      | 列表顶部勾选状态文案                       | <Enum type="object">TransferFormat</Enum>                                          | {}     |
| [props](#type-declarations) | 数据源的字段别名                           | <Enum type="object">TransferPropsAlias</Enum>                                      | —      |
| leftDefaultChecked          | 初始状态下左侧列表的已勾选项的 key 数组    | <Enum type="array">Array<string \| number></Enum>                                  | []     |
| rightDefaultChecked         | 初始状态下右侧列表的已勾选项的 key 数组    | <Enum type="array">Array<string \| number></Enum>                                  | []     |
| leftFooter                  | 左侧列表底部的内容                         | <Enum type="Function">(props: TransferListProps) => React.ReactElement</Enum>      | —      |
| rightFooter                 | 右侧列表底部的内容                         | <Enum type="Function">(props: TransferListProps) => React.ReactElement</Enum>      | —      |
| leftEmpty                   | 左侧面板为空或没有数据符合筛选条件时的内容 | No Data                                                                            | —      |
| rightEmpty                  | 右侧面板为空或没有数据符合筛选条件时的内容 | No Data                                                                            | —      |

<!-- | targetOrder                 | 右侧列表元素的排序策略： 若为 `original`，则保持与数据源相同的顺序； 若为 `push`，则新加入的元素排在最后； 若为 `unshift`，则新加入的元素排在最前 | <Enum type="enum">'original' \| 'push' \| 'unshift'</Enum>                         | original | -->
<!-- | validateEvent               | 是否触发表单验证                                                                                                                                  | `boolean`                                                                          | true     | -->

### Transfer 事件

| 事件名             | 说明                                    | 类型                                                                                                                |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| onChange           | 右侧列表元素变化时触发                  | <Enum type="Function">(value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => void</Enum> |
| onLeftCheckChange  | 左侧列表元素被用户选中 / 取消选中时触发 | <Enum type="Function">(value: TransferKey[], movedKeys?: TransferKey[]) => void</Enum>                              |
| onRightCheckChange | 右侧列表元素被用户选中 / 取消选中时触发 | <Enum type="Function">(value: TransferKey[], movedKeys?: TransferKey[]) => void</Enum>                              |

<!-- ### Transfer Exposes

| 名称       | 说明                     | 类型                                                            |
| ---------- | ------------------------ | --------------------------------------------------------------- |
| clearQuery | 清空某个面板的搜索关键词 | <Enum type="Function">(which: TransferDirection) => void</Enum> |
| leftPanel  | 左侧面板 ref             | <Enum type="object">TransferPanelInstance</Enum>                |
| rightPanel | 右侧面板 ref             | <Enum type="object">TransferPanelInstance</Enum>                | -->

## Type Declarations

<details>
  <summary>显示类型声明</summary>

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
