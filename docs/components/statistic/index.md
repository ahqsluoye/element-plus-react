---
title: Statistic 统计组件
lang: zh-CN
---

# Statistic 统计组件

显示统计数据。

## 基础用法

用于突出某个或某组数字时，如统计数值、金额、排名等，数值和标题前后都可以加 icon、单位等元素。 可以使用 [vueuse](https://vueuse.org/core/useTransition/) 实现数值的变化动效

<code src="./basic.tsx"></code>

## 倒计时

倒计时组件，支持添加其他组件来控制。

<code src="./countdown.tsx"></code>

:::info{title=TIP}

在格式化过程中，建议在天数范围内
:::

## 统计卡片

卡片式用法展示，可以自由组合

<code src="./card.tsx"></code>

## 主题定制

支持通过 CSS 变量自定义样式：

```css
.el-statistic {
    --el-statistic-font-size: var(--el-font-size-large);
    --el-statistic-color: var(--el-text-color-primary);
}
```

## Statistic API

### Statistic 属性

| Attribute        | 描述             | 类型                                                                               | 默认值 |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------- | ------ |
| value            | 数字内容         | `number`                                                                           | 0      |
| decimalSeparator | 设置小数点符号   | `string`                                                                           | .      |
| formatter        | 自定义数字格式化 | <Enum type="Function">(value: number) => string \| number</Enum>                   | —      |
| groupSeparator   | 设置千分位标识符 | `string`                                                                           | ,      |
| precision        | 数字精度         | `number`                                                                           | 0      |
| prefix           | 设置数字的前缀   | `string`                                                                           | —      |
| suffix           | 设置数字的后缀   | `string`                                                                           | —      |
| title            | 数字标题         | `string`                                                                           | —      |
| valueStyle       | 数字样式         | `string` / <Enum type="object">CSSProperties \| CSSProperties[] \| string[]</Enum> | —      |
| prefix           | 数字区之前       | `string` / `ReactNode`                                                             | —      |
| suffix           | 数字区之后       | `string` / `ReactNode`                                                             | —      |
| title            | 数字标题         | `string` / `ReactNode`                                                             | —      |

### Statistic Ref

| 名称         | 描述       | 类型                                             |
| ------------ | ---------- | ------------------------------------------------ |
| displayValue | 当前显示值 | <Enum type="object">Ref<string \| number></Enum> |

## Countdown API

### Countdown 属性

| 属性       | 详情             | 类型                                                                               | 默认值   |
| ---------- | ---------------- | ---------------------------------------------------------------------------------- | -------- |
| value      | 目标时间         | `number` / `Dayjs`                                                                 | —        |
| format     | 格式化倒计时     | `string`                                                                           | HH:mm:ss |
| prefix     | 设置倒计时前缀   | `string` / `ReactNode`                                                             | —        |
| suffix     | 设置倒计时的后缀 | `string` / `ReactNode`                                                             | —        |
| title      | 倒计时标题       | `string` / `ReactNode`                                                             | —        |
| valueStyle | 倒计时值的样式   | `string` / <Enum type="object">CSSProperties \| CSSProperties[] \| string[]</Enum> | —        |

### Countdown 事件

| 方法名   | 描述           | 类型                                                 |
| -------- | -------------- | ---------------------------------------------------- |
| onChange | 时间差改变事件 | <Enum type="Function">(value: number) => void</Enum> |
| onFinish | 倒计时结束事件 | <Enum type="Function">() => void</Enum>              |

### Countdown Ref

| 名称         | 详情       | 类型                                   |
| ------------ | ---------- | -------------------------------------- |
| displayValue | 当前显示值 | <Enum type="object">Ref<string></Enum> |
