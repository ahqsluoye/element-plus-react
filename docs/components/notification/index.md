---
title: Notification 通知
lang: zh-CN
---

# Notification 通知

悬浮出现在页面角落，显示全局的通知提醒消息。

## 基础用法

Element Plus React 注册了 `$notify` 方法并且它接受一个 Object 作为其参数。 在最简单的情况下，你可以通过设置 `title` 和 `message` 属性来设置通知的标题和正文内容。 默认情况下，通知在 4500 毫秒后自动关闭，但你可以通过设置 `duration` 属性来自定义通知的展示时间。 如果你将它设置为 `0`，那么通知将不会自动关闭。 需要注意的是 `duration` 接收一个 `Number`，单位为毫秒。

<code src="./basic.tsx"></code>

## 不同类型的通知

我们提供了四种不同类型的提醒框：success、warning、info 和 error。

Element Plus React 为 Notification 组件准备了四种通知类型：`success`, `warning`, `info`, `error`。 他们可以设置 `type` 字段来修改，除上述的四个值之外的值会被忽略。 同时，我们也为 Notification 的各种 type 注册了单独的方法，可以在不传入 `type` 字段的情况下像 `open3` 和 `open4` 那样直接调用。

<code src="./different-types.tsx"></code>

## 自定义消息弹出的位置

可以让 Notification 从屏幕四角中的任意一角弹出

使用 `position` 属性设置 Notification 的弹出位置， 支持四个选项：`topRight`、`topLeft`、`bottomRight` 和 `bottomLeft`， 默认为 `topRight`。

<code src="./positioning.tsx"></code>

## 有位置偏移的通知栏

能够设置偏移量来使 Notification 偏移默认位置。

`boolean` otification 提供设置偏移量的功能，通过设置 `offset` 字段，可以使弹出的消息距屏幕边缘偏移一段距离。 注意在同一时刻，每一个的 Notification 实例应当具有一个相同的偏移量。

<code src="./offsetting.tsx"></code>

## 使用 ReactNode 作为正文内容

`message` 支持 ReactNode 来作为正文内容。

<code src="./raw-html.tsx"></code>

## 隐藏关闭按钮

通知的关闭按钮可以被设置为隐藏。

将 `showClose` 属性设置为 `false` 即可隐藏关闭按钮。

<code src="./no-close.tsx"></code>

## 单独引用

```javascript
import { ElNotification } from '@qsxy/element-plus-react';
```

你可以在对应的处理函数内调用 `ElNotification(options)` 来呼出通知栏。 我们也提前定义了多个 type 的单独调用方法，如 `ElNotification.success(options)`。 当你需要关闭页面上所有的通知栏的时候，可以调用 `ElNotification.closeAll()` 来关闭所有的实例。

<!--
## 应用程序上下文继承 <el-tag>> 2.0.4</el-tag>

现在 Notification 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 Notification 中，这将允许你继承应用程序的所有属性。

你可以像这样使用它：

:::info{title=TIP}

如果您全局注册了 ElNotification 组件，它将自动继承应用的上下文环境。

:::

```ts
import { getCurrentInstance } from 'vue';
import { ElNotification } from 'element-plus';

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!;
`boolean` lNotification({}, appContext);
``` -->

## API

### 配置项

| 名称      | 说明                                                                                          | 类型                                                                      | 默认      |
| --------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------- |
| title     | 标题                                                                                          | `string`                                                                  | ''        |
| message   | 通知栏正文内容                                                                                | `string` / `VNode` / <Enum type="Function">() => VNode</Enum>             | ''        |
| type      | 通知的类型                                                                                    | <Enum>'success' \| 'warning' \| 'info' \| 'error' \| ''</Enum>            | ''        |
| icon      | 自定义图标。 若设置了 `type`，则 `icon` 会被覆盖                                              | `string` / `Component`                                                    | —         |
| className | 自定义类名                                                                                    | `string`                                                                  | ''        |
| duration  | 显示时间, 单位为毫秒。 值为 0 则不会自动关闭                                                  | `number`                                                                  | 4500      |
| position  | 自定义弹出位置                                                                                | <Enum>'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'</Enum> | top-right |
| showClose | 是否显示关闭按钮                                                                              | `boolean`                                                                 | true      |
| onClose   | 关闭时的回调函数                                                                              | <Enum type="Function">() => void</Enum>                                   | —         |
| onClick   | 点击 Notification 时的回调函数                                                                | <Enum type="Function">() => void</Enum>                                   | —         |
| offset    | 相对屏幕顶部的偏移量 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | `number`                                                                  | 0         |

### 方法

| 名称  | 详情                    | 类型                                    |
| ----- | ----------------------- | --------------------------------------- |
| close | 关闭当前的 Notification | <Enum type="Function">() => void</Enum> |
