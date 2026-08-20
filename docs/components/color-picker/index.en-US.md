---
title: ColorPicker
lang: en-US
---

<Meta></Meta>

# ColorPicker

ColorPicker is a color selector supporting multiple color formats.

## Basic Usage

<code src="./basic.tsx"></code>

## Alpha

ColorPicker supports both normal colors and colors with Alpha channel. Use the `showAlpha` attribute to control whether to enable alpha transparency selection. To enable alpha selection, just add the `showAlpha` attribute.

<code src="./alpha.tsx"></code>

## Predefined Colors

ColorPicker supports predefined color options.

<code src="./predefined-color.tsx"></code>

## Sizes

<code src="./sizes.tsx"></code>

## API

### Properties

| Name          | Description                                   | Type                                                                                                              | Default                                                                      |
| ------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| value         | Binding value (controlled mode)               | `string`                                                                                                          | —                                                                            |
| defaultValue  | Default value                                 | `string`                                                                                                          | —                                                                            |
| disabled      | Whether to disable the ColorPicker            | `boolean`                                                                                                         | false                                                                        |
| size          | Size of ColorPicker                           | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                      | —                                                                            |
| showAlpha     | Whether to support alpha transparency selection | `boolean`                                                                                                         | false                                                                        |
| colorFormat   | Color format written to the value             | <Enum>`hsl` \| `hsv` \| `hex` \| `rgb`', '`hex` (when `showAlpha` is false) / `rgb` (when `showAlpha` is true)</Enum> | —                                                                            |
| predefine     | Predefined color options                      | <Enum type='object'>string[]</Enum>                                                                               | —                                                                            |

### Events

| Name         | Description                                    | Type                                                 |
| ------------ | ---------------------------------------------- | ---------------------------------------------------- |
| onChange     | Triggers when the binding value changes        | <Enum type='Function'>(value: string) => void</Enum> |
| activeChange | Triggers when the currently displayed color in the panel changes | <Enum type='Function'>(value: string) => void</Enum> |

### Ref

| Name  | Description         | Type                                            |
| ----- | ------------------- | ----------------------------------------------- |
| ref   | Root element        | <Enum type='object'>Ref\<HTMLDivElement></Enum> |
| color | Current color object | <Enum type='object'>Color</Enum>                |