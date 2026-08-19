---
title: Steps 步骤条
lang: zh-CN
---

<Meta></Meta>

# Steps 步骤条

引导用户按照流程完成任务的分步导航条， 可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础用法

简单的步骤条。

设置 `active` 属性，接受一个 `Number`，表明步骤的 index，从 0 开始。 需要定宽的步骤条时，设置 `space` 属性即可，它接受 `Number`， 单位为 `px`， 如果不设置，则为自适应。 设置 `finishStatus` 属性可以改变已经完成的步骤的状态。

<code src="./basic.tsx"></code>

## 含状态的步骤条

每一步骤显示出该步骤的状态。

<code src="./with-status.tsx"></code>

## 居中的步骤条

标题和描述可以居中。

<code src="./centered.tsx"></code>

## 带描述的步骤栏

每一步都有描述。

<code src="./with-description.tsx"></code>

## 带图标的步骤条

可以在步骤栏中使用各种自定义图标。

通过 `icon` 属性来设置图标， 图标的类型可以参考 Icon 组件的文档。

<code src="./with-icon.tsx"></code>

## 垂直的步骤条

垂直方向的步骤条。

只需要在 `ElSteps` 元素中设置 `direction` 属性为 `vertical` 即可。

<code src="./vertical.tsx"></code>

## 简洁风格的步骤条

设置 `simple` 可应用简洁风格，该条件下 `alignCenter` / `description` / `direction` / `space` 都将失效。

<code src="./simple.tsx"></code>

## Steps API

### Steps 属性

| 属性名        | 说明                                                | 类型                                                                             | 默认       |
| ------------- | --------------------------------------------------- | -------------------------------------------------------------------------------- | ---------- |
| space         | 每个 step 的间距，不填写将自适应间距。 支持百分比。 | `number` / `string`                                                              | ''         |
| direction     | 显示方向                                            | <Enum type="enum">'vertical' \| 'horizontal'</Enum>                              | horizontal |
| active        | 设置当前激活步骤                                    | `number`                                                                         | 0          |
| processStatus | 设置当前步骤的状态                                  | <Enum type="enum">'wait' \| 'process' \| 'finish' \| 'error' \| 'success'</Enum> | process    |
| finishStatus  | 设置结束步骤的状态                                  | <Enum type="enum">'wait' \| 'process' \| 'finish' \| 'error' \| 'success'</Enum> | finish     |
| alignCenter   | 进行居中对齐                                        | `boolean`                                                                        | —          |
| simple        | 是否应用简洁风格                                    | `boolean`                                                                        | —          |

## Step API

### Step 属性

| 属性名      | 说明                                             | 类型                                                                                   | 默认 |
| ----------- | ------------------------------------------------ | -------------------------------------------------------------------------------------- | ---- |
| title       | 标题                                             | `string` / `Component`                                                                 | ''   |
| description | 描述文案                                         | `string` / `Component`                                                                 | ''   |
| icon        | Step 组件的自定义图标。 也支持 slot 方式写入     | `string`                                                                               | —    |
| status      | 设置当前步骤的状态， 不设置则根据 steps 确定状态 | <Enum type="enum">'' \| 'wait' \| 'process' \| 'finish' \| 'error' \| 'success'</Enum> | ''   |
