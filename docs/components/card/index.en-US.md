---
title: Card
lang: en-US
---

<Meta></Meta>

# Card

Integrate information in a card container for display.

## Basic Usage

A card includes title, content, and action areas.

The Card component consists of `header` and `body`. `header` and `footer` are optional.

<code src="./basic.tsx"></code>

## Simple Card

A card can have only a content area.

<code src="./simple.tsx"></code>

## Card with Images

Configure to display richer content.

Use the `bodyStyle` attribute to customize the style of the `body` part. In this example, we also use the `ElCol` component for layout.

<code src="./with-images.tsx"></code>

## Shadow Effect

You can define when the card's shadow effect is displayed.

Use the `shadow` attribute to set when the card shadow appears. The value can be: `always`, `hover`, or `never`.

<code src="./shadow.tsx"></code>

## API

### Properties

| Name      | Description                                                                 | Type                                     | Default |
| --------- | --------------------------------------------------------------------------- | ---------------------------------------- | ------- |
| header    | Card title. You can modify the title by setting `header`.                    | `string` / `React.ReactElement`          | —       |
| footer    | Card footer. You can modify the card footer content by setting `footer`.     | `string` / `React.ReactElement`          | —       |
| bodyStyle | CSS style of body                                                           | <Enum type='object'>CSSProperties</Enum> | —       |
| shadow    | Set when the shadow is displayed                                            | <Enum>always \| never \| hover</Enum>    | always  |