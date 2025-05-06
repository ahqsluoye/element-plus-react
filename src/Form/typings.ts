import React, { ComponentClass, FC, RefObject } from 'react';
import type { Options as ScrollOptions } from 'scroll-into-view-if-needed';
import { BaseProps, ComponentChildren, NativeProps, TypeAttributes } from '../types/common';
import { InternalFieldProps } from './FormItem';

type BaseFormProps = Omit<React.AllHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'form' | 'size' | 'children'>;

type RenderProps = (values: Store, form: FormInstance) => React.ReactElement;

// <HTMLFormElement>

export type FormRules = Record<string, Rule[] | Record<string, Rule[]>>;

export interface FormProps<Values = Store> extends BaseFormProps {
    /** 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建 */
    form?: FormInstance<Values>;

    children?: RenderProps | ComponentChildren;

    component?: false | string | FC<any> | ComponentClass<any, any>;

    fields?: FieldData[];
    /** 表单验证规则 */
    rules?: FormRules;

    name?: string;

    /** 验证提示模板 */
    validateMessages?: ValidateMessages;
    onValuesChange?: Callbacks<Values>['onValuesChange'];
    onFieldsChange?: Callbacks<Values>['onFieldsChange'];
    onFinish?: Callbacks<Values>['onFinish'];
    onFinishFailed?: Callbacks<Values>['onFinishFailed'];
    validateTrigger?: string | string[] | false;
    preserve?: boolean;

    /** 配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 */
    colon?: boolean;
    /** 表单默认值，只有初始化以及重置时生效 */
    initialValues?: Values;
    /** 表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width */
    labelPosition?: 'left' | 'right' | 'top';
    /** 表单域标签的宽度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 支持 auto。 */
    labelWidth?: string | number;
    /** 行内表单模式 */
    inline?: boolean;
    /** 是否宽度100% */
    flat?: boolean;
    /** 是否只读 */
    disabled?: boolean;
    /** 用于控制该表单内组件的尺寸 */
    size?: TypeAttributes.Size;
    /** 是否隐藏必填字段标签旁边的红色星号。 */
    hideRequiredAsterisk?: boolean;
    /** 星号的位置。 */
    requireAsteriskPosition?: 'left' | 'right';
    /** 是否显示校验错误信息 */
    showMessage?: boolean;
    /** 当校验失败时，滚动到第一个错误表单项 */
    scrollToError?: boolean;

    onChange?: (model) => void;
    formStyle?: React.CSSProperties;
    className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface FormItemProps<T> extends BaseProps, NativeProps {
    /**
     * 配合 label 属性使用，表示是否显示 label 后面的冒号
     */
    colon?: boolean;
    /** label 标签的文本 */
    label?: boolean | string | React.ReactElement;
    /** 用于控制该表单内组件的尺寸 */
    size?: TypeAttributes.Size;
    /** 标签的长度，例如 '50px'。 作为 Form 直接子元素的 form-item 会继承该值。 可以使用 auto。 */
    labelWidth?: string | number;
    /** 表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width */
    labelPosition?: 'left' | 'right' | 'top';
    /** 必填样式设置。如不设置，则会根据校验规则自动生成 */
    required?: boolean;
    /** 为 true 时不带样式，作为纯字段控件使用 */
    noStyle?: boolean;
    /** 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating' */
    validateStatus?: 'success' | 'warning' | 'error' | 'validating';
    /** 配置提示信息 */
    help?: string | React.ReactElement;
    /** 是否标签宽度为0，等用于`labelWidth={0}`，如果同时设置了labelWidth，则此配置无效 */
    pure?: boolean;
    /** 是否居中 */
    center?: boolean;
    /** 是否显示校验错误信息 */
    showMessage?: boolean;
    /** 文本自定义内联样式 */
    labelStyle?: React.CSSProperties;
    /** 校验失败文本自定义内联样式 */
    errorStyle?: React.CSSProperties;
    /** 校验警告自定义内联样式 */
    warningStyle?: React.CSSProperties;
}

export interface FieldEntity {
    onStoreChange: (store: Store, namePathList: InternalNamePath[] | null, info: ValuedNotifyInfo) => void;
    isFieldTouched: () => boolean;
    isFieldDirty: () => boolean;
    isFieldValidating: () => boolean;
    isListField: () => boolean;
    isList: () => boolean;
    isPreserve: () => boolean;
    validateRules: (options?: ValidateOptions) => Promise<RuleError[]>;
    getMeta: () => Meta;
    getNamePath: () => InternalNamePath;
    getErrors: () => string[];
    getWarnings: () => string[];
    containerRef?: RefObject<HTMLDivElement>;
    props: {
        label?: string | boolean | React.ReactElement<any>;
        name?: NamePath;
        rules?: Rule[];
        dependencies?: NamePath[];
        initialValue?: any;
    } & InternalFieldProps;
}

interface UpdateAction {
    type: 'updateValue';
    namePath: InternalNamePath;
    value: StoreValue;
}

interface ValidateAction {
    type: 'validateField';
    namePath: InternalNamePath;
    triggerName: string;
}

export type ReducerAction = UpdateAction | ValidateAction;

export type InternalNamePath = (string | number)[];
export type NamePath = string | number | InternalNamePath;

export type StoreValue = any;
export type Store = Record<string, StoreValue>;

export interface Meta {
    touched: boolean;
    validating: boolean;
    errors: string[];
    warnings: string[];
    name: InternalNamePath;
}

export interface InternalFieldData extends Meta {
    value: StoreValue;
}

/**
 * Used by `setFields` config
 */
export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
    name: NamePath;
}

