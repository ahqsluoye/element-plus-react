---
title: Progress
lang: en-US
---

<Meta></Meta>

# Progress

Used to show the progress of current operation, and inform the user the current status.

## Linear Progress Bar

Set the `percentage` attribute to indicate the progress. This attribute is **required** and must be in the range of `0-100`. You can customize the format of the displayed text by setting `format`.

<code src="./linear-progress-bar.tsx"></code>

## Internal Percentage

The percentage does not take up additional space, suitable for scenarios like file uploads.

The Progress component can change the height of the progress bar through the `strokeWidth` attribute, and can change the text inside the progress bar through the `textInside` attribute.

<code src="./internal-percentage.tsx"></code>

## Custom Color

You can set the color of the progress bar through the `color` attribute. This attribute accepts hexadecimal color values, functions, and arrays.

<code src="./custom-color.tsx"></code>

## Circular Progress Bar

The Progress component can use the `type` attribute to specify the circular progress bar. For circular progress bars, you can also set the size through the `width` attribute.

<code src="./circular-progress-bar.tsx"></code>

## Dashboard Progress Bar

You can also set the `type` attribute to `dashboard` to use the dashboard progress bar.

<code src="./dashboard-progress-bar.tsx"></code>

## Customized Content

Add customized content through `children`.

<code src="./customized-content.tsx"></code>

## Indeterminate Progress

Use the `indeterminate` attribute to set indeterminate progress, and `duration` to control the animation duration.

<code src="./indeterminate-progress.tsx"></code>

## Properties

| Name          | Description                                                                                                 | Type                                                                                                                                         | Default |
| ------------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| percentage    | Percentage, **required**                                                                                    | <Enum type="number">(0-100)</Enum>                                                                                                           | 0       |
| type          | Type of progress bar                                                                                        | <Enum>'line'\| 'circle'\| 'dashboard'</Enum>                                                                                                 | line    |
| strokeWidth   | Width of progress bar                                                                                       | number                                                                                                                                       | 6       |
| textInside    | Whether the progress bar text is displayed inside the progress bar (only available when `type` is 'line')  | boolean                                                                                                                                      | false   |
| status        | Current status of progress bar                                                                              | <Enum> 'success' \| 'exception' \| 'warning'</Enum>                                                                                          | —       |
| indeterminate | Whether it is an indeterminate progress bar                                                                 | boolean                                                                                                                                      | false   |
| duration      | Control the animation duration of the indeterminate progress bar                                            | number                                                                                                                                       | 3       |
| color         | Background color of the progress bar (overrides `status` color)                                             | string / <Enum type="Function">`(percentage: number) => string`</Enum> / <Enum type="Array">`{ color: string; percentage: number }[]`</Enum> | ''      |
| width         | Canvas width of circular progress bar (only available when type is circle or dashboard)                       | number                                                                                                                                       | 126     |
| showText      | Whether to display the progress bar text content                                                            | boolean                                                                                                                                      | true    |
| strokeLinecap | Shape at both ends of the path for circle/dashboard types                                                   | <Enum>`'butt' \| 'round' \| 'square'`</Enum>                                                                                                 | round   |
| format        | Specify the text content of the progress bar                                                                | <Enum type="Function">`(percentage: number) => string`</Enum>                                                                                | —       |