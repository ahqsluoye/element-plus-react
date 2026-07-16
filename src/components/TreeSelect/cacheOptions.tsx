import { SelectRef } from '@qsxy/element-plus-react/Select/typings';
import React, { RefObject, useEffect } from 'react';
import { CacheOption } from './typings';

interface Props {
    data: CacheOption[];
    select: RefObject<SelectRef>;
}
const CacheOptions = (props: Props) => {
    useEffect(() => {
        props.data.forEach(item => {
            // @ts-ignore
            if (!props.select.current.cachedOptions.current.has(item.value)) {
                // TODO: the type of 'item' is not compatible with the type of 'cachedOptions',
                // which may indicate potential runtime issues.
                // @ts-expect-error
                props.select.current.cachedOptions.current.set(item.value, item);
            }
        });

        // fork from packages/select/src/useSelect.ts#330
        // const inputs = selectRef.current.?.querySelectorAll('input') || [];
        // if (isClient && !Array.from(inputs).includes(document.activeElement as HTMLInputElement)) {
        //     select.setSelected();
        // }
    }, [props.data]);

    return <></>;
};

export default CacheOptions;
