---
title: Menu 菜单
lang: zh-CN
---

# Menu 菜单

为网站提供导航功能的菜单。

:::info{title=TIP}

如果您想要覆盖 ElMenu 的默认高度, 您可以使用下列 CSS

```css
.el-menu--horizontal {
    --el-menu-horizontal-height: 100px;
}
```

:::

## 顶栏

顶部栏菜单可以在各种场景中使用。

导航菜单默认为垂直模式，通过将 mode 属性设置为 horizontal 来使导航菜单变更为水平模式。 另外，在菜单中通过 subMenu 组件可以生成二级菜单。 Menu 还提供了`background-color`、`text-color`和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

<code src="./basic.tsx"></code>

## 左右

您可以将菜单项放置在左边或右边。

<code src="./left-and-right.tsx"></code>

## 侧栏

垂直菜单，可内嵌子菜单。

通过 ElMenuItemGroup 组件可以实现菜单进行分组，分组名可以通过 title 属性直接设定，也可以通过具名 slot 来设定。

<code src="./vertical.tsx"></code>

## Collapse 折叠面板

垂直导航菜单可以被折叠

<code src="./collapse.tsx"></code>

## 弹出层偏移量

当提供了 popperOffset 配置，会覆盖 Submenu 的 `popperOffset`.

<code src="./popper-offset.tsx"></code>

## 菜单 API

### Menu Attributes

| 属性名              | 说明                                                                                                                             | 类型                                      | Default  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------- |
| mode                | 菜单展示模式                                                                                                                     | <Enum>'horizontal' \| 'vertical'</Enum>   | vertical |
| collapse            | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）                                                                             | `boolean`                                 | false    |
| ellipsis            | 是否省略多余的子项（仅在横向模式生效）                                                                                           | `boolean`                                 | true     |
| ellipsisIcon        | 自定义省略图标 (仅在水平模式下可用)                                                                                              | `string` / `Component`                    | —        |
| popperOffset        | 弹出层的偏移量(对所有子菜单有效)                                                                                                 | `number`                                  | 6        |
| defaultActive       | 页面加载时默认激活菜单的 index                                                                                                   | `string`                                  | ''       |
| defaultOpeneds      | 默认打开的 subMenu 的 index 的数组                                                                                               | <Enum type="object">string[]</Enum>       | []       |
| uniqueOpened        | 是否只保持一个子菜单的展开                                                                                                       | `boolean`                                 | false    |
| menuTrigger         | 子菜单打开的触发方式，只在 `mode` 为 horizontal 时有效。                                                                         | <Enum>'hover' \| 'click'</Enum>           | hover    |
| router              | 是否启用 `vue-router` 模式。 启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 `defaultActive` 来设置加载时的激活项。 | `boolean`                                 | false    |
| collapseTransition  | 是否开启折叠动画                                                                                                                 | `boolean`                                 | true     |
| popperEffect        | Tooltip 主题，内置了 `dark` / `light` 两种主题，当菜单折叠时生效。                                                               | <Enum>'dark' \| 'light'</Enum> / `string` | dark     |
| closeOnClickOutside | 可选，单击外部时是否折叠菜单                                                                                                     | `boolean`                                 | false    |
| popperClass         | 为 popper 添加类名                                                                                                               | `string`                                  | —        |
| showTimeout         | 菜单出现前的延迟                                                                                                                 | `number`                                  | 300      |
| hideTimeout         | 菜单消失前的延迟                                                                                                                 | `number`                                  | 300      |

### Menu Events

| 事件名   | 说明               | 类型                                         |
| -------- | ------------------ | -------------------------------------------- |
| onSelect | 菜单激活回调       | <Enum type="Function">MenuSelectEvent</Enum> |
| onOpen   | subMenu 展开的回调 | <Enum type="Function">MenuOpenEvent</Enum>   |
| onClose  | subMenu 收起的回调 | <Enum type="Function">MenuCloseEvent</Enum>  |

### Menu Exposes

| 方法名 | 说明                                             | 类型                                                 |
| ------ | ------------------------------------------------ | ---------------------------------------------------- |
| open   | 打开一个特定的子菜单，参数是要打开的子菜单的索引 | <Enum type="Function">(index: string) => void</Enum> |
| close  | 关闭一个特定的子菜单，参数是要关闭子菜单的索引   | <Enum type="Function">(index: string) => void</Enum> |

