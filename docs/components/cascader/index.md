---
title: Cascader 级联选择器
`boolean` ang: zh-CN
---

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

使用多选时，所有选中的标签将默认显示。 您可以设置 `collapse = true` 将选中的标签折叠。 您可以使用 `collapse-tags-tooltip` 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。

<code src="./multiple-selection.tsx"></code>

## 选择任意一级选项

在单选模式下，你只能选择叶子节点；而在多选模式下，勾选父节点真正选中的都是叶子节点。 启用该功能后，可让父子节点取消关联，选择任意一级选项。

可通过 `props.checkStrictly = true` 来设置父子节点取消选中关联，从而达到选择任意一级选项的目的。

<!-- <code src="./any-level.tsx"></code> -->

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

你可以通过 `scoped slot` 自定义节点的内容。 您可以访问 scope 中的 `node` 和 `data` 属性，分别表示当前节点的 Node 对象和当前节点的数据。

<!-- <code src="./custom-content.tsx"></code> -->

## 级联面板

级联面板是级联选择器的核心组件，与级联选择器一样，有单选、多选、动态加载等多种功能。

和级联选择器一样，通过 `options` 来指定选项，也可通过 `props` 来设置多选、动态加载等功能，具体详情见下方 API 表格。

<!-- <code src="./panel.tsx"></code> -->

## Cascader API

### Cascader Attributes

| 属性名                              | 说明                                                                                                                                                           | 类型                                                                          | 默认值 |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------ |
| model-value / v-model               | 选中项绑定值                                                                                                                                                   | `string` /`number` /<Enum type='object'>string[] \| number[] \| any</Enum>    | —      |
| options                             | 选项的数据源， `value` 和 `label` 可以通过 `CascaderProps` 自定义.                                                                                             | <Enum type='object'>Record<string, unknown>[]</Enum>                          | —      |
| props                               | 配置选项, 请参阅下面 `CascaderProps` 表。                                                                                                                      | <Enum type='object'>CascaderProps</Enum>                                      | —      |
| size                                | 尺寸                                                                                                                                                           | <Enum>'large' \| 'default' \| 'small'</Enum>                                  | —      |
| placeholder                         | 输入框占位文本                                                                                                                                                 | `string`                                                                      | —      |
| disabled                            | 是否禁用                                                                                                                                                       | `boolean`                                                                     | —      |
| clearable                           | 是否支持清空选项                                                                                                                                               | `boolean`                                                                     | —      |
| showAllLevels                       | 输入框中是否显示选中值的完整路径                                                                                                                               | `boolean`                                                                     | true   |
| collapse-tags                       | 多选模式下是否折叠 Tag                                                                                                                                         | `boolean`                                                                     | —      |
| collapse-tags-tooltip               | 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。 要使用此属性，`collapse-tags`属性必须设定为 true                                                        | `boolean`                                                                     | false  |
| separator                           | 用于分隔选项的字符                                                                                                                                             | `string`                                                                      | ' / '  |
| filterable                          | 该选项是否可以被搜索                                                                                                                                           | `boolean`                                                                     | —      |
| filter-method                       | 自定义搜索逻辑，第一个参数是`node`，第二个参数是`keyword`，返回的布尔值表示是否保留该选项                                                                      | <Enum type='Function'>(node: CascaderNode, keyword: string) => boolean</Enum> | —      |
| debounce                            | 搜索关键词正在输入时的去抖延迟，单位为毫秒                                                                                                                     | `number`                                                                      | 300    |
| before-filter                       | 过滤函数调用前，所要调用的钩子函数，该函数接收要过滤的值作为参数。 如果该函数的返回值是 `false` 或者是一个被拒绝的 `Promise`，那么接下来的过滤逻辑便不会执行。 | <Enum type='Function'>(value: string) => boolean</Enum>                       | —      |
| popper-class                        | 弹出内容的自定义类名                                                                                                                                           | `string`                                                                      | ''     |
| teleported                          | 弹层是否使用 teleport                                                                                                                                          | `boolean`                                                                     | true   |
| popper-append-to-body ^(deprecated) | 是否将弹出的内容直接插入到 body 元素。 在弹出内容的边框定位出现问题时，可将该属性设置为 false                                                                  | `boolean`                                                                     | true   |
| tag-type                            | 标签类型                                                                                                                                                       | <Enum>'success' \| 'info' \| 'warning' \| 'danger'</Enum>                     | info   |
| validate-event                      | 输入时是否触发表单的校验                                                                                                                                       | `boolean`                                                                     | true   |

