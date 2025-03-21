import classNames from 'classnames';
import head from 'lodash/head';
import React, { Children, cloneElement, createRef, isValidElement, memo, useContext } from 'react';
import { Icon } from '../Icon';
import Tooltip from '../Tooltip/Tooltip';
import { Transition } from '../Transition';
import { isNotEmpty, warning } from '../Util';
import { ComponentChildren } from '../types/common';
import FieldContext, { HOOK_MARK } from './FieldContext';
import { FormItemContext } from './FormItemContext';
import type {
    EventArgs,
    FieldEntity,
    FormInstance,
    FormItemProps,
    InternalFormInstance,
    InternalNamePath,
    Meta,
    NamePath,
    NotifyInfo,
    Rule,
    RuleError,
    RuleObject,
    Store,
    StoreValue,
    ValidateOptions,
} from './typings';
import { b, e, m } from './utils/classUtil';
import { toArray } from './utils/typeUtil';
import { validateRules } from './utils/validateUtil';
import { containsNamePath, defaultGetValueFromEvent, getNamePath, getValue } from './utils/valueUtil';

const EMPTY_ERRORS: any[] = [];

export type ShouldUpdate<Values = any> = boolean | ((prevValues: Values, nextValues: Values, info: { source?: string }) => boolean);

function requireUpdate(shouldUpdate: ShouldUpdate, prev: StoreValue, next: StoreValue, prevValue: StoreValue, nextValue: StoreValue, info: NotifyInfo): boolean {
    if (typeof shouldUpdate === 'function') {
        return shouldUpdate(prev, next, 'source' in info ? { source: info.source } : {});
    }
    return prevValue !== nextValue;
}

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
interface ChildProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [name: string]: any;
}

export interface InternalFieldProps<Values = any> extends Omit<FormItemProps<Values>, 'children'> {
    children?: ComponentChildren | ((control: ChildProps, meta: Meta, form: FormInstance<Values>) => React.ReactElement);

    /**
     * Set up `dependencies` field.
     * When dependencies field update and current field is touched,
     * will trigger validate rules and render.
     */
    dependencies?: NamePath[];
    getValueFromEvent?: (...args: EventArgs) => StoreValue;

    /** 字段名，支持数组 */
    name?: InternalNamePath;
    normalize?: (value: StoreValue, prevValue: StoreValue, allValues: Store) => StoreValue;

    /** 校验规则，设置字段的校验逻辑。点击此处查看示例 */
    rules?: Rule[];
    shouldUpdate?: ShouldUpdate<Values>;
    trigger?: string;
    validateTrigger?: string | string[] | false;

    /** 当某一规则校验不通过时，是否停止剩下的规则的校验。设置 parallel 时会并行校验 */
    validateFirst?: boolean | 'parallel';
    valuePropName?: string;
    getValueProps?: (value: StoreValue) => Record<string, unknown>;
    messageVariables?: Record<string, string>;
    initialValue?: any;
    onReset?: () => void;
    onMetaChange?: (meta: Meta & { destroy?: boolean }) => void;
    preserve?: boolean;

    /** @private Passed by Form.List props. Do not use since it will break by path check. */
    isListField?: boolean;

    /** @private Passed by Form.List props. Do not use since it will break by path check. */
    isList?: boolean;

    /** @private Pass context as prop instead of context api
     *  since class component can not get context in constructor */
    fieldContext?: InternalFormInstance;
}

export interface FieldProps<Values = any> extends Omit<InternalFieldProps<Values>, 'name' | 'fieldContext'> {
    name?: NamePath;
}

export interface FieldState {
    resetCount: number;
}

// We use Class instead of Hooks here since it will cost much code by using Hooks.
class Field extends React.Component<InternalFieldProps, FieldState> implements FieldEntity {
    public static contextType = FieldContext;

    public static defaultProps = {
        trigger: 'onChange',
        valuePropName: 'value',
    };

    public state = {
        resetCount: 0,
    };

    private cancelRegisterFunc: (isListField?: boolean, preserve?: boolean, namePath?: InternalNamePath) => void | null = null;

    private mounted = false;

    /**
     * Follow state should not management in State since it will async update by
     * This makes first render of form can not get correct state value.
     */
    private touched = false;

    /**
     * Mark when touched & validated. Currently only used for `dependencies`.
     * Note that we do not think field with `initialValue` is dirty
     * but this will be by `isFieldDirty` func.
     */
    private dirty = false;

