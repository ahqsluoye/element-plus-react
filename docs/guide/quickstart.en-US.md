---
title: Quick Start
lang: en-US
---

# Quick Start

This section will introduce how to use Element Plus React.

## Usage

### Full Import

If you don’t care about the bundle size so much, it’s more convenient to use full import.

```ts [main.ts]
import '@qsxy/element-plus-react/dist/index.css';
import { ElButton, ElLink } from '@qsxy/element-plus-react';
```

### On-demand Import

You need to use extra plugins to import the components you want to use.

#### Vite

First, you need to install the <ElLink href="https://www.npmjs.com/package/@qsxy/vite-plugin-element-plus-react-import">vite plugin</ElLink>.

<InstallDependencies npm='$ npm install @qsxy/vite-plugin-element-plus-react-import --save-dev' yarn='$ yarn add @qsxy/vite-plugin-element-plus-react-import -D' pnpm='$ pnpm add @qsxy/vite-plugin-element-plus-react-import -D'></InstallDependencies>

Then, add the following code to your Vite configuration file.

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import elementPlusReactTransform from '@qsxy/vite-plugin-element-plus-react-import';

export default defineConfig({
    devtools: true,
    plugins: [react(), elementPlusReactTransform()],
});
```

<br>

#### Webpack

First, you need to install the <ElLink href="https://www.npmjs.com/package/@qsxy/babel-plugin-element-plus-react">babel plugin</ElLink>.

<InstallDependencies npm='$ npm install @qsxy/babel-plugin-element-plus-react --save-dev' yarn='$ yarn add @qsxy/babel-plugin-element-plus-react -D' pnpm='$ pnpm add @qsxy/babel-plugin-element-plus-react -D'></InstallDependencies>

Then, add the following code to your Webpack configuration file.

```js [.babelrc or .babel.config.js]
module.exports = {
    plugins: [
        // ...
        ['@qsxy/element-plus-react'],
    ],
};
```

## Let's Get Started

Now you can start using the Plus React components. For each component, please refer to the [individual documentation](/en-US/components/overview).
