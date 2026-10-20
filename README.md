# element‑plus‑react

[![NPM version](https://img.shields.io/npm/v/@qsxy/element-plus-react.svg?style=flat)](https://npmjs.org/package/@qsxy/element-plus-react)
[![license](https://img.shields.io/github/license/ahqsluoye/element-plus-react)](https://github.com/ahqsluoye/element-plus-react/blob/main/LICENSE)
[![stars](https://img.shields.io/github/stars/ahqsluoye/element-plus-react)](https://github.com/ahqsluoye/element-plus-react)

> 🧩 Element‑Plus for React，将 Vue3 生态优秀的 Element‑Plus 组件封装为 React 可用组件库。

## ✨ 介绍

Element‑Plus 是 Vue3 生态中非常成熟的企业级 UI 组件库，本项目对 Element‑Plus 做 React 层封装，让 React 开发者可以复用 Element‑Plus 的组件能力、样式与交互，不用重复开发业务组件。

> ⚠️ 注意：本项目是基于 Element‑Plus 的封装适配，**不是官方官方维护的 React 版本**。

## 🎯 特性

- ✅ 复用 Element‑Plus 完整样式与交互效果
- ✅ 符合 React 组件书写习惯
- ✅ 支持 TypeScript 类型提示
- ✅ 开箱即用，快速搭建中后台业务
- ✅ 跟随 Element‑Plus 生态迭代
- ✅ 支持按需导入，避免打包时引入所有组件，减少打包体积，插件入口：[webpack 插件](https://www.npmjs.com/package/@qsxy/babel-plugin-element-plus-react)， [vite 插件](https://www.npmjs.com/package/@qsxy/vite-plugin-element-plus-react-import)

## 📦 安装

使用 npm

```bash
npm install @qsxy/element-plus-react
```

使用 yarn

```bash
yarn add @qsxy/element-plus-react
```

使用 pnpm

```bash
pnpm add @qsxy/element-plus-react
```

## 🚀 快速上手最小示例

```tsx
import React from 'react';
import { ElButton } from '@qsxy/element-plus-react';
// 引入样式
import '@qsxy/element-plus-react/dist/index.css';

function App() {
    return (
        <div>
            <ElButton type="primary">主要按钮</ElButton>
        </div>
    );
}

export default App;
```

## 📖 文档与示例

- 🔥 所有的组件文档和示例在这里哦，戳戳戳 👉👉👉[API 文档](https://ahqsluoye.github.io/element-plus-react/)

## 📋 适用场景

- React 中后台管理系统，希望使用 Element‑Plus 的组件风格
- 项目从 Vue3 迁移部分业务，希望复用 Element‑Plus 交互
- 想快速拿到成熟企业级 UI 组件，不想从零造组件

## ⚠️ 限制与已知问题

1. 该项目为社区适配封装，**非 Element‑Plus 官方 React 版本**；
2. 部分复杂组件、指令、Vue 专属特性可能暂未完全适配；
3. 遇到组件行为异常，请先提 issue，欢迎提交 PR 共同完善。

## 🤝 参与贡献

欢迎提交 Issue 和 Pull Request，帮助完善组件库。

1. Fork 本仓库
2. 创建你的特性分支：`git checkout -b feature/xxx`
3. 提交你的修改
4. 发起 PR

提交 issue 请尽量提供：复现步骤、示例代码、版本号。

## 📄 License

[MIT](https://github.com/ahqsluoye/element-plus-react/blob/main/LICENSE)