### Cascader Events

| 事件名         | 说明                          | 类型                                                                        |
| -------------- | ----------------------------- | --------------------------------------------------------------------------- |
| change         | 当绑定值变化时触发的事件      | <Enum type='Function'>(value: CascaderValue) => void</Enum>                 |
| expand-change  | 当展开节点发生变化时触发      | <Enum type='Function'>(value: CascaderValue) => void</Enum>                 |
| blur           | 当失去焦点时触发              | <Enum type='Function'>(event: FocusEvent) => void</Enum>                    |
| focus          | 当获得焦点时触发              | <Enum type='Function'>(event: FocusEvent) => void</Enum>                    |
| visible-change | 下拉框出现/隐藏时触发         | <Enum type='Function'>(value: boolean) => void</Enum>                       |
| remove-tag     | 在多选模式下，移除 Tag 时触发 | <Enum type='Function'>(value: CascaderNode['valueByOption']) => void</Enum> |

### Cascader Slots

| 插槽名  | 说明                                                     | 作用域                                              |
| ------- | -------------------------------------------------------- | --------------------------------------------------- |
| default | 自定义备选项的节点内容，分别为当前节点的 Node 对象和数据 | <Enum type='object'>{ node: any, data: any }</Enum> |
| empty   | 无匹配选项时的内容                                       | —                                                   |

### Cascader Exposes

| 属性名              | 说明                                                                            | 类型                                                                            |
| ------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| getCheckedNodes     | 获取一个当前选中节点的数组。(仅仅是传单) 是否只返回叶选中的节点，默认是 `false` | <Enum type='Function'>(leafOnly: boolean) => CascaderNode[] \| undefined</Enum> |
| cascaderPanelRef    | cascader 面板的 ref                                                             | <Enum type='object'>ComputedRef<any></Enum>                                     |
| togglePopperVisible | 切换 popper 可见状态                                                            | <Enum type='Function'>(visible?: boolean) => void</Enum>                        |
| contentRef          | cascader 内容的 ref                                                             | <Enum type='object'>ComputedRef<any></Enum>                                     |

## CascaderPanel API

### CascaderPanel Attributes

| 属性名                | 说明                                                               | 类型                                                                       | 默认值 |
| --------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------ |
| model-value / v-model | 选中项绑定值                                                       | `string` /`number` /<Enum type='object'>string[] \| number[] \| any</Enum> | —      |
| options               | 选项的数据源， `value` 和 `label` 可以通过 `CascaderProps` 自定义. | <Enum type='object'>Record<string, unknown>[]</Enum>                       | —      |
| props                 | 配置选项, 请参阅下面 `CascaderProps` 表。                          | <Enum type='object'>CascaderProps</Enum>                                   | —      |

### CascaderPanel Events

| 事件名        | 说明                                               | Type                                                                |
| ------------- | -------------------------------------------------- | ------------------------------------------------------------------- |
| change        | 当选中节点变化时触发                               | <Enum type='Function'>(value: CascaderValue) => void</Enum>         |
| expand-change | 当展开节点发生变化时触发                           | <Enum type='Function'>(value: CascaderNodePathValue) => void</Enum> |
| close         | 面板的关闭事件，提供给 Cascader 以便做更好的判断。 | <Enum type='Function'>() => void</Enum>                             |

### CascaderPanel Slots

