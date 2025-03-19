---
title: Tabs 标签页
`boolean` ang: zh-CN
---

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

可以通过具名插槽来实现自定义标签页的内容

<code src="./custom-tab.tsx"></code> -->

## 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

<code src="./dynamic-tabs.tsx"></code>

<!-- ## 自定义增加标签页触发器

<code src="./customized-trigger.tsx"></code> -->

## Tabs 属性

| 属性名                | 说明                                                                                  | 类型                                | 可选值                | 默认值              |
| --------------------- | ------------------------------------------------------------------------------------- | ----------------------------------- | --------------------- | ------------------- |
| model-value / v-model | 绑定值，选中选项卡的 name                                                             | string / number                     | —                     | 第一个选项卡的 name |
| type                  | 风格类型                                                                              | string                              | card/border-card      | —                   |
| closable              | 标签是否可关闭                                                                        | boolean                             | —                     | false               |
| addable               | 标签是否可增加                                                                        | boolean                             | —                     | false               |
| editable              | 标签是否同时可增加和关闭                                                              | boolean                             | —                     | false               |
| tab-position          | 选项卡所在位置                                                                        | string                              | top/right/bottom/left | top                 |
| stretch               | 标签的宽度是否自撑开                                                                  | boolean                             | -                     | false               |
| before-leave          | 切换标签之前的钩子函数， 若返回 `false ` 或者返回被 reject 的 `Promise`，则阻止切换。 | Function(activeName, oldActiveName) | —                     | —                   |

## Tabs 事件

| 事件名     | 说明                            | 回调参数                                                            |
| ---------- | ------------------------------- | ------------------------------------------------------------------- |
| tab-click  | tab 被选中时触发                | (pane: `TabsPaneContext`, ev: `Event`)                              |
| tab-change | `activeName` 改变时触发         | (name: `TabPaneName`)                                               |
| tab-remove | 点击 tab 移除按钮时触发         | (name: `TabPaneName`)                                               |
| tab-add    | 点击 tab 新增按钮时触发         | —                                                                   |
| edit       | 点击 tab 的新增或移除按钮后触发 | (paneName: `TabPaneName \| undefined`, action: `'remove' \| 'add'`) |

## Tabs 插槽

| 插槽名 | 说明     | 子标签   |
| ------ | -------- | -------- |
| -      | 默认插槽 | Tab-pane |

## Tab-pane 属性

| 属性名   | 说明                                              | 类型            | 可选值 | 默认值                                             |
| -------- | ------------------------------------------------- | --------------- | ------ | -------------------------------------------------- |
| label    | 选项卡标题                                        | string          | —      | —                                                  |
| disabled | 是否禁用                                          | boolean         | —      | false                                              |
| name     | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string / number | —      | 该选项卡在选项卡列表中的序数值，第一个选项卡为 '0' |
| closable | 标签是否可关闭                                    | boolean         | —      | false                                              |
| lazy     | 标签是否延迟渲染                                  | boolean         | —      | false                                              |

## Tab-pane 插槽

| 插槽名 | 说明                |
| ------ | ------------------- |
| -      | Tab-pane 的内容     |
| label  | Tab-pane 的标题内容 |
