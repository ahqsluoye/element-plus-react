---
title: Avatar
lang: en-US
---

<Meta></Meta>

# Avatar

Avatars can be used to represent people or objects. It supports images, icons, or characters.

## Basic Usage

Use `shape` and `size` props to set the avatar's shape and size.

<code src="./basic.tsx"></code>

## Types

It supports images, icons, or characters as Avatar.

<code src="./types.tsx"></code>

## Fallback

Fallback when image loading fails.

<code src="./fallback.tsx"></code>

## Fit Container

Set how the image fits its container for an image avatar, same as [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).

<code src="./fit.tsx"></code>

## API

### Properties

| Name   | Description                                                 | Type                                                                              | Default |
| ------ | ----------------------------------------------------------- | --------------------------------------------------------------------------------- | ------- |
| icon   | set the icon type of Avatar, see Icon component for details | `string` / `Component`                                                            | —       |
| size   | avatar size                                                 | `number` / <Enum type="enum">'large' \| 'default' \| 'small'</Enum>               | default |
| shape  | avatar shape                                                | <Enum type="enum">'circle' \| 'square'</Enum>                                     | circle  |
| src    | the source of the image for an image avatar                 | `string`                                                                          | —       |
| srcSet | native attribute `srcset` of image avatar                   | `string`                                                                          | —       |
| alt    | native attribute `alt` of image avatar                      | `string`                                                                          | —       |
| fit    | set how the image fits its container for an image avatar    | <Enum type="enum">'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'</Enum> | cover   |

### Events

| Name    | Description                   | Type                                              |
| ------- | ----------------------------- | ------------------------------------------------- |
| onError | trigger when image load fails | <Enum type="Function">`(e: Event) => void`</Enum> |
