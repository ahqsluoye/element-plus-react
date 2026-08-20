---
title: MessageBox
lang: en-US
---

<Meta></Meta>

# MessageBox

A set of modal boxes simulating system message boxes, mainly for alerting information, confirming operations, and prompting for content.

:::info{title=TIP}

By design, MessageBox is used to beautify the system's native `alert`, `confirm`, and `prompt`, so it is suitable for displaying relatively simple content. If you need to display more complex content, please use Dialog.

:::

## Alert

Triggered when the user performs an action. The dialog interrupts the user's operation until they confirm to close it.

Call the `ElMessageBox.alert` method to open an alert box. It simulates the system's `alert` and cannot be closed by pressing ESC or clicking outside the box. In this example, two parameters, `message` and `title`, are received. It is worth mentioning that when the box is closed, it returns a `Promise` object by default for further processing. If you are not sure whether the browser supports `Promise`, you can import a third-party polyfill or use a callback for further processing like this example.

<code src="./alert.tsx"></code>

## Confirm

Used to prompt the user to confirm the action they triggered and ask whether to proceed.

Call the `ElMessageBox.confirm` method to open a confirm box. It simulates the system's `confirm`. The MessageBox component is also highly customizable. We can pass `options` as the third parameter, which is an object literal. The `type` field indicates the message type, which can be `success`, `error`, `info`, and `warning`. Invalid values will be ignored. Note that the second parameter `title` must be of type `String`. If it is an `Object`, it will be treated as `options`. Here we return a `Promise` to handle subsequent responses.

<code src="./confirm.tsx"></code>

## Prompt

Used when the user needs to input content.

Call the `ElMessageBox.prompt` method to open a prompt box. It simulates the system's `prompt`. You can use the `inputPattern` field to specify the matching pattern, and use `inputValidator` to specify the validation method, which should return `Boolean` or `String`. Returning `false` or `String` means validation failed, and the returned string will be used as `inputErrorMessage` to prompt the user for the error reason. In addition, you can use the `inputPlaceholder` field to define the placeholder of the input box.

<code src="./prompt.tsx"></code>

## Customization

The message box can be customized to display various content.

The three methods mentioned above are all secondary wrappers around the `ElMessageBox` method. This example directly calls the `ElMessageBox` method and uses the `showCancelButton` field to display a cancel button. In addition, you can use `cancelButtonClass` to add a custom style, and `cancelButtonText` to customize the cancel button text (the Confirm button also has the same fields, and there is a complete list of fields in the API documentation at the end of this article). This example also uses the `beforeClose` property. When `beforeClose` is assigned as a callback function, it will be called before the message box is closed, and can be used to prevent the box from being closed. It is a method that receives three parameters: `action`, `instance`, and `done`. Using it, you can perform some operations on the instance before closing, such as adding a `loading` state to the confirm button; if you need to close the instance at this point, you can call the `done` method (if `done` is not called in `beforeClose`, the box will not be closed).

<code src="./customization.tsx"></code>

## Using HTML

`ElMessageBox` supports passing HTML strings as content.

Set the `dangerouslyUseHTMLString` property to `true`, and the `message` property will be treated as an HTML fragment.

<code src="./use-html.tsx"></code>

:::error{title=WARNING}

