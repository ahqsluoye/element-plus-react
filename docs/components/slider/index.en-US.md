---
title: Slider
lang: en-US
---

<Meta></Meta>

# Slider

Drag the slider within a fixed range to make a selection.

## Basic Usage

The current value is displayed when the slider is being dragged.

Customize the initial value of the slider by setting the binding value.

<code src="./basic-usage.tsx"></code>

## Discrete Values

Options can be discrete.

Change the `step` value to change the step size. Display breakpoints by setting the `showStops` attribute.

<code src="./discrete-values.tsx"></code>

## Slider with Input Box

Change the current value through an input box.

Set the `showInput` attribute to display an input box on the right.

<code src="./slider-with-input-box.tsx"></code>

## Sizes

<code src="./sizes.tsx"></code>

## Placement

You can customize the position of the tooltip.

<code src="./placement.tsx"></code>

## Range Selection

You can also select a range of values.

Configure the `range` attribute to activate range selection mode. The binding value is an array consisting of the minimum and maximum boundary values.

<code src="./range-selection.tsx"></code>

## Vertical Mode

Configure the `vertical` attribute to `true` to enable vertical mode. In vertical mode, the `height` attribute is required.

<code src="./vertical-mode.tsx"></code>

## Show Marks

Set the `marks` attribute to display marks on the slider.

<code src="./show-marks.tsx"></code>

## Restrict Value

Set `step="mark"` to restrict the slider value to marks.

<code src="./restrict-value.tsx"></code>

## API

### Properties

| Name              | Description                                                                                      | Type                                                                                                                                                                                        | Default |
| ----------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| defaultValue      | Default value of the selected option                                                             | `number` / <Enum type="object">number[]</Enum>                                                                                                                                              | 0       |
| value             | Binding value of the selected option                                                             | `number` / <Enum type="object">number[]</Enum>                                                                                                                                              | 0       |
| min               | Minimum value                                                                                    | `number`                                                                                                                                                                                    | 0       |
| max               | Maximum value                                                                                    | `number`                                                                                                                                                                                    | 100     |
| disabled          | Whether the slider is disabled                                                                   | `boolean`                                                                                                                                                                                   | false   |
| step              | Step size                                                                                        | `number`                                                                                                                                                                                    | 1       |
| showInput         | Whether to display an input box. Only works when not in range selection.                         | `boolean`                                                                                                                                                                                   | false   |
| showInputControls | Whether to display control buttons in the input box when showInput is true                       | `boolean`                                                                                                                                                                                   | true    |
| size              | Size of the slider wrapper. Not available in vertical mode                                       | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                                                              | default |
| inputSize         | Size of the input box. If `size` is set, the default value automatically takes `size`             | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                                                                                              | default |
| showStops         | Whether to display breakpoints                                                                   | `boolean`                                                                                                                                                                                   | false   |
| showTooltip       | Whether to display tooltip value                                                                 | `boolean`                                                                                                                                                                                   | true    |
| formatTooltip     | Format the tooltip value                                                                         | <Enum type="Function">(value: number) => number \| string</Enum>                                                                                                                            | —       |
| range             | Whether to enable range selection                                                                | `boolean`                                                                                                                                                                                   | false   |
| vertical          | Vertical mode                                                                                    | `boolean`                                                                                                                                                                                   | false   |
| height            | Height of the slider. Required in vertical mode                                                  | `string`                                                                                                                                                                                    | —       |
| ariaLabel         | Native `aria-label` attribute                                                                    | `string`                                                                                                                                                                                    | —       |
| rangeStartLabel   | Screen reader label for the start of the range when `range` is true                              | `string`                                                                                                                                                                                    | —       |
| rangeEndLabel     | Screen reader label for the end of the range when `range` is true                                | `string`                                                                                                                                                                                    | —       |
| formatValueText   | Format the `ariaValuenow` attribute for screen readers                                            | <Enum type="Function">(value: number) => string</Enum>                                                                                                                                      | —       |
| debounce          | Debounce delay during input in milliseconds. Only works when `showInput` is true.                | `number`                                                                                                                                                                                    | 300     |
| tooltipClass      | Custom class name for the tooltip                                                                | `string`                                                                                                                                                                                    | —       |
| placement         | Position of the tooltip                                                                          | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'left-start' \| 'left-end' \| 'right' \| 'right-start' \| 'right-end'</Enum> | top     |
| marks             | Marks. The key must be of type `number` and within the closed interval `[min, max]`. Each mark can have custom style | <Enum type="object">SliderMarks</Enum>                                                                                                                                                      | —       |
| onChange          | Triggers when the value changes (only fires on mouse release when dragging)                      | <Enum type="Function">(value: Arrayable<number>) => boolean</Enum>                                                                                                                          | —       |
| onInput           | Triggers when data changes (fires in real time during dragging)                                  | <Enum type="Function">(value: Arrayable<number>) => boolean</Enum>                                                                                                                          | —       |

## Type Declarations

<details open>
  <summary>Show Declarations</summary>

```ts
type SliderMarks = Record<number, string | { style: CSSProperties; label: any }>;
type Arrayable<T> = T | T[];
```

</details>