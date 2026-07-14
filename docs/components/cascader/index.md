---
title: Cascader 级联选择器
lang: zh-CN
---

<Meta></Meta>

# Cascader 级联选择器

当一个数据集合有清晰的层级结构时，可通过级联选择器逐级查看并选择。

## 基础用法

有两种触发子菜单的方式

只需为 Cascader 的`options`属性指定选项数组即可渲染出一个级联选择器。 通过 `props.expandTrigger` 属性控制子节点的展开方式

<code src="./basic.tsx"></code>

## 有禁用选项

通过在数据源中设置 `disabled` 字段来声明该选项是禁用的

本例中，`options`指定的数组中的第一个元素含有`disabled: true`键值对，因此是禁用的。 在默认情况下，Cascader 会检查数据中每一项的`disabled`字段是否为`true`，如果你的数据中表示禁用含义的字段名不为`disabled`，可以通过`props.disabled`属性来指定（详见下方 API 表格）。 当然，`value`、`label`和`children`这三个字段名也可以通过同样的方式指定。

<code src="./option-disabling.tsx"></code>

## 可清空

通过 `clearable` 设置输入框可清空

<code src="./clearable.tsx"></code>

## 仅显示最后一级

可以仅在输入框中显示选中项最后一级的标签，而不是选中项所在的完整路径。

属性`showAllLevels`定义了是否显示完整的路径，将其赋值为`false`则仅显示最后一级 将其赋值为 `false` 则仅显示最后一级。

<code src="./last-level.tsx"></code>

## 多选

在标签中添加 `props={{ multiple: true }}` 开启多选模式。

使用多选时，所有选中的标签将默认显示。 您可以设置 `collapseTags = true` 将选中的标签折叠。 您可以使用 `collapseTagsTooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<code src="./multiple-selection.tsx"></code>

## 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。

可通过 `props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

<code src="./any-level.tsx"></code>

## 动态加载

当选中某一级时，动态加载该级下的选项。

通过`lazy`开启动态加载，并通过`lazyload`来设置加载数据源的方法。 `lazyload`方法有两个参数，第一个参数`node`为当前点击的节点，第二个`resolve`为数据加载完成的回调(必须调用)。 为了更准确的显示节点的状态，还可以对节点数据添加是否为叶子节点的标志位 (默认字段为`leaf`，可通过`props.leaf`修改)。 否则，将以有无子节点来判断其是否为叶子节点。

<code src="./dynamic-loading.tsx"></code>

## 可搜索

可以快捷地搜索选项并选择。

通过添加`filterable`来启用过滤。 Cascader 会匹配所有节点的标签和它们的亲节点的标签，是否包含有输入的关键字。 你也可以用`filter-method`自定义搜索逻辑，接受一个函数，第一个参数是节点`node`，第二个参数是搜索关键词`keyword`，通过返回布尔值表示是否命中。

<code src="./filterable.tsx"></code>

## 自定义节点内容

可以自定义备选项的节点内容

你可以通过 `nodeFormatter` 自定义节点的内容。 您可以访问 scope 中的 `node` 和 `data` 属性，分别表示当前节点的 Node 对象和当前节点的数据。

<code src="./custom-content.tsx"></code>

## 自定义建议项

你可以通过 `suggestionItemFormatter` 自定义建议项。 你可以在作用域中访问 `item`，它代表建议项。

<code src="./custom-suggestion-item.tsx"></code>

## 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

和级联选择器一样，通过 `options` 来指定选项，也可通过 `props` 来设置多选、动态加载等功能，具体详情见下方 API 表格。

<code src="./panel.tsx"></code>

<!-- ## 自定义标签

您可以自定义标签。

将自定义的标签插入 `el-cascader` 的 slot 中即可。 `collapse-tags`, `collapse-tags-tooltip`, `max-collapse-tags` 在此模式下不生效.

<code src="./custom-tag.tsx"></code>

## 已勾选项显示策略

控制在多选模式下已选值的显示方式。

在多选模式下，你可以使用 `show-checked-strategy` 来控制已选值的显示方式。 默认策略为 `child`，即显示所有已选中的子节点。 `parent` 策略仅在其所有子节点都被选中时显示父节点。

<code src="./show-checked-strategy.tsx"></code>

