import React, { Ref, forwardRef, memo, useRef } from 'react';
import { InputGroup } from '../Input';
import SelectCore from './SelectCore';
import { SelectProps, SelectRef } from './typings';

const Select = memo(
    forwardRef((props: SelectProps, ref: Ref<SelectRef>) => {
        const groupRef = useRef<HTMLDivElement>(null);

        const { append, prepend } = props;

        if (append || prepend) {
            return (
                <InputGroup prepend={prepend} append={append} ref={groupRef} style={props.style}>
                    <SelectCore ref={ref} {...props} />
                </InputGroup>
            );
        } else {
            return <SelectCore ref={ref} {...props} />;
        }
    }),
);

Select.displayName = 'ElSelect';

export default Select;
