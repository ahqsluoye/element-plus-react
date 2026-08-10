import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import { partitionHTMLProps } from '@qsxy/element-plus-react/hooks/htmlPropsUtils';
import useClassNames from '@qsxy/element-plus-react/hooks/useClassNames';
import { useDisabled, useSize } from '@qsxy/element-plus-react/hooks/useCommonProps';
import ElIcon from '@qsxy/element-plus-react/Icon/Icon';
import { isNotEmpty } from '@qsxy/element-plus-react/Util/base';
import classNames from 'classnames';
import React, { memo, use, useImperativeHandle, useMemo, useRef } from 'react';
import { ButtonGroupContext } from './ButtonGroupContext';
import type { ButtonProps, ButtonRef } from './typings';
import { useButtonCustomStyle } from './useButtonCustomStyle';

const Button = memo(({ ref, ...props }: ButtonProps & { ref?: React.Ref<ButtonRef | null> }) => {
    const { disabled: groupDisabled, type: groupType, size: groupSize, bgColor, borderColor } = use(ButtonGroupContext);
    const { button = {} } = useConfigProvider();
    const {
        active,
        block,
        type = button?.type ?? groupType ?? 'default',
        plain = button?.plain ?? false,
        round = button?.round ?? false,
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
        autoInsertSpace = button?.autoInsertSpace,
        iconProps = {},
        onClick,
        ...rest
    } = props;
    const disabled = useDisabled(groupDisabled ?? props.disabled);
    const size = useSize(groupSize ?? props.size);
    const { b, m, is, cssVarBlock, cssVarBlockName, cssVarName } = useClassNames('button');
    const [htmlInputProps] = partitionHTMLProps(rest);
    const containerRef = useRef<HTMLButtonElement>(null);

    const buttonStyle = useButtonCustomStyle({ color: bgColor, ...props }, cssVarBlock, cssVarName, cssVarBlockName);

    const spin = useMemo(() => loadingSlot ?? <ElIcon name={loadingIcon} className={classNames(b`spin`, is`loading`)} spin />, [loadingSlot, loadingIcon, b, is]);
    // const type = useMemo(() => groupType ?? (props.type || 'default'), [groupType, props.type]);

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
            {icon && !loading && typeof icon === 'string' ? <ElIcon name={icon} {...iconProps} /> : null}
            {children}
        </button>
    );
});

Button.displayName = 'ElButton';

export default Button;
