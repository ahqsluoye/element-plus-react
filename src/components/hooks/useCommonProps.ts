import { useContext, useMemo } from 'react';
import { useConfigProvider } from '../ConfigProvider/ConfigProviderContext';
import { FormItemContext } from '../Form/FormItemContext';
import InternalFormContext from '../Form/InternalFormContext';
import { TypeAttributes } from '../types/common';

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
    return useMemo(() => disabled || form?.disabled || false, [disabled, form?.disabled]);
};

export const useStatusIcon = () => {
    const statusIcon = useContext(InternalFormContext).statusIcon;
    const { validateState } = useContext(FormItemContext);
    return { statusIcon, validateState };
};
