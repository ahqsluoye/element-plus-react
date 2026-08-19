---
title: Form 表单
lang: zh-CN
---

<Meta></Meta>

# Form 表单

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如`input`、`select`、`radio`、`checkbox`等。

在每一个 `form` 组件中，你需要一个 `formItem` 字段作为输入项的容器，用于获取值与验证值。

:::info{title=TIP}

通过 `useForm` 对表单数据域进行交互。

> 注意 `useForm` 是 [React Hooks](https://reactjs.org/docs/hooks-intro.html) 的实现，只能用于函数组件。如果是在 Class Component 下，你也可以通过 `ref` 获取数据域：

```typescript
const formRef = React.useRef < FormInstance > null;

<ElForm ref={formRef} />;

formRef.current?.setFieldsValue({ note: 'Hi, man!' });
```

:::

<code src="./basic-form.tsx"></code>

<!-- :::info{title=TIP}

[W3C](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2) 标准定义：

> <i>当一个表单中只有一个单行文本输入字段时， 浏览器应当将在此字段中按下 <kbd>Enter</kbd> （回车键）的行为视为提交表单的请求。</i>
> 如果希望阻止这一默认行为，可以在 `<el-form>` 标签上添加 `@submit.prevent`。

::: -->

## 行内表单

当垂直方向空间受限且表单较简单时，可以在一行内放置表单。

通过设置 `inline` 属性为 `true` 可以让表单域变为行内的表单域。

<code src="./inline-form.tsx"></code>

## 对齐方式

根据你们的设计情况，来选择最佳的标签对齐方式。

通过设置 `labelPosition` 属性可以改变表单域标签的位置，可选值为 `top`、`left`， 当设为 `top` 时标签会置于表单域的顶部

<code src="./alignment.tsx"></code>

## 表单校验

Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。

`Form` 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `formItem` 的 `name` 属性设置为需要验证的特殊键值即可。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

<code src="./validation.tsx"></code>

## 自定义校验规则

这个例子中展示了如何使用自定义验证规则来完成密码的二次验证。

本例还使用`statusIcon`属性为输入框添加了表示校验结果的反馈图标。

<code src="./custom-validation.tsx"></code>

:::info{title=TIP}

自定义的校验回调函数必须被调用。 更多高级用法可参考 [async-validator](https://github.com/yiminghe/async-validator)。

:::

## 添加/删除表单项

除了一次通过表单组件上的所有验证规则外. 您也可以动态地通过验证规则或删除单个表单字段的规则。

<code src="./form-items.tsx"></code>

## 字段监听 Hooks

`useWatch` 允许你监听字段变化，同时仅当该字段变化时重新渲染。

<code src="./use-watch.tsx"></code>

## 嵌套数据结构

此例中还演示了 `ElFormItem` 内有多个元素的使用方式，`<ElFormItem name="field" />` 只会对它的直接子元素绑定表单功能，
例如直接包裹了 ElInput/ElSelect。如果控件前后还有一些文案或样式装点，或者一个表单项内有多个控件，你可以使用内嵌的 `ElFormItem` 完成。
你可以给 `ElFormItem` 自定义 `style` 进行内联布局，或者添加 `noStyle` 作为纯粹的无样式绑定组件

<code src="./name-path.tsx"></code>

## 复杂一点的控件

嵌套表单字段需要对 field 进行拓展，将 field.name 应用于控制字段。

<code src="./complex-form.tsx"></code>

<!-- ## 数字类型验证

数字类型的验证需要在 `vModel` 处加上 `.number` 的修饰符，这是 Vue 自身提供的用于将绑定值转化为 number 类型的修饰符。

<code src="./usewatch.tsx"></code> -->

:::info{title=TIP}

当一个 `ElFormItem` 嵌套在另一个 `ElFormItem`时，使用 `noStyle` 可以忽略样式。

:::

## 尺寸控制

表单中的所有子组件都继承了该表单的 `size` 属性。 同样，form-item 也有一个 `size` 属性。

如果希望某个表单项或某个表单组件的尺寸不同于 Form 上的 `size` 属性，直接为这个表单项或表单组件设置自己的 size 属性即可。

<code src="./size-control.tsx"></code>

## Form API

### Form 属性

| 属性名                  | 说明                                                                                   | 类型                                                                                                                                           | 默认值 |
| ----------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| form                    | 经 `useForm()` 创建的 form 控制实例                                                    | <Enum type='object'>FormInstance</Enum>                                                                                                        | —      |
| children                | 子组件，支持渲染函数                                                                   | `RenderProps \| ComponentChildren`                                                                                                             | —      |
| component               | 自定义渲染组件                                                                         | `false \| string \| FC \| ComponentClass`                                                                                                      | —      |
| fields                  | 字段数据数组                                                                           | <Enum type='object'>FieldData[]</Enum>                                                                                                         | —      |
| rules                   | 表单验证规则                                                                           | <Enum type='object'>FormRules</Enum>                                                                                                           | —      |
| name                    | 表单名称                                                                               | `string`                                                                                                                                       | —      |
| validateMessages        | 验证提示模板，说明[见下](#validatemessages)                                            | [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) | -      |
| validateTrigger         | 验证触发器                                                                             | `string \| string[] \| false`                                                                                                                  | —      |
| preserve                | 是否保留字段值                                                                         | `boolean`                                                                                                                                      | —      |
| initialValues           | 表单默认值，只有初始化以及重置时生效                                                   | `object`                                                                                                                                       | -      |
| inline                  | 行内表单模式                                                                           | `boolean`                                                                                                                                      | false  |
| labelPosition           | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `labelWidth` 属性       | <Enum>'left' \| 'right' \| 'top'</Enum>                                                                                                        | right  |
| labelWidth              | 标签的长度，例如 `50`。 作为 Form 直接子元素的 formItem 会继承该值。 可以使用 `auto`。 | `string` / `number`                                                                                                                            | —      |
| colon                   | 配置 FormItem 的 `colon` 的默认值。表示是否显示 label 后面的冒号                       | boolean                                                                                                                                        | false  |
| hideRequiredAsterisk    | 是否隐藏必填字段标签旁边的红色星号。                                                   | `boolean`                                                                                                                                      | false  |
| requireAsteriskPosition | 星号的位置。                                                                           | <Enum>'left' \| 'right'</Enum>                                                                                                                 | left   |
| showMessage             | 是否显示校验错误信息                                                                   | `boolean`                                                                                                                                      | true   |
| statusIcon              | 是否在输入框中显示校验结果反馈图标                                                     | `boolean`                                                                                                                                      | false  |
| size                    | 用于控制该表单内组件的尺寸                                                             | <Enum>'large' \| 'default' \| 'small'</Enum>                                                                                                   | —      |
| disabled                | 是否禁用该表单内的所有组件。 如果设置为 `true`, 它将覆盖内部组件的 `disabled` 属性     | `boolean`                                                                                                                                      | false  |
| scrollToError           | 当校验失败时，滚动到第一个错误表单项                                                   | `boolean`                                                                                                                                      | false  |
| formStyle               | 表单自定义内联样式                                                                     | `CSSProperties`                                                                                                                                | —      |
| className               | 组件自定义类名                                                                         | `string`                                                                                                                                       | —      |

<!-- | flat                    | 是否宽度 100%                                                                          | `boolean`                                                                                                                                      | —      | -->
<!-- | onChange                | 表单变化时的回调                                                                       | <Enum type='Function'>(model) => void</Enum>                                                                                                   | —      | -->

### Form 事件

| 事件名         | 说明                             | 类型                                                                                      |
| -------------- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| onValuesChange | 字段值更新时触发回调事件         | <Enum type='Function'>(changedValues: any, values: Values) => void</Enum>                 |
| onFieldsChange | 字段更新时触发回调事件           | <Enum type='Function'>(changedFields: FieldData[], allFields: FieldData[]) => void</Enum> |
| onFinish       | 提交表单且数据验证成功后回调事件 | <Enum type='Function'>(values: Values) => void</Enum>                                     |
| onFinishFailed | 提交表单且数据验证失败后回调事件 | <Enum type='Function'>(errorInfo: { values, errorFields, outOfDate }) => void</Enum>      |

### validateMessages

Form 为验证提供了[默认的错误提示信息](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134)，你可以通过配置 `validateMessages` 属性，修改对应的提示模板。一种常见的使用方式，是配置国际化提示信息：

```typescript
const validateMessages = {
    required: "'${name}' 是必选字段",
    // ...
};

<ElForm validateMessages={validateMessages} />;
```

<!-- 此外，[ConfigProvider](/components/config-provider-cn) 也提供了全局化配置方案，允许统一配置错误提示模板：

```typescript
const validateMessages = {
    required: "'${name}' 是必选字段",
    // ...
};

<ConfigProvider form={{ validateMessages }}>
    <ElForm />
</ConfigProvider>;
``` -->

### FormInstance

| 名称               | 说明                                                                                                                | 类型                                                                                                |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| getFieldError      | 获取对应字段名的错误信息                                                                                            | <Enum type="Function">(name: NamePath) => string[] </Enum>                                          |
| getFieldWarning    | 获取对应字段名的警告信息                                                                                            | <Enum type="Function">(name: NamePath) => string[] </Enum>                                          |
| getFieldsError     | 获取一组字段名对应的错误信息，返回为数组形式                                                                        | <Enum type="Function">(nameList?: NamePath\[]) => FieldError[] </Enum>                              |
| getFieldsValue     | 获取一组字段名对应的值，会按照对应结构返回。默认返回现存字段值，当调用 `getFieldsValue(true)` 时返回所有值          | <Enum type="Function"></Enum>                                                                       |
| getFieldValue      | 获取对应字段名的值                                                                                                  | <Enum type="Function">(name: NamePath) => any </Enum>                                               |
| isFieldsTouched    | 检查一组字段是否被用户操作过，`allTouched` 为 `true` 时检查是否所有字段都被操作过                                   | <Enum type="Function">(nameList?: NamePath[], allTouched?: boolean) => boolean </Enum>              |
| isFieldTouched     | 检查对应字段是否被用户操作过                                                                                        | <Enum type="Function">(name: NamePath) => boolean </Enum>                                           |
| isFieldValidating  | 检查对应字段是否正在校验                                                                                            | <Enum type="Function">(name: NamePath) => boolean </Enum>                                           |
| isFieldsValidating | 检查一组字段是否正在校验                                                                                            | <Enum type="Function">(nameList: NamePath[]) => boolean </Enum>                                     |
| resetFields        | 重置一组字段到 `initialValues`                                                                                      | <Enum type="Function">(fields?: NamePath[]) => void </Enum>                                         |
| scrollToField      | 滚动到对应字段位置                                                                                                  | <Enum type="Function">(name: NamePath, options: ScrollOptions \| { focus: boolean }) => void</Enum> |
| setFields          | 设置一组字段状态                                                                                                    | <Enum type="Function">(fields: FieldData[]) => void </Enum>                                         |
| setFieldValue      | 设置表单的值（该值将直接传入 form store 中）                                                                        | <Enum type="Function">(name: NamePath, value: any) => void </Enum>                                  |
| setFieldsValue     | 设置表单的值（该值将直接传入 form store 中）。如果你只想修改 FormItemList 中单项值，请通过 `setFieldValue` 进行指定 | <Enum type="Function">(values) => void </Enum>                                                      |
| submit             | 提交表单，与点击 `submit` 按钮效果相同                                                                              | <Enum type="Function">() => void </Enum>                                                            |
| validateFields     | 触发表单验证                                                                                                        | <Enum type="Function">(nameList?: NamePath[]) => Promise </Enum>                                    |

<!-- 以下方法在当前类型定义中未找到 -->
<!-- | getFieldInstance  | 获取对应字段实例                                                                                                      | <Enum type="Function">(name: NamePath) => any </Enum>                                               | -->

## FormItem API

### FormItem 属性

| 名称              | 说明                                                                                                                          | 类型                                                                                                    | 默认值  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ------- |
| name              | 字段名，它可以是一个路径数组(例如 `['a', 'b', 0]`)。                                                                          | `NamePath`                                                                                              | —       |
| label             | 标签文本，支持字符串或 React 元素                                                                                             | `boolean \| string \| ReactElement`                                                                     | —       |
| labelWidth        | 标签宽度，例如 `'50px'`。 可以使用 `auto`。                                                                                   | `string` / `number`                                                                                     | —       |
| labelPosition     | 表单域标签的位置， 当设置为 `left` 或 `right` 时，则也需要设置 `labelWidth` 属性                                              | <Enum>'left' \| 'right' \| 'top'</Enum>                                                                 | right   |
| labelStyle        | 标签自定义内联样式                                                                                                            | `CSSProperties`                                                                                         | —       |
| colon             | 配合 label 属性使用，表示是否显示 label 后面的冒号                                                                            | `boolean`                                                                                               | —       |
| required          | 是否为必填项，如不设置，则会根据校验规则确认                                                                                  | `boolean`                                                                                               | false   |
| rules             | 表单验证规则, 具体配置见[下表](#formitemrule), 更多内容可以参考[async-validator](https://github.com/yiminghe/async-validator) | <Enum type='object'>Rule \| Rule[]</Enum>                                                               | —       |
| showMessage       | 是否显示校验错误信息                                                                                                          | `boolean`                                                                                               | true    |
| size              | 用于控制该表单域下组件的默认尺寸                                                                                              | <Enum>'large' \| 'default' \| 'small'</Enum>                                                            | default |
| noStyle           | 为 `true` 时不带样式，作为纯字段控件使用                                                                                      | `boolean`                                                                                               | false   |
| pure              | 是否标签宽度为 0，等用于`labelWidth={0}`，如果同时设置了 labelWidth，则此配置无效                                             | `boolean`                                                                                               | false   |
| help              | 配置提示信息，支持字符串或 React 元素                                                                                         | `string \| ReactElement`                                                                                | -       |
| errorStyle        | 校验失败文本自定义内联样式                                                                                                    | `CSSProperties`                                                                                         | —       |
| warningStyle      | 校验警告自定义内联样式                                                                                                        | `CSSProperties`                                                                                         | —       |
| dependencies      | 设置依赖字段，当依赖字段更新且当前字段被触摸时，会触发校验规则和重新渲染                                                      | `NamePath[]`                                                                                            | —       |
| getValueFromEvent | 从事件中获取值的函数                                                                                                          | <Enum type='Function'>(...args: EventArgs) => StoreValue</Enum>                                         | —       |
| normalize         | 值格式化函数                                                                                                                  | <Enum type='Function'>(value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue</Enum> | —       |
| shouldUpdate      | 是否更新字段，支持布尔值或函数                                                                                                | `boolean \| ((prevValues: Values, nextValues: Values, info: { source?: string }) => boolean)`           | —       |
| trigger           | 触发校验的事件名称                                                                                                            | `string`                                                                                                | —       |
| validateTrigger   | 校验触发器                                                                                                                    | `string \| string[] \| false`                                                                           | —       |
| validateFirst     | 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验                                                  | `boolean \| 'parallel'`                                                                                 | —       |
| valuePropName     | 表单控件的值属性名                                                                                                            | `string`                                                                                                | —       |
| getValueProps     | 获取表单控件的属性函数                                                                                                        | <Enum type='Function'>(value: StoreValue) => Record<string, unknown></Enum>                             | —       |
| messageVariables  | 消息变量，用于自定义验证信息中的变量值                                                                                        | `Record<string, string>`                                                                                | —       |
| initialValue      | 字段初始值                                                                                                                    | `any`                                                                                                   | —       |
| onReset           | 字段重置时的回调函数                                                                                                          | <Enum type='Function'>() => void</Enum>                                                                 | —       |
| onMetaChange      | 字段元信息变化时的回调函数                                                                                                    | <Enum type='Function'>(meta: Meta & { destroy?: boolean }) => void</Enum>                               | —       |
| preserve          | 当字段被删除时保留字段值                                                                                                      | `boolean`                                                                                               | —       |
| validateState     | formitem 校验的状态                                                                                                           | <Enum>'' \| 'error' \| 'validating' \| 'success'</Enum>                                                 | —       |

<!-- 以下属性在当前类型定义中未找到 -->
<!-- | error          | 表单域验证错误时的提示信息。设置该值会导致表单验证状态变为 error，并显示该错误信息。                                                                | `string`                                                  | —       | -->
<!-- | validateStatus | formitem 校验的状态                                                                                                                                 | <Enum>'' \| 'error' \| 'validating' \| 'success'</Enum>   | —       | -->

被设置了 `name` 属性的 `ElFormItem` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 ElForm 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 ElForm 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldsValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。

### messageVariables

你可以通过 `messageVariables` 修改 ElFormItem 的默认验证信息。

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

为字段提供数组化管理。

| 参数         | 说明                                                                                                                                 | 类型                                                                                                                  | 默认值 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------ |
| children     | 渲染函数                                                                                                                             | <Enum type="Function">(fields: Field[], operation: { add, remove, move }, meta: { errors }) => React.ReactNode</Enum> | -      |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准                                                                  | `any[]`                                                                                                               | -      |
| name         | 字段名，支持数组。List 本身也是字段，因而 `getFieldsValue()` 默认会返回 List 下所有值，你可以通过[参数](#getfieldsvalue)改变这一行为 | `NamePath`                                                                                                            | -      |
| rules        | 校验规则，仅支持自定义规则。需要配合 [ErrorList](#formerrorlist) 一同使用。                                                          | `{ validator, message }[]`                                                                                            | -      |

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

注意：ElFormList 下的字段不应该配置 `initialValue`，你始终应该通过 ElFormList 的 `initialValue` 或者 ElForm 的 `initialValues` 来配置。

## operation

ElFormList 渲染表单相关操作函数。

| 参数   | 说明       | 类型                                                                            | 默认值        |
| ------ | ---------- | ------------------------------------------------------------------------------- | ------------- |
| add    | 新增表单项 | <Enum type="Function">(defaultValue?: any, insertIndex?: number) => void</Enum> | `insertIndex` |
| move   | 移动表单项 | <Enum type="Function">(from: number, to: number) => void</Enum>                 | -             |
| remove | 删除表单项 | <Enum type="Function">(index: number \| number[]) => void </Enum>               | `number[]`    |

## Hooks

### useForm

`type useForm = (): [FormInstance]`

创建 ElForm 实例，用于管理所有数据状态。

### useWatch

`type useWatch = (namePath: NamePath) => any, formInstance?: FormInstance | WatchOptions): Value`

用于直接获取 form 中字段对应的值。

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
