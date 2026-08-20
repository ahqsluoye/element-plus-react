---
title: Message
lang: en-US
---

<Meta></Meta>

# Message

Used to show feedback after an activity. The difference with Notification is that the latter is often used for system-level passive notifications.

## Basic Usage

Displays at the top and disappears after 3 seconds automatically.

The setup of Message is very similar to Notification, so some options won't be explained in detail here. You can check the options table below combined with the Notification documentation to understand them.

<code src="./basic.tsx"></code>

## Different Types

Used to show feedback for operations like "success", "warning", "message", and "error".

When you need more customizations, the Message component can also take an object as a parameter. For example, setting the `type` field can define different types, and the default is `info`. In this case, the main content is passed in as the value of `message`. We have also registered methods for different types of Message, so you can call them directly without passing a `type` field, like the fourth button below.

<code src="./different-types.tsx"></code>

## Closable Messages

A close button can be added.

By default, Message can be closed manually. If you need a close button, you can set `showClose` to `true`. Besides, like Notification, Message has a controllable `duration`. The default duration is 3000 milliseconds, and it will not auto-close when set to `0`.

<code src="./closable.tsx"></code>

## Plain

Set `plain` to have a plain background.

<code src="./plain.tsx"></code>

<!-- ## Use HTML as Content

`message` also supports HTML strings as content.

Set the `dangerouslyUseHTMLString` property to `true`, and `message` will be treated as an HTML fragment.

<code src="./raw-html.tsx"></code>

:::error

Although the `message` property supports HTML fragments, dynamically rendering arbitrary HTML on your website is very dangerous because it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). So when `dangerouslyUseHTMLString` is enabled, please make sure the content of `message` is trusted, and **never** assign user-submitted content to the `message` property.

::: -->

## Grouping

Merge messages with the same content.

Set `grouping` to `true`, and messages with the same `message` content will be merged.

<code src="./grouping.tsx"></code>

## How to Use

```ts
import { ElMessage } from '@qsxy/element-plus-react';
```

You can call `ElMessage(options)` to create a message. We have also registered methods for each type, such as `ElMessage.success(options)`. You can also call `ElMessage.closeAll()` to manually close all instances.

<!-- ## App Context Inheritance <el-tag> >= 2.0.3</el-tag>

Now Message accepts a `context` as the second parameter of the message constructor, allowing you to inject the current application's context into Message, which enables you to inherit all the properties of the application.

You can use it like this:

:::info{title=TIP}

If you globally register the ElMessage component, it will automatically inherit the application's context.

:::

```ts
import { getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';

// in your setup method
const { appContext } = getCurrentInstance()!;
ElMessage({}, appContext);
``` -->

## Message API

### Message Configuration

| Name        | Description                                                     | Type                                                                        | Default  |
| ----------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| plain       | Whether it is plain                                             | `boolean`                                                                   | —        |
| message     | Message text                                                   | `string \| React.ReactElement`                                              | —        |
| type        | Message type                                                   | <Enum>'primary' \| 'success' \| 'warning' \| 'info' \| 'error' \| ''</Enum> | `'info'` |
| iconClass   | Custom icon                                                    | `string`                                                                    | —        |
| duration    | Display duration in milliseconds. Set to 0 to not auto-close   | `number`                                                                    | `3000`   |
| showClose   | Whether to show a close button                                 | `boolean`                                                                   | `false`  |
| onClose     | Callback when closed, with the closed message instance as parameter | <Enum type="Function">(el?: RefObject<HTMLElement>) => void</Enum>          | —        |
| immediate   | Whether to execute the onClose method immediately              | `boolean`                                                                   | —        |
| userOnClose | Callback when the user closes the message                      | <Enum type="Function">(el?: RefObject<HTMLElement>) => void</Enum>          | —        |
| offset      | Offset of Message from the top of the window                   | `number`                                                                    | `20`     |
| grouping    | Merge messages with the same content, React.ReactElement type is not supported | `boolean`                                                                   | `false`  |

<!-- The following properties are not found in the current type definitions -->
<!-- | id          | Message id                                                  | `string`                                                                    | —        | -->
<!-- | placement | Message placement position | <Enum>'top' \| 'top-left' \| 'top-right' \| 'bottom' \| 'bottom-left' \| 'bottom-right'</Enum> | — | -->
<!-- | icon        | Custom icon, which will override the `type` icon             | `string \| Component`                                              | —        | -->
<!-- | customClass | Custom class name                                           | `string`                                                           | —        | -->
<!-- | center      | Whether the text is centered                                | `boolean`                                                          | `false`  | -->

### Message Methods

| Name    | Description                |
| ------- | -------------------------- |
| `close` | Close the current Message  |