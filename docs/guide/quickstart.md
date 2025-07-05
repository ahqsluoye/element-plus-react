---
title: 快速开始
lang: zh-CN
---

# 快速开始

本节将介绍如何在项目中使用 Element Plus React。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么在不适用插件的情况下就是完整引入

```ts [main.ts]
import '@qsxy/element-plus-react/dist/index.css';
import { ElButton, ElLink } from '@qsxy/element-plus-react';
```

### 按需导入

您需要使用额外的插件来导入要使用的组件。

#### 自动导入

首先你需要安装`@qsxy/babel-plugin-element-plus-reac`这款插件

<InstallDependencies npm='$ npm install @qsxy/babel-plugin-element-plus-react --save' yarn='$ yarn add @qsxy/babel-plugin-element-plus-react' pnpm='$ pnpm install @qsxy/babel-plugin-element-plus-react'></InstallDependencies>

然后把下列代码插入到你的 `Vite` 或 `Webpack` 的配置文件中（Vite 待验证）

<!-- ##### Vite

```ts [vite.config.ts]
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    // ...
    plugins: [
        // ...
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
    ],
});
``` -->

##### Webpack

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
