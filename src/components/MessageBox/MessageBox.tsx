import Button from '@qsxy/element-plus-react/Button/Button';
import Dialog from '@qsxy/element-plus-react/Dialog/Dialog';
import { partitionAnimationProps } from '@qsxy/element-plus-react/hooks/animationPropsUtils';
import { namespace } from '@qsxy/element-plus-react/hooks/prefix';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import useControlled from '@qsxy/element-plus-react/hooks/useControlled';
import Icon from '@qsxy/element-plus-react/Icon/Icon';
import Input from '@qsxy/element-plus-react/Input/Input';
import { addUnit, isNotEmpty, mergeDefaultProps } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import isString from 'lodash/isString';
import React, { cloneElement, forwardRef, memo, RefObject, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Action, MessageBoxRef, MessageState } from './typings';

const MessageBox: React.ForwardRefExoticComponent<MessageState & React.RefAttributes<MessageBoxRef>> = memo(
    forwardRef<MessageBoxRef, MessageState>((props, ref) => {
        const { t } = useTranslation();

        const locale = useMemo(() => {
            return props?.options?.locale || 'en';
        }, [props?.options?.locale]);

        props = mergeDefaultProps(
            {
                options: {},
            },
            props,
        );

        props.options = mergeDefaultProps(
            {
                width: 420,
                showClose: true,
                showCancelButton: true,
                showConfirmButton: true,
                cancelButtonText: t('el.messagebox.cancel', { lng: locale }),
                confirmButtonText: t('el.messagebox.confirm', { lng: locale }),
                distinguishCancelAndClose: false,
                draggable: false,
                buttonPosition: 'right',
                showInput: false,
            },
            props.options,
        );

        const { boxType, onAction, options } = props;
        const {
            title,
            message,
            type,
            icon,
            width,
            callback,
            showClose,
            beforeClose,
            showCancelButton,
            showConfirmButton,
            cancelButtonText,
            cancelButtonClass,
            confirmButtonClass,
            buttonSize,
            buttonPosition,
            draggable,
            overflow,
            showInput,
            inputType,
            inputPlaceholder,
            inputPattern,
            inputErrorMessage,
            inputValidator,
            distinguishCancelAndClose,
            classPrefix = 'message-box',
            className,
            style,
            // padding,
            roundButton,
            dangerouslyUseHTMLString,
            ...rest
        } = options;
        const { e, bm } = useClassNames(classPrefix);
        const [visible, setVisible] = useState(true);
        const [confirmButtonLoading, setConfirmButtonLoading] = useState(false);
        const [confirmButtonText, setConfirmButtonText] = useState(options.confirmButtonText);

        const [inputValue, setInputValue] = useControlled(undefined, options.inputValue);
        const [editorErrorMessage, setEditorErrorMessage] = useState(inputErrorMessage);
        const [validateError, setValidateError] = useState(false);

        const [transitionProps] = partitionAnimationProps(rest);

        const containerRef = useRef<HTMLDivElement>(null);

        const iconContent = useMemo(() => {
            if (isNotEmpty(icon)) {
                if (isString(icon)) {
                    return <Icon className={e`status`} name={icon} />;
                } else {
                    return cloneElement(icon, {
                        ...(icon?.props ?? {}),
                        className: classNames(icon?.props?.className, e`status`),
                    });
                }
            } else {
                switch (type) {
                    case 'success':
                        return <Icon className={classNames(e`status`, bm('icon', type))} name="check" />;

                    case 'info':
                        return <Icon className={classNames(e`status`, bm('icon', type))} name="circle-info" />;

                    case 'warning':
                        return <Icon className={classNames(e`status`, bm('icon', type))} name="circle-exclamation" prefix="fas" />;

                    case 'error':
                        return <Icon className={classNames(e`status`, bm('icon', type))} name="circle-xmark" prefix="fas" />;

                    default:
                        return null;
                }
            }
        }, [bm, e, icon, type]);

        const done = useCallback(() => {
            setVisible(false);
        }, []);

        const validate = (value: string) => {
            if (boxType === 'prompt') {
                if (inputPattern && !inputPattern.test(value || '')) {
                    setEditorErrorMessage(inputErrorMessage);
                    setValidateError(true);
                    return false;
                }
                if (typeof inputValidator === 'function') {
                    const validateResult = inputValidator(value);
                    if (validateResult === false) {
                        setEditorErrorMessage(inputErrorMessage);
                        setValidateError(true);
                        return false;
                    }
                    if (typeof validateResult === 'string') {
                        setEditorErrorMessage(validateResult);
                        setValidateError(true);
                        return false;
                    }
                }
            }
            setEditorErrorMessage('');
            setValidateError(false);
            return true;
        };

        const handleAction = (action: Action) => {
            if (boxType === 'prompt' && action === 'confirm' && !validate(inputValue)) {
                return;
            }
            if (action === 'close') {
                action = distinguishCancelAndClose ? action : 'cancel';
            }
            if (beforeClose) {
                beforeClose(
                    action,
                    () => {
                        done();
                        onAction?.(action, inputValue);
                    },
                    ref as RefObject<MessageBoxRef>,
                );
            } else {
                if (props.boxType === 'prompt') {
                    callback?.(inputValue, action);
                } else {
                    // @ts-ignore
                    callback?.(action);
                }
                done();
                onAction?.(action, inputValue);
            }
        };

        const messageContainer = useMemo(() => {
            if (typeof message === 'string') {
                if (boxType === 'prompt') {
                    return <label htmlFor="input">{message}</label>;
                } else {
                    return <p>{message}</p>;
                }
            }
            return message;
        }, [boxType, message]);

        useImperativeHandle(ref, () => ({
            get ref() {
                return containerRef;
            },
            inputValue,
            close: done,
            setConfirmButtonLoading,
            setConfirmButtonText,
        }));

        return (
            <Dialog
                ref={containerRef}
                classPrefix={classPrefix}
                visible={visible}
                modalClass="is-message-box"
                className={className}
                // @ts-ignore
                style={{ ...style, [`--${namespace}-messagebox-width`]: addUnit(width) }}
                modal
                draggable={draggable}
                overflow={overflow}
                showClose={showClose}
                title={title}
                beforeClose={() => handleAction('close')}
                {...transitionProps}
                unmountOnExit={false}
                transitionConfig={'fade-in-linear'}
                footer={
                    showCancelButton || showConfirmButton ? (
                        <>
                            {showCancelButton && (
                                <Button className={cancelButtonClass} size={buttonSize} round={roundButton} onClick={() => handleAction('cancel')}>
                                    {cancelButtonText}
                                </Button>
                            )}
                            {showConfirmButton && (
                                <Button
                                    className={confirmButtonClass}
                                    type="primary"
                                    size={buttonSize}
                                    round={roundButton}
                                    loading={confirmButtonLoading}
                                    onClick={() => handleAction('confirm')}
                                >
                                    {confirmButtonText}
                                </Button>
                            )}
                        </>
                    ) : null
                }
            >
                {dangerouslyUseHTMLString ? (
                    <div className={e`container`}>
                        {iconContent}
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                    </div>
                ) : (
                    <>
                        <div className={e`container`}>
                            {iconContent}
                            <div className={e`message`}>{messageContainer}</div>
                        </div>
                        {boxType === 'prompt' && showInput && (
                            <div className={e`input`}>
                                <Input
                                    value={inputValue}
                                    type={inputType}
                                    // error={validateError}
                                    placeholder={inputPlaceholder}
                                    onChange={(value: string) => {
                                        setInputValue(value);
                                        validate(value);
                                    }}
                                />
                                {validateError && <div className={e`errormsg`}>{editorErrorMessage}</div>}
                            </div>
                        )}
                    </>
                )}
            </Dialog>
        );
    }),
);

MessageBox.displayName = 'ElMessageBox';

export default MessageBox;
