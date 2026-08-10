import { mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import classNames from 'classnames';
import omit from 'lodash/omit';
import React, { memo, use, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import FormContext, { FormContextProps } from './FormContext';
import InternalFormContext, { HOOK_MARK } from './InternalFormContext';
import { FieldData, FormInstance, FormProps, InternalFormInstance, Store } from './typings';
import useForm from './useForm';
import { isSimilar } from './utils/valueUtil';

type RenderProps = (values: Store, form: FormInstance) => React.ReactElement;

function InternalForm<RecordType = Store>({ ref, ...props }: FormProps<RecordType> & { ref?: React.Ref<FormInstance<RecordType> | null> }) {
    props = mergeDefaultProps(
        {
            inline: false,
            cols: 0,
            labelWidth: 'auto',
            labelPosition: 'right',
            validateTrigger: 'onChange',
            showMessage: true,
            requireAsteriskPosition: 'left',
            rules: {},
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
        labelWidth,
        size,
        rules,
        hideRequiredAsterisk,
        requireAsteriskPosition,
        showMessage,
        scrollToError,
        statusIcon,
        ...restProps
    } = props;
    const formContext: FormContextProps = use(FormContext);
    const [formInstance] = useForm(props.form);
    const { useSubscribe, setInitialValues, setCallbacks, setValidateMessages, setPreserve, destroyForm } = (formInstance as InternalFormInstance).getInternalHooks(HOOK_MARK);
    const { b, m, is } = useClassNames('form');

    const [autoLabelWidth, setAutoLabelWidth] = useState<string>('');
    const labelWidthListRef = useRef<number[]>([]);

    const registerLabelWidth = useCallback((width: number, oldWidth: number) => {
        const labelWidthList = labelWidthListRef.current;
        if (oldWidth) {
            const index = labelWidthList.indexOf(oldWidth);
            if (index !== -1) {
                labelWidthList.splice(index, 1);
            }
        }
        if (width) {
            labelWidthList.push(width);
        }
        const maxWidth = Math.max(...labelWidthList);
        setAutoLabelWidth(maxWidth ? `${maxWidth}px` : '');
    }, []);

    const deregisterLabelWidth = useCallback((width: number) => {
        const labelWidthList = labelWidthListRef.current;
        const index = labelWidthList.indexOf(width);
        if (index !== -1) {
            labelWidthList.splice(index, 1);
        }
        const maxWidth = Math.max(...labelWidthList);
        setAutoLabelWidth(maxWidth ? `${maxWidth}px` : '');
    }, []);

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
    const prevFieldsRef = useRef<FieldData[] | undefined>(null);
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
            autoLabelWidth,
            statusIcon,
            registerLabelWidth,
            deregisterLabelWidth,
        }),
        [
            autoLabelWidth,
            colon,
            deregisterLabelWidth,
            disabled,
            formInstance,
            hideRequiredAsterisk,
            inline,
            labelPosition,
            labelWidth,
            registerLabelWidth,
            requireAsteriskPosition,
            rules,
            scrollToError,
            showMessage,
            size,
            statusIcon,
            validateTrigger,
        ],
    );

    // @ts-ignore
    const wrapperNode = <InternalFormContext value={formContextValue}>{childrenNode}</InternalFormContext>;

    if (Comp === false) {
        return wrapperNode;
    }

    return (
        <Comp
            method="post"
            className={classNames(
                b(),
                [m(size || 'default')],
                {
                    [m('inline')]: inline,
                    [m(`label-${labelPosition}`)]: !inline && labelPosition,
                    [`${m`col`}-${cols}`]: cols,
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

const ForwardForm = memo(InternalForm);

export default ForwardForm;