| 插槽名  | 说明                                                     | Scope                                               |
| ------- | -------------------------------------------------------- | --------------------------------------------------- |
| default | 下级节点的自定义内容，它们分别是当前节点对象和节点数据。 | <Enum type='object'>{ node: any, data: any }</Enum> |

### CascaderPanel Exposes

| 属性名            | 说明                                                                            | Type                                                                            |
| ----------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| getCheckedNodes   | 获取一个当前选中节点的数组。(仅仅是传单) 是否只返回叶选中的节点，默认是 `false` | <Enum type='Function'>(leafOnly: boolean) => CascaderNode[] \| undefined</Enum> |
| clearCheckedNodes | 清空选中的节点                                                                  | <Enum type='Function'>() => void</Enum>                                         |

## CascaderProps

| 属性           | 说明                                                                                               | 类型                                                                | 默认值   |
| -------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | -------- |
| expandTrigger  | 次级菜单的展开方式                                                                                 | <Enum>'click' \| 'hover'</Enum>                                     | click    |
| multiple       | 是否多选                                                                                           | `boolean`                                                           | false    |
| checkStrictly  | 是否严格的遵守父子节点不互相关联                                                                   | `boolean`                                                           | false    |
| emitPath       | 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值 | `boolean`                                                           | true     |
| lazy           | 是否动态加载子节点，需与 lazyLoad 方法结合使用                                                     | `boolean`                                                           | false    |
| lazyLoad       | 加载动态数据的方法，仅在 lazy 为 true 时有效                                                       | <Enum type='Function'>(node: Node, resolve: Resolve) => void</Enum> | —        |
| value          | 指定选项的值为选项对象的某个属性值                                                                 | `string`                                                            | value    |
| label          | 指定选项标签为选项对象的某个属性值                                                                 | `string`                                                            | label    |
| children       | 指定选项的子选项为选项对象的某个属性值                                                             | `string`                                                            | children |
| disabled       | 指定选项的禁用为选项对象的某个属性值                                                               | `string`                                                            | disabled |
| leaf           | 指定选项的叶子节点的标志位为选项对象的某个属性值                                                   | `string`                                                            | leaf     |
| hoverThreshold | hover 时展开菜单的灵敏度阈值                                                                       | `number`                                                            | 500      |

## 类型声明

<details>
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

interface CascaderProps {
    expandTrigger?: ExpandTrigger;
    multiple?: boolean;
    checkStrictly?: boolean;
    emitPath?: boolean;
    lazy?: boolean;
    lazyLoad?: LazyLoad;
    value?: string;
    label?: string;
    children?: string;
    disabled?: string | isDisabled;
    leaf?: string | isLeaf;
    hoverThreshold?: number;
}

class Node {
    readonly uid: number;
    readonly level: number;
    readonly value: CascaderNodeValue;
    readonly label: string;
    readonly pathNodes: Node[];
    readonly pathValues: CascaderNodePathValue;
    readonly pathLabels: string[];

    childrenData: ChildrenData;
    children: Node[];
    text: string;
    loaded: boolean;
    /**
     * Is it checked
     *
     * @default false
     */
    checked: boolean;
    /**
     * Used to indicate the intermediate state of unchecked and fully checked child nodes
     *
     * @default false
     */
    indeterminate: boolean;
    /**
     * Loading Status
     *
     * @default false
     */
    loading: boolean;

    // getter
    isDisabled: boolean;
    isLeaf: boolean;
    valueByOption: CascaderNodeValue | CascaderNodePathValue;

    // method
    appendChild(childData: CascaderOption): Node;
    calcText(allLevels: boolean, separator: string): string;
    broadcast(event: string, ...args: unknown[]): void;
    emit(event: string, ...args: unknown[]): void;
    onParentCheck(checked: boolean): void;
    onChildCheck(): void;
    setCheckState(checked: boolean): void;
    doCheck(checked: boolean): void;
}

Node as CascaderNode;
```

</details>
