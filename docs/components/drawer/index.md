---
title: Drawer 抽屉
lang: zh-CN
---

# Drawer 抽屉

有些时候, `Dialog` 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, `Drawer` 拥有和 `Dialog` 几乎相同的 API, 在 UI 上带来不一样的体验.

## 基础用法

呼出一个临时的侧边栏, 可以从多个方向呼出

你必须像 `Dialog`一样为 `Drawer` 设置 `visible` 属性来控制 `Drawer` 的显示与隐藏状态，该属性接受一个 `boolean` 类型。 `Drawer` 包含三部分: `title` & `body` & `footer`, 你还可以通过 `title` 属性来设置标题, 默认情况下它是一个空字符串, 其中 `body` 部分是 `Drawer` 组件的主区域, 它包含了用户定义的主要内容. `footer` 用来显示页脚信息. 当 `Drawer` 打开时，默认设置是**从右至左**打开 **30%** 浏览器宽度。 你可以通过传入对应的 `direction` 和 `size` 属性来修改这一默认行为。 下面一个示例将展示如何使用 `beforeClose` API，更多详细用法请参考页面底部的 API 部分。

<code src="./basic-usage.tsx"></code>

## 不添加 Title

当你不需要标题的时候，你可以将它移除。

通过设置 `withHeader` 属性为 **false** 来控制是否显示标题。 如果你的应用需要具备可访问性，请务必设置好 `title`。

<code src="./no-title.tsx"></code>

## 自定义内容

像 `Dialog` 组件一样，`Drawer` 也可以用来显示多种不同的交互。

<code src="./customization-content.tsx"></code>

<!-- ## 自定义头部

`header` 可用于自定义显示标题的区域。 为了保持可用性，除了使用此插槽外，使用 `title` 属性，或使用 `titleId` 插槽属性来指定哪些元素应该读取为抽屉标题。

<code src="./customization-header.tsx"></code> -->

## 嵌套抽屉

你可以像 `Dialog` 一样拥有多层嵌套的 `Drawer`

如果你需要在不同图层中多个抽屉，你必须设置 `append-to-body` 属性到 **true**

<code src="./nested-drawer.tsx"></code>

:::info{title=TIP}

Drawer 的内容是懒渲染的，即在第一次被打开之前，传入的内容 不会被渲染到 DOM 上。 因此，如果需要执行 DOM 操作，或通过 `ref` 获取相应组件，请在 `open` 事件回调中进行。

:::

## Drawer 属性

| 属性名            | 说明                                                                                                                       | 类型                                                | 默认值        |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------- |
| visible           | 是否显示 Drawer（可控**必填项**）                                                                                          | `boolean`                                           | false         |
| defaultVisible    | 默认是否显示 Drawer（不可控）                                                                                              | `boolean`                                           | false         |
| close             | 关闭 Drawer 方法（**必填项**）                                                                                             | <Enum type="Function">() => void</Enum>             |               |
| lockScroll        | 是否在 Drawer 出现时将 body 滚动锁定                                                                                       | `boolean`                                           | true          |
| beforeClose       | 关闭前的回调，会暂停 Drawer 的关闭                                                                                         | <Enum type="Function">(done: DoneFn) => void</Enum> | —             |
| closeOnClickModal | 是否可以通过点击 modal 关闭 Drawer                                                                                         | `boolean`                                           | true          |
| className         | Drawer 的自定义类名                                                                                                        | string                                              | —             |
| modal             | 是否需要遮罩层                                                                                                             | `boolean`                                           | true          |
| direction         | Drawer 打开的方向                                                                                                          | <Enum>top \| bottom \| right \| left                | right </Enum> |
| showClose         | 是否显示关闭按钮                                                                                                           | `boolean`                                           | true          |
| border            | 标题是否有边框                                                                                                             | `boolean`                                           | true          |
| size              | Drawer 窗体的大小, 当使用 `number` 类型时, 以像素为单位, 当使用 `string` 类型时, 请传入 'x%', 否则便会以 `number` 类型解释 | `number` / `string`                                 | '30%'         |
| title             | Drawer 的标题                                                                                                              | `string` \| `ReactElement`                          | —             |
| withHeader        | 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title 属性不生效                                                   | `boolean`                                           | true          |
| modalClassName    | 遮罩层的自定义类名                                                                                                         | `string`                                            | -             |

### 子组件

| 组件名          | 说明                    |
| --------------- | ----------------------- |
| ElDrawer.body   | Dialog 的内容           |
| ElDrawer.footer | Dialog 按钮操作区的内容 |

## Drawer 事件

| 事件名   | 说明                        | Type                                    |
| -------- | --------------------------- | --------------------------------------- |
| onOpen   | Dialog 打开的回调           | <Enum type="Function">() => void</Enum> |
| onOpened | Dialog 打开动画结束时的回调 | <Enum type="Function">() => void</Enum> |
| onClose  | Dialog 关闭的回调           | <Enum type="Function">() => void</Enum> |
| onClosed | Dialog 关闭动画结束时的回调 | <Enum type="Function">() => void</Enum> |
