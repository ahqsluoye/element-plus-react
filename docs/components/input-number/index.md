---
title: Input Number 数字输入框
lang: zh-CN
---

# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法

要使用它，只需要在 `<el-input-number>` 元素中使用 `vModel` 绑定变量即可，变量的初始值即为默认值。

<code src="./basic.tsx"></code>

:::info{title=TIP}

当输入无效的字符串到输入框时，由于错误，输入值将把 `NaN` 导入到上层

:::

## 禁用状态

`disabled`属性接受一个 `Boolean`，设置为`true`即可禁用整个组件。 ，如果你只需要控制数值在某一范围内，可以设置 `min` 属性和 `max` 属性， 默认最小值为 `0`。

<code src="./disabled.tsx"></code>

## 步进

允许定义递增递减的步进控制

设置 `step` 属性可以控制步长。

<code src="./steps.tsx"></code>

## 严格步进

`stepStrictly`属性接受一个`Boolean`。 如果这个属性被设置为 `true`，则只能输入步进的倍数。

<code src="./step-strictly.tsx"></code>

## 精度

设置 `precision` 属性可以控制数值精度，接收一个 `Number`。

<code src="./precision.tsx"></code>

:::info{title=TIP}

`precision` 的值必须是一个非负整数，并且不能小于 `step` 的小数位数。

:::

## 不同的输入框尺寸

使用 `size` 属性额外配置尺寸，可选的尺寸大小为：`large` 或 `small`

<code src="./size.tsx"></code>

## 按钮位置

设置 `controlsPosition` 属性可以控制按钮位置。

<code src="./controlled.tsx"></code>

## API

### 属性

| 属性名           | 说明                                | 类型                                         | 默认值    |
| ---------------- | ----------------------------------- | -------------------------------------------- | --------- |
| value            | 选中项绑定值（可控）                | `number`                                     | —         |
| defaultValue     | 默认值                              | `number`                                     | —         |
| min              | 设置计数器允许的最小值              | `number`                                     | -Infinity |
| max              | 设置计数器允许的最大值              | `number`                                     | Infinity  |
| step             | 计数器步长                          | `number`                                     | 1         |
| stepStrictly     | 是否只能输入 step 的倍数            | `boolean`                                    | false     |
| precision        | 数值精度                            | `number`                                     | —         |
| size             | 计数器尺寸                          | <Enum>'large' \| 'default' \| 'small'</Enum> | default   |
| readonly         | 原生 ` readonly` 属性，是否只读     | `boolean`                                    | false     |
| disabled         | 是否禁用状态                        | `boolean`                                    | false     |
| controls         | 是否使用控制按钮                    | `boolean`                                    | true      |
| controlsPosition | 控制按钮位置                        | <Enum>'' \| 'right'</Enum>                   | —         |
| name             | 等价于原生 input `name` 属性        | `string`                                     | —         |
| placeholder      | 等价于原生 input `placeholder` 属性 | `string`                                     | —         |

### 事件

| 事件名   | 说明               | 类型                                                                                                    |
| -------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| onChange | 绑定值被改变时触发 | <Enum type='Function'>(currentValue: number \| undefined, oldValue: number \| undefined) => void</Enum> |

### Ref

| 名称     | 说明                  | 类型                                             |
| -------- | --------------------- | ------------------------------------------------ |
| root     | 顶级 div              | <Enum type='object'>Ref\<HTMLDivElement\></Enum> |
| input    | input 实例            | <Enum type='object'>Ref\<InputRef\></Enum>       |
| getValue | 获取值                | <Enum type='Function'>() => number</Enum>        |
| focus    | 使 input 组件获得焦点 | <Enum type='Function'>() => void</Enum>          |
| blur     | 使 input 组件失去焦点 | <Enum type='Function'>() => void</Enum>          |