Although the `message` property supports HTML fragments, dynamically rendering arbitrary HTML on your website is very dangerous because it can easily lead to [XSS attacks](https://en.wikipedia.org/wiki/Cross-site_scripting). So when `dangerouslyUseHTMLString` is enabled, please make sure the content of `message` is trusted, and **never** assign user-submitted content to the `message` property.

:::

## Distinguishing Cancel and Close

In some scenarios, clicking the cancel button and clicking the close button have different meanings.

By default, when the user triggers cancel (clicks the cancel button) and triggers close (clicks the close button or mask layer, presses the ESC key), the parameters of Promise's reject callback and `callback` are both `'cancel'`. If `distinguishCancelAndClose` is set to `true`, the parameters of the above two actions will be `'cancel'` and `'close'` respectively.

<code src="./distinguishable-close-cancel.tsx"></code>

<!-- ## Centered Content

The message box supports centered layout.

Set the `center` property to `true` to center the content.

<code src="./centered-content.tsx"></code>

## Customized Icon

Icons can be customized using any Vue component or [render function (JSX)](https://vuejs.org/guide/extras/render-function.html).

<code src="./customized-icon.tsx"></code> -->

## Draggable

Set the MessageBox to be draggable.

Set the `draggable` property to `true` to enable drag-and-drop for the message box.

<code src="./draggable.tsx"></code>

## App Context Inheritance

Create an ElMessageBox that supports reading context through `useConfigProvider`. Note that we recommend using top-level registration instead of the messageBox static methods, because static methods cannot consume context, so the ConfigProvider data will not take effect.

```ts
import { useConfigProvider } from '@qsxy/element-plus-react';

const { ElMessageBox } = useConfigProvider();

// You can pass parameters like this:
ElMessageBox({});
// Or use different invocation methods
ElMessageBox.alert('Hello world!', 'Title', {}, appContext);
```

## Local Import

If you need to import `MessageBox` on demand:

```ts
import { ElMessageBox } from '@qsxy/element-plus-react';
```

## API

### Configuration Options

| Name                      | Description                                                                           | Type                                                                                                        | Default                                        |
| ------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| title                     | Title of the MessageBox                                                               | `string` / `React.ReactElement`                                                                             | ''                                             |
| message                   | Content of the MessageBox                                                             | `string` / `React.ReactElement`                                                                             | —                                              |
| type                      | Message type, used for icon display                                                   | <Enum>'success' \| 'info' \| 'warning' \| 'error'</Enum>                                                    | ''                                             |
| icon                      | Custom icon component, overrides the `type` icon                                      | `string` / `Component`                                                                                      | ''                                             |
| dangerouslyUseHTMLString  | Whether to treat the message property as an HTML fragment                              | `boolean`                                                                                                   | —                                              |
| modalClass                | Custom class name for the mask                                                        | `string`                                                                                                    | —                                              |
| width                     | Custom size of the confirm and cancel buttons                                        | `string` / `number`                                                                                         | —                                              |
| callback                  | If not using Promise, you can use this parameter to specify the callback after MessageBox closes | <Enum type="Function">(value: string, action: Action) => any \| (action: Action) => any</Enum>              | null                                           |
| showClose                 | Whether the MessageBox shows the close button in the upper right corner                | `boolean`                                                                                                   | true                                           |
| beforeClose               | Callback before MessageBox closes, will pause the closing process of the message box  | <Enum type="Function">(action?: Action, done?: () => void, ref?: RefObject\<MessageBoxRef\>) => void</Enum> | null                                           |
| distinguishCancelAndClose | Whether to distinguish cancel (clicking cancel button) from close (clicking close button or mask, pressing ESC) | `boolean`                                                                                                   | false                                          |
| lockScroll                | Whether to lock body scroll when MessageBox appears                                  | `boolean`                                                                                                   | true                                           |
| showCancelButton          | Whether to show the cancel button                                                     | `boolean`                                                                                                   | false (true when called with confirm and prompt) |
| showConfirmButton         | Whether to show the confirm button                                                    | `boolean`                                                                                                   | true                                           |
| cancelButtonText          | Text content of the cancel button                                                    | `string`                                                                                                    | Cancel                                         |
| confirmButtonText         | Text content of the confirm button                                                   | `string`                                                                                                    | OK                                             |
| cancelButtonClass         | Custom class name for the cancel button                                              | `string`                                                                                                    | ''                                             |
| confirmButtonClass        | Custom class name for the confirm button                                             | `string`                                                                                                    | ''                                             |
| closeOnClickModal         | Whether the MessageBox can be closed by clicking the mask                             | `boolean`                                                                                                   | true (false when called with alert)            |
| showInput                 | Whether to show the input box                                                        | `boolean`                                                                                                   | false (true when called with prompt)           |
| inputPlaceholder          | Placeholder text of the input box                                                    | `string`                                                                                                    | ''                                             |
| inputType                 | Type of the input box                                                                | `string`                                                                                                    | text                                           |
| inputValue                | Initial text of the input box                                                        | `string`                                                                                                    | null                                           |
| inputPattern              | Validation expression for the input box                                              | `RegExp`                                                                                                    | null                                           |
| inputValidator            | Validation function for the input box. Should return a boolean or string              | <Enum type="Function">(value: string) => boolean \| string</Enum>                                           | null                                           |
| inputErrorMessage         | Prompt text when validation fails                                                    | `string`                                                                                                    | Illegal input!                                 |
| center                    | Whether to use centered layout                                                       | `boolean`                                                                                                   | false                                          |
| draggable                 | Whether MessageBox is draggable                                                      | `boolean`                                                                                                   | false                                          |
| overflow                  | Whether the MessageBox drag range can exceed the visible area                          | `boolean`                                                                                                   | false                                          |
| roundButton               | Whether to use rounded buttons                                                       | `boolean`                                                                                                   | false                                          |
| buttonSize                | Custom size of the confirm and cancel buttons                                        | <Enum>`'small' \| 'default' \| 'large'`</Enum>                                                              | default                                        |
| locale                    | Internationalization                                                                  | <Enum>'en' \| 'zh-CN'</Enum>                                                                                | —                                              |

<!-- The following properties are not found in the current type definitions -->
<!-- | buttonPosition            | Button position                                                                      | <Enum>'left' \| 'right' \| 'center'</Enum>                                                          | —                                               | -->
<!-- | className                 | Custom class name for MessageBox                                                     | `string`                                                                                           | ''                                              | -->
<!-- | style                     | Custom inline style for MessageBox                                                   | `CSSProperties`                                                                                    | {}                                              | -->
<!-- | modalClassName            | Custom class name for the mask                                                      | `string`                                                                                           | —                                               | -->
<!-- | cancelButtonLoadingIcon   | Loading icon content of the cancel button                                            | `string` / `Component`                                                                             | Loading                                         | -->
<!-- | confirmButtonLoadingIcon  | Loading icon content of the confirm button                                           | `string` / `Component`                                                                             | Loading                                         | -->