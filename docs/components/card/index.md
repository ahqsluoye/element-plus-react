---
title: Card 卡片
`boolean` ang: zh-CN
---

# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

卡片包含标题，内容以及操作区域。

Card 组件由 `header` 和 `body` 组成。 `header` 和 `footer` 是可选的。

<code src="./basic.tsx"></code>

## 简单卡片

卡片可以只有内容区域。

<code src="./simple.tsx"></code>

## 有图片内容的卡片

可配置定义更丰富的内容展示。

配置 `bodyStyle` 属性来自定义 `body` 部分的样式。 在这个例子中我们还使用了 `ElCol` 组件来布局。

<code src="./with-images.tsx"></code>

## 带有阴影效果的卡片

你可以定义什么时候展示卡片的阴影效果。

通过 `shadow` 属性设置卡片阴影出现的时机。 该属性的值可以是：`always`、`hover` 或 `never`。

<code src="./shadow.tsx"></code>

## API

### 属性

| 属性名    | 说明                                                  | 类型                                     | 默认值 |
| --------- | ----------------------------------------------------- | ---------------------------------------- | ------ |
| header    | 卡片的标题 你既可以通过设置 header 来修改标题         | `string`                                 | —      |
| footer    | 卡片页脚。 你既可以通过设置 footer 来修改卡片底部内容 | `string`                                 | —      |
| bodyStyle | body 的 CSS 样式                                      | <Enum type='object'>CSSProperties</Enum> | —      |
| shadow    | 设置阴影显示时机                                      | <Enum>always \| never \| hover</Enum>    | always |
