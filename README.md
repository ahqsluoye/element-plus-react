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

### Change the SCSS variable in the project

element-plus-react is using SCSS. If your project also uses SCSS, you can directly change the style variable of Element in the project. Create a new style file, such as element-variables.csss, and write the following content:

### 在项目中改变 SCSS 变量

element-plus-react 的 theme-chalk 使用 SCSS 编写，如果你的项目也使用了 SCSS，那么可以直接在项目中改变 Element 的样式变量。新建一个样式文件，例如 element-variables.scss，写入以下内容：

/_ Change the theme color variable _/

/_ 改变主题色变量 _/

```scss
@use '@qsxy/element-plus-react/theme-chalk/common/var' with(
        // 字体文件路径必填
        $fa-font-path: '~/node_modules/@qsxy/element-plus-react/theme-chalk/fonts',
        // 其他变量可自定义
        $colors:
            (
                'primary': (
                    'base': green,
                )
            )
    );
```

/_ Change icon font path variable, required _/

/_ 改变 icon 字体路径变量，必需 _/

```scss
@use '@qsxy/element-plus-react/theme-chalk/common/var' with($fa-font-path: '~@/assets/fonts');
```

## Warm Reminder

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
