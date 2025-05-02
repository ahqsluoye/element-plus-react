---
title: Dropdown 下拉菜单
lang: zh-CN
---

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过子组件 来设置下拉触发的元素以及需要通过属性 `menu` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<code src="./basic-usage.tsx"></code>

<!-- ## 触发对象

可使用按钮触发下拉菜单。

设置 `splitButton` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 `true` 即可。 如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 `divider` 的 CSS class。

<code src="./triggering-element.tsx"></code> -->

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 click 即可， 默认为 `hover`。

<code src="./triggering-element.tsx"></code>

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 hide-on-click 属性设置为 false 可以关闭此功能。

<code src="./menu-hiding-behavior.tsx"></code>

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

<code src="./command-event.tsx"></code>

<!-- ## 下拉方法

您可以手动使用 `手动打开` 或 `手动关闭下拉菜单以打开或关闭`

<code src="./dropdown-methods.tsx"></code> -->

<!-- ## 尺寸

Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

<code src="./sizes.tsx"></code> -->

## Dropdown 属性

| 属性名        | 说明                                               | 类型                                             | Default                                                                    |
| ------------- | -------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------- |
| maxHeight     | 菜单最大高度                                       | `string` / `number`                              | ''                                                                         |
| disabled      | 是否禁用                                           | `boolean`                                        | false                                                                      |
| trigger       | 触发下拉的行为                                     | <Enum>'hover' \| 'click' \| 'contextmenu'</Enum> | hover                                                                      |
| hideOnClick   | 是否在点击菜单项后隐藏菜单                         | `boolean`                                        | true                                                                       |
| showTimeout   | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效   | `number`                                         | 150                                                                        |
| hideTimeout   | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效） | `number`                                         | 150                                                                        |
| popperClass   | 自定义浮层类名                                     | `string`                                         | ''                                                                         |
| popperOptions | [popper.js](https://popper.js.org/docs/v2/) 参数   | `object`                                         | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |

## Dropdown 事件

| 事件名          | 说明                                                                       | 类型                                                  |
| --------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| onClick         | 当下拉项被点击时触发，参数是从下拉菜单中发送的命令                         | <Enum type="Function">(...args: any[]) => void</Enum> |
| onVisiblechange | 当下拉菜单出现/消失时触发器, 当它出现时, 参数将是 `true`, 否则将是 `false` | <Enum type="Function">(val: boolean) => void</Enum>   |

### Dropdown Ref

| 方法名      | 说明         | Type                                    |
| ----------- | ------------ | --------------------------------------- |
| handleOpen  | 打开下拉菜单 | <Enum type="Function">() => void</Enum> |
| handleClose | 关闭下拉菜单 | <Enum type="Function">() => void</Enum> |

## Dropdown-Item API

### Dropdown-Item 属性

| 属性名   | 说明                              | Type                           | 默认值 |
| -------- | --------------------------------- | ------------------------------ | ------ |
| command  | 派发到`command`回调函数的指令参数 | `string` / `number` / `object` | —      |
| disabled | 是否禁用                          | `boolean`                      | false  |
| divided  | 是否显示分隔符                    | `boolean`                      | false  |
| active   | 是否为激活状态                    | `boolean`                      | false  |
