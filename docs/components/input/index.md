---
title: Input 输入框
lang: zh-CN
---

<Meta></Meta>

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

## 格式化

在 `formatter`的情况下显示值，我们通常同时使用 `parser`

<code src="./formatter.tsx" path="input"></code>

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

### Input 属性

| 属性名        | 说明                                                           | 类型                                                                                                                                              | 默认值 |
| ------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| type          | 类型                                                           | `string` `'text' \| 'hidden' \| ...` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text   |
| value         | 值（可控）                                                     | `string` / `number`                                                                                                                               | —      |
| defaultValue  | 默认值                                                         | `string` / `number`                                                                                                                               | —      |
| size          | 输入框尺寸                                                     | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                                                      | —      |
| id            | 输入框唯一标识                                                 | `string`                                                                                                                                          | —      |
| prefix        | 输入框头部内容，只对 type="text" 有效                          | `string` / `Component`                                                                                                                            | —      |
| suffix        | 输入框尾部内容，只对 type="text" 有效                          | `string` / `Component`                                                                                                                            | —      |
| prepend       | 输入框前置内容，只对 type="text" 有效                          | `string` / `Component`                                                                                                                            | —      |
| append        | 输入框后置内容，只对 type="text" 有效                          | `string` / `Component`                                                                                                                            | —      |
| clearable     | 是否显示清除按钮                                               | `boolean`                                                                                                                                         | false  |
| formatter     | 指定输入值的格式。(只有当 type 是"text"时才能工作)             | <Enum type='Function'>(value: string \| number) => string</Enum>                                                                                  | —      |
| showPassword  | 是否显示切换密码图标                                           | `boolean`                                                                                                                                         | false  |
| plain         | 是否纯文本模式，即无边框                                       | `boolean`                                                                                                                                         | —      |
| innerStyle    | input 自定义内联样式                                           | `CSSProperties`                                                                                                                                   | —      |
| maxLength     | 最大输入长度                                                   | `number`                                                                                                                                          | —      |
| minLength     | 原生属性，最小输入长度                                         | `number`                                                                                                                                          | —      |
| showWordLimit | 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效 | `boolean`                                                                                                                                         | —      |
| placeholder   | 输入框占位文本                                                 | `string`                                                                                                                                          | —      |
| disabled      | 是否禁用                                                       | `boolean`                                                                                                                                         | false  |
| name          | 等价于原生 input `name` 属性                                   | `string`                                                                                                                                          | —      |
| readOnly      | 原生 `readonly` 属性，是否只读                                 | `boolean`                                                                                                                                         | false  |
| autocomplete  | 原生属性 autocomplete                                          | `string`                                                                                                                                          | —      |
| tabindex      | 原生属性 tabindex                                              | `number`                                                                                                                                          | —      |
| ariaLabel     | 原生属性 aria-label                                            | `string`                                                                                                                                          | —      |
| form          | 原生属性 form                                                  | `string`                                                                                                                                          | —      |
| autofocus     | 原生属性 autofocus                                             | `boolean`                                                                                                                                         | —      |
| inputmode     | 原生属性 inputmode                                             | <Enum>'none' \| 'text' \| 'decimal' \| 'numeric' \| 'tel' \| 'search' \| 'email' \| 'url'</Enum>                                                  | —      |

<!--
| wordLimitPosition | 字数统计的位置，仅当 show-word-limit 为 true 时生效。          | <Enum>'inside' \| 'outside'</Enum>                                                                                                                | —      |
| hiddenValue       | 是否隐藏值                                                     | `boolean`                                                                                                                                         | —      |
| containerRole     | 容器的 role 属性                                               | `string`                                                                                                                                          | —      |
| validateEvent     | 是否触发表单验证                                               | `boolean`                                                                                                                                         | —      |
| modelModifiers    | 修饰符                                                         | `{ trim?: boolean; number?: boolean; lazy?: boolean }`                                                                                            | —      |
| debounceInput | 输入是否防抖动 | `boolean` | — |
| debounceTime | 获取输入建议的防抖延时，单位为毫秒 | `number` | — | -->

### Input 事件

| 事件名       | 说明                                          | 类型                                                                                      |
| ------------ | --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| onChange     | 在 Input 值改变时触发                         | <Enum type='Function'>(value: string \| number, event?: React.ChangeEvent) => void</Enum> |
| onInput      | 在 Input 输入时触发                           | <Enum type='Function'>(value: string \| number) => void</Enum>                            |
| onClear      | 在点击由 `clearable` 属性生成的清空按钮时触发 | <Enum type='Function'>(e: React.MouseEvent) => void</Enum>                                |
| onFocus      | 在 Input 获得焦点时触发                       | <Enum type='Function'>(event: React.FocusEvent) => void</Enum>                            |
| onBlur       | 在 Input 失去焦点时触发                       | <Enum type='Function'>(event: React.FocusEvent) => void</Enum>                            |
| onKeyDown    | 在 Input 按下键盘时触发                       | <Enum type='Function'>(event: React.KeyboardEvent) => void</Enum>                         |
| onMouseEnter | 鼠标进入时触发                                | <Enum type='Function'>(event: React.MouseEvent) => void</Enum>                            |
| onMouseLeave | 鼠标离开时触发                                | <Enum type='Function'>(event: React.MouseEvent) => void</Enum>                            |

### Input Ref

