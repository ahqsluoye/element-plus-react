import Icon from '@qsxy/element-plus-react/Icon/Icon';
import Input from '@qsxy/element-plus-react/Input/Input';
import React, { useCallback } from 'react';

export interface TransferSearchProps {
    prefixCls?: string;
    placeholder?: string;
    onChange?: (e) => void;
    handleClear?: () => void;
    value?: string;
    disabled?: boolean;
}

export default function Search(props: TransferSearchProps) {
    const { placeholder = '', value, prefixCls, disabled, onChange, handleClear } = props;

    const handleChange = useCallback(
        (v: string, e) => {
            onChange?.(e);
            if (v === '') {
                handleClear?.();
            }
        },
        [handleClear, onChange],
    );

    return (
        <Input
            placeholder={placeholder}
            className={prefixCls}
            value={value}
            debounceInput
            onChange={handleChange}
            disabled={disabled}
            clearable
            onClear={handleClear}
            prefix={<Icon name="search" />}
        />
    );
}
