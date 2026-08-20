---
title: Skeleton
lang: en-US
---

<Meta></Meta>

# Skeleton

Display a skeleton screen at positions that need to wait for content to be loaded. In some scenarios, it provides a better visual experience than Loading.

## Basic Usage

The basic skeleton effect.

<code src="./basic-usage.tsx"></code>

## Configurable Rows

You can configure the number of paragraphs in the skeleton screen to more closely match the real rendering effect. Each row length is random.

<code src="./configurable-rows.tsx"></code>

## Animation

We provide a switch flag to indicate whether to show the loading animation. Set `animated` to `true` to show animation on all child nodes of `ElSkeleton`.

<code src="./animation.tsx"></code>

## Customized Template

The built-in typography mode provided by Element Plus may not always meet your requirements. When you want to use a custom template, you can set your own template through the named `template` slot.

We provide different template units for your use. For details on available values, see the API description below. Additionally, when building your own custom skeleton, you should make it as close to the real DOM as possible to avoid DOM bouncing caused by height differences.

<code src="./customized-template.tsx"></code>

## Loading State

When `Loading` ends, we often need to display the real UI. Use the `visible` attribute to control whether to show the loaded DOM.

<code src="./loading-state.tsx"></code>

## Avoiding Rendering Bouncing

Sometimes, API responses come back very quickly — the skeleton placeholder has just been rendered when the real data arrives, causing a sudden flash in the user interface. To avoid this, use the `throttle` attribute.

:::info{title=TIP}

The `throttle` attribute supports two values: `number` and `object`. When passing a `number`, it is equivalent to `{leading: xxx}`, controlling the throttling of the skeleton screen display. You can also control the throttling of the skeleton screen disappearance by passing `{trailing: xxx}`.

:::

<code src="./avoiding-rendering-bouncing.tsx"></code>

## Initial Rendering Loading

When the initial value is `loading: true`, you can set `defaultVisible` to control the immediate display of the initial skeleton screen without throttling.

<code src="./initial-rendering-loading.tsx"></code>

## Toggle Show/Hide Without Rendering Bouncing

:::info{title=TIP}

You can set `defaultVisible` and `throttle: {leading: xxx, trailing: xxx}` to control the initial display of the skeleton effect and make the transition smoother when toggling loading states.
:::

Sometimes when the loading state toggles between show and hide, you may want the rendering of business components to be smoother. You can set `throttle: {leading: xxx, trailing: xxx}` to control rendering bouncing.

<code src="./leading-trailing-without-bouncing.tsx"></code>

## Skeleton API

### Skeleton Properties

| Name           | Description                                                                                   | Type                                                                            | Default |
| -------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| visible        | Whether to show the skeleton screen (controlled). When set to `false`, the DOM after loading is shown | `boolean`                                                                       | true    |
| defaultVisible | Whether to show the skeleton screen by default                                                | `boolean`                                                                       | false   |
| animated       | Whether to use animation                                                                     | `boolean`                                                                       | false   |
| rows           | Number of paragraphs in the skeleton screen                                                   | `number`                                                                        | 4       |
| rowHeight      | Height of each paragraph in the skeleton screen                                               | `number`                                                                        | 16      |
| rowMargin      | Spacing between paragraphs in the skeleton screen                                             | `number`                                                                        | 16      |
| throttle       | Rendering delay (in milliseconds)                                                             | `number` \|<Enum type="object">`{ leading?: number; trailing?: number }`</Enum> | 0       |
| variant        | Current skeleton type to render                                                               | <Enum>`'image' \| 'circle' \| 'rect'`</Enum>                                    | text    |
| formatter      | Custom content                                                                                | ` ReactElement`                                                                 |         |

## SkeletonItem API

### SkeletonItem Properties

| Name      | Description                   | Type                                         | Default |
| --------- | ----------------------------- | -------------------------------------------- | ------- |
| variant   | Current skeleton type to render | <Enum>`'image' \| 'circle' \| 'rect'`</Enum> | text    |
| rowHeight | Height of each paragraph      | `number`                                     | 16      |
| rowMargin | Spacing between paragraphs   | `number`                                     | 16      |