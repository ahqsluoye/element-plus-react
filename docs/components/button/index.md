---
title: Button 按钮
lang: zh-CN
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。
<code src="./basic.tsx"></code>

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

<code src="./disabled.tsx"></code>

## 链接按钮

<code src="./link.tsx"></code>

## 文字按钮

没有边框和背景色的按钮。

<code src="./text.tsx"></code>

## 虚线按钮

虚线边框和没有背景色的按钮。

<code src="./dashed.tsx"></code>

## 图标按钮

使用图标为按钮添加更多的含义。 你也可以单独使用图标不添加文字来节省显示区域占用。

使用 `icon` 属性来为按钮添加图标。 您可以在我们的 Icon 组件中找到所需图标。

<code src="./icon.tsx"></code>

## 按钮组

以按钮组的方式出现，常用于多项类似操作。

使用 `<Button.Group>` 对多个按钮分组。

<code src="./group.tsx"></code>

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 `loading` 属性为 `true` 来显示加载中状态。

:::info{title=TIP}

您可以使用 `loadingSlot` 或 `loadingIcon`属性自定义您的 loading 图标

ps: `loadingSlot` 优先级高于`loadingIcon`属性

:::

<code src="./loading.tsx"></code>

## 调整尺寸

除了默认的大小，按钮组件还提供了几种额外的尺寸可供选择，以便适配不同的场景。

使用 `size` 属性额外配置尺寸，可使用 `large`和`small`两种值。

<code src="./size.tsx"></code>

<!-- ## 自定义颜色

您可以自定义按钮颜色。

我们将自动计算 hover 和 active 颜色。

demo

<code src="./custom.tsx" ></code>

 -->

## Button API

### Button 属性

| 属性名          | 说明                           | 类型                                                                               | 默认值  |
| --------------- | ------------------------------ | ---------------------------------------------------------------------------------- | ------- |
| size            | 尺寸                           | <Enum>'large'\| 'small'</Enum>                                                     | —       |
| type            | 类型                           | <Enum>'primary'\| 'success'\| 'warning'\| 'error'\| 'info'\| 'text'(delete)</Enum> | —       |
| plain           | 是否为朴素按钮                 | `boolean`                                                                          | false   |
| text            | 是否为文字按钮                 | `boolean`                                                                          | false   |
| dashed          | 是否为虚线按钮                 | `boolean`                                                                          | false   |
| bg              | 是否显示文字按钮背景颜色       | `boolean`                                                                          | false   |
| link            | 是否为链接按钮                 | `boolean`                                                                          | false   |
| round           | 是否为圆角按钮                 | `boolean`                                                                          | false   |
| circle          | 是否为圆形按钮                 | `boolean`                                                                          | false   |
| loading         | 是否为加载中状态               | `boolean`                                                                          | false   |
| loadingSlot     | 自定义加载中状态图标组件       | `Component`                                                                        | —       |
| loadingIcon     | 自定义加载中状态图标名称       | `string`                                                                           | spinner |
| disabled        | 按钮是否为禁用状态             | `boolean`                                                                          | false   |
| icon            | 图标组件                       | `string`                                                                           | —       |
| autofocus       | 原生 `autofocus` 属性          | `boolean`                                                                          | false   |
| nativeType      | 原生 type 属性                 | <Enum>'button'\| 'submit'\| 'reset'</Enum>                                         | button  |
| autoInsertSpace | 自动在两个中文字符之间插入空格 | `boolean`                                                                          | —       |

<!--
| dark            | dark 模式, 意味着自动设置 `color` 为 dark 模式的颜色        | `boolean`                                                                           | false   | -->

### Button Ref

| 属性名         | 说明                       | 类型                                                                                              |
| -------------- | -------------------------- | ------------------------------------------------------------------------------------------------- |
| ref            | 按钮 html 元素             | <Enum type='object'>Ref\<HTMLButtonElement></Enum>                                                |
| size           | 按钮尺寸                   | <Enum type='object'>'' \| 'large'\| 'small' \| 'default</Enum>                                    |
| type           | 按钮类型                   | <Enum type='object'>'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> |
| disabled       | 按钮已禁用                 | `boolean`                                                                                         |
| shouldAddSpace | 是否在两个字符之间插入空格 | `boolean`                                                                                         |

## ButtonGroup API

### ButtonGroup 属性

| 插槽名      | 说明                         | 类型                                                               | 默认值 |
| ----------- | ---------------------------- | ------------------------------------------------------------------ | ------ |
| size        | 用于控制该按钮组内按钮的大小 | <Enum>'large'\| 'small'</Enum>                                     | —      |
| type        | 用于控制该按钮组内按钮的类型 | <Enum>'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'</Enum> | —      |
| bgColor     | 自定义按钮颜色               | `string`                                                           | —      |
| borderColor | 自定义按钮边框颜色           | `string`                                                           | —      |
| disabled    | 按钮是否为禁用状态           | `boolean`                                                          | false  |