    private validatePromise: Promise<string[]> | null = null;

    private prevValidating: boolean;

    private errors: string[] = EMPTY_ERRORS;
    private warnings: string[] = EMPTY_ERRORS;
    warningRef: React.RefObject<any | null>;
    errorRef: React.RefObject<any | null>;

    // ============================== Subscriptions ==============================
    constructor(props: InternalFieldProps) {
        super(props);

        // Register on init
        if (props.fieldContext) {
            const { getInternalHooks }: InternalFormInstance = props.fieldContext;
            const { initEntityValue } = getInternalHooks(HOOK_MARK);
            initEntityValue(this);
        }

        this.warningRef = createRef();
        this.errorRef = createRef();
    }

    public componentDidMount() {
        const { shouldUpdate, fieldContext } = this.props;

        this.mounted = true;

        // Register on init
        if (fieldContext) {
            const { getInternalHooks }: InternalFormInstance = fieldContext;
            const { registerField } = getInternalHooks(HOOK_MARK);
            this.cancelRegisterFunc = registerField(this);
        }

        // One more render for component in case fields not ready
        if (shouldUpdate === true) {
            this.reRender();
        }
    }

    public componentWillUnmount() {
        this.cancelRegister();
        this.triggerMetaEvent(true);
        this.mounted = false;
    }

    public cancelRegister = () => {
        const { preserve, isListField, name } = this.props;

        if (this.cancelRegisterFunc) {
            this.cancelRegisterFunc(isListField, preserve, getNamePath(name));
        }
        this.cancelRegisterFunc = null;
    };

    // ================================== Utils ==================================
    public getNamePath = (): InternalNamePath => {
        const { name, fieldContext } = this.props;
        const { prefixName = [] }: InternalFormInstance = fieldContext;

        return name !== undefined ? [...prefixName, ...name] : [];
    };

    public getRules = (): RuleObject[] => {
        const { rules = [], fieldContext } = this.props;

        return rules.map((rule: Rule): RuleObject => {
            if (typeof rule === 'function') {
                return rule(fieldContext);
            }
            return rule;
        });
    };

    public reRender() {
        if (!this.mounted) {
            return;
        }
        this.forceUpdate();
    }

    public refresh = () => {
        if (!this.mounted) {
            return;
        }

        /**
         * Clean up current node.
         */
        this.setState(({ resetCount }) => ({
            resetCount: resetCount + 1,
        }));
    };

    public triggerMetaEvent = (destroy?: boolean) => {
        const { onMetaChange } = this.props;

        onMetaChange?.({ ...this.getMeta(), destroy });
    };