## 点击选中节点

只使用 `multiple` 或 `checkStrictly` 属性。

你可以添加 `checkOnClickNode`，使节点本身也能被点击（不仅限于前缀图标）。 通过 `showPrefix` 来切换前缀的显示与隐藏。 info{title=TIP} 添加 `checkOnClickLeaf` 属性可以仅勾选叶子节点（最末级子节点），该功能默认启用。

<code src="./check-on-click-node.tsx"></code>

## 自定义头部与底部

你可以通过插槽来自定义下拉菜单的头部和底部。

使用插槽自定义内容。

<code src="./custom-header-footer.tsx"></code> -->

## Cascader API

### Cascader 属性

| 属性名                       | 说明                                                                                                  | 类型                                                                                          | 默认值 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------ |
| defaultValue                 | 默认值                                                                                                | <Enum type='object'>CascaderValue</Enum>                                                      | —      |
| value                        | 选中项绑定值                                                                                          | <Enum type='object'>CascaderValue</Enum>                                                      | —      |
| options                      | 选项的数据源， `value` 和 `label` 可以通过 `CascaderMenuProps` 自定义.                                | <Enum type='object'>Record<string, unknown>[]</Enum>                                          | —      |
| props                        | 配置选项, 请参阅下面 `CascaderMenuProps` 表。                                                         | <Enum type='object'>CascaderMenuProps</Enum>                                                  | —      |
| placeholder                  | 输入框占位文本                                                                                        | `string`                                                                                      | —      |
| disabled                     | 是否禁用                                                                                              | `boolean`                                                                                     | —      |
| clearable                    | 是否支持清空选项                                                                                      | `boolean`                                                                                     | —      |
| showAllLevels                | 输入框中是否显示选中值的完整路径                                                                      | `boolean`                                                                                     | true   |
| collapseTags                 | 多选模式下是否折叠 Tag                                                                                | `boolean`                                                                                     | —      |
| size                         | 尺寸                                                                                                  | <Enum>'large' \| 'default' \| 'small'</Enum>                                                  | —      |
| maxCollapseTags              | 需要显示的 Tag 的最大数量 只有当 collapseTags 设置为 true 时才会生效。                                | `number`                                                                                      | —      |
| collapseTagsTooltip          | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，collapseTags 属性必须设定为 true | `boolean`                                                                                     | false  |
| maxCollapseTagsTooltipHeight | collapse tags 的最大高度                                                                              | `string` / `number`                                                                           | —      |
| collapseTips                 | 鼠标悬停于折叠标签的文本格式化函数， 要使用此属性，`collapseTags` 属性必须设定为 true                 | <Enum type='Function'>(collapseNum: number, total: number) => string </Enum>                  | false  |
| separator                    | 用于分隔选项的字符                                                                                    | `string`                                                                                      | ' / '  |
| filterable                   | 该选项是否可以被搜索                                                                                  | `boolean`                                                                                     | —      |
| filterMethod                 | 自定义搜索逻辑，第一个参数是节点，第二个参数是搜索关键词，返回的布尔值表示是否保留该选项              | <Enum type='Function'>(val: CascaderValue, searchText: string) => boolean</Enum>              | —      |
| nodeFormatter                | 自定义备选项的节点内容，分别为当前节点的 Node 对象和数据                                              | <Enum type='Function'>(params: { node?: CascaderNode; data?: any }) => React.ReactNode</Enum> | —      |
| suggestionItemFormatter      | 搜索时自定义建议项内容                                                                                | <Enum type='Function'>(item: CascaderNode[]) => React.ReactNode</Enum>                        | —      |
| plain                        | 是否纯文本模式，即无边框                                                                              | `boolean`                                                                                     | —      |
| prefix                       | 输入框头部内容，只对 type="text" 有效                                                                 | `string` / `Component`                                                                        | —      |
| suffix                       | 输入框尾部内容，只对 type="text" 有效                                                                 | `string` / `Component`                                                                        | —      |
| prepend                      | 输入框前置内容，只对 type="text" 有效                                                                 | `string` / `Component`                                                                        | —      |
| append                       | 输入框后置内容，只对 type="text" 有效                                                                 | `string` / `Component`                                                                        | —      |
| labelFormatter               | 自定义标签格式化函数                                                                                  | <Enum type='Function'>(level?: number, node?: object[]) => string</Enum>                      | —      |
| shouldSelect                 | 是否可以选择                                                                                          | <Enum type='Function'>(node?: object, level?: number) => boolean</Enum>                       | —      |
| popperClass                  | 弹出内容的自定义类名                                                                                  | `string`                                                                                      | ''     |

