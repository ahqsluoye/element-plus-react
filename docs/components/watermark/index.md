---
title: Watermark 水印
lang: zh-CN
---

# Watermark 水印

在页面上添加文本或图片等水印信息

## 基础用法

最简单的用法。

<code src="./basic.tsx"></code>

## 多行水印

使用 `content`设置一个字符串数组来指定多行文本水印内容

<code src="./multi-line.tsx"></code>

## 图片水印

通过 `image` 指定图像地址。 为了确保图像清晰展示而不是被拉伸，请设置宽度和高度，建议使用至少两倍的宽度和高度的图片来保证显示效果。

<code src="./image.tsx"></code>

## 自定义配置

配置自定义参数预览水印效果。

<code src="./custom.tsx"></code>

## API

### 属性

| 属性名  | 描述                                          | 类型                                        | 默认值                     |
| ------- | --------------------------------------------- | ------------------------------------------- | -------------------------- |
| width   | 水印的宽度， `content` 的默认值是它自己的宽度 | `number`                                    | 120                        |
| height  | 水印的高度， `content` 的默认值是它自己的高度 | `number`                                    | 64                         |
| rotate  | 水印的旋转角度, 单位 `°`                      | `number`                                    | -22                        |
| zIndex  | 水印元素的 z-index 值                         | `number`                                    | 9                          |
| image   | 水印图片，建议使用 2x 或 3x 图像              | `string`                                    | —                          |
| content | 水印文本内容                                  | `string`/<Enum type="array">string[]</Enum> | Element Plus               |
| font    | 文字样式                                      | [Font](#font)                               | [字体](#font)              |
| gap     | 水印之间的间距                                | <Enum type="array">[number, number]</Enum>  | \[100, 100\]               |
| offset  | 水印从容器左上角的偏移 默认值为 `gap/2`       | <Enum type="array">[number, number]</Enum>  | \[gap\[0\]/2, gap\[1\]/2\] |

### Font

| 名称         | 详情     | 类型                                                                                                 | 默认            |
| ------------ | -------- | ---------------------------------------------------------------------------------------------------- | --------------- |
| color        | 字体颜色 | `string`                                                                                             | rgba(0,0,0,.15) |
| fontSize     | 字体大小 | `number` / `string`                                                                                  | 16              |
| fontWeight   | 字重     | <Enum type="enum">'normal' \| 'bold' \| 'lighter' \| 'bolder' \| number</Enum>                       | normal          |
| fontFamily   | 字体     | `string`                                                                                             | sansSerif       |
| fontGap      | 字体间隙 | `number`                                                                                             | 3               |
| fontStyle    | 字体样式 | <Enum type="enum">'none' \| 'normal' \| 'italic' \| 'oblique'</Enum>                                 | normal          |
| textAlign    | 文本对齐 | <Enum type="enum">'left' \| 'right' \| 'center' \| 'start' \| 'end'</Enum>                           | center          |
| textBaseline | 文本基线 | <Enum type="enum">'top' \| 'hanging' \| 'middle' \| 'alphabetic' \| 'ideographic' \| 'bottom'</Enum> | hanging         |
