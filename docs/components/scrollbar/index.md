---
title: Scrollbar 滚动条
lang: zh-CN
---

# Scrollbar 滚动条

用于替换浏览器原生滚动条。

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

<code src="./basic-usage.tsx" ></code>

## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条。

<code src="./horizontal-scroll.tsx" ></code>

## 最大高度

当元素高度超过最大高度，才会显示滚动条。

<code src="./max-height.tsx" ></code>

<!-- ## 手动滚动

通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

scrollbar/manual-scroll -->

## API

### 属性

| 属性名                            | 说明                                                                 | 类型                                                                                  | 默认值 |
| --------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| height                            | 滚动条高度                                                           | `string` / `number`                                                                 | —      |
| max-height                        | 滚动条最大高度                                                       | `string` / `number`                                                                 | —      |
| native                            | 是否使用原生滚动条样式                                               | `boolean`                                                                            | false  |
| wrap-style                        | 包裹容器的自定义样式                                                 | `string` / <Enum type='object'>CSSSProperties</Enum> | —      |
| wrap-class                        | 包裹容器的自定义类名                                                 | `string`                                                                             | —      |
| view-style                        | 视图的自定义样式                                                     | `string` / <Enum type='object'>CSSSProperties</Enum> | —      |
| view-class                        | 视图的自定义类名                                                     | `string`                                                                             | —      |
| noresize                          | 不响应容器尺寸变化，如果容器尺寸不会发生变化，最好设置它可以优化性能 | `boolean`                                                                            | false  |
| tag                               | 视图的元素标签                                                       | `string`                                                                             | div    |
| always                            | 滚动条总是显示                                                       | `boolean`                                                                            | false  |
| min-size                          | 滚动条最小尺寸                                                       | `number`                                                                             | 20     |

### 事件

| 事件名 | 说明                             | 类型                                                             |
| ------ | -------------------------------- | ---------------------------------------------------------------- |
| onScroll | 当触发滚动事件时，返回滚动的距离 | <Enum type="Function">(data: { e: React.UIEvent<HTMLDivElement, UIEvent>; scrollTop: number; scrollLeft: number }) => void</Enum>|


### Ref 

| 名称          | 说明                   | 类型                                                                       |
| ------------- | ---------------------- | -------------------------------------------------------------------------- |
| scrollTo      | 滚动到一组特定坐标     | <Enum  type="Function">(options: ScrollToOptions \| number, yCoord?: number) => void </Enum>
| setScrollTop  | 设置滚动条到顶部的距离 | <Enum  type="Function">(scrollTop: number) => void</Enum>
| setScrollLeft | 设置滚动条到左边的距离 | <Enum  type="Function">(scrollLeft: number) => void                                  </Enum>
| update        | 手动更新滚动条状态     | <Enum  type="Function">() => void                                                    </Enum>
| wrapRef       | 滚动条包裹的 ref 对象  | <Enum type="Object">Ref\<HTMLDivElement\></Enum>                             
| resizeRef       | 视图ref对象  | <Enum type="Object">Ref\<any\></Enum>                             
<!-- | handleScroll  | 触发滚动事件           | <Enum  type="Function">() => void                                                    </Enum> -->
