---
title: ColorPicker 颜色选择器
lang: zh-CN
---

# ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

## 基础用法

<code src="./basic.tsx"></code>

## 选择透明度

ColorPicker 支持普通颜色，也支持带 Alpha 通道的颜色，通过`showAlpha`属性即可控制是否支持透明度的选择。 要启用 Alpha 选择，只需添加 `showAlpha` 属性。

<code src="./alpha.tsx"></code>

## 预定义颜色

ColorPicker 支持预定义颜色

<code src="./predefined-color.tsx"></code>

## 不同尺寸

<code src="./sizes.tsx"></code>

## API

### 属性

| 属性名      | 说明                    | 类型                                                                                                              | 默认值 |
| ----------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------- | ------ |
| value       | 选中项绑定值            | `string`                                                                                                          | —      |
| disabled    | 是否禁用                | `boolean`                                                                                                         | false  |
| size        | 尺寸                    | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                      | —      |
| showAlpha   | 是否支持透明度选择      | `boolean`                                                                                                         | false  |
| colorformat | 写入 value 的颜色的格式 | <Enum>`hsl` \| `hsv` \| `hex` \| `rgb`', '`hex` (当 `showAlpha` 为 false) / `rgb` (当 `showAlpha` 为 true)</Enum> | —      |
| predefine   | 预定义颜色              | <Enum type='object'>string[]</Enum>                                                                               | —      |

### 事件

| 事件名       | 说明                               | 类型                                                 |
| ------------ | ---------------------------------- | ---------------------------------------------------- |
| onChange     | 当绑定值变化时触发                 | <Enum type='Function'>(value: string) => void</Enum> |
| activeChange | 面板中当前显示的颜色发生改变时触发 | <Enum type='Function'>(value: string) => void</Enum> |

### Ref

| 名称  | 说明         | 类型                                            |
| ----- | ------------ | ----------------------------------------------- |
| ref   | 根元素       | <Enum type='object'>Ref\<HTMLDivElement></Enum> |
| color | 当前色彩对象 | <Enum type='object'>Color</Enum>                |
