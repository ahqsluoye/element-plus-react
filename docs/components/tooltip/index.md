---
title: Tooltip 文字提示
lang: zh-CN
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里我们提供 9 种不同方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

使用 `content` 属性来决定 `hover` 时的提示信息。 由 `placement` 属性决定展示效果： `placement`属性值为：`[方向]-[对齐位置]`；四个方向：`top`、`left`、`right`、`bottom`；三种对齐位置：`start`, `end`，默认为空。 如 `placement="left-end"`，则提示信息出现在目标元素的左侧，且提示信息的底部与目标元素的底部对齐。

<code src="./basic.tsx"></code>

## 主题

Tooltip 组件内置了两个主题：`dark`和`light`。

:::info{title=TIP}

要使用自定义主题，您必须知道您的工具提示在哪里渲染， 如果您的工具提示被呈现为根元素，您将需要全局设置 css 规则。

建议您使用自定义主题并同时显示箭头时不使用线性渐变背景颜色。 因为弹出箭头和内容是两个不同的元素， 弹出箭头的样式需要单独设置， 当它到渐变背景颜色时，会看起来很奇怪。

:::

通过设置 `effect` 来修改主题，默认值为 `dark`.

<code src="./theme.tsx"></code>

## 更多内容的文字提示

展示多行文本或者是设置文本内容的格式

<code src="./rich-content.tsx"></code>

<!-- ## 高级扩展

除了这些基本设置外，还有一些属性可以让使用者更好的定制自己的效果：

`transition` 属性可以定制显隐的动画效果，默认为`fade-in-linear`。

如果需要关闭 `tooltip` 功能，`disabled` 属性可以满足这个需求， 你只需要将其设置为 `true`。

事实上，Tooltip 是一个基于 [ElPopper](https://github.com/element-plus/element-plus/tree/dev/packages/components/popper) 的扩展，您可以使用 ElPopper 中允许的任何属性。

<code src="./advanced-usage.tsx"></code>

:::info{title=TIP}

Tooltip 内不支持 `routerLink` 组件，请使用 `vm.$router.push` 代替。

tooltip 内不支持 disabled form 元素，参考 [MDN](https://developer.mozilla.org/en-US/docs/Web/事件/mouseenter)， 请在 disabled form 元素外层添加一层包裹元素。

::: -->

<!-- ## 显示 HTML 内容

内容属性可以设置为 HTML 字符串。

:::error

`content` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `rawContent` 打开的情况下，请确保 `content` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `content` 属性。

:::

<code src="./html-content.tsx"></code> -->

<!-- ## 虚拟触发

有时候我们想把 tooltip 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

tip

需要注意的是，虚拟触发的 tooltip 是受控组件，因此你必须自己去控制 tooltip 是否显示，**你将无法**通过点击空白处来关闭 tooltip。

<code src="./virtual-trigger.tsx"></code> -->

<!-- ## 单例模式

Tooltip 可以作为单例，也就是是说你可以同时有多个触发同一个 tooltip 的触发元素，这个功能是在 `虚拟触发` 的基础上开发的。

:::info{title=TIP}

已知问题：当使用单例模式时，tooltip 的触发元素发生改变的时候可能会发生弹跳。

:::

<code src="./singleton.tsx"></code> -->

## 受控模式

Tooltip 可以通过父组件使用 `:visible` 来控制它的显示与关闭。

<code src="./controlled.tsx"></code>

<!-- ## 自定义动画

Tooltip 可以自定义动画，你可以根据需要自行设置所需的动画方法。

<code src="./animations.tsx"></code> -->

## API

### 属性

| 名称          | 说明                                                           | 类型                                                                                                                                                                            | 默认   |
| ------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| appendTo      | 指示 Tooltip 的内容将附加在哪一个网页元素上                    | `CSSSelector` / `HTMLElement`                                                                                                                                                   | —      |
| effect        | Tooltip 主题，内置了 `dark` / `light` 两种                     | <Enum>'dark' \| 'light'</Enum>                                                                                                                                                  | dark   |
| content       | 显示的内容                                                     | `string`                                                                                                                                                                        | ''     |
| placement     | Tooltip 组件出现的位置                                         | <Enum>'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | bottom |
| visible       | Tooltip 组件可见性                                             | `boolean`                                                                                                                                                                       | —      |
| disabled      | Tooltip 组件是否禁用                                           | `boolean`                                                                                                                                                                       | —      |
| offset        | 出现位置的偏移量                                               | `number`                                                                                                                                                                        | 12     |
| popperOptions | [popper.js](https://popper.js.org/docs/v2/) 参数               | `object` 请参考 [popper.js](https://popper.js.org/docs/v2/) 文档                                                                                                                | {}     |
| showAfter     | 在触发后多久显示内容，单位毫秒                                 | `number`                                                                                                                                                                        | 0      |
| showArrow     | tooltip 的内容是否有箭头                                       | `boolean`                                                                                                                                                                       | true   |
| hideAfter     | 延迟关闭，单位毫秒                                             | `number`                                                                                                                                                                        | 200    |
| autoClose     | tooltip 出现后自动隐藏延时，单位毫秒                           | `number`                                                                                                                                                                        | 0      |
| popperClass   | 为 Tooltip 的 popper 添加类名                                  | `string`                                                                                                                                                                        | —      |
| enterable     | 鼠标是否可进入到 tooltip 中                                    | `boolean`                                                                                                                                                                       | true   |
| teleported    | 是否使用 teleport。设置成 `true`则会被追加到 `appendTo` 的位置 | `boolean`                                                                                                                                                                       | true   |
| trigger       | 如何触发 Tooltip                                               | <Enum>'hover' \| 'click' \| 'contextmenu'</Enum>                                                                                                                                | hover  |

### Ref

| 名称         | 详情                                 | 类型                                                    |
| ------------ | ------------------------------------ | ------------------------------------------------------- |
| popperRef    | el-popper 组件实例                   | <Enum type='objcet'>Ref<PopperOptionRef \| null></Enum> |
| updatePopper | 更新 el-popper 组件实例              | <Enum type='Function'>() => void</Enum>                 |
| onOpen       | onOpen 方法控制 el-tooltip 显示状态  | <Enum type='Function'>() => void</Enum>                 |
| onClose      | onClose 方法控制 el-tooltip 显示状态 | <Enum type='Function'>() => void</Enum>                 |
| hide         | 提供 hide 方法                       | <Enum type='Function'>() => void</Enum>                 |