## SubMenu API

### SubMenu Attributes

| 属性名                                             | 说明                                                                                            | 类型                   | 默认值    |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------- | --------- |
| index <ElTag round type="success">required</ElTag> | 唯一标志                                                                                        | `string`               | —         |
| title <ElTag round type="success">required</ElTag> | 标题内容                                                                                        | `string`               | —         |
| popperClass                                        | 为 popper 添加类名                                                                              | `string`               | —         |
| showTimeout                                        | 子菜单出现之前的延迟，(继承 menu 的 `showTimeout` 配置)                                         | `number`               | —         |
| hideTimeout                                        | 子菜单消失之前的延迟，(继承 menu 的 `hideTimeout` 配置)                                         | `number`               | —         |
| disabled                                           | 是否禁用                                                                                        | `boolean`              | false     |
| teleported                                         | 是否将弹出菜单挂载到 body 上，第一级 SubMenu 默认值为 true，其他 SubMenus 的值为 false          | `boolean`              | undefined |
| popperOffset                                       | 弹出窗口的偏移量 (覆盖 `popper`的菜单)                                                          | `number`               | —         |
| expandCloseIcon                                    | 父菜单展开且子菜单关闭时的图标， `expandCloseIcon` 和 `expandOpenIcon` 需要一起配置才能生效     | `string` / `Component` | —         |
| expandOpenIcon                                     | 父菜单展开且子菜单打开时的图标， `expandOpenIcon` 和 `expandCloseIcon` 需要一起配置才能生效     | `string` / `Component` | —         |
| collapseCloseIcon                                  | 父菜单收起且子菜单关闭时的图标， `collapseCloseIcon` 和 `collapseOpenIcon` 需要一起配置才能生效 | `string` / `Component` | —         |
| collapseOpenIcon                                   | 父菜单收起且子菜单打开时的图标， `collapseOpenIcon` 和 `collapseCloseIcon` 需要一起配置才能生效 | `string` / `Component` | —         |

## MenuItem API

### MenuItem Attributes

| 属性名                                             | 说明                   | 类型                | 默认值 |
| -------------------------------------------------- | ---------------------- | ------------------- | ------ |
| index                                              | 唯一标志               | `string` / `null`   | null   |
| title <ElTag round type="success">required</ElTag> | 标题内容               | `string`            | —      |
| route                                              | Vue Route 路由位置参数 | `string` / `object` | —      |
| disabled                                           | 是否禁用               | `boolean`           | false  |

### MenuItem Events

| 事件名  | 说明                                   | 类型                                                            |
| ------- | -------------------------------------- | --------------------------------------------------------------- |
| onClick | 点击菜单项时回调函数, 参数为菜单项实例 | <Enum type="Function">(item: MenuItemRegistered) => void</Enum> |

## MenuItemGroup API

### MenuItemGroup Attributes

| 属性名 | 说明   | 类型     | 默认值 |
| ------ | ------ | -------- | ------ |
| title  | 组标题 | `string` | —      |

## 类型声明

<details>
  <summary>显示类型声明</summary>

```ts
/**
 * @param index index of activated menu
 * @param indexPath index path of activated menu
 * @param item the selected menu item
 * @param routerResult result returned by `vue-router` if `router` is enabled
 */
type MenuSelectEvent = (index: string, indexPath: string[], item: MenuItemClicked, routerResult?: Promise<void | NavigationFailure>) => void;

/**
 * @param index index of expanded subMenu
 * @param indexPath index path of expanded subMenu
 */
type MenuOpenEvent = (index: string, indexPath: string[]) => void;

/**
 * @param index index of collapsed subMenu
 * @param indexPath index path of collapsed subMenu
 */
type MenuCloseEvent = (index: string, indexPath: string[]) => void;

interface MenuItemRegistered {
    index: string;
    indexPath: string[];
    active: boolean;
}

interface MenuItemClicked {
    index: string;
    indexPath: string[];
    route?: RouteLocationRaw;
}
```

</details>
