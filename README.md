# @qsxy/element-plus-react

[![NPM version](https://img.shields.io/npm/v/element-plus-react.svg?style=flat)](https://npmjs.org/package/@qsxy/element-plus-react)
[![NPM downloads](http://img.shields.io/npm/dm/element-plus-react.svg?style=flat)](https://npmjs.org/package/@qsxy/element-plus-react)

-   [API 文档](https://ahqsluoye.github.io/element-plus-react/)

## Usage

```javascript
// how to use
import '@qsxy/element-plus-react/dist/index.css';
import { ElButton, ElLink } from '@qsxy/element-plus-react';
```

在项目中改变 SCSS 变量
element-plus-react 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个样式文件，例如 element-variables.scss，写入以下内容：

/_ 改变主题色变量 _/

```scss
@use 'sass:math';

@mixin set-color-mix-level($number, $mode: 'light', $--el-color-primary, $mix-color: #ffffff) {
    --el-color-primary-#{$mode}-#{$number}: #{mix($mix-color, $--el-color-primary, math.percentage(math.div($number, 10)))};
}

// Theme color variable
// 主题色变量
$--el-color-primary: #4f8ffa;
:root {
    // Theme color variable
    // 主题色变量
    --el-color-primary: #4f8ffa;
    // Theme background color variable (button class)
    // 主题背景颜色变量（按钮类）
    --el-bg-color-primary: #4f8ffa;
    // Theme border color variable (button class)
    // 主题边框颜色变量（按钮类）
    --btn-border-color: #48aff9;

    @each $i in (3, 5, 7, 8, 9) {
        @include set-color-mix-level($i, 'light', $--el-color-primary, #ffffff);
    }

    @include set-color-mix-level(2, 'dark', $--el-color-primary, #000000);

    // dark mode 暗黑模式
    &.is-dark {
        --el-color-primary: #{mix(#141414, $--el-color-primary, 5)};

        @each $i in (3, 5, 7, 8, 9) {
            @include set-color-mix-level($i, 'light', $--el-color-primary, #141414);
        }

        @include set-color-mix-level(2, 'dark', $--el-color-primary, #141414);
    }
}
```

/_ 改变 icon 字体路径变量，必需 _/

```scss
$fa-font-path: '~@/assets/fonts';
@import '@qsxy/element-plus-react/theme-chalk/index.scss';
```

## Warm Reminder 温馨提示

Currently, this library is in the development and testing stage, and there may be some inevitable issues. If you encounter any problems, please feel free to raise an issue for me, and I will fix them as soon as possible.

目前该库为开发测试阶段，会有一些不可避免的问题，如果您发现了一些问题，欢迎提 Issues 给我，我会尽快修复

## Development

```bash
# install dependencies
$ npm i @qsxy/element-plus-react
# It is recommended to use (to avoid React version conflicts)
# 推荐使用（避免react版本冲突）
$ pnpm add @qsxy/element-plus-react
```

## LICENSE

MIT
