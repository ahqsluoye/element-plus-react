import { useContext, useMemo } from 'react';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import FormContext from '../Form/FieldContext';
import { FormItemContext } from '../Form/FormItemContext';
import { TypeAttributes } from '../types/common';

export const useSize = (fallback?: TypeAttributes.Size | (() => TypeAttributes.Size)) => {
    const { size: globalSize } = useConfigProvider();

    const size = fallback instanceof Function ? fallback() : fallback;
    const form = useContext(FormContext);
    const formItem = useContext(FormItemContext);
    return useMemo(() => size || formItem?.size || form?.size || globalSize || null, [size, form?.size, formItem?.size, globalSize]);
};

export const useDisabled = (fallback?: boolean | (() => boolean)) => {
    const disabled = fallback instanceof Function ? fallback() : fallback;
    const form = useContext(FormContext);
    return useMemo(() => disabled || form?.disabled || false, [disabled, form?.disabled]);
};
