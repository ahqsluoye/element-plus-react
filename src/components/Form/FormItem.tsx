import { useMount, useUnmount } from 'ahooks';
import classNames from 'classnames';
import head from 'lodash/head';
import React, { Children, cloneElement, isValidElement, memo, useCallback, useContext, useMemo, useRef, useState } from 'react';
import Icon from '../Icon/Icon';
import Tooltip from '../Tooltip/Tooltip';
import Transition from '../Transition/Transition';
import { addUnit, isNotEmpty, mergeDefaultProps, warning } from '../Util';
import useClassNames from '../hooks/useClassNames';
import { useForceUpdate } from '../hooks/useForceUpdate';
import { ComponentChildren } from '../types/common';
import FormContext from './FormContext';
import { FormItemContext } from './FormItemContext';
import FormLabelWrap from './FormLabelWrap';
import FieldContext, { HOOK_MARK } from './InternalFormContext';
import type {
    ChildProps,
    EventArgs,
    FieldEntity,
    FormInstance,
    FormItemValidateState,
    InternalFormItemProps,
    InternalNamePath,
    Meta,
    NamePath,
    NotifyInfo,
    Rule,
    RuleError,
    RuleObject,
    ShouldUpdate,
    Store,
    StoreValue,
    ValidateOptions,
} from './typings';
import get from './utils/get';
import { toArray } from './utils/typeUtil';
import { validateRules } from './utils/validateUtil';
import { containsNamePath, defaultGetValueFromEvent, getNamePath as getNameArray, getValue as getValueFromName } from './utils/valueUtil';

const EMPTY_ERRORS: any[] = [];

function requireUpdate(shouldUpdate: ShouldUpdate, prev: StoreValue, next: StoreValue, prevValue: StoreValue, nextValue: StoreValue, info: NotifyInfo): boolean {
    if (typeof shouldUpdate === 'function') {
        return shouldUpdate(prev, next, 'source' in info ? { source: info.source } : {});
    }
    return prevValue !== nextValue;
}

export interface FieldProps<Values = any> extends Omit<InternalFormItemProps<Values>, 'name' | 'fieldContext'> {
    name?: NamePath;
}

export interface FieldState {
    resetCount: number;
}

