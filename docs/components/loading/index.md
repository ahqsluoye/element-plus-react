---
title: Loading 加载
lang: zh-CN
---

# Loading 加载

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。

Element Plus React 提供了两种调用 Loading 的方法：组件和服务。 对于组件方式，既可以将 `Loading` 置于其他组件之内，也可以将其他组件置于 `Loading` 之内。

<code src="./basic.tsx"></code>

## 自定义加载中组件内容

你可以自定义加载中组件的文字，图标，以及背景颜色。

在绑定了`vLoading`指令的元素上添加`element-loading-text`属性，其值会被渲染为加载文案，并显示在加载图标的下方。 类似地，`element-loading-spinner`、`element-loading-background` 和 `element-loading-svg` 属性分别用来设定 svg 图标、背景色值、加载图标。

<code src="./customization.tsx"></code>

## 让加载组件铺满整个屏幕

加载数据时显示全屏动画。

当使用指令方式时，全屏遮罩需要添加 `fullscreen` 修饰符（遮罩会插入至 body 上） 此时若需要锁定屏幕的滚动，可以使用`lock`修饰符； 当使用服务方式时，遮罩默认即为全屏，无需额外设置。

<code src="./fullscreen.tsx"></code>

## 以服务的方式来调用

`Loading` 还可以以服务的方式调用。 你可以像这样引入 `Loading` 服务：

```ts
import { ElLoading } from '@qsxy/element-plus-react';
```

在你需要的时候通过下面的方式调用：

```ts
ElLoading.service(options);
```

其中`options`参数为 Loading 的配置项，具体见下表。 `LoadingService` 会返回一个 Loading 实例，可通过调用该实例的 `close` 方法来关闭它：

```ts
const loadingInstance = ElLoading.service(options);
setTimeout(() => {
    // Loading should be closed asynchronously
    loadingInstance.close();
}, 2000);
```

## 配置项

| 属性       | 说明                                                                                                                                         | 类型                     | 可选值 | 默认值        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ------ | ------------- |
| target     | Loading 需要覆盖的 DOM 节点。 可传入一个 DOM 对象或字符串； 若传入字符串，则会将其作为参数传入 `document.querySelector`以获取到对应 DOM 节点 | `string` / `HTMLElement` | —      | document.body |
| visible    | 是否显示 Loading                                                                                                                             | `boolean`                | —      | false         |
| fullscreen | 是否让加载组件铺满整个屏幕                                                                                                                   | `boolean`                | —      | false         |
| lock       | 是否锁定父级元素滚动                                                                                                                         | `boolean`                | —      | false         |
| text       | 显示在加载图标下方的加载文案                                                                                                                 | `string`                 | —      | —             |
| spinner    | 自定义加载图标类名                                                                                                                           | `string`                 | —      | —             |
| background | 遮罩背景色                                                                                                                                   | `string`                 | —      | —             |
| className  | Loading 的自定义类名                                                                                                                         | `string`                 | —      | —             |
| svg        | 自定义 SVG 元素覆盖默认加载器                                                                                                                | `string`                 | —      | —             |
| svgViewBox | 设置用于加载 svg 元素的 viewBox 属性                                                                                                         | `string`                 | —      | —             |
