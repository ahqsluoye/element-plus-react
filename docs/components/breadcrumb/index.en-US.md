---
title: Breadcrumb
lang: en-US
---

<Meta></Meta>

# Breadcrumb

Displays the location of the current page, making it easier to navigate back to previous pages.

## Basic Usage

Use `ElBreadcrumb` with `ElBreadcrumbItem` to represent each level starting from the homepage. The component accepts a `String` parameter `separator` as the separator, with '/' as the default value.

<code src="./basic.tsx"></code>

## Icon Separator

Set the `separator` prop to use an icon as the separator.

<code src="./icon.tsx"></code>

## Breadcrumb API

### Breadcrumb Properties

| Name      | Description                                                      | Type                   | Default |
| --------- | ---------------------------------------------------------------- | ---------------------- | ------- |
| separator | Separator character                                              | `string` / `Component` | /       |
| navigate  | Return value of `react-router-dom` hooks `useNavigate`.          | `NavigateFunction`     | —       |

## BreadcrumbItem API

### BreadcrumbItem Properties

| Name    | Description                                                                                                                       | Type                                                             | Default |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| to      | Target route for navigation, calls `react-router-dom` hooks `useNavigate` function for route navigation.                          | `string` / <Enum type='object'>RouteProps</Enum>                 | ''      |
| onClick | Click event callback                                                                                                              | <Enum type="Function">(to?: string \| RouteProps) => void</Enum> | —       |

<!-- | replace | If set to `true`, navigation will not leave a history record | `boolean`                                              | false  | -->