---
title: Affix 固钉
lang: zh-CN
---

<Meta></Meta>

# Affix 固钉

将页面元素固定在特定可视区域。

## 基础用法

固钉默认固定在页面顶部。

通过设置 `offset` 属性来改变吸顶距离，默认值为 0。

<code src="./basic.tsx"></code>

## 指定容器

通过设置 `target` 属性，让固钉始终保持在容器内， 超过范围则隐藏。

请注意容器避免出现滚动条。

<code src="./target.tsx"></code>

## 固定位置

Affix 组件提供 2 个固定的位置参数 `top` 和 `bottom`。

通过设置 `position` 属性来改变固定位置，默认值为 `top`。

<code src="./fixed.tsx"></code>

## API

### 属性

| 名称       | 说明                                                                                         | 类型                                       | 默认值 |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ | ------ |
| offset     | 偏移距离                                                                                     | `number`                                   | 0      |
| position   | 固钉位置                                                                                     | <Enum type="enum">'top' \| 'bottom'</Enum> | top    |
| target     | 指定容器（CSS 选择器）                                                                       | `string`                                   | —      |
| zIndex     | `z-index`                                                                                    | `number`                                   | 100    |
| teleported | Affix 元素是否使用 teleport 特性，设置为 `true` 将会使得该元素“传送”至 `appendTo` 设置的位置 | `boolean`                                  | false  |
| appendTo   | Affix 元素将被挂载至哪个元素                                                                 | `CSSSelector` / `HTMLElement`              | body   |

### 事件

| 事件名   | 说明               | 回调参数                                                                             |
| -------- | ------------------ | ------------------------------------------------------------------------------------ |
| onChange | 固钉状态改变时触发 | <Enum type="Function">`(fixed: boolean) => void`</Enum>                              |
| onScroll | 滚动时触发         | <Enum type="Function">`(data: { scrollTop: number; fixed: boolean }) => void`</Enum> |

### AffixRef

| 方法名     | 说明                       | 类型                                      |
| ---------- | -------------------------- | ----------------------------------------- |
| update     | 手动更新固钉状态           | <Enum type="Function">`() => void`</Enum> |
| updateRoot | 手动更新根元素的盒模型信息 | <Enum type="Function">`() => void`</Enum> |

## 类型定义

```typescript
interface AffixProps {
    zIndex?: number;
    target?: string;
    offset?: number;
    position?: 'top' | 'bottom';
    teleported?: boolean;
    appendTo?: string | HTMLElement;
    onScroll?: (data: { scrollTop: number; fixed: boolean }) => void;
    onChange?: (fixed: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

interface AffixInstance {
    update: () => void;
    updateRoot: () => void;
}
```
