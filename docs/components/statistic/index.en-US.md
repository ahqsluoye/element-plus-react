---
title: Statistic
lang: en-US
---

<Meta></Meta>

# Statistic

Display statistics data.

## Basic Usage

Used to highlight a number or a group of numbers, such as statistical values, amounts, rankings, etc. Icons, units and other elements can be added before and after the number and title. You can use [vueuse](https://vueuse.org/core/useTransition/) to add animated transitions to the numeric changes.

<code src="./basic.tsx"></code>

## Countdown

Countdown component, supports adding other components to control it.

<code src="./countdown.tsx"></code>

:::info{title=TIP}

During formatting, it is recommended to be within the range of days.
:::

## Statistic Card

Card-style display, can be freely combined.

<code src="./card.tsx"></code>

## Theme Customization

Custom styles are supported through CSS variables:

```css
.el-statistic {
    --el-statistic-font-size: var(--el-font-size-large);
    --el-statistic-color: var(--el-text-color-primary);
}
```

## Statistic API

### Statistic Properties

| Attribute        | Description              | Type                                                                | Default |
| ---------------- | ------------------------ | ------------------------------------------------------------------- | ------- |
| value            | Numerical content        | `number` / `string`                                                 | 0       |
| decimalSeparator | Set the decimal point    | `string`                                                            | .       |
| formatter        | Custom number formatting | <Enum type="Function">(value: number \| string) => ReactNode</Enum> | —       |
| groupSeparator   | Set the thousands separator | `string`                                                          | ,       |
| precision        | Numerical precision      | `number`                                                            | 0       |
| prefix           | Set the prefix of the number | `string` / `ReactNode`                                            | —       |
| suffix           | Set the suffix of the number | `string` / `ReactNode`                                            | —       |
| title            | Number title             | `string` / `ReactNode`                                              | —       |
| valueStyle       | Number style             | <Enum type="object">CSSProperties</Enum>                            | —       |

### Statistic Ref

| Name         | Description       | Type                                             |
| ------------ | ----------------- | ------------------------------------------------ |
| displayValue | Current display value | <Enum type="object">Ref<string \| number></Enum> |

## Countdown API

### Countdown Properties

| Attribute   | Description                | Type                                                                               | Default  |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------- | -------- |
| value       | Target time                | `number` / `Dayjs`                                                                 | —        |
| format      | Format the countdown       | `string`                                                                           | HH:mm:ss |
| prefix      | Set the prefix of the countdown | `string` / `ReactNode`                                                             | —        |
| suffix      | Set the suffix of the countdown | `string` / `ReactNode`                                                             | —        |
| title       | Countdown title            | `string` / `ReactNode`                                                             | —        |
| valueStyle  | Countdown value style      | `string` / <Enum type="object">CSSProperties \| CSSProperties[] \| string[]</Enum> | —        |

### Countdown Events

| Name     | Description                  | Type                                                 |
| -------- | ---------------------------- | ---------------------------------------------------- |
| onChange | Time difference change event | <Enum type="Function">(value: number) => void</Enum> |
| onFinish | Countdown end event         | <Enum type="Function">() => void</Enum>              |

### Countdown Ref

| Name         | Description       | Type                                   |
| ------------ | ----------------- | -------------------------------------- |
| displayValue | Current display value | <Enum type="object">Ref<string></Enum> |