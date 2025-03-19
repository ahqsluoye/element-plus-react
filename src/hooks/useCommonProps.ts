import { useContext, useMemo } from 'react';
import FormContext from '../Form/FieldContext';
import { FormItemContext } from '../Form/FormItemContext';
import { TypeAttributes } from '../types/common';

export const useSize = (fallback?: TypeAttributes.Size | (() => TypeAttributes.Size)) => {
    const disabled = fallback instanceof Function ? fallback() : fallback;
    const form = useContext(FormContext);
    const formItem = useContext(FormItemContext);
    return useMemo(() => disabled || formItem?.size || form?.size || null, [disabled, form?.size, formItem?.size]);
};

export const useDisabled = (fallback?: boolean | (() => boolean)) => {
    const disabled = fallback instanceof Function ? fallback() : fallback;
    const form = useContext(FormContext);
    return useMemo(() => disabled || form?.disabled || false, [disabled, form?.disabled]);
};
