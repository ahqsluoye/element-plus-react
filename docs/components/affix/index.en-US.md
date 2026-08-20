---
title: Affix
lang: en-US
---

<Meta></Meta>

# Affix

Fix the element to a specific visible area.

## Basic Usage

Affix is fixed at the top of the page by default.

You can set `offset` attribute to change the offset distance, the default value is 0.

<code src="./basic.tsx"></code>

## Target Container

You can set `target` attribute to keep the affix in the container at all times. It will be hidden if out of range.

Please notice that the container should avoid having scrollbar.

<code src="./target.tsx"></code>

## Fixed Position

The affix component provides two fixed positions: `top` and `bottom`.

You can set `position` attribute to change the fixed position, the default value is `top`.

<code src="./fixed.tsx"></code>

## API

### Properties

| Name       | Description                                                                                    | Type                                       | Default |
| ---------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------ | ------- |
| offset     | offset distance                                                                                | `number`                                   | 0       |
| position   | position of affix                                                                              | <Enum type="enum">'top' \| 'bottom'</Enum> | top     |
| target     | target container (CSS selector)                                                                | `string`                                   | —       |
| zIndex     | `z-index` of affix                                                                             | `number`                                   | 100     |
| teleported | whether affix element uses teleport feature, if `true` it will be teleported to where `appendTo` sets | `boolean`                                  | false   |
| appendTo   | which element the affix element is mounted to                                                  | `CSSSelector` / `HTMLElement`              | body    |

### Events

| Name     | Description                       | Callback Parameters                                                                             |
| -------- | --------------------------------- | ----------------------------------------------------------------------------------------------- |
| onChange | triggers when fixed state changed | <Enum type="Function">`(fixed: boolean) => void`</Enum>                                          |
| onScroll | triggers when scrolling           | <Enum type="Function">`(data: { scrollTop: number; fixed: boolean }) => void`</Enum>            |

### AffixRef

| Name       | Description                          | Type                                      |
| ---------- | ------------------------------------ | ----------------------------------------- |
| update     | update affix state manually          | <Enum type="Function">`() => void`</Enum> |
| updateRoot | update root element's box model info | <Enum type="Function">`() => void`</Enum> |

## Type Definitions

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