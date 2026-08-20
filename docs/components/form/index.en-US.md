---
title: Form
lang: en-US
---

<Meta></Meta>

# Form

Form consists of `input`, `radio`, `select`, `checkbox` and so on. With form, you can collect, validate, and submit data.

## Basic Form

It includes all kinds of input items, such as `input`, `select`, `radio` and `checkbox`.

In each `form` component, you need a `formItem` field to be the container of your input item for getting and validating values.

:::info{title=TIP}

Use `useForm` to interact with the form data.

> Note that `useForm` is an implementation of [React Hooks](https://react.dev/reference/react), and can only be used in function components. If you are using a Class Component, you can also access the data via `ref`:

```typescript
const formRef = React.useRef < FormInstance > null;

<ElForm ref={formRef} />;

formRef.current?.setFieldsValue({ note: 'Hi, man!' });
```

:::

<code src="./basic-form.tsx"></code>

<!-- :::info{title=TIP}

The [W3C](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2) standard defines:

> <i>When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.</i>
> To prevent this default behavior, you can add `@submit.prevent` on `<el-form>`.

::: -->

## Inline Form

When the vertical space is limited and the form is relatively simple, you can put it in one line.

Set the `inline` attribute to `true` to make the form fields inline.

<code src="./inline-form.tsx"></code>

## Alignment

Depending on your design, choose the best label alignment.

Set the `labelPosition` attribute to change the position of form field labels. The available values are `top` and `left`. When set to `top`, labels will be placed at the top of the form field.

<code src="./alignment.tsx"></code>

## Validation

The Form component allows you to verify user input against rules to help find and correct errors.

The `Form` component provides form validation functionality. Just pass the validation rules via the `rules` attribute, and set the `name` attribute of `formItem` to the specific key that needs to be validated. For more advanced usage, refer to [async-validator](https://github.com/yiminghe/async-validator).

<code src="./validation.tsx"></code>

## Custom Validation Rules

This example shows how to customize your own validation rules to complete password re-verification.

This example also uses the `statusIcon` attribute to add a feedback icon indicating the validation result to the input.

<code src="./custom-validation.tsx"></code>

:::info{title=TIP}

The custom validation callback function must be called. For more advanced usage, refer to [async-validator](https://github.com/yiminghe/async-validator).

:::

## Add/Remove Form Items

In addition to passing all validation rules at once on the form component, you can also dynamically add or remove validation rules for individual form fields.

<code src="./form-items.tsx"></code>

## Field Listening Hooks

`useWatch` allows you to listen for field changes and re-render only when that field changes.

<code src="./use-watch.tsx"></code>

## Nested Data Structures

This example also demonstrates how to use multiple elements inside `ElFormItem`. `<ElFormItem name="field" />` only binds form functionality to its direct child elements,
such as directly wrapping ElInput/ElSelect. If there is additional text or styling before or after the control, or multiple controls inside a form item, you can use nested `ElFormItem` to accomplish this.
You can customize `style` on `ElFormItem` for inline layout, or add `noStyle` to use it as a pure unstyled binding component.

<code src="./name-path.tsx"></code>

## More Complex Controls

Nested form fields need to extend the field, applying `field.name` to the control field.

<code src="./complex-form.tsx"></code>

<!-- ## Number Validation

Number validation requires adding the `.number` modifier on the `vModel` in Vue, which is a modifier provided by Vue itself to convert the bound value to a number type.

<code src="./usewatch.tsx"></code> -->

:::info{title=TIP}

When an `ElFormItem` is nested inside another `ElFormItem`, using `noStyle` will ignore styles.

:::

## Size Control

All child components in a Form inherit the `size` attribute from that Form. Similarly, form-item also has a `size` attribute.

If you want a form item or a specific form component to have a different size from the `size` attribute on the Form, simply set its own size attribute on that form item or component.

<code src="./size-control.tsx"></code>

## Form API

### Form Properties

| Name                    | Description                                                                                   | Type                                                                                                                                           | Default |
| ----------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| form                    | form control instance created by `useForm()`                                                  | <Enum type='object'>FormInstance</Enum>                                                                                                        | —       |
| children                | child components, supports render functions                                                   | `RenderProps \| ComponentChildren`                                                                                                             | —       |
| component               | custom render component                                                                       | `false \| string \| FC \| ComponentClass`                                                                                                      | —       |
| fields                  | field data array                                                                              | <Enum type='object'>FieldData[]</Enum>                                                                                                         | —       |
| rules                   | validation rules of form                                                                      | <Enum type='object'>FormRules</Enum>                                                                                                           | —       |
| name                    | form name                                                                                     | `string`                                                                                                                                       | —       |
| validateMessages        | validation prompt template, see [below](#validatemessages) for details                         | [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) | -       |
| validateTrigger         | validation trigger                                                                            | `string \| string[] \| false`                                                                                                                  | —       |
| preserve                | whether to preserve field values                                                              | `boolean`                                                                                                                                      | —       |
| initialValues           | default values of form, only takes effect on initialization and reset                          | `object`                                                                                                                                       | -       |
| inline                  | whether the form is inline                                                                    | `boolean`                                                                                                                                      | false   |
| labelPosition           | position of form item label; when set to `left` or `right`, the `labelWidth` attribute is also required | <Enum>'left' \| 'right' \| 'top'</Enum>                                                                                                        | right   |
| labelWidth              | width of label, e.g. `50`. Form items that are direct children of Form inherit this value. `auto` is supported. | `string` / `number`                                                                                                                            | —       |
| colon                   | configure the default value of `colon` for FormItem. Indicates whether to display a colon after the label | boolean                                                                                                                                        | false   |
| hideRequiredAsterisk    | whether to hide the red asterisk next to required field labels                                | `boolean`                                                                                                                                      | false   |
| requireAsteriskPosition | position of the asterisk                                                                      | <Enum>'left' \| 'right'</Enum>                                                                                                                 | left    |
| showMessage             | whether to display validation error messages                                                  | `boolean`                                                                                                                                      | true    |
| statusIcon              | whether to display an icon indicating the validation result in the input                      | `boolean`                                                                                                                                      | false   |
| size                    | control the size of components in this form                                                  | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                                                   | —       |
| disabled                | whether to disable all components in this form. If set to `true`, it will override the `disabled` attribute of inner components | `boolean`                                                                                                                                      | false   |
| scrollToError           | scroll to the first error form item when validation fails                                     | `boolean`                                                                                                                                      | false   |
| formStyle               | custom inline style for the form                                                              | `CSSProperties`                                                                                                                                | —       |
| className               | custom class name for the component                                                          | `string`                                                                                                                                       | —       |

<!-- | flat                    | whether the width is 100%                                                                          | `boolean`                                                                                                                                      | —      | -->
<!-- | onChange                | callback when the form changes                                                                       | <Enum type='Function'>(model) => void</Enum>                                                                                                   | —      | -->

### Form Events

| Name           | Description                             | Type                                                                                      |
| -------------- | --------------------------------------- | ----------------------------------------------------------------------------------------- |
| onValuesChange | triggered when a field value is updated | <Enum type='Function'>(changedValues: any, values: Values) => void</Enum>                 |
| onFieldsChange | triggered when a field is updated       | <Enum type='Function'>(changedFields: FieldData[], allFields: FieldData[]) => void</Enum> |
| onFinish       | callback after form submission and successful data validation | <Enum type='Function'>(values: Values) => void</Enum>                                     |
| onFinishFailed | callback after form submission and failed data validation | <Enum type='Function'>(errorInfo: { values, errorFields, outOfDate }) => void</Enum>      |

### validateMessages

Form provides [default error messages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) for validation. You can modify the corresponding prompt templates by configuring the `validateMessages` attribute. A common usage is to configure internationalization prompt messages:

```typescript
const validateMessages = {
    required: "'${name}' is a required field",
    // ...
};

<ElForm validateMessages={validateMessages} />;
```

<!-- In addition, [ConfigProvider](/components/config-provider-cn) also provides a global configuration option that allows unified configuration of error prompt templates:

```typescript
const validateMessages = {
    required: "'${name}' is a required field",
    // ...
};

<ConfigProvider form={{ validateMessages }}>
    <ElForm />
</ConfigProvider>;
``` -->

### FormInstance

| Name               | Description                                                                                                                | Type                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| getFieldError      | get the error information of the corresponding field name                                                                  | <Enum type="Function">(name: NamePath) => string[] </Enum>                                          |
| getFieldWarning    | get the warning information of the corresponding field name                                                                | <Enum type="Function">(name: NamePath) => string[] </Enum>                                          |
| getFieldsError     | get the error information of a group of field names, returned as an array                                                  | <Enum type="Function">(nameList?: NamePath\[]) => FieldError[] </Enum>                              |
| getFieldsValue     | get the values of a group of field names, returned according to the corresponding structure. Returns existing field values by default; returns all values when calling `getFieldsValue(true)` | <Enum type="Function"></Enum>                                                                       |
| getFieldValue      | get the value of the corresponding field name                                                                              | <Enum type="Function">(name: NamePath) => any </Enum>                                               |
| isFieldsTouched    | check whether a group of fields have been touched by the user; when `allTouched` is `true`, checks whether all fields have been touched | <Enum type="Function">(nameList?: NamePath[], allTouched?: boolean) => boolean </Enum>              |
| isFieldTouched     | check whether the corresponding field has been touched by the user                                                         | <Enum type="Function">(name: NamePath) => boolean </Enum>                                           |
| isFieldValidating  | check whether the corresponding field is being validated                                                                   | <Enum type="Function">(name: NamePath) => boolean </Enum>                                           |
| isFieldsValidating | check whether a group of fields are being validated                                                                        | <Enum type="Function">(nameList: NamePath[]) => boolean </Enum>                                     |
| resetFields        | reset a group of fields to `initialValues`                                                                                | <Enum type="Function">(fields?: NamePath[]) => void </Enum>                                         |
| scrollToField      | scroll to the corresponding field position                                                                                | <Enum type="Function">(name: NamePath, options: ScrollOptions \| { focus: boolean }) => void</Enum> |
| setFields          | set the state of a group of fields                                                                                        | <Enum type="Function">(fields: FieldData[]) => void </Enum>                                         |
| setFieldValue      | set the value of the form (this value will be passed directly into the form store)                                           | <Enum type="Function">(name: NamePath, value: any) => void </Enum>                                  |
| setFieldsValue     | set the value of the form (this value will be passed directly into the form store). If you only want to modify a single item in FormItemList, use `setFieldValue` to specify it | <Enum type="Function">(values) => void </Enum>                                                      |
| submit             | submit the form, same effect as clicking the `submit` button                                                              | <Enum type="Function">() => void </Enum>                                                            |
| validateFields     | trigger form validation                                                                                                    | <Enum type="Function">(nameList?: NamePath[]) => Promise </Enum>                                    |

<!-- The following methods were not found in the current type definitions -->
<!-- | getFieldInstance  | get the corresponding field instance                                                                                                      | <Enum type="Function">(name: NamePath) => any </Enum>                                               | -->

## FormItem API

### FormItem Properties

| Name              | Description                                                                                                                          | Type                                                                                                    | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------- |
| name              | field name, it can be a path array (e.g. `['a', 'b', 0]`)                                                                            | `NamePath`                                                                                              | —       |
| label             | label text, supports string or React element                                                                                         | `boolean \| string \| ReactElement`                                                                     | —       |
| labelWidth        | label width, e.g. `'50px'`. `auto` is supported.                                                                                     | `string` / `number`                                                                                     | —       |
| labelPosition     | position of form item label; when set to `left` or `right`, the `labelWidth` attribute is also required                              | <Enum>'left' \| 'right' \| 'top'</Enum>                                                                 | right   |
| labelStyle        | custom inline style for label                                                                                                        | `CSSProperties`                                                                                         | —       |
| colon             | used with the `label` attribute, indicates whether to display a colon after the label                                                | `boolean`                                                                                               | —       |
| required          | whether it is a required field; if not set, it will be determined by validation rules                                                  | `boolean`                                                                                               | false   |
| rules             | validation rules of form, see [table below](#formitemrule) for specific configuration; for more content, refer to [async-validator](https://github.com/yiminghe/async-validator) | <Enum type='object'>Rule \| Rule[]</Enum>                                                               | —       |
| showMessage       | whether to display validation error messages                                                                                          | `boolean`                                                                                               | true    |
| size              | used to control the default size of components under this form item                                                                   | <Enum>'large' \| 'default' \| 'small'</Enum>                                                            | default |
| noStyle           | when `true`, no styles are applied and it is used as a pure field control                                                           | `boolean`                                                                                               | false   |
| pure              | whether the label width is 0, equivalent to `labelWidth={0}`; if both `labelWidth` and this are set, this configuration is invalid    | `boolean`                                                                                               | false   |
| help              | configure the prompt message, supports string or React element                                                                       | `string \| ReactElement`                                                                                | -       |
| errorStyle        | custom inline style for validation failure text                                                                                      | `CSSProperties`                                                                                         | —       |
| warningStyle      | custom inline style for validation warning                                                                                            | `CSSProperties`                                                                                         | —       |
| dependencies      | set dependent fields; when the dependent field is updated and the current field is touched, validation rules and re-rendering will be triggered | `NamePath[]`                                                                                            | —       |
| getValueFromEvent | function to get values from events                                                                                                   | <Enum type='Function'>(...args: EventArgs) => StoreValue</Enum>                                         | —       |
| normalize         | value formatting function                                                                                                            | <Enum type='Function'>(value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue</Enum> | —       |
| shouldUpdate      | whether to update the field, supports boolean or function                                                                            | `boolean \| ((prevValues: Values, nextValues: Values, info: { source?: string }) => boolean)`           | —       |
| trigger           | name of the event that triggers validation                                                                                           | `string`                                                                                                | —       |
| validateTrigger   | validation trigger                                                                                                                   | `string \| string[] \| false`                                                                           | —       |
| validateFirst     | whether to stop validation of the remaining rules when a rule fails validation; set to `parallel` for parallel validation            | `boolean \| 'parallel'`                                                                                 | —       |
| valuePropName     | value property name of the form control                                                                                              | `string`                                                                                                | —       |
| getValueProps     | function to get the props of the form control                                                                                        | <Enum type='Function'>(value: StoreValue) => Record<string, unknown></Enum>                             | —       |
| messageVariables  | message variables, used to customize variable values in validation information                                                        | `Record<string, string>`                                                                                | —       |
| initialValue      | initial value of the field                                                                                                           | `any`                                                                                                   | —       |
| onReset           | callback function when the field is reset                                                                                           | <Enum type='Function'>() => void</Enum>                                                                 | —       |
| onMetaChange      | callback function when field meta information changes                                                                                | <Enum type='Function'>(meta: Meta & { destroy?: boolean }) => void</Enum>                               | —       |
| preserve          | preserve the field value when the field is deleted                                                                                  | `boolean`                                                                                               | —       |
| validateState     | validation state of formItem                                                                                                         | <Enum>'' \| 'error' \| 'validating' \| 'success'</Enum>                                                 | —       |

<!-- The following properties were not found in the current type definitions -->
<!-- | error          | prompt message when form field validation fails. Setting this value will cause the form validation status to become error and display this error message.                                                                | `string`                                                  | —       | -->
<!-- | validateStatus | validation state of formItem                                                                                                                          | <Enum>'' \| 'error' \| 'validating' \| 'success'</Enum>   | —       | -->

Controls wrapped by `ElFormItem` with the `name` attribute set will automatically add `value` (or other attributes specified by `valuePropName`) and `onChange` (or other attributes specified by `trigger`). Data synchronization will be taken over by ElForm, which results in:

1. You **no longer need and should not** use `onChange` for data collection and synchronization (you can use `onValuesChange` of ElForm), but you can still listen to `onChange` events.
2. You cannot use attributes like `value` or `defaultValue` of the control to set the value of a form field. Default values can be set using `initialValues` in Form. Note that `initialValues` cannot be dynamically updated by `setState`; you need to use `setFieldsValue` to update it.
3. You should not use `setState`; you can use `form.setFieldsValue` to dynamically change form values.

### messageVariables

You can modify the default validation information of ElFormItem through `messageVariables`.

```typescript
<ElForm>
    <ElFormItem messageVariables={{ another: 'good' }} label="user" rules={[{ required: true, message: '${another} is required' }]}>
        <ElInput />
    </ElFormItem>
    <ElFormItem messageVariables={{ label: 'good' }} label={<span>user</span>} rules={[{ required: true, message: '${label} is required' }]}>
        <ElInput />
    </ElFormItem>
</ElForm>
```

## ElFormList

Provides array-based management for fields.

| Name         | Description                                                                                                                           | Type                                                                                                                  | Default |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------- |
| children     | render function                                                                                                                       | <Enum type="Function">(fields: Field[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode</Enum> | -       |
| initialValue | set default values for child elements; if it conflicts with Form's `initialValues`, Form's value takes precedence                      | `any[]`                                                                                                               | -       |
| name         | field name, supports arrays. List itself is also a field, so `getFieldsValue()` will return all values under List by default; you can change this behavior via [parameter](#getfieldsvalue) | `NamePath`                                                                                                            | -       |
| rules        | validation rules, only supports custom rules. Need to be used together with [ErrorList](#formerrorlist).                              | `{ validator, message }[]`                                                                                            | -       |

```typescript
<ElFormList>
    {fields =>
        fields.map(field => (
            <ElFormItem {...field}>
                <Input />
            </ElFormItem>
        ))
    }
</ElFormList>
```

Note: Fields under ElFormList should not have `initialValue` configured. You should always configure via ElFormList's `initialValue` or ElForm's `initialValues`.

## operation

ElFormList renders form-related operation functions.

| Name   | Description       | Type                                                                            | Default       |
| ------ | ----------------- | ------------------------------------------------------------------------------- | ------------- |
| add    | add a form item   | <Enum type="Function">(defaultValue?: any, insertIndex?: number) => void</Enum> | `insertIndex` |
| move   | move a form item  | <Enum type="Function">(from: number, to: number) => void</Enum>                 | -             |
| remove | remove a form item | <Enum type="Function">(index: number \| number[]) => void </Enum>               | `number[]`    |

## Hooks

### useForm

`type useForm = (): [FormInstance]`

Creates an ElForm instance for managing all data states.

### useWatch

`type useWatch = (namePath: NamePath) => any, formInstance?: FormInstance | WatchOptions): Value`

Used to directly get the value of the corresponding field in the form.

```typescript
const Demo = () => {
    const [form] = useForm();
    const userName = useWatch('username', form);

    const { data: options } = useSWR(`/api/user/${userName}`, fetcher);

    return (
        <ElForm form={form}>
            <ElFormItem name="username">
                <AutoComplete options={options} />
            </ElFormItem>
        </ElForm>
    );
};
```