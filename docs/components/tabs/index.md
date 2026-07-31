---
title: Tabs 标签页
lang: zh-CN
---

<Meta></Meta>

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

Tabs 组件提供了选项卡功能， 默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

<code src="./basic.tsx"></code>

## 卡片风格的标签

你可以设置具有卡片风格的标签。

只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

<code src="./card-style.tsx"></code>

## 带有边框的卡片风格

你还可以设置标签页为带有边框的卡片

将 `type` 设置为 `borderCard`。

<code src="./border-card.tsx"></code>

## 标签位置的设置

可以通过 `tabPosition` 设置标签的位置

标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

<code src="./tab-position.tsx"></code>

<!-- ## 自定义标签页的内容
`
可以通过具名插槽来实现自定义标签页的内容

<code src="./custom-tab.tsx"></code> -->

## 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

<code src="./dynamic-tabs.tsx"></code>

## 添加按钮自定义图标

可以通过 `addIcon` 属性来自定义添加按钮图标。

<code src="./customized-add-button-icon.tsx"></code>

## 自定义增加标签页触发器

<code src="./customized-trigger.tsx"></code>

## Tabs API

### Tabs 属性

| 属性名            | 说明                                                                                  | 类型                                                                                                                              | Default    |
| ----------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| activeName        | 绑定值，选中选项卡的 name，默认值是第一个 tab 的 name（可控）                         | `string` / `number`                                                                                                               | —          |
| defaultActiveName | 默认选中选项卡的 `name`                                                               | `string` / `number`                                                                                                               | —          |
| type              | 风格类型                                                                              | <Enum>'' \| 'card' \| 'border-card'</Enum>                                                                                        | ''         |
| closable          | 标签是否可关闭                                                                        | `boolean`                                                                                                                         | false      |
| addable           | 标签是否可增加                                                                        | `boolean`                                                                                                                         | false      |
| addIcon           | 自定义添加按钮图标                                                                    | `React.ReactNode`                                                                                                                 | —          |
| editable          | 标签是否同时可增加和关闭                                                              | `boolean`                                                                                                                         | false      |
| tabPosition       | 选项卡所在位置                                                                        | <Enum>'top' \| 'right' \| 'bottom' \| 'left'</Enum>                                                                               | top        |
| stretch           | 标签的宽度是否自撑开                                                                  | `boolean`                                                                                                                         | false      |
| center            | 是否居中显示                                                                          | `boolean`                                                                                                                         | false      |
| classPrefix       | 样式前缀                                                                              | `string`                                                                                                                          | —          |
| headerStyle       | 标签页标题栏 div 样式                                                                 | `React.CSSProperties`                                                                                                             | —          |
| contentStyle      | 内容 div 样式                                                                         | `React.CSSProperties`                                                                                                             | —          |
| beforeLeave       | 切换标签之前的钩子函数， 若返回 `false ` 或者返回被 reject 的 `Promise`，则阻止切换。 | <Enum type="Function">(activeName: TabPaneName, oldActiveName: TabPaneName) => void \| boolean \| Promise<void \| boolean></Enum> | () => true |

### Tabs 事件

| 事件名      | 说明                          | 类型                                                                                           |
| ----------- | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| onTabClick  | tab 被选中时触发              | <Enum type="Function">(context: TabsPaneContext) => void</Enum>                                |
| onTabChange | `activeName` 改变时触发       | <Enum type="Function">(name: TabPaneName \| undefined) => void</Enum>                          |
| onTabRemove | 点击 tab 移除按钮时触发       | <Enum type="Function">(name: TabPaneName \| undefined) => void</Enum>                          |
| onTabAdd    | 点击 tab 新增按钮时触发       | <Enum type="Function">() => void</Enum>                                                        |
| onTabEdit   | 击 tab 的新增或移除按钮后触发 | <Enum type="Function">(name: TabPaneName \| undefined, type: 'add' \| 'remove') => void</Enum> | —   |

## Tab-pane API

### Tab-pane 属性

| 属性名      | 说明                                                                                            | 类型                                    | 默认值 |
| ----------- | ----------------------------------------------------------------------------------------------- | --------------------------------------- | ------ |
| label       | 选项卡标题                                                                                      | `string` / `React.ReactElement`         | ''     |
| name        | 与选项卡绑定值 value 对应的标识符，表示选项卡别名。默认值是 tab 面板的序列号，如第一个 tab 是 0 | `string` / `number`                     | —      |
| closable    | 标签是否可关闭                                                                                  | `boolean`                               | false  |
| disabled    | 是否禁用                                                                                        | `boolean`                               | false  |
| lazy        | 标签是否延迟渲染                                                                                | `boolean`                               | false  |
| classPrefix | 样式前缀                                                                                        | `string`                                | —      |
| onTabShow   | 激活标签时触发                                                                                  | <Enum type="Function">() => void</Enum> | —      |
| onTabClose  | 关闭标签页时触发                                                                                | <Enum type="Function">() => void</Enum> | —      |
| data        | 传递给点击事件的额外参数                                                                        | `Record<string \| number, any>`         | —      |
