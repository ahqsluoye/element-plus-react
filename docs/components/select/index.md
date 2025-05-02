---
title: Select 选择器
lang: zh-CN
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 `value` 的值为当前被选中的 `ElOption` 的 value 属性值

<code src="./basic-usage.tsx"></code>

## 有禁用选项

在 `ElOption` 中，设定 `disabled` 值为 true，即可禁用该选项

<code src="./disabled-option.tsx"></code>

## 禁用状态

禁用整个选择器组件

为 `ElSelect` 设置 `disabled`属性，则整个选择器不可用。

<code src="./disabled.tsx"></code>

<!-- ## 可清空单选

您可以使用清除图标来清除选择。

为 `ElSelect` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

<code src="./clearable.tsx"></code> -->

## 基础多选

多选选择器使用 tag 组件来展示已选中的选项。

为 `ElSelect` 设置 `multiple` 属性即可启用多选， 此时 `value` 的值为当前选中值所组成的数组。 默认情况下选中值会以 Tag 组件的形式展现， 你也可以设置 `collapseTags` 属性将它们合并为一段文字。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<code src="./multiple.tsx"></code>

## 自定义模板

你可以自定义如何来渲染每一个选项。

将自定义的 HTML 模板插入 `ElOption` 的 slot 中即可。

<code src="./custom-template.tsx"></code>

## 将选项进行分组

你可以为选项进行分组来区分不同的选项

使用 `el-option-group` 对备选项进行分组，它的 `label` 属性为分组名

<code src="./grouping.tsx"></code>

## 筛选选项

可以利用筛选功能快速查找选项。

为`ElSelect`添加`filterable`属性即可启用搜索功能。 默认情况下，Select 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filterMethod` 来实现。 `filterMethod` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

<code src="./filterable.tsx"></code>

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remoteMethod`。 `remoteMethod`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `ElOption` 是通过 `vFor` 指令渲染出来的，此时需要为 `ElOption` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

<code src="./remote-search.tsx"></code>

## 创建新的选项

创建并选中未包含在初始选项中的条目。

通过使用 `allowCreate` 属性，用户可以通过输入框创建新项目。 为了使 `allowCreate` 正常工作， `filterable` 的值必须为 `true`。 本例还使用了 `default-first-option` 属性， 在该属性为 `true` 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

<code src="./allow-create.tsx"></code>

:::info{title=TIP}

如果 Select 的绑定值为对象类型，请务必指定 `valueKey` 作为它的唯一性标识。

:::

## Select API

### Select 属性

| 属性名              | 说明                                                                                                   | 类型                                                            | Default |
| ------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------- |
| value               | 选中项绑定值                                                                                           | `string` / `number` / `array`                                   | —       |
| multiple            | 是否多选                                                                                               | `boolean`                                                       | false   |
| disabled            | 是否禁用                                                                                               | `boolean`                                                       | false   |
| size                | 输入框尺寸                                                                                             | <Enum>'' \| 'large' \| 'default' \| 'small'</Enum>              | —       |
| clearable           | 是否可以清空选项                                                                                       | `boolean`                                                       | false   |
| collapseTags        | 多选时是否将选中值按文字的形式展示                                                                     | `boolean`                                                       | false   |
| collapseTagsTooltip | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，`collapseTags`属性必须设定为 true | `boolean`                                                       | false   |
| maxCollapseTags     | 需要显示的 Tag 的最大数量 只有当 `collapseTags` 设置为 true 时才会生效。                               | `number`                                                        | 1       |
| name                | Select 输入框的原生 name 属性                                                                          | `string`                                                        | —       |
| effect              | tooltip 主题，内置了 `dark` / `light` 两种                                                             | <Enum>'dark' \| 'light'</Enum> / `string`                       | light   |
| placeholder         | 占位符，默认为“Select”                                                                                 | `string`                                                        | —       |
| filterable          | Select 组件是否可筛选                                                                                  | `boolean`                                                       | false   |
| allowCreate         | 是否允许用户创建新条目， 只有当 `filterable` 设置为 true 时才会生效。                                  | `boolean`                                                       | false   |
| filterMethod        | 自定义筛选方法                                                                                         | <Enum type="Function">() => void</Enum>                         | —       |
| remote              | 其中的选项是否从服务器远程加载                                                                         | `boolean`                                                       | false   |
| remoteMethod        | 自定义远程搜索方法                                                                                     | <Enum type="Function">() => void</Enum>                         | —       |
| loading             | 是否正在从远程获取数据                                                                                 | `boolean`                                                       | false   |
| loadingText         | 从服务器加载数据时显示的文本，默认为“Loading”                                                          | `string`                                                        | —       |
| noMatchText         | 搜索条件无匹配时显示的文字，也可以使用 `empty` 插槽设置，默认是 “No matching data'”                    | `string`                                                        | —       |
| noDataText          | 无选项时显示的文字，也可以使用 `empty` 插槽设置自定义内容，默认是 “No data”                            | `string`                                                        | —       |
| popperClass         | 选择器下拉菜单的自定义类名                                                                             | `string`                                                        | ''      |
| tagType             | 标签类型                                                                                               | <Enum>'' \| 'success' \| 'info' \| 'warning' \| 'danger'</Enum> | info    |
| tagEffect           | 标签效果                                                                                               | <Enum>'' \| 'light' \| 'dark' \| 'plain'</Enum>                 | light   |
| offset              | 下拉面板偏移量                                                                                         | `number`                                                        | 12      |
| showArrow           | 下拉菜单的内容是否有箭头                                                                               | `boolean`                                                       | true    |

<!--
| suffixIcon          | 自定义后缀图标组件                                                                                     | `string` / ` object` / `Component`                              | ArrowDown |
| fitInputWidth       | 下拉框的宽度是否与输入框相同                                                                           | `boolean`                                                       | false       |
| clearIcon           | 自定义清除图标                                                                                         | `string` / ` object``Component `                                | CircleClose |
| reserveKeyword      | 当 `multiple` 和 `filterable`被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词                | `boolean`                                                       | true        |
| multipleLimit       | `multiple` 属性设置为 `true` 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制                | `number`                                                        | 0           |
-->

### Select 事件

| 事件名          | 说明                                     | Type                                                    |
| --------------- | ---------------------------------------- | ------------------------------------------------------- |
| onChange        | 选中值发生变化时触发                     | <Enum type="Function">(value: any) => void</Enum>       |
| onVisibleChange | 下拉框出现/隐藏时触发                    | <Enum type="Function">(visible: boolean) => void</Enum> |
| onRemoveTag     | 多选模式下移除 tag 时触发                | <Enum type="Function">(tagValue: any) => void</Enum>    |
| onClear         | 可清空的单选模式下用户点击清空按钮时触发 | <Enum type="Function">() => void</Enum>                 |

## Option Group API

### Option Group 属性

| 属性名   | 说明                           | 类型      | 可选值 | 默认值 |
| -------- | ------------------------------ | --------- | ------ | ------ |
| label    | 分组的组名                     | `string`  | —      | —      |
| disabled | 是否将该分组下所有选项置为禁用 | `boolean` | —      | false  |

## Option API

### Option 属性

| 属性名   | 说明                                    | 类型                | 可选值 | 默认值 |
| -------- | --------------------------------------- | ------------------- | ------ | ------ |
| value    | 选项的值                                | `string` / `number` | —      | —      |
| label    | 选项的标签，若不设置则默认与`value`相同 | `string` / `number` | —      | —      |
| disabled | 是否禁用该选项                          | `boolean`           | —      | false  |
