---
title: Page Header
lang: en-US
---

<Meta></Meta>

# Page Header

If the page path is simple, it is recommended to use Page Header instead of the Breadcrumb component.

## Complete Example

<code src="./complete.tsx"></code>

## Basic Usage

Standard page header for simple scenarios.

<code src="./basic.tsx"></code>

## Custom Icon

The default icon may not meet your needs. You can customize the icon by setting the `icon` attribute, as shown in the example below.

<code src="./custom-icon.tsx"></code>

## No Icon

Sometimes the page may be full of elements and you might not want the icon to show up. You can set the `icon` attribute to `""` to remove it.

<code src="./no-icon.tsx"></code>

## Breadcrumb Navigation

Using the Page Header component, you can add breadcrumb route navigation by adding the `breadcrumb` slot.

<code src="./breadcrumb.tsx"></code>

## Additional Sections

The header can be complex. You can add more sections to the header to enable rich interactions.

<code src="./additional-sections.tsx"></code>

## Main Content

Sometimes we want the page header to display some collaborative content. We can use the `default` slot.

<code src="./main-content.tsx"></code>

## API

### Properties

| Name       | Description                                                | Type                   | Default    |
| ---------- | ---------------------------------------------------------- | ---------------------- | ---------- |
| icon       | Icon component of Page Header                             | `string`               | arrow-left |
| title      | Main title of Page Header, default is Back (built-in a11y) | `string` / `Component` | ''         |
| content    | Content of Page Header                                    | `string` / `Component` | ''         |
| extra      | Extra section                                             | `string` / `Component` | ''         |
| breadcrumb | Breadcrumb navigation content                             | `string` / `Component` | ''         |
| default    | Default content                                           | `string` / `Component` | ''         |

### Events

| Name   | Description                     | Type                                    |
| ------ | ------------------------------- | --------------------------------------- |
| onBack | Triggered when the left area is clicked | <Enum type="Function">() => void</Enum> |