export type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email';

type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => Promise<void | any> | void;

export type RuleRender = (form: FormInstance) => RuleObject;

export interface ValidatorRule {
    warningOnly?: boolean;
    message?: string | React.ReactElement;
    validator: Validator;
}

interface BaseRule {
    label?: boolean | string;
    warningOnly?: boolean;
    enum?: StoreValue[];
    len?: number;
    max?: number;
    message?: string | React.ReactElement;
    min?: number;
    pattern?: RegExp;
    required?: boolean;
    transform?: (value: StoreValue) => StoreValue;
    type?: RuleType;
    whitespace?: boolean;

    /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
    validateTrigger?: string | string[];
    phone?: boolean;
}

type AggregationRule = BaseRule & Partial<ValidatorRule>;

interface ArrayRule extends Omit<AggregationRule, 'type'> {
    type: 'array';
    defaultField?: RuleObject;
}

export type RuleObject = AggregationRule | ArrayRule;

export type Rule = RuleObject | RuleRender;

export interface ValidateErrorEntity<Values = any> {
    values: Values;
    errorFields: { name: InternalNamePath; errors: string[] }[];
    outOfDate: boolean;
}

export interface FormItem {
    onStoreChange: (store: Store, namePathList: InternalNamePath[] | null, info: ValuedNotifyInfo) => void;
    isFieldTouched: () => boolean;
    isFieldDirty: () => boolean;
    isFieldValidating: () => boolean;
    isListField: () => boolean;
    isList: () => boolean;
    isPreserve: () => boolean;
    validateRules: (options?: ValidateOptions) => Promise<RuleError[]>;
    getMeta: () => Meta;
    getNamePath: () => InternalNamePath;
    getErrors: () => string[];
    getWarnings: () => string[];
    props: {
        name?: NamePath;
        rules?: Rule[];
        dependencies?: NamePath[];
        initialValue?: any;
    };
}

export interface FieldError {
    name: InternalNamePath;
    errors: string[];
    warnings: string[];
}

export interface RuleError {
    errors: string[];
    rule: RuleObject;
}

export interface ValidateOptions {
    label?: string | boolean | React.ReactElement<{}>;
    triggerName?: string;
    validateMessages?: ValidateMessages;

    /**
     * Recursive validate. It will validate all the name path that contains the provided one.
     * e.g. ['a'] will validate ['a'] , ['a', 'b'] and ['a', 1].
     */
    recursive?: boolean;
}

export type InternalValidateFields<Values = any> = (nameList?: NamePath[], options?: ValidateOptions) => Promise<Values>;
export type ValidateFields<Values = any> = (nameList?: NamePath[]) => Promise<Values>;

// >>>>>> Info
interface ValueUpdateInfo {
    type: 'valueUpdate';
    source: 'internal' | 'external';
}

interface ValidateFinishInfo {
    type: 'validateFinish';
}

interface ResetInfo {
    type: 'reset';
}

interface RemoveInfo {
    type: 'remove';
}

interface SetFieldInfo {
    type: 'setField';
    data: FieldData;
}

interface DependenciesUpdateInfo {
    type: 'dependenciesUpdate';

    /**
     * Contains all the related `InternalNamePath[]`.
     * a <- b <- c : change `a`
     * relatedFields=[a, b, c]
     */
    relatedFields: InternalNamePath[];
}

export type NotifyInfo = ValueUpdateInfo | ValidateFinishInfo | ResetInfo | RemoveInfo | SetFieldInfo | DependenciesUpdateInfo;

export type ValuedNotifyInfo = NotifyInfo & {
    store: Store;
};

export interface Callbacks<Values = any> {
    onValuesChange?: (changedValues: any, values: Values) => void;
    onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
    onFinish?: (values: Values) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity<Values>) => void;
}

export type WatchCallBack = (values: Store, namePathList: InternalNamePath[]) => void;

