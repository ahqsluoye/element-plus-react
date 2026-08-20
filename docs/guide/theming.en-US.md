---
title: Custom Theme
lang: en-US
---

# Custom Theme

Element Plus React uses BEM-styled CSS so that you can override styles easily. But if you need to replace styles at a large scale, e.g. change the theme color from blue to orange or green, maybe overriding them one by one is not a good idea.

We provide four ways to change the style variables.

## Change Theme Color

### Through SCSS Variables

`theme-chalk` is written in SCSS. You can find SCSS variables in <ElLink href="https://github.com/ahqsluoye/element-plus-react/blob/main/src/theme-chalk/common/var.scss">src/theme-chalk/common/var.scss</ElLink>.

<!-- :::warning

我们使用 sass 模块（[sass:map](https://sass-lang.com/documentation/values/maps)...）和 `@use` 来重构所有的 SCSS 变量。 通过对所有 SCSS 变量使用 `@use`，解决了由 `@import` 造成的重复输出问题。

> [介绍 Sass 模块 | CSS-TRICKS](https://css-tricks.com/introducing-sass-modules/)

例如，我们使用 `$colors` 作为 map 来保存不同类型的颜色。

`$notification` 是所有 `notification` 组件的变量的映射。

今后，我们将为每个组件自定义的变量编写文档。 你也可以直接查看源代码 [var.scss](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss)。

::: -->

```scss
$colors: () !default;
$colors: map.deep-merge(
    (
        'white': #ffffff,
        'black': #000000,
        'primary': (
            'base': #409eff,
        ),
        'success': (
            'base': #67c23a,
        ),
        'warning': (
            'base': #e6a23c,
        ),
        'danger': (
            'base': #f56c6c,
        ),
        'error': (
            'base': #f56c6c,
        ),
        'info': (
            'base': #909399,
        ),
    ),
    $colors
);
```

### How to Override It

If your project also uses SCSS, you can directly change Element Plus React style variables. Create a style file, for example `styles/element/index.scss`：

:::error{title=WARNING}

You should use `@use 'xxx.scss' as *;` instead of `@import 'xxx.scss';`.

Because sass team said `@import` will be removed in the future.

> [Sass: @use](https://sass-lang.com/documentation/at-rules/use) vs [Sass: @import](https://sass-lang.com/documentation/at-rules/import)

:::

```scss [styles/element/index.scss]
/* just override what you need */
@use '@qsxy/element-plus-react/theme-chalk/common/var'
    with(
        // Font file path is required
        $fa-font-path: '~/node_modules/@qsxy/element-plus-react/theme-chalk/fonts',
        // Other variables can be customized
        $colors: (
                'primary': (
                    'base': green,
                )
            )
    );

// If you just import on demand, you can ignore the following content.
// If you want to import all styles:
// @use '@qsxy/element-plus-react/theme-chalk/common/var'
//     with(
//         $fa-font-path: '~/node_modules/@qsxy/element-plus-react/theme-chalk/fonts',
//     );
// @use "@qsxy/element-plus-react/theme-chalk/index.scss" as *;
```

Then, this style file will override the default CSS of Element Plus React.

:::info{title=TIP}

Import `styles/element/index.scss` before `@qsxy/element-plus-react/theme-chalk/index.scss` to avoid sass variable mixing. Because we need to generate light-x variables from your custom variables.

:::

Create a `styles/element/index.scss` file to merge your variables and the variables of Element Plus React.

If you import them in TypeScript, they will not be merged.

:::info{title=TIP}

In addition, you should distinguish your scss from the element variable scss. If they are mixed together, each hot update of `Element Plus React` needs to compile a large number of scss files, resulting in slow speed.

:::

```ts [main.ts]
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/element/index.scss';
import '@qsxy/element-plus-react/theme-chalk/index.scss';
import App from './App';

const renderDom = document.getElementById('root');
const root = createRoot(renderDom);
root.render(<App />);
```

<!-- 如果你正在使用 vite，并且你想在按需导入时自定义主题。

使用 `scss.additionalData` 来编译所有应用 scss 变量的组件。

```ts [vite.config.ts]
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// You can also use unplugin-vue-components
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// or use unplugin-element-plus
import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "~/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        // use unplugin-vue-components
        // Components({
        //   resolvers: [
        //     ElementPlusResolver({
        //       importStyle: "sass",
        //       // directives: true,
        //       // version: "2.1.5",
        //     }),
        //   ],
        // }),
        // or use unplugin-element-plus
        ElementPlus({
            useSource: true,
        }),
    ],
});
```

如果您正在使用 webpack，并且需要在按需导入时自定义主题。

```js [webpack.config.js]
// use unplugin-element-plus

import ElementPlus from 'unplugin-element-plus/webpack';

export default defineConfig({
    css: {
        loaderOptions: {
            scss: {
                additionalData: `@use "~/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        ElementPlus({
            useSource: true,
        }),
    ],
});
``` -->

### By CSS Variable

CSS Variables is a very useful feature, already supported by almost all browsers. (IE: Wait?)

> Learn more from [Using CSS custom properties (variables) | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

We have used css variables to reconstruct the style system of almost all components.

:::error{title=WARNING}

It is compatible with the SCSS variable system. We use the function of SCSS to automatically generate css variables for use.

:::

This means you can dynamically change individual variables inside the component to better customize it without having to modify scss and recompile it.

> In the future, the css variable names and role documentation for each component will be written to each component.

Like this:

```css
:root {
    --el-color-primary: green;
}
```

If you just want to customize a particular component, just add inline styles for certain components individually.

```ts
<ElTag style={{ '--el-tag-bg-color': 'red' }}>Tag</ElTag>
```

For performance reasons, it is more recommended to custom css variables under a class rather than the global `:root`.

```css
.custom-class {
    --el-tag-bg-color: red;
}
```

If you want to use js to control css variables:

```ts
// document.documentElement is global variable when
const el = document.documentElement;
// const el = document.getElementById('xxx')

// Get css variable
getComputedStyle(el).getPropertyValue(`--el-color-primary`);

// Set css variable
el.style.setProperty('--el-color-primary', 'red');
```

If you want a more elegant way, please check out [useCssVar | VueUse](https://vueuse.org/core/usecssvar/)
