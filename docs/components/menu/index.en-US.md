---
title: Menu
lang: en-US
---

<Meta></Meta>

# Menu

Menu that provides navigation for your website.

:::info{title=TIP}

If you want to override the default height of ElMenu, you can use the following CSS:

```css
.el-menu--horizontal {
    --el-menu-horizontal-height: 100px;
}
```

:::

## Top bar

Top bar menu can be used in a variety of scenarios.

By default, the menu is vertical. You can change it to horizontal by setting the `mode` prop to `horizontal`. In addition, you can use the `subMenu` component to create a second-level menu. Menu also provides `background-color`, `text-color`, and `active-text-color` to customize the colors.

<code src="./basic.tsx"></code>

## Left And Right

You can place menu items on the left or right.

<code src="./left-and-right.tsx"></code>

## Side bar

Vertical menu with sub-menus.

You can use the `ElMenuItemGroup` component to create a menu group. The group name can be set directly through the `title` prop or through a named slot.

<code src="./vertical.tsx"></code>

## Collapse

Vertical menu can be collapsed.

<code src="./collapse.tsx"></code>

## Popper Offset

When `popperOffset` is provided, it will override Submenu's `popperOffset`.

<code src="./popper-offset.tsx"></code>

## Menu API

### Menu Properties

| Name               | Description                                                                                                                                                                         | Type                                    | Default  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| mode               | Menu display mode                                                                                                                                                                   | <Enum>'horizontal' \| 'vertical'</Enum> | vertical |
| collapse           | Whether the menu is collapsed (available only in vertical mode)                                                                                                                      | `boolean`                               | false    |
| ellipsis           | Whether to ellipsis excess sub-items (available only in horizontal mode)                                                                                                             | `boolean`                               | true     |
| ellipsisIcon       | Custom ellipsis icon (available only in horizontal mode)                                                                                                                            | `string` / `React.ReactElement`         | —        |
| popperOffset       | Offset of the popper (effective for all submenus)                                                                                                                                   | `number`                                | 6        |
| defaultActive      | Index of the active menu on page load                                                                                                                                               | `string`                                | ''       |
| defaultOpeneds     | Array of indexes of sub-menus opened by default                                                                                                                                     | <Enum type="object">string[]</Enum>     | []       |
| uniqueOpened       | Whether only one sub-menu can remain open                                                                                                                                            | `boolean`                               | false    |
| menuTrigger        | How sub-menus are triggered, only works when `mode` is `horizontal`                                                                                                                  | <Enum>'hover' \| 'click'</Enum>         | hover    |
| router             | Whether `react-router-dom` mode is enabled. If enabled, `index` will be used as `path` for route navigation. Use `defaultActive` to set the active item on load. Requires `useNavigate` function. | `boolean`                               | false    |
| navigate           | Return value of `useNavigate` hook from `react-router-dom`                                                                                                                          | `NavigateFunction`                      | —        |
| collapseTransition | Whether to enable the collapse transition                                                                                                                                           | `boolean`                               | true     |
| showTimeout        | Delay before the menu appears                                                                                                                                                       | `number`                                | 300      |
| hideTimeout        | Delay before the menu disappears                                                                                                                                                    | `number`                                | 300      |

<!-- | popperEffect        | Tooltip theme, built-in `dark` / `light` themes, effective when menu is collapsed                                                                                                       | <Enum>'dark' \| 'light'</Enum> / `string` | dark     |
| popperClass         | Add a class name for the popper                                                                                                                                                      | `string`                                  | —        |
| closeOnClickOutside | Optional, whether the menu is collapsed when clicking outside                                                                                                                        | `boolean`                                 | false    | -->

### Menu Events

| Name    | Description                              | Type                                         |
| ------- | ---------------------------------------- | -------------------------------------------- |
| onSelect | Callback when menu is activated         | <Enum type="Function">MenuSelectEvent</Enum> |
| onOpen   | Callback when sub-menu expands          | <Enum type="Function">MenuOpenEvent</Enum>   |
| onClose  | Callback when sub-menu collapses        | <Enum type="Function">MenuCloseEvent</Enum>  |

### MenuRef

| Name  | Description                                                                  | Type                                                 |
| ----- | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| open  | Open a specific sub-menu, the parameter is the index of the sub-menu to open | <Enum type="Function">(index: string) => void</Enum> |
| close | Close a specific sub-menu, the parameter is the index of the sub-menu to close | <Enum type="Function">(index: string) => void</Enum> |

## SubMenu API

### SubMenu Properties

| Name         | Description                                                                                                         | Type                            | Default |
| ------------ | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ------- |
| index        | Unique identifier                                                                                                   | `string`                        | —       |
| title        | Title content                                                                                                       | `string` / `React.ReactElement` | —       |
| popperClass  | Add a class name for the popper                                                                                      | `string`                        | —       |
| disabled     | Whether the sub-menu is disabled                                                                                     | `boolean`                       | false   |
| showTimeout  | Delay before the sub-menu appears (inherits the menu's `showTimeout` configuration)                                   | `number`                        | —       |
| hideTimeout  | Delay before the sub-menu disappears (inherits the menu's `hideTimeout` configuration)                                 | `number`                        | —       |
| popperOffset | Offset of the popper (overrides the menu's `popperOffset`)                                                           | `number`                        | —       |

<!--
| appendToBody      | Whether to mount the popup menu to body. The default value for the first-level SubMenu is true, and for other SubMenus is false          | `boolean`                       | —      |
| expandCloseIcon   | Icon when parent menu is expanded and sub-menu is closed. `expandCloseIcon` and `expandOpenIcon` need to be configured together to take effect     | `string` / `React.ReactElement` | —      |
| expandOpenIcon    | Icon when parent menu is expanded and sub-menu is open. `expandOpenIcon` and `expandCloseIcon` need to be configured together to take effect     | `string` / `React.ReactElement` | —      |
| collapseCloseIcon | Icon when parent menu is collapsed and sub-menu is closed. `collapseCloseIcon` and `collapseOpenIcon` need to be configured together to take effect | `string` / `React.ReactElement` | —      |
| collapseOpenIcon  | Icon when parent menu is collapsed and sub-menu is open. `collapseOpenIcon` and `collapseCloseIcon` need to be configured together to take effect | `string` / `React.ReactElement` | —      | -->

## MenuItem API

### MenuItem Properties

| Name     | Description                                                          | Type      | Default |
| -------- | -------------------------------------------------------------------- | --------- | ------- |
| index    | Unique identifier                                                    | `string`  | —       |
| route    | React Router route location parameters                               | `string`  | —       |
| disabled | Whether disabled                                                      | `boolean` | false   |

### MenuItem Events

| Name    | Description                                                            | Type                                                            |
| ------- | ---------------------------------------------------------------------- | --------------------------------------------------------------- |
| onClick | Callback when menu item is clicked, the parameter is the menu item instance | <Enum type="Function">(item: MenuItemRegistered) => void</Enum> |

## MenuItemGroup API

### MenuItemGroup Properties

| Name  | Description       | Type     | Default |
| ----- | ----------------- | -------- | ------- |
| title | Group title       | `string` | —       |

## Type Declarations

<details open>
  <summary>Show Declarations</summary>

```ts
/**
 * @param index index of activated menu
 * @param indexPath index path of activated menu
 * @param item the selected menu item
 */
type MenuSelectEvent = (index: string, indexPath: string[], item: MenuItemClicked) => void;

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
    route?: string;
}
```

</details>