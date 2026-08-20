---
title: Timeline
lang: en-US
---

<Meta></Meta>

# Timeline

Visually display timeline.

## Basic Usage

Timeline can be split into multiple activities ordered by timestamp. Timestamp is an important feature that distinguishes it from other components. Note the difference with Steps.

<code src="./basic.tsx"></code>

## Custom Node

Size, color, and icons can be customized in node based on actual scenarios.

<code src="./custom-node.tsx"></code>

## Custom Timestamp

Timestamp can be placed on top of content when content is too high.

<code src="./custom-timestamp.tsx"></code>

## Vertically Centered

Timeline-Item with vertically centered style.

<code src="./center.tsx"></code>

## TimelineItem API

### TimelineItem Properties

| Name          | Description                 | Type                                                                   | Default |
| ------------- | --------------------------- | ---------------------------------------------------------------------- | ------- |
| timestamp     | Timestamp content           | `string`                                                               | ''      |
| hideTimestamp | Whether to show timestamp   | `boolean`                                                              | false   |
| center        | Whether vertically centered | `boolean`                                                              | false   |
| placement     | Position of timestamp       | <Enum>'top' \| 'bottom'</Enum>                                         | bottom  |
| type          | Node type                   | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'</Enum> | ''      |
| color         | Node color                  | <Enum>'hsl' \| 'hsv' \| 'hex' \| 'rgb'</Enum>                          | ''      |
| size          | Node size                   | <Enum>'normal' \| 'large'</Enum>                                       | normal  |
| icon          | Custom icon                 | `string` / `Component`                                                 | —       |
| hollow        | Whether the dot is hollow   | `boolean`                                                              | false   |