<!-- 以下属性在当前类型定义中未找到
| lable                        | 标签                                                                                                  | `string`                                                                                      | —      |
| panel                        | 是否显示成面板                                                                                        | `boolean`                                                                                     | —      |
| appendToBody                 | 是否追加到 body 下                                                                                    | `boolean`                                                                                     | —      |
| noDataText                   | 选项为空时显示的文字                                                                                  | `string`                                                                                      | —      |
| noMatchText                  | 搜索条件无匹配时显示的文字                                                                            | `string`                                                                                      | —      |
| loading                      | 是否正在从远程获取数据                                                                                | `boolean`                                                                                     | —      |
| loadingText                  | 远程加载时显示的文字                                                                                  | `string`                                                                                      | —      |
| required                     | 是否必填                                                                                              | `boolean`                                                                                     | —      |
| debounce                     | 搜索关键词正在输入时的去抖延迟，单位为毫秒                                                                                         | `number`                                                                      | 300    |
 -->

### Cascader 事件

| 事件名          | 说明                                     | 类型                                                                                                                    |
| --------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| onChange        | 当绑定值变化时触发的事件                 | <Enum type="Function">(value: CascaderValue, level?: number, label?: string\|string[], node?: S[]\|S[][]) => void/Enum> |
| onExpandChange  | 当展开节点发生变化时触发                 | <Enum type="Function">(value: CascaderValue) => void</Enum>                                                             |
| onClear         | 可清空的单选模式下用户点击清空按钮时触发 | <Enum type="Function">() => void</Enum>                                                                                 |
| onVisibleChange | 下拉框出现/隐藏时触发                    | <Enum type="Function">(value: boolean) => void</Enum>                                                                   |
| onRemoveTag     | 在多选模式下，移除 Tag 时触发            | <Enum type="Function">(node: CascaderNode) => void</Enum>                                                               |

### CascaderRef

| 方法名              | 说明                                                                            | 类型                                                             |
| ------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| getCheckedNodes     | 获取一个当前选中节点的数组。(仅仅是传单) 是否只返回叶选中的节点，默认是 `false` | <Enum type="Function">() => CascaderNode[][] \| undefined</Enum> |
| ref                 | cascader input 容器的 ref                                                       | <Enum type="object">RefObject<HTMLDivElement></Enum>             |
| togglePopperVisible | 切换 popper 可见状态                                                            | <Enum type="Function">(visible?: boolean) => void</Enum>         |
| input               | input ref                                                                       | <Enum type="object">input</Enum>                                 |
| presentText         | 选中的内容文本                                                                  | string                                                           |

## CascaderPanel API

### CascaderPanel 属性

| 属性名       | 说明                                                                   | 类型                                                                       | 默认值 |
| ------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ |
| defaultValue | 默认值                                                                 | `string` /`number` /<Enum type='object'>string[] \| number[] \| any</Enum> | —      |
| value        | 选中项绑定值                                                           | `string` /`number` /<Enum type='object'>string[] \| number[] \| any</Enum> | —      |
| options      | 选项的数据源， `value` 和 `label` 可以通过 `CascaderMenuProps` 自定义. | <Enum type='object'>Record<string, unknown>[]</Enum>                       | —      |
| props        | 配置选项, 请参阅下面 `CascaderMenuProps` 表。                          | <Enum type='object'>CascaderMenuProps</Enum>                               | —      |

### CascaderPanel 事件

| 事件名         | 说明                     | Type                                                        |
| -------------- | ------------------------ | ----------------------------------------------------------- |
| onChange       | 当绑定值变化时触发的事件 | <Enum type="Function">(value: CascaderValue) => void</Enum> |
| onExpandChange | 当展开节点发生变化时触发 | <Enum type="Function">(value: CascaderValue) => void</Enum> |

### CascaderPanelRef

