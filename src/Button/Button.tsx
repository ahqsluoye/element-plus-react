import classNames from 'classnames';
import React, { Ref, RefObject, forwardRef, memo, useContext, useImperativeHandle, useMemo, useRef } from 'react';
import { ConfigProvider } from '../ConfigProvider';
import Icon from '../Icon/Icon';
import { isNotEmpty } from '../Util';
import { partitionHTMLProps, useClassNames, useDisabled, useSize } from '../hooks';
import ButtonGroup from './ButtonGroup';
import { ButtonGroupContext } from './ButtonGroupContext';
import { ButtonProps, ButtonRef } from './typings';
import { useButtonCustomStyle } from './useButtonCustomStyle';

const InternalButton = (props: ButtonProps, ref: Ref<ButtonRef>) => {
    const { disabled: groupDisabled, type: groupType, size: groupSize, bgColor, borderColor } = useContext(ButtonGroupContext);
    const { button } = useContext(ConfigProvider);
    const {
        active,
        block,
        plain,
        round,
        circle,
        link,
        text,
        bg,
        dashed,
        className,
        loading,
        loadingIcon = 'spinner',
        loadingSlot,
        nativeType = 'button',
        icon = false,
        onClick,
        ...rest
    } = props;
    const disabled = useDisabled(groupDisabled ?? props.disabled);
    const size = useSize(groupSize ?? props.size);
    const { b, m, is, cssVarBlock, cssVarBlockName, cssVarName } = useClassNames('button');
    const [htmlInputProps] = partitionHTMLProps(rest);
    const containerRef = useRef<HTMLButtonElement>(null);

    const buttonStyle = useButtonCustomStyle({ color: bgColor, ...props }, cssVarBlock, cssVarName, cssVarBlockName);

    const spin = useMemo(() => loadingSlot ?? <Icon name={loadingIcon} className={classNames(b`spin`, is`loading`)} spin />, [loadingSlot, loadingIcon, b, is]);
    const type = useMemo(() => groupType ?? (props.type || 'default'), [groupType, props.type]);
    const autoInsertSpace = useMemo(() => props.autoInsertSpace ?? button?.autoInsertSpace ?? true, [button?.autoInsertSpace, props.autoInsertSpace]);

    const children = useMemo(() => {
        if (autoInsertSpace && typeof props.children === 'string' && props.children.length === 2 && /[\u4e00-\u9fa5]{2}/.test(props.children)) {
            return (
                <span>
                    {props.children.substring(0, 1)} {props.children.substring(1)}
                </span>
            );
        }
        return isNotEmpty(props.children) && <span>{props.children}</span>;
    }, [autoInsertSpace, props.children]);

    useImperativeHandle(ref, () => ({
        ref: containerRef,
        disabled,
        size,
        shouldAddSpace: autoInsertSpace,
    }));

    return (
        <button
            {...htmlInputProps}
            type={nativeType}
            ref={containerRef}
            disabled={disabled || loading}
            className={classNames(b(), m(type, size), is({ block, active, disabled, loading, plain, round, circle, link, text, dashed, 'has-bg': bg }), className)}
            style={{ borderColor, ...buttonStyle, ...props.style }}
            onClick={e => {
                if (!disabled) {
                    onClick?.call(this, e);
                }
                e.currentTarget?.blur();
            }}
        >
            {loading && spin}
            {icon && !loading && typeof icon === 'string' ? <Icon name={icon} /> : null}
            {children}
        </button>
    );
};

const Comp = memo(forwardRef(InternalButton)) as (props: ButtonProps & { ref?: RefObject<ButtonRef> }) => React.ReactElement;

type InternalType = typeof Comp;

interface CompInterface extends InternalType {
    displayName?: string;
    Group: typeof ButtonGroup;
}

const Button = Comp as CompInterface;

Button.Group = ButtonGroup;
Button.displayName = 'ElButton';

export default Button;
