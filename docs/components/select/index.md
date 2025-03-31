---
title: Select 选择器
lang: zh-CN
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

适用广泛的基础单选 `vModel` 的值为当前被选中的 `elOption` 的 value 属性值

<code src="./basic-usage.tsx"></code>

## 有禁用选项

在 `elOption` 中，设定 `disabled` 值为 true，即可禁用该选项

<code src="./disabled-option.tsx"></code>

## 禁用状态

禁用整个选择器组件

为 `elSelect` 设置 `disabled`属性，则整个选择器不可用。

<code src="./disabled.tsx"></code>

<!-- ## 可清空单选

您可以使用清除图标来清除选择。

为 `elSelect` 设置 `clearable` 属性，则可将选择器清空。 需要注意的是，`clearable` 属性仅适用于单选。

<code src="./clearable.tsx"></code> -->

## 基础多选

多选选择器使用 tag 组件来展示已选中的选项。

为 `elSelect` 设置 `multiple` 属性即可启用多选， 此时 `vModel` 的值为当前选中值所组成的数组。 默认情况下选中值会以 Tag 组件的形式展现， 你也可以设置 `collapseTags` 属性将它们合并为一段文字。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<code src="./multiple.tsx"></code>

## 自定义模板

你可以自定义如何来渲染每一个选项。

将自定义的 HTML 模板插入 `elOption` 的 slot 中即可。

<code src="./custom-template.tsx"></code>

## 将选项进行分组

你可以为选项进行分组来区分不同的选项

使用 `el-option-group` 对备选项进行分组，它的 `label` 属性为分组名

<code src="./grouping.tsx"></code>

## 筛选选项

可以利用筛选功能快速查找选项。

为`elSelect`添加`filterable`属性即可启用搜索功能。 默认情况下，Select 会找出所有 `label` 属性包含输入值的选项。 如果希望使用其他的搜索逻辑，可以通过传入一个 `filterMethod` 来实现。 `filterMethod` 为一个 `Function`，它会在输入值发生变化时调用，参数为当前输入值。

<code src="./filterable.tsx"></code>

## 远程搜索

输入关键字以从远程服务器中查找数据。

从服务器搜索数据，输入关键字进行查找。为了启用远程搜索，需要将`filterable`和`remote`设置为`true`，同时传入一个`remoteMethod`。 `remoteMethod`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。 需要注意的是，如果 `elOption` 是通过 `vFor` 指令渲染出来的，此时需要为 `elOption` 添加 `key` 属性， 且其值需具有唯一性，比如这个例子中的 `item.value`。

<code src="./remote-search.tsx"></code>

## 创建新的选项

创建并选中未包含在初始选项中的条目。

通过使用 `allowCreate` 属性，用户可以通过输入框创建新项目。 为了使 `allowCreate` 正常工作， `filterable` 的值必须为 `true`。 本例还使用了 `default-first-option` 属性， 在该属性为 `true` 的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。

<code src="./allow-create.tsx"></code>

:::info{title=TIP}

如果 Select 的绑定值为对象类型，请务必指定 `valueKey` 作为它的唯一性标识。

:::

## Select 属性