function Field(props: FieldProps) {
    props = mergeDefaultProps(
        {
            dependencies: [],
            rules: [],
            validateFirst: false,
            colon: false,
            trigger: 'onChange',
            valuePropName: 'value',
            labelStyle: {},
        },
        props,
    );
    const {
        shouldUpdate,
        dependencies,
        onReset,
        onMetaChange,
        preserve,
        isListField,
        isList,
        validateFirst,
        messageVariables,
        trigger,
        validateTrigger,
        getValueFromEvent,
        normalize,
        valuePropName,
        getValueProps,
        children,
        label,
        className,
        style,
        noStyle,
        labelStyle,
        colon,
        size,
        help,
        pure,
        validateState,
        errorStyle,
        warningStyle,
    } = props;

    const fieldContext = useContext(FieldContext);

    const name = useMemo(() => (props.name !== undefined ? getNameArray(props.name) : undefined), [props.name]);

    const { b, e, m, is } = useClassNames('form-item');

    let key = 'keep';
    if (!isListField) {
        key = `_${(name || []).join('_')}`;
    }

    if (process.env.NODE_ENV !== 'production' && preserve === false && isListField && name.length <= 1) {
        warning(false, '`preserve` should not apply on ElFormList fields.');
    }

    const formRules = useMemo(() => (name?.length > 0 ? get(fieldContext?.rules ?? {}, name) : undefined), [name, fieldContext?.rules]);
    const rules = useMemo(() => [...(formRules || []), ...(props.rules || [])], [formRules, props.rules]);

    const [resetCount, setResetCount] = useState(0);
    const [computedWidth, setComputedWidth] = useState(0);
    const oldWidthRef = useRef(0);

    const mountedRef = useRef(false);
    /**
     * Follow state should not management in State since it will async update by
     * This makes first render of form can not get correct state value.
     */
    const touchedRef = useRef(false);
    /**
     * Mark when touched & validated. Currently only used for `dependencies`.
     * Note that we do not think field with `initialValue` is dirty
     * but this will be by `isFieldDirty` func.
     */
    const dirtyRef = useRef(false);
    const validatePromiseRef = useRef<Promise<string[]> | null>(null);
    const errorsRef = useRef<string[]>(EMPTY_ERRORS);
    const warningsRef = useRef<string[]>(EMPTY_ERRORS);
    const cancelRegisterFuncRef = useRef<((isListField?: boolean, preserve?: boolean, namePath?: InternalNamePath) => void) | null>(null);

    const warningRef = useRef<any>(null);
    const errorRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { forceUpdate } = useForceUpdate();
    const reRender = useCallback(() => {
        if (!mountedRef.current) {
            return;
        }
        forceUpdate();
    }, [forceUpdate]);

    const getNamePath = useCallback((): InternalNamePath => {
        const { prefixName = [] } = fieldContext;
        return name !== undefined ? [...prefixName, ...name] : [];
    }, [fieldContext, name]);

    const getRules = useCallback((): RuleObject[] => {
        return rules.map((rule: Rule): RuleObject => {
            if (typeof rule === 'function') {
                return rule(fieldContext);
            }
            return rule;
        });
    }, [rules, fieldContext]);

    const refresh = useCallback(() => {
        if (!mountedRef.current) {
            return;
        }
        setResetCount(prev => prev + 1);
    }, []);

    const triggerMetaEvent = useCallback(
        (destroy?: boolean) => {
            onMetaChange?.({ ...this.getMeta(), destroy });
        },
        [onMetaChange],
    );

    const cancelRegister = useCallback(() => {
        if (cancelRegisterFuncRef.current) {
            cancelRegisterFuncRef.current(isListField, preserve, getNameArray(name));
        }
        cancelRegisterFuncRef.current = null;
    }, [isListField, preserve, name]);

    const getValue = useCallback(
        (store?: Store) => {
            const { getFieldsValue }: FormInstance = fieldContext;
            return getValueFromName(store || getFieldsValue(true), getNamePath());
        },
        [fieldContext, getNamePath],
    );

    const isFieldValidating = useCallback(() => !!validatePromiseRef.current, []);
    const isFieldTouched = useCallback(() => touchedRef.current, []);

    const isFieldDirty = useCallback(() => {
        if (dirtyRef.current || props.initialValue !== undefined) {
            return true;
        }
        const { getInitialValue } = fieldContext.getInternalHooks(HOOK_MARK);
        if (getInitialValue(getNamePath()) !== undefined) {
            return true;
        }
        return false;
    }, [fieldContext, getNamePath, props.initialValue]);

    const getErrors = useCallback(() => errorsRef.current, []);
    const getWarnings = useCallback(() => warningsRef.current, []);

    const getMeta = useCallback(
        (): Meta => ({
            touched: touchedRef.current,
            validating: isFieldValidating(),
            errors: errorsRef.current,
            warnings: warningsRef.current,
            name: getNamePath(),
        }),
        [isFieldValidating, getNamePath],
    );

    const onClear = useCallback(() => {
        touchedRef.current = true;
        const { dispatch } = fieldContext.getInternalHooks(HOOK_MARK);
        dispatch({ type: 'updateValue', namePath: getNamePath(), value: '' });
        // @ts-ignore
        children?.props?.onClear?.();
    }, [fieldContext, getNamePath, children]);

    const getControlled = useCallback(
        (childProps: ChildProps = {}) => {
            const mergedValidateTrigger = validateTrigger !== undefined ? validateTrigger : fieldContext.validateTrigger;
            const namePath = getNamePath();
            const { dispatch } = fieldContext.getInternalHooks(HOOK_MARK);
            const value = getValue();
            const mergedGetValueProps = getValueProps || ((val: StoreValue) => ({ [valuePropName]: val }));

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const originTriggerFunc: any = childProps[trigger];

            const control = {
                ...childProps,
                ...mergedGetValueProps(value),
                error: errorsRef.current.length > 0,
                warning: warningsRef.current.length > 0,
                onClear,
            };

            control[trigger] = (...args: EventArgs) => {
                touchedRef.current = true;
                dirtyRef.current = true;
                triggerMetaEvent();

                let newValue: StoreValue;
                if (getValueFromEvent) {
                    newValue = getValueFromEvent(...args);
                } else {
                    newValue = defaultGetValueFromEvent(valuePropName, ...args);
                }

                if (normalize) {
                    newValue = normalize(newValue, value, fieldContext.getFieldsValue(true));
                }

                dispatch({ type: 'updateValue', namePath, value: newValue });

                if (originTriggerFunc) {
                    originTriggerFunc(...args);
                }
            };

            const validateTriggerList: string[] = toArray(mergedValidateTrigger || []);
            validateTriggerList.forEach((triggerName: string) => {
                const originTrigger = control[triggerName];
                control[triggerName] = (...args: EventArgs) => {
                    if (originTrigger) {
                        originTrigger(...args);
                    }
                    // We dispatch validate to root,
                    // since it will update related data with other field with same name
                    if (rules && rules.length) {
                        dispatch({ type: 'validateField', namePath, triggerName });
                    }
                };
            });

            return control;
        },
        [validateTrigger, fieldContext, getNamePath, getValue, getValueProps, valuePropName, trigger, onClear, triggerMetaEvent, getValueFromEvent, normalize, rules],
    );

    const getOnlyChild = useCallback(
        (
            childs: ComponentChildren | ((control: ChildProps, meta: Meta, context: FormInstance) => React.ReactElement),
        ): { child: React.ReactElement | null; isFunction: boolean } => {
            if (typeof childs === 'function') {
                const meta = getMeta();
                return { ...getOnlyChild(childs(getControlled(), meta, fieldContext)), isFunction: true };
            }

            const childList = Children.toArray(childs);
            if (childList.length !== 1 || !isValidElement(childList[0])) {
                // @ts-ignore
                return { child: childList, isFunction: false };
            }

            // @ts-ignore
            return { child: childList[0], isFunction: false };
        },
        [getMeta, getControlled, fieldContext],
    );

    const validateRulesFunc = useCallback(
        (options?: ValidateOptions): Promise<RuleError[]> => {
            // We should fixed namePath & value to avoid developer change then by form function
            const namePath = getNamePath();
            const currentValue = getValue();

            // Force change to async to avoid rule OOD under renderProps field
            const rootPromise = Promise.resolve().then(() => {
                if (!mountedRef.current) {
                    return [];
                }

                const { triggerName } = (options || {}) as ValidateOptions;

                let filteredRules = getRules();
                if (triggerName) {
                    filteredRules = filteredRules
                        .filter(rule => rule)
                        .filter((rule: RuleObject) => {
                            const { validateTrigger: ruleValidateTrigger } = rule;
                            if (!ruleValidateTrigger) {
                                return true;
                            }
                            const triggerList = toArray(ruleValidateTrigger);
                            return triggerList.includes(triggerName);
                        });
                }

                const promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);

                promise
                    .catch(error => error)
                    .then((ruleErrors: RuleError[] = EMPTY_ERRORS) => {
                        if (validatePromiseRef.current === rootPromise) {
                            validatePromiseRef.current = null;

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

                            errorsRef.current = nextErrors;
                            warningsRef.current = nextWarnings;
                            triggerMetaEvent();
                            reRender();
                        }
                    });

                return promise;
            });

            validatePromiseRef.current = rootPromise;
            dirtyRef.current = true;
            errorsRef.current = EMPTY_ERRORS;
            warningsRef.current = EMPTY_ERRORS;
            triggerMetaEvent();
            // Force trigger re-render since we need sync renderProps with new meta
            reRender();

            return rootPromise;
        },
        [getNamePath, getValue, getRules, validateFirst, messageVariables, triggerMetaEvent, reRender],
    );

    const onStoreChange = useCallback(
        (prevStore: Store, namePathList: InternalNamePath[] | null, info: { store: Store } & NotifyInfo) => {
            const { store } = info;
            const namePath = getNamePath();
            const prevValue = getValue(prevStore);
            const curValue = getValue(store);

            const namePathMatch = namePathList && containsNamePath(namePathList, namePath);

            if (info.type === 'valueUpdate' && info.source === 'external' && prevValue !== curValue) {
                touchedRef.current = true;
                dirtyRef.current = true;
                validatePromiseRef.current = null;
                errorsRef.current = EMPTY_ERRORS;
                warningsRef.current = EMPTY_ERRORS;
                triggerMetaEvent();
            }

            switch (info.type) {
                case 'reset':
                    if (!namePathList || namePathMatch) {
                        touchedRef.current = false;
                        dirtyRef.current = false;
                        validatePromiseRef.current = null;
                        errorsRef.current = EMPTY_ERRORS;
                        warningsRef.current = EMPTY_ERRORS;
                        triggerMetaEvent();
                        onReset?.();
                        refresh();
                        return;
                    }
                    break;

                /**
                 * In case field with `preserve = false` nest deps like:
                 * - A = 1 => show B
                 * - B = 1 => show C
                 * - Reset A, need clean B, C
                 */
                case 'remove':
                    if (shouldUpdate) {
                        reRender();
                        return;
                    }
                    break;

                case 'setField': {
                    if (namePathMatch) {
                        const { data } = info;

                        if ('touched' in data) {
                            touchedRef.current = data.touched;
                        }
                        if ('validating' in data && !('originRCField' in data)) {
                            validatePromiseRef.current = data.validating ? Promise.resolve([]) : null;
                        }
                        if ('errors' in data) {
                            errorsRef.current = data.errors || EMPTY_ERRORS;
                        }
                        if ('warnings' in data) {
                            warningsRef.current = data.warnings || EMPTY_ERRORS;
                        }
                        dirtyRef.current = true;

                        triggerMetaEvent();
                        reRender();
                        return;
                    }

                    if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
                        reRender();
                        return;
                    }
                    break;
                }

                case 'dependenciesUpdate': {
                    /**
                     * Trigger when marked `dependencies` updated. Related fields will all update
                     */
                    const dependencyList = dependencies.map(getNameArray);
                    // No need for `namePathMath` check and `shouldUpdate` check, since `valueUpdate` will be
                    // emitted earlier and they will work there
                    // If set it may cause unnecessary twice rerendering
                    if (dependencyList.some(dependency => containsNamePath(info.relatedFields, dependency))) {
                        reRender();
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
                        reRender();
                        return;
                    }
                    break;
            }

            if (shouldUpdate === true) {
                reRender();
            }
        },
        [getNamePath, getValue, dependencies, shouldUpdate, triggerMetaEvent, onReset, refresh, reRender],
    );

    const getLabelWidth = useCallback(() => {
        const { labelWidth: labelWidthContext, labelPosition: contextLabelPos } = fieldContext;
        const labelPosition = props.labelPosition ?? contextLabelPos;
        if (labelPosition === 'top') {
            return 0;
        }
        if (isNotEmpty(props.labelWidth)) {
            return addUnit(props.labelWidth);
        }
        if (pure === true) {
            return 0;
        }
        return labelWidthContext;
    }, [fieldContext, props.labelPosition, props.labelWidth, pure]);

    const getValidateLabel = useCallback(
        () => (
            <>
                <Transition nodeRef={errorRef} name={b('slide-up')} visible={errorsRef.current.length > 0} transitionAppear unmountOnExit display="">
                    <label ref={errorRef} className={e`error`} style={errorStyle}>
                        {head(errorsRef.current)}
                    </label>
                </Transition>
                <Transition nodeRef={warningRef} name={b('slide-up')} visible={warningsRef.current.length > 0} transitionAppear unmountOnExit display="">
                    <label ref={warningRef} className={e`warning`} style={warningStyle}>
                        {head(warningsRef.current)}
                    </label>
                </Transition>
            </>
        ),
        [b, e, errorStyle, warningStyle],
    );

    useMount(() => {
        mountedRef.current = true;
        if (fieldContext) {
            const { initEntityValue, registerField } = fieldContext.getInternalHooks(HOOK_MARK);
            const fieldEntity: FieldEntity = {
                onStoreChange,
                isFieldTouched,
                isFieldDirty,
                isFieldValidating,
                isListField: () => props.isListField,
                isList: () => props.isList,
                isPreserve: () => props.preserve,
                validateRules: validateRulesFunc,
                getMeta,
                getNamePath,
                getErrors,
                getWarnings,
                containerRef,
                props: {
                    label: props.label,
                    dependencies: props.dependencies,
                    initialValue: props.initialValue,
                    ...props,
                    name,
                    rules,
                    scrollToError: fieldContext?.scrollToError,
                },
            };
            initEntityValue(fieldEntity);
            cancelRegisterFuncRef.current = registerField(fieldEntity);

            if (shouldUpdate === true) {
                reRender();
            }
        }
    });

    useUnmount(() => {
        cancelRegister();
        triggerMetaEvent(true);
        mountedRef.current = false;
    });

    const { size: sizeContext, labelPosition: contextLabelPos, colon: colonContext, hideRequiredAsterisk, requireAsteriskPosition, showMessage: contextShowMessage } = fieldContext;

    const labelWidth = getLabelWidth();
    const labelPosition = useMemo(() => props.labelPosition ?? contextLabelPos, [props.labelPosition, contextLabelPos]);
    const showMessage = useMemo(() => props.showMessage ?? contextShowMessage, [props.showMessage, contextShowMessage]);

    const isRequired = useMemo(() => props.required || getRules().some(item => item.required), [props.required, getRules]);

    const returnChildNode = useCallback(() => {
        const { child, isFunction } = getOnlyChild(children);
        if (isFunction) {
            return child;
        } else if (isValidElement(child)) {
            return cloneElement(child, getControlled(child.props));
        } else {
            return child;
        }
    }, [getOnlyChild, children, getControlled]);

    const computedValidateState = useCallback((): FormItemValidateState => {
        if (validateState) {
            return validateState;
        }
        if (isFieldValidating()) {
            return 'validating';
        }
        if (errorsRef.current.length > 0) {
            return 'error';
        }
        if (warningsRef.current.length > 0) {
            return 'error';
        }
        if (!isFieldValidating() && touchedRef.current && errorsRef.current.length === 0 && warningsRef.current.length === 0) {
            return 'success';
        }
        return '';
    }, [isFieldValidating, validateState]);

    const contextValue = {
        size,
        hasLabel: !!label,
        labelPosition,
        validateState: computedValidateState(),
        computedWidth,
        setComputedWidth,
        oldWidthRef,
    };

    return noStyle ? (
        <FormItemContext.Provider key={resetCount} value={contextValue}>
            <div
                ref={containerRef}
                className={classNames(
                    b(),
                    e('nostyle'),
                    is({
                        error: errorsRef.current.length > 0,
                        warning: warningsRef.current.length > 0,
                        validating: !isFieldValidating() && touchedRef.current && errorsRef.current.length === 0 && warningsRef.current.length === 0,
                        success: errorsRef.current.length === 0 && warningsRef.current.length === 0,
                    }),
                    {
                        [m('feedback')]: fieldContext?.statusIcon,
                    },
                )}
            >
                <div className={classNames(e`content`)}>{returnChildNode()}</div>
                {showMessage ? getValidateLabel() : null}
            </div>
        </FormItemContext.Provider>
    ) : (
        <FormItemContext.Provider key={resetCount} value={contextValue}>
            <div
                ref={containerRef}
                className={classNames(
                    b(),
                    is({
                        error: errorsRef.current.length > 0,
                        warning: warningsRef.current.length > 0,
                        validating: !isFieldValidating() && touchedRef.current && errorsRef.current.length === 0 && warningsRef.current.length === 0,
                        success: errorsRef.current.length === 0 && warningsRef.current.length === 0,
                        required: isRequired,
                        'no-asterisk': hideRequiredAsterisk,
                    }),
                    {
                        [m('feedback')]: fieldContext?.statusIcon,
                        [m(`label-${labelPosition}`)]: labelPosition,
                        [m(sizeContext ?? size)]: sizeContext ?? size,
                    },
                    requireAsteriskPosition === 'right' ? 'asterisk-right' : 'asterisk-left',
                    className,
                )}
                style={style}
            >
                <FormLabelWrap key={key} isAutoWidth={labelWidth === 'auto'} updateAll={fieldContext.labelWidth === 'auto'}>
                    {label && !pure && (
                        <label className={e`label`} style={['left', 'right'].includes(labelPosition) ? { width: labelWidth, ...labelStyle } : labelStyle}>
                            {typeof label === 'string' || typeof label === 'number' ? `${label}${colonContext ?? colon ? '：' : ''}` : label}
                            {help && (
                                <Tooltip className={e`label--help`} content={help} placement="top" enterable>
                                    <Icon name="circle-question" prefix="fas" />
                                </Tooltip>
                            )}
                        </label>
                    )}
                </FormLabelWrap>

                <div className={classNames(e`content`)} style={!label ? { marginLeft: labelWidth } : {}}>
                    <>
                        {Children.map(returnChildNode(), (item: React.ReactElement<{ onChange?: (val: string | number | string[] | boolean) => void }>) => item)}
                        {showMessage ? getValidateLabel() : null}
                    </>
                </div>
            </div>
        </FormItemContext.Provider>
    );
}

function InternalFormItem<Values = any>({ name, rules = [], ...restProps }: FieldProps<Values>) {
    const formContext = useContext(FormContext);
    const fieldContext = useContext(FieldContext);

    const namePath = name !== undefined ? getNameArray(name) : undefined;

    let key = 'keep';
    if (!restProps.isListField) {
        key = `_${(namePath || []).join('_')}`;
    }

    // Warning if it's a directly list field.
    // We can still support multiple level field preserve.
    if (process.env.NODE_ENV !== 'production' && restProps.preserve === false && restProps.isListField && namePath.length <= 1) {
        warning(false, '`preserve` should not apply on ElFormList fields.');
    }

    const formRules = namePath?.length > 0 ? get(fieldContext?.rules ?? {}, namePath) : undefined;

    return <Field key={key} name={namePath} rules={[...(formRules || []), ...rules]} {...restProps} />;
}

const FormItem = memo(Field);
FormItem.displayName = 'ElFormItem';

export default FormItem;
