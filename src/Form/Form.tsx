import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { ForwardedRef, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { mergeDefaultProps } from '../Util';
import { useClassNames } from '../hooks';
import FieldContext, { HOOK_MARK } from './FieldContext';
import FormContext, { FormContextProps, FormProvider } from './FormContext';
import Field from './FormItem';
import List from './List';
import { FieldData, FormInstance, FormProps, InternalFormInstance, Store } from './typings';
import useForm from './useForm';
import useWatch from './useWatch';
import { isSimilar } from './utils/valueUtil';

type RenderProps = (values: Store, form: FormInstance) => React.ReactElement;

function InternalForm<RecordType = Store>(props: FormProps<RecordType>, ref: ForwardedRef<FormInstance<RecordType>>) {
    props = mergeDefaultProps(
        {
            inline: false,
            cols: 0,
            labelWidth: 120,
            labelPosition: 'right',
            validateTrigger: 'onChange',
            showMessage: true,
            requireAsteriskPosition: 'left',
        },
        props,
    );
    const {
        colon,
        inline,
        labelPosition,
        cols,
        flat,
        formStyle,
        name,
        initialValues,
        fields,
        // form,
        component: Comp = 'form',
        preserve,
        children,
        validateMessages,
        validateTrigger,
        onValuesChange,
        onFieldsChange,
        onFinish,
        onFinishFailed,
        className,
        disabled,
        labelWidth = 120,
        size,
        rules = {},
        hideRequiredAsterisk,
        requireAsteriskPosition,
        showMessage,
        scrollToError,
        ...restProps
    } = props;
    const formContext: FormContextProps = useContext(FormContext);
    const [formInstance] = useForm(props.form);
    const { useSubscribe, setInitialValues, setCallbacks, setValidateMessages, setPreserve, destroyForm } = (formInstance as InternalFormInstance).getInternalHooks(HOOK_MARK);
    const { m, is } = useClassNames('form');

    useImperativeHandle(ref, () => formInstance);

    // Register form into Context
    useEffect(() => {
        formContext.registerForm(name, formInstance);
        return () => {
            formContext.unregisterForm(name);
        };
    }, [formContext, formInstance, name]);

    // Pass props to store
    setValidateMessages({
        ...formContext.validateMessages,
        ...validateMessages,
    });

    setCallbacks({
        onValuesChange,
        onFieldsChange: (changedFields: FieldData[], ...rest) => {
            formContext.triggerFormChange(name, changedFields);

            if (onFieldsChange) {
                onFieldsChange(changedFields, ...rest);
            }
        },
        onFinish: (values: Store) => {
            formContext.triggerFormFinish(name, values);

            if (onFinish) {
                onFinish(values as RecordType);
            }
        },
        onFinishFailed,
    });
    setPreserve(preserve);

    const mountRef = useRef(null);
    setInitialValues(initialValues, !mountRef.current);
    if (!mountRef.current) {
        mountRef.current = true;
    }

    useEffect(
        () => destroyForm,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );
    let childrenNode = children;
    const childrenRenderProps = typeof children === 'function';
    if (childrenRenderProps) {
        const values = formInstance.getFieldsValue(true);
        childrenNode = (children as RenderProps)(values, formInstance);
    }

    // Not use subscribe when using render props
    useSubscribe(!childrenRenderProps);

    // Listen if fields provided. We use ref to save prev data here to avoid additional render
    const prevFieldsRef = useRef<FieldData[] | undefined>();
    useEffect(() => {
        if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
            formInstance.setFields(fields || []);
        }
        prevFieldsRef.current = fields;
    }, [fields, formInstance]);

    const formContextValue: InternalFormInstance = useMemo(
        () => ({
            ...(formInstance as InternalFormInstance),
            validateTrigger,
            colon,
            disabled,
            labelPosition,
            labelWidth: inline ? null : labelWidth,
            size,
            rules,
            hideRequiredAsterisk,
            requireAsteriskPosition,
            showMessage,
            scrollToError,
        }),
        [colon, disabled, formInstance, hideRequiredAsterisk, inline, labelPosition, labelWidth, requireAsteriskPosition, rules, scrollToError, showMessage, size, validateTrigger],
    );

    // @ts-ignore
    const wrapperNode = <FieldContext.Provider value={formContextValue}>{childrenNode}</FieldContext.Provider>;

    if (Comp === false) {
        return wrapperNode;
    }

    return (
        <Comp
            method="post"
            className={classNames(
                {
                    [m('inline')]: inline,
                    [m(`label-${labelPosition}`)]: !inline && labelPosition,
                    [`${m`col`}-${cols}`]: cols,
                    [m(size)]: size,
                },
                is({ flat }),
                className,
            )}
            style={formStyle}
            {...omit(restProps, 'form')}
            onSubmit={(event: Event) => {
                event.preventDefault();
                event.stopPropagation();

                formInstance.submit();
            }}
            onReset={(event: Event) => {
                event.preventDefault();

                formInstance.resetFields();
                restProps?.onReset?.call(this, event);
            }}
        >
            {wrapperNode}
        </Comp>
    );
}

const ForwardForm = forwardRef(InternalForm) as <RecordType = Store>(props: FormProps<RecordType> & { ref?: ForwardedRef<FormInstance<RecordType>> }) => React.ReactElement;

type InternalFormType = typeof ForwardForm;

interface FormInterface extends InternalFormType {
    displayName?: string;
    FormProvider: typeof FormProvider;
    Item: typeof Field;
    List: typeof List;
    useForm: typeof useForm;
    useWatch: typeof useWatch;
}

const Form = ForwardForm as FormInterface;

Form.FormProvider = FormProvider;
Form.Item = Field;
Form.List = List;
Form.useForm = useForm;
Form.useWatch = useWatch;

export default Form;