| 属性名                        | 说明                                                                                                   | 类型                                       | 可选值                                                                                                    | 默认值           |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------- |
| model-value / v-model         | 选中项绑定值                                                                                           | array / string / number / boolean / object | —                                                                                                         | —                |
| multiple                      | 是否多选                                                                                               | boolean                                    | true/false                                                                                                | false            |
| disabled                      | 是否禁用                                                                                               | boolean                                    | true / false                                                                                              | false            |
| value-key                     | 作为 value 唯一标识的键名，绑定值为对象类型时必填                                                      | string                                     | —                                                                                                         | value            |
| size                          | 输入框尺寸                                                                                             | string                                     | large/default/small                                                                                       | default          |
| clearable                     | 是否可以清空选项                                                                                       | boolean                                    | true / false                                                                                              | false            |
| collapse-tags                 | 多选时是否将选中值按文字的形式展示                                                                     | boolean                                    | true/false                                                                                                | false            |
| collapse-tags-tooltip         | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，`collapseTags`属性必须设定为 true | boolean                                    | true / false                                                                                              | false            |
| multiple-limit                | `multiple` 属性设置为 `true` 时，代表多选场景下用户最多可以选择的项目数， 为 0 则不限制                | number                                     | —                                                                                                         | 0                |
| name                          | Select 输入框的原生 name 属性                                                                          | string                                     | —                                                                                                         | —                |
| effect                        | Tooltip 主题，内置了 `dark` / `light` 两种                                                             | string                                     | string                                                                                                    | light            |
| autocomplete                  | Select 输入框的原生 autocomplete 属性                                                                  | string                                     | —                                                                                                         | off              |
| placeholder                   | 占位文字                                                                                               | string                                     | —                                                                                                         | Select           |
| filterable                    | Select 组件是否可筛选                                                                                  | boolean                                    | true / false                                                                                              | false            |
| allow-create                  | 是否允许用户创建新条目， 只有当 `filterable` 设置为 true 时才会生效。                                  | boolean                                    | true/false                                                                                                | false            |
| filter-method                 | 自定义筛选方法                                                                                         | function                                   | —                                                                                                         | —                |
| remote                        | 其中的选项是否从服务器远程加载                                                                         | boolean                                    | true / false                                                                                              | false            |
| remote-method                 | 自定义远程搜索方法                                                                                     | function                                   | —                                                                                                         | —                |
| remote-show-suffix            | 远程搜索方法显示后缀图标                                                                               | boolean                                    | true / false                                                                                              | false            |
| loading                       | 是否正在从远程获取数据                                                                                 | boolean                                    | true / false                                                                                              | false            |
| loading-text                  | 从服务器加载内容时显示的文本                                                                           | string                                     | —                                                                                                         | Loading          |
| no-match-text                 | 搜索条件无匹配时显示的文字，也可以使用 `empty` 插槽设置                                                | string                                     | —                                                                                                         | No matching data |
| no-data-text                  | 无选项时显示的文字，也可以使用 `empty` 插槽设置自定义内容                                              | string                                     | —                                                                                                         | No data          |
| popper-class                  | 选择器下拉菜单的自定义类名                                                                             | string                                     | —                                                                                                         | —                |
| popper-options                | 自定义 popper 选项，更多请参考 [popper.js](https://popper.js.org/docs/v2/)                             | object                                     | —                                                                                                         | —                |
| reserve-keyword               | 当 `multiple` 和 `filter`被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词                    | boolean                                    | true / false                                                                                              | true             |
| default-first-option          | 是否在输入框按下回车时，选择第一个匹配项。 需配合 `filterable` 或 `remote` 使用                        | boolean                                    | true / false                                                                                              | false            |
| popper-append-to-body(已废弃) | 是否将弹出框插入至 body 元素 当弹出框的位置出现问题时，你可以尝试将该属性设置为 false。                | boolean                                    | true / false                                                                                              | true             |
| teleported                    | 是否将下拉列表元素插入 append-to 指向的元素下                                                          | boolean                                    | true / false                                                                                              | true             |
| persistent                    | 当下拉选择器未被激活并且`persistent`设置为`false`，选择器会被删除。                                    | boolean                                    | true / false                                                                                              | true             |
| automatic-dropdown            | 对于不可过滤的 Select 组件，此属性决定是否在输入框获得焦点后自动弹出选项菜单                           | boolean                                    | true / false                                                                                              | false            |
| clear-icon                    | 自定义清除图标组件                                                                                     | `string \| Component`                      | —                                                                                                         | CircleClose      |
| fit-input-width               | 下拉框的宽度是否与输入框相同                                                                           | boolean                                    | true / false                                                                                              | false            |
| suffix-icon                   | 自定义后缀图标组件                                                                                     | `string \| Component`                      | —                                                                                                         | ArrowDown        |
| suffix-transition             | 下拉菜单显示/消失时后缀图标的动画                                                                      | boolean                                    | true / false                                                                                              | true             |
| tag-type                      | 标签类型                                                                                               | string                                     | success/info/warning/danger                                                                               | info             |
| validate-event                | 是否触发表单验证                                                                                       | boolean                                    | true / false                                                                                              | true             |
| placement                     | 下拉框出现的位置                                                                                       | string                                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start     |
| max-collapse-tags ^(2.3.0)    | 需要显示的 Tag 的最大数量 只有当 `collapseTags` 设置为 true 时才会生效。                               | number                                     | —                                                                                                         | 1                |

## Select 事件

| 事件名         | 说明                                     | 回调参数                           |
| -------------- | ---------------------------------------- | ---------------------------------- |
| change         | 选中值发生变化时触发                     | val，目前的选中值                  |
| visible-change | 下拉框出现/隐藏时触发                    | val，出现则为 true，隐藏则为 false |
| remove-tag     | 多选模式下移除 tag 时触发                | val，移除的 tag 值                 |
| clear          | 可清空的单选模式下用户点击清空按钮时触发 | —                                  |
| blur           | 当 input 失去焦点时触发                  | (event: FocusEvent)                |
| focus          | 当 input 获得焦点时触发                  | (event: FocusEvent)                |

## Select Slots

| 插槽名 | 说明                | 子标签                |
| ------ | ------------------- | --------------------- |
| —      | Option 组件列表     | Option Group / Option |
| prefix | Select 组件头部内容 | —                     |
| empty  | 无选项时的列表      | —                     |

## Option Group 属性

| 属性名   | 说明                           | 类型    | 可选值 | 默认值 |
| -------- | ------------------------------ | ------- | ------ | ------ |
| label    | 分组的组名                     | string  | —      | —      |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | —      | false  |

## Option Group Slots

| 插槽名 | 说明           | 子标签 |
| ------ | -------------- | ------ |
| -      | 自定义默认内容 | Option |

## Option 属性

| 属性名   | 说明                                    | 类型                               | 可选值 | 默认值 |
| -------- | --------------------------------------- | ---------------------------------- | ------ | ------ |
| value    | 选项的值                                | string / number / boolean / object | —      | —      |
| label    | 选项的标签，若不设置则默认与`value`相同 | string/number                      | —      | —      |
| disabled | 是否禁用该选项                          | boolean                            | —      | false  |

## Option Slots

| 插槽名 | 说明     |
| ------ | -------- |
| —      | 默认插槽 |

## Methods

| 方法名 | 说明                                   | 参数 |
| ------ | -------------------------------------- | ---- |
| focus  | 使选择器的输入框获取焦点               | -    |
| blur   | 使选择器的输入框失去焦点，并隐藏下拉框 | -    |
