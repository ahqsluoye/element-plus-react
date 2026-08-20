---
title: Notification
lang: en-US
---

<Meta></Meta>

# Notification

Displays a global notification message at a corner of the page.

## Basic Usage

Element Plus React has registered the `$notify` method and it accepts an Object as its parameter. In the simplest case, you can set the `title` and `message` properties to set the title and body of the notification. By default, the notification automatically closes after 4500 milliseconds, but you can customize the display time of the notification by setting the `duration` property. If you set it to `0`, the notification will not auto-close. Note that `duration` accepts a `Number` in milliseconds.

<code src="./basic.tsx"></code>

## With Types

We provide four types: success, warning, info, and error.

Element Plus React provides four notification types for the Notification component: `success`, `warning`, `info`, `error`. They can be modified by setting the `type` field, and values other than the four above will be ignored. At the same time, we have also registered separate methods for each type of Notification, which can be called directly without passing the `type` field, like `open3` and `open4`.

<code src="./different-types.tsx"></code>

## Custom Position

Notification can emerge from any corner you like.

Use the `position` property to set the pop-up position of Notification. It supports four options: `topRight`, `topLeft`, `bottomRight`, and `bottomLeft`. The default is `topRight`.

<code src="./positioning.tsx"></code>

## With Offset

Customize Notification's offset from the default position.

Notification provides the function of setting offsets. By setting the `offset` field, the popped message can be offset from the screen edge. Note that at the same time, each Notification instance should have the same offset.

<code src="./offsetting.tsx"></code>

## Use ReactNode as Content

`message` supports ReactNode as content.

<code src="./raw-html.tsx"></code>

## Hide Close Button

The close button of the notification can be hidden.

Set the `showClose` property to `false` to hide the close button.

<code src="./no-close.tsx"></code>

## Local Import

```javascript
import { ElNotification } from '@qsxy/element-plus-react';
```

You can call `ElNotification(options)` to invoke the notification bar in the corresponding handler. We have also pre-defined separate methods for multiple types, such as `ElNotification.success(options)`. When you need to close all notification bars on the page, you can call `ElNotification.closeAll()` to close all instances.

<!--
## App Context Inheritance <el-tag>> 2.0.4</el-tag>

Now Notification accepts a `context` as the second parameter of the message constructor, allowing you to inject the current application's context into Notification, which enables you to inherit all the properties of the application.

You can use it like this:

:::info{title=TIP}

If you globally register the ElNotification component, it will automatically inherit the application's context.

:::

```ts
import { getCurrentInstance } from 'vue';
import { ElNotification } from 'element-plus';

// in your setup method
const { appContext } = getCurrentInstance()!;
ElNotification({}, appContext);
``` -->

## API

### Configuration Options

| Name      | Description                                                                                          | Type                                                                      | Default    |
| --------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------- |
| title     | Title                                                                                                | `string`                                                                  | ''         |
| message   | Content of the notification                                                                          | `string \| React.ReactElement`                                            | ''         |
| type      | Notification type                                                                                    | <Enum>'success' \| 'warning' \| 'info' \| 'error' \| ''</Enum>            | ''         |
| iconClass | Custom icon class name, used to customize icon styles                                                 | `string`                                                                  | —          |
| duration  | Display duration in milliseconds. Set to 0 to not auto-close                                        | `number`                                                                  | 4500       |
| position  | Custom pop-up position                                                                                | <Enum>'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'</Enum> | top-right  |
| showClose | Whether to show a close button                                                                       | `boolean`                                                                 | true       |
| onClose   | Callback when closed                                                                                | <Enum type="Function">() => void</Enum>                                   | —          |
| onClick   | Callback when clicking Notification                                                                  | <Enum type="Function">() => void</Enum>                                   | —          |
| onSuccess | Callback when the notification is successfully displayed                                              | <Enum type="Function">(ref: HTMLDivElement) => void</Enum>                | —          |
| offset    | Offset from the top of the screen. All Notification instances should have the same offset at the same time | `number`                                                                  | 0          |

<!-- The following properties are not found in the current type definitions -->
<!-- | id        | Notification id                                                                                   | `string`                                                                  | —         | -->
<!-- | icon      | Custom icon. If `type` is set, `icon` will be overridden                                          | `string` / `Component`                                                    | —         | -->
<!-- | className | Custom class name                                                                                | `string`                                                                  | ''        | -->

### Methods

| Name  | Description                        | Type                                    |
| ----- | ---------------------------------- | --------------------------------------- |
| close | Close the current Notification     | <Enum type="Function">() => void</Enum> |