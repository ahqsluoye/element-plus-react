---
title: ConfigProvider
lang: en-US
---

<Meta></Meta>

# ConfigProvider

Config Provider is used for providing global configurations, which enables your entire application to access these configurations everywhere.

## i18n Configurations

Configure i18n related properties via Config Provider to get language switching feature.

Use two attributes to provide i18n related config.

<code src="./usage.tsx"></code>

## Button Configurations

<code src="./button.tsx"></code>

## Link Configurations

<code src="./link.tsx"></code>

## Card Configurations

<code src="./card.tsx"></code>

<!-- ## Dialog Configurations

<code src="./dialog.tsx"></code> -->

## Message Configurations

<code src="./message.tsx"></code>

## Date Picker Configurations

<code src="./date-picker.tsx"></code>

<!-- ## Empty Values Configurations

<details open>
  <summary>Supported components</summary>

-   Cascader
-   DatePicker
-   Select
-   SelectV2
-   TimePicker
-   TimeSelect
-   TreeSelect

</details>

Set `empty-values` to configure the default empty values of components. The default value is `['', null, undefined]`. If you think the empty string is not an empty value, you can set it to `[undefined, null]`.

Set `value-on-clear` to set the value of the clear option. The default value of the component is `undefined`. In the date component it is `null`. If you want to set it to `undefined`, use `() => undefined`.

<code src="./empty-values.tsx"></code>

## Experimental Features

In this section, you can learn how to use Config Provider to provide experimental features. For now, we haven't added any experimental features, but in the future, we will add some experimental features. You can use this config to manage these features. -->

## API

### Config Provider Properties

| Name        | Description                                                              | Type                                                                                                                       | Default                   |
| ----------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| locale      | Translation text object                                                  | <Enum>'en' \| 'zh-cn'</Enum>                                                                                               | en                        |
| size        | Global component size                                                    | <Enum type="enum">'large' \| 'default' \| 'small'</Enum>                                                                   | default                   |
| button      | Button related configuration, [see the following table](#button-properties) | <Enum type="object">{autoInsertSpace?: boolean; type?: TypeAttributes.Appearance; plain?: boolean; round?: boolean}</Enum> | See the following table   |
| link        | Link related configuration, [see the following table](#link-properties)   | <Enum type="object">{type?: TypeAttributes.Appearance; underline?: 'always' \| 'hover' \| 'never'}</Enum>                  | See the following table   |
| card        | Card related configuration, [see the following table](#card-properties)   | <Enum type="object">{shadow?: 'always' \| 'never' \| 'hover'}</Enum>                                                       | See the following table   |
| message     | Message related configuration, [see the following table](#message-properties) | <Enum type="object">{showClose?: boolean; duration?: number; grouping?: boolean; offset?: number}</Enum>                   | See the following table   |
| inputNumber | InputNumber related configuration                                       | <Enum type="object">{controlsPosition?: '' \| 'right'; max?: number; min?: number}</Enum>                                  | See the following table   |
| popper      | Popper related configuration                                             | <Enum type="object">{appendTo?: HTMLElement}</Enum>                                                                        | See the following table   |

<!-- | experimental-features | Features at experimental stage to be added, all features are default to be set to false | `object` | — |
| zIndex                | Global Initial zIndex                                                                 | `number` | — |
| namespace             | Global component className prefix (needs to be used with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | `string` | el |
| empty-values          | Empty values of input components                                                      | `array`  | — |
| value-on-clear        | Clear value of input components                                                       | `string` / `number` / `boolean` / `Function` | — | -->

### Button Properties

| Name            | Description                                                                                                                    | Type      | Default |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------- | ------- |
| autoInsertSpace | Automatically insert a space between two Chinese characters (only when the text length is 2 and all characters are Chinese)     | `boolean` | false   |

### Link Properties

| Name      | Description | Type                                                                                | Default |
| --------- | ----------- | ----------------------------------------------------------------------------------- | ------- |
| type      | Type        | <Enum>'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'</Enum> | default |
| underline | Whether to show underline | <Enum>'always' \| 'hover' \| 'never'</Enum>                                        | hover   |

### Card Properties

| Name   | Description               | Type                                  | Default |
| ------ | ------------------------- | ------------------------------------- | ------- |
| shadow | Set when to show card shadows | <Enum>always \| never \| hover</Enum> | always  |

### Message Properties

| Name      | Description                                                  | Type      | Default |
| --------- | ------------------------------------------------------------ | --------- | ------- |
| grouping  | Merge messages with the same content                         | `boolean` | —       |
| duration  | Display duration, in milliseconds. Set to 0 to not close automatically | `number`  | —       |
| showClose | Whether to show a close button                               | `boolean` | —       |
| offset    | Set the distance to the top of the viewport                  | `number`  | —       |