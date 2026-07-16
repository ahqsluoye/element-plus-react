import { useConfigProvider } from '@qsxy/element-plus-react/ConfigProvider/ConfigProviderContext';
import { FormItemContext } from '@qsxy/element-plus-react/Form/FormItemContext';
import InternalFormContext from '@qsxy/element-plus-react/Form/InternalFormContext';
import { TextareaProps } from '@qsxy/element-plus-react/Input/typings';
import { TypeAttributes } from '@qsxy/element-plus-react/types/common';
import { isUndefined } from '@qsxy/element-plus-react/Util/base';
import isNull from 'lodash/isNull';
import { useContext, useMemo } from 'react';

export const useSize = (fallback?: TypeAttributes.Size | (() => TypeAttributes.Size)) => {
    const { size: globalSize } = useConfigProvider();

    const size = fallback instanceof Function ? fallback() : fallback;
    const form = useContext(InternalFormContext);
    const formItem = useContext(FormItemContext);
    return useMemo(() => size || formItem?.size || form?.size || globalSize || null, [size, form?.size, formItem?.size, globalSize]);
};

export const useDisabled = (fallback?: boolean | (() => boolean)) => {
    const disabled = fallback instanceof Function ? fallback() : fallback;
    const form = useContext(InternalFormContext);
    return useMemo(() => (isNull(disabled) || isUndefined(disabled) ? form?.disabled || false : disabled), [disabled, form?.disabled]);
};

export const useStatusIcon = () => {
    const statusIcon = useContext(InternalFormContext).statusIcon;
    const { validateState } = useContext(FormItemContext);
    return { statusIcon, validateState };
};

export const useClearable = (fallback?: boolean | (() => boolean)) => {
    const clearable = fallback instanceof Function ? fallback() : fallback;
    const { clearable: globalClearable } = useConfigProvider();
    return useMemo(() => (isNull(clearable) || isUndefined(clearable) ? globalClearable || false : clearable), [clearable, globalClearable]);
};

export const useAutosize = (fallback?: TextareaProps['autosize'] | (() => TextareaProps['autosize'])) => {
    const autosize = fallback instanceof Function ? fallback() : fallback;
    const { textarea: globalAutosize } = useConfigProvider();
    return useMemo(() => (isNull(autosize) || isUndefined(autosize) ? globalAutosize?.autosize || false : autosize), [autosize, globalAutosize?.autosize]);
};