    // ========================= Field Entity Interfaces =========================
    // Trigger by store update. Check if need update the component
    public onStoreChange: FieldEntity['onStoreChange'] = (prevStore, namePathList, info) => {
        const { shouldUpdate, dependencies = [], onReset } = this.props;
        const { store } = info;
        const namePath = this.getNamePath();
        const prevValue = this.getValue(prevStore);
        const curValue = this.getValue(store);

        const namePathMatch = namePathList && containsNamePath(namePathList, namePath);

        // `setFieldsValue` is a quick access to update related status
        if (info.type === 'valueUpdate' && info.source === 'external' && prevValue !== curValue) {
            this.touched = true;
            this.dirty = true;
            this.validatePromise = null;
            this.errors = EMPTY_ERRORS;
            this.warnings = EMPTY_ERRORS;
            this.triggerMetaEvent();
        }

        switch (info.type) {
            case 'reset':
                if (!namePathList || namePathMatch) {
                    // Clean up state
                    this.touched = false;
                    this.dirty = false;
                    this.validatePromise = null;
                    this.errors = EMPTY_ERRORS;
                    this.warnings = EMPTY_ERRORS;
                    this.triggerMetaEvent();

                    onReset?.();

                    this.refresh();
                    return;
                }
                break;

            /**
             * In case field with `preserve = false` nest deps like:
             * - A = 1 => show B
             * - B = 1 => show C
             * - Reset A, need clean B, C
             */
            case 'remove': {
                if (shouldUpdate) {
                    this.reRender();
                    return;
                }
                break;
            }

            case 'setField': {
                if (namePathMatch) {
                    const { data } = info;

                    if ('touched' in data) {
                        this.touched = data.touched;
                    }
                    if ('validating' in data && !('originRCField' in data)) {
                        this.validatePromise = data.validating ? Promise.resolve([]) : null;
                    }
                    if ('errors' in data) {
                        this.errors = data.errors || EMPTY_ERRORS;
                    }
                    if ('warnings' in data) {
                        this.warnings = data.warnings || EMPTY_ERRORS;
                    }
                    this.dirty = true;

                    this.triggerMetaEvent();

                    this.reRender();
                    return;
                }

                // Handle update by `setField` with `shouldUpdate`
                if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
                    this.reRender();
                    return;
                }
                break;
            }

            case 'dependenciesUpdate': {
                //
                /**
                 * Trigger when marked `dependencies` updated. Related fields will all update
                 */
                const dependencyList = dependencies.map(getNamePath);
                // No need for `namePathMath` check and `shouldUpdate` check, since `valueUpdate` will be
                // emitted earlier and they will work there
                // If set it may cause unnecessary twice rerendering
                if (dependencyList.some(dependency => containsNamePath(info.relatedFields, dependency))) {
                    this.reRender();
                    return;
                }
                break;
            }

            default:
                // 1. If `namePath` exists in `namePathList`, means it's related value and should update
                //      For example <List name="list"><Field name={['list', 0]}/>
                //      If `namePathList` is [['list']] (List value update), Field should be updated
                //      If `namePathList` is [['list', 0]] (Field value update), List shouldn't be updated
                // 2.
                //   2.1 If `dependencies` is set, `name` is not set and `shouldUpdate` is not set,
                //       don't use `shouldUpdate`. `dependencies` is view as a shortcut if `shouldUpdate`
                //       is not provided
                //   2.2 If `shouldUpdate` provided, use customize logic to update the field
                //       else to check if value changed
                if (namePathMatch || ((!dependencies.length || namePath.length || shouldUpdate) && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info))) {
                    this.reRender();
                    return;
                }
                break;
        }

        if (shouldUpdate === true) {
            this.reRender();
        }
    };

    public validateRules = (options?: ValidateOptions): Promise<RuleError[]> => {
        // We should fixed namePath & value to avoid developer change then by form function
        const namePath = this.getNamePath();
        const currentValue = this.getValue();

        // Force change to async to avoid rule OOD under renderProps field
        const rootPromise = Promise.resolve().then(() => {
            if (!this.mounted) {
                return [];
            }

            const { validateFirst = false, messageVariables } = this.props;
            const { triggerName } = (options || {}) as ValidateOptions;

            let filteredRules = this.getRules();
            if (triggerName) {
                filteredRules = filteredRules
                    .filter(rule => rule)
                    .filter((rule: RuleObject) => {
                        const { validateTrigger } = rule;
                        if (!validateTrigger) {
                            return true;
                        }
                        const triggerList = toArray(validateTrigger);
                        return triggerList.includes(triggerName);
                    });
            }

            const promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);

            promise
                .catch(e => e)
                .then((ruleErrors: RuleError[] = EMPTY_ERRORS) => {
                    if (this.validatePromise === rootPromise) {
                        this.validatePromise = null;

                        // Get errors & warnings
                        const nextErrors: string[] = [];
                        const nextWarnings: string[] = [];
                        ruleErrors.forEach?.(({ rule: { warningOnly }, errors = EMPTY_ERRORS }) => {
                            if (warningOnly) {
                                nextWarnings.push(...errors);
                            } else {
                                nextErrors.push(...errors);
                            }
                        });

                        this.errors = nextErrors;
                        this.warnings = nextWarnings;
                        this.triggerMetaEvent();

                        this.reRender();
                    }
                });

            return promise;
        });

        this.validatePromise = rootPromise;
        this.dirty = true;
        this.errors = EMPTY_ERRORS;
        this.warnings = EMPTY_ERRORS;
        this.triggerMetaEvent();

        // Force trigger re-render since we need sync renderProps with new meta
        this.reRender();

        return rootPromise;
    };

    public isFieldValidating = () => !!this.validatePromise;

    public isFieldTouched = () => this.touched;

    public isFieldDirty = () => {
        // Touched or validate or has initialValue
        if (this.dirty || this.props.initialValue !== undefined) {
            return true;
        }

        // Form set initialValue
        const { fieldContext } = this.props;
        const { getInitialValue } = fieldContext.getInternalHooks(HOOK_MARK);
        if (getInitialValue(this.getNamePath()) !== undefined) {
            return true;
        }

        return false;
    };

    public getErrors = () => this.errors;

    public getWarnings = () => this.warnings;

    public isListField = () => this.props.isListField;

    public isList = () => this.props.isList;

    public isPreserve = () => this.props.preserve;

    // ============================= Child Component =============================
    public getMeta = (): Meta => {
        // Make error & validating in cache to save perf
        this.prevValidating = this.isFieldValidating();

        const meta: Meta = {
            touched: this.isFieldTouched(),
            validating: this.prevValidating,
            errors: this.errors,
            warnings: this.warnings,
            name: this.getNamePath(),
        };

        return meta;
    };

    // Only return validate child node. If invalidate, will do nothing about field.
    public getOnlyChild = (
        children: ComponentChildren | ((control: ChildProps, meta: Meta, context: FormInstance) => React.ReactElement),
    ): { child: React.ReactElement | null; isFunction: boolean } => {
        // Support render props
        if (typeof children === 'function') {
            const meta = this.getMeta();

            return {
                ...this.getOnlyChild(children(this.getControlled(), meta, this.props.fieldContext)),
                isFunction: true,
            };
        }

        // Filed element only
        const childList = Children.toArray(children);
        if (childList.length !== 1 || !isValidElement(childList[0])) {
            // @ts-ignore
            return { child: childList, isFunction: false };
        }

        // @ts-ignore
        return { child: childList[0], isFunction: false };
    };

    // ============================== Field Control ==============================
    public getValue = (store?: Store) => {
        const { getFieldsValue }: FormInstance = this.props.fieldContext;
        const namePath = this.getNamePath();
        return getValue(store || getFieldsValue(true), namePath);
    };

    public getControlled = (childProps: ChildProps = {}) => {
        const { trigger, validateTrigger, getValueFromEvent, normalize, valuePropName, getValueProps, fieldContext } = this.props;

        const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : fieldContext.validateTrigger;

        const namePath = this.getNamePath();
        const { getInternalHooks, getFieldsValue }: InternalFormInstance = fieldContext;
        const { dispatch } = getInternalHooks(HOOK_MARK);
        const value = this.getValue();
        const mergedGetValueProps = getValueProps || ((val: StoreValue) => ({ [valuePropName]: val }));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const originTriggerFunc: any = childProps[trigger];

        const control = {
            ...childProps,
            ...mergedGetValueProps(value),
            error: this.errors.length > 0,
            warning: this.warnings.length > 0,
            onClear: this.onClear,
        };

        // Add trigger
        control[trigger] = (...args: EventArgs) => {
            // Mark as touched
            this.touched = true;
            this.dirty = true;

            this.triggerMetaEvent();

            let newValue: StoreValue;
            if (getValueFromEvent) {
                newValue = getValueFromEvent(...args);
            } else {
                newValue = defaultGetValueFromEvent(valuePropName, ...args);
            }

            if (normalize) {
                newValue = normalize(newValue, value, getFieldsValue(true));
            }

            dispatch({
                type: 'updateValue',
                namePath,
                value: newValue,
            });

            if (originTriggerFunc) {
                originTriggerFunc(...args);
            }
        };

        // Add validateTrigger
        const validateTriggerList: string[] = toArray(mergedValidateTrigger || []);

        validateTriggerList.forEach((triggerName: string) => {
            // Wrap additional function of component, so that we can get latest value from store
            const originTrigger = control[triggerName];
            control[triggerName] = (...args: EventArgs) => {
                if (originTrigger) {
                    originTrigger(...args);
                }

                // Always use latest rules
                const { rules } = this.props;
                if (rules && rules.length) {
                    // We dispatch validate to root,
                    // since it will update related data with other field with same name
                    dispatch({
                        type: 'validateField',
                        namePath,
                        triggerName,
                    });
                }
            };
        });

        return control;
    };

    public onClear = () => {
        this.touched = true;
        const { getInternalHooks }: InternalFormInstance = this.props.fieldContext;
        const { dispatch } = getInternalHooks(HOOK_MARK);
        dispatch({
            type: 'updateValue',
            namePath: this.getNamePath(),
            value: '',
        });
        // @ts-ignore
        this.props?.children?.props?.onClear?.();
    };

    public getLabelWidth = () => {
        const { pure, fieldContext, labelWidth } = this.props;
        const { labelWidth: labelWidthContext, labelPosition }: InternalFormInstance = fieldContext;
        if (labelPosition === 'top') {
            return 0;
        } else if (isNotEmpty(labelWidth)) {
            return labelWidth;
        } else if (pure === true) {
            return 0;
        } else {
            return labelWidthContext;
        }
    };

    public getValidateLable = () => {
        const { errorStyle, warningStyle } = this.props;
        return (
            <>
                <Transition nodeRef={this.errorRef} name={b('slide-up')} visible={this.errors.length > 0} transitionAppear unmountOnExit display="">
                    <label ref={this.errorRef} className={e`error`} style={errorStyle}>
                        {head(this.errors)}
                    </label>
                </Transition>
                <Transition nodeRef={this.warningRef} name={b('slide-up')} visible={this.warnings.length > 0} transitionAppear unmountOnExit display="">
                    <label ref={this.warningRef} className={e`warning`} style={warningStyle}>
                        {head(this.warnings)}
                    </label>
                </Transition>
            </>
        );
    };

    public render() {
        const { resetCount } = this.state;
        const { children, label, center, className, style, noStyle, fieldContext, labelStyle = {}, colon = false, size, help, pure } = this.props;
        const { size: sizeContext, labelPosition, colon: colonContext }: InternalFormInstance = fieldContext;
        const labelWidth = this.getLabelWidth();

        const { child, isFunction } = this.getOnlyChild(children);

        // 是否必输项
        const isRequired = this.props.required || this.getRules().some(item => item.required);

        // Not need to `cloneElement` since user can handle this in render function self
        let returnChildNode: React.ReactElement;
        if (isFunction) {
            returnChildNode = child;
        } else if (isValidElement(child)) {
            returnChildNode = cloneElement(child, this.getControlled(child.props));
        } else {
            // warning(!child, '当前包裹的组件不是合法的表单组件！');
            returnChildNode = child;
        }

        return noStyle ? (
            <FormItemContext.Provider key={resetCount} value={{ size }}>
                {returnChildNode}
                {this.getValidateLable()}
            </FormItemContext.Provider>
        ) : (
            <FormItemContext.Provider key={resetCount} value={{ size }}>
                <div className={classNames(b('form-item'), { 'is-required': isRequired, [m(sizeContext ?? size)]: sizeContext ?? size }, className)} style={style}>
                    {label && !pure && (
                        <label className={e`label`} style={['left', 'right'].includes(labelPosition) ? { width: labelWidth, ...labelStyle } : labelStyle}>
                            {typeof label === 'string' || typeof label === 'number' ? `${label}${colonContext ?? colon ? '：' : ''}` : label}
                            {help && (
                                <Tooltip className={e`label--help`} content={help} placement="top" enterable>
                                    <Icon name="circle-exclamation" prefix="fas" />
                                </Tooltip>
                            )}
                        </label>
                    )}
                    <div
                        className={classNames(e`content`, { 'is-center': center })}
                        // 没有文本或者表单布局不是top的时候需要添加marginLeft
                        style={!label ? { marginLeft: labelWidth } : {}}
                    >
                        <>
                            {Children.map(
                                returnChildNode,
                                (
                                    item: React.ReactElement<{
                                        onChange?: (val: string | number | string[] | boolean) => void;
                                    }>,
                                ) => {
                                    return item;
                                },
                            )}
                            {this.getValidateLable()}
                        </>
                    </div>
                </div>
            </FormItemContext.Provider>
        );
    }
}

function InternalFormItem<Values = any>({ name, rules = [], ...restProps }: FieldProps<Values>) {
    const fieldContext = useContext(FieldContext);

    const namePath = name !== undefined ? getNamePath(name) : undefined;

    let key = 'keep';
    if (!restProps.isListField) {
        key = `_${(namePath || []).join('_')}`;
    }

    // Warning if it's a directly list field.
    // We can still support multiple level field preserve.
    if (process.env.NODE_ENV !== 'production' && restProps.preserve === false && restProps.isListField && namePath.length <= 1) {
        warning(false, '`preserve` should not apply on Form.List fields.');
    }

    // @ts-ignore
    return <Field key={key} name={namePath} rules={[...(fieldContext.rules?.[name] ?? []), ...rules]} {...restProps} fieldContext={fieldContext} />;
}

type InternalFormItemType = typeof InternalFormItem;

interface FormItemInterface extends InternalFormItemType {
    displayName?: string;
    defaultProps?: Partial<FieldProps<any>>;
}

const FormItem = memo(InternalFormItem) as FormItemInterface;
FormItem.displayName = 'ElFormItem';

export default FormItem;