| 属性名            | 说明                                                                            | Type                                                                            |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| getCheckedNodes   | 获取一个当前选中节点的数组。(仅仅是传单) 是否只返回叶选中的节点，默认是 `false` | <Enum type='Function'>(leafOnly: boolean) => CascaderNode[] \| undefined</Enum> |
| clearCheckedNodes | 清空选中的节点                                                                  | <Enum type='Function'>() => void</Enum>                                         |

## CascaderMenuProps

| 属性          | 说明                                                                                               | 类型                                                                                                          | 默认值   |
| ------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- |
| expandTrigger | 次级菜单的展开方式                                                                                 | <Enum>'click' \| 'hover'</Enum>                                                                               | click    |
| multiple      | 是否多选                                                                                           | `boolean`                                                                                                     | false    |
| checkStrictly | 是否严格的遵守父子节点不互相关联                                                                   | `boolean`                                                                                                     | false    |
| emitPath      | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | `boolean`                                                                                                     | —        |
| lazy          | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                     | `boolean`                                                                                                     | false    |
| lazyLoad      | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                       | <Enum type='Function'>(node: object, resolve?: (value: object[]) => void, reject?: () => void) => void</Enum> | —        |
| value         | 指定选项的值为选项对象的某个属性值                                                                 | `string`                                                                                                      | value    |
| label         | 指定选项标签为选项对象的某个属性值                                                                 | `string`                                                                                                      | label    |
| children      | 指定选项的子选项为选项对象的某个属性值                                                             | `string`                                                                                                      | children |
| disabled      | 指定选项的禁用为选项对象的某个属性值                                                               | `string`                                                                                                      | disabled |
| leaf          | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                   | `string`                                                                                                      | —        |

## 类型声明

<details open>
  <summary>显示类型声明</summary>

```ts
type CascaderNodeValue = string | number;
type CascaderNodePathValue = CascaderNodeValue[];
type CascaderValue = CascaderNodeValue | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[];

type Resolve = (data: any) => void;

type ExpandTrigger = 'click' | 'hover';

type LazyLoad = (node: Node, resolve: Resolve) => void;

type isDisabled = (data: CascaderOption, node: Node) => boolean;

type isLeaf = (data: CascaderOption, node: Node) => boolean;

interface CascaderOption extends Record<string, unknown> {
    label?: string;
    value?: CascaderNodeValue;
    children?: CascaderOption[];
    disabled?: boolean;
    leaf?: boolean;
}

interface CascaderMenuProps {
    /** 次级菜单的展开方式 */
    expandTrigger?: 'click' | 'hover';
    /** 是否多选 */
    multiple?: boolean;
    /** 是否严格的遵守父子节点不互相关联 */
    checkStrictly?: boolean;
    /** 是否动态加载子节点，需与 lazyLoad 方法结合使用 */
    lazy?: boolean;
    /** 加载动态数据的方法，仅在 lazy 为 true 时有效 */
    lazyLoad?: (node: object, resolve?: (value: object[]) => void, reject?: () => void) => void;
    /** 指定选项的值为选项对象的某个属性值 */
    value?: string;
    /** 指定选项标签为选项对象的某个属性值 */
    label?: string;
    /** 指定选项的子选项为选项对象的某个属性值 */
    children?: string;
    /** 指定选项的禁用为选项对象的某个属性值 */
    disabled?: string;
    /** 指定选项的叶子节点的标志位为选项对象的某个属性值 */
    leaf?: string;
}

interface CascaderNode extends Object {
    /**
     * 主键
     * @private
     */
    __id: string;
    /**
     * 父级节点ID
     * @private
     */
    __pId: string;
    /**
     * 层级
     * @private
     */
    __level?: number;
    /**
     * 是否叶子节点
     * @private
     */
    __leaf?: boolean;
    /**
     * 是否已勾选
     * @private
     */
    __checked?: boolean;
    /**
     * 是否半选
     * @private
     */
    __indeterminate?: boolean;
    /**
     * 节点数据
     * @private
     */
    data?: object;
    /**
     * 时子节点集合
     * @private
     */
    children?: OptionNode[];
    /**
     * 树形组件时子节点集合
     * @private
     */
    treeChildren?: boolean;
}
```

</details>