| 名称      | 说明                  | 类型                                                       |
| --------- | --------------------- | ---------------------------------------------------------- |
| ref       | 顶级 div              | <Enum type='object'>Ref\<HTMLDivElement></Enum>            |
| input     | Input HTML 元素       | <Enum type='object'>HTMLInputElement</Enum>                |
| getValue  | 获取值                | <Enum type='Function'>() => `string` / `number`</Enum>     |
| setValue  | 设置值                | <Enum type='Function'>(`string` / `number`) => void</Enum> |
| clear     | 重置值                | <Enum type='Function'>() => void</Enum>                    |
| focus     | 使 input 组件获得焦点 | <Enum type='Function'>() => void</Enum>                    |
| blur      | 使 input 组件失去焦点 | <Enum type='Function'>() => void</Enum>                    |

<!-- | showClear | 显示一键清除图标      | <Enum type='Function'>(value: ValueType) => void;</Enum>   |
| hideClear | 隐藏一键清除图标      | <Enum type='Function'>() => void</Enum>                    | -->
<!-- | select    | 选中所有文本          | <Enum type='Function'>() => void</Enum>                    | -->

### Textarea 属性

| 属性名        | 说明                                                                 | 类型                                                        | 默认值 |
| ------------- | -------------------------------------------------------------------- | ----------------------------------------------------------- | ------ |
| value         | 值（可控）                                                           | `string` / `number`                                         | —      |
| defaultValue  | 默认值                                                               | `string` / `number`                                         | —      |
| plain         | 是否纯文本模式，即无边框                                             | `boolean`                                                   | —      |
| rows          | 输入框行数                                                           | `number`                                                    | —      |
| inputStyle    | input 自定义内联样式                                                 | `CSSProperties`                                             | —      |
| maxLength     | 最大输入长度                                                         | `number`                                                    | —      |
| minLength     | 原生属性，最小输入长度                                               | `number`                                                    | —      |
| showWordLimit | 是否显示统计字数, 只在 type 为 'text' 或 'textarea' 的时候生效       | `boolean`                                                   | —      |
| resize        | 控制是否能被用户缩放                                                 | <Enum>'none' \| 'both' \| 'horizontal' \| 'vertical'</Enum> | —      |
| autosize      | 高度是否自适应，可以接受一个对象，比如: `{ minRows: 2, maxRows: 6 }` | `boolean \| { minRows?: number; maxRows?: number }`         | —      |
| clearable     | 是否可清空                                                           | `boolean`                                                   | —      |
| placeholder   | 输入框占位文本                                                       | `string`                                                    | —      |
| disabled      | 是否禁用                                                             | `boolean`                                                   | false  |
| readOnly      | 原生 `readonly` 属性，是否只读                                       | `boolean`                                                   | false  |

### Textarea 事件

| 事件名   | 说明                  | 类型                                                                                      |
| -------- | --------------------- | ----------------------------------------------------------------------------------------- |
| onChange | 在 Input 值改变时触发 | <Enum type='Function'>(value: string \| number, event?: React.ChangeEvent) => void</Enum> |

### Textarea Ref

| 名称     | 说明                  | 类型                                                       |
| -------- | --------------------- | ---------------------------------------------------------- |
| input    | Textarea HTML 元素    | <Enum type='object'>HTMLTextAreaElement</Enum>             |
| getValue | 获取值                | <Enum type='Function'>() => `string` / `number`</Enum>     |
| setValue | 设置值                | <Enum type='Function'>(`string` / `number`) => void</Enum> |
| clear    | 重置值                | <Enum type='Function'>() => void</Enum>                    |
| focus    | 使 input 组件获得焦点 | <Enum type='Function'>() => void</Enum>                    |
| blur     | 使 input 组件失去焦点 | <Enum type='Function'>() => void</Enum>                    |

### InputRange 属性

| 属性名           | 说明                           | 类型                                                                   | 默认值 |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------- | ------ |
| value            | 值（可控）                     | `[string \| null, string \| null] \| [number \| null, number \| null]` | —      |
| defaultValue     | 默认值                         | `[string \| null, string \| null] \| [number \| null, number \| null]` | —      |
| name             | 输入框 name 属性               | `[string, string]`                                                     | —      |
| size             | 输入框尺寸                     | <Enum>'large' \| 'default' \| 'small'</Enum>                           | —      |
| readOnly         | 只读                           | `boolean`                                                              | —      |
| active           | 是否激活状态                   | `boolean`                                                              | —      |
| type             | 类型                           | <Enum>'text' \| 'hidden' \| 'number'</Enum>                            | —      |
| prefix           | 输入框头部内容                 | `string` / `Component`                                                 | —      |
| suffix           | 输入框尾部内容                 | `string` / `Component`                                                 | —      |
| prepend          | 输入框前置内容                 | `string` / `Component`                                                 | —      |
| append           | 输入框后置内容                 | `string` / `Component`                                                 | —      |
| clearable        | 是否可清空                     | `boolean`                                                              | —      |
| plain            | 是否纯文本模式，即无边框       | `boolean`                                                              | —      |
| rangeSeparator   | 选择范围时的分隔符             | `string`                                                               | —      |
| innerStyle       | input 自定义内联样式           | `CSSProperties`                                                        | —      |
| startPlaceholder | 范围选择时开始输入框的占位内容 | `string`                                                               | —      |
| endPlaceholder   | 范围选择时结束输入框的占位内容 | `string`                                                               | —      |
| disabled         | 是否禁用                       | `boolean`                                                              | false  |

### InputRange 事件

| 事件名   | 说明                                          | 类型                                                                                     |
| -------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| onClear  | 在点击由 `clearable` 属性生成的清空按钮时触发 | <Enum type='Function'>(e: MouseEvent) => void</Enum>                                     |
| onChange | 选中值发生变化时触发                          | <Enum type='Function'>(value: InputRangeValueType \| null, event?: Event) => void</Enum> |
