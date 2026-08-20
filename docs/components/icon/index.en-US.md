---
title: Icon
lang: en-US
---

<Meta></Meta>

# Icon

Element Plus React provides a set of common icons.

## Basic Usage

Basic icon usage.
<code src="./basic.tsx"></code>

## Icon Size

Icons inherit the font size of their parent container, allowing them to match any text you present. The following classes can be used to increase or decrease icon size relative to the inherited font-size.
<code src="./sizes.tsx"></code>

## Icon Rotation

Sometimes you may need to rotate, flip, or mirror an icon to achieve the desired effect in your project or design. We provide some quick utility tools to help you with this.

To rotate and flip icons arbitrarily, set `rotate` and `flip`.
<code src="./rotate.tsx"></code>

## Icon Animation

Need a loading or status communication icon to rotate? That's right. We include some basic animations in the supporting styles for you to use.

Use the `spin` class to rotate any icon, or use `pulse` to make it rotate in 8 directions.
<code src="./animate.tsx"></code>

## API

### Properties

| Name   | Description                          | Type                                                                                                                                           | Default         |
| ------ | ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| prefix | Icon prefix, defines icon font weight | <Enum>'fat' \| 'fal' \| 'far' \| 'fas' \| 'fab' \| 'fad'</Enum>                                                                                | 'fas'           |
| name   | Icon name                            | `string`                                                                                                                                       |                 |
| size   | Icon size                            | `string` / `number` / <Enum>'xs' \| 'small' \| 'large' \| '1x' \| '2x' \| '3x' \| '4x' \| '5x' \| '6x' \| '7x' \| '8x' \| '9x' \| '10x'</Enum> | inherits font size |
| rotate | Icon rotation angle                  | <Enum>90 \| 180 \| 270</Enum>                                                                                                                  |                 |
| flip   | Whether to flip the icon             | <Enum>'horizontal' \| 'vertical' \| 'both'</Enum>                                                                                              |                 |
| spin   | Whether to animate                   | `boolean`                                                                                                                                      | `false`         |
| pulse  | Whether to rotate in 8 directions    | `boolean`                                                                                                                                      | `false`         |