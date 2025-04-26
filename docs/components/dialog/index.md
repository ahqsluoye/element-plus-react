---
title: Dialog 对话框
lang: zh-CN
---

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `visible` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为三个部分：`header`，`body` 和 `footer`， `header` 用于定义标题。 最后，本例还展示了 `beforeClose` 的用法。

<code src="./basic-usage.tsx"></code>

:::info{title=TIP}

`beforeClose` 只会在用户点击关闭按钮或者对话框的遮罩区域时被调用。 如果你在 `footer` 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 `beforeClose` 的相关逻辑。
:::

## 自定义内容

对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 Element Plus React 的表格和表单。

<code src="./customization-content.tsx"></code>

## 自定义头部

`header` 可用于自定义显示标题的区域。

<code src="./customization-header.tsx"></code>

## 嵌套的对话框

<code src="./nested-dialog.tsx"></code>

## 内容居中

对话框的内容可以居中。

将`center`设置为`true`即可使标题和底部居中。 `center`仅影响标题和底部区域。 Dialog 的内容是任意的，在一些情况下，内容并不适合居中布局。 如果需要内容也水平居中，请自行为其添加 CSS 样式。

<code src="./centered-content.tsx"></code>

:::info{title=TIP}
Dialog 的内容是懒渲染的——在被打开之前，内容 不会被立即渲染到 DOM 上。 因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在`onOpen`， `onEnter` 或 `afterEnter` 事件回调中进行。
:::

## 居中对话框

从屏幕中心打开对话框。

设置 `align-center` 为 `true` 使对话框水平垂直居中。 由于对话框垂直居中在弹性盒子中，所以`top`属性将不起作用。

<code src="./align-center.tsx"></code>

## 可拖拽对话框

试着拖动一下`header`部分吧

设置`draggable`属性为`true`以做到拖拽，设置 `overflow` 为 true 可以让拖拽范围超出可视区。

<code src="./draggable-dialog.tsx"></code>

## 全屏 ​

设置 fullscreen 属性来打开全屏对话框。

<code src="./fullscreen-dialog.tsx"></code>

## API

### Attributes

| 属性名            | 说明                                                                                            | 类型                                                | 默认  |
| ----------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------- | ----- |
| visible           | 是否显示 Dialog（可控**必填项**）                                                               | `boolean`                                           | —     |
| defaultVisible    | 默认是否显示 Dialog                                                                             | `boolean`                                           | —     |
| close             | 关闭 Dialog 方法（**必填项**）                                                                  | <Enum type="Function">() => void</Enum>             |       |
| close             | 默认是否显示 Dialog                                                                             | `boolean`                                           | —     |
| title             | Dialog 对话框 Dialog 的标题                                                                     | `string`                                            | ''    |
| width             | 对话框的宽度，默认值为 50%                                                                      | `string` / `number`                                 | ''    |
| fullscreen        | 是否为全屏 Dialog                                                                               | `boolean`                                           | false |
| top               | dialog CSS 中的 margin-top 值，默认为 15vh                                                      | `string`                                            | ''    |
| modal             | 是否需要遮罩层                                                                                  | `boolean`                                           | true  |
| className         | 遮罩的自定义类名                                                                                | `string`                                            | —     |
| lockScroll        | 是否在 Dialog 出现时将 body 滚动锁定                                                            | `boolean`                                           | true  |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Dialog                                                              | `boolean`                                           | true  |
| showClose         | 是否显示关闭按钮                                                                                | `boolean`                                           | true  |
| beforeClose       | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候. | <Enum type="Function">(done: DoneFn) => void</Enum> | —     |
| draggable         | 为 Dialog 启用可拖拽功能                                                                        | `boolean`                                           | false |
| center            | 是否让 Dialog 的 header 和 footer 部分居中排列                                                  | `boolean`                                           | false |
| alignCenter       | 是否水平垂直对齐对话框                                                                          | `boolean`                                           | false |
| unmountOnExit     | 当关闭 Dialog 时，销毁其中的元素                                                                | `boolean`                                           | false |
| zIndex            | 和原生的 CSS 的 z-index 相同，改变 z 轴的顺序                                                   | `number`                                            | —     |

### 子组件

| 组件名          | 说明                    |
| --------------- | ----------------------- |
| ElDialog.body   | Dialog 的内容           |
| ElDialog.footer | Dialog 按钮操作区的内容 |

### Events

| 事件名   | 说明                        | Type                                    |
| -------- | --------------------------- | --------------------------------------- |
| onOpen   | Dialog 打开的回调           | <Enum type="Function">() => void</Enum> |
| onOpened | Dialog 打开动画结束时的回调 | <Enum type="Function">() => void</Enum> |
| onClose  | Dialog 关闭的回调           | <Enum type="Function">() => void</Enum> |
| onClosed | Dialog 关闭动画结束时的回调 | <Enum type="Function">() => void</Enum> |
