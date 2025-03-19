---
title: Timeline 时间线
lang: zh-CN
---

# Timeline 时间线

可视化地呈现时间流信息。

## 基础用法

Timeline 可拆分成多个按照时间戳排列的活动， 时间戳是其区分于其他控件的重要特征， 使用时注意与 Steps 步骤条等区分。

:::demo

<code src="./basic.tsx"></code>

:::

## ⾃定义节点样式

可根据实际场景⾃定义节点尺⼨、颜⾊，或直接使⽤图标。

:::demo

<code src="./custom-node.tsx"></code>

:::

## ⾃定义时间戳

当内容在垂直⽅向上过⾼时，可将时间戳置于内容之上。

:::demo

<code src="./custom-timestamp.tsx"></code>

:::

## 垂直居中

垂直居中样式的 Timeline-Item

:::demo

<code src="./center.tsx"></code>

:::

## Timeline API

### Timeline Slots

| 插槽名  | 说明                          | 子标签        |
| ------- | ----------------------------- | ------------- |
| default | timeline 组件的自定义默认内容 | Timeline-Item |

## Timeline-Item API

### Timeline-Item Attributes

| 属性名         | 说明           | 类型                                                                   | 默认值 |
| -------------- | -------------- | ---------------------------------------------------------------------- | ------ |
| timestamp      | 时间戳         | `string`                                                               | ''     |
| hide-timestamp | 是否隐藏时间戳 | `boolean`                                                              | false  |
| center         | 是否垂直居中   | `boolean`                                                              | false  |
| placement      | 时间戳位置     | <Enum>'top' \| 'bottom'</Enum>                                         | bottom |
| type           | 节点类型       | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> | ''     |
| color          | 节点颜色       | <Enum>'hsl' \| 'hsv' \| 'hex' \| 'rgb'</Enum>                          | ''     |
| size           | 节点尺寸       | <Enum>'normal' \| 'large'</Enum>                                       | normal |
| icon           | 自定义图标     | `string` / `Component`                                                 | —      |
| hollow         | 是否空心点     | `boolean`                                                              | false  |

### Timeline-Item Slots

| 插槽名  | 说明                                        |
| ------- | ------------------------------------------- |
| default | customize default content for timeline item |
| dot     | customize defined node for timeline item    |
