---
title: Message 消息提示
lang: zh-CN
---

# Message 消息提示

常用于主动操作后的反馈提示。 与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

Message 在配置上与 Notification 非常类似，所以部分 options 在此不做详尽解释。 文末有 options 列表，可以结合 Notification 的文档理解它们。

<code src="./basic.tsx"></code>

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

当需要自定义更多属性时，Message 也可以接收一个对象为参数。 比如，设置 `type` 字段可以定义不同的状态，默认为`info`。 此时正文内容以 `message` 的值传入。 同时，我们也为 Message 的各种 type 注册了方法，可以在不传入 type 字段的情况下像下方第四个按钮那样直接调用。

<code src="./different-types.tsx"></code>

## 可关闭的消息提示

可以添加关闭按钮。

默认的 Message 是可以被人工关闭的。 如果你需要手动关闭功能，你可以把 `showClose` 设置为 true 此外，和 Notification 一样，Message 拥有可控的 `duration`， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为`0`便表示该消息不会被自动关闭。

<code src="./closable.tsx"></code>

## 文字居中

使用 `center` 属性让文字水平居中。

<code src="./centered-content.tsx"></code>

<!-- ## 使用 HTML 片段作为正文内容

`message` 还支持使用 HTML 字符串作为正文内容。

将`dangerouslyUseHTMLString`属性设置为 true,`message` 就会被当作 HTML 片段处理。

<code src="./raw-html.tsx"></code>

:::error

`message` 属性虽然支持传入 HTML 片段，但是在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 [XSS 攻击](https://en.wikipedia.org/wiki/Cross-site_scripting)。 因此在 `dangerouslyUseHTMLString` 打开的情况下，请确保 `message` 的内容是可信的，**永远不要**将用户提交的内容赋值给 `message` 属性。

::: -->

## 分组消息合并

合并相同内容的消息。

设置 `grouping` 为 true，内容相同的 `message` 将被合并。

<code src="./grouping.tsx"></code>

## 调用方法

```ts
import { ElMessage } from '@qsxy/element-plus-react';
```

此时调用方法为 `ElMessage(options)`。 我们也为每个 type 定义了各自的方法，如 `ElMessage.success(options)`。 并且可以调用 `ElMessage.closeAll()` 手动关闭所有实例。

<!-- ## 应用程序上下文继承 <el-tag> >= 2.0.3</el-tag>

现在 Message 接受一条 `context` 作为消息构造器的第二个参数，允许你将当前应用的上下文注入到 Message 中，这将允许你继承应用程序的所有属性。

你可以像这样使用它：

:::info{title=TIP}

如果您全局注册了 ElMessage 组件，它将自动继承应用的上下文环境。

:::

```ts
import { getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';

// 在你的 setup 方法中
const { appContext } = getCurrentInstance()!;
`boolean` lMessage({}, appContext);
``` -->

## Message API

### Message 配置项

| 属性          | 说明                                                     | 类型                                                               | 默认值   |
| ------------- | -------------------------------------------------------- | ------------------------------------------------------------------ | -------- |
| `message`     | 消息文字                                                 | `string \| React.ReactElement`                                     | —        |
| `type`        | 消息类型                                                 | <Enum>'success' \| 'warning' \| 'info' \| 'error'</Enum>           | `'info'` |
| `icon`        | 自定义图标，该属性会覆盖 `type` 的图标。                 | `string \| Component`                                              | —        |
| `customClass` | 自定义类名                                               | `string`                                                           | —        |
| `duration`    | 显示时间，单位为毫秒。 设为 0 则不会自动关闭             | `number`                                                           | `3000`   |
| `showClose`   | 是否显示关闭按钮                                         | `boolean`                                                          | `false`  |
| `center`      | 文字是否居中                                             | `boolean`                                                          | `false`  |
| `onClose`     | 关闭时的回调函数, 参数为被关闭的 message 实例            | <Enum type="Function">(el?: RefObject<HTMLElement>) => void</Enum> | —        |
| `offset`      | Message 距离窗口顶部的偏移量                             | `number`                                                           | `20`     |
| `grouping`    | 合并内容相同的消息，不支持 React.ReactElement 类型的消息 | `boolean`                                                          | `false`  |

### Message 方法

| 方法名  | 描述               |
| ------- | ------------------ |
| `close` | 关闭当前的 Message |
