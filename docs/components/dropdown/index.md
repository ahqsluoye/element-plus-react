---
title: Dropdown 下拉菜单
lang: zh-CN
---

<Meta></Meta>

# Dropdown 下拉菜单

将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过子组件 来设置下拉触发的元素以及需要通过属性 `menu` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<code src="./basic-usage.tsx"></code>

## 触发对象

可使用按钮触发下拉菜单。

设置 `splitButton` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 `true` 即可。 如果你想要在第三和第四个选项之间添加一个分隔符，你只需要为第四个选项添加一个 `divider` 的 CSS class。

<code src="./triggering-element.tsx"></code>

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 click 即可， 默认为 `hover`。

<code src="./how-to-trigger.tsx"></code>

## 菜单隐藏方式

可以通过 `hideOnClick` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 hideOnClick 属性设置为 false 可以关闭此功能。

<code src="./menu-hiding-behavior.tsx"></code>

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

<code src="./command-event.tsx"></code>

## 下拉方法

您可以手动使用 `手动打开` 或 `手动关闭下拉菜单以打开或关闭`

<code src="./dropdown-methods.tsx"></code>

## 尺寸

Dropdown 组件提供除了默认值以外的三种尺寸，可以在不同场景下选择合适的尺寸。

使用 `size` 属性配置尺寸，可选的尺寸大小有: `large`, `default` 或 `small`

<code src="./sizes.tsx"></code>

## 虚拟触发

有时候我们想把 dropdown 的触发元素放在别的地方，而不需要写在一起，这时候就可以使用虚拟触发。

<code src="./virtual-trigger.tsx"></code>

## Dropdown 属性

| 属性名            | 说明                                                                          | 类型                                                                                                                         | Default |
| ----------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------- |
| menu              | ElDropdownMenu 菜单                                                           | <Enum type='object'> `React.ReactElement<DropdownMenuProps>`</Enum>                                                          | ''      |
| visible           | 状态是否可见                                                                  | `boolean`                                                                                                                    | —       |
| defaultVisible    | 初始值                                                                        | `boolean`                                                                                                                    | —       |
| type              | 菜单按钮类型，同 `Button` 组件一样，仅在 `splitButton` 为 true 的情况下有效。 | <Enum type="enum">'' \| 'default' \| 'primary' \| 'success' \| 'warning' \| 'info' \| 'danger' \| 'text' (deprecated)</Enum> | ''      |
| size              | 菜单尺寸，在 splitButton 为 true 的情况下也对触发按钮生效。                   | <Enum type="enum">'' \| 'large' \| 'default' \| 'small'</Enum>                                                               | ''      |
| buttonProps       | 按钮组件的 props，参考 [按钮属性](./button#button-属性)                       | `object`                                                                                                                     | —       |
| maxHeight         | 菜单最大高度                                                                  | `string` / `number`                                                                                                          | ''      |
| splitButton       | 下拉触发元素呈现为按钮组                                                      | `boolean`                                                                                                                    | false   |
| disabled          | 是否禁用                                                                      | `boolean`                                                                                                                    | false   |
| placement         | 菜单弹出位置                                                                  | <Enum type="enum">'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end'</Enum>                     | bottom  |
| effect            | Tooltip 主题，内置了 `dark` / `light` 两种主题                                | <Enum type="enum">'dark' \| 'light'</Enum> / `string`                                                                        | light   |
| trigger           | 触发下拉的行为                                                                | <Enum type="enum">'click' \| 'hover' \| 'contextmenu'`/`array``Array<'click' \| 'hover' \| 'contextmenu'></Enum>             | hover   |
| virtualTriggering | 是否启用虚拟触发器                                                            | `boolean`                                                                                                                    | —       |
| virtualRef        | 指示下拉框所依附的参考元素                                                    | `HTMLElement`                                                                                                                | —       |
| hideOnClick       | 是否在点击菜单项后隐藏菜单                                                    | `boolean`                                                                                                                    | true    |
| showArrow         | tooltip 的内容是否有箭头                                                      | `boolean`                                                                                                                    | true    |
| showTimeout       | 展开下拉菜单的延时，仅在 trigger 为 hover 时有效                              | `number`                                                                                                                     | 150     |
| hideTimeout       | 收起下拉菜单的延时（仅在 trigger 为 hover 时有效）                            | `number`                                                                                                                     | 150     |
| persistent        | 当下拉菜单处于非活动状态且 persistent 为 false 时，下拉菜单将被销毁           | `boolean`                                                                                                                    | true    |
| popperClass       | 自定义浮层类名                                                                | `string` / `object`                                                                                                          | ''      |
| popperStyle       | 自定义浮层类名                                                                | `string` / `object`                                                                                                          | —       |

<!--
| triggerKeys | 指定键盘上哪些按键可以触发操作 | <Enum type="array">string[]`                                                                                                 |`['Enter', 'Space', 'ArrowDown', 'NumpadEnter']</Enum> |
| role | 下拉菜单的 ARIA 属性。 根据具体场景，您可能想要将此更改为“navigation” | <Enum type="enum">'dialog' \| 'grid' \| 'group' \| 'listbox' \| 'menu' \| 'navigation' \| 'tooltip' \| 'tree'</Enum> | menu |
| tabindex | Dropdown 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | `number` / `string` | 0 |
| popperOptions | [popper.js](https://popper.js.org/docs/v2/) 参数 | `object` | `{modifiers: [{name: 'computeStyles',options: {gpuAcceleration: false}}]}` |
| teleported | 是否将下拉列表插入至 body 元素 | `boolean` | true |
| appendTo | dropdown 的内容将挂载到哪一个元素上 | `CSSSelector` / `HTMLElement` | — |
| persistent | 当下拉菜单处于非活动状态且 `persistent` 为 `false` 时，下拉菜单将被销毁 | `boolean` | true |
-->

## Dropdown 事件

| 事件名          | 说明                                                                       | 类型                                                                                |
| --------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| onClick         | splitButton 为 true 时，点击左侧按钮的回调                                 | <Enum type="Function">(e: React.MouseEvent<HTMLElement, MouseEvent>) => void</Enum> |
| onCommand       | 当下拉项被点击时触发，参数是从下拉菜单中发送的命令                         | <Enum type="Function">(...args: any[]) => void</Enum>                               |
| onVisiblechange | 当下拉菜单出现/消失时触发器, 当它出现时, 参数将是 `true`, 否则将是 `false` | <Enum type="Function">(val: boolean) => void</Enum>                                 |

### Dropdown Ref

| 方法名      | 说明         | Type                                    |
| ----------- | ------------ | --------------------------------------- |
| handleOpen  | 打开下拉菜单 | <Enum type="Function">() => void</Enum> |
| handleClose | 关闭下拉菜单 | <Enum type="Function">() => void</Enum> |

## DropdownItem API

### DropdownItem 属性

| 属性名   | 说明                              | Type                           | 默认值 |
| -------- | --------------------------------- | ------------------------------ | ------ |
| command  | 派发到`command`回调函数的指令参数 | `string` / `number` / `object` | —      |
| disabled | 是否禁用                          | `boolean`                      | false  |
| divided  | 是否显示分隔符                    | `boolean`                      | false  |
| active   | 是否为激活状态                    | `boolean`                      | false  |
