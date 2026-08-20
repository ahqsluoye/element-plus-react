---
title: Watermark
lang: en-US
---

<Meta></Meta>

# Watermark

Add text or image watermarks to the page.

## Basic Usage

The most basic usage.

<code src="./basic.tsx"></code>

## Multi-line Watermark

Use `content` to set an array of strings to specify multi-line text watermark content.

<code src="./multi-line.tsx"></code>

## Image Watermark

Specify the image address via `image`. To ensure the image is displayed clearly without being stretched, set the width and height. It is recommended to use an image with at least 2x the width and height for better display results.

<code src="./image.tsx"></code>

## Custom Configuration

Configure custom parameters to preview the watermark effect.

<code src="./custom.tsx"></code>

## API

### Properties

| Name    | Description                                                                 | Type                                        | Default                    |
| ------- | --------------------------------------------------------------------------- | ------------------------------------------- | -------------------------- |
| width   | Width of the watermark, the default value of `content` is its own width     | `number`                                    | 120                        |
| height  | Height of the watermark, the default value of `content` is its own height   | `number`                                    | 64                         |
| rotate  | Rotation angle of the watermark, in `°`                                     | `number`                                    | -22                        |
| zIndex  | The z-index value of the watermark element                                  | `number`                                    | 9                          |
| image   | Watermark image, recommended to use 2x or 3x images                         | `string`                                    | —                          |
| content | Watermark text content                                                      | `string`/<Enum type="array">string[]</Enum> | Element Plus               |
| font    | Text style                                                                  | [Font](#font)                               | [Font](#font)              |
| gap     | Spacing between watermarks                                                  | <Enum type="array">[number, number]</Enum>  | \[100, 100\]               |
| offset  | Offset of the watermark from the upper left corner of the container. Default is `gap/2` | <Enum type="array">[number, number]</Enum>  | \[gap\[0\]/2, gap\[1\]/2\] |

### Font

| Name         | Description   | Type                                                                                                         | Default         |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------ | --------------- |
| color        | Font color    | `string`                                                                                                     | rgba(0,0,0,.15) |
| fontSize     | Font size     | `number` / `string`                                                                                          | 16              |
| fontWeight   | Font weight   | <Enum type="enum">'normal' \| 'bold' \| 'lighter' \| 'bolder' \| number</Enum>                               | normal          |
| fontFamily   | Font family   | `string`                                                                                                     | sansSerif       |
| fontGap      | Font gap      | `number`                                                                                                     | 3               |
| fontStyle    | Font style    | <Enum type="enum">'none' \| 'normal' \| 'italic' \| 'oblique'</Enum>                                         | normal          |
| textAlign    | Text alignment| <Enum type="enum">'left' \| 'right' \| 'center' \| 'start' \| 'end'</Enum>                                   | center          |
| textBaseline | Text baseline | <Enum type="enum">'top' \| 'hanging' \| 'middle' \| 'alphabetic' \| 'ideographic' \| 'bottom'</Enum>         | hanging         |