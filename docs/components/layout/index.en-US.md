---
title: Layout
lang: en-US
---

<Meta></Meta>

# Layout

Quickly and easily create layouts with the basic 24-column grid.

:::info{title=TIP}

The component uses flex layout by default, no need to set `type="flex"` manually.

Please note that the parent container should avoid using `inline` related styles, which will cause the component width to not fill up.

:::

## Basic Layout

Create a basic grid layout using columns.

With `Row` and `Col` components, and through the `span` attribute of the `Col` component, we can freely combine layouts.

<code src="./basic-layout.tsx"></code>

## Column Spacing

Column spacing is supported.

The Row provides the `gutter` attribute to specify the spacing between columns, with a default value of 0.

<code src="./column-spacing.tsx"></code>

## Hybrid Layout

Form a more complex hybrid layout by combining the basic 1/24 columns.

<code src="./hybrid-layout.tsx"></code>

## Column Offset

You can specify column offsets.

By setting the `offset` attribute of the `Col` component, you can specify the number of columns to offset.

<code src="./column-offset.tsx"></code>

## Alignment

Flex layout is used by default for flexible alignment of columns.

You can define the layout of child elements through the `justify` attribute, which accepts values of `start`, `center`, `end`, `space-between`, `space-around`, or `space-evenly`.

<code src="./alignment.tsx"></code>

## Responsive Layout

Taking Bootstrap's responsive design as reference, five response sizes are preset: `xs`, `sm`, `md`, `lg`, and `xl`.

<code src="./responsive-layout.tsx"></code>

## Utility Classes for Hiding Elements

Element Plus additionally provides a series of class names for hiding elements under certain conditions. These class names can be added to any DOM element or custom component. If needed, please import the following file yourself:

```js
import '@qsxy/element-plus-react/dist/display.css';
```

These class names are:

-   `hidden-xs-only` - Hide when the viewport is at `xs` size
-   `hidden-sm-only` - Hide when the viewport is at `sm` size
-   `hidden-sm-and-down` - Hide when the viewport is at `sm` size and below
-   `hidden-sm-and-up` - Hide when the viewport is at `sm` size and above
-   `hidden-md-only` - Hide when the viewport is at `md` size
-   `hidden-md-and-down` - Hide when the viewport is at `md` size and below
-   `hidden-md-and-up` - Hide when the viewport is at `md` size and above
-   `hidden-lg-only` - Hide when the viewport is at `lg` size
-   `hidden-lg-and-down` - Hide when the viewport is at `lg` size and below
-   `hidden-lg-and-up` - Hide when the viewport is at `lg` size and above
-   `hidden-xl-only` - Hide when the viewport is at `xl` size

## Row API

### Row Properties

| Name    | Description                         | Type                                                                                                         | Default |
| ------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------- |
| gutter  | Grid spacing                        | `number`                                                                                                     | 0       |
| justify | Horizontal alignment of flex layout | <Enum>'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'</Enum>             | start   |
| align   | Vertical alignment of flex layout   | <Enum>'top' \| 'middle' \| 'bottom'</Enum>                                                                   | top     |
| tag     | Custom element tag                  | `string`                                                                                                     | div     |

## Col API

### Col Properties

| Name   | Description                                         | Type                                                                                                 | Default |
| ------ | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| span   | Number of columns the grid spans                    | `number`                                                                                             | 24      |
| offset | Number of spacing on the left side of the grid      | `number`                                                                                             | 0       |
| push   | Number of columns that grid moves to the right      | `number`                                                                                             | 0       |
| pull   | Number of columns that grid moves to the left       | `number`                                                                                             | 0       |
| xs     | `<768px` Responsive columns or column props object  | `number` / <Enum type='object'>{span?: number, offset?: number, pull?: number, push?: number}</Enum> | —       |
| sm     | `≥768px` Responsive columns or column props object  | `number` / <Enum type='object'>{span?: number, offset?: number, pull?: number, push?: number}</Enum> | —       |
| md     | `≥992px` Responsive columns or column props object  | `number` / <Enum type='object'>{span?: number, offset?: number, pull?: number, push?: number}</Enum> | —       |
| lg     | `≥1200px` Responsive columns or column props object | `number` / <Enum type='object'>{span?: number, offset?: number, pull?: number, push?: number}</Enum> | —       |
| xl     | `≥1920px` Responsive columns or column props object | `number` / <Enum type='object'>{span?: number, offset?: number, pull?: number, push?: number}</Enum> | —       |
| tag    | Custom element tag                                  | `string`                                                                                             | div     |