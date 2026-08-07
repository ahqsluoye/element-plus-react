---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用 Element Plus React。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么在不使用插件的情况下就是完整引入

```ts [main.ts]
import '@qsxy/element-plus-react/dist/index.css';
import { ElButton, ElLink } from '@qsxy/element-plus-react';
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。

#### Vite

首先你需要安装 <ElLink href="https://www.npmjs.com/package/@qsxy/vite-plugin-element-plus-react-import">vite插件</ElLink>

<InstallDependencies npm='$ npm install @qsxy/vite-plugin-element-plus-react-import --save-dev' yarn='$ yarn add @qsxy/vite-plugin-element-plus-react-import -D' pnpm='$ pnpm add @qsxy/vite-plugin-element-plus-react-import -D'></InstallDependencies>

然后把下列代码插入到你的 `Vite` 的配置文件中

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

首先你需要安装 <ElLink href="https://www.npmjs.com/package/@qsxy/babel-plugin-element-plus-react">babel插件</ElLink>

<InstallDependencies npm='$ npm install @qsxy/babel-plugin-element-plus-react --save-dev' yarn='$ yarn add @qsxy/babel-plugin-element-plus-react -D' pnpm='$ pnpm add @qsxy/babel-plugin-element-plus-react -D'></InstallDependencies>

然后把下列代码插入到你的 `Webpack` 的配置文件中

```js [.babelrc或babel.config.js]
module.exports = {
    plugins: [
        // ...
        ['@qsxy/element-plus-react'],
    ],
};
```

## 开始使用

现在你可以启动项目了。 对于每个组件的用法，请查阅 [对应的独立文档](/components/button)。
