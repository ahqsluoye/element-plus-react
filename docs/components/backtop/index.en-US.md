---
title: Backtop
lang: en-US
---

<Meta></Meta>

# Backtop

A button to back to top.

## Basic Usage

Scroll down to see the button at the bottom-right corner of the container.

<code src="./basic.tsx"></code>

## Customizations

The display area is fixed to 40px \* 40px, and the content inside can be customized.

<code src="./custom.tsx"></code>

## API

### Properties

| Name             | Description                                                          | Type     | Default |
| ---------------- | -------------------------------------------------------------------- | -------- | ------- |
| target           | the target to trigger scroll.                                        | `string` | —       |
| visibilityHeight | the button will not show until the scroll height reaches this value. | `number` | 200     |
| right            | right distance from the right edge of the page.                      | `number` | 40      |
| bottom           | bottom distance from the bottom edge of the page.                    | `number` | 40      |

### Events

| Name    | Description           | Callback Parameters                                    |
| ------- | --------------------- | ------------------------------------------------------ |
| onClick | triggers when clicked | <Enum type="Function">(evt: MouseEvent) => void</Enum> |
