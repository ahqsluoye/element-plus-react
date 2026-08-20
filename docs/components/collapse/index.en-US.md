---
title: Collapse
lang: en-US
---

<Meta></Meta>

# Collapse

Use Collapse to store contents.

## Basic Usage

You can expand multiple panels simultaneously, and the panels do not affect each other.

<code src="./basic.tsx"></code>

## Accordion

Only one panel can be expanded at a time.

Set whether to display in accordion mode via the `accordion` attribute.

<code src="./accordion.tsx"></code>

## Custom Title

Customize the panel title content via the `title` attribute to add icons and other effects.

<code src="./customization.tsx"></code>

## Custom Icon

Besides using the `icon` attribute, you can also customize the panel item icon to add custom content.

<code src="./custom-icon.tsx"></code>

## Custom Icon Position

Use the `expandIconPosition` attribute to customize the icon position.

<code src="./custom-icon-position.tsx"></code>

## Prevent Collapsing

Set the `beforeCollapse` attribute. If `false` is returned or a `Promise` is returned and is `reject`ed, the switching will stop.

<code src="./prevent-collapsing.tsx"></code>

## Collapse API

### Collapse Properties

| Name               | Description                                                                                                 | Type                                                           | Default |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------- |
| defaultActiveName  | Currently active panel (in accordion mode, the binding value type should be `string`, otherwise `array`)   | `string` / `array`                                             | —       |
| activeName         | Currently active panel (controlled mode: in accordion mode, the binding value type should be `string`, otherwise `array`) | `string` / `array`                                             | —       |
| accordion          | Whether to enable accordion mode                                                                             | `boolean`                                                      | false   |
| expandIconPosition | Set expand icon position                                                                                     | <Enum type="enum">'left' \| 'right'</Enum>                     | right   |
| beforeCollapse     | Collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching | <Enum type="Function">() => Promise<boolean> \| boolean</Enum> | —       |

### Collapse Events

| Name     | Description                                                                                                                      | Type                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| onChange | Triggers when switching the active panel. In accordion mode the type is `string`, in other modes it is `array`                   | <Enum type="Function">(activeNames: array \| string) => void</Enum> |

### Collapse Ref

| Name           | Description                  | Type                                                                     |
| -------------- | ---------------------------- | ------------------------------------------------------------------------ |
| activeNames    | Currently active panel names | <Enum type="object">(string \| number)[]</Enum>                          |
| setActiveNames | Set active panel names       | <Enum type="Function">(activeNames: (string \| number)[]) => void</Enum> |

## Collapse Item API

### Collapse Item Properties

| Name     | Description                  | Type                                                                                             | Default    |
| -------- | ---------------------------- | ------------------------------------------------------------------------------------------------ | ---------- |
| name     | Unique identifier           | `string` / `number`                                                                              | —          |
| title    | Panel title                  | `string` / `Component` / <Enum type="Function">((isActive: boolean) => React.reactNode)</Enum>   | ''         |
| icon     | Icon of the collapse item    | `IconName` / `Component` / <Enum type="Function">((isActive: boolean) => React.reactNode)</Enum> | ArrowRight |
| disabled | Whether to disable           | `boolean`                                                                                        | false      |

### Collapse Item Ref

| Name     | Description                          | Type                 |
| -------- | ------------------------------------ | -------------------- |
| isActive | Whether the current collapse item is active | boolean \| undefined |