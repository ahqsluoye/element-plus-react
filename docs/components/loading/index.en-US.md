---
title: Loading
lang: en-US
---

<Meta></Meta>

# Loading

Show animation while loading data.

## Loading in Container

Display a loading animation when needed to prevent the page from becoming unresponsive and improve user experience (e.g., in tables).

Element Plus React provides two ways to invoke Loading: component and service. For the component approach, you can either place `Loading` inside other components or place other components inside `Loading`.

<code src="./basic.tsx"></code>

## Customization

You can customize the text, icon, and background color of the loading component.

Add the `element-loading-text` attribute to the element bound with the `vLoading` directive, and its value will be rendered as the loading text and displayed below the loading icon. Similarly, `element-loading-spinner`, `element-loading-background`, and `element-loading-svg` attributes are used to set the SVG icon, background color, and loading icon respectively.

<code src="./customization.tsx"></code>

## Full Screen Loading

Show a full screen animation while loading data.

When using the directive approach, a full screen mask requires the `fullscreen` modifier (the mask will be inserted onto the body). If you need to lock screen scrolling at this point, you can use the `lock` modifier. When using the service approach, the mask is full screen by default and no additional settings are required.

<code src="./fullscreen.tsx"></code>

## Service

`Loading` can also be invoked as a service. You can import the `Loading` service like this:

```ts
import { ElLoading } from '@qsxy/element-plus-react';
```

Invoke it when you need it as follows:

```ts
ElLoading.service(options);
```

The `options` parameter is the configuration of Loading, see the table below for details. `LoadingService` returns a Loading instance, which can be closed by calling the `close` method:

```ts
const loadingInstance = ElLoading.service(options);
setTimeout(() => {
    // Loading should be closed asynchronously
    loadingInstance.close();
}, 2000);
```

## Options

| Name       | Description                                                                                                                                  | Type                                                                                                      | Default       |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------- |
| target     | The DOM node that Loading needs to cover. Accepts a DOM object or a string; if a string is passed, it will be passed to `document.querySelector` to get the corresponding DOM node | <Enum type='object'>RefObject\<HTMLElement></Enum>                                                        | document.body |
| visible    | Whether to show Loading                                                                                                                      | `boolean`                                                                                                 | false         |
| fullscreen | Whether the loading component covers the entire screen                                                                                       | `boolean`                                                                                                 | false         |
| lock       | Whether to lock parent element scrolling                                                                                                     | `boolean`                                                                                                 | false         |
| text       | Loading text displayed below the loading icon                                                                                               | `string`                                                                                                  | —             |
| spinner    | Custom loading icon class name                                                                                                               | `string`                                                                                                  | —             |
| background | Mask background color                                                                                                                       | `string`                                                                                                  | —             |
| svg        | Custom SVG element to override the default loader                                                                                            | `string`                                                                                                  | —             |
| svgViewBox | Sets the viewBox attribute for the loading SVG element                                                                                       | `string`                                                                                                  | —             |