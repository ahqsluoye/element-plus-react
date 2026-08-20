---
title: Divider
lang: en-US
---

<Meta></Meta>

# Divider

The dividing line that separates the content.

## Basic Usage

Divide the text of different paragraphs.

<code src="./basic-usage.tsx"></code>

## Custom Content

You can customize the content on the divider line.

<code src="./custom-content.tsx"></code>

## Dashed Line

You can set the style of divider.

<code src="./line-dashed.tsx"></code>

## Vertical Divider

<code src="./vertical-divider.tsx"></code>

## API

### Properties

| Name            | Description                                                | Type                                                                                                                                            | Default    |
| --------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| direction       | set divider's direction                                    | <Enum>'horizontal' \| 'vertical'</Enum>                                                                                                         | horizontal |
| borderStyle     | set the style of divider                                   | <Enum>'none' \| 'solid' \| 'hidden' \| 'dashed' \| ...</Enum> [css/border-style](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style) | solid      |
| contentPosition | the position of the customized content on the divider line | <Enum>'left' \| 'right' \| 'center'</Enum>                                                                                                      | center     |