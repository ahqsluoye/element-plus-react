---
title: Input 输入框
`boolean` ang: zh-CN
---

# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<code src="./basic.tsx" path="input"></code>

## 禁用状态/只读状态/无边框状态

通过 `disabled` 属性指定是否禁用 input 组件

<code src="./disabled.tsx" path="input"></code>

## 一键清空

使用`clearable`属性即可得到一个可一键清空的输入框，默认可清空

<code src="./clearable.tsx" path="input"></code>

<!-- ## 格式化

在 `formatter`的情况下显示值，我们通常同时使用 `parser`

<code src="./formatter.tsx" path="input"></code> -->

## 密码框

使用 `showPassword` 属性即可得到一个可切换显示隐藏的密码框

<code src="./password.tsx" path="input"></code>

## 带图标的输入框

带有图标标记输入类型

要在输入框中添加图标，你可以简单地使用 `prefix` 和 `suffix` 属性。

<code src="./with-icon.tsx" path="input"></code>

## 文本域

用于输入多行文本信息可缩放的输入框。

文本域高度可通过 `rows` 属性控制

<code src="./textarea.tsx" path="input"></code>

<!-- ## 自适应文本域

设置文字输入类型的 `autosize` 属性使得根据内容自动调整的高度。 你可以给 `autosize` 提供一个包含有最大和最小高度的对象，让输入框自动调整。 -->

<!-- <code src="./auto-sizing-textarea.tsx" path="input"></code> -->

## 复合型输入框

可以在输入框中前置或后置一个元素，通常是标签或按钮。

可通过 `append`或`prepend` 来指定在 Input 中分发的前置或者后置的内容。

<code src="./mixed-input.tsx" path="input"></code>

## 尺寸

使用 `size` 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`, `small`。

<code src="./various-size.tsx" path="input"></code>

## 输入长度限制

使用 `maxLength` 和 `minLength` 属性, 来控制输入内容的最大字数和最小字数。 "字符数"使用 JavaScript 字符串长度来衡量。 为文本或文本输入类型设置 `maxLength` prop 可以限制输入值的长度。 允许你通过设置 `showWordLimit` 到 `true` 来显示剩余字数。

<code src="./length-limiting.tsx" path="input"></code>

## 范围型输入框

<code src="./input-range.tsx" path="input"></code>

## API

### 属性

| 属性名        | 说明                                                             | 类型                                                                                                                                              | 默认值    |
| ------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| type          | 类型                                                             | `string` `'text' \| 'hidden' \| ...` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text      |
| value         | 值（可控）                                                       | `string` / `number`                                                                                                                               | —         |
| defaultValue  | 默认值                                                           | `string` / `number`                                                                                                                               | —         |
| maxLength     | 最大输入长度                                                     | `number`                                                                                                                                          | —         |
| minLength     | 原生属性，最小输入长度                                           | `number`                                                                                                                                          | —         |
| showWordLimit | 是否显示统计字数, 只在 `type` 为 'text' 或 'textarea' 的时候生效 | `boolean`                                                                                                                                         | `boolean` |
| placeholder   | 输入框占位文本                                                   | `string`                                                                                                                                          | —         |
| clearable     | 是否显示清除按钮，只有当 `type` 不是 textarea 时生效             | `boolean`                                                                                                                                         | false     |
| showPassword  | 是否显示切换密码图标                                             | `boolean`                                                                                                                                         | false     |
| disabled      | 是否禁用                                                         | `boolean`                                                                                                                                         | false     |
| size          | 输入框尺寸，只在 `type` 不为 'textarea' 时有效                   | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                                                      | —         |
| prefix        | 自定义前缀                                                       | `string` / `Component`                                                                                                                            | —         |
| suffix        | 自定义后缀                                                       | `string` / `Component`                                                                                                                            | —         |
| prepend       | 输入框前置内容                                                   | `string` / `Component`                                                                                                                            | —         |
| append        | 输入框后置内容                                                   | `string` / `Component`                                                                                                                            | —         |
| rows          | 输入框行数，仅 `Input.TextArea` 时有效                           | `number`                                                                                                                                          | `number`  |
| name          | 等价于原生 input `name` 属性                                     | `string`                                                                                                                                          | —         |
| readonly      | 原生 ` readonly` 属性，是否只读                                  | `boolean`                                                                                                                                         | false     |
| inputStyle    | input 元素或 textarea 元素的 style                               | CSSProperties                                                                                                                                     | {}        |

### 事件

| 事件名   | 说明                                                     | 类型                                                           |
| -------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| onChange | 仅当 value 改变时，当输入框失去焦点或用户按 Enter 时触发 | <Enum type='Function'>(value: string \| number) => void</Enum> |
| onClear  | 在点击由 `clearable` 属性生成的清空按钮时触发            | <Enum type='Function'>() => void</Enum>                        |

### Ref

| 名称      | 说明                  | 类型                                                       |
| --------- | --------------------- | ---------------------------------------------------------- |
| root      | 顶级 div              | <Enum type='object'>Ref\<HTMLDivElement\></Enum>           |
| ref       | Input HTML 元素       | <Enum type='object'>Ref\<HTMLInputElement></Enum>          |
| input     | Input HTML 元素       | <Enum type='object'>HTMLInputElement</Enum>                |
| getValue  | 获取值                | <Enum type='Function'>() => `string` / `number`</Enum>     |
| setValue  | 设置值                | <Enum type='Function'>(`string` / `number`) => void</Enum> |
| clear     | 重置值                | <Enum type='Function'>() => void</Enum>                    |
| focus     | 使 input 组件获得焦点 | <Enum type='Function'>() => void</Enum>                    |
| blur      | 使 input 组件失去焦点 | <Enum type='Function'>() => void</Enum>                    |
| showClear | 显示一键清除图标      | <Enum type='Function'>(value: ValueType) => void;</Enum>   |
| hideClear | 隐藏一键清除图标      | <Enum type='Function'>() => void</Enum>                    |