export interface InternalHooks {
    dispatch: (action: ReducerAction) => void;
    initEntityValue: (entity: FormItem) => void;
    registerField: (entity: FormItem) => () => void;
    useSubscribe: (subscribable: boolean) => void;
    setInitialValues: (values: Store, init: boolean) => void;
    destroyForm: () => void;
    setCallbacks: (callbacks: Callbacks) => void;
    registerWatch: (callback: WatchCallBack) => () => void;
    getFields: (namePathList?: InternalNamePath[]) => FieldData[];
    setValidateMessages: (validateMessages: ValidateMessages) => void;
    setPreserve: (preserve?: boolean) => void;
    getInitialValue: (namePath: InternalNamePath) => StoreValue;
}

/** Only return partial when type is not any */
type RecursivePartial<T> = T extends object
    ? {
          [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] : T[P] extends object ? RecursivePartial<T[P]> : T[P];
      }
    : any;

export interface FormInstance<Values = any> {
    // Origin Form API
    getFieldValue: (name: NamePath) => StoreValue;
    getFieldsValue: (() => Values) & ((nameList: NamePath[] | true, filterFunc?: (meta: Meta) => boolean) => any);
    getFieldError: (name: NamePath) => string[];
    getFieldsError: (nameList?: NamePath[]) => FieldError[];
    getFieldWarning: (name: NamePath) => string[];
    isFieldsTouched: ((nameList?: NamePath[], allFieldsTouched?: boolean) => boolean) & ((allFieldsTouched?: boolean) => boolean);
    isFieldTouched: (name: NamePath) => boolean;
    isFieldValidating: (name: NamePath) => boolean;
    isFieldsValidating: (nameList: NamePath[]) => boolean;
    resetFields: (fields?: NamePath[]) => void;
    setFields: (fields: FieldData[]) => void;
    setFieldValue: (name: NamePath, value: any) => void;
    setFieldsValue: (values: RecursivePartial<Values>) => void;
    validateFields: ValidateFields<Values>;
    scrollToField: (name: NamePath, options?: ScrollOptions) => void;

    // New API
    submit: () => void;
}

export type InternalFormInstance = Omit<FormInstance, 'validateFields'> & {
    validateFields: InternalValidateFields;

    /**
     * Passed by field context props
     */
    prefixName?: InternalNamePath;

    validateTrigger?: string | string[] | false;

    /**
     * Form component should register some content into store.
     * We pass the `HOOK_MARK` as key to avoid user call the function.
     */
    getInternalHooks: (secret: string) => InternalHooks | null;
    /** @private Internal usage. Do not use it in your production */
    _init?: boolean;
    /** 配置 Form.Item 的 colon 的默认值。表示是否显示 label 后面的冒号 */
    colon?: boolean;
    /** 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性 */
    disabled?: boolean;
    /** 表单域标签的位置， 如果值为 left 或者 right 时，则需要设置 label-width */
    labelPosition?: 'left' | 'right' | 'top';
    /** 标签宽度，例如 '50px'。 可以使用 auto。 */
    labelWidth?: string | number;
    /** 用于控制该表单域下组件的默认尺寸 */
    size?: TypeAttributes.Size;
    /** 表单验证规则 */
    rules?: FormRules;
    /** 是否隐藏必填字段标签旁边的红色星号。 */
    hideRequiredAsterisk?: boolean;
    /** 星号的位置。 */
    requireAsteriskPosition?: 'left' | 'right';
    /** 是否显示校验错误信息 */
    showMessage?: boolean;
    /** 当校验失败时，滚动到第一个错误表单项 */
    scrollToError?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventArgs = any[];

type ValidateMessage = string | (() => string);
export interface ValidateMessages {
    default?: ValidateMessage;
    required?: ValidateMessage;
    enum?: ValidateMessage;
    whitespace?: ValidateMessage;
    date?: {
        format?: ValidateMessage;
        parse?: ValidateMessage;
        invalid?: ValidateMessage;
    };
    types?: {
        string?: ValidateMessage;
        method?: ValidateMessage;
        array?: ValidateMessage;
        object?: ValidateMessage;
        number?: ValidateMessage;
        date?: ValidateMessage;
        boolean?: ValidateMessage;
        integer?: ValidateMessage;
        float?: ValidateMessage;
        regexp?: ValidateMessage;
        email?: ValidateMessage;
        url?: ValidateMessage;
        hex?: ValidateMessage;
    };
    string?: {
        len?: ValidateMessage;
        min?: ValidateMessage;
        max?: ValidateMessage;
        range?: ValidateMessage;
    };
    number?: {
        len?: ValidateMessage;
        min?: ValidateMessage;
        max?: ValidateMessage;
        range?: ValidateMessage;
    };
    array?: {
        len?: ValidateMessage;
        min?: ValidateMessage;
        max?: ValidateMessage;
        range?: ValidateMessage;
    };
    pattern?: {
        mismatch?: ValidateMessage;
    };
}
