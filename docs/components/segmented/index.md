---
title: Segmented
lang: zh-CN
---

# Segmented 分段控制器

用于展示多个选项并允许用户选择其中单个选项。

## 基础用法

设置`value`为选项值。

<code src="./basic.tsx"></code>

## 配置方向

设置 `vertical` 来改变方向。

<code src="./custom-direction.tsx"></code>

## 禁用状态

设置 `disabled` 属性来禁用一些选项。

<code src="./disabled.tsx"></code>

## 自定义选项

当您的 `options` 格式不同于默认格式时，可通过 `props` 属性自定义 `options`

<code src="./props.tsx"></code>

## Block 分段选择器

设置`block`为`true`以适应父元素的宽度。

<code src="./block.tsx"></code>

## 自定义内容

设置 `children` 来渲染自定义内容。

<code src="./custom-content.tsx"></code>

## 自定义样式

使用 CSS 变量设置自定义样式。

<code src="./custom-style.tsx"></code>

## API

### 属性

| 名称         | 说明               | 类型                                                           | 默认值     |
| ------------ | ------------------ | -------------------------------------------------------------- | ---------- |
| value        | 绑定值             | `string` / `number` / `boolean`                                | —          |
| defaultValue | 默认绑定值         | `string` / `number` / `boolean`                                | —          |
| options      | 选项的数据         | <Enum type="array">Option[]</Enum>                             | []         |
| props        | 配置选项，详见下表 | `object`                                                       | —          |
| size         | 组件大小           | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum> | ''         |
| block        | 撑满父元素宽度     | `boolean`                                                      | false      |
| disabled     | 是否禁用           | `boolean`                                                      | false      |
| name         | 原生 name 属性     | `string`                                                       | —          |
| id           | 原生 `id` 属性     | `string`                                                       | —          |
| direction    | 展示的方向         | <Enum type="enum">'horizontal' \| 'vertical'</Enum>            | horizontal |

### props

| 属性     | 说明                               | 类型     | 默认值   |
| -------- | ---------------------------------- | -------- | -------- |
| value    | 指定键为节点对象的某个属性值       | `string` | value    |
| label    | 指定标签为节点对象的某个属性值     | `string` | label    |
| disabled | 指定禁用状态为节点对象的某个属性值 | `string` | disabled |

### 事件

| 名称     | 说明                                   | 类型                                            |
| -------- | -------------------------------------- | ----------------------------------------------- |
| onChange | 当所选值更改时触发，参数是当前选中的值 | <Enum type="Function">(val: any) => void</Enum> |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
type Option = Record<string, any> | string | number | boolean;
```

</details>
